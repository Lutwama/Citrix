import { Box, Heading, Link, List, Text } from "@chakra-ui/react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

type ImageValue = { url?: string; alt?: string; width?: number; height?: number };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text mb={5} lineHeight="1.8" fontSize="lg">
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Heading as="h2" textStyle="h3" fontSize={{ base: "2xl", md: "3xl" }} color="heading" mt={10} mb={4}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" textStyle="h3" color="heading" mt={8} mb={3}>
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <Box
        as="blockquote"
        borderLeftWidth="4px"
        borderColor="brand.cyan"
        pl={5}
        my={6}
        fontStyle="italic"
        color="accent"
        fontSize="xl"
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List.Root as="ul" ps={6} mb={5} gap={2} fontSize="lg">
        {children}
      </List.Root>
    ),
    number: ({ children }) => (
      <List.Root as="ol" ps={6} mb={5} gap={2} fontSize="lg">
        {children}
      </List.Root>
    ),
  },
  listItem: ({ children }) => <List.Item>{children}</List.Item>,
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <Link
          href={href}
          color="heading"
          textDecoration="underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    // Body images are resolved to { url, alt, width, height } in the GROQ query.
    image: ({ value }: { value: ImageValue }) =>
      value?.url ? (
        <Box my={8} rounded="card" overflow="hidden">
          <Image
            src={`${value.url}?auto=format&w=1400`}
            alt={value.alt ?? ""}
            width={value.width ?? 1400}
            height={value.height ?? 800}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      ) : null,
  },
};

export function RichText({ value }: { value: unknown[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />;
}
