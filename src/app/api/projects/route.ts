import { NextResponse, type NextRequest } from "next/server";
import { getProjects } from "@/lib/data";

// Paged portfolio feed for the client-side "Load more" (TanStack useInfiniteQuery).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const service = sp.get("service") ?? "";
  const offset = Math.max(0, Number(sp.get("offset")) || 0);
  const data = await getProjects({ service, offset });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
