"use client";

import { Accordion, Box, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root collapsible variant="plain" display="flex" flexDirection="column" gap={3}>
      {faqs.map((f, i) => (
        <Accordion.Item key={i} value={String(i)} rounded="xl" bg="white" borderWidth="1px" borderColor="blackAlpha.100" px={6}>
          <Accordion.ItemTrigger py={5} cursor="pointer">
            <Text flex="1" fontFamily="heading" fontWeight="700" fontSize="lg" color="brand.blue">
              {f.question}
            </Text>
            <Accordion.ItemIndicator color="brand.cyan">
              <ChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Box pb={5} color="fg.muted">
              {f.answer}
            </Box>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
