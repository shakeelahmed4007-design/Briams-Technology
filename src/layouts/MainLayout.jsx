import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollProgressBar from "../components/shared/ScrollProgressBar";
import BackToTop from "../components/shared/BackToTop";
import CustomCursor from "../components/shared/CustomCursor";
import PageTransition from "../components/shared/PageTransition";
import BrandSync from "../components/shared/BrandSync";
import { useLenis } from "../hooks/useLenis";

export default function MainLayout() {
  useLenis();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    requestAnimationFrame(() => {
      const fallbackEl = document.getElementById(id);
      if (fallbackEl) {
        fallbackEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <BrandSync />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
