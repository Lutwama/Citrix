import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Link,
  List,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, CircleCheck, Info, Quote } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/portfolio/gallery";
import { ProjectArt } from "@/components/portfolio/project-art";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaBand } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { products as catalogue } from "@/content/products";
import { getAllSlugs, getProject, getProjects, getSettings } from "@/lib/data";
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
  const meta = pageMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/portfolio/${slug}`,
    seo: project.seo,
  });
  if (project.cover?.url)
    meta.openGraph = { ...meta.openGraph, images: [`${project.cover.url}?w=1200&h=630&fit=crop`] };
  return meta;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);
  if (!project) notFound();

  const primaryService = project.services[0]?.slug ?? "";
  const related = (await getProjects({ service: primaryService, limit: 4 })).items
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const productsUsed = project.products.map((s) => catalogue.find((p) => p.slug === s)).filter((p) => p != null);
  const label = project.client ?? project.title;

  const facts = [
    ["Client", project.client],
    ["Industry", project.industry],
    ["Location", project.location],
    ["Year", project.year],
    ["Timeline", project.duration],
  ].filter(([, v]) => v) as [string, string][];

  const story = [
    { label: "The challenge", text: project.challenge },
    { label: "Our solution", text: project.solution },
    { label: "The result", text: project.result },
  ].filter((s) => s.text);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${slug}` },
        ])}
      />

      <Box bg="surface.mist" pt={{ base: 10, md: 16 }}>
        <Container maxW="7xl">
          <Link asChild color="heading" fontWeight="700" mb={8} display="inline-flex" gap={2}>
            <NextLink href="/portfolio">
              <ArrowLeft size={18} /> All projects
            </NextLink>
          </Link>
          {project.sample && (
            <HStack
              gap={2}
              mb={6}
              px={4}
              py={3}
              rounded="xl"
              bg="surface"
              color="accent"
              fontSize="sm"
              borderWidth="1px"
              borderColor="brand.ice"
              alignItems="flex-start"
            >
              <Box flexShrink={0} mt="1px">
                <Info size={16} />
              </Box>
              <Text>
                This is a sample project that shows the kind of work we deliver. Ask us for examples of completed client
                work.
              </Text>
            </HStack>
          )}
          <Stack gap={4} maxW="4xl" mb={{ base: 8, md: 10 }}>
            <HStack gap={3} flexWrap="wrap">
              {project.services.map((s) => (
                <Link key={s.slug} asChild textStyle="eyebrow" color="brand.cyan">
                  <NextLink href={`/services/${s.slug}`}>{s.title}</NextLink>
                </Link>
              ))}
            </HStack>
            <Heading as="h1" textStyle="h1" color="heading">
              {project.title}
            </Heading>
            {project.excerpt && (
              <Text textStyle="lead" color="fg.muted">
                {project.excerpt}
              </Text>
            )}
          </Stack>
          {facts.length > 0 && (
            <SimpleGrid
              columns={{ base: 2, md: facts.length }}
              gap={6}
              mb={{ base: 10, md: 14 }}
              pt={6}
              borderTopWidth="1px"
              borderColor="brand.ice"
            >
              {facts.map(([k, v]) => (
                <Box key={k}>
                  <Text textStyle="eyebrow" color="fg.muted" mb={1}>
                    {k}
                  </Text>
                  <Text fontWeight="700" color="ink">
                    {v}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
          <Media
            image={project.cover}
            alt={project.title}
            seed={project.slug}
            art={project.art}
            artLabel={label}
            aspectRatio={{ base: 4 / 3, md: 21 / 9 }}
            rounded="card"
            sizes="100vw"
            priority
            mb={-24}
            position="relative"
            zIndex={1}
          />
        </Container>
      </Box>

      <Section pt={{ base: 36, md: 40 }}>
        {story.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: story.length }} gap={{ base: 8, md: 12 }} mb={20}>
            {story.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Stack gap={3} borderTopWidth="3px" borderColor={i === 2 ? "brand.cyan" : "brand.blue"} pt={6}>
                  <Heading as="h2" textStyle="h3" color="heading">
                    {s.label}
                  </Heading>
                  <Text color="fg.muted" fontSize="lg" lineHeight="1.7">
                    {s.text}
                  </Text>
                </Stack>
              </Reveal>
            ))}
          </SimpleGrid>
        )}

        {(project.deliverables.length > 0 || productsUsed.length > 0) && (
          <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }} gap={{ base: 10, lg: 16 }} mb={20}>
            {project.deliverables.length > 0 && (
              <Box>
                <Heading as="h2" textStyle="h3" color="heading" mb={5}>
                  What we delivered
                </Heading>
                <List.Root
                  as="ul"
                  listStyle="none"
                  display="grid"
                  gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                  gap={3}
                >
                  {project.deliverables.map((d) => (
                    <List.Item
                      key={d}
                      display="flex"
                      alignItems="center"
                      gap={3}
                      p={4}
                      rounded="xl"
                      bg="surface.mist"
                      fontWeight="600"
                      color="ink"
                    >
                      <Box color="brand.cyan" flexShrink={0}>
                        <CircleCheck size={20} />
                      </Box>
                      {d}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            )}
            {productsUsed.length > 0 && (
              <Box>
                <Heading as="h2" textStyle="h3" color="heading" mb={2}>
                  Products in this project
                </Heading>
                <Text color="fg.muted" mb={5}>
                  Need something similar? See options and prices.
                </Text>
                <Wrap gap={2}>
                  {productsUsed.map((p) => (
                    <Button key={p.slug} asChild size="sm" variant="outline" colorPalette="brand" rounded="full">
                      <NextLink href={`/services/${p.service}/${p.slug}`}>
                        {p.title} <ArrowRight />
                      </NextLink>
                    </Button>
                  ))}
                </Wrap>
              </Box>
            )}
          </Grid>
        )}

        {project.gallery.length > 0 ? (
          <Gallery images={project.gallery} title={project.title} />
        ) : (
          project.galleryArt &&
          project.galleryArt.length > 0 && (
            <Box>
              <Heading as="h2" textStyle="h3" color="heading" mb={6}>
                Project visuals
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                {project.galleryArt.map((kind, i) => (
                  <Reveal key={`${kind}-${i}`} delay={i * 0.06}>
                    <Box rounded="card" overflow="hidden" aspectRatio={4 / 3}>
                      <ProjectArt kind={kind} label={label} seed={`${project.slug}-${i}`} />
                    </Box>
                  </Reveal>
                ))}
              </SimpleGrid>
            </Box>
          )
        )}
      </Section>

      {project.testimonial && (
        <Section tone="blue">
          <Stack maxW="3xl" mx="auto" textAlign="center" align="center" gap={6}>
            <Box color="brand.ice">
              <Quote size={40} />
            </Box>
            <Text color="white" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" lineHeight="1.5">
              {project.testimonial.quote}
            </Text>
            <Text color="brand.ice" fontWeight="700">
              {project.testimonial.name}
              {project.testimonial.role ? ` · ${project.testimonial.role}` : ""}
            </Text>
          </Stack>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="mist">
          <SectionHeading eyebrow="More work" title="Related projects" />
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {related.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </SimpleGrid>
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} title="Want results like these?" />
    </>
  );
}
