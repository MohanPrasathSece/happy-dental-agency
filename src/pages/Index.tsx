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
        title="Best Dental Nurse Agency London | Professional Staffing Solutions"
        description="Happy Dental Agency is the #1 dental nursing recruitment agency in London. We’re open 24/7 for booking dental locums. Dedicated to professional and reliable staffing solutions."
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
