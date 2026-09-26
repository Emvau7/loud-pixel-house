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
      description: "Product and brand videos generated with AI, then hand-finished — graded, sound-designed, and edited like a real ad. Not a raw generation with a caption slapped on.",
      tag: "AI production"
    },
    {
      number: "02",
      title: "Reels & Short-Form Editing",
      description: "Reels, TikToks and Shorts cut from your raw footage or long-form content. Hooks that hold, pacing that doesn't drag, captions that read.",
      tag: "Editing"
    },
    {
      number: "03",
      title: "Content Extras",
      description: "Thumbnails, social graphics, and on-site filming when a project needs it. Not the main event, but done to the same standard.",
      tag: "Add-on"
    }
  ],

  // Portfolio: 6 starter placeholders. Replace `src` with real files in assets/portfolio/
  // and this grid updates automatically — no HTML edits needed.
  portfolio: [
    { title: "Placeholder reel #1", tag: "AI ad", src: "assets/portfolio/placeholder-1.mp4", poster: "" },
    { title: "Placeholder reel #2", tag: "Reel edit", src: "assets/portfolio/placeholder-2.mp4", poster: "" },
    { title: "Placeholder reel #3", tag: "AI ad", src: "assets/portfolio/placeholder-3.mp4", poster: "" },
    { title: "Placeholder reel #4", tag: "Reel edit", src: "assets/portfolio/placeholder-4.mp4", poster: "" },
    { title: "Placeholder reel #5", tag: "AI ad", src: "assets/portfolio/placeholder-5.mp4", poster: "" },
    { title: "Placeholder reel #6", tag: "Reel edit", src: "assets/portfolio/placeholder-6.mp4", poster: "" }
  ],

  process: [
    { number: "01", title: "Brief", description: "You tell me the goal, the audience, and what you already have. I ask the annoying questions up front so we don't hit them halfway through." },
    { number: "02", title: "Script & Concept", description: "For AI ads: a short script and shot plan before anything is generated. For edits: a plan for the hook, structure, and pacing." },
    { number: "03", title: "Production", description: "AI generation, editing, grading, sound. You get a draft to react to, not a surprise at the end." },
    { number: "04", title: "Delivery & Revisions", description: "Final files in the formats you need, plus a set number of revision rounds included in the price." }
  ],

  // Pricing: change numbers and labels here. Anything marked "TODO" is a
  // placeholder — fill in a real price before launch.
  pricing: {
    note: "Final price depends on length, complexity, and number of revisions.",
    customNote: "Custom projects — let's talk.",
    tiers: [
      {
        id: "ai-reel",
        featured: true,
        title: "AI Reel",
        price: "$100",
        priceQualifier: "from",
        description: "One AI-produced video, script to delivery.",
        features: [
          "Script & concept included",
          "AI generation + hand-finishing",
          "Color grade & sound design",
          "2 revision rounds"
        ]
      },
      {
        id: "reel-pack",
        featured: false,
        title: "10-Reel Pack",
        price: "TODO",
        priceQualifier: "",
        description: "A batch of 10 short-form edits from your raw footage.",
        features: [
          "10 Reels / TikToks / Shorts",
          "Consistent style across the batch",
          "Captions included",
          "Revision rounds included"
        ]
      },
      {
        id: "monthly",
        featured: false,
        title: "Monthly Retainer",
        price: "TODO",
        priceQualifier: "/mo",
        description: "Ongoing short-form editing or AI ad production, monthly.",
        features: [
          "Set number of videos per month",
          "Priority turnaround",
          "One point of contact",
          "Cancel anytime"
        ]
      }
    ]
  },

  faq: [
    {
      q: "How long does a project take?",
      a: "A single AI Reel or short-form edit usually turns around in 3–5 business days. Larger batches or AI ad campaigns take longer — I'll give you a firm date after the brief."
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
      a: "Standard delivery is MP4 (H.264) in whatever aspect ratio your platform needs — vertical for Reels/TikTok/Shorts, horizontal or square on request."
    },
    {
      q: "How does payment work?",
      a: "50% upfront to start, 50% on final delivery. For monthly retainers, billing is monthly in advance."
    },
    {
      q: "How do I start?",
      a: "Fill in the contact form below or email me directly. Tell me what you need and I'll reply with next steps and a realistic timeline."
    }
  ]
};
