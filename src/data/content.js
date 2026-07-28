export const STATS = [
  { id: "projects", label: "Projects delivered", value: 128, suffix: "+" },
  { id: "clients", label: "Clients served", value: 64, suffix: "+" },
  { id: "years", label: "Years in operation", value: 9, suffix: "" },
  { id: "uptime", label: "Platform uptime", value: 99, suffix: ".9%" },
];

export const CLIENTS = [
  "NorthBridge Capital",
  "Meridian Health Group",
  "Alpine Retail Co.",
  "Falcon Logistics",
  "Coastal Bank",
  "Summit Energy",
  "Vantage Insurance",
  "Harborline Freight",
];

export const CASE_STUDIES = [
  {
    id: "meridian-health",
    client: "Meridian Health Group",
    industry: "Healthtech",
    title: "Rebuilding patient intake for a 12-clinic network",
    description: "We replaced a fragmented paper-based intake workflow with a unified digital platform, cutting onboarding time nearly in half and eliminating manual data-entry errors across all 12 clinic locations.",
    result: "42% faster patient onboarding",
    tag: "Healthtech · ERP",
  },
  {
    id: "coastal-bank",
    client: "Coastal Bank",
    industry: "Fintech",
    title: "A compliance-first core banking dashboard",
    description: "A real-time reconciliation dashboard built for regulatory compliance — surfacing audit trails, transaction anomalies, and daily balances in a single view that cut reconciliation time by 3×.",
    result: "3x faster reconciliation",
    tag: "Fintech · Data",
  },
  {
    id: "falcon-logistics",
    client: "Falcon Logistics",
    industry: "Logistics",
    title: "Real-time fleet visibility across 6 regions",
    description: "Built a WebSocket-powered fleet tracking system with Redis pub/sub for sub-second vehicle position updates across six regional hubs, reducing delivery delays and improving dispatch efficiency.",
    result: "18% reduction in delivery delays",
    tag: "Logistics · App",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Chen",
    role: "COO, Meridian Health Group",
    quote:
      "Briams rebuilt our intake system in under four months and it hasn't gone down once since launch. They think like operators, not just contractors.",
  },
  {
    id: 2,
    name: "Daniyal Farooq",
    role: "CTO, Coastal Bank",
    quote:
      "The most rigorous engineering team we've worked with. Every architecture decision came with a written trade-off analysis.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Founder, Falcon Logistics",
    quote:
      "Our fleet dashboard is now the first thing our dispatch team opens every morning. It just works, at scale, every day.",
  },
  {
    id: 4,
    name: "Michael Osei",
    role: "Program Director, Ghana Health Initiative",
    quote:
      "CureVirtual let us reach patients in regions with a single clinic per hundred kilometers. That's not a feature, that's the mission.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We audit your current systems, interview stakeholders, and define the problem precisely before writing a line of code.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture and interface design happen in parallel — every technical decision is validated against real user flows.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Agile delivery in two-week cycles, with staging environments you can review at every milestone.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Production rollout with monitoring, documentation, and a support plan — not a handoff and goodbye.",
  },
  {
    step: "05",
    title: "Scale",
    description:
      "Ongoing partnership for performance tuning, new features, and infrastructure that grows with your user base.",
  },
];

export const TECH_STACK = [
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "Python",
  "Redis",
  "Terraform",
  "Figma",
];

export const FAQ = [
  {
    q: "What industries do you typically work with?",
    a: "We work most often with healthcare, fintech, logistics and retail clients — but our core discipline is enterprise software architecture, which transfers across industries.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Most platform builds run 3–6 months from discovery to launch. ERP implementations and CureVirtual rollouts are scoped individually based on complexity.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Every engagement includes a support plan, and most clients move into a retained partnership for continued feature work and infrastructure management.",
  },
  {
    q: "Can you work with our existing engineering team?",
    a: "Absolutely — we regularly embed alongside in-house teams, either leading specific workstreams or providing architectural oversight.",
  },
  {
    q: "What does a Book Consultation call actually cover?",
    a: "A 30-minute call with a senior consultant to understand your goals, flag risks early, and recommend whether you need a full build, an ERP implementation, or a lighter advisory engagement.",
  },
];

export const CURE_FAQ = [
  {
    q: "Is CureVirtual available outside Ghana?",
    a: "Ghana is our first national launch market. We're actively scoping expansion into neighbouring regions based on regulatory readiness.",
  },
  {
    q: "Does CureVirtual integrate with existing hospital systems?",
    a: "Yes — the platform exposes APIs for EHR integration, and our team supports custom integration work during onboarding.",
  },
  {
    q: "How is patient data secured?",
    a: "Patient data is encrypted at rest and in transit, with role-based access control across all five modules.",
  },
  {
    q: "Can pharmacies join without an existing digital system?",
    a: "Yes — the Pharmacy module is designed to be a pharmacy's first digital system, with minimal setup required.",
  },
];
