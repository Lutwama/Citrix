import { Box, Container, Heading, Stack, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

/**
 * Billboard-style artwork (paint strokes, splatters, halftone dots, crop marks
 * and the service names) for hero banners. A left-hand shade keeps text readable.
 */
export function BillboardSplash(props: BoxProps) {
  return (
    <Box aria-hidden position="absolute" inset="0" pointerEvents="none" {...props}>
      <Box
        position="absolute"
        inset="0"
        backgroundImage="url(/brand/billboard-splash.svg)"
        backgroundSize="cover"
        backgroundPosition="center"
      />
      <Box
        position="absolute"
        inset="0"
        bgImage="linear-gradient(90deg, rgba(0,59,120,0.85) 0%, rgba(0,59,120,0.45) 45%, rgba(0,59,120,0) 75%)"
      />
    </Box>
  );
}

export function Section({
  children,
  tone = "light",
  ...rest
}: { children: ReactNode; tone?: "light" | "mist" | "ice" | "blue" | "teal" } & BoxProps) {
  const bg = {
    light: "bg",
    mist: "surface.mist",
    ice: "brand.ice",
    blue: "brand.blue",
    teal: "brand.teal",
  }[tone];
  const dark = tone === "blue" || tone === "teal";
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg={bg}
      color={dark ? "white" : "fg"}
      py={{ base: 16, md: 24 }}
      {...rest}
    >
      {/* full splash on blue; a lighter layer on teal so the section keeps its colour */}
      {dark && <BillboardSplash opacity={tone === "blue" ? 1 : 0.3} />}
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
    <Stack
      gap={4}
      textAlign={align}
      align={align === "center" ? "center" : "flex-start"}
      maxW="3xl"
      mx={align === "center" ? "auto" : undefined}
      mb={{ base: 10, md: 14 }}
    >
      {eyebrow && (
        <Text textStyle="eyebrow" color={dark ? "brand.ice" : "brand.cyan"}>
          {eyebrow}
        </Text>
      )}
      <Heading as="h2" textStyle="h2" color={dark ? "white" : "heading"}>
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
