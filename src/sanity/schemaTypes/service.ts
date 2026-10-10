import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: ["printer", "pen-tool", "sparkles", "monitor-smartphone", "calendar-check", "megaphone", "camera", "package"],
      },
    }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required().max(180) }),
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 4 }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "deliverables", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "process",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
