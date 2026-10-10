import { CommentIcon } from "@sanity/icons/Comment";
import { TagIcon } from "@sanity/icons/Tag";
import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.max(160) }),
  ],
});

export const category = defineType({
  name: "category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
  ],
});

export const author = defineType({
  name: "author",
  type: "document",
  icon: UserIcon,
  fields: [defineField({ name: "name", type: "string", validation: (r) => r.required() })],
});

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
