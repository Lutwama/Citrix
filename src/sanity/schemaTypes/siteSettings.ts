import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "name", type: "string", initialValue: "Citrix Solutions Ltd" }),
    defineField({ name: "tagline", type: "string", initialValue: "Integrated Solutions for Modern Brand Growth" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "phoneAlt", title: "Alternative phone", type: "string" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      description: "International format, digits only, e.g. 256700000000",
      type: "string",
      validation: (r) => r.regex(/^\d{9,15}$/, { name: "digits" }),
    }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "city", type: "string", initialValue: "Kampala, Uganda" }),
    defineField({
      name: "poBox",
      title: "P.O. Box",
      description: "Postal address, e.g. P.O. Box 181454, Kampala, Uganda",
      type: "string",
    }),
    defineField({ name: "hours", title: "Opening hours", type: "string" }),
    defineField({ name: "mapEmbedUrl", title: "Google Maps embed URL", type: "url" }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["facebook", "instagram", "linkedin", "x", "tiktok", "youtube"] },
            }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "stats",
      description: "Numbers shown on the home page stats band",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "string" })],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
