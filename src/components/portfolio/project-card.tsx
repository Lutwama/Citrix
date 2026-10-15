import { Box, Heading, HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Media } from "@/components/ui/media";
import type { ProjectSummary } from "@/lib/types";

export function SampleBadge() {
  return (
    <Text
      as="span"
      color="brand.blue"
      bg="white"
      px={2.5}
      py={1}
      rounded="full"
      fontSize="xs"
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing="0.08em"
      boxShadow="0 2px 8px rgba(0,0,0,0.12)"
      title="Sample project showing the layout, to be replaced with real work"
    >
      Sample
    </Text>
  );
}

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <LinkBox as="article" role="group" h="full">
      <Box position="relative" rounded="card" overflow="hidden" mb={4}>
        <Media
          image={project.cover}
          alt={project.title}
          seed={project.slug}
          art={project.art}
          artLabel={project.client}
          aspectRatio={4 / 3}
          transition="transform 0.5s cubic-bezier(.22,1,.36,1)"
          _groupHover={{ transform: "scale(1.04)" }}
        />
        {project.sample && (
          <Box position="absolute" top={3} left={3}>
            <SampleBadge />
          </Box>
        )}
      </Box>
      <HStack gap={2} mb={2} flexWrap="wrap">
        {project.services.map((s) => (
          <Text
            key={s.slug}
            as="span"
            fontSize="xs"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="brand.cyan"
          >
            {s.title}
          </Text>
        ))}
      </HStack>
      <Heading as="h3" textStyle="h3" color="heading" _groupHover={{ color: "brand.cyan" }} transition="color 0.2s">
        <LinkOverlay asChild>
          <NextLink href={`/portfolio/${project.slug}`}>{project.title}</NextLink>
        </LinkOverlay>
      </Heading>
      {(project.client || project.industry || project.year) && (
        <Text color="fg.muted" fontSize="sm" mt={1}>
          {[project.client, project.industry, project.year].filter(Boolean).join(" · ")}
        </Text>
      )}
    </LinkBox>
  );
}
