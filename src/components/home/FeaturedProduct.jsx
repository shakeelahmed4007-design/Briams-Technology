import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, User, Stethoscope, FlaskConical, Pill, Activity } from "lucide-react";
import { fadeRight, zoomIn, viewportOnce } from "../../animations/variants";
import Button from "../ui/Button";

const MODULES = [
  {
    name: "Patient",
    tagline: "EHR & Booking",
    badge: "Connected",
    icon: User,
    gradient: "from-blue-500/15 via-cyan-500/5 to-white",
    borderColor: "border-blue-500/30 hover:border-blue-500/70 hover:shadow-[0_10px_25px_rgba(59,130,246,0.25)]",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 border-blue-500/30",
    titleColor: "text-blue-600",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    floatDuration: 4.2,
  },
  {
    name: "Doctor",
    tagline: "Tele-consult & E-Rx",
    badge: "Verified",
    icon: Stethoscope,
    gradient: "from-emerald-500/15 via-teal-500/5 to-white",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/70 hover:shadow-[0_10px_25px_rgba(16,185,129,0.25)]",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 border-emerald-500/30",
    titleColor: "text-emerald-600",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    floatDuration: 4.8,
  },
  {
    name: "Laboratory",
    tagline: "Diagnostics & Lab Sync",
    badge: "Live Sync",
    icon: FlaskConical,
    gradient: "from-cyan-500/15 via-indigo-500/5 to-white",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/70 hover:shadow-[0_10px_25px_rgba(6,182,212,0.25)]",
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-600 border-cyan-500/30",
    titleColor: "text-cyan-600",
    badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    floatDuration: 4.5,
  },
  {
    name: "Pharmacy",
    tagline: "E-Rx & Delivery",
    badge: "Automated",
    icon: Pill,
    gradient: "from-orange-500/15 via-amber-500/5 to-white",
    borderColor: "border-orange-500/30 hover:border-orange-500/70 hover:shadow-[0_10px_25px_rgba(249,115,22,0.25)]",
    iconBg: "bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-600 border-orange-500/30",
    titleColor: "text-orange-600",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    floatDuration: 5.0,
  },
];

export default function FeaturedProduct() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden border-y border-card-border">
      {/* Premium Dark Theme Overlays */}
      <div className="absolute inset-0 bg-dark-mesh opacity-50 mix-blend-screen" />
      <div className="absolute inset-0 bg-grain opacity-20" />
      
      {/* Accent Glow Blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cure-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-section relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cure-green/10 border border-cure-green/30 text-xs font-mono uppercase tracking-wider text-cure-green mb-6 font-bold shadow-xs">
            <HeartPulse size={14} className="text-cure-green" />
            Flagship product
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.1]">
            <span className="text-gradient-cure font-extrabold">CureVirtual</span> is telehealth infrastructure, not just an app.
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-lg font-medium">
            <span className="text-briams-blue font-semibold">Five connected modules</span> — Patient, Doctor, Physician Assistant,
            Laboratory and Pharmacy — coordinating care in regions where
            specialists are hours away. Launching first in <span className="text-briams-orange font-semibold">Ghana</span>.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button to="/products/curevirtual" size="lg">
              Visit CureVirtual
            </Button>
            <div className="inline-flex items-center gap-2 text-text-secondary text-sm font-medium">
              <ShieldCheck size={18} className="text-cure-green" />
              Built by <span className="text-briams-blue font-semibold">Briams Technologies</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="rounded-3xl glass p-6 sm:p-8 card-hover-glow relative overflow-hidden group shadow-xl bg-white border border-card-border">
            {/* Ambient Animated Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-cure-green/10 via-briams-cyan/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Central Care Network Pulse Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.06, 1] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="px-3.5 py-1.5 rounded-full bg-white/95 border border-cure-green/40 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cure-green animate-ping shrink-0" />
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-cure-navy flex items-center gap-1.5">
                  <Activity size={13} className="text-cure-green" />
                  Realtime Care Network
                </span>
              </motion.div>
            </div>

            <div className="rounded-2xl bg-surface/80 border border-card-border min-h-[360px] sm:min-h-[400px] flex items-center justify-center relative z-10 overflow-hidden shadow-inner p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-4.5 w-full relative z-10">
                {MODULES.map((m, i) => {
                  const IconComponent = m.icon;
                  return (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: m.floatDuration,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      whileHover={{ scale: 1.06, y: -8 }}
                      className={`rounded-2xl bg-gradient-to-br ${m.gradient} border ${m.borderColor} p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-sm relative group/card overflow-hidden`}
                    >
                      {/* Subtle inner card glow on hover */}
                      <div className="absolute inset-0 bg-white/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl ${m.iconBg} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover/card:scale-110`}>
                          <IconComponent size={20} />
                        </div>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${m.badgeColor} font-bold`}>
                          {m.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold font-display ${m.titleColor} tracking-tight`}>
                          {m.name}
                        </h3>
                        <p className="text-xs text-text-secondary font-medium mt-1">
                          {m.tagline}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
