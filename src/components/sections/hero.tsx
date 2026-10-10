"use client";

import { Box, Button, Container, Grid, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LogoMark } from "@/components/ui/logo";
import { SwirlPattern } from "@/components/ui/primitives";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

const SERVICES = ["Print", "Graphic Design", "Branding", "Web Design", "Events"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ whatsapp }: { whatsapp: string }) {
  return (
    <Box position="relative" overflow="hidden" bg="brand.blue" color="white">
      <SwirlPattern opacity={0.07} />
      {/* soft glow accents (radial gradients are far cheaper to paint than CSS blur) */}
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        bgImage="radial-gradient(circle at 85% 15%, rgba(0,145,185,0.45), transparent 45%), radial-gradient(circle at 5% 100%, rgba(17,91,112,0.6), transparent 40%)"
      />

      <Container maxW="7xl" position="relative" py={{ base: 16, md: 24, lg: 32 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1.25fr 1fr" }} gap={{ base: 12, lg: 8 }} alignItems="center">
          <Stack gap={7}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <HStack gap={2} flexWrap="wrap">
                {SERVICES.map((s) => (
                  <Text key={s} as="span" px={3} py={1} rounded="full" bg="whiteAlpha.150" borderWidth="1px" borderColor="whiteAlpha.300" fontSize="sm" fontWeight="600">
                    {s}
                  </Text>
                ))}
              </HStack>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
              <Heading as="h1" textStyle="display">
                Integrated solutions for{" "}
                <Box as="span" color="brand.ice">
                  modern brand growth.
                </Box>
              </Heading>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
              <Text textStyle="lead" color="whiteAlpha.900" maxW="xl">
                From the first sketch to the final print, the website launch and the big event — Citrix Solutions is
                Kampala&apos;s one-stop creative partner for brands that want to grow.
              </Text>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }}>
              <HStack gap={3} flexWrap="wrap">
                <Button asChild size="xl" rounded="full" bg="white" color="brand.blue" _hover={{ bg: "brand.ice" }} px={8}>
                  <NextLink href="/contact">
                    Get a free quote <ArrowRight />
                  </NextLink>
                </Button>
                <Button asChild size="xl" rounded="full" variant="outline" color="white" borderColor="whiteAlpha.500" _hover={{ bg: "whiteAlpha.200" }} px={8}>
                  <a href={whatsappLink(whatsapp, DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp /> WhatsApp us
                  </a>
                </Button>
              </HStack>
            </motion.div>
          </Stack>

          {/* Animated brand mark */}
          <Box display={{ base: "none", md: "grid" }} placeItems="center" position="relative" aria-hidden>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                <Box p={10} rounded="full" bg="whiteAlpha.100" borderWidth="1px" borderColor="whiteAlpha.200" boxShadow="0 0 120px rgba(186,228,240,0.25)">
                  <LogoMark tone="white" size={300} />
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
