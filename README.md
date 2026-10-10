# Citrix Solutions Ltd — Website

Marketing site for **Citrix Solutions Ltd** (Kampala), covering print, graphic design, branding, web design and event management.
The brand guide is in [`docs/citrix.pdf`](docs/citrix.pdf).

**Stack:**
- **Framework:** Next.js 16 (App Router) and React 19
- **UI:** Chakra UI v3 and lucide-react
- **Content:** Sanity CMS, with the Studio embedded at `/studio`
- **Data and forms:** TanStack Query and TanStack Form with Zod
- **Interaction:** Motion (animation), Embla (carousels), nuqs (URL state)
- **Email:** Resend with React Email
- **Hosting:** Vercel, with Analytics and Speed Insights

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in what you have
pnpm dev                     # http://localhost:3000
```

With no Sanity project configured, the site serves placeholder content from `src/content/fallback.ts`. Everything works except the CMS.
Without `RESEND_API_KEY`, the quote form logs submissions to the terminal in development.

## Project layout

| Path | What it is |
|---|---|
| `src/app/(site)/` | Public pages: home, about, services, portfolio, blog, contact |
| `src/app/studio/` | Embedded Sanity Studio |
| `src/app/api/quote` | Quote form endpoint: Zod validation, honeypot, throttle, Resend |
| `src/app/api/revalidate` | Sanity webhook that refreshes cached pages on publish |
| `src/app/api/projects`, `api/posts` | Paged feeds for "Load more" |
| `src/lib/data.ts` | **Single data layer.** Reads Sanity, or the fallback content |
| `src/sanity/` | Client, GROQ queries and schemas |
| `src/theme/` | Chakra system (brand tokens and text styles) and fonts |
| `src/components/` | Layout, sections, forms, UI primitives |
| `src/emails/` | Lead notification and auto-reply email templates |

### Brand tokens
- **Colours:** `brand.blue #004E9B`, `brand.cyan #0091B9`, `brand.teal #115B70`, `brand.ice #BAE4F0`
- **Fonts:** Exo for headings, Clear Sans for body text

Use the text styles `display`, `h1`, `h2`, `h3`, `eyebrow` and `lead` rather than hand-sizing headings.

### Logo
`src/components/ui/logo.tsx` contains a **vector approximation** of the swirl mark. When the official SVG is exported:
1. Replace the two `<path>` elements in `LogoMark`, keeping `viewBox="0 0 100 100"`.
2. Update `src/app/icon.svg` and the two `public/brand/swirl-pattern*.svg` files to match.

## Setting up Sanity

1. Create the project:
   ```bash
   pnpm dlx sanity@latest init --env .env.local
   ```
   Or create it at sanity.io/manage and copy the project ID into `.env.local`.
2. In sanity.io/manage → **API → CORS origins**, add `http://localhost:3000` and the production domain, with credentials allowed.
3. Open `/studio`, fill in **Site settings**, then add services, projects, posts and testimonials.
4. Add a webhook under **API → Webhooks**:
   - **URL:** `https://<domain>/api/revalidate`
   - **Trigger on:** create, update, delete
   - **Projection:** `{_type}`
   - **Secret:** the value of `SANITY_REVALIDATE_SECRET`

Service `slug`s must match what pages link to. The defaults are `print`, `graphic-design`, `branding`, `web-design` and `event-management`.

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel. The framework is detected automatically.
2. Add every variable from `.env.example` in **Project → Settings → Environment Variables**.
3. In Resend, verify your sending domain so `QUOTE_FROM_EMAIL` is allowed.
4. Add the custom domain, then update `NEXT_PUBLIC_SITE_URL` and the Sanity CORS and webhook URLs to use it.

## Scripts

- `pnpm dev`: development server
- `pnpm build`: production build
- `pnpm start`: serve the production build
- `pnpm lint`: ESLint
- `pnpm typecheck`: TypeScript check
