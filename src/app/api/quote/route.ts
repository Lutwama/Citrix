import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { QuoteAutoReply, QuoteNotification } from "@/emails/quote-emails";
import { getServices, getSettings } from "@/lib/data";
import { quoteSchema } from "@/lib/quote-schema";

// Best-effort throttle: 5 requests / 10 min per IP. It's per serverless
// instance, so it stops casual abuse; swap for Upstash/Vercel KV if needed.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later or reach us on WhatsApp." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again.", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot tripped: pretend success so bots don't retry.
  if (data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "Citrix Solutions <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[quote] RESEND_API_KEY / QUOTE_TO_EMAIL not set — logging instead of sending:", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[quote] Email is not configured");
    return NextResponse.json({ error: "We couldn't send your request right now. Please reach us on WhatsApp or by phone." }, { status: 503 });
  }

  const [allServices, settings] = await Promise.all([getServices(), getSettings()]);
  const serviceNames = data.services.map((slug) => allServices.find((s) => s.slug === slug)?.title ?? slug);

  const resend = new Resend(apiKey);
  const [team, client] = await Promise.all([
    resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `New quote request: ${serviceNames.join(", ")} — ${data.name}`,
      react: QuoteNotification({ data, services: serviceNames }),
    }),
    resend.emails.send({
      from,
      to: data.email,
      subject: "We've received your quote request — Citrix Solutions",
      react: QuoteAutoReply({ name: data.name, services: serviceNames, phone: settings.phone }),
    }),
  ]);

  if (team.error) {
    console.error("[quote] team email failed", team.error);
    return NextResponse.json({ error: "We couldn't send your request right now. Please reach us on WhatsApp or by phone." }, { status: 502 });
  }
  // The auto-reply is a courtesy; a failure there shouldn't fail the lead.
  if (client.error) console.warn("[quote] auto-reply failed", client.error);

  return NextResponse.json({ ok: true });
}
