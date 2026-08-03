import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { NAV_LINKS, CURE_NAV_LINKS } from "../../constants/nav";
import { useBrand } from "../../hooks/useBrand";
import logoImg from "../../assets/Logo 23.png";

const navContainer = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const navItem = {
  hidden: { y: -20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { brand } = useBrand();
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const isCure = brand === "cure";
  const linksToRender = isCure ? CURE_NAV_LINKS : NAV_LINKS;

  const handleNavClick = (e, path) => {
    setOpen(false);
    if (path.includes("#")) {
      const hash = path.split("#")[1];
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.header
      variants={navContainer}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-2 sm:py-3" : "py-3.5 sm:py-5"
      }`}
    >
      <div className="container-section px-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-500 border shadow-2xl backdrop-blur-xl ${
            isCure
              ? scrolled
                ? "py-2.5 sm:py-3 bg-[#123F63]/95 border-emerald-400/30 shadow-[0_8px_32px_rgba(18,63,99,0.6)]"
                : "py-3 bg-[#123F63]/85 border-white/20 shadow-[0_4px_20px_rgba(18,63,99,0.3)]"
              : scrolled
              ? "py-2.5 sm:py-3 bg-[#0E1B33]/95 border-briams-cyan/30 shadow-[0_8px_32px_rgba(14,27,51,0.6)]"
              : "py-3 bg-[#0E1B33]/85 border-white/20 shadow-[0_4px_20px_rgba(14,27,51,0.3)]"
          }`}
        >
          {/* Logo Brand */}
          <motion.div variants={navItem}>
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`flex items-center justify-center p-1.5 rounded-xl border shrink-0 transition-all duration-300 shadow-md ${
                isCure 
                  ? "bg-[#0E3250] border-emerald-400/40 group-hover:border-emerald-300" 
                  : "bg-[#0B1528] border-briams-cyan/40 group-hover:border-briams-cyan"
              }`}>
                <img
                  src={logoImg}
                  alt="Briams Technologies Logo"
                  className="h-8 sm:h-10 max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold tracking-tight text-base sm:text-xl text-white">
                  {isCure ? (
                    <>
                      Cure<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">Virtual</span>
                    </>
                  ) : (
                    <>
                      Briams <span className="text-transparent bg-clip-text bg-gradient-to-r from-briams-orange via-briams-gold to-briams-cyan">Technologies</span>
                    </>
                  )}
                </span>

                {isCure && (
                  <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-mono font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-2.5 py-0.5 shadow-sm">
                    <Sparkles size={11} className="text-emerald-400" />
                    by Briams
                  </span>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <nav className={`hidden lg:flex items-center gap-1.5 xl:gap-2 p-1.5 rounded-full border shadow-inner ${
            isCure 
              ? "bg-[#0E3250]/90 border-white/10" 
              : "bg-[#0B1528]/90 border-white/10"
          }`}>
            {linksToRender.map((link) => (
              <motion.div key={link.path} variants={navItem} className="relative">
                <NavLink
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? isCure
                          ? "text-white font-extrabold bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 shadow-[0_0_18px_rgba(46,158,91,0.35)]"
                          : "text-white font-extrabold bg-gradient-to-r from-briams-orange/30 via-briams-blue/30 to-briams-cyan/30 border border-briams-cyan/50 shadow-[0_0_18px_rgba(47,198,234,0.35)]"
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <span className="relative z-10">{link.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div variants={navItem} className="hidden lg:block">
            <Link
              to={isCure ? "/products/curevirtual#waitlist" : "/book-consultation"}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-black transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 group ${
                isCure
                  ? "bg-gradient-to-r from-briams-orange via-amber-500 to-briams-orange hover:from-amber-400 hover:to-briams-orange text-white shadow-briams-orange/30"
                  : "bg-gradient-to-r from-briams-orange via-briams-gold to-briams-orange hover:from-briams-gold hover:to-briams-orange text-[#0E1B33] shadow-briams-orange/30"
              }`}
            >
              <span>{isCure ? "Join Waitlist" : "Book Consultation"}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Mobile Hamburger Toggle Button */}
          <motion.button
            variants={navItem}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-white border transition-colors focus:outline-none ${
              isCure ? "bg-[#0E3250] border-emerald-400/40" : "bg-[#0B1528] border-briams-cyan/40"
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X size={22} className={isCure ? "text-emerald-400" : "text-briams-cyan"} /> : <Menu size={22} className="text-white" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden container-section px-3 sm:px-6 mt-2.5 overflow-hidden"
          >
            <div className={`border rounded-2xl p-4 flex flex-col gap-2 shadow-2xl backdrop-blur-xl ${
              isCure 
                ? "bg-[#123F63]/95 border-emerald-400/30" 
                : "bg-[#0E1B33]/95 border-briams-cyan/30"
            }`}>
              {linksToRender.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                        isActive
                          ? isCure
                            ? "text-emerald-300 bg-emerald-500/20 border border-emerald-400/40"
                            : "text-briams-cyan bg-briams-cyan/20 border border-briams-cyan/40"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="pt-3 pb-1"
              >
                <Link
                  to={isCure ? "/products/curevirtual#waitlist" : "/book-consultation"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-black text-base transition-all shadow-lg ${
                    isCure
                      ? "bg-gradient-to-r from-briams-orange to-amber-500 text-white shadow-briams-orange/30"
                      : "bg-gradient-to-r from-briams-orange to-briams-gold text-[#0E1B33] shadow-briams-orange/30"
                  }`}
                >
                  <span>{isCure ? "Join Waitlist" : "Book Consultation"}</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
