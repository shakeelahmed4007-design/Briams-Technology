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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
