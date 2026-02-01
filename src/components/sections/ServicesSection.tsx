import { Users, Clock, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";

const services = [
  {
    icon: Clock,
    title: "Temporary (Locum) Nurses",
    description:
      "Quick and reliable temporary dental nurse placements for holiday cover, sickness, or unexpected absences. Available at short notice.",
    link: "/dental-practices",
  },
  {
    icon: Building2,
    title: "Permanent Recruitment",
    description:
      "Find the perfect permanent dental nurse for your practice. We thoroughly vet all candidates to ensure quality matches.",
    link: "/dental-practices",
  },
  {
    icon: GraduationCap,
    title: "Trainee Nurse Placements",
    description:
      "Supporting trainee dental nurses to find work placements during their course. We liaise with practices to secure positions.",
    link: "/dental-nurses",
  },
  {
    icon: Users,
    title: "Emergency Cover",
    description:
      "Same-day and next-day emergency dental nurse cover when you need it most. Our extensive network ensures fast response times.",
    link: "/dental-practices",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <div className="flex justify-center mb-6">
            <Logo size="sm" showText={false} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Clientele experience at Happy Dental Agency is Excellent
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide a full range of recruitment services to meet the staffing
            needs of dental practices across London.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-champagne-dark hover:shadow-large transition-all duration-300 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-navy group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-navy mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-navy font-semibold hover:text-primary-dark transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button variant="hero" size="lg">
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
