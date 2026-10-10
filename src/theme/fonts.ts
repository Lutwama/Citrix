import { Exo } from "next/font/google";
import localFont from "next/font/local";

// Brand typography (docs/citrix.pdf): Exo for titles, Clear Sans for body.

export const exo = Exo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-exo",
  display: "swap",
});

// Clear Sans isn't on Google Fonts; self-host the Fontsource build.
export const clearSans = localFont({
  src: [
    { path: "../../node_modules/@fontsource/clear-sans/files/clear-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/clear-sans/files/clear-sans-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../node_modules/@fontsource/clear-sans/files/clear-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/clear-sans/files/clear-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clear-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
