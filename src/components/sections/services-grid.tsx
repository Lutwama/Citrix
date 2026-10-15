import { Box, Heading, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { ServiceSummary } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <LinkBox
      as="article"
      role="group"
      h="full"
      p={{ base: 6, md: 8 }}
      rounded="card"
      bg="surface"
      borderWidth="1px"
      borderColor="line"
      transition="all 0.25s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 20px 40px -20px rgba(0,78,155,0.35)",
        borderColor: "brand.ice",
      }}
    >
      <Box
        display="grid"
        placeItems="center"
        boxSize={14}
        rounded="xl"
        bg="surface.mist"
        color="heading"
        mb={6}
        transition="all 0.25s"
        _groupHover={{ bg: "brand.blue", color: "white" }}
      >
        <ServiceIcon name={service.icon} size={26} strokeWidth={1.75} />
      </Box>
      <Heading as="h3" textStyle="h3" color="heading" mb={3}>
        <LinkOverlay asChild>
          <NextLink href={`/services/${service.slug}`}>{service.title}</NextLink>
        </LinkOverlay>
      </Heading>
      <Text color="fg.muted" mb={6}>
        {service.summary}
      </Text>
      <Text
        as="span"
        display="inline-flex"
        alignItems="center"
        gap={1}
        fontWeight="700"
        fontFamily="heading"
        color="brand.cyan"
        _groupHover={{ gap: 2 }}
        transition="gap 0.2s"
      >
        Learn more <ArrowUpRight size={18} />
      </Text>
    </LinkBox>
  );
}

export function ServicesGrid({ services }: { services: ServiceSummary[] }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {services.map((s, i) => (
        <Reveal key={s._id} delay={i * 0.06} style={{ height: "100%" }}>
          <ServiceCard service={s} />
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
