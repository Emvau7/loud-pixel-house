/**
 * Loud Pixel House — site config
 * Edit this file to change prices, portfolio items, and links.
 * No HTML/CSS knowledge needed for anything in here.
 */
window.LPH_CONFIG = {

  brand: {
    name: "Loud Pixel House",
    short: "LPH",
    email: "loudpixelhouse@gmail.com",
    emailBackup: "mateusz@loudpixelhouse.com",
    domain: "https://loudpixelhouse.com"
  },

  social: {
    instagram: "https://instagram.com/loudpixelhouse",
    // TODO: replace with real handle/URL once the account exists
    tiktok: "https://tiktok.com/@loudpixelhouse",
    // TODO: replace with real channel URL once it exists
    youtube: "https://youtube.com/@loudpixelhouse"
  },

  // Formspree form ID — sign up free at https://formspree.io, create a form,
  // copy the ID from the endpoint (https://formspree.io/f/XXXXXXXX) and paste it below.
  form: {
    formspreeId: "TODO_FORMSPREE_ID"
  },

  services: [
    {
      number: "01",
      title: "AI Video Ads",
      description: "15–60 second ads for products, apps and brands. Script, AI generation, edit, grade and sound design — finished like a real production, delivered in every format you run.",
      tag: "Core"
    },
    {
      number: "02",
      title: "AI Reels",
      description: "Vertical AI-driven content for Instagram, TikTok and Shorts. Built around a hook, designed as a series so your feed looks like one brand, not ten experiments.",
      tag: "Social"
    },
    {
      number: "03",
      title: "Short-Form Editing",
      description: "Your footage or long-form content cut into Reels and Shorts that hold attention. Offered as a monthly retainer for brands that post every week.",
      tag: "Retainer"
    }
  ],

  // Portfolio: 6 starter placeholders. Replace `src` with real files in assets/portfolio/
  // and this grid updates automatically — no HTML edits needed.
  portfolio: [
    { title: "Placeholder #1", tag: "AI ad", src: "assets/portfolio/placeholder-1.mp4", poster: "" },
    { title: "Placeholder #2", tag: "AI ad", src: "assets/portfolio/placeholder-2.mp4", poster: "" },
    { title: "Placeholder #3", tag: "AI reel", src: "assets/portfolio/placeholder-3.mp4", poster: "" },
    { title: "Placeholder #4", tag: "AI ad", src: "assets/portfolio/placeholder-4.mp4", poster: "" },
    { title: "Placeholder #5", tag: "AI reel", src: "assets/portfolio/placeholder-5.mp4", poster: "" },
    { title: "Placeholder #6", tag: "Reel edit", src: "assets/portfolio/placeholder-6.mp4", poster: "" }
  ],

  process: [
    { number: "01", title: "Brief", description: "You tell me the goal, the audience, and what you already have. I ask the annoying questions up front so we don't hit them halfway through." },
    { number: "02", title: "Script & Concept", description: "For AI ads: a short script and shot plan before anything is generated. For edits: a plan for the hook, structure, and pacing." },
    { number: "03", title: "Production", description: "AI generation, editing, grading, sound. You get a draft to react to, not a surprise at the end." },
    { number: "04", title: "Delivery & Revisions", description: "Final files in the formats you need, plus a set number of revision rounds included in the price." }
  ],

  // Pricing: change numbers and labels here. `badge` is the small label on the
  // featured card — keep it honest (no "most booked" until it's true).
  pricing: {
    note: "All prices in USD. Final quote depends on length, complexity and number of versions.",
    customNote: "Bigger campaign? Let's talk.",
    tiers: [
      {
        id: "ai-ad",
        featured: true,
        badge: "START HERE",
        title: "AI Video Ad",
        price: "$500",
        priceQualifier: "from",
        description: "One 15–30s ad, from script to final delivery.",
        features: [
          "Script & shot plan",
          "AI generation + hand-finishing",
          "Edit, color grade & sound design",
          "9:16, 1:1 and 16:9 versions",
          "2 revision rounds",
          "Full commercial usage rights"
        ]
      },
      {
        id: "campaign",
        featured: false,
        title: "Ad Campaign",
        price: "$1,200",
        priceQualifier: "from",
        description: "Three ads, or one hero ad plus cutdowns for testing.",
        features: [
          "3 concepts or variations",
          "Hook variations for A/B testing",
          "All platform formats",
          "Priority turnaround"
        ]
      },
      {
        id: "monthly",
        featured: false,
        title: "Monthly Retainer",
        price: "$2,000",
        priceQualifier: "",
        pricePeriod: "/mo",
        description: "6 AI videos every month — ads or reels, planned together.",
        features: [
          "6 AI videos per month",
          "All platform formats",
          "Priority production slot",
          "Monthly planning call"
        ]
      }
    ]
  },

  faq: [
    {
      q: "How long does a project take?",
      a: "A single AI ad usually takes 5–10 business days from an approved script. Campaigns and retainers run on a schedule we agree up front — you get a firm date after the brief."
    },
    {
      q: "Do you work with agencies?",
      a: "Yes. I can produce AI ads under your agency's name for your clients, with the same process and turnaround."
    },
    {
      q: "How many revisions do I get?",
      a: "Every package includes a set number of revision rounds (see pricing). Extra rounds beyond that are billed separately, but most projects don't need them."
    },
    {
      q: "Who owns the rights to AI-generated material?",
      a: "You get full commercial usage rights to the final delivered video. I'll flag up front if a specific AI tool's terms carry any restriction for your use case."
    },
    {
      q: "What file formats do I get?",
      a: "MP4 (H.264) in every aspect ratio you run: 9:16 for Reels, TikTok and Shorts, 1:1 for feeds, 16:9 for YouTube and web. Other specs on request."
    },
    {
      q: "How does payment work?",
      a: "Invoiced in USD. 50% upfront to start, 50% on final delivery. Monthly retainers are billed monthly in advance."
    },
    {
      q: "How do I start?",
      a: "Fill in the contact form below or email me directly. Tell me what you need and I'll reply with next steps and a realistic timeline."
    }
  ]
};
