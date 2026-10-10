import { Box, Container, Grid, Heading, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/portfolio/gallery";
import { CtaBand } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { getAllSlugs, getProject, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { projects } = await getAllSlugs();
  return projects.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const meta = pageMetadata({ title: project.title, description: project.excerpt, path: `/portfolio/${slug}`, seo: project.seo });
  if (project.cover?.url) meta.openGraph = { ...meta.openGraph, images: [`${project.cover.url}?w=1200&h=630&fit=crop`] };
  return meta;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);
  if (!project) notFound();

  const story = [
    { label: "The challenge", text: project.challenge },
    { label: "Our solution", text: project.solution },
    { label: "The result", text: project.result },
  ].filter((s) => s.text);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: project.title, path: `/portfolio/${slug}` }])} />

      <Box bg="brand.mist" pt={{ base: 10, md: 16 }}>
        <Container maxW="7xl">
          <Link asChild color="brand.blue" fontWeight="700" mb={8} display="inline-flex" gap={2}>
            <NextLink href="/portfolio">
              <ArrowLeft size={18} /> All projects
            </NextLink>
          </Link>
          <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap={{ base: 6, lg: 16 }} alignItems="end" mb={{ base: 10, md: 14 }}>
            <Stack gap={4}>
              <HStack gap={3} flexWrap="wrap">
                {project.services.map((s) => (
                  <Link key={s.slug} asChild textStyle="eyebrow" color="brand.cyan">
                    <NextLink href={`/services/${s.slug}`}>{s.title}</NextLink>
                  </Link>
                ))}
              </HStack>
              <Heading as="h1" textStyle="h1" color="brand.blue">
                {project.title}
              </Heading>
              {project.excerpt && (
                <Text textStyle="lead" color="fg.muted">
                  {project.excerpt}
                </Text>
              )}
            </Stack>
            <SimpleGrid columns={2} gap={6} pb={2}>
              {project.client && (
                <Box>
                  <Text textStyle="eyebrow" color="fg.muted" mb={1}>Client</Text>
                  <Text fontWeight="700" color="brand.ink">{project.client}</Text>
                </Box>
              )}
              {project.year && (
                <Box>
                  <Text textStyle="eyebrow" color="fg.muted" mb={1}>Year</Text>
                  <Text fontWeight="700" color="brand.ink">{project.year}</Text>
                </Box>
              )}
            </SimpleGrid>
          </Grid>
          <Media image={project.cover} alt={project.title} seed={project.slug} aspectRatio={{ base: 4 / 3, md: 21 / 9 }} rounded="card" sizes="100vw" priority mb={-24} position="relative" zIndex={1} />
        </Container>
      </Box>

      <Section pt={{ base: 36, md: 40 }}>
        {story.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: story.length }} gap={{ base: 8, md: 12 }} mb={story.length ? 20 : 0}>
            {story.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Stack gap={3} borderTopWidth="3px" borderColor={i === 2 ? "brand.cyan" : "brand.blue"} pt={6}>
                  <Heading as="h2" textStyle="h3" color="brand.blue">{s.label}</Heading>
                  <Text color="fg.muted" fontSize="lg" lineHeight="1.7">{s.text}</Text>
                </Stack>
              </Reveal>
            ))}
          </SimpleGrid>
        )}
        {project.gallery.length > 0 && <Gallery images={project.gallery} title={project.title} />}
      </Section>

      <CtaBand whatsapp={settings.whatsapp} title="Want results like these?" />
    </>
  );
}
