import { groq } from "next-sanity";

// True once a document type has published content; until then the site serves
// the placeholder content for that type.
export const hasContentQuery = groq`count(*[_type == $type && !(_id in path("drafts.**"))]) > 0`;

// Projections mirror the types in src/lib/types.ts.
const image = (field: string) => groq`
  ${field}{
    "url": asset->url,
    alt,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }`;

const seo = groq`"seo": seo{ title, description }`;

export const settingsQuery = groq`*[_type == "siteSettings"][0]{
  name, tagline, description, phone, phoneAlt, whatsapp, email, address, city, poBox,
  mapEmbedUrl, hours,
  "socials": coalesce(socials[]{ platform, url }, []),
  "stats": coalesce(stats[]{ value, label }, [])
}`;

const serviceSummary = groq`_id, title, "slug": slug.current, icon, summary`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc, title asc){ ${serviceSummary} }`;

export const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  ${serviceSummary}, headline, intro, body,
  "deliverables": coalesce(deliverables, []),
  "process": coalesce(process[]{ title, description }, []),
  "faqs": coalesce(faqs[]{ question, answer }, []),
  "heroImage": ${image("heroImage")},
  ${seo}
}`;

const projectSummary = groq`
  _id, title, "slug": slug.current, client, year, industry,
  "cover": ${image("cover")},
  "services": coalesce(services[]->{ title, "slug": slug.current }, [])`;

const projectFilter = groq`_type == "project" && (!defined($service) || $service == "" || $service in services[]->slug.current)`;

export const projectsQuery = groq`{
  "items": *[${projectFilter}] | order(featured desc, year desc, _createdAt desc)[$start...$end]{ ${projectSummary} },
  "total": count(*[${projectFilter}])
}`;

export const featuredProjectsQuery = groq`*[_type == "project"] | order(featured desc, year desc)[0...6]{ ${projectSummary} }`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ${projectSummary}, excerpt, location, duration, challenge, solution, result,
  "deliverables": coalesce(deliverables, []),
  "products": coalesce(products, []),
  "testimonial": select(defined(testimonial.quote) => testimonial{ quote, name, role }, null),
  "gallery": coalesce(gallery[]{
    "url": asset->url, alt,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }, []),
  ${seo}
}`;

export const projectsByServiceQuery = groq`*[_type == "project" && $service in services[]->slug.current] | order(year desc)[0...3]{ ${projectSummary} }`;

const postSummary = groq`
  _id, title, "slug": slug.current, excerpt, publishedAt,
  "cover": ${image("cover")},
  "category": category->{ title, "slug": slug.current },
  "author": author->{ name },
  "readingMinutes": round(length(pt::text(body)) / 5 / 200)`;

const postFilter = groq`_type == "post" && defined(slug.current) && (!defined($category) || $category == "" || category->slug.current == $category)`;

export const postsQuery = groq`{
  "items": *[${postFilter}] | order(publishedAt desc)[$start...$end]{ ${postSummary} },
  "total": count(*[${postFilter}])
}`;

// Inline body images are resolved to plain URLs for the PortableText renderer.
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ${postSummary},
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  },
  ${seo}
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(title asc){ title, "slug": slug.current }`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){ _id, quote, name, role, company }`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){ _id, name, role, "photo": ${image("photo")} }`;

export const slugsQuery = groq`{
  "services": *[_type == "service" && defined(slug.current)].slug.current,
  "projects": *[_type == "project" && defined(slug.current)].slug.current,
  "posts": *[_type == "post" && defined(slug.current)].slug.current
}`;
