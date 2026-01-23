import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  variant?: "practices" | "nurses" | "general";
}

const CTASection = ({ variant = "general" }: CTASectionProps) => {
  const content = {
    practices: {
      title: "Need Reliable Dental Nursing Staff?",
      description:
        "Book qualified dental nurses for your practice today. Fast response, vetted professionals, and guaranteed satisfaction.",
      primaryCTA: "Book a Nurse Now",
      primaryLink: "/dental-practices",
    },
    nurses: {
      title: "Ready to Start Your Dental Nursing Career?",
      description:
        "Join our network of dental professionals. Enjoy competitive rates, free CPD courses, and ongoing support.",
      primaryCTA: "Register Now",
      primaryLink: "/dental-nurses",
    },
    general: {
      title: "Ready to Get Started?",
      description:
        "Whether you're a dental practice seeking staff or a nurse looking for opportunities, we're here to help.",
      primaryCTA: "Contact Us Today",
      primaryLink: "/contact",
    },
  };

  const { title, description, primaryCTA, primaryLink } = content[variant];

  return (
    <section className="section-padding bg-navy relative overflow-hidden border-t border-white/10">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/80 text-lg mb-8">{description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={primaryLink}>
              <Button variant="cta" size="lg" className="group">
                {primaryCTA}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+447944624039">
              <Button
                variant="outline"
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-white"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
