// Shapes returned by the data layer (src/lib/data.ts). GROQ projections in
// src/sanity/queries.ts are written to match these exactly, so pages don't
// care whether content came from Sanity or the local fallback.

export type SanityImage = {
  url: string;
  alt?: string;
  lqip?: string;
  width?: number;
  height?: number;
} | null;

export type PortableText = unknown[];

export type Seo = {
  title?: string;
  description?: string;
} | null;

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneAlt?: string;
  whatsapp: string; // international format, digits only e.g. 256700000000
  email: string;
  address: string;
  city: string;
  mapEmbedUrl?: string;
  hours?: string;
  socials: { platform: string; url: string }[];
  stats: { value: string; label: string }[];
};

export type Faq = { question: string; answer: string };
export type ProcessStep = { title: string; description: string };

export type ServiceSummary = {
  _id: string;
  title: string;
  slug: string;
  icon: string; // lucide icon name, see src/components/ui/service-icon.tsx
  summary: string;
};

export type Service = ServiceSummary & {
  headline?: string;
  body?: PortableText;
  intro?: string;
  deliverables: string[];
  process: ProcessStep[];
  faqs: Faq[];
  heroImage: SanityImage;
  seo: Seo;
};

export type ProjectSummary = {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  year?: string;
  cover: SanityImage;
  services: { title: string; slug: string }[];
};

export type Project = ProjectSummary & {
  excerpt?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  gallery: NonNullable<SanityImage>[];
  seo: Seo;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  cover: SanityImage;
  category?: { title: string; slug: string } | null;
  author?: { name: string } | null;
  readingMinutes?: number;
};

export type Post = PostSummary & {
  body?: PortableText;
  paragraphs?: string[]; // fallback content only
  seo: Seo;
};

export type Category = { title: string; slug: string };

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photo: SanityImage;
};

export type Paged<T> = { items: T[]; total: number; nextOffset: number | null };
