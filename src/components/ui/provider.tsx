"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";
import { system } from "@/theme/system";
import { EmotionRegistry } from "./emotion-registry";

export function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }),
  );

  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            {/* Honour the OS "reduce motion" setting for every animation */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
          </NuqsAdapter>
        </QueryClientProvider>
      </ChakraProvider>
    </EmotionRegistry>
  );
}
