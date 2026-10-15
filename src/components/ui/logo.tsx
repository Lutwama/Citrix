import { Box, Image, type BoxProps } from "@chakra-ui/react";

type Tone = "color" | "white";

const COLORS = {
  color: { a: "#004E9B", b: "#0091B9", name: "#004E9B", sub: "#0091B9", tag: "#004E9B" },
  white: { a: "#FFFFFF", b: "#FFFFFF", name: "#FFFFFF", sub: "#FFFFFF", tag: "rgba(255,255,255,0.85)" },
};

/**
 * The swirl "S" mark. This is a vector approximation of the mark in
 * docs/citrix.pdf — swap the two <path>s for the official artwork when the
 * source SVG is exported (keep viewBox 0 0 100 100).
 */
export function LogoMark({ tone = "color", size = 44, ...rest }: { tone?: Tone; size?: number } & BoxProps) {
  const c = COLORS[tone];
  const maskId = `citrix-mark-gap-${tone}`;
  return (
    <Box as="span" display="inline-flex" flexShrink={0} w={`${size}px`} h={`${size}px`} {...rest}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="Citrix Solutions">
        <defs>
          <mask id={maskId}>
            <rect width="100" height="100" fill="white" />
            {/* S-shaped gap between the two halves */}
            <path d="M50 2 A24 24 0 0 1 50 50 A24 24 0 0 0 50 98" fill="none" stroke="black" strokeWidth="7" />
            {/* notches that open the outer ring into a swirl */}
            <path d="M80 8 L92 20" stroke="black" strokeWidth="9" />
            <path d="M20 92 L8 80" stroke="black" strokeWidth="9" />
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <path d="M50 4 A46 46 0 0 0 50 96 A23 23 0 0 1 50 50 A23 23 0 0 0 50 4 Z" fill={c.a} />
          <path d="M50 96 A46 46 0 0 0 50 4 A23 23 0 0 1 50 50 A23 23 0 0 0 50 96 Z" fill={c.b} />
        </g>
      </svg>
    </Box>
  );
}

const LOCKUPS = {
  // public/brand/citrix-logo.png, 620×196, tagline included
  tagline: { src: "/brand/citrix-logo.png", ratio: "620 / 196" },
  // public/brand/citrix-logo-nav.png, 614×189, name only
  plain: { src: "/brand/citrix-logo-nav.png", ratio: "614 / 189" },
};

/**
 * Horizontal lockup from the official artwork, cropped tight. `variant`
 * picks the version with or without the tagline. `height` takes a responsive
 * value; width follows the aspect ratio. The white tone recolours it with a
 * CSS filter.
 */
export function Logo({
  tone = "color",
  variant = "tagline",
  height = "56px",
}: {
  tone?: Tone;
  variant?: keyof typeof LOCKUPS;
  height?: BoxProps["h"];
}) {
  const lockup = LOCKUPS[variant];
  return (
    <Image
      src={lockup.src}
      alt="Citrix Solutions Ltd"
      h={height}
      w="auto"
      aspectRatio={lockup.ratio}
      objectFit="contain"
      alignSelf="flex-start"
      flexShrink={0}
      display="block"
      filter={tone === "white" ? "brightness(0) invert(1)" : undefined}
    />
  );
}
