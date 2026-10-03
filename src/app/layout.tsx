import type { Metadata, Viewport } from "next";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Providers from "./providers";
import "../index.css";
export const metadata: Metadata = {
  title: "ARO — The Human Opportunity Network",
  description:
    "ARO helps human intent, capability, people, place and time form into meaningful real-world opportunities.",
  openGraph: {
    type: "website",
    title: "ARO — The Human Opportunity Network",
    description: "AI for a more human world.",
    images: ["https://aro.club/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://aro.club/twitter-image.jpg"],
  },
};
export const viewport: Viewport = { themeColor: "#DE4325" };
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
