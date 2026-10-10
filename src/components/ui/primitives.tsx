import { Box, Container, Heading, Stack, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Repeating swirl motif from the brand guide, used on dark sections. */
export function SwirlPattern({ opacity = 0.08, ...rest }: { opacity?: number } & BoxProps) {
  return (
    <Box
      aria-hidden
      position="absolute"
      inset="0"
      pointerEvents="none"
      backgroundImage="url(/brand/swirl-pattern.svg)"
      backgroundSize="160px"
      opacity={opacity}
      {...rest}
    />
  );
}

export function Section({
  children,
  tone = "light",
  ...rest
}: { children: ReactNode; tone?: "light" | "mist" | "ice" | "blue" | "teal" } & BoxProps) {
  const bg = {
    light: "white",
    mist: "brand.mist",
    ice: "brand.ice",
    blue: "brand.blue",
    teal: "brand.teal",
  }[tone];
  const dark = tone === "blue" || tone === "teal";
  return (
    <Box as="section" position="relative" overflow="hidden" bg={bg} color={dark ? "white" : "fg"} py={{ base: 16, md: 24 }} {...rest}>
      {dark && <SwirlPattern />}
      <Container maxW="7xl" position="relative">
        {children}
      </Container>
    </Box>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  dark?: boolean;
}) {
  return (
    <Stack gap={4} textAlign={align} align={align === "center" ? "center" : "flex-start"} maxW="3xl" mx={align === "center" ? "auto" : undefined} mb={{ base: 10, md: 14 }}>
      {eyebrow && (
        <Text textStyle="eyebrow" color={dark ? "brand.ice" : "brand.cyan"}>
          {eyebrow}
        </Text>
      )}
      <Heading as="h2" textStyle="h2" color={dark ? "white" : "brand.blue"}>
        {title}
      </Heading>
      {description && (
        <Text textStyle="lead" color={dark ? "whiteAlpha.800" : "fg.muted"}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
