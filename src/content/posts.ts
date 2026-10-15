// Insights articles used when Sanity isn't configured. Each article is a list
// of blocks: "h2" headings (these build the table of contents), "p"
// paragraphs, "list", "checklist", "tip" boxes and "figure" illustrations.
// `products` links product pages at the end of the article.
import type { ArticleBlock, Category, Post } from "@/lib/types";

export const categories: Category[] = [
  { title: "Print", slug: "print" },
  { title: "Branding", slug: "branding" },
  { title: "Design", slug: "design" },
  { title: "Fabrication", slug: "fabrication" },
  { title: "Web", slug: "web" },
  { title: "Events", slug: "events" },
];

const cat = (slug: string) => categories.find((c) => c.slug === slug)!;

function readingMinutes(blocks: ArticleBlock[]) {
  const text = blocks.map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.caption)).join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

type Draft = Omit<Post, "_id" | "cover" | "seo" | "readingMinutes" | "category" | "author"> & {
  category: string;
  content: ArticleBlock[];
};

const drafts: Draft[] = [
  {
    title: "Shop signs in Kampala: a buyer's guide to 3D letters, light boxes and pylons",
    slug: "shop-signs-buyers-guide",
    excerpt:
      "Which sign suits your building, what drives the price, and the permit, power and warranty questions to ask before you pay a deposit.",
    publishedAt: "2026-10-15",
    category: "fabrication",
    art: "signage",
    products: ["3d-channel-letters", "light-boxes", "pylon-totem-signs", "shopfronts-acp-cladding"],
    content: [
      {
        type: "p",
        text: "Your sign works for you 24 hours a day. It tells people you exist, where to find you and what kind of business you are, often before they've seen anything else. But two signs that look similar in a quote can be very different after a year of Kampala sun and rain. This guide explains the main types, what changes the price and what to check before you commit.",
      },
      { type: "h2", text: "The main types of sign" },
      {
        type: "list",
        items: [
          "3D letters: individual raised letters and logos fixed to the wall. Lit from the front, from behind (a 'halo' glow) or unlit. The most premium look for shop fronts and receptions.",
          "Light boxes: a frame with lights inside and a printed face. Bright and even at night, and the face can be swapped when you rebrand or run a promotion.",
          "Pylons and totems: free-standing towers that can be seen from the road. Ideal for petrol stations, malls, schools and factories, and they can carry several tenants or a price board.",
          "Shop fronts and cladding: the whole façade in aluminium composite panel (ACP) in your colours, with letters or light boxes built in.",
          "Plaques and wayfinding: engraved plaques, door signs and directional signs that guide visitors once they arrive.",
        ],
      },
      {
        type: "figure",
        art: "signage",
        caption: "3D halo-lit letters on an ACP fascia, with a projecting light box for passers-by on the pavement.",
      },
      { type: "h2", text: "Match the sign to the job" },
      {
        type: "p",
        text: "Start with who needs to see it and from where. A pharmacy on a busy road needs something readable from a moving taxi at night, which usually means a light box or lit letters. A law firm on the fourth floor of an office block needs a clean reception sign more than a roadside one. A mall or estate with several tenants is a good fit for a shared pylon at the entrance.",
      },
      { type: "h2", text: "What drives the price" },
      {
        type: "list",
        items: [
          "Size: letter height and the number of letters, or the width and height of the box or panel.",
          "Material: acrylic and ACP cost less than stainless steel or brass.",
          "Lighting: lit signs need LEDs, a power supply and wiring, and the quality of those parts makes a big difference.",
          "Structure: pylons and roof-top signs need a steel frame, foundations and sometimes engineering drawings.",
          "Installation height: above about 4 metres you need scaffolding or a lift.",
          "Approvals: large and outdoor signs may need a KCCA or municipal permit.",
        ],
      },
      {
        type: "tip",
        title: "Compare like with like",
        text: "When two quotes are far apart, ask each supplier to list the material, LED brand, power supply rating and what installation includes. The cheapest quote often leaves something out.",
      },
      { type: "h2", text: "Built for Kampala weather" },
      {
        type: "p",
        text: "Heavy rain and strong sun are hard on signs. For anything outdoors, ask for weatherproof LED modules and a sealed power supply rated IP67, which is protected against dust and water. Good signs also have drainage and sealed joints so water can't collect inside, and UV-resistant print and paint so colours don't fade within a year.",
      },
      { type: "h2", text: "Permits and landlords" },
      {
        type: "p",
        text: "Large signs, pylons and anything that hangs over a road or pavement usually need approval from KCCA or your municipal authority, and most landlords have their own rules about size and placement. Skipping approval can mean a fine or being told to take the sign down, so ask your supplier to prepare the drawings and paperwork and include any fees in the quote.",
      },
      { type: "h2", text: "Warranty and maintenance" },
      {
        type: "p",
        text: "Ask for a written warranty that covers workmanship, the LEDs and the power supply, and check how long it lasts. A simple maintenance plan for cleaning and replacing failed LEDs keeps the sign looking new. A timer or dusk-to-dawn sensor switches the lights on automatically and saves power.",
      },
      {
        type: "checklist",
        title: "Send this with your quote request",
        items: [
          "A photo of the wall or site, taken from the street",
          "Rough size, or the space available",
          "What it will be mounted on: block wall, glass, ACP or ground",
          "Whether you want it lit, and if power is nearby",
          "Your logo as a vector file (AI, SVG or PDF)",
          "Your deadline, such as an opening date",
        ],
      },
      {
        type: "tip",
        title: "Ask for a mock-up first",
        text: "A good supplier will show your sign on a photo of your actual building before anything is made, so you can check the size and colours and avoid surprises.",
      },
    ],
  },
  {
    title: "Acrylic, ACP, stainless steel or brass? Choosing sign materials",
    slug: "sign-materials-compared",
    excerpt: "How the most common sign materials compare on look, durability and cost, and where each one works best.",
    publishedAt: "2026-10-14",
    category: "fabrication",
    art: "stand",
    products: ["3d-channel-letters", "plaques-engraving", "wayfinding-systems", "kiosks-display-units"],
    content: [
      {
        type: "p",
        text: "The material you choose decides how a sign looks, how long it lasts and much of what it costs. Here's a plain-language comparison of the materials we work with most, so you can brief your supplier with confidence.",
      },
      { type: "h2", text: "Acrylic" },
      {
        type: "p",
        text: "Acrylic (Perspex) is a rigid plastic that can be clear, coloured, frosted or mirrored, and lets light through, which makes it the most common choice for lit letters and light box faces. It's affordable and looks crisp indoors and out.",
      },
      {
        type: "list",
        items: [
          "Best for: lit letters, light box faces, reception signs, display stands",
          "Watch out for: cheaper grades can yellow or crack in strong sun",
        ],
      },
      { type: "h2", text: "Aluminium composite panel (ACP)" },
      {
        type: "p",
        text: "ACP is two thin aluminium sheets with a solid core. It's light, flat and weatherproof, comes in many colours and finishes, and is the standard for shop fronts, fascias, pylon cladding and flat cut-out signs.",
      },
      {
        type: "list",
        items: [
          "Best for: façades, fascias, pylons, large outdoor panels",
          "Watch out for: use fire-rated panels on building façades",
        ],
      },
      { type: "h2", text: "Stainless steel" },
      {
        type: "p",
        text: "Brushed or mirror-polished stainless steel gives a premium, corporate look and won't rust. It's popular for reception letters, building names and halo-lit letters for banks, hotels and offices.",
      },
      {
        type: "list",
        items: [
          "Best for: premium letters, building identity, long-life outdoor signs",
          "Watch out for: costs more and takes longer to fabricate",
        ],
      },
      { type: "h2", text: "Brass" },
      {
        type: "p",
        text: "Brass has a warm, traditional look that suits commissioning plaques, law and medical practices and heritage buildings. It's engraved or etched, and lacquered so it keeps its shine.",
      },
      {
        type: "list",
        items: [
          "Best for: commissioning plaques, door plates, premium name signs",
          "Watch out for: unlacquered brass darkens over time",
        ],
      },
      { type: "h2", text: "PVC foam board and printed vinyl" },
      {
        type: "p",
        text: "PVC foam board and printed vinyl are the budget options. They're great for indoor signs, temporary promotions and safety signs, but they won't match metal or acrylic for durability outdoors.",
      },
      {
        type: "figure",
        art: "stand",
        caption: "Mixing materials: an ACP back wall, acrylic logo and stainless steel letters on one display.",
      },
      {
        type: "checklist",
        title: "Quick guide",
        items: [
          "Outdoor and lit: acrylic faces on aluminium returns",
          "Whole façade: ACP cladding",
          "Premium reception: brushed stainless steel or brass",
          "Official opening: engraved brass or granite plaque",
          "Short-term or indoor: PVC board or vinyl",
        ],
      },
      {
        type: "tip",
        title: "Not sure which to choose?",
        text: "Tell us where the sign will go, how long it needs to last and your budget, and we'll recommend a material and show you samples before you decide.",
      },
    ],
  },
  {
    title: "Product labels and packaging in Uganda: what to print and what UNBS expects",
    slug: "product-labels-packaging-uganda",
    excerpt:
      "The information your label must carry, choosing label and box materials, and how to plan print runs for a growing product.",
    publishedAt: "2026-10-13",
    category: "print",
    art: "packaging",
    products: ["stickers-labels", "packaging-boxes", "brand-identity-package"],
    content: [
      {
        type: "p",
        text: "Your label is your product's salesperson on the shelf, and in Uganda it's also a legal document. A good label helps buyers choose you over the next brand and gives supermarkets and regulators the information they need. Here's what to put on it, what to print it on and how to order sensibly.",
      },
      { type: "h2", text: "What the label must say" },
      {
        type: "p",
        text: "Uganda's labelling standards (US EAS 38 for pre-packaged food and US 1028 for other pre-packaged goods) set out the basics. Requirements change and some products have extra rules, so always confirm the current version with UNBS before you print.",
      },
      {
        type: "checklist",
        title: "Typical label information for packaged food",
        items: [
          "Product name",
          "Ingredients, in order of weight",
          "Net contents (g, kg, ml or l)",
          "Manufacturer or distributor name and address",
          "Country of origin",
          "Batch or lot number",
          "Date marking, such as best before or expiry",
          "Storage and usage instructions",
          "Text in English (other official languages can be added)",
        ],
      },
      { type: "h2", text: "The UNBS mark" },
      {
        type: "p",
        text: "Products covered by compulsory standards, including food and cosmetics, must be certified by UNBS before sale, and certified products carry the UNBS Distinctive Mark. Only licensed businesses may print the mark, so add it to your artwork once your certification is approved, not before.",
      },
      {
        type: "tip",
        title: "Leave space in the design",
        text: "Plan an area for batch numbers and dates that change with every production run. They can be added with a stamp, a small printer or a sticker, so you don't need to reprint the whole label.",
      },
      { type: "h2", text: "Choosing label materials" },
      {
        type: "list",
        items: [
          "Paper labels: affordable and good for dry products like flour, tea and coffee.",
          "Vinyl or synthetic labels: waterproof and oil-resistant, so the right choice for drinks, juices, cosmetics and anything kept in a fridge.",
          "Clear labels: give a 'no label' look on glass and clear bottles.",
          "Finishes: matt or gloss lamination protects the print, and foil or spot UV adds a premium touch.",
        ],
      },
      {
        type: "figure",
        art: "packaging",
        caption: "A bottle label, product box and shipping carton designed as one family.",
      },
      { type: "h2", text: "Boxes and outer packaging" },
      {
        type: "p",
        text: "Printed boxes protect the product and make it look ready for supermarket shelves and gift shops. Agree the exact size by testing with a real sample of your product, and ask for a plain or printed prototype before the full run.",
      },
      { type: "h2", text: "Plan your print runs" },
      {
        type: "p",
        text: "Digital printing suits small runs and new products, because you can test the market and fix mistakes cheaply. Once your label is settled and volumes grow, larger runs cost less per label. Keep the design consistent across sizes and flavours so your range is recognisable on the shelf.",
      },
      {
        type: "tip",
        title: "Get one design for the whole range",
        text: "Design a label system once, with a fixed layout and a colour for each flavour or size. Adding a new product then only means changing the text and colour, not starting again.",
      },
    ],
  },
  {
    title: "How a brand identity project works, and what to ask before you hire",
    slug: "brand-identity-process",
    excerpt:
      "The steps from first meeting to final files, how long each takes, and the questions that protect you when choosing a designer.",
    publishedAt: "2026-10-12",
    category: "branding",
    art: "cards",
    products: ["brand-identity-package", "logo-design", "brand-guidelines", "rebranding"],
    content: [
      {
        type: "p",
        text: "A new brand is one of the biggest marketing investments a business makes, and it will be on every sign, invoice and post for years. Knowing how the process works helps you plan the time, give useful feedback and avoid paying twice.",
      },
      { type: "h2", text: "Step 1: The brief" },
      {
        type: "p",
        text: "Good branding starts with questions, not sketches. Expect to talk about what you sell, who buys it, why they choose you, who your competitors are and where the brand will appear, from WhatsApp profile pictures to shop signs.",
      },
      { type: "h2", text: "Step 2: Research and direction" },
      {
        type: "p",
        text: "The designer looks at your market and competitors and proposes a direction: the personality, colours and style that will set you apart. Agreeing this first saves time, because concepts are judged against a shared goal rather than personal taste.",
      },
      { type: "h2", text: "Step 3: Concepts and revisions" },
      {
        type: "p",
        text: "You'll usually see two or three logo concepts shown on real items such as a business card, a sign and a social post. Choose one direction, then refine it over a set number of revision rounds.",
      },
      {
        type: "tip",
        title: "Give feedback that helps",
        text: "Instead of 'I don't like it', explain what isn't working: 'it feels too playful for a law firm' or 'it's hard to read on a small sign'. Gather the decision-makers' views first so the designer gets one clear set of comments.",
      },
      { type: "h2", text: "Step 4: Final files and guidelines" },
      {
        type: "list",
        items: [
          "Logo versions: full colour, one colour, white and an icon",
          "File formats for print, signs and the web (AI, SVG, PDF and PNG)",
          "Colour codes for print and screens",
          "Fonts and typography rules",
          "Brand guidelines that show how to use it all",
        ],
      },
      {
        type: "figure",
        art: "cards",
        caption: "Final identity shown across stationery, so you can see it working before it's printed.",
      },
      { type: "h2", text: "Step 5: Roll-out" },
      {
        type: "p",
        text: "A brand only works once people see it. Plan the roll-out across business cards, signage, vehicles, uniforms, packaging and your website so the change happens at once rather than piece by piece.",
      },
      {
        type: "checklist",
        title: "Ask before you hire",
        items: [
          "Can I see logo and identity work, not only printing?",
          "How many concepts and revision rounds are included?",
          "Are brand guidelines part of the price?",
          "Will I own the final files and all rights?",
          "Which file formats will I receive?",
          "How long will it take, and what do you need from me?",
        ],
      },
    ],
  },
  {
    title: "Social media design for Ugandan businesses: sizes, packages and a monthly plan",
    slug: "social-media-design-guide",
    excerpt:
      "The right image sizes for each platform, what a monthly design package should include, and how to plan a month of posts.",
    publishedAt: "2026-10-11",
    category: "design",
    art: "social",
    products: ["social-media-design", "poster-flyer-design", "presentation-pitch-deck-design"],
    content: [
      {
        type: "p",
        text: "Your customers see your posts on Facebook, Instagram, TikTok, LinkedIn and WhatsApp status long before they visit your office. Consistent, well-designed posts make a small business look established. Here's how to set it up so it doesn't eat your week.",
      },
      { type: "h2", text: "Get the sizes right" },
      {
        type: "list",
        items: [
          "Square post (1080 × 1080px): works on every feed",
          "Portrait post (1080 × 1350px): takes up more of the screen on Instagram and Facebook",
          "Story, status and reel cover (1080 × 1920px): Instagram and Facebook stories, TikTok and WhatsApp status",
          "LinkedIn and X images (1200 × 627px): link previews and announcements",
          "Facebook cover (1640 × 624px): keep text away from the edges, which are cropped on phones",
        ],
      },
      {
        type: "tip",
        title: "Design once, resize for each platform",
        text: "Ask your designer to supply each post in square, portrait and story sizes. The same message then looks right everywhere, including WhatsApp status, which many Ugandan customers check daily.",
      },
      { type: "h2", text: "What a monthly package should include" },
      {
        type: "p",
        text: "Most businesses do best with a regular monthly package rather than one-off posts. A typical package covers 12 to 16 posts a month, captions, and a content calendar, with resized versions for stories. Video editing and animation are usually priced separately, so check what's included.",
      },
      {
        type: "figure",
        art: "social",
        caption: "A month of posts built from one template, so the feed looks consistent.",
      },
      { type: "h2", text: "Plan a month of posts" },
      {
        type: "list",
        items: [
          "Products and services: what you sell, prices and offers",
          "Proof: customer photos, reviews and finished projects",
          "Tips: short, useful advice that shows your expertise",
          "Behind the scenes: your team, workshop or office",
          "Dates: public holidays, school terms and seasonal sales",
        ],
      },
      { type: "h2", text: "Keep it on brand" },
      {
        type: "p",
        text: "Use the same fonts, colours and logo position on every post. A set of templates makes your feed recognisable at a glance and lets your team add quick posts without breaking the look.",
      },
      {
        type: "checklist",
        title: "Every post should have",
        items: [
          "Your logo, small and in the same place",
          "One clear message",
          "Text large enough to read on a phone",
          "A call to action: call, WhatsApp, visit or order",
          "Your phone number or WhatsApp in the caption",
        ],
      },
    ],
  },
  {
    title: "Taking payments on your website: mobile money, cards and what to set up",
    slug: "website-payments-mobile-money",
    excerpt:
      "How Ugandan customers prefer to pay online, the options for accepting MTN MoMo, Airtel Money and cards, and what to check before you sign up.",
    publishedAt: "2026-10-10",
    category: "web",
    art: "web",
    products: ["ecommerce-website", "business-website", "hosting-domain-email"],
    content: [
      {
        type: "p",
        text: "Customers who can pay on your website are far more likely to buy there and then. In Uganda that mostly means mobile money, so a checkout built only for cards will lose sales. Here's how to set it up properly.",
      },
      { type: "h2", text: "Mobile money comes first" },
      {
        type: "p",
        text: "MTN MoMo and Airtel Money are how most Ugandans pay online, from school fees to online shopping. Cards (Visa and Mastercard) are useful for corporate buyers, diaspora customers and visitors, but they should sit alongside mobile money, not replace it.",
      },
      { type: "h2", text: "Your options" },
      {
        type: "list",
        items: [
          "Payment gateway: a provider such as Pesapal or Flutterwave connects your website to MTN, Airtel and cards through one integration. This is the right choice for most online shops.",
          "Merchant pay codes: customers pay a till number and send proof, and you confirm the order manually. Cheap to start, but slow once orders grow.",
          "Order on WhatsApp: the website lists products and sends the order to WhatsApp, where you agree payment. A good first step for small catalogues.",
        ],
      },
      {
        type: "figure",
        art: "web",
        caption: "A mobile checkout with MTN MoMo and Airtel Money shown first, and cards as an option.",
      },
      { type: "h2", text: "What to check before you sign up" },
      {
        type: "checklist",
        title: "Questions for any payment provider",
        items: [
          "Is the provider licensed by the Bank of Uganda?",
          "Which methods are supported: MTN, Airtel, cards, bank?",
          "What is the fee per transaction?",
          "How quickly does money reach your account?",
          "How are refunds and failed payments handled?",
          "Does it work smoothly on a phone?",
        ],
      },
      { type: "h2", text: "Design a checkout that converts" },
      {
        type: "p",
        text: "Keep the checkout short: phone number, delivery details and payment. Show the mobile money options first, confirm the total including delivery before payment, and send an SMS or WhatsApp confirmation once payment is received.",
      },
      { type: "h2", text: "Domain, security and trust" },
      {
        type: "p",
        text: "A website that takes payments needs an SSL certificate (the padlock in the browser), and a professional domain such as .ug, .co.ug or .com builds trust. Show your phone number, physical address and returns policy clearly, because buyers check these before paying a business they don't know.",
      },
      {
        type: "tip",
        title: "Start simple, then grow",
        text: "If you're just starting, WhatsApp ordering with a clear product catalogue can prove demand. Move to a full checkout with a payment gateway once orders are coming in regularly.",
      },
    ],
  },
  {
    title: "Planning a corporate conference in Kampala: a timeline that works",
    slug: "corporate-conference-planning-timeline",
    excerpt:
      "A week-by-week plan for conferences, AGMs and workshops, from budget and venue to badges, branding and the day itself.",
    publishedAt: "2026-10-09",
    category: "events",
    art: "event",
    products: ["corporate-events-conferences", "conference-kits", "event-branding-backdrops", "pull-up-banners"],
    content: [
      {
        type: "p",
        text: "Conferences, AGMs and stakeholder workshops are where organisations meet their partners, staff and the public in person. Most problems on the day, such as late branding, microphones that don't work and missing badges, come from planning too late. For corporate events, two to four months of preparation is usually enough.",
      },
      { type: "h2", text: "Three months before" },
      {
        type: "list",
        items: [
          "Agree the goal, audience and number of guests",
          "Set the budget, with about 10% kept back for surprises",
          "Book the venue and confirm capacity, parking and power backup",
          "Choose a theme and start the event branding",
        ],
      },
      { type: "h2", text: "Two months before" },
      {
        type: "list",
        items: [
          "Confirm speakers and the programme",
          "Book sound, stage, lighting and LED screens",
          "Open registration and collect delegate names",
          "Agree catering, including dietary needs",
        ],
      },
      { type: "h2", text: "One month before" },
      {
        type: "list",
        items: [
          "Approve the backdrop, banners and stage designs",
          "Order conference kits: badges, lanyards, notebooks and pens",
          "Prepare the run sheet: a minute-by-minute programme for every supplier",
          "Brief the photographer and anyone posting on social media",
        ],
      },
      {
        type: "figure",
        art: "event",
        caption: "Stage backdrop, side banners and screen designed together so the event looks like one brand.",
      },
      { type: "h2", text: "The week of the event" },
      {
        type: "checklist",
        title: "Final checks",
        items: [
          "Print badges from the final registration list",
          "Set up stage, backdrop and banners the day before",
          "Test sound, microphones, screens and presentations",
          "Prepare the registration desk and signage",
          "Share the run sheet and contacts with every supplier",
        ],
      },
      { type: "h2", text: "Choosing an event partner" },
      {
        type: "p",
        text: "One partner who coordinates the venue, technical suppliers, branding and on-site management saves you from chasing ten different vendors. Ask for examples of similar events, confirm the company is registered, and get a written quote that lists everything included.",
      },
      { type: "h2", text: "After the event" },
      {
        type: "p",
        text: "Send thank-you messages, share photos and a short summary on social media within 48 hours, and gather feedback while it's fresh. Keep reusable items such as pull-up banners and stands for your next event.",
      },
      {
        type: "tip",
        title: "Brand once, reuse often",
        text: "A modular backdrop and a set of pull-up banners in your corporate design can be reused at AGMs, trainings and launches, which lowers the cost of every event after the first.",
      },
    ],
  },
  {
    title: "Business cards in Kampala: a buyer's guide",
    slug: "business-cards-buyers-guide",
    excerpt:
      "Paper, finishes, quantities and design. What to decide before you order business cards, and what changes the price.",
    publishedAt: "2026-10-06",
    category: "print",
    art: "cards",
    products: ["business-cards", "logo-design", "flyers-brochures"],
    content: [
      {
        type: "p",
        text: "A business card is often the only thing a new contact keeps after meeting you. A thin, blurry card says the opposite of what you want, while a well-printed one quietly tells people you take your business seriously. Here's what to decide before you order.",
      },
      { type: "h2", text: "Choose the right card stock" },
      {
        type: "p",
        text: "Card thickness is measured in grams per square metre (gsm). The higher the number, the thicker and more premium the card feels.",
      },
      {
        type: "list",
        items: [
          "300gsm: a solid everyday card, good for large staff orders.",
          "350gsm: our standard. It feels substantial and doesn't bend in a wallet.",
          "400gsm and textured stocks: for a premium first impression, such as for directors, lawyers and luxury brands.",
        ],
      },
      { type: "h2", text: "Pick a finish" },
      {
        type: "p",
        text: "Lamination protects the card and changes how it looks and feels. Matt lamination is elegant and easy to write on. Gloss makes colours pop. Soft-touch has a velvety feel that people remember. Spot UV adds a raised, shiny layer to one element, usually the logo.",
      },
      {
        type: "figure",
        art: "cards",
        caption: "Double-sided cards with a matt finish and the logo highlighted in spot UV.",
      },
      { type: "h2", text: "Get the design details right" },
      {
        type: "checklist",
        title: "Before you approve the proof",
        items: [
          "Name, title, phone and email are spelled correctly",
          "Phone numbers use the +256 format",
          "WhatsApp number is included if customers use it",
          "Logo is a high-quality file, not a screenshot",
          "Text sits at least 5mm inside the edge",
          "A QR code links to your website or WhatsApp",
        ],
      },
      { type: "h2", text: "What affects the price" },
      {
        type: "p",
        text: "The main factors are quantity, card stock, printing on one or both sides, and special finishes such as spot UV, foil or rounded corners. Larger quantities lower the price per card, so ordering for your whole team at once usually saves money.",
      },
      {
        type: "tip",
        title: "Order for the whole team",
        text: "Send us a list of names and titles and we'll prepare one proof per person, so every card matches and you only pay set-up once.",
      },
    ],
  },
  {
    title: "Preparing print-ready files: a quick checklist",
    slug: "print-ready-files-checklist",
    excerpt: "Bleed, resolution, colour mode. Get these right and your print job will come out exactly as planned.",
    publishedAt: "2026-09-29",
    category: "print",
    art: "campaign",
    products: ["flyers-brochures", "banners-billboards", "company-profiles-booklets"],
    content: [
      {
        type: "p",
        text: "Most printing problems start before the file reaches the printer: text cut off at the edge, blurry photos or colours that look different from the screen. This checklist covers the essentials.",
      },
      { type: "h2", text: "Size and bleed" },
      {
        type: "p",
        text: "Set up your document at the final trim size and add 3mm of bleed on every side. Bleed is extra background that gets trimmed off, so there are no white edges after cutting. Keep important text and logos at least 5mm inside the trim line.",
      },
      { type: "h2", text: "Resolution" },
      {
        type: "p",
        text: "Photos should be 300dpi at the size they'll be printed. An image that looks sharp on a phone can look blurry on an A4 flyer. Large-format prints such as banners can use a lower resolution because people view them from further away.",
      },
      { type: "h2", text: "Colour mode" },
      {
        type: "p",
        text: "Screens use RGB colour; printers use CMYK. Bright screen colours, especially electric blues and greens, can look duller in print. Design in CMYK, or ask us for a printed proof when colour accuracy matters.",
      },
      {
        type: "checklist",
        title: "Print-ready checklist",
        items: [
          "Final trim size with 3mm bleed",
          "Text 5mm inside the trim",
          "Images at 300dpi",
          "CMYK colour mode",
          "Fonts embedded or converted to outlines",
          "Exported as a high-quality PDF",
        ],
      },
      {
        type: "tip",
        title: "Not sure your file is ready?",
        text: "Send it anyway. We check every file before printing and tell you if anything needs fixing.",
      },
    ],
  },
  {
    title: "Pull-up banner, PVC banner or backdrop: which do you need?",
    slug: "pull-up-vs-pvc-banner-vs-backdrop",
    excerpt: "Three of the most popular large-format prints, compared: where each works best and how long it lasts.",
    publishedAt: "2026-09-22",
    category: "print",
    art: "event",
    products: ["pull-up-banners", "banners-billboards", "event-branding-backdrops"],
    content: [
      {
        type: "p",
        text: "Pull-up banners, PVC banners and backdrops all put your brand in front of people at scale, but they suit different jobs. Choosing the wrong one usually means it looks out of place or doesn't last.",
      },
      { type: "h2", text: "Pull-up banners" },
      {
        type: "p",
        text: "A pull-up (roll-up) banner is a printed graphic that rolls into a portable stand. It sets up in under a minute and packs into a carry bag, which makes it ideal for receptions, exhibitions, church and school events, and roadshows.",
      },
      {
        type: "list",
        items: [
          "Best for: indoor events, offices and exhibitions",
          "Typical size: 85 × 200cm",
          "Reusable: yes, and you can replace the graphic later",
        ],
      },
      { type: "h2", text: "PVC banners" },
      {
        type: "p",
        text: "PVC (flex) banners are printed on weather-resistant material with hemmed edges and eyelets, so they can be tied to fences, walls and frames outdoors. They're the go-to for shop fronts, sales promotions and outdoor events.",
      },
      {
        type: "list",
        items: [
          "Best for: outdoor use and long-term display",
          "Size: any, priced per square metre",
          "Lasts: months outdoors with good installation",
        ],
      },
      { type: "h2", text: "Backdrops" },
      {
        type: "p",
        text: "A backdrop is a large printed wall behind a stage or photo area. Step-and-repeat backdrops, with your logo repeated in a pattern, make sure your brand appears in every photo taken at the event.",
      },
      {
        type: "figure",
        art: "event",
        caption: "A stage backdrop with pull-up banners on each side keeps the brand visible in every photo.",
      },
      {
        type: "tip",
        title: "Combine them",
        text: "For launches and conferences, a backdrop behind the stage plus two pull-ups at the entrance gives the strongest presence for the budget.",
      },
    ],
  },
  {
    title: "5 signs your brand needs a refresh",
    slug: "signs-your-brand-needs-a-refresh",
    excerpt: "Outdated logos and inconsistent colours quietly cost you customers. Here's how to tell it's time.",
    publishedAt: "2026-09-15",
    category: "branding",
    art: "signage",
    products: ["rebranding", "brand-guidelines", "logo-design"],
    content: [
      {
        type: "p",
        text: "Your brand is often the first impression customers have of your business. Markets shift, competitors improve, and a look that once felt fresh can start to feel dated. These five signs suggest it's time for a refresh.",
      },
      { type: "h2", text: "1. Your logo looks different everywhere" },
      {
        type: "p",
        text: "If your signage, social media and business cards all show slightly different versions of your logo, customers notice, even if they can't say why. Consistency builds trust.",
      },
      { type: "h2", text: "2. You're embarrassed to hand over your business card" },
      {
        type: "p",
        text: "If you apologise for your materials, or avoid giving them out, your brand is holding you back.",
      },
      { type: "h2", text: "3. Your business has grown but your brand hasn't" },
      {
        type: "p",
        text: "Perhaps you started as a one-person shop and now serve corporates, or added new services. Your brand should reflect who you are today.",
      },
      { type: "h2", text: "4. You can't find your logo files" },
      {
        type: "p",
        text: "If every printer asks for a better logo file and you only have a blurry JPEG, you need a proper set of brand files.",
      },
      { type: "h2", text: "5. Competitors look more professional" },
      {
        type: "p",
        text: "When customers compare you side by side, a dated look can lose the sale before they hear your price.",
      },
      {
        type: "tip",
        title: "A refresh isn't starting over",
        text: "Often, refining the logo, colours and typography is enough to bring a brand back to life, while keeping the recognition you've built.",
      },
    ],
  },
  {
    title: "What's included in a brand identity package?",
    slug: "brand-identity-package-explained",
    excerpt: "A logo is just the start. Here's what a complete identity includes and why each piece matters.",
    publishedAt: "2026-09-08",
    category: "branding",
    art: "cards",
    products: ["brand-identity-package", "logo-design", "brand-guidelines"],
    content: [
      {
        type: "p",
        text: "Many businesses order a logo and then find every new flyer, sign and social post looks a little different. A brand identity package solves this by giving you a complete system, not just a mark.",
      },
      { type: "h2", text: "The core pieces" },
      {
        type: "list",
        items: [
          "Logo, plus variations: full colour, one colour, white and an icon for small spaces",
          "Colour palette with exact codes for print (CMYK) and screens (RGB and HEX)",
          "Typography: the fonts for headings and body text",
          "Brand pattern or graphic elements that make materials recognisable",
          "Stationery: business cards, letterhead, email signature",
        ],
      },
      { type: "h2", text: "Brand guidelines" },
      {
        type: "p",
        text: "Guidelines are the rulebook that shows your team, printers and designers how to use everything correctly: minimum logo sizes, spacing, colours and what not to do.",
      },
      {
        type: "figure",
        art: "signage",
        caption: "One identity system applied consistently from the business card to the shop sign.",
      },
      { type: "h2", text: "Why it's worth it" },
      {
        type: "p",
        text: "With a complete identity, every new piece of marketing takes less time to produce and looks like it belongs to the same brand. That consistency is what makes customers remember and trust you.",
      },
    ],
  },
  {
    title: "Logo file formats explained: AI, SVG, PDF and PNG",
    slug: "logo-file-formats-explained",
    excerpt: "Which logo file to send to the printer, the web designer and the signage maker, and why it matters.",
    publishedAt: "2026-08-31",
    category: "design",
    art: "social",
    products: ["logo-design", "brand-guidelines"],
    content: [
      {
        type: "p",
        text: "Ask for your logo and you might receive a dozen files with unfamiliar endings. Using the wrong one is the most common reason logos print blurry or look pixelated online.",
      },
      { type: "h2", text: "Vector files: AI, SVG, EPS and PDF" },
      {
        type: "p",
        text: "Vector files are made of shapes rather than pixels, so they stay sharp at any size, from a pen to a billboard. Printers, signage makers and embroiderers need these.",
      },
      { type: "h2", text: "Pixel files: PNG and JPG" },
      {
        type: "p",
        text: "PNG and JPG files are made of pixels and lose quality when enlarged. PNG supports a transparent background, which makes it the right choice for websites, presentations and social media. Avoid JPG for logos.",
      },
      {
        type: "checklist",
        title: "Which file to send",
        items: [
          "Printer or signage: AI, EPS or PDF",
          "Website and social media: SVG or PNG",
          "Word and PowerPoint: PNG with transparent background",
          "Embroidery or engraving: AI or EPS",
        ],
      },
      {
        type: "tip",
        title: "Keep a master folder",
        text: "Store every version of your logo in one shared folder, so anyone on your team can send the right file in seconds.",
      },
    ],
  },
  {
    title: "How to design a company profile that wins tenders",
    slug: "company-profile-that-wins-tenders",
    excerpt: "What procurement teams look for in a company profile, and how to structure yours.",
    publishedAt: "2026-08-24",
    category: "design",
    art: "cards",
    products: ["company-profile-design", "company-profiles-booklets"],
    content: [
      {
        type: "p",
        text: "For many Ugandan businesses, the company profile is the document that opens doors to corporates, NGOs and government contracts. Evaluators read many of them, so yours needs to be clear, credible and easy to scan.",
      },
      { type: "h2", text: "Structure that evaluators expect" },
      {
        type: "list",
        ordered: true,
        items: [
          "Cover with your logo and company name",
          "About us: who you are, when you started, your mission",
          "Services, with a short description of each",
          "Experience: selected clients and projects",
          "Team and key staff",
          "Registration and compliance: certificate of incorporation, TIN, licences",
          "Contact details",
        ],
      },
      { type: "h2", text: "Show proof, not adjectives" },
      {
        type: "p",
        text: 'Phrases like "high quality" and "customer-focused" appear in every profile. Specific projects, photos of real work and client names (with permission) are what convince evaluators.',
      },
      { type: "h2", text: "Make it easy to share" },
      {
        type: "p",
        text: "Prepare two versions: a print-ready file for bound copies, and a compressed PDF that's small enough to send by email or WhatsApp.",
      },
      {
        type: "tip",
        title: "Keep it current",
        text: "Update your profile every six months with recent projects, so it's ready the moment a tender is announced.",
      },
    ],
  },
  {
    title: "Why mobile speed matters for Ugandan websites",
    slug: "mobile-speed-ugandan-websites",
    excerpt: "Most of your visitors are on phones and mobile data. A slow website is a lost customer.",
    publishedAt: "2026-08-17",
    category: "web",
    art: "web",
    products: ["business-website", "website-redesign", "hosting-domain-email"],
    content: [
      {
        type: "p",
        text: "Most people who find your business online will do it on a phone, often on mobile data where every megabyte costs money. If your website is slow, many will give up before it loads.",
      },
      { type: "h2", text: "What slows a website down" },
      {
        type: "list",
        items: [
          "Large, uncompressed photos",
          "Too many plugins, scripts and pop-ups",
          "Cheap or overloaded hosting",
          "Sliders and background videos on the home page",
        ],
      },
      { type: "h2", text: "Speed helps you on Google" },
      {
        type: "p",
        text: "Google considers page speed and mobile-friendliness when ranking websites, so a fast site helps more people find you, not just keeps the ones who arrive.",
      },
      { type: "figure", art: "web", caption: "A light, mobile-first layout loads quickly even on slower connections." },
      { type: "h2", text: "Quick wins" },
      {
        type: "checklist",
        items: [
          "Compress and resize images before uploading",
          "Remove plugins you don't use",
          "Choose reliable hosting",
          "Test your site on a phone using mobile data, not office Wi-Fi",
        ],
      },
      {
        type: "tip",
        title: "Free speed check",
        text: "Run your website through Google PageSpeed Insights. It gives a score and a list of what to fix.",
      },
    ],
  },
  {
    title: "What to prepare before building your business website",
    slug: "prepare-before-building-website",
    excerpt: "The content, accounts and decisions that make a website project faster and cheaper.",
    publishedAt: "2026-08-10",
    category: "web",
    art: "web",
    products: ["business-website", "ecommerce-website", "hosting-domain-email"],
    content: [
      {
        type: "p",
        text: "The biggest cause of website delays isn't design or code. It's waiting for content. Preparing these items before you start can cut weeks off your project.",
      },
      { type: "h2", text: "Decide what the website must do" },
      {
        type: "p",
        text: "Is the goal to get enquiries, sell products, take bookings or share information? The answer shapes every page. Write down the one action you most want visitors to take.",
      },
      { type: "h2", text: "Gather your content" },
      {
        type: "checklist",
        title: "Content checklist",
        items: [
          "Logo files (see our guide to logo formats)",
          "Short description of the business",
          "List of services or products with descriptions",
          "Real photos of your team, premises and work",
          "Contact details, WhatsApp number and Google Maps location",
          "Client testimonials, with permission",
        ],
      },
      { type: "h2", text: "Domain and email" },
      {
        type: "p",
        text: "Choose your domain name early. A .co.ug or .ug domain signals a Ugandan business, while .com suits international audiences. Professional email on your domain (you@yourcompany.co.ug) looks far more credible than a free address.",
      },
      { type: "h2", text: "Payments for online shops" },
      {
        type: "p",
        text: "If you'll sell online, decide which payment methods you need, such as MTN Mobile Money, Airtel Money and cards, so the right payment provider can be set up from the start.",
      },
    ],
  },
  {
    title: "Planning a product launch event that people remember",
    slug: "product-launch-event-planning",
    excerpt: "From venue to stage design to follow-up: the essentials of a launch that gets talked about.",
    publishedAt: "2026-08-03",
    category: "events",
    art: "event",
    products: ["product-launches-activations", "event-branding-backdrops", "promotional-items"],
    content: [
      {
        type: "p",
        text: "A launch has one job: make guests, press and customers remember your product. Everything, from the invitation to the follow-up message, should serve that story.",
      },
      { type: "h2", text: "Start with the story" },
      {
        type: "p",
        text: "Decide the one message you want guests to leave with. Then design the invitations, stage, signage and giveaways around it.",
      },
      { type: "h2", text: "Book early" },
      {
        type: "p",
        text: "Popular venues and suppliers in Kampala book up quickly, especially from October to December. Aim to confirm the venue, sound, stage and catering six to eight weeks ahead.",
      },
      {
        type: "figure",
        art: "event",
        caption: "A branded stage and backdrop make the product the centre of every photo.",
      },
      { type: "h2", text: "Plan the run of show" },
      {
        type: "p",
        text: "Write a minute-by-minute programme covering arrivals, speeches, the reveal, entertainment and departure, and share it with every supplier.",
      },
      {
        type: "checklist",
        title: "Launch day checklist",
        items: [
          "Stage, backdrop and pull-ups set up the day before",
          "Sound and screen tested",
          "Registration desk and name badges",
          "Photographer briefed on key moments",
          "Branded giveaways packed",
          "Someone posting live on social media",
        ],
      },
      { type: "h2", text: "Follow up" },
      {
        type: "p",
        text: "Share photos, send thank-you messages and post highlights within 48 hours, while the launch is still fresh in people's minds.",
      },
    ],
  },
  {
    title: "Exhibition stand checklist for trade fairs",
    slug: "exhibition-stand-checklist",
    excerpt:
      "Get more visitors to your stand at trade shows, agricultural shows and expos with this planning checklist.",
    publishedAt: "2026-07-27",
    category: "events",
    art: "stand",
    products: ["exhibition-stands", "pull-up-banners", "promotional-items", "conference-kits"],
    content: [
      {
        type: "p",
        text: "Trade fairs and expos bring thousands of potential customers through the gates, but visitors walk past most stands. A clear, well-planned stand is what makes them stop.",
      },
      { type: "h2", text: "Six weeks before" },
      {
        type: "list",
        items: [
          "Book your space and confirm its size and position",
          "Decide your goal: leads, sales or brand awareness",
          "Brief your stand designer and approve a 3D mock-up",
        ],
      },
      { type: "h2", text: "Design for three seconds" },
      {
        type: "p",
        text: "Visitors decide in a few seconds whether to stop. Put your logo high where it can be seen over crowds, say what you do in five words or fewer, and keep the front of the stand open and welcoming.",
      },
      {
        type: "figure",
        art: "stand",
        caption: "A clear back wall, an open front and a branded counter invite visitors in.",
      },
      { type: "h2", text: "What to bring" },
      {
        type: "checklist",
        items: [
          "Brochures and price lists",
          "Branded giveaways",
          "A way to collect contacts (forms or a QR code)",
          "Extension cables and phone chargers",
          "Water and snacks for your team",
          "Uniforms or branded t-shirts",
        ],
      },
      {
        type: "tip",
        title: "Build once, use again",
        text: "A modular stand can be rebranded and reused at future shows, which lowers the cost of every event after the first.",
      },
    ],
  },
];

export const posts: Post[] = drafts.map(({ category, ...d }, i) => ({
  ...d,
  _id: `post-${i + 1}`,
  cover: null,
  category: cat(category),
  author: { name: "Citrix Team" },
  readingMinutes: readingMinutes(d.content),
  seo: null,
}));
