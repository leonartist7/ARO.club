import { Purchases } from "@revenuecat/purchases-js";
import { previewPurchasesEnabled, revenueCatPublicKey } from "./config";

let purchases: Purchases | null = null;
let activeUserId: string | null = null;
let switchQueue: Promise<void> = Promise.resolve();

export async function getPreviewPurchases(appUserId: string): Promise<Purchases> {
  const apiKey = revenueCatPublicKey;
  if (!previewPurchasesEnabled || !apiKey || !appUserId) {
    throw new Error("RevenueCat preview purchases are unavailable in this environment.");
  }

  // Serialize identity changes so purchases cannot use the previous account.
  const ready = switchQueue.then(async () => {
    if (!purchases) {
      purchases = Purchases.configure({ apiKey, appUserId });
      activeUserId = appUserId;
    } else if (activeUserId !== appUserId) {
      await purchases.changeUser(appUserId);
      activeUserId = appUserId;
    }
    return purchases;
  });
  switchQueue = ready.then(() => undefined, () => undefined);
  return ready;
}
