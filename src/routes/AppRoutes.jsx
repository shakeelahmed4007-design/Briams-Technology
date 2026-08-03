import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Products from "../pages/Products";
import CureVirtual from "../pages/CureVirtual";
import Work from "../pages/Work";
import About from "../pages/About";
import FAQPage from "../pages/FAQPage";
import Contact from "../pages/Contact";
import BookConsultation from "../pages/BookConsultation";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";

function AdminRedirect() {
  useEffect(() => {
    const adminUrl = import.meta.env.VITE_ADMIN_URL || '/admin';
    window.location.replace(adminUrl);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-briams-cyan border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-lg">Opening Admin Panel...</p>
      </div>
    </div>
  );
}

function LoginRedirect() {
  useEffect(() => {
    window.location.replace('/login');
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-briams-cyan border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-lg">Opening Login...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/curevirtual" element={<CureVirtual />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
