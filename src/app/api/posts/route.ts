import { NextResponse, type NextRequest } from "next/server";
import { getPosts } from "@/lib/data";

// Paged blog feed for the client-side "Load more" (TanStack useInfiniteQuery).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const category = sp.get("category") ?? "";
  const offset = Math.max(0, Number(sp.get("offset")) || 0);
  const data = await getPosts({ category, offset });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
