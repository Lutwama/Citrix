"use client";

import { PostCard } from "@/components/blog/post-card";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PagedFeed } from "@/components/ui/paged-feed";
import type { Paged, PostSummary, ProjectSummary } from "@/lib/types";

type Filter = { label: string; value: string };

export function ProjectFeed({ initial, filters }: { initial: Paged<ProjectSummary>; filters: Filter[] }) {
  return (
    <PagedFeed
      endpoint="/api/projects"
      param="service"
      filters={filters}
      initial={initial}
      initialFilter=""
      emptyLabel="No projects in this category yet — check back soon."
      renderItem={(p) => <ProjectCard project={p} />}
    />
  );
}

export function PostFeed({ initial, filters }: { initial: Paged<PostSummary>; filters: Filter[] }) {
  return (
    <PagedFeed
      endpoint="/api/posts"
      param="category"
      filters={filters}
      initial={initial}
      initialFilter=""
      emptyLabel="No articles in this category yet."
      renderItem={(p) => <PostCard post={p} />}
    />
  );
}
