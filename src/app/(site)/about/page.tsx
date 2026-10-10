import { Box, Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Handshake, Layers, Lightbulb, Timer } from "lucide-react";
import { CtaBand, PageHero, StatsBand } from "@/components/sections/misc-sections";
import { LogoMark } from "@/components/ui/logo";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { getSettings, getTeam } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

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

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);

  return (
    <>
      <PageHero eyebrow="About us" title="We help Ugandan brands grow — beautifully." description={settings.description} />

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1.1fr 1fr" }} gap={{ base: 10, lg: 20 }} alignItems="center">
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
            </Stack>
          </Box>
          <Reveal>
            <Box position="relative" rounded="3xl" bg="brand.mist" p={{ base: 10, md: 16 }} display="grid" placeItems="center" overflow="hidden">
              <Box aria-hidden position="absolute" inset="0" backgroundImage="url(/brand/swirl-pattern-light.svg)" backgroundSize="140px" />
              <LogoMark size={220} position="relative" />
            </Box>
          </Reveal>
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

      {team.length > 0 && (
        <Section>
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

      <CtaBand whatsapp={settings.whatsapp} title="Let's build something great together." />
    </>
  );
}
