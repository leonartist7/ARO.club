export const previewStore =
  process.env.NEXT_PUBLIC_REVENUECAT_PREVIEW_STORE === "billing_sandbox"
    ? "billing_sandbox"
    : "test_store";

export const revenueCatPublicKey =
  previewStore === "billing_sandbox"
    ? process.env.NEXT_PUBLIC_REVENUECAT_BILLING_SANDBOX_KEY
    : process.env.NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY;

// Neither Test Store nor Stripe sandbox can activate a production purchase UI.
export const previewPurchasesEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" &&
  process.env.NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS === "true" &&
  Boolean(
    revenueCatPublicKey?.startsWith(
      previewStore === "billing_sandbox" ? "rcb_sb_" : "test_",
    ),
  );
