import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/common/HeroSection";
import WorkspacesSection from "@/components/common/WorkspacesSection";
import FeaturesSection from "@/components/common/FeaturesSection";
import HowItWorksSection from "@/components/common/HowItWorksSection";
import AISection from "@/components/common/AISection";
import AboutSection from "@/components/common/AboutSection";
import CTASection from "@/components/common/CTASection";
import FooterSection from "@/components/common/FooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkspacesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AISection />
        <AboutSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
