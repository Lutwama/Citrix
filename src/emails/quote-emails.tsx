import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { QuoteInput } from "@/lib/quote-schema";

const brand = { blue: "#004E9B", cyan: "#0091B9", teal: "#115B70", ice: "#BAE4F0", mist: "#EEF8FB" };

const body = { backgroundColor: brand.mist, fontFamily: "Helvetica, Arial, sans-serif", padding: "24px 0" };
const card = { backgroundColor: "#ffffff", borderRadius: 12, padding: "32px", maxWidth: 560, margin: "0 auto" };
const label = { color: "#4A6075", fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "16px 0 4px" };
const value = { color: "#0B2540", fontSize: 15, margin: 0, whiteSpace: "pre-wrap" as const };

function Header() {
  return (
    <Section style={{ borderBottom: `3px solid ${brand.cyan}`, paddingBottom: 16, marginBottom: 8 }}>
      <Text style={{ margin: 0, fontSize: 20, fontWeight: 700, color: brand.blue, letterSpacing: "0.02em" }}>
        CITRIX <span style={{ color: brand.cyan }}>SOLUTIONS LTD</span>
      </Text>
      <Text style={{ margin: 0, fontSize: 12, fontStyle: "italic", color: brand.blue }}>
        Integrated Solutions for Modern Brand Growth
      </Text>
    </Section>
  );
}

/** Internal lead notification sent to the Citrix team. */
export function QuoteNotification({ data, services }: { data: QuoteInput; services: string[] }) {
  const rows: [string, string | undefined][] = [
    ["Services", services.join(", ")],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone", data.phone],
  ];
  return (
    <Html>
      <Head />
      <Preview>New quote request from {data.name}</Preview>
      <Body style={body}>
        <Container style={card}>
          <Header />
          <Heading as="h2" style={{ color: brand.blue, fontSize: 22, margin: "16px 0 8px" }}>
            New quote request
          </Heading>
          {rows.map(([k, v]) => (
            <div key={k}>
              <Text style={label}>{k}</Text>
              <Text style={value}>{v}</Text>
            </div>
          ))}
          <Text style={label}>Project details</Text>
          <Text style={{ ...value, backgroundColor: brand.mist, padding: 16, borderRadius: 8 }}>{data.description}</Text>
          <Hr style={{ borderColor: brand.ice, margin: "24px 0" }} />
          <Text style={{ ...value, fontSize: 13 }}>
            Reply to this email to respond directly, or{" "}
            <Link href={`https://wa.me/${data.phone.replace(/\D/g, "").replace(/^0/, "256")}`} style={{ color: brand.blue }}>
              message them on WhatsApp
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Confirmation sent to the person who requested the quote. */
export function QuoteAutoReply({ name, services, phone }: { name: string; services: string[]; phone: string }) {
  return (
    <Html>
      <Head />
      <Preview>We&apos;ve received your quote request</Preview>
      <Body style={body}>
        <Container style={card}>
          <Header />
          <Heading as="h2" style={{ color: brand.blue, fontSize: 22, margin: "16px 0 8px" }}>
            Thanks, {name.split(" ")[0]}!
          </Heading>
          <Text style={value}>
            We&apos;ve received your request for <b>{services.join(", ")}</b>. A member of our team will review the details and get back
            to you within one business day.
          </Text>
          <Text style={{ ...value, marginTop: 16 }}>
            Need something urgently? Call or WhatsApp us on <b>{phone}</b>.
          </Text>
          <Hr style={{ borderColor: brand.ice, margin: "24px 0" }} />
          <Text style={{ ...value, fontSize: 13, color: "#4A6075" }}>— The Citrix Solutions team</Text>
        </Container>
      </Body>
    </Html>
  );
}
