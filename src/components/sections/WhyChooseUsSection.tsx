import { Check, Clock, MapPin, Shield, Star, ThumbsUp } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Fast Response Time",
    description: "We respond to all enquiries within 2 hours during business hours.",
  },
  {
    icon: Shield,
    title: "Vetted Professionals",
    description: "All nurses are thoroughly verified with DBS checks and reference verification.",
  },
  {
    icon: MapPin,
    title: "UK-Wide Coverage",
    description: "Serving dental practices across England, Scotland, Wales, and Northern Ireland.",
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "We maintain high standards through regular feedback and quality assessments.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Not satisfied? We'll find a replacement at no additional cost.",
  },
  {
    icon: Check,
    title: "Compliance Ready",
    description: "All documentation and compliance requirements handled for you.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-primary/50 text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
              The Trusted Choice for Dental Recruitment
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With years of experience in dental staffing, we understand the unique
              needs of dental practices and the importance of reliable, skilled nursing staff.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-gold">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Nurses Registered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-gold">200+</p>
                <p className="text-sm text-muted-foreground mt-1">Partner Practices</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-gold">98%</p>
                <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right - Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-border hover:border-champagne-dark hover:shadow-medium transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-3">
                  <reason.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
