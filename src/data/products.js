export const PRODUCTS = [
  {
    id: "curevirtual",
    name: "CureVirtual",
    tagline: "Telehealth infrastructure for patients, doctors and pharmacies.",
    description:
      "A five-module telehealth platform connecting patients, physicians, physician assistants, laboratories and pharmacies in one coordinated system — launching first in Ghana.",
    tags: ["Healthtech", "Telemedicine", "Flagship"],
    path: "/products/curevirtual",
    featured: true,
  },
  {
    id: "briams-erp",
    name: "Briams ERP",
    tagline: "Operations, inventory and finance in one dashboard.",
    description:
      "A modular ERP suite for mid-size enterprises, covering inventory, procurement, HR and finance with real-time reporting.",
    tags: ["Enterprise", "Operations"],
    path: "/services#erp-solutions",
    featured: false,
  },
  {
    id: "briams-insights",
    name: "Briams Insights",
    tagline: "Business intelligence dashboards, built for your data.",
    description:
      "Custom analytics dashboards that connect to your existing data sources and surface the KPIs your leadership team actually watches.",
    tags: ["Analytics", "BI"],
    path: "/services#data-analysis",
    featured: false,
  },
];

export const CURE_MODULES = [
  {
    id: "patient",
    title: "Patient",
    description:
      "Book appointments, video-consult with doctors, manage prescriptions and view lab results — all from one app.",
  },
  {
    id: "doctor",
    title: "Doctor",
    description:
      "A clinical workspace for consultations, e-prescriptions, patient history and referrals to laboratories or specialists.",
  },
  {
    id: "physician-assistant",
    title: "Physician Assistant",
    description:
      "Triage intake, manage patient queues, and support physicians with structured pre-consultation data collection.",
  },
  {
    id: "laboratory",
    title: "Laboratory",
    description:
      "Receive digital test orders, upload results directly to patient records, and coordinate sample logistics.",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description:
      "Fulfil e-prescriptions, manage stock levels, and coordinate delivery for patients ordering through the platform.",
  },
];

export const CURE_PRICING = [
  {
    id: "starter",
    name: "Clinic Starter",
    price: "$249",
    period: "/month",
    description: "For independent clinics onboarding their first telehealth workflow.",
    features: [
      "Up to 5 practitioner seats",
      "Patient & Doctor modules",
      "Video consultations",
      "Email support",
    ],
    highlighted: false,
  },
  {
    id: "network",
    name: "Care Network",
    price: "$799",
    period: "/month",
    description: "For hospital groups coordinating across facilities.",
    features: [
      "Up to 40 practitioner seats",
      "All 5 modules included",
      "Lab & pharmacy integrations",
      "Priority support & onboarding",
    ],
    highlighted: true,
  },
  {
    id: "national",
    name: "National Rollout",
    price: "Custom",
    period: "",
    description: "For government and national health programs.",
    features: [
      "Unlimited practitioner seats",
      "Dedicated infrastructure",
      "Custom regulatory compliance",
      "Dedicated success manager",
    ],
    highlighted: false,
  },
];
