"use client";

import { Box, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { ProjectSummary, Testimonial } from "@/lib/types";

function useCarousel(loop = false) {
  const [ref, api] = useEmblaCarousel({ align: "start", loop });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
    setIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api, sync]);

  return { ref, api, canPrev, canNext, index };
}

function Arrows({ onPrev, onNext, canPrev, canNext }: { onPrev: () => void; onNext: () => void; canPrev: boolean; canNext: boolean }) {
  const props = { rounded: "full", variant: "outline", colorPalette: "brand", size: "lg" } as const;
  return (
    <HStack gap={2}>
      <IconButton aria-label="Previous" onClick={onPrev} disabled={!canPrev} {...props}>
        <ChevronLeft />
      </IconButton>
      <IconButton aria-label="Next" onClick={onNext} disabled={!canNext} {...props}>
        <ChevronRight />
      </IconButton>
    </HStack>
  );
}

export function FeaturedWorkCarousel({ projects, header }: { projects: ProjectSummary[]; header: ReactNode }) {
  const { ref, api, canPrev, canNext } = useCarousel();
  return (
    <Box>
      <Flex justify="space-between" align="flex-end" gap={6} wrap="wrap">
        {header}
        <Box mb={{ base: 8, md: 14 }}>
          <Arrows onPrev={() => api?.scrollPrev()} onNext={() => api?.scrollNext()} canPrev={canPrev} canNext={canNext} />
        </Box>
      </Flex>
      <Box ref={ref} overflow="hidden" aria-roledescription="carousel">
        <Flex gap={6}>
          {projects.map((p) => (
            <Box key={p._id} flex={{ base: "0 0 85%", md: "0 0 46%", lg: "0 0 31.5%" }} minW={0}>
              <ProjectCard project={p} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const { ref, api, canPrev, canNext, index } = useCarousel(true);

  // Gentle autoplay; pauses while the user hovers.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => api.scrollNext(), 7000);
    return () => clearInterval(id);
  }, [api, paused]);

  return (
    <Stack gap={8} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Box ref={ref} overflow="hidden" aria-roledescription="carousel">
        <Flex>
          {testimonials.map((t) => (
            <Box key={t._id} flex="0 0 100%" minW={0} px={{ base: 0, md: 12 }}>
              <Stack as="figure" gap={6} align="center" textAlign="center" maxW="3xl" mx="auto">
                <Box color="brand.ice">
                  <Quote size={44} />
                </Box>
                <Text as="blockquote" fontFamily="heading" fontWeight="600" fontSize={{ base: "xl", md: "3xl" }} lineHeight="1.35" color="white">
                  “{t.quote}”
                </Text>
                <Box as="figcaption">
                  <Text fontWeight="700" color="white">
                    {t.name}
                  </Text>
                  <Text color="brand.ice" fontSize="sm">
                    {[t.role, t.company].filter(Boolean).join(", ")}
                  </Text>
                </Box>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Box>
      <Flex justify="center" align="center" gap={6}>
        <IconButton aria-label="Previous testimonial" rounded="full" variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => api?.scrollPrev()} disabled={!canPrev}>
          <ChevronLeft />
        </IconButton>
        <HStack gap={2}>
          {testimonials.map((t, i) => (
            <Box
              as="button"
              key={t._id}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => api?.scrollTo(i)}
              h={2}
              w={i === index ? 8 : 2}
              rounded="full"
              bg={i === index ? "white" : "whiteAlpha.400"}
              transition="all 0.3s"
              cursor="pointer"
            />
          ))}
        </HStack>
        <IconButton aria-label="Next testimonial" rounded="full" variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => api?.scrollNext()} disabled={!canNext}>
          <ChevronRight />
        </IconButton>
      </Flex>
    </Stack>
  );
}
