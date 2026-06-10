export type InfoPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  question: string;
  updatedAt: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const defaultUpdatedAt = "January 1, 2026";

export const infoPages = {
  about: {
    slug: "about",
    title: "About",
    eyebrow: "ABOUT",
    question: "WHO WE ARE?",
    updatedAt: defaultUpdatedAt,
    intro:
      "XXXTREME is a high-voltage festival experience built around music, community, and unforgettable nights in Varna, BG.",
    sections: [
      {
        heading: "What we do",
        body:
          "We bring artists, party crews, and festival guests into one loud, visual, late-night world with limited access moments and main-stage energy.",
      },
      {
        heading: "Our promise",
        body:
          "Clear information, safe entry flow, and a direct route to the people who want to be part of the next edition.",
      },
    ],
  },
  rules: {
    slug: "rules",
    title: "Rules",
    eyebrow: "RULES",
    question: "HOUSE RULES",
    updatedAt: defaultUpdatedAt,
    intro:
      "These default rules keep the event clear, safe, and comfortable for every guest.",
    sections: [
      {
        heading: "Entry",
        body:
          "Bring a valid ticket, confirmation, and government-issued ID. Entry may be refused when information cannot be verified.",
      },
      {
        heading: "Inside the venue",
        body:
          "Respect the staff, artists, venue, and other guests. Dangerous items, harassment, and disruptive behavior are not allowed.",
      },
      {
        heading: "Changes",
        body:
          "Line-up, timing, venue rules, and access zones may change when required by production, safety, or local regulation.",
      },
    ],
  },
  faq: {
    slug: "faq",
    title: "FAQ",
    eyebrow: "FAQ",
    question: "COMMON QUESTIONS",
    updatedAt: defaultUpdatedAt,
    intro:
      "Use this page as a quick default reference for the most common festival questions.",
    sections: [
      {
        heading: "Where is the event?",
        body:
          "The event is planned for Varna, BG. Final venue information and access details will be shared through official channels.",
      },
      {
        heading: "Can I transfer my ticket?",
        body:
          "Ticket transfer availability depends on the ticket provider and the current event rules.",
      },
      {
        heading: "How do I contact support?",
        body:
          "Use the official contact forms or social links listed on the website footer.",
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "PRIVACY POLICY",
    question: "YOUR DATA",
    updatedAt: defaultUpdatedAt,
    intro:
      "This default privacy policy explains how festival-related information may be collected and used.",
    sections: [
      {
        heading: "Information we collect",
        body:
          "We may collect contact details, ticket-related information, form submissions, and basic website analytics.",
      },
      {
        heading: "How we use it",
        body:
          "We use information to process requests, send event updates, improve the website, and support guest communication.",
      },
      {
        heading: "Retention",
        body:
          "Information is kept only as long as reasonably needed for event operations, legal obligations, or support history.",
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund Policy",
    eyebrow: "REFUND POLICY",
    question: "REFUNDS",
    updatedAt: defaultUpdatedAt,
    intro:
      "This default refund policy gives general guidance for tickets, passes, and festival access.",
    sections: [
      {
        heading: "Standard refunds",
        body:
          "Refund eligibility depends on the ticket type, purchase channel, and announced event terms.",
      },
      {
        heading: "Event changes",
        body:
          "Schedule, artist, or venue adjustments do not automatically guarantee a refund unless required by applicable terms.",
      },
      {
        heading: "Requests",
        body:
          "Refund requests should include order details, contact information, and the reason for the request.",
      },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    eyebrow: "COOKIE POLICY",
    question: "COOKIES",
    updatedAt: defaultUpdatedAt,
    intro:
      "This default cookie policy explains how the website may use cookies and similar technologies.",
    sections: [
      {
        heading: "What cookies do",
        body:
          "Cookies help the site remember preferences, measure traffic, and keep forms or navigation working smoothly.",
      },
      {
        heading: "Analytics",
        body:
          "Analytics cookies may be used to understand aggregate behavior and improve future site updates.",
      },
      {
        heading: "Control",
        body:
          "You can manage cookies through your browser settings. Some features may work differently when cookies are disabled.",
      },
    ],
  },
} satisfies Record<string, InfoPageContent>;
