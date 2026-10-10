import { Button, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { Section } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section tone="mist" py={{ base: 24, md: 32 }}>
      <Stack align="center" textAlign="center" gap={6}>
        <LogoMark size={96} />
        <Text textStyle="eyebrow" color="brand.cyan">
          404
        </Text>
        <Heading as="h1" textStyle="h1" color="brand.blue">
          This page took a wrong turn.
        </Heading>
        <Text color="fg.muted" maxW="md">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </Text>
        <HStack gap={3}>
          <Button asChild colorPalette="brand" rounded="full" px={7}>
            <NextLink href="/">Back home</NextLink>
          </Button>
          <Button asChild variant="outline" colorPalette="brand" rounded="full" px={7}>
            <NextLink href="/contact">Contact us</NextLink>
          </Button>
        </HStack>
      </Stack>
    </Section>
  );
}
