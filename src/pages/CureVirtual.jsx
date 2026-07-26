import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  Pill,
  MapPin,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { fadeUp, fadeIn, scaleIn, slideRight, viewportOnce } from "../animations/variants";
import { CURE_MODULES, CURE_PRICING } from "../data/products";
import { CURE_FAQ, TESTIMONIALS } from "../data/content";
import GlassCard from "../components/ui/GlassCard";
import FAQAccordion from "../components/ui/FAQAccordion";
import Button from "../components/ui/Button";

const MODULE_ICONS = {
  patient: HeartPulse,
  doctor: Stethoscope,
  "physician-assistant": ClipboardList,
  laboratory: FlaskConical,
  pharmacy: Pill,
};

const FEATURE_ROWS = [
  { feature: "Video consultations", starter: true, network: true, national: true },
  { feature: "E-prescriptions", starter: true, network: true, national: true },
  { feature: "Lab result integration", starter: false, network: true, national: true },
  { feature: "Pharmacy fulfilment", starter: false, network: true, national: true },
  { feature: "Multi-facility coordination", starter: false, network: true, national: true },
  { feature: "Custom regulatory compliance", starter: false, network: false, national: true },
  { feature: "Dedicated success manager", starter: false, network: false, national: true },
];

export default function CureVirtual() {
  return (
    <>
      <Helmet>
        <title>CureVirtual — Telehealth infrastructure by Briams Technologies</title>
        <meta
          name="description"
          content="CureVirtual connects patients, doctors, physician assistants, laboratories and pharmacies in one telehealth platform — launching first in Ghana."
        />
      </Helmet>

      <CureHero />
      <ProblemStatement />
      <ModulesSection />
      <GhanaLaunch />
      <PricingSection />
      <FeatureComparisonSection />
      <ScreenshotsSection />
      <BenefitsSection />
      <CureTestimonials />
      <CureFAQSection />
      <WaitlistSection />
      <CureCreditLine />
    </>
  );
}

/* ---------------- Hero ---------------- */
function CureHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 bg-bg">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cure-navy/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-section relative z-10 text-center flex flex-col items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-4xl w-full">
          {/* Prominent CureVirtual Logo - Full Color on White */}
          <div className="mb-8 inline-flex items-center gap-3.5 px-6 py-3 rounded-2xl bg-white border border-card-border shadow-md">
            <div className="w-11 h-11 rounded-xl bg-cure-navy text-white flex items-center justify-center font-display font-bold text-xl shadow-sm">
              <HeartPulse size={24} className="text-cure-orange" />
            </div>
            <div className="text-left">
              <span className="font-display font-bold text-2xl tracking-tight text-cure-navy block leading-none">
                Cure<span className="text-cure-orange">Virtual</span>
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cure-green block mt-1">
                Telehealth Infrastructure
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cure-green/10 border border-cure-green/30 text-xs font-mono uppercase tracking-wider text-cure-green mb-8 font-bold shadow-xs ml-3">
            <HeartPulse size={14} className="text-cure-green" />
            Verified Infrastructure
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] text-cure-navy">
            Care shouldn't depend on{" "}
            <span className="text-gradient-cta font-extrabold">how far</span> the nearest
            clinic is.
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            CureVirtual connects <span className="text-briams-blue font-semibold">patients</span>, <span className="text-cure-green font-semibold">doctors</span>, <span className="text-briams-orange font-semibold">physician assistants</span>,
            <span className="text-briams-cyan font-semibold">laboratories</span> and <span className="text-purple-600 font-semibold">pharmacies</span> into one coordinated telehealth
            system — launching first in Ghana.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-5">
            <Button to="#waitlist" size="lg" className="!bg-cure-orange !shadow-glow-orange hover:!shadow-[0_10px_30px_rgba(242,113,31,0.3)]">
              Join the waitlist
            </Button>
            <Button href="#modules" variant="secondary" size="lg" icon={false}>
              Explore the modules
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Problem Statement ---------------- */
function ProblemStatement() {
  const stats = [
    { value: "1:5,000+", label: "patients per doctor in underserved regions", gradient: "text-gradient-cure" },
    { value: "40km+", label: "average distance to the nearest specialist", gradient: "text-gradient-cta" },
    { value: "60%", label: "of referrals never reach the specialist", gradient: "text-gradient-tech" },
  ];
  return (
    <section className="section-padding bg-surface border-t border-card-border">
      <div className="container-section text-center">
        <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-cure-green mb-6 font-bold bg-cure-green/10 border border-cure-green/20 px-3.5 py-1 rounded-full shadow-xs">
          The Problem
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cure-navy tracking-tight max-w-2xl mx-auto">
          Specialist care is <span className="text-gradient-cure font-extrabold">concentrated</span> where population isn't.
        </h2>
        <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto font-medium">
          In much of Ghana and comparable regions, a single referral can mean a full day of travel — and many patients simply don't make the trip.
        </p>

        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <GlassCard className="p-8 h-full flex flex-col items-center justify-center text-center">
                <span className={`text-4xl sm:text-5xl font-display font-bold ${s.gradient}`}>
                  {s.value}
                </span>
                <p className="mt-3 text-sm font-semibold text-text-secondary leading-snug">
                  {s.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Modules ---------------- */
function ModulesSection() {
  return (
    <section id="modules" className="section-padding bg-bg relative">
      <div className="container-section relative z-10">
        <div className="text-center">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-cure-navy mb-6 font-semibold">
            Five modules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cure-navy tracking-tight max-w-2xl mx-auto">
            One platform, every role in the care chain
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto font-medium">
            Each module is a focused workspace for one role — connected by shared patient records and referral flows.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURE_MODULES.map((m, i) => {
            const Icon = MODULE_ICONS[m.id];
            const moduleThemes = [
              { iconBg: "bg-blue-500/10 text-blue-600 border-blue-500/20", hoverBorder: "hover:border-blue-500/40", hoverTitle: "group-hover:text-blue-600" },
              { iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", hoverBorder: "hover:border-emerald-500/40", hoverTitle: "group-hover:text-emerald-600" },
              { iconBg: "bg-purple-500/10 text-purple-600 border-purple-500/20", hoverBorder: "hover:border-purple-500/40", hoverTitle: "group-hover:text-purple-600" },
              { iconBg: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20", hoverBorder: "hover:border-cyan-500/40", hoverTitle: "group-hover:text-cyan-600" },
              { iconBg: "bg-orange-500/10 text-orange-600 border-orange-500/20", hoverBorder: "hover:border-orange-500/40", hoverTitle: "group-hover:text-orange-600" },
            ];
            const theme = moduleThemes[i % moduleThemes.length];

            return (
              <motion.div
                key={m.id}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GlassCard className={`p-8 h-full group bg-white border border-card-border ${theme.hoverBorder} transition-all duration-300 shadow-xs hover:shadow-lg`}>
                  <div className={`w-14 h-14 rounded-2xl border ${theme.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xs`}>
                    <Icon size={26} />
                  </div>
                  <h3 className={`text-xl font-bold text-cure-navy tracking-tight ${theme.hoverTitle} transition-colors`}>
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-text-secondary font-medium leading-relaxed">
                    {m.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ghana Launch ---------------- */
function GhanaLaunch() {
  return (
    <section className="section-padding bg-surface border-y border-card-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cure-green/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container-section relative grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div variants={slideRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cure-green/10 border border-cure-green/30 text-xs font-mono uppercase tracking-wider text-cure-green mb-6 font-bold shadow-xs">
            <MapPin size={14} className="text-cure-green" />
            Launch market
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-cure-navy leading-[1.1] tracking-tight">
            Launching first in <span className="text-gradient-cta font-extrabold">Ghana</span>, in partnership with regional health
            networks.
          </h2>
          <p className="mt-6 text-text-secondary font-medium text-lg leading-relaxed max-w-lg">
            We chose Ghana as our first national rollout because of its
            growing mobile-health infrastructure and strong regional clinic
            networks — a foundation CureVirtual can build directly on top of.
          </p>
        </motion.div>
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <div className="rounded-3xl bg-white border border-card-border shadow-md p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Launch region", value: "Greater Accra", gradient: "text-gradient-cure" },
                { label: "Partner clinics", value: "18 at launch", gradient: "text-gradient-cta" },
                { label: "Target reach", value: "250k+ patients", gradient: "text-gradient-tech" },
                { label: "Modules live", value: "All 5", gradient: "text-gradient-emerald" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-3 rounded-2xl bg-surface/60 border border-card-border hover:border-cure-green/30 transition-all cursor-default"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.1em] text-text-secondary font-bold">
                    {item.label}
                  </p>
                  <p className={`mt-2 text-2xl sm:text-3xl font-display font-extrabold ${item.gradient}`}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-bg relative">
      <div className="container-section">
        <div className="text-center">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-cure-green mb-6 font-bold bg-cure-green/10 border border-cure-green/20 px-3.5 py-1 rounded-full shadow-xs">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cure-navy tracking-tight max-w-2xl mx-auto">
            Pricing that <span className="text-gradient-cure font-extrabold">scales</span> with your network
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto font-medium">
            From a single clinic to a national rollout — choose the tier that matches your reach.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 items-stretch">
          {CURE_PRICING.map((tier, i) => {
            const priceGradients = ["text-gradient-cta", "text-gradient-cure", "text-gradient-tech"];
            const pGradient = priceGradients[i % priceGradients.length];

            return (
              <motion.div
                key={tier.id}
                variants={scaleIn}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div
                  className={`h-full rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 bg-white ${
                    tier.highlighted
                      ? "border-2 border-cure-orange shadow-xl relative"
                      : "border border-card-border shadow-sm hover:border-cure-navy/40"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="self-start mb-6 text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cure-orange to-briams-gold text-white font-extrabold shadow-md">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-cure-navy">
                    {tier.name}
                  </h3>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className={`text-4xl font-display font-extrabold ${pGradient}`}>
                      {tier.price}
                    </span>
                    <span className="text-sm font-semibold text-text-secondary">
                      {tier.period}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] font-medium text-text-secondary leading-relaxed">
                    {tier.description}
                  </p>
                  <ul className="mt-8 space-y-4 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[15px] font-medium">
                        <Check
                          size={18}
                          className={tier.highlighted ? "text-cure-orange font-bold" : "text-cure-green font-bold"}
                        />
                        <span className="text-text-primary font-medium">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Button
                      to="#waitlist"
                      size="lg"
                      className={`w-full justify-center ${
                        tier.highlighted 
                        ? "!bg-cure-orange text-white border-transparent hover:!shadow-[0_10px_20px_rgba(242,113,31,0.2)]" 
                        : "variant-secondary"
                      }`}
                    >
                      Get started
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature Comparison ---------------- */
function FeatureComparisonSection() {
  return (
    <section className="section-padding bg-surface border-y border-card-border">
      <div className="container-section max-w-5xl">
        <h2 className="text-3xl font-display font-bold text-cure-navy mb-12 text-center">
          Feature comparison across tiers
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl border border-card-border shadow-sm">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left py-5 px-6 text-sm font-mono tracking-wider uppercase text-text-muted">
                  Feature
                </th>
                <th className="py-5 px-4 text-sm font-mono tracking-wider uppercase text-text-muted">Starter</th>
                <th className="py-5 px-4 text-sm font-mono tracking-wider uppercase text-cure-navy font-bold">Network</th>
                <th className="py-5 px-4 text-sm font-mono tracking-wider uppercase text-text-muted">National</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-card-border/50 hover:bg-surface transition-colors">
                  <td className="py-5 px-6 text-[15px] font-medium text-text-primary">{row.feature}</td>
                  <Cell value={row.starter} />
                  <Cell value={row.network} />
                  <Cell value={row.national} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Cell({ value }) {
  return (
    <td className="py-5 text-center">
      {value ? (
        <Check size={20} className="text-cure-green inline" />
      ) : (
        <X size={18} className="text-text-muted/30 inline" />
      )}
    </td>
  );
}

/* ---------------- Screenshots / Interactive App Preview ---------------- */
function ScreenshotsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [doctorMuted, setDoctorMuted] = useState(false);
  const [labToast, setLabToast] = useState(false);
  const [signatureVerified, setSignatureVerified] = useState(true);
  const [pharmacyStatus, setPharmacyStatus] = useState({ amox: "Ready", para: "Processing" });
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const filterTabs = ["All", "Patient", "Doctor", "Lab", "Pharmacy"];

  return (
    <section className="section-padding bg-bg relative">
      {/* Toast Notification */}
      {labToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-cure-navy text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-bounce">
          <FlaskConical className="text-cure-green" size={20} />
          <div>
            <p className="text-xs font-bold">Lab Requisition Sent!</p>
            <p className="text-[11px] text-white/70">Order #LR-443 queued at Accra Central Lab</p>
          </div>
        </div>
      )}

      {/* Consult Room Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-cure-navy text-white w-full max-w-xl rounded-3xl p-6 border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setConsultModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-cure-green/20 text-cure-green text-xs font-mono font-bold uppercase tracking-wider">
                Active Consult Session
              </span>
              <h3 className="text-2xl font-bold font-display">Dr. K. Mensah Video Room</h3>
              <div className="aspect-video bg-black/40 rounded-2xl flex flex-col items-center justify-center p-6 border border-white/10 relative">
                <HeartPulse size={48} className="text-cure-green animate-pulse mb-2" />
                <p className="text-sm font-semibold">Video Stream Active (1080p Encrypted)</p>
                <p className="text-xs text-white/60 font-mono mt-1">Duration: 04:12</p>
              </div>
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => setDoctorMuted(!doctorMuted)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    doctorMuted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {doctorMuted ? "Unmute Microphone" : "Mute Microphone"}
                </button>
                <button
                  onClick={() => setConsultModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cure-orange text-white text-xs font-bold hover:bg-cure-orange/90"
                >
                  End Call Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-cure-navy w-full max-w-sm rounded-3xl p-6 border border-card-border shadow-2xl text-center relative space-y-4">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-cure-navy"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-bold font-display">Pharmacy Pickup QR</h3>
            <div className="p-6 bg-surface rounded-2xl border border-card-border flex flex-col items-center justify-center">
              <div className="w-36 h-36 bg-cure-navy text-white rounded-xl flex items-center justify-center font-mono font-bold text-xs p-4 text-center border-4 border-cure-orange">
                [ QR CODE #CV-9021 ]
              </div>
              <p className="text-xs font-mono font-bold text-cure-orange mt-3">Ref: CV-9021-ACCRA</p>
            </div>
            <p className="text-xs text-text-secondary">Scan this code at Ridge Hospital Pharmacy counter for priority pickup.</p>
          </div>
        </div>
      )}

      <div className="container-section">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-cure-navy mb-4 font-semibold">
            Interactive Product Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cure-navy tracking-tight">
            Inside the CureVirtual app
          </h2>
          <p className="mt-4 text-text-secondary text-base font-medium">
            Click any button, card, or action below to test live interactive app workflows.
          </p>

          {/* Responsive Category Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab
                    ? "bg-cure-navy text-white shadow-md"
                    : "bg-white text-text-secondary hover:text-cure-navy border border-card-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Screen 1: Patient Dashboard */}
          {(activeFilter === "All" || activeFilter === "Patient") && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="rounded-3xl bg-white shadow-md border border-card-border overflow-hidden flex flex-col group hover:shadow-xl hover:border-cure-navy/30 transition-all duration-500"
            >
              <div className="p-4 bg-cure-navy text-white flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
                  Patient App
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cure-green animate-pulse" />
              </div>
              
              <div className="p-5 flex-1 space-y-4 bg-surface/50 text-left">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-cure-navy/10 text-cure-navy font-bold flex items-center justify-center text-sm">
                    AK
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Welcome back</p>
                    <p className="text-sm font-bold text-cure-navy">Abena Kumi</p>
                  </div>
                </div>

                {/* Consultation Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-card-border shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono uppercase font-bold text-cure-green bg-cure-green/10 px-2 py-0.5 rounded-full">
                      Video Consult
                    </span>
                    <span className="text-text-muted">Today, 10:30 AM</span>
                  </div>
                  <p className="text-xs font-bold text-cure-navy">Dr. K. Mensah (General Practice)</p>
                  <button
                    onClick={() => setConsultModalOpen(true)}
                    className="w-full py-2 rounded-xl bg-cure-orange text-white text-xs font-bold hover:bg-cure-orange/90 transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    Join Consult Room
                  </button>
                </div>

                {/* Vitals */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-card-border text-center hover:border-cure-green transition-colors cursor-pointer">
                    <p className="text-[10px] text-text-muted uppercase font-mono font-bold">Heart Rate</p>
                    <p className="text-sm font-bold text-cure-navy mt-0.5">72 bpm</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-card-border text-center hover:border-cure-green transition-colors cursor-pointer">
                    <p className="text-[10px] text-text-muted uppercase font-mono font-bold">BP</p>
                    <p className="text-sm font-bold text-cure-navy mt-0.5">118 / 78</p>
                  </div>
                </div>

                <div
                  onClick={() => alert("E-Prescription #EP-104: Amoxicillin 500mg verified by Accra Central Lab.")}
                  className="p-3 rounded-xl bg-white border border-card-border flex items-center justify-between text-xs cursor-pointer hover:border-cure-navy/30 transition-colors"
                >
                  <span className="font-medium text-text-primary">E-Prescription</span>
                  <span className="text-cure-green font-bold">Active (Tap view)</span>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-card-border text-center">
                <span className="text-xs font-bold text-cure-navy">Patient Dashboard</span>
              </div>
            </motion.div>
          )}

          {/* Screen 2: Doctor Consultation View */}
          {(activeFilter === "All" || activeFilter === "Doctor") && (
            <motion.div
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="rounded-3xl bg-white shadow-md border border-card-border overflow-hidden flex flex-col group hover:shadow-xl hover:border-cure-navy/30 transition-all duration-500"
            >
              <div className="p-4 bg-cure-navy text-white flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
                  Doctor Console
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-semibold">
                  LIVE 08:42
                </span>
              </div>

              <div className="p-5 flex-1 space-y-4 bg-surface/50 text-left">
                {/* Simulated Video Window */}
                <div
                  onClick={() => setConsultModalOpen(true)}
                  className="aspect-video rounded-2xl bg-cure-navy relative overflow-hidden flex items-center justify-center text-white cursor-pointer group/video"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cure-navy via-transparent to-transparent" />
                  <div className="text-center relative z-10 space-y-1">
                    <HeartPulse className="mx-auto text-cure-green animate-pulse" size={24} />
                    <p className="text-xs font-semibold text-white/90 group-hover/video:underline">
                      Tap to Expand Call
                    </p>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-[10px] text-white font-mono">
                    Abena Kumi (32y)
                  </div>
                </div>

                {/* Clinical Notes Summary */}
                <div className="p-3.5 rounded-2xl bg-white border border-card-border shadow-sm space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold">
                    Chief Complaint
                  </p>
                  <p className="text-xs text-text-primary font-medium">
                    Acute fever (38.5°C) for 2 days with fatigue.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setLabToast(true);
                    setTimeout(() => setLabToast(false), 4000);
                  }}
                  className="w-full p-3 rounded-xl bg-cure-green/10 border border-cure-green/20 flex items-center justify-between text-xs hover:bg-cure-green/20 transition-all active:scale-95 cursor-pointer"
                >
                  <span className="font-bold text-cure-green">Order Lab Test</span>
                  <FlaskConical size={16} className="text-cure-green" />
                </button>
              </div>

              <div className="p-4 bg-white border-t border-card-border text-center">
                <span className="text-xs font-bold text-cure-navy">Doctor Consultation View</span>
              </div>
            </motion.div>
          )}

          {/* Screen 3: Lab Results Feed */}
          {(activeFilter === "All" || activeFilter === "Lab") && (
            <motion.div
              variants={fadeUp}
              custom={0.16}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="rounded-3xl bg-white shadow-md border border-card-border overflow-hidden flex flex-col group hover:shadow-xl hover:border-cure-navy/30 transition-all duration-500"
            >
              <div className="p-4 bg-cure-navy text-white flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
                  Lab Portal
                </span>
                <FlaskConical size={16} className="text-cure-green" />
              </div>

              <div className="p-5 flex-1 space-y-4 bg-surface/50 text-left">
                <div className="p-3 rounded-xl bg-white border border-card-border">
                  <p className="text-[10px] text-text-muted font-mono uppercase font-bold">Lab Requisition #LR-442</p>
                  <p className="text-xs font-bold text-cure-navy mt-0.5">Accra Regional Central Lab</p>
                </div>

                {/* Lab Items */}
                <div className="space-y-2">
                  <div
                    onClick={() => alert("Malaria RDT Result: Negative. Sample collected at 09:15 AM.")}
                    className="p-3 rounded-2xl bg-white border border-card-border shadow-sm flex items-center justify-between cursor-pointer hover:border-cure-green/50 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-text-primary">Malaria RDT</p>
                      <p className="text-[10px] text-text-muted">Tap for lab specs</p>
                    </div>
                    <span className="text-xs font-bold text-cure-green bg-cure-green/10 px-2 py-0.5 rounded-full">
                      Negative
                    </span>
                  </div>

                  <div
                    onClick={() => alert("Full Blood Count Result: Hemoglobin 13.5 g/dL, WBC 6.2 k/uL (Normal Range).")}
                    className="p-3 rounded-2xl bg-white border border-card-border shadow-sm flex items-center justify-between cursor-pointer hover:border-cure-navy/40 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-text-primary">Full Blood Count</p>
                      <p className="text-[10px] text-text-muted">Tap for lab specs</p>
                    </div>
                    <span className="text-xs font-bold text-cure-navy bg-cure-navy/10 px-2 py-0.5 rounded-full">
                      Normal
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setSignatureVerified(!signatureVerified)}
                  className="p-3 rounded-xl bg-white border border-card-border flex items-center justify-between text-xs cursor-pointer hover:bg-surface transition-colors"
                >
                  <span className="text-text-muted font-medium">Digital Signature</span>
                  {signatureVerified ? (
                    <span className="text-cure-green font-bold flex items-center gap-1">
                      <Check size={14} /> Signed
                    </span>
                  ) : (
                    <span className="text-cure-orange font-bold">Unverified</span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border-t border-card-border text-center">
                <span className="text-xs font-bold text-cure-navy">Lab Results Feed</span>
              </div>
            </motion.div>
          )}

          {/* Screen 4: Pharmacy Queue */}
          {(activeFilter === "All" || activeFilter === "Pharmacy") && (
            <motion.div
              variants={fadeUp}
              custom={0.24}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="rounded-3xl bg-white shadow-md border border-card-border overflow-hidden flex flex-col group hover:shadow-xl hover:border-cure-navy/30 transition-all duration-500"
            >
              <div className="p-4 bg-cure-navy text-white flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
                  Pharmacy Queue
                </span>
                <Pill size={16} className="text-cure-orange" />
              </div>

              <div className="p-5 flex-1 space-y-4 bg-surface/50 text-left">
                <div className="p-3 rounded-xl bg-white border border-card-border">
                  <p className="text-[10px] text-text-muted font-mono uppercase font-bold">Fulfillment Hub</p>
                  <p className="text-xs font-bold text-cure-navy mt-0.5">Ridge Hospital Pharmacy</p>
                </div>

                {/* Prescription Items */}
                <div className="space-y-2">
                  <div
                    onClick={() =>
                      setPharmacyStatus((prev) => ({
                        ...prev,
                        amox: prev.amox === "Ready" ? "Dispensed" : "Ready",
                      }))
                    }
                    className="p-3 rounded-2xl bg-white border border-card-border shadow-sm space-y-1 cursor-pointer hover:border-cure-green/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-text-primary">Amoxicillin 500mg</p>
                      <span className="text-[10px] font-bold text-cure-green bg-cure-green/10 px-2 py-0.5 rounded-full">
                        {pharmacyStatus.amox}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted">Tap to toggle status</p>
                  </div>

                  <div
                    onClick={() =>
                      setPharmacyStatus((prev) => ({
                        ...prev,
                        para: prev.para === "Processing" ? "Ready" : "Processing",
                      }))
                    }
                    className="p-3 rounded-2xl bg-white border border-card-border shadow-sm space-y-1 cursor-pointer hover:border-cure-orange/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-text-primary">Paracetamol 500mg</p>
                      <span className="text-[10px] font-bold text-cure-orange bg-cure-orange/10 px-2 py-0.5 rounded-full">
                        {pharmacyStatus.para}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted">Tap to toggle status</p>
                  </div>
                </div>

                <button
                  onClick={() => setQrModalOpen(true)}
                  className="w-full p-3 rounded-xl bg-cure-orange text-white flex items-center justify-between text-xs font-semibold hover:bg-cure-orange/90 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Scan QR Code</span>
                  <span className="font-mono text-[11px] bg-white/20 px-2 py-0.5 rounded">#CV-9021</span>
                </button>
              </div>

              <div className="p-4 bg-white border-t border-card-border text-center">
                <span className="text-xs font-bold text-cure-navy">Pharmacy Queue</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
function BenefitsSection() {
  const benefits = [
    { title: "Fewer missed referrals", description: "Structured hand-offs between roles mean referrals don't disappear in translation.", color: "text-cure-green", bg: "bg-cure-green/10 border-cure-green/20" },
    { title: "Faster time to diagnosis", description: "Lab results route directly into the doctor's view — no faxes, no phone calls.", color: "text-briams-blue", bg: "bg-briams-blue/10 border-briams-blue/20" },
    { title: "Lower cost per consultation", description: "Video-first triage reduces unnecessary in-person visits for both patients and clinics.", color: "text-briams-orange", bg: "bg-briams-orange/10 border-briams-orange/20" },
  ];
  return (
    <section className="section-padding bg-surface border-y border-card-border">
      <div className="container-section grid md:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            variants={fadeUp}
            custom={i * 0.08}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="p-8 bg-white shadow-sm rounded-2xl border border-card-border h-full hover:border-cure-navy/30 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl ${b.bg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <ShieldCheck size={24} className={b.color} />
              </div>
              <h3 className="text-xl font-bold text-cure-navy tracking-tight group-hover:text-briams-blue transition-colors">{b.title}</h3>
              <p className="mt-3 text-[15px] text-text-secondary font-medium leading-relaxed">
                {b.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function CureTestimonials() {
  const cureTestimonials = TESTIMONIALS.filter((t) => t.id === 4).concat(TESTIMONIALS.slice(0, 2));
  return (
    <section className="section-padding bg-bg relative">
      <div className="container-section">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-cure-navy mb-12 text-center">
          Trusted by the people <span className="text-gradient-cure font-extrabold">using it</span>
        </h2>
        <div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="!pb-16"
          >
            {cureTestimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <GlassCard className="p-8 h-full flex flex-col group bg-white border border-card-border hover:border-cure-green/30" tilt={false}>
                  <p className="text-[15px] font-medium text-text-secondary leading-relaxed flex-1 italic">"{t.quote}"</p>
                  <div className="mt-8 pt-6 border-t border-card-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cure-navy via-briams-blue to-cure-green text-white flex items-center justify-center font-display font-extrabold shadow-sm border border-white/20">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-cure-navy text-sm group-hover:text-briams-blue transition-colors">{t.name}</p>
                      <p className="text-xs font-mono uppercase tracking-wider text-cure-green mt-1 font-bold">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function CureFAQSection() {
  return (
    <section id="faq" className="section-padding bg-surface border-t border-card-border">
      <div className="container-section max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-cure-navy mb-12">
          Questions about <span className="text-gradient-cure font-extrabold">CureVirtual</span>
        </h2>
        <FAQAccordion items={CURE_FAQ} />
      </div>
    </section>
  );
}

/* ---------------- Waitlist ---------------- */
function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setJoined(true);
  }

  return (
    <section id="waitlist" className="pb-24 sm:pb-32 bg-surface pt-10">
      <div className="container-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative rounded-[2.5rem] overflow-hidden bg-cure-navy border border-cure-navy px-8 sm:px-16 py-20 sm:py-24 text-center shadow-lg"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-cure-navy/20 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Be first in line when <span className="text-gradient-cta font-extrabold">CureVirtual</span> launches in your region.
            </h2>
            <p className="mt-6 text-lg text-white/80 font-medium max-w-xl mx-auto leading-relaxed">
              Join the waitlist — clinics and individual practitioners are
              both welcome.
            </p>
            {joined ? (
              <p className="mt-10 text-cure-green font-bold text-lg">
                You're on the list — we'll be in touch.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@clinic.com"
                  className="flex-1 rounded-xl px-5 py-3.5 text-[15px] font-medium bg-white border border-transparent outline-none focus:border-cure-orange"
                />
                <Button type="submit" size="lg" className="!bg-cure-orange text-white hover:!shadow-[0_10px_20px_rgba(242,113,31,0.3)]">
                  Join waitlist
                </Button>
              </form>
            )}
            <p className="mt-10 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white/50">
              Built by Briams Technologies
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Credit Line ---------------- */
function CureCreditLine() {
  return (
    <section className="py-8 bg-surface border-t border-card-border text-center">
      <div className="container-section flex items-center justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-card-border text-xs font-mono font-semibold text-text-secondary hover:text-briams-orange hover:border-briams-orange/30 transition-all duration-300 shadow-sm group"
        >
          <span className="w-2 h-2 rounded-full bg-cure-orange" />
          <span>CureVirtual is an enterprise product engineered & built by</span>
          <span className="text-cure-navy font-bold group-hover:text-briams-orange transition-colors">
            Briams Technologies →
          </span>
        </Link>
      </div>
    </section>
  );
}
