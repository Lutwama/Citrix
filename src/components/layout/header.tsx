"use client";

import {
  Box,
  Button,
  CloseButton,
  Container,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Link,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, Menu, Phone } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { NAV } from "@/lib/nav";
import type { ServiceSummary } from "@/lib/types";
import { telLink } from "@/lib/whatsapp";

export function Header({ phone, services }: { phone: string; services: ServiceSummary[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={scrolled ? "rgba(255,255,255,0.92)" : "white"}
      backdropFilter={scrolled ? "saturate(180%) blur(12px)" : undefined}
      borderBottomWidth="1px"
      borderColor={scrolled ? "blackAlpha.100" : "transparent"}
      transition="all 0.2s"
    >
      <Container maxW="7xl">
        <Flex h={{ base: 16, md: 20 }} align="center" justify="space-between" gap={6}>
          <Link asChild _hover={{ textDecoration: "none" }} aria-label="Citrix Solutions — home">
            <NextLink href="/">
              <Logo height={{ base: "48px", md: "60px" }} />
            </NextLink>
          </Link>

          <HStack as="nav" aria-label="Main" gap={1} display={{ base: "none", lg: "flex" }}>
            {NAV.filter((n) => n.href !== "/contact").map((item) => (
              <Link
                key={item.href}
                asChild
                px={4}
                py={2}
                rounded="full"
                fontWeight="600"
                fontFamily="heading"
                color={isActive(item.href) ? "brand.blue" : "fg"}
                bg={isActive(item.href) ? "brand.mist" : undefined}
                _hover={{ color: "brand.blue", bg: "brand.mist", textDecoration: "none" }}
              >
                <NextLink href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </NextLink>
              </Link>
            ))}
          </HStack>

          <HStack gap={2}>
            <IconButton asChild aria-label="Call us" variant="ghost" color="brand.blue" display={{ base: "inline-flex", lg: "none" }} rounded="full">
              <a href={telLink(phone)}>
                <Phone />
              </a>
            </IconButton>
            <Button asChild colorPalette="brand" rounded="full" px={6} display={{ base: "none", sm: "inline-flex" }}>
              <NextLink href="/contact">
                Get a quote <ArrowRight />
              </NextLink>
            </Button>

            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end" size="sm">
              <Drawer.Trigger asChild>
                <IconButton aria-label="Open menu" variant="ghost" color="brand.blue" display={{ base: "inline-flex", lg: "none" }} rounded="full">
                  <Menu />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Logo height="48px" />
                    </Drawer.Header>
                    <Drawer.Body>
                      <Stack as="nav" aria-label="Mobile" gap={1}>
                        {NAV.map((item) => (
                          <Link
                            key={item.href}
                            asChild
                            py={3}
                            fontSize="xl"
                            fontFamily="heading"
                            fontWeight="600"
                            color={isActive(item.href) ? "brand.cyan" : "brand.blue"}
                          >
                            <NextLink href={item.href}>{item.label}</NextLink>
                          </Link>
                        ))}
                      </Stack>
                      <Text textStyle="eyebrow" color="fg.muted" mt={8} mb={3}>
                        Services
                      </Text>
                      <Stack gap={2}>
                        {services.map((s) => (
                          <Link key={s.slug} asChild color="fg.muted">
                            <NextLink href={`/services/${s.slug}`}>{s.title}</NextLink>
                          </Link>
                        ))}
                      </Stack>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Button asChild colorPalette="brand" rounded="full" w="full" size="lg">
                        <NextLink href="/contact">Get a quote</NextLink>
                      </Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
