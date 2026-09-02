import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import SmoothScroll from "@/components/ui/smoothscroll";
import Seo from "@/components/Seo";

const Index = () => {
  const [prefilledService, setPrefilledService] = useState<string>("");
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Aero Team",
      url: "https://aeroteam.vercel.app",
      description:
        "Aero Team builds modern websites, SaaS platforms, and custom web applications for ambitious businesses.",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Aero Team",
      url: "https://aeroteam.vercel.app",
      email: "aeroteam.agency@gmail.com",
      description: "Custom web development and SaaS agency based in Cairo, Egypt.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Seo
        title="Aero Team | Web Development & SaaS Solutions"
        description="Aero Team builds fast, modern web apps, SaaS platforms, and digital products that help businesses grow and scale online. Based in Cairo, Egypt."
        canonical="https://aeroteam.vercel.app/"
        jsonLd={homeSchema}
      />
      <Navbar />
      <main>
        <SmoothScroll />
        <HeroSection />
        <ServicesSection onSelectService={setPrefilledService} />
        <ProjectsSection />
        <WhyChooseSection />
        <ContactSection prefilledService={prefilledService} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
