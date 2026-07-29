import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CURE_NAV_LINKS } from "../../constants/nav";
import { useBrand } from "../../hooks/useBrand";
import Button from "../ui/Button";
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
        scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="container-section px-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-500 ${
            scrolled
              ? isCure
                ? "py-2 sm:py-2.5 bg-cure-navy shadow-[0_4px_20px_rgba(18,63,99,0.4)] border border-white/10 backdrop-blur-md"
                : "py-2 sm:py-2.5 bg-briams-navy shadow-[0_4px_20px_rgba(14,27,51,0.4)] border border-white/10 backdrop-blur-md"
              : isCure
              ? "bg-cure-navy py-2 border border-transparent"
              : "bg-briams-navy py-2 border border-transparent"
          }`}
        >
          {/* Logo Brand */}
          <motion.div variants={navItem}>
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className={`flex items-center justify-center p-1 rounded-xl shrink-0 ${isCure ? "bg-cure-navy" : "bg-briams-navy"}`}>
                <img
                  src={logoImg}
                  alt="Briams Technologies Logo"
                  className="h-8 sm:h-10 max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </div>
              <span className={`font-display font-semibold tracking-tight text-sm sm:text-lg transition-colors duration-300 text-white ${isCure ? "group-hover:text-cure-orange" : "group-hover:text-briams-orange"}`}>
                {isCure ? "CureVirtual" : "Briams Technologies"}
              </span>
              {isCure && (
                <span className="hidden xs:inline-block text-[10px] font-mono uppercase tracking-wider text-cure-green bg-cure-green/10 border border-cure-green/20 rounded-full px-2 py-0.5 ml-0.5 font-bold">
                  by Briams
                </span>
              )}
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {linksToRender.map((link) => (
              <motion.div key={link.path} variants={navItem} className="relative">
                <NavLink
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? isCure
                          ? "text-cure-green font-bold"
                          : "text-briams-cyan font-bold"
                        : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/10 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div variants={navItem} className="hidden lg:block">
            <Button
              to={isCure ? "/products/curevirtual#waitlist" : "/book-consultation"}
              size="md"
              className={isCure ? "!bg-cure-orange hover:!bg-cure-green transition-colors" : ""}
            >
              {isCure ? "Join Waitlist" : "Book Consultation"}
            </Button>
          </motion.div>

          {/* Mobile Hamburger Toggle Button */}
          <motion.button
            variants={navItem}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
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
            <div className={`${isCure ? "bg-cure-navy border-cure-navy/50" : "bg-briams-navy border-white/10"} rounded-2xl p-4 flex flex-col gap-1.5 shadow-2xl border backdrop-blur-xl`}>
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
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? isCure
                            ? "text-cure-green bg-white/10 font-bold"
                            : "text-briams-cyan bg-white/10 font-bold"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
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
                <Button
                  to={isCure ? "/products/curevirtual#waitlist" : "/book-consultation"}
                  size="md"
                  onClick={() => setOpen(false)}
                  className={`w-full justify-center ${isCure ? "!bg-cure-orange" : ""}`}
                >
                  {isCure ? "Join Waitlist" : "Book Consultation"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
