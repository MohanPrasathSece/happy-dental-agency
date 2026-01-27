import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import IncentivesSection from "@/components/sections/IncentivesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

import MapSection from "@/components/sections/MapSection";

const Index = () => {
  return (
    <main>
      <SEO
        title="Home | London Dental Nursing Recruitment"
        description="Happy Dental Agency is a leading London dental nursing recruitment agency. We provide professional locum and permanent dental nurses across London."
      />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <IncentivesSection />
      <MapSection />
      <CTASection variant="general" />
    </main>
  );
};

export default Index;
