"use client";

import { Box, Button, Flex, HStack, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { parseAsString, useQueryState } from "nuqs";
import type { ReactNode } from "react";
import type { Paged } from "@/lib/types";

/**
 * Filterable, paginated grid shared by the portfolio and blog.
 * - Filter lives in the URL (?service=print) via nuqs, so views are shareable.
 * - The first page is server-rendered and seeded as initialData for the
 *   unfiltered view; further pages come from `endpoint` via useInfiniteQuery.
 */
export function PagedFeed<T extends { _id: string }>({
  endpoint,
  param,
  filters,
  initial,
  initialFilter,
  renderItem,
  columns = { base: 1, md: 2, lg: 3 },
  emptyLabel,
}: {
  endpoint: string;
  param: string;
  filters: { label: string; value: string }[];
  initial: Paged<T>;
  initialFilter: string;
  renderItem: (item: T) => ReactNode;
  columns?: Record<string, number>;
  emptyLabel: string;
}) {
  const [filter, setFilter] = useQueryState(param, parseAsString.withDefault("").withOptions({ scroll: false }));

  const query = useInfiniteQuery({
    queryKey: [endpoint, filter],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`${endpoint}?${param}=${encodeURIComponent(filter)}&offset=${pageParam}`);
      if (!res.ok) throw new Error("Failed to load");
      return (await res.json()) as Paged<T>;
    },
    initialPageParam: 0,
    getNextPageParam: (last) => last.nextOffset ?? undefined,
    initialData: filter === initialFilter ? { pages: [initial], pageParams: [0] } : undefined,
  });

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <Box>
      <HStack as="nav" aria-label="Filter" gap={2} mb={10} flexWrap="wrap">
        {[{ label: "All", value: "" }, ...filters].map((f) => {
          const active = f.value === filter;
          return (
            <Button
              key={f.value}
              size="sm"
              rounded="full"
              px={5}
              variant={active ? "solid" : "outline"}
              colorPalette="brand"
              aria-pressed={active}
              onClick={() => setFilter(f.value || null)}
            >
              {f.label}
            </Button>
          );
        })}
      </HStack>

      {query.isPending ? (
        <Flex justify="center" py={20}>
          <Spinner color="heading" size="lg" />
        </Flex>
      ) : query.isError ? (
        <Text color="red.600">Something went wrong loading this list. Please refresh.</Text>
      ) : items.length === 0 ? (
        <Text color="fg.muted" py={10}>
          {emptyLabel}
        </Text>
      ) : (
        <SimpleGrid columns={columns} gap={{ base: 8, md: 10 }}>
          {items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </SimpleGrid>
      )}

      {query.hasNextPage && (
        <Flex justify="center" mt={14}>
          <Button
            onClick={() => query.fetchNextPage()}
            loading={query.isFetchingNextPage}
            variant="outline"
            colorPalette="brand"
            rounded="full"
            size="lg"
            px={10}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Box>
  );
}
