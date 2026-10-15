import { Box, Heading, Link, List, Stack, Text } from "@chakra-ui/react";
import { CircleCheck, Lightbulb } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { ProjectArt } from "@/components/portfolio/project-art";
import type { ArticleBlock } from "@/lib/types";

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleContent({ blocks, label }: { blocks: ArticleBlock[]; label: string }) {
  return (
    <Stack gap={6} color="ink" fontSize="lg" lineHeight="1.8">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <Heading
                key={i}
                as="h2"
                id={headingId(b.text)}
                textStyle="h3"
                color="heading"
                mt={6}
                scrollMarginTop="110px"
              >
                {b.text}
              </Heading>
            );
          case "p":
            return <Text key={i}>{b.text}</Text>;
          case "list":
            return (
              <List.Root key={i} as={b.ordered ? "ol" : "ul"} ps={6} gap={2}>
                {b.items.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List.Root>
            );
          case "checklist":
            return (
              <Box key={i} p={{ base: 5, md: 7 }} rounded="card" bg="surface.mist">
                {b.title && (
                  <Text fontFamily="heading" fontWeight="700" color="heading" mb={4}>
                    {b.title}
                  </Text>
                )}
                <List.Root as="ul" listStyle="none" gap={3} fontSize="md">
                  {b.items.map((item) => (
                    <List.Item key={item} display="flex" gap={3} alignItems="flex-start">
                      <Box color="brand.cyan" flexShrink={0} mt="3px">
                        <CircleCheck size={20} />
                      </Box>
                      {item}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            );
          case "tip":
            return (
              <Box
                key={i}
                display="flex"
                gap={4}
                p={{ base: 5, md: 6 }}
                rounded="card"
                borderStartWidth="4px"
                borderColor="brand.cyan"
                bg="surface"
                boxShadow="0 12px 30px -20px rgba(0,78,155,0.4)"
              >
                <Box color="brand.cyan" flexShrink={0} mt={1}>
                  <Lightbulb size={24} />
                </Box>
                <Box fontSize="md">
                  {b.title && (
                    <Text fontFamily="heading" fontWeight="700" color="heading" mb={1}>
                      {b.title}
                    </Text>
                  )}
                  <Text color="fg.muted">{b.text}</Text>
                </Box>
              </Box>
            );
          case "figure":
            return (
              <Box key={i} as="figure" my={4}>
                <Box rounded="card" overflow="hidden" aspectRatio={16 / 9}>
                  <ProjectArt kind={b.art} label={label} seed={`fig-${i}`} />
                </Box>
                <Text as="figcaption" mt={3} fontSize="sm" color="fg.muted" textAlign="center">
                  {b.caption}
                </Text>
              </Box>
            );
        }
      })}
    </Stack>
  );
}

export function TableOfContents({ blocks }: { blocks: ArticleBlock[] }) {
  const headings = blocks.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
  if (headings.length < 2) return null;
  return (
    <Box as="nav" aria-label="In this article">
      <Text textStyle="eyebrow" color="brand.cyan" mb={4}>
        In this article
      </Text>
      <List.Root as="ol" listStyle="none" gap={3} borderStartWidth="2px" borderColor="brand.ice" ps={4}>
        {headings.map((h) => (
          <List.Item key={h.text}>
            <Link
              href={`#${headingId(h.text)}`}
              color="fg.muted"
              fontSize="sm"
              lineHeight="1.4"
              _hover={{ color: "heading" }}
            >
              {h.text}
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: FaWhatsapp },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FaFacebookF },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: FaLinkedinIn,
    },
    { label: "Share on X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: FaXTwitter },
  ];
  return (
    <Box>
      <Text textStyle="eyebrow" color="brand.cyan" mb={3}>
        Share
      </Text>
      <Box display="flex" gap={2}>
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            display="grid"
            placeItems="center"
            boxSize={10}
            rounded="full"
            bg="surface.mist"
            color="heading"
            _hover={{ bg: "brand.blue", color: "white" }}
          >
            <Icon size={16} />
          </Link>
        ))}
      </Box>
    </Box>
  );
}
