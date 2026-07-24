export const BLOG_CATEGORIES = [
  "All",
  "Engineering",
  "Healthtech",
  "ERP & Cloud",
  "Product Design",
  "Case Studies",
];

export const BLOG_POSTS = [
  {
    id: "architecting-micro-frontends-for-enterprise-erp",
    slug: "architecting-micro-frontends-for-enterprise-erp",
    title: "Architecting Micro-Frontends for Enterprise ERP Systems",
    excerpt: "How modular frontend architecture accelerates deployment cycles and isolates feature failures in complex multi-tenant ERP platforms.",
    category: "Engineering",
    date: "July 18, 2026",
    readTime: "6 min read",
    author: {
      name: "Daniyal Farooq",
      role: "Principal Systems Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    featured: true,
    content: `
      Enterprise ERP systems frequently suffer from monolithic frontend drag. When multiple engineering teams push code to a single codebase, build pipelines stall and regression risks multiply exponentially.

      ### The Modular Breakdown
      By decomposing the ERP dashboard into isolated domain modules (Financials, Inventory, Supply Chain, Human Resources), teams gain independent deployment autonomy while sharing unified core styling and authentication tokens.

      ### Key Takeaways
      - **Shared Design System**: Unified Tailwind CSS tokens prevent design divergence.
      - **Runtime Module Federation**: Dynamic module loading at runtime reduces bundle size.
      - **Resilient State Management**: Brand and user context isolated at root provider level.
    `,
  },
  {
    id: "telehealth-infrastructure-scaling-healthcare-ghana",
    slug: "telehealth-infrastructure-scaling-healthcare-ghana",
    title: "How Telehealth Infrastructure is Scaling Healthcare Access in Ghana",
    excerpt: "A deep dive into CureVirtual's multi-module architecture connecting patients, doctors, labs, and pharmacies across remote regions.",
    category: "Healthtech",
    date: "July 10, 2026",
    readTime: "8 min read",
    author: {
      name: "Michael Osei",
      role: "Lead Healthtech Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    featured: false,
    content: `
      Connecting healthcare providers across regional hubs requires low-bandwidth optimization, end-to-end encryption, and offline-first queueing mechanism.

      CureVirtual's 5 core modules provide seamless handoffs between patient video consults, digital lab requisitions, and local pharmacy fulfillment.
    `,
  },
  {
    id: "zero-downtime-data-pipelines-nodejs-postgresql",
    slug: "zero-downtime-data-pipelines-nodejs-postgresql",
    title: "Building Zero-Downtime Data Pipelines with Node.js & PostgreSQL",
    excerpt: "Best practices for schema migrations, connection pooling, and optimistic locking in high-throughput enterprise applications.",
    category: "ERP & Cloud",
    date: "June 28, 2026",
    readTime: "5 min read",
    author: {
      name: "Amara Chen",
      role: "Staff Backend Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    featured: false,
    content: `
      Data pipeline reliability is non-negotiable for enterprise logistics and finance operations. Discover how we structure zero-downtime PostgreSQL migrations using shadow tables and transactional locks.
    `,
  },
  {
    id: "designing-clinical-ux-lessons-curevirtual",
    slug: "designing-clinical-ux-lessons-curevirtual",
    title: "Designing Clinical UX: Lessons Learned from CureVirtual Platform",
    excerpt: "Minimizing cognitive load for medical staff during emergency video consults through intuitive interface patterns.",
    category: "Product Design",
    date: "June 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Sarah Jenkins",
      role: "Lead Product Designer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    featured: false,
    content: `
      High-stress medical environments demand frictionless interfaces. Learn how human-centered design principles guided the creation of CureVirtual's doctor and physician assistant consoles.
    `,
  },
  {
    id: "real-time-logistics-tracking-websockets-redis",
    slug: "real-time-logistics-tracking-websockets-redis",
    title: "The Future of Real-Time Logistics Tracking with WebSockets & Redis",
    excerpt: "Scaling fleet tracking across 6 regions with sub-second latency using Redis pub/sub and WebSocket streaming.",
    category: "Case Studies",
    date: "June 02, 2026",
    readTime: "6 min read",
    author: {
      name: "Priya Nair",
      role: "DevOps & Infrastructure Lead",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    },
    featured: false,
    content: `
      Real-time vehicle position streaming for 500+ active transport trucks requires high-concurrency pub/sub pipelines and client-side interpolation.
    `,
  },
];
