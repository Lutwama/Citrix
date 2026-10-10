import { z } from "zod";

// Shared by the client form (TanStack Form) and /api/quote.

export const BUDGETS = [
  "Under UGX 500,000",
  "UGX 500,000 – 2M",
  "UGX 2M – 5M",
  "UGX 5M – 15M",
  "Above UGX 15M",
  "Not sure yet",
] as const;

export const TIMELINES = ["As soon as possible", "Within 2 weeks", "Within a month", "1–3 months", "Flexible"] as const;

export const quoteFields = {
  services: z.array(z.string()).min(1, "Pick at least one service"),
  description: z.string().trim().min(20, "Tell us a little more (at least 20 characters)").max(3000),
  budget: z.enum(BUDGETS, { message: "Choose a budget range" }),
  timeline: z.enum(TIMELINES, { message: "Choose a timeline" }),
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{9,20}$/, "Enter a valid phone number"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  // Honeypot: hidden from humans, bots tend to fill it.
  website: z.string().max(0).optional().or(z.literal("")),
};

export const quoteSchema = z.object(quoteFields);
export type QuoteInput = z.infer<typeof quoteSchema>;

export const QUOTE_STEPS = [
  { title: "Services", fields: ["services"] },
  { title: "Project", fields: ["description", "budget", "timeline"] },
  { title: "Contact", fields: ["name", "email", "phone", "company"] },
] as const satisfies { title: string; fields: (keyof QuoteInput)[] }[];
