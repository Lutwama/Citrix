import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 *   URL:        https://<domain>/api/revalidate
 *   Projection: { _type }
 *   Secret:     SANITY_REVALIDATE_SECRET
 * Every fetch is tagged with its document type (see src/lib/data.ts), so
 * publishing a project only refreshes pages that read projects.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  if (!body?._type) return NextResponse.json({ message: "Bad request" }, { status: 400 });

  // Settings appear on every page, so refresh everything.
  const tag = body._type === "siteSettings" ? "sanity" : body._type;
  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tag, now: Date.now() });
}
