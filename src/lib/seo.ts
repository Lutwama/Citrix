import { createElement } from "react";
import type { Metadata } from "next";
import type { Seo, SiteSettings } from "./types";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export function pageMetadata({
  title,
  description,
  path,
  seo,
}: {
  title: string;
  description?: string;
  path: string;
  seo?: Seo;
}): Metadata {
  const t = seo?.title || title;
  const d = seo?.description || description;
  return {
    title: t,
    description: d,
    alternates: { canonical: path },
    openGraph: { title: t, description: d, url: path },
  };
}

/** Renders a JSON-LD <script>. `<` is escaped so content can't break out of the tag. */
export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

export function organizationJsonLd(s: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: s.name,
    slogan: s.tagline,
    description: s.description,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    telephone: s.phone,
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    areaServed: "Uganda",
    sameAs: s.socials.map((x) => x.url),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
