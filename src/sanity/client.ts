import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

/**
 * Tagged fetch. Pages are statically cached for an hour and refreshed
 * immediately when the Sanity webhook hits /api/revalidate with the tag.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = [],
): Promise<T> {
  if (!client) throw new Error("Sanity is not configured");
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags: ["sanity", ...tags] },
  });
}
