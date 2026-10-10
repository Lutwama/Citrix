import { Suspense } from "react";
import { PostFeed } from "@/components/feeds";
import { PageHero } from "@/components/sections/misc-sections";
import { Section } from "@/components/ui/primitives";
import { getCategories, getPosts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical ideas on branding, print, web design and events from the Citrix Solutions team in Kampala.",
  path: "/blog",
});

export default async function BlogPage() {
  const [initial, categories] = await Promise.all([getPosts(), getCategories()]);
  return (
    <>
      <PageHero eyebrow="Insights" title="Ideas for growing brands." description="Tips, guides and behind-the-scenes from our designers, printers, developers and event planners." />
      <Section tone="mist">
        <Suspense>
          <PostFeed initial={initial} filters={categories.map((c) => ({ label: c.title, value: c.slug }))} />
        </Suspense>
      </Section>
    </>
  );
}
