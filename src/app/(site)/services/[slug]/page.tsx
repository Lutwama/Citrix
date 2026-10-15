import { Box, Button, Grid, HStack, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { RichText } from "@/components/blog/rich-text";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProductGrid } from "@/components/products/product-card";
import { getProductsByService } from "@/content/products";
import { CtaBand, PageHero, ProcessSteps } from "@/components/sections/misc-sections";
import { FaqList } from "@/components/ui/faq-list";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getAllSlugs, getProjectsByService, getService, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, JsonLd, pageMetadata, siteUrl } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { services } = await getAllSlugs();
  return services.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} Services in Kampala`,
    description: service.summary,
    path: `/services/${slug}`,
    seo: service.seo,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, settings, projects] = await Promise.all([
    getService(slug),
    getSettings(),
    getProjectsByService(slug),
  ]);
  if (!service) notFound();
  const products = getProductsByService(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          areaServed: "Uganda",
          provider: { "@id": `${siteUrl}/#organization` },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />

      <PageHero
        eyebrow={service.title}
        title={service.headline ?? service.title}
        description={service.intro ?? service.summary}
      >
        <HStack gap={3} flexWrap="wrap" pt={2}>
          <Button asChild size="lg" rounded="full" bg="white" color="brand.blue" _hover={{ bg: "brand.ice" }} px={7}>
            <NextLink href={`/contact?service=${slug}`}>
              Get a {service.title.toLowerCase()} quote <ArrowRight />
            </NextLink>
          </Button>
          <Button
            asChild
            size="lg"
            rounded="full"
            variant="outline"
            color="white"
            borderColor="whiteAlpha.500"
            _hover={{ bg: "whiteAlpha.200" }}
            px={7}
          >
            <a
              href={whatsappLink(settings.whatsapp, `Hello Citrix! I'm interested in your ${service.title} services.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Ask on WhatsApp
            </a>
          </Button>
        </HStack>
      </PageHero>

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.1fr" }} gap={{ base: 10, lg: 16 }} alignItems="start">
          <Box>
            <SectionHeading eyebrow="What's included" title={`Our ${service.title.toLowerCase()} services`} />
            {service.body && service.body.length > 0 && (
              <Box color="fg.muted">
                <RichText value={service.body} />
              </Box>
            )}
          </Box>
          <List.Root
            as="ul"
            listStyle="none"
            display="grid"
            gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
            gap={4}
          >
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.05}>
                <List.Item
                  display="flex"
                  alignItems="center"
                  gap={3}
                  p={5}
                  rounded="xl"
                  bg="surface.mist"
                  fontWeight="600"
                  color="ink"
                >
                  <Box color="brand.cyan" flexShrink={0}>
                    <CircleCheck size={22} />
                  </Box>
                  {d}
                </List.Item>
              </Reveal>
            ))}
          </List.Root>
        </Grid>
      </Section>

      {products.length > 0 && (
        <Section tone="mist" id="products">
          <SectionHeading
            eyebrow="Products"
            title={`${service.title} products & prices`}
            description="Choose a product to see options, turnaround and starting prices, or ask us for a custom quote."
          />
          <ProductGrid products={products} />
        </Section>
      )}

      {service.process.length > 0 && (
        <Section tone="teal">
          <SectionHeading dark eyebrow="Process" title="How we deliver" />
          <ProcessSteps steps={service.process} dark />
        </Section>
      )}

      {projects.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Related work" title={`Recent ${service.title.toLowerCase()} projects`} />
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </SimpleGrid>
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section tone="mist">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }} gap={{ base: 6, lg: 16 }}>
            <Stack>
              <SectionHeading eyebrow="FAQ" title="Questions, answered" />
              <Box
                display={{ base: "none", lg: "grid" }}
                placeItems="center"
                boxSize={24}
                rounded="3xl"
                bg="brand.blue"
                color="white"
              >
                <ServiceIcon name={service.icon} size={44} />
              </Box>
            </Stack>
            <Box>
              <FaqList faqs={service.faqs} />
              <Text mt={6} color="fg.muted">
                Still have questions?{" "}
                <NextLink href="/contact" style={{ color: "var(--chakra-colors-heading)", fontWeight: 700 }}>
                  Talk to our team
                </NextLink>
                .
              </Text>
            </Box>
          </Grid>
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} title={`Let's talk ${service.title.toLowerCase()}.`} />
    </>
  );
}
