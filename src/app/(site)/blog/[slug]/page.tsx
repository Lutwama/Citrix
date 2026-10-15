import { Box, Button, Container, Grid, Heading, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { ArticleContent, ShareLinks, TableOfContents } from "@/components/blog/article-content";
import { formatDate, PostCard } from "@/components/blog/post-card";
import { RichText } from "@/components/blog/rich-text";
import { ProductGrid } from "@/components/products/product-card";
import { CtaBand } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { products as catalogue } from "@/content/products";
import { getAllSlugs, getPost, getPosts, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, JsonLd, pageMetadata, siteUrl } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { posts } = await getAllSlugs();
  return posts.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}`, seo: post.seo });
  meta.openGraph = {
    ...meta.openGraph,
    type: "article",
    publishedTime: post.publishedAt,
    ...(post.cover?.url ? { images: [`${post.cover.url}?w=1200&h=630&fit=crop`] } : {}),
  };
  return meta;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();

  const [sameCategory, latest] = await Promise.all([
    post.category ? getPosts({ category: post.category.slug, limit: 4 }) : Promise.resolve({ items: [] }),
    getPosts({ limit: 4 }),
  ]);
  const related = [...sameCategory.items, ...latest.items]
    .filter((p, i, all) => p.slug !== slug && all.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 3);
  const promoted = (post.products ?? [])
    .map((s) => catalogue.find((p) => p.slug === s))
    .filter((p) => p != null)
    .slice(0, 3);
  const url = `${siteUrl}/blog/${slug}`;
  const blocks = post.content ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: post.author?.name ?? settings.name },
          publisher: { "@id": `${siteUrl}/#organization` },
          mainEntityOfPage: url,
          ...(post.cover?.url ? { image: post.cover.url } : {}),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <Box as="article">
        <Box bg="surface.mist" pt={{ base: 10, md: 16 }} pb={{ base: 28, md: 36 }}>
          <Container maxW="4xl">
            <Link asChild color="heading" fontWeight="700" mb={8} display="inline-flex" gap={2}>
              <NextLink href="/blog">
                <ArrowLeft size={18} /> All insights
              </NextLink>
            </Link>
            <Stack gap={5}>
              <HStack gap={2} fontSize="sm" color="fg.muted" flexWrap="wrap">
                {post.category && (
                  <Link asChild fontWeight="700" color="brand.cyan">
                    <NextLink href={`/blog?category=${post.category.slug}`}>{post.category.title}</NextLink>
                  </Link>
                )}
                <Text as="span">·</Text>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {post.readingMinutes ? (
                  <>
                    <Text as="span">·</Text>
                    <Text as="span">{Math.max(1, post.readingMinutes)} min read</Text>
                  </>
                ) : null}
              </HStack>
              <Heading as="h1" textStyle="h1" color="heading">
                {post.title}
              </Heading>
              <Text textStyle="lead" color="fg.muted">
                {post.excerpt}
              </Text>
              {post.author && (
                <Text fontSize="sm" color="fg.muted">
                  By <b>{post.author.name}</b>
                </Text>
              )}
            </Stack>
          </Container>
        </Box>

        <Container maxW="6xl" mt={{ base: -20, md: -28 }}>
          <Media
            image={post.cover}
            alt={post.title}
            seed={post.slug}
            art={post.art}
            artLabel={post.category?.title ?? settings.name}
            aspectRatio={{ base: 4 / 3, md: 21 / 9 }}
            rounded="card"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
            boxShadow="0 30px 60px -30px rgba(0,78,155,0.45)"
          />
        </Container>

        <Container maxW="6xl" py={{ base: 10, md: 16 }}>
          <Grid templateColumns={{ base: "1fr", lg: "220px 1fr" }} gap={{ base: 10, lg: 16 }} alignItems="start">
            <Stack gap={8} position={{ lg: "sticky" }} top={{ lg: 28 }} order={{ base: 2, lg: 1 }}>
              <Box display={{ base: "none", lg: "block" }}>
                <TableOfContents blocks={blocks} />
              </Box>
              <ShareLinks url={url} title={post.title} />
            </Stack>

            <Box maxW="3xl" order={{ base: 1, lg: 2 }}>
              {post.body?.length ? (
                <Box color="ink">
                  <RichText value={post.body} />
                </Box>
              ) : blocks.length ? (
                <ArticleContent blocks={blocks} label={settings.name} />
              ) : (
                post.paragraphs?.map((p, i) => (
                  <Text key={i} mb={5} lineHeight="1.8" fontSize="lg" color="ink">
                    {p}
                  </Text>
                ))
              )}

              <Box mt={12} p={{ base: 6, md: 8 }} rounded="card" bg="brand.blue" color="white">
                <Heading as="h2" fontSize="xl" fontFamily="heading" fontWeight="700" mb={2}>
                  Have a question about this?
                </Heading>
                <Text color="brand.ice" mb={5}>
                  Our team is happy to advise, with no obligation. Send us a message on WhatsApp.
                </Text>
                <Button asChild rounded="full" bg="#25D366" color="white" _hover={{ bg: "#1EBE5A" }}>
                  <a
                    href={whatsappLink(
                      settings.whatsapp,
                      `Hello Citrix! I just read "${post.title}" and have a question.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> Chat on WhatsApp
                  </a>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {promoted.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Related products"
            title="Ready to get started?"
            description="See options, turnaround times and starting prices."
          />
          <ProductGrid products={promoted} />
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="mist">
          <SectionHeading eyebrow="Keep reading" title="More insights" />
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {related.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </SimpleGrid>
        </Section>
      )}

      <CtaBand whatsapp={settings.whatsapp} />
    </>
  );
}
