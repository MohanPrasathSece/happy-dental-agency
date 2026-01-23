import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import IncentivesSection from "@/components/sections/IncentivesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main>
      <SEO
        title="Home | Dental Nursing Recruitment London & UK"
        description="Happy Dental Agency is the leading dental nursing recruitment agency in London and across the UK. We provide professional locum and permanent dental nurses."
      />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <IncentivesSection />
      <TestimonialsSection />
      <CTASection variant="general" />
    </main>
  );
};

export default Index;
