"use client";

import { Box, CloseButton, Dialog, IconButton, Portal, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { SanityImage } from "@/lib/types";

type Img = NonNullable<SanityImage>;

/** Image grid with a keyboard-navigable lightbox. */
export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const go = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? images[index] : null;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {images.map((img, i) => (
          <Box
            as="button"
            key={img.url}
            onClick={() => setIndex(i)}
            position="relative"
            aspectRatio={4 / 3}
            rounded="card"
            overflow="hidden"
            cursor="zoom-in"
            gridColumn={i % 3 === 0 ? { md: "span 2" } : undefined}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image src={`${img.url}?auto=format&w=1600`} alt={img.alt ?? `${title} — image ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} placeholder={img.lqip ? "blur" : "empty"} blurDataURL={img.lqip} />
          </Box>
        ))}
      </SimpleGrid>

      <Dialog.Root open={open} onOpenChange={(e) => !e.open && setIndex(null)} size="full" motionPreset="scale">
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.900" />
          <Dialog.Positioner>
            <Dialog.Content bg="transparent" boxShadow="none" display="grid" placeItems="center" p={{ base: 4, md: 12 }}>
              <Dialog.Title srOnly>{title} gallery</Dialog.Title>
              {current && (
                <Box position="relative" w="full" h="full">
                  <Image src={`${current.url}?auto=format&w=2400`} alt={current.alt ?? title} fill sizes="100vw" style={{ objectFit: "contain" }} />
                </Box>
              )}
              {images.length > 1 && (
                <>
                  <IconButton aria-label="Previous image" position="absolute" left={4} top="50%" rounded="full" onClick={() => go(-1)}>
                    <ChevronLeft />
                  </IconButton>
                  <IconButton aria-label="Next image" position="absolute" right={4} top="50%" rounded="full" onClick={() => go(1)}>
                    <ChevronRight />
                  </IconButton>
                </>
              )}
              <Dialog.CloseTrigger asChild position="absolute" top={4} right={4}>
                <CloseButton color="white" size="lg" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
