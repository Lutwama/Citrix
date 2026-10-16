import { Box, Button, Grid, Heading, HStack, LinkBox, LinkOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, Building2, GraduationCap, HeartPulse, Landmark, ShoppingBag, UtensilsCrossed } from "lucide-react";
import NextLink from "next/link";
import { Suspense } from "react";
import { ProjectFeed } from "@/components/feeds";
import { SampleBadge } from "@/components/portfolio/project-card";
import { TestimonialsCarousel } from "@/components/sections/carousels";
import { CtaBand, PageHero, ProcessSteps } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { clients } from "@/content/clients";
import { services as fallbackServices } from "@/content/fallback";
import { getProductsByService } from "@/content/products";
import { getProject, getProjects, getServices, getSettings, getTestimonials } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Selected print, branding, design, fabrication, web and event projects by Citrix Solutions for brands across Uganda.",
  path: "/portfolio",
});

const INDUSTRIES = [
  {
    icon: Landmark,
    title: "Banking & corporate",
    text: "Campaigns, annual reports, branch signage and staff events.",
  },
  {
    icon: Building2,
    title: "NGOs & government",
    text: "Commissioning plaques, workshops, conference kits and procurement-ready quotes.",
  },
  {
    icon: UtensilsCrossed,
    title: "Hospitality & food",
    text: "Menus, packaging, signage and websites for hotels, lodges and restaurants.",
  },
  { icon: HeartPulse, title: "Health", text: "Illuminated pharmacy signs, clinic wayfinding, leaflets and uniforms." },
  {
    icon: GraduationCap,
    title: "Schools & universities",
    text: "Entrance gantries, campus wayfinding, prospectuses and graduation events.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & FMCG",
    text: "Shop fronts, light boxes, kiosks, labels and point-of-sale displays.",
  },
];

export default async function PortfolioPage() {
  const [initial, services, settings, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getSettings(),
    getTestimonials(),
  ]);
  const filters = services.map((s) => ({ label: s.title, value: s.slug }));
  const featured = initial.items[0] ? await getProject(initial.items[0].slug) : null;
  const fabrication = getProductsByService("fabrication");

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that moves brands forward."
        description="Identity systems, print campaigns, signs and structures, websites and events — designed and built for ambitious businesses across Uganda."
      >
        <HStack gap={3} flexWrap="wrap" pt={2}>
          {services.map((s) => (
            <Button
              key={s.slug}
              asChild
              size="sm"
              rounded="full"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.500"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <NextLink href={`/portfolio?service=${s.slug}#projects`}>{s.title}</NextLink>
            </Button>
          ))}
        </HStack>
      </PageHero>

      {featured && (
        <Section>
          <SectionHeading eyebrow="Featured case study" title="A closer look at our work" />
          <Reveal>
            <LinkBox as="article" role="group">
              <Grid
                templateColumns={{ base: "1fr", lg: "1.25fr 1fr" }}
                rounded="card"
                overflow="hidden"
                bg="surface.mist"
                transition="box-shadow 0.25s"
                _hover={{ boxShadow: "0 30px 60px -30px rgba(0,78,155,0.45)" }}
              >
                <Box position="relative">
                  <Media
                    image={featured.cover}
                    alt={featured.title}
                    seed={featured.slug}
                    art={featured.art}
                    artLabel={featured.client}
                    aspectRatio={{ base: 4 / 3, lg: "auto" }}
                    h={{ lg: "full" }}
                    minH={{ lg: "420px" }}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {featured.sample && (
                    <Box position="absolute" top={4} left={4}>
                      <SampleBadge />
                    </Box>
                  )}
                </Box>
                <Stack gap={5} p={{ base: 6, md: 10 }} justify="center">
                  <HStack gap={3} flexWrap="wrap">
                    {featured.services.map((s) => (
                      <Text key={s.slug} as="span" textStyle="eyebrow" color="brand.cyan">
                        {s.title}
                      </Text>
                    ))}
                  </HStack>
                  <Heading as="h3" textStyle="h2" color="heading">
                    <LinkOverlay asChild>
                      <NextLink href={`/portfolio/${featured.slug}`}>{featured.title}</NextLink>
                    </LinkOverlay>
                  </Heading>
                  {featured.excerpt && (
                    <Text color="fg.muted" fontSize="lg">
                      {featured.excerpt}
                    </Text>
                  )}
                  <SimpleGrid columns={3} gap={4}>
                    {[
                      ["Industry", featured.industry],
                      ["Location", featured.location],
                      ["Timeline", featured.duration],
                    ]
                      .filter(([, v]) => v)
                      .map(([label, value]) => (
                        <Box key={label}>
                          <Text textStyle="eyebrow" color="fg.muted" mb={1}>
                            {label}
                          </Text>
                          <Text fontWeight="700" color="ink">
                            {value}
                          </Text>
                        </Box>
                      ))}
                  </SimpleGrid>
                  <Text
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    fontWeight="700"
                    fontFamily="heading"
                    color="heading"
                    _groupHover={{ gap: 3 }}
                    transition="gap 0.2s"
                  >
                    Read the case study <ArrowRight size={18} />
                  </Text>
                </Stack>
              </Grid>
            </LinkBox>
          </Reveal>
        </Section>
      )}

      <Section tone="teal">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.3fr" }} gap={{ base: 8, lg: 16 }} alignItems="center">
          <Box>
            <SectionHeading
              dark
              eyebrow="Fabrication"
              title="We don't just design it. We build it."
              description="Signs, pylons, plaques, kiosks and display units made and installed by one team, from site survey and permits to switch-on."
            />
            <Button
              asChild
              size="lg"
              rounded="full"
              bg="white"
              color="brand.blue"
              _hover={{ bg: "brand.ice" }}
              px={7}
              mt={-4}
            >
              <NextLink href="/portfolio?service=fabrication#projects">
                See fabrication projects <ArrowRight />
              </NextLink>
            </Button>
          </Box>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
            {fabrication.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <LinkBox
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={3}
                  px={5}
                  py={4}
                  rounded="xl"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  transition="all 0.2s"
                  _hover={{ bg: "whiteAlpha.200", borderColor: "whiteAlpha.400" }}
                >
                  <LinkOverlay asChild fontWeight="700" fontFamily="heading" color="white">
                    <NextLink href={`/services/fabrication/${p.slug}`}>{p.title}</NextLink>
                  </LinkOverlay>
                  <Box color="brand.ice" flexShrink={0}>
                    <ArrowRight size={18} />
                  </Box>
                </LinkBox>
              </Reveal>
            ))}
          </SimpleGrid>
        </Grid>
      </Section>

      <Section tone="mist" id="projects">
        <SectionHeading
          eyebrow="All projects"
          title="Browse by service"
          description="Filter to see print, branding, design, fabrication, web and event work."
        />
        {/* nuqs reads search params on the client, so it needs a Suspense boundary on a static page */}
        <Suspense>
          <ProjectFeed initial={initial} filters={filters} />
        </Suspense>
      </Section>

      {clients.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Our clients" title="Trusted by brands across Uganda" align="center" />
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} gap={6} alignItems="center">
            {clients.map((c) => (
              <Box
                key={c.name}
                display="grid"
                placeItems="center"
                h={20}
                px={4}
                rounded="xl"
                bg="surface"
                borderWidth="1px"
                borderColor="line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{
                    maxHeight: 48,
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "grayscale(1)",
                    opacity: 0.8,
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Section>
      )}

      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Experience across sectors"
          description="We tailor print, design, fabrication, web and events to how each industry buys and communicates."
        />
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {INDUSTRIES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06} style={{ height: "100%" }}>
              <Stack h="full" gap={3} p={6} rounded="card" borderWidth="1px" borderColor="line">
                <Box display="grid" placeItems="center" boxSize={12} rounded="xl" bg="surface.mist" color="heading">
                  <Icon size={22} />
                </Box>
                <Heading as="h3" fontSize="lg" fontFamily="heading" fontWeight="700" color="heading">
                  {title}
                </Heading>
                <Text color="fg.muted">{text}</Text>
              </Stack>
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      <Section tone="teal">
        <SectionHeading dark eyebrow="How we deliver" title="From brief to finished work" />
        <ProcessSteps steps={fallbackServices[0].process} dark />
      </Section>

      {testimonials.length > 0 && (
        <Section tone="blue">
          <SectionHeading dark eyebrow="Client stories" title="What our clients say" align="center" />
          <TestimonialsCarousel testimonials={testimonials} />
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} title="Have a project in mind?" />
    </>
  );
}
