import { Box, Grid, Heading, HStack, LinkBox, LinkOverlay, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import {
  ArrowRight,
  CalendarCheck,
  Hammer,
  MonitorSmartphone,
  PenTool,
  Printer,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import NextLink from "next/link";
import { Suspense } from "react";
import { formatDate } from "@/components/blog/post-card";
import { PostFeed } from "@/components/feeds";
import { CtaBand, PageHero } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { getCategories, getPosts, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical guides on printing, branding, design, fabrication, websites and events from the Citrix Solutions team in Kampala.",
  path: "/blog",
});

const TOPICS: Record<string, { icon: LucideIcon; text: string }> = {
  print: { icon: Printer, text: "Paper, finishes, file preparation and choosing the right print." },
  branding: { icon: Sparkles, text: "Logos, identity systems and keeping your brand consistent." },
  design: { icon: PenTool, text: "Company profiles, social media and design that sells." },
  fabrication: { icon: Hammer, text: "Shop signs, light boxes, pylons and the materials behind them." },
  web: { icon: MonitorSmartphone, text: "Fast websites, domains, email and selling online." },
  events: { icon: CalendarCheck, text: "Launches, conferences and exhibition stands that work." },
};

export default async function BlogPage() {
  const [initial, categories, settings] = await Promise.all([getPosts(), getCategories(), getSettings()]);
  const counts = await Promise.all(
    categories.map((c) => getPosts({ category: c.slug, limit: 1 }).then((r) => r.total)),
  );
  const featured = initial.items[0];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical guides for growing brands."
        description="Straight answers on printing, branding, design, fabrication, websites and events from our team in Kampala."
      />

      {featured && (
        <Section>
          <Reveal>
            <LinkBox as="article" role="group">
              <Grid templateColumns={{ base: "1fr", lg: "1.3fr 1fr" }} gap={{ base: 6, lg: 12 }} alignItems="center">
                <Box rounded="card" overflow="hidden">
                  <Media
                    image={featured.cover}
                    alt={featured.title}
                    seed={featured.slug}
                    art={featured.art}
                    artLabel={featured.category?.title ?? settings.name}
                    aspectRatio={16 / 10}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    transition="transform 0.5s cubic-bezier(.22,1,.36,1)"
                    _groupHover={{ transform: "scale(1.03)" }}
                  />
                </Box>
                <Stack gap={4}>
                  <Text textStyle="eyebrow" color="brand.cyan">
                    Latest guide
                  </Text>
                  <Heading
                    as="h2"
                    textStyle="h2"
                    color="heading"
                    _groupHover={{ color: "brand.cyan" }}
                    transition="color 0.2s"
                  >
                    <LinkOverlay asChild>
                      <NextLink href={`/blog/${featured.slug}`}>{featured.title}</NextLink>
                    </LinkOverlay>
                  </Heading>
                  <Text color="fg.muted" fontSize="lg">
                    {featured.excerpt}
                  </Text>
                  <HStack gap={2} fontSize="sm" color="fg.muted">
                    {featured.category && (
                      <Text as="span" fontWeight="700" color="brand.cyan">
                        {featured.category.title}
                      </Text>
                    )}
                    <Text as="span">·</Text>
                    <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                    {featured.readingMinutes ? (
                      <>
                        <Text as="span">·</Text>
                        <Text as="span">{featured.readingMinutes} min read</Text>
                      </>
                    ) : null}
                  </HStack>
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
                    Read the guide <ArrowRight size={18} />
                  </Text>
                </Stack>
              </Grid>
            </LinkBox>
          </Reveal>
        </Section>
      )}

      <Section tone="mist" pt={{ base: 12, md: 16 }}>
        <SectionHeading eyebrow="Browse by topic" title="Guides for every part of your brand" />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 6 }} gap={4}>
          {categories.map((c, i) => {
            const topic = TOPICS[c.slug];
            const Icon = topic?.icon ?? Sparkles;
            return (
              <Reveal key={c.slug} delay={i * 0.05} style={{ height: "100%" }}>
                <LinkBox
                  as="article"
                  role="group"
                  h="full"
                  p={5}
                  rounded="card"
                  bg="surface"
                  borderWidth="1px"
                  borderColor="line"
                  transition="all 0.25s"
                  _hover={{
                    transform: "translateY(-3px)",
                    borderColor: "brand.ice",
                    boxShadow: "0 16px 32px -20px rgba(0,78,155,0.4)",
                  }}
                >
                  <Box
                    display="grid"
                    placeItems="center"
                    boxSize={11}
                    rounded="xl"
                    bg="surface.mist"
                    color="heading"
                    mb={4}
                    _groupHover={{ bg: "brand.blue", color: "white" }}
                    transition="all 0.25s"
                  >
                    <Icon size={20} />
                  </Box>
                  <Heading as="h3" fontSize="lg" fontFamily="heading" fontWeight="700" color="heading" mb={1}>
                    <LinkOverlay asChild>
                      <NextLink href={`/blog?category=${c.slug}#articles`}>{c.title}</NextLink>
                    </LinkOverlay>
                  </Heading>
                  <Text fontSize="sm" color="fg.muted" mb={3}>
                    {topic?.text}
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color="brand.cyan"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                  >
                    {counts[i]} {counts[i] === 1 ? "guide" : "guides"}
                  </Text>
                </LinkBox>
              </Reveal>
            );
          })}
        </SimpleGrid>
      </Section>

      <Section id="articles">
        <SectionHeading eyebrow="All articles" title="Latest insights" />
        <Suspense>
          <PostFeed initial={initial} filters={categories.map((c) => ({ label: c.title, value: c.slug }))} />
        </Suspense>
      </Section>

      <CtaBand
        whatsapp={settings.whatsapp}
        title="Have a question we haven't answered?"
        description="Ask our team on WhatsApp or request a quote. We reply within one business day."
      />
    </>
  );
}
