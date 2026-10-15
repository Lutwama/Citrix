// Product catalogue shown on each service page and at /services/<service>/<product>.
//
// EDITING PRICES
// - `priceFrom` is the starting price in UGX, as a plain number: 50000, not "50,000".
// - Leave it as `null` to show "Price on request" instead of a price.
// - `priceUnit` is what the price covers, e.g. "per 100 cards".
import type { Product } from "@/lib/types";

export const products: Product[] = [
  // ─── Print ────────────────────────────────────────────────────────────────
  {
    slug: "business-cards",
    service: "print",
    title: "Business Cards",
    summary: "Premium business cards that make a strong first impression.",
    description:
      "Full-colour business cards printed on heavy card stock, with finishes from matt and gloss lamination to spot UV and rounded corners. We check every file before printing and send a proof for approval.",
    priceFrom: null,
    priceUnit: "per 100 cards",
    turnaround: "1–2 working days",
    minOrder: "100 cards",
    includes: [
      "Free file check and proof",
      "Full colour, one or both sides",
      "350gsm card as standard",
      "Delivery within Kampala",
    ],
    options: [
      { label: "Card stock", values: ["300gsm", "350gsm", "400gsm textured"] },
      { label: "Finish", values: ["Matt lamination", "Gloss lamination", "Soft-touch", "Spot UV"] },
      { label: "Extras", values: ["Rounded corners", "Foil stamping", "QR code"] },
    ],
    idealFor: ["Professionals", "Sales teams", "Small businesses"],
    faqs: [
      {
        question: "Can you design my business card?",
        answer: "Yes. Add design when you request a quote and we'll create options that match your brand.",
      },
      {
        question: "Can I order cards for several staff at once?",
        answer: "Yes. Send us the names and titles and we'll prepare one proof per person.",
      },
    ],
  },
  {
    slug: "flyers-brochures",
    service: "print",
    title: "Flyers & Brochures",
    summary: "Flyers, leaflets and folded brochures for promotions and events.",
    description:
      "Eye-catching flyers and brochures in A6 to A3, single sheets or folded. Ideal for promotions, menus, price lists and event handouts, printed digitally for short runs or offset for large quantities.",
    priceFrom: null,
    priceUnit: "per 100 A5 flyers",
    turnaround: "1–3 working days",
    minOrder: "50 copies",
    includes: [
      "Free file check and proof",
      "Full colour, one or both sides",
      "Bi-fold and tri-fold options",
      "Delivery within Kampala",
    ],
    options: [
      { label: "Size", values: ["A6", "A5", "A4", "DL", "A3"] },
      { label: "Paper", values: ["130gsm gloss", "170gsm gloss", "250gsm matt"] },
      { label: "Fold", values: ["Flat", "Bi-fold", "Tri-fold", "Z-fold"] },
    ],
    idealFor: ["Product promotions", "Restaurants", "Events and launches"],
    faqs: [
      {
        question: "Is offset or digital printing better?",
        answer:
          "Digital is best for under about 1,000 copies and fast turnaround. Offset is cheaper per copy for larger runs. We'll recommend the right one in your quote.",
      },
    ],
  },
  {
    slug: "company-profiles-booklets",
    service: "print",
    title: "Company Profiles & Booklets",
    summary: "Bound company profiles, reports, catalogues and magazines.",
    description:
      "Professionally printed and bound company profiles, annual reports, catalogues and booklets. Choose saddle-stitch, perfect binding or wire-o, with laminated covers for durability.",
    priceFrom: null,
    priceUnit: "per copy (A4, 12 pages)",
    turnaround: "3–5 working days",
    minOrder: "10 copies",
    includes: ["File check and printed proof", "Laminated cover", "Choice of binding", "Delivery within Kampala"],
    options: [
      { label: "Size", values: ["A5", "A4", "Square 21cm"] },
      { label: "Binding", values: ["Saddle-stitch", "Perfect bound", "Wire-o"] },
      { label: "Cover", values: ["Matt lamination", "Gloss lamination", "Soft-touch"] },
    ],
    idealFor: ["Tenders and proposals", "Corporate clients", "NGOs and annual reports"],
    faqs: [
      {
        question: "Can you also write and design the profile?",
        answer: "Yes. Our graphic design team can design the full profile, and we can help structure the content.",
      },
    ],
  },
  {
    slug: "pull-up-banners",
    service: "print",
    title: "Pull-up Banners",
    summary: "Portable roll-up banners for events, offices and exhibitions.",
    description:
      "Roll-up banners printed in high resolution on durable, curl-free material, supplied with a stand and carry bag. Set up in under a minute, they're the go-to display for launches, expos and reception areas.",
    priceFrom: null,
    priceUnit: "per banner with stand",
    turnaround: "1–2 working days",
    minOrder: "1 banner",
    includes: ["Banner print and stand", "Carry bag", "Free file check", "Delivery within Kampala"],
    options: [
      { label: "Size", values: ["85 × 200cm", "100 × 200cm", "120 × 200cm"] },
      { label: "Stand", values: ["Economy", "Premium", "Double-sided"] },
    ],
    idealFor: ["Exhibitions", "Product launches", "Office receptions"],
    faqs: [
      {
        question: "Can I reuse the stand with a new print?",
        answer: "Yes. We can print a replacement graphic for your existing stand at a lower price.",
      },
    ],
  },
  {
    slug: "banners-billboards",
    service: "print",
    title: "Banners & Billboards",
    summary: "Outdoor PVC banners, mesh banners and billboard skins.",
    description:
      "Large-format outdoor printing on weather-resistant PVC, mesh and vinyl. From shop-front banners to full billboard skins, printed in vivid colour with hemming and eyelets for installation.",
    priceFrom: null,
    priceUnit: "per square metre",
    turnaround: "1–3 working days",
    includes: ["Weather-resistant material", "Hemming and eyelets", "Free file check", "Installation available"],
    options: [
      { label: "Material", values: ["PVC flex", "Mesh", "Self-adhesive vinyl"] },
      { label: "Finishing", values: ["Eyelets", "Pole pockets", "Wooden frame", "Metal frame"] },
    ],
    idealFor: ["Shop fronts", "Outdoor advertising", "Events and fences"],
    faqs: [
      {
        question: "Do you install banners and billboards?",
        answer: "Yes. Our team installs across Kampala and can arrange installation upcountry.",
      },
    ],
  },
  {
    slug: "stickers-labels",
    service: "print",
    title: "Stickers & Labels",
    summary: "Product labels, stickers and window graphics, cut to any shape.",
    description:
      "Custom stickers and product labels printed on paper, vinyl or clear material, cut to shape or supplied on rolls for fast application. Perfect for packaging, bottles, jars and branding windows.",
    priceFrom: null,
    priceUnit: "per 100 labels",
    turnaround: "2–3 working days",
    minOrder: "50 labels",
    includes: ["Free file check and proof", "Cut to any shape", "Sheets or rolls"],
    options: [
      { label: "Material", values: ["Paper", "White vinyl", "Clear vinyl", "Waterproof"] },
      { label: "Finish", values: ["Gloss", "Matt", "Laminated"] },
    ],
    idealFor: ["Product packaging", "Water and juice bottles", "Window branding"],
    faqs: [
      {
        question: "Are your labels waterproof?",
        answer:
          "Our vinyl labels are water- and oil-resistant, which is ideal for bottles, cosmetics and food products.",
      },
    ],
  },
  {
    slug: "t-shirt-apparel-printing",
    service: "print",
    title: "T-shirt & Apparel Printing",
    summary: "Branded t-shirts, polos, caps and uniforms.",
    description:
      "Branded apparel for teams, events and campaigns, using screen printing, heat transfer or embroidery. We supply the garments or print on yours, in all sizes and colours.",
    priceFrom: null,
    priceUnit: "per t-shirt",
    turnaround: "3–5 working days",
    minOrder: "10 pieces",
    includes: ["Garment supply", "Mock-up before production", "Front and back printing", "Bulk discounts"],
    options: [
      { label: "Garment", values: ["Round-neck t-shirt", "Polo shirt", "Hoodie", "Cap", "Reflector vest"] },
      { label: "Method", values: ["Screen print", "Heat transfer", "Embroidery"] },
    ],
    idealFor: ["Staff uniforms", "Campaigns and elections", "Events and fun runs"],
    faqs: [
      {
        question: "Which printing method should I choose?",
        answer:
          "Screen printing is best value for large quantities, heat transfer suits small runs and full-colour designs, and embroidery gives a premium look on polos and caps.",
      },
    ],
  },
  {
    slug: "promotional-items",
    service: "print",
    title: "Promotional Items",
    summary: "Branded mugs, pens, umbrellas, bottles, notebooks and gifts.",
    description:
      "Corporate gifts and giveaways branded with your logo. Choose from mugs, pens, water bottles, umbrellas, notebooks, lanyards and more, ideal for clients, staff and event guests.",
    priceFrom: null,
    priceUnit: "per item",
    turnaround: "3–7 working days",
    minOrder: "20 items",
    includes: ["Logo branding", "Mock-up before production", "Gift packaging available", "Bulk discounts"],
    options: [
      { label: "Item", values: ["Mugs", "Pens", "Water bottles", "Umbrellas", "Notebooks", "Lanyards", "Tote bags"] },
      { label: "Branding", values: ["Print", "Engraving", "Embroidery"] },
    ],
    idealFor: ["Corporate gifts", "End-of-year hampers", "Event giveaways"],
    faqs: [
      {
        question: "Can you put together branded gift hampers?",
        answer: "Yes. We can combine several branded items into packaged hampers for clients and staff.",
      },
    ],
  },
  {
    slug: "packaging-boxes",
    service: "print",
    title: "Packaging & Boxes",
    summary: "Custom printed boxes, bags and product packaging.",
    description:
      "Printed product boxes, paper bags and packaging sleeves designed to make your product stand out on the shelf. We help with sizing, dielines and samples before full production.",
    priceFrom: null,
    priceUnit: "per 100 boxes",
    turnaround: "5–10 working days",
    minOrder: "100 pieces",
    includes: ["Dieline and sizing support", "Sample before production", "Full-colour print"],
    options: [
      { label: "Type", values: ["Folding boxes", "Paper bags", "Sleeves", "Rigid gift boxes"] },
      { label: "Finish", values: ["Matt lamination", "Gloss lamination", "Spot UV", "Foil"] },
    ],
    idealFor: ["Food and beverage brands", "Cosmetics", "Retail shops"],
    faqs: [
      {
        question: "Can I get a sample first?",
        answer: "Yes. We produce a sample so you can check size and finish before the full run.",
      },
    ],
  },
  {
    slug: "vehicle-branding",
    service: "print",
    title: "Vehicle Branding",
    summary: "Full and partial wraps for cars, vans, trucks and boda bodas.",
    description:
      "Turn your vehicles into moving adverts with printed vinyl wraps and decals. We measure, design, print and install, using quality vinyl that protects the paint and removes cleanly.",
    priceFrom: null,
    priceUnit: "per vehicle (partial wrap)",
    turnaround: "2–4 working days",
    includes: ["Vehicle measurement", "Design mock-up on your vehicle", "Professional installation"],
    options: [
      { label: "Coverage", values: ["Door decals", "Partial wrap", "Full wrap"] },
      { label: "Vehicle", values: ["Car", "Van", "Truck", "Motorcycle"] },
    ],
    idealFor: ["Delivery fleets", "Company cars", "Campaign vehicles"],
    faqs: [
      {
        question: "Will the vinyl damage my paint?",
        answer: "No. We use quality vinyl that protects the paint and can be removed cleanly.",
      },
    ],
  },

  // ─── Graphic Design ───────────────────────────────────────────────────────
  {
    slug: "social-media-design",
    service: "graphic-design",
    title: "Social Media Design",
    summary: "On-brand posts, stories and ads for every platform.",
    description:
      "Consistent, scroll-stopping social media graphics for Instagram, Facebook, LinkedIn, X and TikTok. Order single posts or a monthly content package with templates your team can reuse.",
    priceFrom: null,
    priceUnit: "per month (12 posts)",
    turnaround: "3–5 working days",
    includes: ["Designs sized for each platform", "Up to 3 rounds of revisions", "Editable templates on request"],
    options: [
      { label: "Package", values: ["Single post", "8 posts / month", "12 posts / month", "20 posts / month"] },
      { label: "Formats", values: ["Feed posts", "Stories", "Carousels", "Ad creatives"] },
    ],
    idealFor: ["Small businesses", "Restaurants and shops", "Campaigns"],
    faqs: [
      {
        question: "Do you also post the content?",
        answer: "We focus on design, but can work with your social media manager or recommend a partner.",
      },
    ],
  },
  {
    slug: "poster-flyer-design",
    service: "graphic-design",
    title: "Poster & Flyer Design",
    summary: "Campaign artwork, posters and flyers that get noticed.",
    description:
      "Bold poster and flyer designs for promotions, events and campaigns, delivered print-ready and in social formats so one design works everywhere.",
    priceFrom: null,
    priceUnit: "per design",
    turnaround: "1–3 working days",
    includes: ["Print-ready and social versions", "Up to 3 rounds of revisions", "Source files"],
    options: [{ label: "Type", values: ["Flyer", "Poster", "Event banner artwork", "Billboard artwork"] }],
    idealFor: ["Events", "Product launches", "Promotions"],
    faqs: [
      {
        question: "Can you print the design too?",
        answer: "Yes. We design and print in-house, so you get one quote for both.",
      },
    ],
  },
  {
    slug: "company-profile-design",
    service: "graphic-design",
    title: "Company Profile Design",
    summary: "Professional company profiles that win tenders and clients.",
    description:
      "A polished company profile that presents your services, experience and team with confidence. Delivered as a print-ready file and a lightweight PDF for email and WhatsApp.",
    priceFrom: null,
    priceUnit: "per profile (up to 12 pages)",
    turnaround: "5–10 working days",
    includes: [
      "Layout and content structuring",
      "Print and digital PDF",
      "Up to 3 rounds of revisions",
      "Source files",
    ],
    options: [
      { label: "Length", values: ["Up to 8 pages", "Up to 12 pages", "Up to 20 pages"] },
      { label: "Extras", values: ["Copywriting", "Photography", "Printing"] },
    ],
    idealFor: ["Tenders and procurement", "Corporate clients", "NGOs"],
    faqs: [
      {
        question: "We don't have our content ready. Can you help?",
        answer: "Yes. We can interview your team and write the content as part of the project.",
      },
    ],
  },
  {
    slug: "presentation-pitch-deck-design",
    service: "graphic-design",
    title: "Presentations & Pitch Decks",
    summary: "Clear, persuasive slides for pitches, reports and meetings.",
    description:
      "We turn your content into clean, branded slides that are easy to follow, in PowerPoint, Google Slides or Keynote, with a reusable template for future presentations.",
    priceFrom: null,
    priceUnit: "per deck (up to 15 slides)",
    turnaround: "3–5 working days",
    includes: ["Branded slide template", "Charts and infographics", "Editable file"],
    options: [
      { label: "Format", values: ["PowerPoint", "Google Slides", "Keynote"] },
      { label: "Length", values: ["Up to 10 slides", "Up to 15 slides", "Up to 30 slides"] },
    ],
    idealFor: ["Investor pitches", "Board reports", "Conference talks"],
    faqs: [
      {
        question: "Will I be able to edit the slides?",
        answer: "Yes. You receive the editable file plus a template your team can reuse.",
      },
    ],
  },
  {
    slug: "menu-invitation-certificate-design",
    service: "graphic-design",
    title: "Menus, Invitations & Certificates",
    summary: "Designs for restaurants, weddings, graduations and awards.",
    description:
      "Beautiful menus, invitation cards, programmes and certificates designed to match the occasion, and printed on premium stock if you need them.",
    priceFrom: null,
    priceUnit: "per design",
    turnaround: "1–3 working days",
    includes: ["Up to 3 rounds of revisions", "Print-ready file", "Digital version for WhatsApp"],
    options: [
      {
        label: "Type",
        values: ["Restaurant menu", "Invitation card", "Event programme", "Certificate", "Award plaque"],
      },
    ],
    idealFor: ["Restaurants and hotels", "Weddings and introductions", "Schools and awards"],
    faqs: [
      {
        question: "Can you add names to each certificate?",
        answer: "Yes. Send us a list and we'll personalise each certificate.",
      },
    ],
  },

  // ─── Branding ─────────────────────────────────────────────────────────────
  {
    slug: "logo-design",
    service: "branding",
    title: "Logo Design",
    summary: "A distinctive, professional logo built to last.",
    description:
      "We design an original logo based on your business, audience and goals. You receive several concepts, revisions and a full set of files ready for print, web and signage.",
    priceFrom: null,
    priceUnit: "per logo",
    turnaround: "5–7 working days",
    includes: [
      "3 initial concepts",
      "Up to 3 rounds of revisions",
      "Colour, black and white versions",
      "All file formats (AI, PDF, PNG, SVG)",
    ],
    options: [
      { label: "Package", values: ["Starter", "Standard", "Premium"] },
      { label: "Extras", values: ["Business card design", "Social media kit", "Mini brand guide"] },
    ],
    idealFor: ["New businesses", "Startups", "Rebrands"],
    faqs: [
      {
        question: "Do I own the logo?",
        answer: "Yes. On final payment, full ownership and all source files are transferred to you.",
      },
    ],
  },
  {
    slug: "brand-identity-package",
    service: "branding",
    title: "Brand Identity Package",
    summary: "Logo, colours, fonts and stationery in one complete system.",
    description:
      "A complete brand identity: logo, colour palette, typography, brand pattern and stationery designs, so your business looks consistent from the business card to the website.",
    priceFrom: null,
    priceUnit: "per package",
    turnaround: "3–6 weeks",
    includes: [
      "Brand discovery session",
      "Logo design",
      "Colour and typography system",
      "Stationery designs",
      "Brand guide",
    ],
    options: [
      { label: "Stationery", values: ["Business card", "Letterhead", "Envelope", "Email signature", "ID card"] },
    ],
    idealFor: ["Growing businesses", "Schools and hospitals", "NGOs"],
    faqs: [
      {
        question: "What's the difference between a logo and a brand identity?",
        answer:
          "A logo is one mark. A brand identity is the full system (colours, fonts, patterns and rules) that makes everything you produce look like it comes from you.",
      },
    ],
  },
  {
    slug: "brand-guidelines",
    service: "branding",
    title: "Brand Guidelines",
    summary: "A clear rulebook so your brand is always used correctly.",
    description:
      "A brand guidelines document that shows your team, printers and partners exactly how to use your logo, colours, fonts and imagery, keeping your brand consistent as you grow.",
    priceFrom: null,
    priceUnit: "per guide",
    turnaround: "1–2 weeks",
    includes: ["Logo usage rules", "Colour codes (CMYK, RGB, HEX)", "Typography", "Do's and don'ts", "PDF guide"],
    options: [{ label: "Scope", values: ["Essentials (10 pages)", "Full guide (25+ pages)"] }],
    idealFor: ["Organisations with many branches", "Franchises", "Corporates"],
    faqs: [
      {
        question: "Can you make guidelines for a logo you didn't design?",
        answer: "Yes. We'll build the guidelines around your existing logo and tidy up the files if needed.",
      },
    ],
  },
  {
    slug: "rebranding",
    service: "branding",
    title: "Rebranding & Brand Refresh",
    summary: "Modernise your brand while keeping the trust you've built.",
    description:
      "Whether you need a light refresh or a full rebrand, we review your current brand, keep what works and update the rest, then help you roll it out across signage, print and digital.",
    priceFrom: null,
    priceUnit: "per project",
    turnaround: "4–8 weeks",
    includes: ["Brand audit", "Updated identity", "Rollout plan", "Updated templates"],
    options: [{ label: "Scope", values: ["Refresh", "Full rebrand"] }],
    idealFor: ["Established businesses", "Mergers", "Businesses entering new markets"],
    faqs: [
      {
        question: "Will our customers still recognise us?",
        answer: "Yes. We keep the elements customers know, so the change feels like an upgrade, not a stranger.",
      },
    ],
  },
  {
    slug: "signage",
    service: "branding",
    title: "Signage & 3D Signs",
    summary: "Shop-front signs, 3D letters, light boxes and wayfinding.",
    description:
      "Signage that makes your premises easy to find and impossible to miss: 3D illuminated letters, light boxes, shop fronts, door and wall signs, and directional signage, all produced and installed by our team.",
    priceFrom: null,
    priceUnit: "per sign",
    turnaround: "5–10 working days",
    includes: ["Site visit and measurement", "Design mock-up on your building", "Fabrication", "Installation"],
    options: [
      {
        label: "Type",
        values: ["3D letters", "Illuminated light box", "Shop-front sign", "Office door signs", "Wayfinding signs"],
      },
      { label: "Material", values: ["Acrylic", "Stainless steel", "Aluminium composite", "PVC"] },
    ],
    idealFor: ["Shops and restaurants", "Offices", "Hospitals and schools"],
    faqs: [
      {
        question: "Do you handle KCCA signage permits?",
        answer: "We can advise on the requirements and help prepare what you need for approval.",
      },
    ],
  },
  {
    slug: "office-branding",
    service: "branding",
    title: "Office & Interior Branding",
    summary: "Wall graphics, frosted glass and branded reception areas.",
    description:
      "Bring your brand into your workspace with wall murals, frosted window film, branded reception walls and motivational graphics that impress visitors and inspire your team.",
    priceFrom: null,
    priceUnit: "per square metre",
    turnaround: "3–7 working days",
    includes: ["Site visit", "Design mock-up", "Printing and installation"],
    options: [
      { label: "Type", values: ["Wall murals", "Frosted glass film", "Reception logo wall", "Window graphics"] },
    ],
    idealFor: ["Corporate offices", "Banks", "Clinics and showrooms"],
    faqs: [
      {
        question: "Can the graphics be removed later?",
        answer: "Yes. Most of our wall and glass graphics are removable without damaging the surface.",
      },
    ],
  },

  // ─── Fabrication ──────────────────────────────────────────────────────────
  {
    slug: "3d-channel-letters",
    service: "fabrication",
    title: "3D & Channel Letters",
    summary: "Raised letters and logos, lit or unlit, for shop fronts and receptions.",
    description:
      "Individually cut letters and logos that stand off the wall and catch the eye from the street. Choose face-lit, back-lit (halo) or unlit letters in stainless steel, brushed or painted aluminium, brass or acrylic, mounted on the wall, a raceway or a backing panel.",
    priceFrom: null,
    priceUnit: "per letter (300mm high)",
    turnaround: "7–14 working days",
    minOrder: "1 sign",
    includes: [
      "Site visit and measurement",
      "Mock-up on a photo of your building",
      "Weatherproof LEDs and IP67 power supply",
      "Installation and electrical connection",
    ],
    options: [
      { label: "Lighting", values: ["Face-lit", "Back-lit (halo)", "Face and side-lit", "Unlit"] },
      { label: "Material", values: ["Stainless steel", "Brushed aluminium", "Brass", "Acrylic", "Painted aluminium"] },
      { label: "Mounting", values: ["Direct to wall", "On raceway", "On backing panel", "Roof-top frame"] },
    ],
    idealFor: ["Shop fronts", "Office receptions", "Hotels and restaurants"],
    faqs: [
      {
        question: "What drives the price of 3D letters?",
        answer:
          "Letter height, the number of letters, the material, how they are lit and how high they are installed. Above about 4 metres we need scaffolding or a lift, which we include in the quote.",
      },
      {
        question: "Can you switch the sign on and off automatically?",
        answer:
          "Yes. We can fit a timer or a dusk-to-dawn sensor so the sign lights up at night without anyone remembering.",
      },
    ],
  },
  {
    slug: "light-boxes",
    service: "fabrication",
    title: "Light Boxes",
    summary: "Single or double-sided illuminated boxes, from acrylic to backlit fabric.",
    description:
      "Bright, even illumination for your logo or a full graphic, day and night. We build wall-mounted and projecting (blade) light boxes in aluminium frames with acrylic or tension-fabric faces, which make changing the artwork later quick and affordable.",
    priceFrom: null,
    priceUnit: "per light box (1m × 0.5m)",
    turnaround: "7–10 working days",
    includes: ["Aluminium frame and LED modules", "Printed face", "IP67 power supply", "Installation"],
    options: [
      { label: "Face", values: ["Acrylic", "Backlit tension fabric", "Flex face"] },
      { label: "Shape", values: ["Rectangle", "Circle", "Custom cut to logo"] },
      { label: "Sides", values: ["Single-sided (wall)", "Double-sided (projecting)"] },
    ],
    idealFor: ["Pharmacies and clinics", "Mall shops", "Restaurants and bars"],
    faqs: [
      {
        question: "Can I change the graphic later?",
        answer:
          "Yes. Fabric and flex faces can be reprinted and swapped without replacing the box, which suits promotions and rebrands.",
      },
    ],
  },
  {
    slug: "pylon-totem-signs",
    service: "fabrication",
    title: "Pylon & Totem Signs",
    summary: "Free-standing branded towers for petrol stations, malls, schools and factories.",
    description:
      "Tall, free-standing signs that can be seen from the road and carry several tenants or price boards. We engineer the steel structure and foundation, clad it in aluminium composite panel and add illuminated logo panels or changeable price displays.",
    priceFrom: null,
    priceUnit: "per pylon",
    turnaround: "3–4 weeks",
    includes: [
      "Site survey and structural drawings",
      "Steel frame and concrete foundation",
      "ACP cladding and illuminated panels",
      "Permit paperwork and installation",
    ],
    options: [
      { label: "Height", values: ["Up to 3m (totem)", "3–6m", "6m and above"] },
      { label: "Panels", values: ["Single brand", "Multi-tenant", "With price display"] },
      { label: "Lighting", values: ["Internally lit", "Spot-lit", "Unlit"] },
    ],
    idealFor: ["Petrol stations", "Shopping malls and plazas", "Schools, hospitals and factories"],
    faqs: [
      {
        question: "Do pylons need approval?",
        answer:
          "Usually yes. We prepare the structural drawings and application for KCCA or your local authority, and build only once it's approved.",
      },
    ],
  },
  {
    slug: "shopfronts-acp-cladding",
    service: "fabrication",
    title: "Shop Fronts & ACP Cladding",
    summary: "Complete branded façades in aluminium composite panel with integrated signs.",
    description:
      "Give your building a clean, modern face. We clad façades, canopies and fascias in aluminium composite panel (ACP) in your brand colours, then fit 3D letters or light boxes into the design so everything looks like one piece.",
    priceFrom: null,
    priceUnit: "per square metre",
    turnaround: "2–3 weeks",
    includes: [
      "Measured survey",
      "3D façade visual",
      "Steel or aluminium sub-frame",
      "Cladding, signs and installation",
    ],
    options: [
      { label: "Finish", values: ["Gloss", "Matt", "Metallic", "Wood or stone look"] },
      { label: "Scope", values: ["Fascia only", "Full shop front", "Canopy", "Column wraps"] },
    ],
    idealFor: ["Retail chains and branches", "Banks and mobile money agents", "Showrooms"],
    faqs: [
      {
        question: "Can you roll the same look out to all our branches?",
        answer:
          "Yes. We create one standard design and adapt it to each site's measurements so every branch looks consistent.",
      },
    ],
  },
  {
    slug: "billboard-structures",
    service: "fabrication",
    title: "Billboard & Gantry Structures",
    summary: "Steel billboard frames, roof-top structures and entrance gantries.",
    description:
      "Strong, galvanised or painted steel structures built to carry your advertising or welcome visitors at an entrance. We design for wind load, build the foundations and install the frame ready for printed flex or panels.",
    priceFrom: null,
    priceUnit: "per structure",
    turnaround: "3–5 weeks",
    includes: ["Structural design", "Foundations", "Steel fabrication and painting", "Erection on site"],
    options: [
      { label: "Type", values: ["Ground billboard", "Roof-top frame", "Wall-mounted frame", "Entrance gantry"] },
      { label: "Finish", values: ["Painted", "Galvanised"] },
    ],
    idealFor: ["Estates and campuses", "Factories and warehouses", "Advertisers"],
    faqs: [
      {
        question: "Do you print the billboard skin too?",
        answer:
          "Yes. We print and fit the flex or panel artwork, so you get the structure and the advert from one team.",
      },
    ],
  },
  {
    slug: "plaques-engraving",
    service: "fabrication",
    title: "Plaques & Engraving",
    summary: "Commissioning plaques, door signs and engraved name plates.",
    description:
      "Lasting plaques for building openings, donors and milestones, plus door, desk and name plates. Engraved, etched or printed on brass, stainless steel, acrylic or granite, with stand-off fixings or a display base.",
    priceFrom: null,
    priceUnit: "per plaque (A4)",
    turnaround: "3–5 working days",
    includes: ["Layout proof", "Engraving or etching", "Fixings"],
    options: [
      { label: "Material", values: ["Brass", "Stainless steel", "Acrylic", "Granite"] },
      { label: "Use", values: ["Commissioning plaque", "Door and office signs", "Donor wall", "Desk name plates"] },
    ],
    idealFor: ["Government and NGO projects", "Schools and hospitals", "Corporate offices"],
    faqs: [
      {
        question: "Can you deliver a plaque for an official opening on short notice?",
        answer: "Often, yes. Tell us the date when you ask for a quote and we'll confirm whether we can meet it.",
      },
    ],
  },
  {
    slug: "wayfinding-systems",
    service: "fabrication",
    title: "Wayfinding & Directory Signs",
    summary: "Directional, room and directory signs that help people find their way.",
    description:
      "A consistent family of signs that guides visitors from the gate to the right room: site directories, directional posts, floor and room signs, and safety signage. We plan the routes with you, then produce and install the full set.",
    priceFrom: null,
    priceUnit: "per sign set",
    turnaround: "2–3 weeks",
    includes: ["Walk-through and sign schedule", "Design family in your brand", "Production and installation"],
    options: [
      { label: "Sign type", values: ["Site directory", "Directional post", "Room and door signs", "Safety signs"] },
      { label: "Material", values: ["Aluminium", "Acrylic", "ACP", "Stainless steel"] },
    ],
    idealFor: ["Hospitals and clinics", "Universities and schools", "Office parks and hotels"],
    faqs: [
      {
        question: "Can we add rooms later?",
        answer: "Yes. We keep your sign templates on file so new or changed signs match the original set.",
      },
    ],
  },
  {
    slug: "kiosks-display-units",
    service: "fabrication",
    title: "Kiosks & Display Units",
    summary: "Branded kiosks, counters, POS stands and acrylic displays.",
    description:
      "Branded structures that sell for you: mobile money and product kiosks, promo counters, point-of-sale stands, brochure holders and acrylic display units. Built in steel, aluminium, MDF and acrylic, and finished in your brand colours.",
    priceFrom: null,
    priceUnit: "per unit",
    turnaround: "1–2 weeks",
    minOrder: "1 unit",
    includes: ["Design drawing", "Fabrication and branding", "Delivery and assembly"],
    options: [
      { label: "Type", values: ["Kiosk", "Promo counter", "POS display stand", "Brochure holder", "Acrylic display"] },
      { label: "Build", values: ["Steel", "Aluminium", "MDF", "Acrylic"] },
    ],
    idealFor: ["Telecom and mobile money agents", "FMCG brands and activations", "Supermarkets and malls"],
    faqs: [
      {
        question: "Can you make many identical units for a roll-out?",
        answer: "Yes. We build a prototype for your approval, then produce the full batch to the same standard.",
      },
    ],
  },

  // ─── Web Design ───────────────────────────────────────────────────────────
  {
    slug: "business-website",
    service: "web-design",
    title: "Business Website",
    summary: "A professional website that brings in enquiries.",
    description:
      "A fast, mobile-first website for your business with your services, portfolio and contact details, plus WhatsApp and enquiry forms. Built on a content management system so you can update it yourself.",
    priceFrom: null,
    priceUnit: "per website (up to 6 pages)",
    turnaround: "2–4 weeks",
    includes: [
      "Mobile-first design",
      "Up to 6 pages",
      "WhatsApp and contact forms",
      "Basic SEO setup",
      "Training for your team",
    ],
    options: [
      { label: "Size", values: ["Up to 6 pages", "Up to 12 pages", "Custom"] },
      { label: "Extras", values: ["Blog", "Copywriting", "Photography", "Google Business Profile setup"] },
    ],
    idealFor: ["SMEs", "Schools and clinics", "Professional services"],
    faqs: [
      {
        question: "How long does it take to build?",
        answer: "Most business websites are ready in 2–4 weeks once we have your content.",
      },
    ],
  },
  {
    slug: "landing-page",
    service: "web-design",
    title: "Landing Page",
    summary: "A single high-converting page for a campaign or product.",
    description:
      "A focused one-page website built for a single goal, such as event registrations, product sales or lead generation, ideal for ads and campaigns.",
    priceFrom: null,
    priceUnit: "per page",
    turnaround: "5–10 working days",
    includes: ["Conversion-focused design", "Enquiry or sign-up form", "Analytics setup"],
    options: [{ label: "Goal", values: ["Lead capture", "Event registration", "Product launch"] }],
    idealFor: ["Ad campaigns", "Events", "Product launches"],
    faqs: [
      {
        question: "Can it be part of my existing website?",
        answer: "Yes. We can add it to your current site or host it on its own domain.",
      },
    ],
  },
  {
    slug: "ecommerce-website",
    service: "web-design",
    title: "E-commerce Website",
    summary: "An online shop with Mobile Money and card payments.",
    description:
      "Sell online with a shop that's easy to manage: product catalogue, cart, checkout and payments through Mobile Money and cards, with order notifications by email and WhatsApp.",
    priceFrom: null,
    priceUnit: "per shop",
    turnaround: "4–8 weeks",
    includes: ["Product catalogue", "Mobile Money and card payments", "Order management", "Training for your team"],
    options: [
      { label: "Products", values: ["Up to 50", "Up to 200", "Unlimited"] },
      { label: "Extras", values: ["Delivery zones", "Discount codes", "Product photography"] },
    ],
    idealFor: ["Retail shops", "Fashion and beauty brands", "Supermarkets"],
    faqs: [
      {
        question: "Which payment methods can I accept?",
        answer: "MTN Mobile Money, Airtel Money and Visa/Mastercard, through a local payment provider.",
      },
    ],
  },
  {
    slug: "website-redesign",
    service: "web-design",
    title: "Website Redesign",
    summary: "Give your outdated website a fast, modern upgrade.",
    description:
      "We modernise your existing website: new design, faster loading, mobile-friendly layouts and better search visibility, while keeping your content and Google rankings.",
    priceFrom: null,
    priceUnit: "per website",
    turnaround: "2–6 weeks",
    includes: ["Website audit", "New design", "Content migration", "Redirects to protect SEO"],
    options: [{ label: "Scope", values: ["Design refresh", "Full rebuild"] }],
    idealFor: ["Slow or outdated websites", "Rebrands", "Sites that don't work on mobile"],
    faqs: [
      {
        question: "Will we lose our Google rankings?",
        answer: "No. We set up redirects and keep your important pages so your rankings are protected.",
      },
    ],
  },
  {
    slug: "hosting-domain-email",
    service: "web-design",
    title: "Hosting, Domains & Email",
    summary: ".ug and .com domains, reliable hosting and business email.",
    description:
      "We register your domain, host your website on fast, secure servers and set up professional email addresses (like you@yourcompany.co.ug) that work on your phone.",
    priceFrom: null,
    priceUnit: "per year",
    turnaround: "1–2 working days",
    includes: ["Domain registration", "SSL certificate", "Business email setup", "Daily backups"],
    options: [
      { label: "Domain", values: [".co.ug", ".ug", ".com", ".org"] },
      { label: "Email", values: ["Google Workspace", "Microsoft 365", "Standard email"] },
    ],
    idealFor: ["Any business with a website", "Teams that need professional email"],
    faqs: [
      {
        question: "Can you move my existing website and email?",
        answer: "Yes. We'll migrate everything with minimal downtime.",
      },
    ],
  },
  {
    slug: "website-maintenance",
    service: "web-design",
    title: "Website Maintenance",
    summary: "Updates, backups and security so your site keeps running.",
    description:
      "A monthly care plan covering updates, security monitoring, backups and content changes, so your website stays fast, safe and up to date.",
    priceFrom: null,
    priceUnit: "per month",
    turnaround: "Ongoing",
    includes: ["Updates and security monitoring", "Monthly backups", "Content changes", "Monthly report"],
    options: [{ label: "Plan", values: ["Basic", "Standard", "Premium"] }],
    idealFor: ["Busy teams", "E-commerce shops", "Organisations without an IT team"],
    faqs: [
      {
        question: "Can you maintain a website you didn't build?",
        answer: "Yes. We'll review it first and then add it to a care plan.",
      },
    ],
  },

  // ─── Event Management ─────────────────────────────────────────────────────
  {
    slug: "corporate-events-conferences",
    service: "event-management",
    title: "Corporate Events & Conferences",
    summary: "Conferences, AGMs, staff parties and dinners, fully managed.",
    description:
      "End-to-end planning and management for conferences, AGMs, workshops, staff parties and gala dinners: venue, décor, sound, catering coordination, branding and on-the-day management.",
    priceFrom: null,
    priceUnit: "per event",
    turnaround: "Book 4–8 weeks ahead",
    includes: ["Event plan and budget", "Venue and vendor coordination", "Event branding", "On-site event team"],
    options: [
      { label: "Event type", values: ["Conference", "AGM", "Workshop", "Staff party", "Gala dinner"] },
      { label: "Guests", values: ["Up to 50", "50–200", "200–500", "500+"] },
    ],
    idealFor: ["Corporates", "NGOs", "Government agencies"],
    faqs: [
      {
        question: "Can you work with our chosen venue?",
        answer: "Yes. We can work at your venue or recommend and book one for you.",
      },
    ],
  },
  {
    slug: "product-launches-activations",
    service: "event-management",
    title: "Product Launches & Activations",
    summary: "Launches, roadshows and brand activations that create buzz.",
    description:
      "We plan and run product launches, roadshows and in-store activations, including concept, branding, brand ambassadors, sound and stage, so your brand gets noticed.",
    priceFrom: null,
    priceUnit: "per activation",
    turnaround: "Book 3–6 weeks ahead",
    includes: ["Creative concept", "Branding and set-up", "Brand ambassadors", "Activity report with photos"],
    options: [{ label: "Type", values: ["Product launch", "Roadshow", "In-store activation", "Sampling"] }],
    idealFor: ["FMCG brands", "Telecoms and banks", "New products"],
    faqs: [
      {
        question: "Do you provide brand ambassadors?",
        answer: "Yes. We recruit, train and supervise ambassadors for your activation.",
      },
    ],
  },
  {
    slug: "exhibition-stands",
    service: "event-management",
    title: "Exhibition Stands & Booths",
    summary: "Custom expo booths designed, built and installed.",
    description:
      "Stand out at trade shows and expos with a custom-designed booth, from compact shell-scheme branding to fully built stands with counters, lighting and display shelves, plus set-up and dismantling.",
    priceFrom: null,
    priceUnit: "per stand (3 × 3m)",
    turnaround: "1–3 weeks",
    includes: ["3D stand design", "Fabrication and printing", "Set-up and dismantling"],
    options: [
      { label: "Stand size", values: ["3 × 3m", "3 × 6m", "6 × 6m", "Custom"] },
      { label: "Extras", values: ["Branded counter", "Lighting", "TV screen mount", "Brochure stands"] },
    ],
    idealFor: ["Trade shows", "UMA expo", "Career and agri fairs"],
    faqs: [
      {
        question: "Can the stand be reused?",
        answer: "Yes. We can build modular stands that you can reuse and rebrand for future events.",
      },
    ],
  },
  {
    slug: "event-branding-backdrops",
    service: "event-management",
    title: "Event Branding & Backdrops",
    summary: "Stage backdrops, step-and-repeat walls, tents and signage.",
    description:
      "Everything that makes your event look on-brand: stage backdrops, step-and-repeat photo walls, branded tents and tablecloths, directional signs, flags and teardrop banners.",
    priceFrom: null,
    priceUnit: "per backdrop",
    turnaround: "2–5 working days",
    includes: ["Design and printing", "Frames and stands", "Set-up at your venue"],
    options: [
      {
        label: "Item",
        values: ["Stage backdrop", "Step-and-repeat wall", "Branded tent", "Teardrop flags", "Tablecloths"],
      },
    ],
    idealFor: ["Launches and conferences", "Weddings and introductions", "Graduations"],
    faqs: [
      {
        question: "Do you set up at the venue?",
        answer: "Yes. Our team delivers, sets up and collects after the event.",
      },
    ],
  },
  {
    slug: "conference-kits",
    service: "event-management",
    title: "Conference Kits & Name Badges",
    summary: "Badges, lanyards, notebooks and delegate bags.",
    description:
      "Branded delegate kits for conferences and workshops: name badges, printed lanyards, notebooks, pens, folders and bags, packed and ready for registration.",
    priceFrom: null,
    priceUnit: "per delegate kit",
    turnaround: "3–7 working days",
    minOrder: "20 kits",
    includes: ["Personalised badges", "Branded items", "Packing and delivery to venue"],
    options: [{ label: "Items", values: ["Name badge", "Lanyard", "Notebook", "Pen", "Folder", "Tote bag"] }],
    idealFor: ["Conferences", "Workshops and trainings", "Summits"],
    faqs: [
      {
        question: "Can you print badges from our registration list?",
        answer: "Yes. Send us the list and we'll print a personalised badge for every delegate.",
      },
    ],
  },
];

export function getProductsByService(service: string) {
  return products.filter((p) => p.service === service);
}

export function getProduct(service: string, slug: string) {
  return products.find((p) => p.service === service && p.slug === slug) ?? null;
}

export function formatPrice(product: Pick<Product, "priceFrom">) {
  return product.priceFrom == null ? null : `UGX ${product.priceFrom.toLocaleString("en-US")}`;
}
