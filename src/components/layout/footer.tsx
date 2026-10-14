import { Box, Container, Flex, Grid, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import NextLink from "next/link";
import { Logo } from "@/components/ui/logo";
import { BillboardSplash } from "@/components/ui/primitives";
import { SocialIcon } from "@/components/ui/social-icon";
import { NAV } from "@/lib/nav";
import type { ServiceSummary, SiteSettings } from "@/lib/types";
import { telLink } from "@/lib/whatsapp";

function FooterHeading({ children }: { children: string }) {
  return (
    <Text textStyle="eyebrow" color="brand.ice" mb={4}>
      {children}
    </Text>
  );
}

export function Footer({ settings, services }: { settings: SiteSettings; services: ServiceSummary[] }) {
  const linkProps = { color: "whiteAlpha.800", _hover: { color: "white" } } as const;

  return (
    <Box as="footer" position="relative" overflow="hidden" bg="brand.ink" color="white" pt={{ base: 16, md: 20 }} pb={8}>
      <BillboardSplash opacity={0.2} />
      <Container maxW="7xl" position="relative">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1.4fr 1fr 1fr 1.3fr" }} gap={{ base: 10, lg: 12 }}>
          <Stack gap={5}>
            <Logo tone="white" height={{ base: "64px", md: "76px" }} />
            <Text color="whiteAlpha.800" maxW="sm">
              {settings.description}
            </Text>
            <HStack gap={2}>
              {settings.socials.map((s) => (
                <Link
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  display="grid"
                  placeItems="center"
                  boxSize={10}
                  rounded="full"
                  bg="whiteAlpha.100"
                  color="white"
                  _hover={{ bg: "brand.cyan" }}
                >
                  <SocialIcon platform={s.platform} />
                </Link>
              ))}
            </HStack>
          </Stack>

          <Box>
            <FooterHeading>Services</FooterHeading>
            <Stack gap={3}>
              {services.map((s) => (
                <Link key={s.slug} asChild {...linkProps}>
                  <NextLink href={`/services/${s.slug}`}>{s.title}</NextLink>
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <FooterHeading>Company</FooterHeading>
            <Stack gap={3}>
              {NAV.filter((n) => n.href !== "/services").map((n) => (
                <Link key={n.href} asChild {...linkProps}>
                  <NextLink href={n.href}>{n.label}</NextLink>
                </Link>
              ))}
            </Stack>
          </Box>

          <Box>
            <FooterHeading>Get in touch</FooterHeading>
            <Stack gap={4} color="whiteAlpha.800">
              <Flex gap={3}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: 3 }} />
                <Text>
                  {settings.address}
                  <br />
                  {settings.city}
                </Text>
              </Flex>
              <Flex gap={3} align="center">
                <Phone size={18} />
                <Link href={telLink(settings.phone)} {...linkProps}>
                  {settings.phone}
                </Link>
              </Flex>
              <Flex gap={3} align="center">
                <Mail size={18} />
                <Link href={`mailto:${settings.email}`} {...linkProps}>
                  {settings.email}
                </Link>
              </Flex>
              {settings.hours && (
                <Flex gap={3} align="center">
                  <Clock size={18} />
                  <Text>{settings.hours}</Text>
                </Flex>
              )}
            </Stack>
          </Box>
        </Grid>

        <Flex
          mt={{ base: 12, md: 16 }}
          pt={6}
          borderTopWidth="1px"
          borderColor="whiteAlpha.200"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={3}
          fontSize="sm"
          color="whiteAlpha.700"
        >
          <Text>© {new Date().getFullYear()} {settings.name}. All rights reserved.</Text>
          <Text>{settings.tagline}</Text>
        </Flex>
      </Container>
    </Box>
  );
}
