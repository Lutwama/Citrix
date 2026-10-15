import { Box, Flex, Grid, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/sections/misc-sections";
import { Section } from "@/components/ui/primitives";
import { getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_WA_MESSAGE, telLink, whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contact & Get a Quote",
  description:
    "Request a quote for print, design, branding, web or events. Call, WhatsApp or visit Citrix Solutions in Kampala.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const contacts = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "Chat with us",
      href: whatsappLink(settings.whatsapp, DEFAULT_WA_MESSAGE),
      external: true,
    },
    { icon: Phone, label: "Call", value: settings.phone, href: telLink(settings.phone) },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: "Visit", value: `${settings.address}, ${settings.city}` },
    ...(settings.hours ? [{ icon: Clock, label: "Hours", value: settings.hours }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next project."
        description="Tell us what you need and get a tailored quote within one business day — or reach us directly on WhatsApp."
      />

      <Section tone="mist">
        <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap={{ base: 8, lg: 10 }} alignItems="start">
          <Box
            bg="surface"
            rounded="3xl"
            p={{ base: 6, md: 10 }}
            boxShadow="0 30px 60px -30px rgba(0,78,155,0.25)"
            position="relative"
          >
            <Heading as="h2" textStyle="h3" fontSize={{ base: "2xl", md: "3xl" }} color="heading" mb={2}>
              Request a quote
            </Heading>
            <Text color="fg.muted" mb={8}>
              Three quick steps. No obligation.
            </Text>
            <Suspense>
              <QuoteForm services={services} whatsapp={settings.whatsapp} />
            </Suspense>
          </Box>

          <Stack gap={6} position={{ lg: "sticky" }} top={{ lg: 28 }}>
            <Stack gap={1} bg="brand.blue" color="white" rounded="3xl" p={{ base: 6, md: 8 }}>
              <Heading as="h2" textStyle="h3" mb={4}>
                Reach us directly
              </Heading>
              {contacts.map((c) => {
                const inner = (
                  <Flex gap={4} align="center" py={3}>
                    <Box
                      display="grid"
                      placeItems="center"
                      boxSize={11}
                      rounded="full"
                      bg="whiteAlpha.200"
                      flexShrink={0}
                    >
                      <c.icon size={20} />
                    </Box>
                    <Box>
                      <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" color="brand.ice">
                        {c.label}
                      </Text>
                      <Text fontWeight="600">{c.value}</Text>
                    </Box>
                  </Flex>
                );
                return c.href ? (
                  <Link
                    key={c.label}
                    href={c.href}
                    color="white"
                    _hover={{ textDecoration: "none", opacity: 0.85 }}
                    {...("external" in c ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {inner}
                  </Link>
                ) : (
                  <Box key={c.label}>{inner}</Box>
                );
              })}
            </Stack>
            {settings.mapEmbedUrl && (
              <Box rounded="3xl" overflow="hidden" h="280px" borderWidth="1px" borderColor="line">
                <iframe
                  title="Map to Citrix Solutions"
                  src={settings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            )}
          </Stack>
        </Grid>
      </Section>
    </>
  );
}
