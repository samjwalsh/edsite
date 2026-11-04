// Single source of truth for business details. Everything placeholder-ish lives here.

export const site = {
  url: "https://example.com",
  name: "Business Name Loss Assessors",
  shortName: "Business Name",
  tagline: "Independent loss assessors working for you, not your insurer.",
  description:
    "Independent loss assessors handling fire, flood, storm and burglary insurance claims for homeowners and businesses.",

  phone: "+353 1 234 5678", // display format
  phoneHref: "tel:+35312345678", // dialable format
  email: "info@example.com",

  // Shown in the footer and used for LocalBusiness structured data. Leave fields "" to omit.
  address: {
    street: "",
    locality: "Dublin",
    region: "Co. Dublin",
    postalCode: "",
    country: "IE",
  },
  hours: "Mon–Fri 9:00–17:30, emergency calls 24/7",

  // Trust signals shown in the footer/about page, e.g. memberships, authorisation numbers.
  credentials: [] as string[],

  // Umami analytics. Leave websiteId empty to disable tracking.
  analytics: {
    umamiScript: "https://stats.example.com/script.js",
    websiteId: "",
  },
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/blog", label: "Advice" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
