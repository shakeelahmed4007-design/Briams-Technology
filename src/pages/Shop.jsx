import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, viewportOnce } from "../animations/variants";
import Button from "../components/ui/Button";

const SHOP_ITEMS = [
  {
    id: "cure-virtual-starter",
    title: "CureVirtual Clinic Infrastructure Kit",
    category: "Software License",
    price: "$4,999",
    billing: "one-time setup",
    description: "Complete telehealth setup for multi-provider clinic networks including patient booking, video consults, and e-prescriptions.",
    features: [
      "Patient & Doctor portals",
      "E-Prescription generator",
      "HIPAA / GDPR compliance suite",
      "1-Year updates & support",
    ],
    popular: true,
  },
  {
    id: "erp-starter-suite",
    title: "Briams Enterprise ERP Core",
    category: "Architecture Blueprint",
    price: "$7,500",
    billing: "starting license",
    description: "Modular ERP foundation with inventory management, core financial ledger, role-based access control, and reporting dashboard.",
    features: [
      "Multi-tenant data isolation",
      "Audit logging & compliance",
      "PostgreSQL + Node.js backend",
      "Custom UI design system",
    ],
    popular: false,
  },
  {
    id: "cloud-devops-blueprint",
    title: "Multi-Region Cloud & DevOps Architecture",
    category: "Infrastructure",
    price: "$2,800",
    billing: "per implementation",
    description: "Terraform + Kubernetes infrastructure templates for zero-downtime deployment pipelines, auto-scaling, and failover.",
    features: [
      "AWS / GCP Terraform scripts",
      "Kubernetes helm charts",
      "Prometheus & Grafana monitors",
      "Automated CI/CD workflows",
    ],
    popular: false,
  },
];

export default function Shop() {
  return (
    <>
      <Helmet>
        <title>Shop & Products — Briams Technologies</title>
        <meta
          name="description"
          content="Enterprise software licenses, ERP blueprints, and infrastructure modules built by Briams Technologies."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-40 pb-16 relative bg-bg border-b border-card-border overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-briams-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-section relative z-10 text-center flex flex-col items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-blue font-bold mb-6 bg-gradient-to-r from-briams-cyan/15 via-briams-blue/10 to-briams-orange/15 border border-briams-cyan/30 px-3.5 py-1.5 rounded-full shadow-xs">
              Solutions & Licenses
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tight">
              Pre-built <span className="text-gradient-cta font-extrabold">enterprise software</span> & blueprints.
            </h1>
            <p className="mt-6 text-lg text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
              Accelerate your time to market with production-tested telehealth, ERP, and cloud infrastructure modules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="section-padding bg-bg">
        <div className="container-section">
          <div className="grid md:grid-cols-3 gap-8">
            {SHOP_ITEMS.map((item, index) => {
              const priceGradients = ["text-gradient-cta", "text-gradient-tech", "text-gradient-emerald"];
              const pGradient = priceGradients[index % priceGradients.length];
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-3xl bg-surface p-8 border ${
                    item.popular ? "border-briams-orange shadow-xl relative" : "border-card-border"
                  } flex flex-col justify-between group hover:border-briams-blue/40 transition-all duration-300`}
                >
                  <div>
                    {item.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-briams-orange to-briams-gold text-white text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-briams-blue">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-text-primary mt-2 group-hover:text-briams-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-text-secondary font-medium leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-card-border">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-display font-bold ${pGradient}`}>
                          {item.price}
                        </span>
                        <span className="text-xs text-text-secondary font-semibold">
                          / {item.billing}
                        </span>
                      </div>

                      <ul className="mt-6 space-y-3">
                        {item.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary font-medium">
                            <Check size={16} className="text-cure-green shrink-0 font-bold" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                <div className="pt-8">
                  <Button to="/book-consultation" size="md" className="w-full justify-center">
                    Inquire Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </section>
    </>
  );
}
