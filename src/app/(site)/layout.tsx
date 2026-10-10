import { Box } from "@chakra-ui/react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { getServices, getSettings } from "@/lib/data";
import { JsonLd, organizationJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <Header phone={settings.phone} services={services} />
      <Box as="main" id="main" minH="60vh">
        {children}
      </Box>
      <Footer settings={settings} services={services} />
      <WhatsAppFab number={settings.whatsapp} />
    </>
  );
}
