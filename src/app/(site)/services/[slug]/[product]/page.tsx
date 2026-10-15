import { Box, Button, Grid, Heading, HStack, List, Stack, Text, Wrap } from "@chakra-ui/react";
import { ArrowRight, CircleCheck, Clock, Package } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { PriceTag, ProductGrid } from "@/components/products/product-card";
import { CtaBand, PageHero } from "@/components/sections/misc-sections";
import { FaqList } from "@/components/ui/faq-list";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { getProduct, getProductsByService, products } from "@/content/products";
import { getService, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, JsonLd, pageMetadata, siteUrl } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string; product: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.service, product: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  const product = getProduct(slug, productSlug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.title} in Kampala`,
    description: product.summary,
    path: `/services/${slug}/${productSlug}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug, product: productSlug } = await params;
  const product = getProduct(slug, productSlug);
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!product || !service) notFound();

  const path = `/services/${slug}/${productSlug}`;
  const related = getProductsByService(slug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  const waMessage = `Hello Citrix! I'd like a quote for ${product.title}.`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: product.title,
          description: product.description,
          serviceType: service.title,
          areaServed: "Uganda",
          provider: { "@id": `${siteUrl}/#organization` },
          url: `${siteUrl}${path}`,
          ...(product.priceFrom != null && {
            offers: {
              "@type": "Offer",
              priceCurrency: "UGX",
              price: product.priceFrom,
              description: `From UGX ${product.priceFrom} ${product.priceUnit}`,
            },
          }),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
          { name: product.title, path },
        ])}
      />

      <PageHero eyebrow={service.title} title={product.title} description={product.summary}>
        <Stack gap={5} pt={2}>
          <PriceTag product={product} dark />
          <HStack gap={3} flexWrap="wrap">
            <Button asChild size="lg" rounded="full" bg="white" color="brand.blue" _hover={{ bg: "brand.ice" }} px={7}>
              <NextLink href={`/contact?service=${slug}&product=${product.slug}`}>
                Get a quote <ArrowRight />
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
              <a href={whatsappLink(settings.whatsapp, waMessage)} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp /> Ask on WhatsApp
              </a>
            </Button>
          </HStack>
        </Stack>
      </PageHero>

      <Section>
        <Grid templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="start">
          <Stack gap={10}>
            <Box>
              <SectionHeading eyebrow="Overview" title={`About our ${product.title.toLowerCase()}`} />
              <Text color="fg.muted" fontSize="lg">
                {product.description}
              </Text>
            </Box>

            <Box>
              <Heading as="h2" textStyle="h3" color="heading" mb={5}>
                What&apos;s included
              </Heading>
              <List.Root
                as="ul"
                listStyle="none"
                display="grid"
                gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={3}
              >
                {product.includes.map((item) => (
                  <List.Item
                    key={item}
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
                    {item}
                  </List.Item>
                ))}
              </List.Root>
            </Box>

            {product.options.length > 0 && (
              <Box>
                <Heading as="h2" textStyle="h3" color="heading" mb={5}>
                  Options
                </Heading>
                <Stack gap={5}>
                  {product.options.map((o) => (
                    <Box key={o.label}>
                      <Text fontWeight="700" fontFamily="heading" color="ink" mb={2}>
                        {o.label}
                      </Text>
                      <Wrap gap={2}>
                        {o.values.map((v) => (
                          <Box
                            key={v}
                            as="span"
                            px={3}
                            py={1.5}
                            rounded="full"
                            borderWidth="1px"
                            borderColor="brand.ice"
                            color="accent"
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {v}
                          </Box>
                        ))}
                      </Wrap>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>

          <Box
            position={{ lg: "sticky" }}
            top={{ lg: 28 }}
            p={{ base: 6, md: 8 }}
            rounded="card"
            bg="surface"
            borderWidth="1px"
            borderColor="line"
            boxShadow="0 20px 40px -24px rgba(0,78,155,0.3)"
          >
            <Stack gap={5}>
              <PriceTag product={product} />
              <Stack gap={3} color="fg.muted">
                <HStack gap={3}>
                  <Clock size={18} />
                  <Text>
                    <b>Turnaround:</b> {product.turnaround}
                  </Text>
                </HStack>
                {product.minOrder && (
                  <HStack gap={3}>
                    <Package size={18} />
                    <Text>
                      <b>Minimum order:</b> {product.minOrder}
                    </Text>
                  </HStack>
                )}
              </Stack>
              <Box>
                <Text fontWeight="700" fontFamily="heading" color="ink" mb={2}>
                  Ideal for
                </Text>
                <Wrap gap={2}>
                  {product.idealFor.map((v) => (
                    <Box
                      key={v}
                      as="span"
                      px={3}
                      py={1}
                      rounded="full"
                      bg="surface.mist"
                      color="heading"
                      fontSize="sm"
                      fontWeight="600"
                    >
                      {v}
                    </Box>
                  ))}
                </Wrap>
              </Box>
              <Text color="fg.muted" fontSize="sm">
                Final prices depend on quantity, size and finish. Tell us what you need for an exact quote within one
                business day.
              </Text>
              <Stack gap={3}>
                <Button asChild colorPalette="brand" rounded="full" size="lg">
                  <NextLink href={`/contact?service=${slug}&product=${product.slug}`}>
                    Get a quote <ArrowRight />
                  </NextLink>
                </Button>
                <Button asChild rounded="full" size="lg" bg="#25D366" color="white" _hover={{ bg: "#1EBE5A" }}>
                  <a href={whatsappLink(settings.whatsapp, waMessage)} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp /> Order on WhatsApp
                  </a>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Section>

      {product.faqs.length > 0 && (
        <Section tone="mist">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }} gap={{ base: 6, lg: 16 }}>
            <SectionHeading eyebrow="FAQ" title="Questions, answered" />
            <FaqList faqs={product.faqs} />
          </Grid>
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <SectionHeading eyebrow={service.title} title={`More ${service.title.toLowerCase()} products`} />
          <ProductGrid products={related} />
          <Box mt={10}>
            <Button asChild variant="outline" colorPalette="brand" rounded="full" size="lg" px={8}>
              <NextLink href={`/services/${slug}`}>
                All {service.title.toLowerCase()} products <ArrowRight />
              </NextLink>
            </Button>
          </Box>
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} title={`Need ${product.title.toLowerCase()}?`} />
    </>
  );
}
