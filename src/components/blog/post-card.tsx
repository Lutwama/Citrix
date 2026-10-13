import { Box, Heading, HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Media } from "@/components/ui/media";
import type { PostSummary } from "@/lib/types";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <LinkBox as="article" role="group" h="full" display="flex" flexDirection="column" rounded="card" overflow="hidden" bg="white" borderWidth="1px" borderColor="blackAlpha.100" transition="all 0.25s" _hover={{ boxShadow: "0 20px 40px -24px rgba(0,78,155,0.4)" }}>
      <Media image={post.cover} alt={post.title} seed={post.slug} art={post.art} artLabel={post.category?.title ?? "Citrix Insights"} aspectRatio={16 / 9} />
      <Box p={6} display="flex" flexDirection="column" flex="1">
        <HStack gap={2} fontSize="sm" color="fg.muted" mb={3}>
          {post.category && (
            <Text as="span" fontWeight="700" color="brand.cyan">
              {post.category.title}
            </Text>
          )}
          <Text as="span">·</Text>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </HStack>
        <Heading as="h3" textStyle="h3" color="brand.blue" mb={3} _groupHover={{ color: "brand.cyan" }} transition="color 0.2s">
          <LinkOverlay asChild>
            <NextLink href={`/blog/${post.slug}`}>{post.title}</NextLink>
          </LinkOverlay>
        </Heading>
        <Text color="fg.muted" lineClamp={3}>
          {post.excerpt}
        </Text>
      </Box>
    </LinkBox>
  );
}
