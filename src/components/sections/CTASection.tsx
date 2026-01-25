import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";

interface CTASectionProps {
  variant?: "practices" | "nurses" | "general";
}

const CTASection = ({ variant = "general" }: CTASectionProps) => {
  const content = {
    practices: {
      title: "Need Reliable Nursing Staff?",
      description:
        "Book qualified and trainee dental nurses for your practice today. Fast response, vetted professionals, and guaranteed satisfaction.",
      primaryCTA: "Book for a Nurse Now",
      primaryLink: "/dental-practices",
    },
    nurses: {
      title: "Ready to Start Your Nursing Career?",
      description:
        "Join our network of qualified and trainee dental professionals. Enjoy competitive rates, free CPD courses, and ongoing support.",
      primaryCTA: "Register as a Nurse",
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
    <section className="section-padding bg-white relative overflow-hidden border-t border-border">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="md" showText={false} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">{description}</p>

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
