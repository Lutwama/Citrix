import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Brand palette from docs/citrix.pdf
//   #004E9B royal blue (primary) · #0091B9 cyan (accent)
//   #115B70 deep teal (secondary) · #BAE4F0 ice blue (light surfaces)
const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
      fontFamily: "body",
    },
    "::selection": { bg: "brand.ice", color: "brand.blue" },
    // Logos show in white on dark backgrounds; the footer already uses its white tone.
    ".dark [data-logo=color]": { filter: "brightness(0) invert(1)" },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          blue: { value: "#004E9B" },
          cyan: { value: "#0091B9" },
          teal: { value: "#115B70" },
          ice: { value: "#BAE4F0" },
          mist: { value: "#EEF8FB" },
          ink: { value: "#0B2540" },
          // scale used by colorPalette="brand"
          50: { value: "#EEF8FB" },
          100: { value: "#BAE4F0" },
          200: { value: "#8FD0E5" },
          300: { value: "#4FB4D3" },
          400: { value: "#0091B9" },
          500: { value: "#0070AA" },
          600: { value: "#004E9B" },
          700: { value: "#003F7E" },
          800: { value: "#115B70" },
          900: { value: "#0B2540" },
          950: { value: "#06172A" },
        },
      },
      fonts: {
        heading: { value: "var(--font-exo), system-ui, sans-serif" },
        body: { value: "var(--font-clear-sans), system-ui, sans-serif" },
      },
      radii: {
        card: { value: "1.25rem" },
      },
    },
    semanticTokens: {
      colors: {
        // Nested DEFAULT keys merge with Chakra's own (fg.error, bg.subtle, …).
        // Each pair is { base: light mode, _dark: dark mode }.
        bg: { DEFAULT: { value: { base: "#FFFFFF", _dark: "#06172A" } } },
        fg: {
          DEFAULT: { value: { base: "{colors.brand.ink}", _dark: "#E3EEF6" } },
          muted: { value: { base: "#4A6075", _dark: "#9DB4C9" } },
        },
        // Page building blocks. Use these instead of white / brand.mist /
        // brand.blue text so every section follows the colour mode.
        surface: {
          DEFAULT: { value: { base: "#FFFFFF", _dark: "#0D243C" } }, // cards, panels
          mist: { value: { base: "{colors.brand.mist}", _dark: "#0A1F35" } }, // tinted sections, chips
        },
        heading: { value: { base: "{colors.brand.blue}", _dark: "#7CC8E8" } }, // titles, links, icons
        ink: { value: { base: "{colors.brand.ink}", _dark: "#E3EEF6" } }, // strong body text
        accent: { value: { base: "{colors.brand.teal}", _dark: "#8FD0E5" } }, // teal notes, chips, quotes
        line: { value: { base: "{colors.blackAlpha.100}", _dark: "{colors.whiteAlpha.150}" } }, // borders
        header: { value: { base: "rgba(255,255,255,0.92)", _dark: "rgba(6,23,42,0.88)" } },
        brand: {
          solid: { value: "{colors.brand.600}" },
          contrast: { value: "white" },
          fg: { value: { base: "{colors.brand.600}", _dark: "#7CC8E8" } },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.200}" },
          focusRing: { value: "{colors.brand.400}" },
        },
      },
    },
    textStyles: {
      display: {
        value: {
          fontFamily: "heading",
          fontWeight: "600",
          fontSize: { base: "2.5rem", md: "4rem", lg: "4.75rem" },
          lineHeight: "1.05",
          letterSpacing: "-0.02em",
        },
      },
      h1: {
        value: {
          fontFamily: "heading",
          fontWeight: "600",
          fontSize: { base: "2.25rem", md: "3.25rem" },
          lineHeight: "1.1",
          letterSpacing: "-0.015em",
        },
      },
      h2: {
        value: {
          fontFamily: "heading",
          fontWeight: "700",
          fontSize: { base: "1.875rem", md: "2.5rem" },
          lineHeight: "1.15",
        },
      },
      h3: {
        value: {
          fontFamily: "heading",
          fontWeight: "700",
          fontSize: { base: "1.25rem", md: "1.5rem" },
          lineHeight: "1.25",
        },
      },
      eyebrow: {
        value: {
          fontFamily: "heading",
          fontWeight: "700",
          fontSize: "0.8125rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        },
      },
      lead: {
        value: { fontSize: { base: "1.125rem", md: "1.25rem" }, lineHeight: "1.6" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
