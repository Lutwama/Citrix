import { CtaBand, PageHero, ProcessSteps } from "@/components/sections/misc-sections";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { services as fallbackServices } from "@/content/fallback";
import { getServices, getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: "Print, graphic design, branding, web design and event management in Kampala — integrated under one roof.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One partner for every brand touchpoint."
        description="We bring print, design, digital and live experiences together so your brand looks and feels the same everywhere your customers meet it."
      />
      <Section tone="mist">
        <ServicesGrid services={services} />
      </Section>
      <Section>
        <SectionHeading eyebrow="Our process" title="How every project comes together" />
        <ProcessSteps steps={fallbackServices[0].process} />
      </Section>
      <CtaBand whatsapp={settings.whatsapp} />
    </>
  );
}
