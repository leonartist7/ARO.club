"use client";

import { ErrorCode, PurchasesError } from "@revenuecat/purchases-js";
import type { CustomerInfo, Package } from "@revenuecat/purchases-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "../../../lib/navigation";
import { previewPurchasesEnabled, previewStore } from "../../../lib/revenuecat/config";
import { getPreviewPurchases } from "../../../lib/revenuecat/preview";

const entitlement = "aro_club_pro";

export default function PreviewSubscriptionsPage() {
  const { user, loading } = useAuth() as { user: { id: string } | null; loading: boolean };
  const appUserId: string | undefined = user?.id;
  const paywallTarget = useRef<HTMLDivElement>(null);
  const requestGeneration = useRef(0);
  const currentUserId = useRef(appUserId);
  currentUserId.current = appUserId;
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!appUserId) return;
    const generation = ++requestGeneration.current;
    setState("loading");
    setError("");
    try {
      const purchases = await getPreviewPurchases(appUserId);
      const [info, offerings] = await Promise.all([
        purchases.getCustomerInfo(),
        purchases.getOfferings(),
      ]);
      if (generation !== requestGeneration.current) return;
      setCustomerInfo(info);
      setPackages(offerings.current?.availablePackages ?? []);
      setState(offerings.current?.availablePackages.length ? "ready" : "empty");
    } catch {
      if (generation !== requestGeneration.current) return;
      setState("error");
      setError("Subscription information could not load. Please try again.");
    }
  }, [appUserId]);

  useEffect(() => {
    requestGeneration.current += 1;
    setCustomerInfo(null);
    setPackages([]);
    if (previewPurchasesEnabled && appUserId) void refresh();
    return () => { requestGeneration.current += 1; };
  }, [appUserId, refresh]);

  async function purchase(action: (purchases: Awaited<ReturnType<typeof getPreviewPurchases>>) => Promise<{ customerInfo: CustomerInfo }>) {
    if (!appUserId || busy) return;
    setBusy(true);
    setError("");
    try {
      const purchases = await getPreviewPurchases(appUserId);
      const result = await action(purchases);
      if (currentUserId.current !== appUserId) return;
      setCustomerInfo(result.customerInfo);
      // The purchase result is immediate; refresh for the latest renewal state.
      const updated = await purchases.getCustomerInfo();
      if (currentUserId.current === appUserId) setCustomerInfo(updated);
    } catch (cause) {
      if (!(cause instanceof PurchasesError && cause.errorCode === ErrorCode.UserCancelledError)) {
        setError(cause instanceof Error ? cause.message : "The test purchase did not complete. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (!previewPurchasesEnabled) {
    return <div className="px-4 py-8 sm:px-8"><h1 className="text-2xl font-bold">Subscriptions</h1><p className="mt-4">Subscriptions are not available in this environment.</p></div>;
  }
  if (loading) return <p className="px-4 py-8" role="status">Checking your account…</p>;
  if (!appUserId) {
    return <div className="px-4 py-8 sm:px-8"><h1 className="text-2xl font-bold">Test subscriptions</h1><p className="mt-4">Sign in to test a subscription with your account.</p><Link to="/login" className="mt-4 inline-block underline">Sign in</Link></div>;
  }

  const hasPro = Boolean(customerInfo?.entitlements.active[entitlement]);
  const storeLabel = previewStore === "billing_sandbox" ? "Stripe sandbox" : "Test Store";
  return (
    <div className="max-w-3xl px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-bold">Test subscriptions</h1>
      <p className="mt-3 text-sm">RevenueCat {storeLabel} only. These test purchases do not charge real money or unlock live ARO features.</p>
      <p className="mt-5 font-semibold" role="status">Aro Club Pro: {hasPro ? `active in ${storeLabel}` : "not active"}</p>
      {error && <p className="mt-4 text-red-700 dark:text-red-300" role="alert">{error}</p>}
      {state === "loading" && <p className="mt-5" role="status">Loading plans…</p>}
      {state === "empty" && <p className="mt-5">No current offering with packages is configured for this {storeLabel}.</p>}
      {state === "error" && <button type="button" className="mt-5 underline" onClick={() => void refresh()}>Retry loading plans</button>}
      {state === "ready" && (
        <>
          <div className="mt-6 flex flex-wrap gap-3">
            {packages.map((pkg) => (
              <button key={pkg.identifier} type="button" disabled={busy} onClick={() => void purchase((p) => p.purchase({ rcPackage: pkg }))} className="min-h-11 rounded-xl border border-current px-4 py-2 disabled:opacity-50">
                {pkg.webBillingProduct.title} · {pkg.webBillingProduct.price.formattedPrice}
              </button>
            ))}
          </div>
          <button type="button" disabled={busy} onClick={() => void purchase((p) => p.presentPaywall({ htmlTarget: paywallTarget.current ?? undefined }))} className="mt-6 min-h-11 rounded-xl bg-primary-600 px-5 py-2 font-bold text-white disabled:opacity-50">View RevenueCat paywall</button>
          <div ref={paywallTarget} />
        </>
      )}
      <div className="mt-7 flex flex-wrap gap-4">
        <button type="button" disabled={busy || state === "loading"} className="min-h-11 underline disabled:opacity-50" onClick={() => void refresh()}>Refresh status</button>
        {customerInfo?.managementURL && <a className="inline-flex min-h-11 items-center underline" href={customerInfo.managementURL}>Manage subscription</a>}
      </div>
    </div>
  );
}
