import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "@/components/ui/provider";
import { siteUrl } from "@/lib/seo";
import { clearSans, exo } from "@/theme/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Citrix Solutions Ltd | Print, Branding, Fabrication, Web & Events in Kampala",
    template: "%s | Citrix Solutions",
  },
  description:
    "Citrix Solutions is a Kampala-based creative partner for print, graphic design, branding, fabrication, web design and event management. Integrated solutions for modern brand growth.",
  applicationName: "Citrix Solutions",
  openGraph: { type: "website", locale: "en_UG", siteName: "Citrix Solutions Ltd" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#004E9B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo.variable} ${clearSans.variable}`} suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
