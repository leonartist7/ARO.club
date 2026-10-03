import PreviewSubscriptionsPage from "./PreviewSubscriptionsPage";

export const dynamic = "force-dynamic";

export default function SubscriptionPage() {
  if (process.env.VERCEL_ENV === "production") {
    return <div className="px-4 py-8 sm:px-8"><h1 className="text-2xl font-bold">Subscriptions</h1><p className="mt-4">Subscriptions are not available in this environment.</p></div>;
  }
  return <PreviewSubscriptionsPage />;
}
