import { Box, type BoxProps } from "@chakra-ui/react";
import Image from "next/image";
import { ProjectArt } from "@/components/portfolio/project-art";
import type { ProjectArtKind, SanityImage } from "@/lib/types";
import { LogoMark } from "./logo";

const GRADIENTS = [
  "linear-gradient(135deg, #004E9B 0%, #0091B9 100%)",
  "linear-gradient(135deg, #115B70 0%, #0091B9 100%)",
  "linear-gradient(135deg, #0091B9 0%, #BAE4F0 100%)",
  "linear-gradient(135deg, #004E9B 0%, #115B70 100%)",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Renders a Sanity image when present, otherwise a branded illustration
 * (when `art` is given) or gradient placeholder, so layouts look intentional
 * before real photos are uploaded.
 */
export function Media({
  image,
  alt,
  seed = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  art,
  artLabel,
  ...rest
}: {
  image: SanityImage | undefined;
  alt: string;
  seed?: string;
  sizes?: string;
  priority?: boolean;
  art?: ProjectArtKind;
  artLabel?: string;
} & BoxProps) {
  return (
    <Box position="relative" overflow="hidden" bg="brand.ice" {...rest}>
      {image?.url ? (
        <Image
          src={`${image.url}?auto=format&fit=max&w=1600`}
          alt={image.alt ?? alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip}
          style={{ objectFit: "cover" }}
        />
      ) : art ? (
        <Box position="absolute" inset="0">
          <ProjectArt kind={art} label={artLabel ?? alt} seed={seed} />
        </Box>
      ) : (
        <Box position="absolute" inset="0" style={{ background: GRADIENTS[hash(seed) % GRADIENTS.length] }} display="grid" placeItems="center" role="img" aria-label={alt}>
          <Box position="absolute" inset="0" backgroundImage="url(/brand/swirl-pattern.svg)" backgroundSize="120px" opacity={0.12} />
          <LogoMark tone="white" size={72} opacity={0.9} />
        </Box>
      )}
    </Box>
  );
}
