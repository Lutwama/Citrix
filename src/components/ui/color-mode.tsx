"use client";

import { ClientOnly, IconButton, Skeleton, type IconButtonProps } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";

/**
 * Light/dark mode via a `dark` class on <html>, which Chakra's `_dark`
 * condition and semantic tokens read. Follows the visitor's OS setting until
 * they pick a mode, then remembers it. next-themes sets the class before the
 * page paints, so there is no flash of the wrong theme.
 */
export function ColorModeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = resolvedTheme === "dark" ? "dark" : "light";
  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(colorMode === "dark" ? "light" : "dark"),
  };
}

export function ColorModeButton(props: Omit<IconButtonProps, "aria-label">) {
  const { colorMode, toggleColorMode } = useColorMode();
  const next = colorMode === "dark" ? "light" : "dark";
  return (
    // The saved mode is only known in the browser, so render a placeholder on the server.
    <ClientOnly fallback={<Skeleton boxSize="10" rounded="full" />}>
      <IconButton
        onClick={toggleColorMode}
        aria-label={`Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
        variant="ghost"
        rounded="full"
        color="heading"
        {...props}
      >
        {colorMode === "dark" ? <Sun /> : <Moon />}
      </IconButton>
    </ClientOnly>
  );
}
