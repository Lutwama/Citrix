import "server-only";
import { cache } from "react";
import * as fallback from "@/content/fallback";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/client";
import * as q from "@/sanity/queries";
import type {
  Category,
  Paged,
  Post,
  PostSummary,
  Project,
  ProjectSummary,
  Service,
  ServiceSummary,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "./types";

export const PAGE_SIZE = 6;

// Single entry point for content. Each getter reads Sanity once that document
// type has published content and otherwise serves the placeholder content, so
// a new or partly filled dataset never blanks the site.

function page<T>(all: T[], offset: number, limit: number): Paged<T> {
  const items = all.slice(offset, offset + limit);
  const next = offset + items.length;
  return { items, total: all.length, nextOffset: next < all.length ? next : null };
}

function toPaged<T>(
  res: { items: T[]; total: number },
  offset: number,
): Paged<T> {
  const next = offset + res.items.length;
  return { ...res, nextOffset: next < res.total ? next : null };
}

const fromSanity = cache(async (type: string): Promise<boolean> => {
  if (!isSanityConfigured) return false;
  return sanityFetch<boolean>(q.hasContentQuery, { type }, [type]);
});

const summarizeProject = ({ _id, title, slug, client, year, industry, cover, art, sample, services }: Project): ProjectSummary => ({
  _id, title, slug, client, year, industry, cover, art, sample, services,
});

const summarizePost = ({ body: _b, paragraphs: _p, content: _c, products: _pr, seo: _s, ...rest }: Post): PostSummary => rest;

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured) return fallback.settings;
  const s = await sanityFetch<Partial<SiteSettings> | null>(q.settingsQuery, {}, ["siteSettings"]);
  // Merge so a half-filled settings document never blanks the site.
  return { ...fallback.settings, ...Object.fromEntries(Object.entries(s ?? {}).filter(([, v]) => v != null && v !== "")) };
});

export const getServices = cache(async (): Promise<ServiceSummary[]> => {
  if (!(await fromSanity("service"))) return fallback.services;
  return sanityFetch(q.servicesQuery, {}, ["service"]);
});

export const getService = cache(async (slug: string): Promise<Service | null> => {
  if (!(await fromSanity("service"))) return fallback.services.find((s) => s.slug === slug) ?? null;
  return sanityFetch(q.serviceQuery, { slug }, ["service"]);
});

export async function getProjects({
  service = "",
  offset = 0,
  limit = PAGE_SIZE,
}: { service?: string; offset?: number; limit?: number } = {}): Promise<Paged<ProjectSummary>> {
  if (!(await fromSanity("project"))) {
    const all = fallback.projects
      .filter((p) => !service || p.services.some((s) => s.slug === service))
      .map(summarizeProject);
    return page(all, offset, limit);
  }
  const res = await sanityFetch<{ items: ProjectSummary[]; total: number }>(
    q.projectsQuery,
    { service, start: offset, end: offset + limit },
    ["project"],
  );
  return toPaged(res, offset);
}

export const getFeaturedProjects = cache(async (): Promise<ProjectSummary[]> => {
  if (!(await fromSanity("project"))) return fallback.projects.slice(0, 6).map(summarizeProject);
  return sanityFetch(q.featuredProjectsQuery, {}, ["project"]);
});

export const getProjectsByService = cache(async (service: string): Promise<ProjectSummary[]> => {
  if (!(await fromSanity("project")))
    return fallback.projects
      .filter((p) => p.services.some((s) => s.slug === service))
      .slice(0, 3)
      .map(summarizeProject);
  return sanityFetch(q.projectsByServiceQuery, { service }, ["project"]);
});

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  if (!(await fromSanity("project"))) return fallback.projects.find((p) => p.slug === slug) ?? null;
  return sanityFetch(q.projectQuery, { slug }, ["project"]);
});

export async function getPosts({
  category = "",
  offset = 0,
  limit = PAGE_SIZE,
}: { category?: string; offset?: number; limit?: number } = {}): Promise<Paged<PostSummary>> {
  if (!(await fromSanity("post"))) {
    const all = fallback.posts
      .filter((p) => !category || p.category?.slug === category)
      .map(summarizePost);
    return page(all, offset, limit);
  }
  const res = await sanityFetch<{ items: PostSummary[]; total: number }>(
    q.postsQuery,
    { category, start: offset, end: offset + limit },
    ["post"],
  );
  return toPaged(res, offset);
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!(await fromSanity("post"))) return fallback.posts.find((p) => p.slug === slug) ?? null;
  return sanityFetch(q.postQuery, { slug }, ["post"]);
});

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!(await fromSanity("category"))) return fallback.categories;
  return sanityFetch(q.categoriesQuery, {}, ["category"]);
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!(await fromSanity("testimonial"))) return fallback.testimonials;
  return sanityFetch(q.testimonialsQuery, {}, ["testimonial"]);
});

export const getTeam = cache(async (): Promise<TeamMember[]> => {
  if (!(await fromSanity("teamMember"))) return fallback.team;
  return sanityFetch(q.teamQuery, {}, ["teamMember"]);
});

export const getAllSlugs = cache(
  async (): Promise<{ services: string[]; projects: string[]; posts: string[] }> => {
    const [services, projects, posts] = await Promise.all(["service", "project", "post"].map(fromSanity));
    const remote =
      services || projects || posts
        ? await sanityFetch<{ services: string[]; projects: string[]; posts: string[] }>(
            q.slugsQuery, {}, ["service", "project", "post"],
          )
        : null;
    return {
      services: services ? remote!.services : fallback.services.map((s) => s.slug),
      projects: projects ? remote!.projects : fallback.projects.map((p) => p.slug),
      posts: posts ? remote!.posts : fallback.posts.map((p) => p.slug),
    };
  },
);
