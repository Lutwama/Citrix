import { Box, Button, Flex, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/primitives";
import type { ProcessStep, SiteSettings } from "@/lib/types";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export function StatsBand({ stats }: { stats: SiteSettings["stats"] }) {
  return (
    <Section tone="teal" py={{ base: 12, md: 16 }}>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <Stack gap={1} textAlign="center">
              <Text fontFamily="heading" fontWeight="700" fontSize={{ base: "3xl", md: "5xl" }} color="white" lineHeight="1">
                {s.value}
              </Text>
              <Text color="brand.ice">{s.label}</Text>
            </Stack>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
}

export function ProcessSteps({ steps, dark = false }: { steps: ProcessStep[]; dark?: boolean }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08}>
          <Box position="relative" h="full" p={7} rounded="card" bg={dark ? "whiteAlpha.100" : "white"} borderWidth="1px" borderColor={dark ? "whiteAlpha.200" : "blackAlpha.100"}>
            <Text fontFamily="heading" fontWeight="700" fontSize="5xl" lineHeight="1" color={dark ? "brand.ice" : "brand.cyan"} mb={4}>
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Heading as="h3" textStyle="h3" color={dark ? "white" : "brand.blue"} mb={2}>
              {step.title}
            </Heading>
            <Text color={dark ? "whiteAlpha.800" : "fg.muted"}>{step.description}</Text>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
  );
}

export function CtaBand({
  whatsapp,
  title = "Ready to grow your brand?",
  description = "Tell us about your project and get a tailored quote within one business day.",
}: {
  whatsapp: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="blue">
      <Flex direction={{ base: "column", lg: "row" }} align={{ base: "flex-start", lg: "center" }} justify="space-between" gap={8}>
        <Box maxW="2xl">
          <SectionHeading dark title={title} description={description} />
        </Box>
        <HStack gap={3} flexWrap="wrap" mt={{ lg: -14 }}>
          <Button asChild size="xl" rounded="full" bg="white" color="brand.blue" _hover={{ bg: "brand.ice" }} px={8}>
            <NextLink href="/contact">
              Request a quote <ArrowRight />
            </NextLink>
          </Button>
          <Button asChild size="xl" rounded="full" bg="#25D366" color="white" _hover={{ bg: "#1EBE5A" }} px={8}>
            <a href={whatsappLink(whatsapp, DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </Button>
        </HStack>
      </Flex>
    </Section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Section tone="blue" py={{ base: 16, md: 24 }}>
      <Stack gap={5} maxW="3xl">
        {eyebrow && (
          <Text textStyle="eyebrow" color="brand.ice">
            {eyebrow}
          </Text>
        )}
        <Heading as="h1" textStyle="h1" color="white">
          {title}
        </Heading>
        {description && (
          <Text textStyle="lead" color="whiteAlpha.900">
            {description}
          </Text>
        )}
        {children}
      </Stack>
    </Section>
  );
}
