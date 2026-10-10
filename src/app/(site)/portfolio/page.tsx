import { Suspense } from "react";
import { ProjectFeed } from "@/components/feeds";
import { CtaBand, PageHero } from "@/components/sections/misc-sections";
import { Section } from "@/components/ui/primitives";
import { getProjects, getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description: "Selected print, branding, design, web and event projects by Citrix Solutions for brands across Uganda.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const [initial, services, settings] = await Promise.all([getProjects(), getServices(), getSettings()]);
  const filters = services.map((s) => ({ label: s.title, value: s.slug }));

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that moves brands forward."
        description="Identity systems, print campaigns, websites and events — crafted for ambitious businesses across Uganda."
      />
      <Section>
        {/* nuqs reads search params on the client, so it needs a Suspense boundary on a static page */}
        <Suspense>
          <ProjectFeed initial={initial} filters={filters} />
        </Suspense>
      </Section>
      <CtaBand whatsapp={settings.whatsapp} title="Have a project in mind?" />
    </>
  );
}
