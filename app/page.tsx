"use client"
import HeroSectionRender from "@/components/landing-page/hero-section";
import NavigationBarRender from "@/components/landing-page/nav-bar";
import AboutPageRender from "@/components/landing-page/about-page";
import PricingRender from "@/components/landing-page/pricing-section";
import HowItWorks from "@/components/landing-page/how-it-works";
import ContactPage from "@/components/landing-page/contact-page";
import LongFooter from "@/components/landing-page/footer";
import BankVerification from "@/components/landing-page/connected-banks";

export default function Home() {
  return (
    <div className="root-container relative bg-slate-950 min-h-screen text-slate-50 selection:bg-blue-500/30 selection:text-blue-200">

      <NavigationBarRender />
      <HeroSectionRender />
      <BankVerification />
      <AboutPageRender />
      <PricingRender />
      <HowItWorks />
      <ContactPage />
      <LongFooter />
    </div>
  );
}
