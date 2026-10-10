import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { FeaturedWorkCarousel, TestimonialsCarousel } from "@/components/sections/carousels";
import { Hero } from "@/components/sections/hero";
import { CtaBand, ProcessSteps, StatsBand } from "@/components/sections/misc-sections";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { services as fallbackServices } from "@/content/fallback";
import { getFeaturedProjects, getPosts, getServices, getSettings, getTestimonials } from "@/lib/data";

const PROCESS = fallbackServices[0].process;

export default async function HomePage() {
  const [settings, services, projects, testimonials, posts] = await Promise.all([
    getSettings(),
    getServices(),
    getFeaturedProjects(),
    getTestimonials(),
    getPosts({ limit: 3 }),
  ]);

  return (
    <>
      <Hero whatsapp={settings.whatsapp} />

      <Section tone="mist">
        <SectionHeading
          eyebrow="What we do"
          title="Everything your brand needs, under one roof."
          description="Five disciplines, one team. We connect strategy, design, production and experience so your brand shows up consistently everywhere."
        />
        <ServicesGrid services={services} />
      </Section>

      {settings.stats.length > 0 && <StatsBand stats={settings.stats} />}

      {projects.length > 0 && (
        <Section>
          <FeaturedWorkCarousel
            projects={projects}
            header={
              <SectionHeading eyebrow="Featured work" title="Brands we've helped grow." description="A selection of recent projects across print, identity, digital and events." />
            }
          />
          <Flex justify="center" mt={12}>
            <Button asChild variant="outline" colorPalette="brand" rounded="full" size="lg" px={8}>
              <NextLink href="/portfolio">
                View full portfolio <ArrowRight />
              </NextLink>
            </Button>
          </Flex>
        </Section>
      )}

      <Section tone="mist">
        <SectionHeading eyebrow="How we work" title="A simple process, built around you." align="center" />
        <ProcessSteps steps={PROCESS} />
      </Section>

      {testimonials.length > 0 && (
        <Section tone="blue">
          <SectionHeading dark eyebrow="Client stories" title="What our clients say" align="center" />
          <TestimonialsCarousel testimonials={testimonials} />
        </Section>
      )}

      {posts.items.length > 0 && (
        <Section>
          <Flex justify="space-between" align="flex-end" gap={6} wrap="wrap">
            <SectionHeading eyebrow="Insights" title="Ideas for growing brands" />
            <Box mb={{ base: 8, md: 14 }}>
              <Button asChild variant="ghost" colorPalette="brand" rounded="full">
                <NextLink href="/blog">
                  All articles <ArrowRight />
                </NextLink>
              </Button>
            </Box>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {posts.items.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.08} style={{ height: "100%" }}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </SimpleGrid>
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} />
    </>
  );
}
