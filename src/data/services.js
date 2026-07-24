import {
  Code2,
  Smartphone,
  Boxes,
  Compass,
  BarChart3,
  GraduationCap,
  Users,
} from "lucide-react";

export const SERVICES = [
  {
    id: "software-development",
    icon: Code2,
    title: "Software Development",
    short: "Custom-built platforms engineered to your workflow.",
    description:
      "We design and build bespoke web platforms, internal tools, and SaaS products from the ground up — architected for scale, security, and speed of iteration.",
    capabilities: [
      "Custom web & SaaS platforms",
      "API design & microservices",
      "Legacy system modernization",
      "Cloud-native architecture",
    ],
  },
  {
    id: "app-development",
    icon: Smartphone,
    title: "App Development",
    short: "Native-feel mobile apps for iOS and Android.",
    description:
      "From concept to app store, we build cross-platform mobile experiences with the polish and performance users expect from native apps.",
    capabilities: [
      "iOS & Android (React Native)",
      "Offline-first architecture",
      "Push notifications & analytics",
      "App store deployment & support",
    ],
  },
  {
    id: "erp-solutions",
    icon: Boxes,
    title: "ERP Solutions",
    short: "Unify inventory, finance and operations in one system.",
    description:
      "We implement and customize enterprise resource planning systems that bring your inventory, finance, HR and operations into a single source of truth.",
    capabilities: [
      "Custom ERP implementation",
      "Inventory & supply chain modules",
      "Finance & payroll integration",
      "Multi-branch operations support",
    ],
  },
  {
    id: "it-consultancy",
    icon: Compass,
    title: "IT Consultancy",
    short: "Strategic technology guidance for growing teams.",
    description:
      "Our consultants work alongside your leadership to audit infrastructure, plan technology roadmaps, and de-risk large-scale digital transformation.",
    capabilities: [
      "Technology audits & roadmaps",
      "Vendor & stack selection",
      "Security & compliance review",
      "Digital transformation strategy",
    ],
  },
  {
    id: "data-analysis",
    icon: BarChart3,
    title: "Data Analysis",
    short: "Turn raw data into decisions leadership can act on.",
    description:
      "We build dashboards and analytics pipelines that surface the metrics that matter, so decisions are backed by evidence rather than instinct.",
    capabilities: [
      "BI dashboards & reporting",
      "Data pipeline engineering",
      "Predictive analytics",
      "KPI & metrics frameworks",
    ],
  },
  {
    id: "tech-training",
    icon: GraduationCap,
    title: "Tech Training",
    short: "Upskill your team with hands-on technical training.",
    description:
      "Structured, cohort-based training programs in modern software development, cloud infrastructure, and data tooling — built for working teams.",
    capabilities: [
      "Corporate developer bootcamps",
      "Cloud & DevOps certification prep",
      "Hands-on workshop delivery",
      "Custom curriculum design",
    ],
  },
  {
    id: "coaching",
    icon: Users,
    title: "Coaching",
    short: "1:1 and team coaching for engineering leaders.",
    description:
      "Executive and engineering-leadership coaching for founders and CTOs navigating team growth, architecture decisions, and delivery pressure.",
    capabilities: [
      "CTO & tech-lead coaching",
      "Engineering culture design",
      "Delivery process coaching",
      "Career-track mentorship",
    ],
  },
];
