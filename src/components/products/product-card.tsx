import { Box, Heading, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowUpRight, Clock } from "lucide-react";
import NextLink from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { formatPrice } from "@/content/products";
import type { Product } from "@/lib/types";

export function PriceTag({ product, dark = false }: { product: Product; dark?: boolean }) {
  const price = formatPrice(product);
  return price ? (
    <Box>
      <Text as="span" color={dark ? "brand.ice" : "fg.muted"} fontSize="xs" textTransform="uppercase" letterSpacing="wider" fontWeight="700">
        From{" "}
      </Text>
      <Text as="span" color={dark ? "white" : "brand.blue"} fontFamily="heading" fontWeight="700" fontSize="lg">
        {price}
      </Text>
      <Text as="span" color={dark ? "brand.ice" : "fg.muted"} fontSize="sm">
        {" "}
        {product.priceUnit}
      </Text>
    </Box>
  ) : (
    <Text fontFamily="heading" fontWeight="700" color={dark ? "white" : "brand.blue"}>
      Price on request
    </Text>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <LinkBox
      as="article"
      role="group"
      display="flex"
      flexDirection="column"
      h="full"
      p={6}
      rounded="card"
      bg="white"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      transition="all 0.25s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "0 20px 40px -20px rgba(0,78,155,0.35)", borderColor: "brand.ice" }}
    >
      <Heading as="h3" fontSize="xl" fontFamily="heading" fontWeight="700" color="brand.blue" mb={2}>
        <LinkOverlay asChild>
          <NextLink href={`/services/${product.service}/${product.slug}`}>{product.title}</NextLink>
        </LinkOverlay>
      </Heading>
      <Text color="fg.muted" mb={5} flex="1">
        {product.summary}
      </Text>
      <Box pt={4} borderTopWidth="1px" borderColor="blackAlpha.100">
        <PriceTag product={product} />
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={3} mt={2}>
          <Text color="fg.muted" display="inline-flex" alignItems="center" gap={1.5} fontSize="sm">
            <Clock size={14} /> {product.turnaround}
          </Text>
          <Text as="span" color="brand.cyan" display="inline-flex" alignItems="center" gap={1} fontWeight="700" fontFamily="heading" fontSize="sm" _groupHover={{ gap: 2 }} transition="gap 0.2s">
            Details <ArrowUpRight size={16} />
          </Text>
        </Box>
      </Box>
    </LinkBox>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.06} style={{ height: "100%" }}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
