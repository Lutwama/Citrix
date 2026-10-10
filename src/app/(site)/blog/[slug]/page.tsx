import { Box, Container, Heading, HStack, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { formatDate, PostCard } from "@/components/blog/post-card";
import { RichText } from "@/components/blog/rich-text";
import { CtaBand } from "@/components/sections/misc-sections";
import { Media } from "@/components/ui/media";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { getAllSlugs, getPost, getPosts, getSettings } from "@/lib/data";
import { breadcrumbJsonLd, JsonLd, pageMetadata, siteUrl } from "@/lib/seo";

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
  const [post, settings, more] = await Promise.all([getPost(slug), getSettings(), getPosts({ limit: 4 })]);
  if (!post) notFound();
  const related = more.items.filter((p) => p.slug !== slug).slice(0, 3);

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
          mainEntityOfPage: `${siteUrl}/blog/${slug}`,
          ...(post.cover?.url ? { image: post.cover.url } : {}),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }, { name: post.title, path: `/blog/${slug}` }])} />

      <Box as="article">
        <Container maxW="3xl" pt={{ base: 10, md: 16 }}>
          <Link asChild color="brand.blue" fontWeight="700" mb={8} display="inline-flex" gap={2}>
            <NextLink href="/blog">
              <ArrowLeft size={18} /> All insights
            </NextLink>
          </Link>
          <Stack gap={5} mb={10}>
            <HStack gap={2} fontSize="sm" color="fg.muted">
              {post.category && (
                <Text as="span" fontWeight="700" color="brand.cyan">
                  {post.category.title}
                </Text>
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
            <Heading as="h1" textStyle="h1" color="brand.blue">
              {post.title}
            </Heading>
            <Text textStyle="lead" color="fg.muted">
              {post.excerpt}
            </Text>
          </Stack>
        </Container>
        <Container maxW="5xl">
          <Media image={post.cover} alt={post.title} seed={post.slug} aspectRatio={16 / 9} rounded="card" sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </Container>
        <Container maxW="3xl" py={{ base: 10, md: 16 }} color="brand.ink">
          {post.body?.length ? (
            <RichText value={post.body} />
          ) : (
            post.paragraphs?.map((p, i) => (
              <Text key={i} mb={5} lineHeight="1.8" fontSize="lg">
                {p}
              </Text>
            ))
          )}
        </Container>
      </Box>

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
