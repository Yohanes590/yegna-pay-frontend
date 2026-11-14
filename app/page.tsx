import NavigationBarRender from "@/components/landing-page/nav-bar";
import HeroSectionRender from "@/components/landing-page/hero-section";
import BankInfrastructure from "@/components/landing-page/bank-infrastructure";
import HowItWorks from "@/components/landing-page/how-it-works";
import ProductShowcase from "@/components/landing-page/product-showcase";
import DeveloperExperience from "@/components/landing-page/developer-experience";
import SecurityAndDocs from "@/components/landing-page/security-and-docs";
import FeaturesAndPricing from "@/components/landing-page/features-and-pricing";
import ContactSection from "@/components/landing-page/contact-section";
import LongFooter from "@/components/landing-page/footer";

export default function Home() {
  return (
    <main className="root-container relative bg-white text-slate-900 dark:bg-[#070b10] dark:text-[#f1f5f9] min-h-screen selection:bg-[#10b981]/20 selection:text-[#047857] dark:selection:text-[#34d399] overflow-x-hidden">
      <NavigationBarRender />
      <HeroSectionRender />
      <BankInfrastructure />
      <HowItWorks />
      <ProductShowcase />
      <DeveloperExperience />
      <SecurityAndDocs />
      <FeaturesAndPricing />
      <ContactSection />
      <LongFooter />
    </main>
  );
}
