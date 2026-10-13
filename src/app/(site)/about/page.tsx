import { Box, Button, Grid, Heading, HStack, Link, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Compass,
  FileCheck2,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Target,
  Timer,
  Truck,
  UserRound,
  Warehouse,
} from "lucide-react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { ProjectArt } from "@/components/portfolio/project-art";
import { CtaBand, PageHero, ProcessSteps, StatsBand } from "@/components/sections/misc-sections";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { services as fallbackServices } from "@/content/fallback";
import { getServices, getSettings, getTeam } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { telLink, whatsappLink } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Meet Citrix Solutions — a Kampala creative team delivering print, design, branding, web and events under one roof.",
  path: "/about",
});

const VALUES = [
  { icon: Layers, title: "Integrated", text: "Print, design, digital and events working together — one team, one consistent brand." },
  { icon: Lightbulb, title: "Creative", text: "Ideas grounded in strategy, crafted to stand out in the Ugandan market and beyond." },
  { icon: Timer, title: "Reliable", text: "Clear timelines, honest pricing and deadlines we keep — every single time." },
  { icon: Handshake, title: "Partnership", text: "We measure success by your growth, and we're with you for the long run." },
];

const REASONS = [
  { icon: UserRound, title: "One point of contact", text: "One team handles your design, print, website and event, so nothing gets lost between suppliers." },
  { icon: BadgeCheck, title: "Proof before production", text: "You approve a proof or mock-up before anything is printed, built or installed." },
  { icon: Warehouse, title: "Design and production together", text: "Our designers and production team work side by side, so what you approve is what you get." },
  { icon: FileCheck2, title: "Clear, itemised quotes", text: "Every quote lists what's included, so you can compare and get approval easily." },
  { icon: Clock, title: "Deadlines agreed up front", text: "We confirm turnaround with every quote and keep you updated until delivery." },
  { icon: Truck, title: "Delivery and installation", text: "We deliver across Kampala, arrange courier upcountry, and install signage and stands." },
];

const CORPORATE = [
  "Formal quotations on company letterhead",
  "Invoices, delivery notes and receipts",
  "Company documents for supplier registration, on request",
  "Proforma invoices for purchase orders",
  "One account manager for repeat orders",
  "Branch roll-outs across the country",
];

const MOSAIC = [
  { art: "cards", caption: "Print & stationery" },
  { art: "event", caption: "Events" },
  { art: "web", caption: "Websites" },
  { art: "signage", caption: "Signage & branding" },
] as const;

export default async function AboutPage() {
  const [settings, team, services] = await Promise.all([getSettings(), getTeam(), getServices()]);
  const contact = [
    { icon: MapPin, label: "Office", value: `${settings.address}, ${settings.city}` },
    { icon: Phone, label: "Phone", value: settings.phone, href: telLink(settings.phone) },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    ...(settings.hours ? [{ icon: Clock, label: "Hours", value: settings.hours }] : []),
  ];

  return (
    <>
      <PageHero eyebrow="About us" title="We help Ugandan brands grow — beautifully." description={settings.description}>
        <HStack gap={3} flexWrap="wrap" pt={2}>
          <Button asChild size="lg" rounded="full" bg="white" color="brand.blue" _hover={{ bg: "brand.ice" }} px={7}>
            <NextLink href="/contact">
              Get a free quote <ArrowRight />
            </NextLink>
          </Button>
          <Button asChild size="lg" rounded="full" variant="outline" color="white" borderColor="whiteAlpha.500" _hover={{ bg: "whiteAlpha.200" }} px={7}>
            <a href={whatsappLink(settings.whatsapp, "Hello Citrix! I'd like to know more about your company.")} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </Button>
        </HStack>
      </PageHero>

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1.05fr 1fr" }} gap={{ base: 10, lg: 20 }} alignItems="center">
          <Box>
            <SectionHeading eyebrow="Our story" title="Integrated solutions for modern brand growth." />
            <Stack gap={5} color="fg.muted" fontSize="lg" lineHeight="1.8">
              <Text>
                Citrix Solutions started with a simple observation: growing businesses were juggling a printer, a designer, a web
                developer and an events company — and their brand was getting lost in between.
              </Text>
              <Text>
                So we brought it all under one roof. Today our team of designers, print specialists, developers and event planners
                work side by side, giving every client a single point of contact and a brand that looks the same on a business card, a
                billboard, a website and a stage.
              </Text>
              <Text>
                From our office on Nkrumah Road in the heart of Kampala, we work with start-ups, established businesses, NGOs and
                institutions across Uganda.
              </Text>
            </Stack>
          </Box>
          <Reveal>
            <SimpleGrid columns={2} gap={4}>
              {MOSAIC.map((m, i) => (
                <Box key={m.caption} mt={i % 2 === 1 ? 8 : 0} mb={i % 2 === 0 ? 8 : 0}>
                  <Box rounded="card" overflow="hidden" aspectRatio={1} boxShadow="0 20px 40px -24px rgba(0,78,155,0.45)">
                    <ProjectArt kind={m.art} label={settings.name} seed={`about-${i}`} />
                  </Box>
                  <Text mt={3} fontSize="sm" fontWeight="700" fontFamily="heading" color="brand.blue">
                    {m.caption}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Reveal>
        </Grid>
      </Section>

      <Section tone="mist">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {[
            { icon: Target, title: "Our mission", text: "To give every business, from start-up to institution, one dependable partner for the print, design, digital and events that build its brand." },
            { icon: Compass, title: "Our vision", text: "To be the first name Ugandan brands think of when they want to look professional, consistent and ready to grow." },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} style={{ height: "100%" }}>
              <Stack h="full" gap={4} p={{ base: 7, md: 10 }} rounded="card" bg={i === 0 ? "brand.blue" : "white"} color={i === 0 ? "white" : "brand.ink"} borderWidth={i === 0 ? 0 : "1px"} borderColor="blackAlpha.100">
                <Box display="grid" placeItems="center" boxSize={12} rounded="xl" bg={i === 0 ? "whiteAlpha.200" : "brand.mist"} color={i === 0 ? "white" : "brand.blue"}>
                  <Icon size={24} />
                </Box>
                <Heading as="h2" textStyle="h3" color={i === 0 ? "white" : "brand.blue"}>
                  {title}
                </Heading>
                <Text fontSize="lg" lineHeight="1.7" color={i === 0 ? "brand.ice" : "fg.muted"}>
                  {text}
                </Text>
              </Stack>
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      <Section>
        <SectionHeading eyebrow="What we do" title="Everything your brand needs, under one roof." description="Five disciplines, one team. Explore each service to see products, options and prices." />
        <ServicesGrid services={services} />
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Why Citrix" title="Why businesses choose us" />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06} style={{ height: "100%" }}>
              <Stack h="full" gap={3} p={7} rounded="card" bg="white" borderWidth="1px" borderColor="blackAlpha.100">
                <Box display="grid" placeItems="center" boxSize={12} rounded="xl" bg="brand.mist" color="brand.blue">
                  <Icon size={22} />
                </Box>
                <Heading as="h3" fontSize="lg" fontFamily="heading" fontWeight="700" color="brand.blue">
                  {title}
                </Heading>
                <Text color="fg.muted">{text}</Text>
              </Stack>
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="center">
          <Box rounded="card" overflow="hidden" aspectRatio={4 / 3} order={{ base: 2, lg: 1 }}>
            <ProjectArt kind="stand" label={settings.name} seed="about-corporate" />
          </Box>
          <Box order={{ base: 1, lg: 2 }}>
            <SectionHeading
              eyebrow="Corporate & institutional clients"
              title="Easy to work with for corporates, NGOs and government"
              description="We understand procurement. From the first quotation to the final delivery note, our paperwork is ready when your finance team needs it."
            />
            <List.Root as="ul" listStyle="none" display="grid" gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3} mb={8}>
              {CORPORATE.map((item) => (
                <List.Item key={item} display="flex" gap={3} alignItems="flex-start" color="brand.ink" fontWeight="600">
                  <Box color="brand.cyan" flexShrink={0} mt="2px">
                    <BadgeCheck size={20} />
                  </Box>
                  {item}
                </List.Item>
              ))}
            </List.Root>
            <Button asChild colorPalette="brand" rounded="full" size="lg" px={8}>
              <NextLink href="/contact">
                Request a formal quotation <ArrowRight />
              </NextLink>
            </Button>
          </Box>
        </Grid>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="What we stand for" title="Our values" align="center" />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} style={{ height: "100%" }}>
              <Stack h="full" gap={4} p={7} rounded="card" bg="white" borderWidth="1px" borderColor="blackAlpha.100">
                <Box display="grid" placeItems="center" boxSize={12} rounded="xl" bg="brand.blue" color="white">
                  <v.icon size={22} />
                </Box>
                <Heading as="h3" textStyle="h3" color="brand.blue">
                  {v.title}
                </Heading>
                <Text color="fg.muted">{v.text}</Text>
              </Stack>
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      {settings.stats.length > 0 && <StatsBand stats={settings.stats} />}

      <Section>
        <SectionHeading eyebrow="How we work" title="A simple process, built around you." />
        <ProcessSteps steps={fallbackServices[0].process} />
      </Section>

      {team.length > 0 && (
        <Section tone="mist">
          <SectionHeading eyebrow="Our team" title="The people behind the work" />
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 5, md: 8 }}>
            {team.map((m, i) => (
              <Reveal key={m._id} delay={i * 0.06}>
                <Media image={m.photo} alt={m.name} seed={m._id} aspectRatio={4 / 5} rounded="card" mb={4} sizes="(max-width: 768px) 50vw, 25vw" />
                <Text fontFamily="heading" fontWeight="700" fontSize="lg" color="brand.blue">
                  {m.name}
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  {m.role}
                </Text>
              </Reveal>
            ))}
          </SimpleGrid>
        </Section>
      )}

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }} gap={{ base: 10, lg: 16 }} alignItems="start">
          <Box>
            <SectionHeading eyebrow="Visit us" title="Come and see us in Kampala" description="Drop in to discuss your project, see paper and finish samples, or approve a proof in person." />
            <Stack gap={5}>
              {contact.map(({ icon: Icon, label, value, href }) => (
                <HStack key={label} gap={4} alignItems="flex-start">
                  <Box display="grid" placeItems="center" boxSize={11} rounded="xl" bg="brand.mist" color="brand.blue" flexShrink={0}>
                    <Icon size={20} />
                  </Box>
                  <Box>
                    <Text textStyle="eyebrow" color="fg.muted">
                      {label}
                    </Text>
                    {href ? (
                      <Link href={href} fontWeight="700" color="brand.ink" _hover={{ color: "brand.blue" }}>
                        {value}
                      </Link>
                    ) : (
                      <Text fontWeight="700" color="brand.ink">
                        {value}
                      </Text>
                    )}
                  </Box>
                </HStack>
              ))}
            </Stack>
          </Box>
          {settings.mapEmbedUrl && (
            <Box rounded="card" overflow="hidden" h={{ base: "300px", md: "400px" }} borderWidth="1px" borderColor="blackAlpha.100">
              <iframe title="Map to Citrix Solutions" src={settings.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Box>
          )}
        </Grid>
      </Section>

      <CtaBand whatsapp={settings.whatsapp} title="Let's build something great together." />
    </>
  );
}
