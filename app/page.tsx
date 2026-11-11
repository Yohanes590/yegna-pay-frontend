"use client";

import NavigationBarRender from "@/components/landing-page/nav-bar";
import HeroSectionRender from "@/components/landing-page/hero-section";
import ProductShowcase from "@/components/landing-page/product-showcase";
import BankInfrastructure from "@/components/landing-page/bank-infrastructure";
import DeveloperExperience from "@/components/landing-page/developer-experience";
import FeaturesAndPricing from "@/components/landing-page/features-and-pricing";
import ContactSection from "@/components/landing-page/contact-section";
import LongFooter from "@/components/landing-page/footer";

export default function Home() {
  return (
    <main className="root-container relative bg-[#060a0f] min-h-screen text-[#f1f5f9] selection:bg-[#10b981]/25 selection:text-[#34d399] overflow-x-hidden">
      <NavigationBarRender />
      <HeroSectionRender />
      <ProductShowcase />
      <BankInfrastructure />
      <DeveloperExperience />
      <FeaturesAndPricing />
      <ContactSection />
      <LongFooter />
    </main>
  );
}
