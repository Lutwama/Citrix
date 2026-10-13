import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { getAllSlugs } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, projects, posts } = await getAllSlugs();
  const now = new Date();
  const url = (path: string, priority: number) => ({ url: `${siteUrl}${path}`, lastModified: now, priority });

  return [
    url("/", 1),
    url("/services", 0.9),
    ...services.map((s) => url(`/services/${s}`, 0.9)),
    ...products.filter((p) => services.includes(p.service)).map((p) => url(`/services/${p.service}/${p.slug}`, 0.8)),
    url("/portfolio", 0.8),
    ...projects.map((s) => url(`/portfolio/${s}`, 0.6)),
    url("/about", 0.7),
    url("/contact", 0.8),
    url("/blog", 0.6),
    ...posts.map((s) => url(`/blog/${s}`, 0.5)),
  ];
}
