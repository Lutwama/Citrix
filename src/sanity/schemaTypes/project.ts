import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio project",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "cover",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 2 }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    defineField({ name: "solution", type: "text", rows: 4 }),
    defineField({ name: "result", type: "text", rows: 4 }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "client", media: "cover" } },
});
