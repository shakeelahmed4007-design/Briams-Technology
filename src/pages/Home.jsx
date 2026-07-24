import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import ClientsStrip from "../components/home/ClientsStrip";
import FeaturedProduct from "../components/home/FeaturedProduct";
import CaseStudiesSection from "../components/home/CaseStudiesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ProcessSection from "../components/home/ProcessSection";
import TechStackMarquee from "../components/home/TechStackMarquee";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Briams Technologies — Enterprise Software & IT Consultancy</title>
        <meta
          name="description"
          content="Briams Technologies builds enterprise software, apps, and ERP systems — creators of the CureVirtual telehealth platform."
        />
      </Helmet>
      <Hero />
      <Stats />
      <ClientsStrip />
      <FeaturedProduct />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackMarquee />
      <FAQSection />
      <CTASection />
    </>
  );
}
