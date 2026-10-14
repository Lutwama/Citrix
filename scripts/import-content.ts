// One-off import of site settings and services from src/content/fallback.ts
// into Sanity, so they can be edited in /studio.
//
//   pnpm import:content
//
// Needs SANITY_API_WRITE_TOKEN (Editor) in .env.local. Documents are created
// only if missing, so re-running never overwrites edits made in the Studio.
// Projects and posts stay on the fallback content until real ones are
// published: their illustrations and article blocks have no schema yet.
import { createClient } from "next-sanity";
import { services, settings } from "../src/content/fallback";

process.loadEnvFile(".env.local");

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, SANITY_API_WRITE_TOKEN: token } = process.env;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-10-01",
  token,
  useCdn: false,
});

// Sanity needs a unique _key on every object in an array.
const keyed = <T extends object>(items: T[]) => items.map((item, i) => ({ _key: `k${i}`, ...item }));

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...settings,
    socials: keyed(settings.socials),
    stats: keyed(settings.stats),
  },
  ...services.map((s, i) => ({
    _id: `service-${s.slug}`,
    _type: "service",
    title: s.title,
    slug: { _type: "slug", current: s.slug },
    icon: s.icon,
    order: i + 1,
    summary: s.summary,
    headline: s.headline,
    intro: s.intro,
    deliverables: s.deliverables,
    process: keyed(s.process),
    faqs: keyed(s.faqs),
  })),
];

const tx = client.transaction();
for (const doc of docs) tx.createIfNotExists(doc);
tx.commit().then(
  () => console.log(`Imported ${docs.length} documents (existing ones were left unchanged).`),
  (err) => {
    console.error(err.message);
    process.exit(1);
  },
);
