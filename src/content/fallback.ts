// Placeholder content used when Sanity isn't configured (no
// NEXT_PUBLIC_SANITY_PROJECT_ID). Replace by publishing real content in /studio.
import type {
  Category,
  Post,
  Project,
  Service,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/lib/types";

export const settings: SiteSettings = {
  name: "Citrix Solutions Ltd",
  tagline: "Integrated Solutions for Modern Brand Growth",
  description:
    "Citrix Solutions is a Kampala-based creative partner for print, graphic design, branding, web design and event management.",
  phone: "+256 700 000 000",
  whatsapp: "256700000000",
  email: "hello@citrixsolutions.co.ug",
  address: "Plot 00, Kampala Road",
  city: "Kampala, Uganda",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kampala%20Road%2C%20Kampala&output=embed",
  hours: "Mon – Sat, 8:00am – 6:00pm",
  socials: [
    { platform: "facebook", url: "https://facebook.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "linkedin", url: "https://linkedin.com/" },
    { platform: "x", url: "https://x.com/" },
  ],
  stats: [
    { value: "250+", label: "Brands served" },
    { value: "1,200+", label: "Print jobs delivered" },
    { value: "80+", label: "Events managed" },
    { value: "8 yrs", label: "Of creative craft" },
  ],
};

const defaultProcess = [
  { title: "Discover", description: "We listen, ask questions and get clear on your goals, audience and budget." },
  { title: "Design", description: "Concepts, drafts and proofs — refined with your feedback until it's right." },
  { title: "Deliver", description: "Production, launch or execution on schedule, with quality checks at every step." },
  { title: "Grow", description: "We stay on as your partner, helping your brand keep its momentum." },
];

export const services: Service[] = [
  {
    _id: "svc-print",
    title: "Print",
    slug: "print",
    icon: "printer",
    summary:
      "Business cards to billboards — sharp, colour-accurate printing delivered on time.",
    headline: "Print that looks as good in hand as it did on screen.",
    intro:
      "From short-run digital to large-format and promotional items, we manage the full print workflow: file prep, proofing, production and delivery across Kampala.",
    deliverables: [
      "Business cards & stationery",
      "Flyers, brochures & catalogues",
      "Banners, pull-ups & billboards",
      "Branded merchandise & apparel",
      "Packaging & labels",
      "Large-format & vehicle branding",
    ],
    process: defaultProcess,
    faqs: [
      { question: "What file formats do you accept?", answer: "Print-ready PDF is best, but we also accept AI, PSD, INDD and high-resolution PNG/JPG. Our team will check every file before it goes to press." },
      { question: "How fast is turnaround?", answer: "Most digital jobs are ready in 24–72 hours. Large-format and bulk orders depend on quantity — we confirm timelines with every quote." },
      { question: "Do you deliver?", answer: "Yes — we deliver within Kampala and can arrange courier delivery upcountry." },
    ],
    heroImage: null,
    seo: null,
  },
  {
    _id: "svc-graphic-design",
    title: "Graphic Design",
    slug: "graphic-design",
    icon: "pen-tool",
    summary:
      "Scroll-stopping visuals for social, print and presentations that tell your story.",
    headline: "Design that makes people stop, look and act.",
    intro:
      "Our designers create visuals that are on-brand and built for purpose — whether it's a campaign, a pitch deck or a month of social content.",
    deliverables: [
      "Social media content",
      "Posters & campaign artwork",
      "Company profiles & reports",
      "Presentations & pitch decks",
      "Infographics & illustrations",
      "Menus, certificates & invitations",
    ],
    process: defaultProcess,
    faqs: [
      { question: "How many revisions are included?", answer: "Every design package includes up to three rounds of revisions so you get exactly what you need." },
      { question: "Will I receive the source files?", answer: "Yes. On final payment you receive print-ready and editable source files." },
    ],
    heroImage: null,
    seo: null,
  },
  {
    _id: "svc-branding",
    title: "Branding",
    slug: "branding",
    icon: "sparkles",
    summary:
      "Logos, identity systems and brand guidelines that make you unmistakable.",
    headline: "Build a brand people remember — and trust.",
    intro:
      "We craft brand identities from the ground up or refresh existing ones, delivering a complete, consistent system you can use everywhere.",
    deliverables: [
      "Brand strategy & positioning",
      "Logo design",
      "Colour & typography systems",
      "Brand guidelines",
      "Stationery & collateral",
      "Signage & environmental branding",
    ],
    process: defaultProcess,
    faqs: [
      { question: "How long does a brand identity take?", answer: "A full identity typically takes 3–6 weeks, depending on scope and feedback cycles." },
      { question: "Can you refresh our existing brand?", answer: "Absolutely. We often evolve existing brands while keeping the equity customers already recognise." },
    ],
    heroImage: null,
    seo: null,
  },
  {
    _id: "svc-web-design",
    title: "Web Design",
    slug: "web-design",
    icon: "monitor-smartphone",
    summary:
      "Fast, mobile-first websites that turn visitors into customers.",
    headline: "Websites built to perform — on every screen.",
    intro:
      "We design and build modern, SEO-friendly websites that load fast on Ugandan mobile networks and are easy for your team to update.",
    deliverables: [
      "Business & corporate websites",
      "Landing pages",
      "E-commerce stores",
      "Content management (CMS)",
      "Hosting, domains & email setup",
      "Maintenance & support",
    ],
    process: defaultProcess,
    faqs: [
      { question: "Will I be able to update the website myself?", answer: "Yes. We build on a content management system and train your team to edit pages, posts and images." },
      { question: "Do you handle hosting and domains?", answer: "We can register your .ug or .com domain, set up hosting and configure professional email." },
    ],
    heroImage: null,
    seo: null,
  },
  {
    _id: "svc-events",
    title: "Event Management",
    slug: "event-management",
    icon: "calendar-check",
    summary:
      "Launches, conferences and corporate events — planned, branded and run end-to-end.",
    headline: "Events that run smoothly and leave a lasting impression.",
    intro:
      "From concept to clean-up, we handle planning, branding, production and on-the-day coordination so you can focus on your guests.",
    deliverables: [
      "Corporate events & conferences",
      "Product launches & activations",
      "Event branding & stage design",
      "Vendor & venue coordination",
      "Exhibition & expo stands",
      "On-site management",
    ],
    process: defaultProcess,
    faqs: [
      { question: "How early should we book?", answer: "For large events, 6–8 weeks ahead is ideal. We can turn around smaller events faster." },
      { question: "Do you handle event branding too?", answer: "Yes — backdrops, banners, stage design, badges and merchandise are all produced in-house." },
    ],
    heroImage: null,
    seo: null,
  },
];

const svc = (slug: string) => {
  const s = services.find((x) => x.slug === slug)!;
  return { title: s.title, slug: s.slug };
};

export const projects: Project[] = [
  ["Nile Coffee Co. identity", "nile-coffee-identity", "Nile Coffee Co.", "2025", ["branding", "print"]],
  ["Kampala Fintech Summit", "kampala-fintech-summit", "KFS", "2025", ["event-management", "graphic-design"]],
  ["Pearl Realty website", "pearl-realty-website", "Pearl Realty", "2025", ["web-design"]],
  ["Ssese Water packaging", "ssese-water-packaging", "Ssese Water", "2024", ["print", "branding"]],
  ["Unity Bank campaign", "unity-bank-campaign", "Unity Bank", "2024", ["graphic-design", "print"]],
  ["Mbarara Agri Expo stand", "mbarara-agri-expo", "AgriLink UG", "2024", ["event-management", "print"]],
  ["Savanna Lodges rebrand", "savanna-lodges-rebrand", "Savanna Lodges", "2024", ["branding", "web-design"]],
  ["HealthPlus clinic signage", "healthplus-signage", "HealthPlus", "2023", ["print", "branding"]],
  ["Tech Hub UG social kit", "tech-hub-social-kit", "Tech Hub UG", "2023", ["graphic-design"]],
].map(([title, slug, client, year, svcs], i) => ({
  _id: `prj-${i}`,
  title: title as string,
  slug: slug as string,
  client: client as string,
  year: year as string,
  cover: null,
  services: (svcs as string[]).map(svc),
  excerpt: `A ${(svcs as string[]).map((s) => svc(s).title.toLowerCase()).join(" and ")} project for ${client}.`,
  challenge:
    "The client needed a cohesive look that would stand out in a crowded market and work consistently across every touchpoint.",
  solution:
    "We ran discovery workshops, developed a visual direction and rolled it out across digital and print with tight quality control.",
  result:
    "A confident, consistent presence that customers recognise — delivered on time and on budget.",
  gallery: [],
  seo: null,
}));

export const categories: Category[] = [
  { title: "Branding", slug: "branding" },
  { title: "Print", slug: "print" },
  { title: "Web", slug: "web" },
  { title: "Events", slug: "events" },
];

export const posts: Post[] = [
  {
    _id: "post-1",
    title: "5 signs your brand needs a refresh",
    slug: "signs-your-brand-needs-a-refresh",
    excerpt: "Outdated logos and inconsistent colours quietly cost you customers. Here's how to tell it's time.",
    publishedAt: "2026-09-12",
    cover: null,
    category: categories[0],
    author: { name: "Citrix Team" },
    readingMinutes: 4,
    paragraphs: [
      "Your brand is often the first impression customers have of your business. Over time, markets shift and what once felt fresh can start to feel dated.",
      "If your logo looks different on your signage, social media and business cards, customers notice — even subconsciously. Consistency builds trust.",
      "A refresh doesn't have to mean starting over. Often, refining typography, colour and layout is enough to bring a brand back to life.",
    ],
    seo: null,
  },
  {
    _id: "post-2",
    title: "Preparing print-ready files: a quick checklist",
    slug: "print-ready-files-checklist",
    excerpt: "Bleed, resolution, colour mode — get these right and your print job will come out exactly as planned.",
    publishedAt: "2026-08-28",
    cover: null,
    category: categories[1],
    author: { name: "Citrix Team" },
    readingMinutes: 3,
    paragraphs: [
      "Set up your document at the final trim size with 3mm bleed on all sides, and keep important text at least 5mm inside the trim.",
      "Use CMYK colour mode and images at 300dpi at their placed size. Low-resolution images that look fine on screen will look blurry in print.",
      "Export as a PDF/X with fonts embedded. When in doubt, send us the file — we check every job before it goes to press.",
    ],
    seo: null,
  },
  {
    _id: "post-3",
    title: "Why mobile speed matters for Ugandan websites",
    slug: "mobile-speed-ugandan-websites",
    excerpt: "Most of your visitors are on mobile data. A slow website is a lost customer.",
    publishedAt: "2026-08-03",
    cover: null,
    category: categories[2],
    author: { name: "Citrix Team" },
    readingMinutes: 5,
    paragraphs: [
      "The majority of web traffic in Uganda comes from mobile devices, often on 3G or 4G connections with data costs top of mind.",
      "Heavy images, unoptimised code and too many scripts all add up. Every extra second of load time increases the chance a visitor leaves.",
      "Modern frameworks, optimised images and good hosting make a dramatic difference — and help your SEO too.",
    ],
    seo: null,
  },
  {
    _id: "post-4",
    title: "Planning a product launch event that people remember",
    slug: "product-launch-event-planning",
    excerpt: "From venue to stage design to follow-up — the essentials of a launch that gets talked about.",
    publishedAt: "2026-07-15",
    cover: null,
    category: categories[3],
    author: { name: "Citrix Team" },
    readingMinutes: 6,
    paragraphs: [
      "Start with the story you want guests to leave with, then design every element — invitations, stage, signage — around it.",
      "Book the venue and key vendors early, and build a run-of-show that accounts for every minute of the day.",
      "Finally, plan the follow-up: photos, social content and thank-you messages keep the momentum going after the lights go down.",
    ],
    seo: null,
  },
];

export const testimonials: Testimonial[] = [
  { _id: "t1", quote: "Citrix took our brand from forgettable to unmistakable. The new identity and print collateral have transformed how customers see us.", name: "Grace N.", role: "Marketing Lead", company: "Nile Coffee Co." },
  { _id: "t2", quote: "They managed our 600-guest summit end-to-end — branding, stage, logistics. Flawless execution and a pleasure to work with.", name: "Daniel K.", role: "Operations Director", company: "Kampala Fintech Summit" },
  { _id: "t3", quote: "Our new website is fast, beautiful and we can update it ourselves. Enquiries doubled in the first quarter.", name: "Sarah A.", role: "Managing Director", company: "Pearl Realty" },
];

export const team: TeamMember[] = [
  { _id: "m1", name: "Team Member", role: "Founder & Creative Director", photo: null },
  { _id: "m2", name: "Team Member", role: "Head of Print Production", photo: null },
  { _id: "m3", name: "Team Member", role: "Lead Web Developer", photo: null },
  { _id: "m4", name: "Team Member", role: "Events Manager", photo: null },
];
