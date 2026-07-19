import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";

import ServicesSection from "@/components/landing/ServicesSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import SmoothScroll from "@/components/ui/smoothscroll";

const Index = () => {
  const [prefilledService, setPrefilledService] = useState<string>("");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <title>Aero</title>
      <meta name="description" content="Aero builds fast, modern web apps, SaaS platforms, and digital products that help businesses grow and scale online." />
      <meta name="keywords" content="Aero, Aero Team, Aero web, Aero development, web development, SaaS, React, Vite, frontend, backend, custom websites, web apps" />
      <link rel="canonical" href="https://aeroteam.vercel.app/" />
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
