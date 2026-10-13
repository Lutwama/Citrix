// Placeholder content used when Sanity isn't configured (no
// NEXT_PUBLIC_SANITY_PROJECT_ID). Replace by publishing real content in /studio.
import type {
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
  phone: "+256 708 985 056",
  whatsapp: "256785615450",
  email: "citrixsolutionsltd2025@gmail.com",
  address: "Blue Heights Building, Level 6, Room J506, Nkrumah Road",
  city: "Kampala, Uganda",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Blue%20Heights%20Building%2C%20Nkrumah%20Road%2C%20Kampala&output=embed",
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

// SAMPLE PROJECTS — they show how the portfolio looks and are labelled
// "Sample" on the site. Replace each with a real project (real client, story
// and photos) and delete the `sample: true` line, or publish real projects in
// /studio, which replaces this list entirely.
type SampleProject = Omit<Project, "_id" | "services" | "cover" | "gallery" | "seo" | "sample"> & { services: string[] };

const sampleProjects: SampleProject[] = [
  {
    title: "Coffee roaster brand identity",
    slug: "coffee-roaster-identity",
    client: "Specialty coffee roaster",
    industry: "Food & beverage",
    location: "Kampala",
    year: "2025",
    duration: "5 weeks",
    art: "cards",
    galleryArt: ["cards", "packaging", "signage"],
    services: ["branding", "print"],
    excerpt: "A full identity for a Ugandan coffee roaster preparing to sell in supermarkets and cafés.",
    challenge:
      "The roaster had great coffee but a home-made logo that looked out of place next to imported brands on supermarket shelves.",
    solution:
      "We ran a discovery session, built an identity around the coffee's origin, and rolled it out across bags, business cards, stationery and the café sign.",
    result:
      "A premium, consistent look across packaging, print and signage that gave the client the confidence to pitch to retail buyers.",
    deliverables: ["Logo and identity system", "Brand guidelines", "Coffee bag labels", "Business cards and stationery", "Café signage"],
    products: ["logo-design", "brand-guidelines", "stickers-labels", "business-cards", "signage"],
    testimonial: null,
  },
  {
    title: "Fintech conference",
    slug: "fintech-conference",
    client: "Fintech industry association",
    industry: "Banking & finance",
    location: "Kampala",
    year: "2025",
    duration: "8 weeks",
    art: "event",
    galleryArt: ["event", "stand", "social"],
    services: ["event-management", "graphic-design"],
    excerpt: "Planning, branding and on-the-day management for a two-day conference with exhibitors and speakers.",
    challenge:
      "A first-time conference needed to look established, run smoothly for hundreds of delegates, and give sponsors visible returns.",
    solution:
      "We managed venue and vendors, designed the event identity, produced the stage, backdrops and exhibitor booths, and ran registration on the day.",
    result:
      "A professionally run event with consistent branding from the invitations to the stage, and sponsors placed where delegates could see them.",
    deliverables: ["Event identity", "Stage and backdrop", "Exhibition booths", "Delegate kits and badges", "Social media campaign"],
    products: ["corporate-events-conferences", "event-branding-backdrops", "exhibition-stands", "conference-kits", "social-media-design"],
    testimonial: null,
  },
  {
    title: "Real-estate agency website",
    slug: "real-estate-website",
    client: "Real-estate agency",
    industry: "Real estate",
    location: "Kampala",
    year: "2025",
    duration: "4 weeks",
    art: "web",
    galleryArt: ["web", "social", "campaign"],
    services: ["web-design"],
    excerpt: "A fast, mobile-first property website where buyers can browse listings and enquire on WhatsApp.",
    challenge:
      "Listings were only shared in WhatsApp groups, so the agency had no searchable place to send buyers and no way to look established online.",
    solution:
      "We designed and built a listings website the team can update themselves, with WhatsApp enquiry buttons on every property and a light design that loads fast on mobile data.",
    result:
      "A professional online home for the agency's listings that the team updates without a developer.",
    deliverables: ["Website design and build", "Property listings editor", "WhatsApp enquiry buttons", "Domain, hosting and email"],
    products: ["business-website", "hosting-domain-email", "website-maintenance"],
    testimonial: null,
  },
  {
    title: "Bottled-water packaging",
    slug: "bottled-water-packaging",
    client: "Bottled-water brand",
    industry: "FMCG",
    location: "Wakiso",
    year: "2024",
    duration: "3 weeks",
    art: "packaging",
    galleryArt: ["packaging", "campaign", "cards"],
    services: ["print", "branding"],
    excerpt: "New labels and cartons for a water brand expanding into supermarkets.",
    challenge:
      "The old labels peeled when wet and looked inconsistent across bottle sizes, which made the product look cheaper than it was.",
    solution:
      "We redesigned the label system for every bottle size and printed it on waterproof vinyl, with matching cartons and point-of-sale posters.",
    result:
      "Labels that stay sharp in the cold chain and a consistent family look across the whole range.",
    deliverables: ["Label design for 4 bottle sizes", "Waterproof label printing", "Printed cartons", "Point-of-sale posters"],
    products: ["stickers-labels", "packaging-boxes", "poster-flyer-design"],
    testimonial: null,
  },
  {
    title: "Savings account campaign",
    slug: "savings-campaign",
    client: "Commercial bank",
    industry: "Banking & finance",
    location: "Countrywide",
    year: "2024",
    duration: "6 weeks",
    art: "campaign",
    galleryArt: ["campaign", "social", "cards"],
    services: ["graphic-design", "print"],
    excerpt: "Campaign artwork and print for a savings product, from billboards to branch flyers.",
    challenge:
      "The bank needed one campaign look that worked on billboards, in branches and on social media, delivered to branches across the country at the same time.",
    solution:
      "We created the campaign artwork, adapted it to every format, and printed and delivered branch kits with flyers, pull-ups and posters.",
    result:
      "One consistent campaign across billboards, branches and social media, launched on the same day nationwide.",
    deliverables: ["Campaign concept and artwork", "Billboard skins", "Branch pull-ups and posters", "Flyers", "Social media adverts"],
    products: ["poster-flyer-design", "banners-billboards", "pull-up-banners", "flyers-brochures", "social-media-design"],
    testimonial: null,
  },
  {
    title: "Agricultural expo stand",
    slug: "agri-expo-stand",
    client: "Agricultural supplier",
    industry: "Agriculture",
    location: "Mbarara",
    year: "2024",
    duration: "2 weeks",
    art: "stand",
    galleryArt: ["stand", "event", "campaign"],
    services: ["event-management", "print"],
    excerpt: "A custom exhibition stand and giveaways for a regional agricultural show.",
    challenge:
      "The client was exhibiting upcountry for the first time and needed a stand that drew farmers in and could be reused at future shows.",
    solution:
      "We designed a modular stand with a branded counter and product displays, printed the graphics, and transported, built and dismantled it on site.",
    result:
      "A reusable stand the client can rebrand for future shows, plus branded giveaways for visitors.",
    deliverables: ["3D stand design", "Modular stand build", "Printed graphics", "Branded giveaways", "Set-up and dismantling"],
    products: ["exhibition-stands", "promotional-items", "pull-up-banners"],
    testimonial: null,
  },
  {
    title: "Safari lodge rebrand",
    slug: "safari-lodge-rebrand",
    client: "Safari lodge group",
    industry: "Hospitality & tourism",
    location: "Western Uganda",
    year: "2024",
    duration: "7 weeks",
    art: "signage",
    galleryArt: ["signage", "web", "cards"],
    services: ["branding", "web-design"],
    excerpt: "A refreshed identity and booking-ready website for a group of lodges.",
    challenge:
      "Each lodge had grown its own look, so international visitors couldn't tell they belonged to one group, and the old website didn't work on phones.",
    solution:
      "We brought the lodges under one refreshed identity, updated the signage and printed materials, and built a mobile-friendly website with enquiry forms.",
    result:
      "A single, recognisable brand across all lodges and a website that works for travellers on any device.",
    deliverables: ["Brand refresh", "Lodge signage", "Menus and printed materials", "Website redesign"],
    products: ["rebranding", "signage", "menu-invitation-certificate-design", "website-redesign"],
    testimonial: null,
  },
  {
    title: "Clinic signage and wayfinding",
    slug: "clinic-signage",
    client: "Private clinic",
    industry: "Health",
    location: "Kampala",
    year: "2023",
    duration: "3 weeks",
    art: "signage",
    galleryArt: ["signage", "cards", "campaign"],
    services: ["print", "branding"],
    excerpt: "Outdoor signage, indoor wayfinding and office branding for a new clinic.",
    challenge:
      "Patients struggled to find the clinic from the road and then to find departments inside the building.",
    solution:
      "We installed an illuminated 3D sign facing the road, directional signs for every department, and frosted-glass branding for consultation rooms.",
    result:
      "A clinic that is easy to find day and night, and a calm, professional interior for patients.",
    deliverables: ["Illuminated 3D sign", "Wayfinding signs", "Frosted-glass branding", "Staff ID cards"],
    products: ["signage", "office-branding", "business-cards"],
    testimonial: null,
  },
  {
    title: "Innovation hub social media kit",
    slug: "innovation-hub-social-kit",
    client: "Tech innovation hub",
    industry: "Technology",
    location: "Kampala",
    year: "2023",
    duration: "2 weeks",
    art: "social",
    galleryArt: ["social", "event", "web"],
    services: ["graphic-design"],
    excerpt: "Reusable social media templates so the hub's team can post on-brand every week.",
    challenge:
      "The hub posted almost daily, but every post looked different and the team had no designer to keep it consistent.",
    solution:
      "We designed a set of editable templates for events, announcements and success stories, and trained the team to use them.",
    result:
      "A consistent feed the team produces in-house in minutes, without waiting for a designer.",
    deliverables: ["Social media template kit", "Event and announcement posts", "Team training session"],
    products: ["social-media-design", "presentation-pitch-deck-design"],
    testimonial: null,
  },
];

export const projects: Project[] = sampleProjects.map(({ services: svcs, ...p }, i) => ({
  ...p,
  _id: `prj-${i}`,
  sample: true,
  cover: null,
  services: svcs.map(svc),
  gallery: [],
  seo: null,
}));

// Insights articles live in ./posts.ts.
export { categories, posts } from "./posts";

// Real client quotes only. Testimonial sections stay hidden while this is empty.
// Ask the client's permission first, e.g.:
//   { _id: "t1", quote: "…", name: "Grace N.", role: "Marketing Lead", company: "Client company" },
export const testimonials: Testimonial[] = [];

export const team: TeamMember[] = [
  { _id: "m1", name: "Team Member", role: "Founder & Creative Director", photo: null },
  { _id: "m2", name: "Team Member", role: "Head of Print Production", photo: null },
  { _id: "m3", name: "Team Member", role: "Lead Web Developer", photo: null },
  { _id: "m4", name: "Team Member", role: "Events Manager", photo: null },
];
