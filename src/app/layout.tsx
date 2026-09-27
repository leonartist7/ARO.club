import type { Metadata, Viewport } from "next";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Providers from "./providers";
import "../index.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://aro-club.vercel.app"),
  title: "ARO — Life opens up",
  description:
    "Discover opportunities. Share your skills. Meet your people.",
  openGraph: {
    type: "website",
    title: "ARO — Life opens up",
    description: "Discover opportunities. Share your skills. Meet your people.",
  },
  twitter: {
    card: "summary",
  },
};
export const viewport: Viewport = { themeColor: "#F05A28" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p role="status">Loading ARO…</p>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
