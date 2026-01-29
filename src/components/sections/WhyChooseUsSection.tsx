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
    title: "London Coverage",
    description: "Serving dental practices across the city of London with efficient staffing solutions.",
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
    <section className="section-padding bg-champagne-light">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-white text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
              The Trusted Choice for Dental Nursing Staffing in London
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With years of experience in dental staffing, we understand the unique
              needs of dental practices and the importance of reliable, skilled nursing staff.
            </p>

            {/* Values instead of numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center md:text-left">
                <p className="text-xl md:text-2xl font-heading font-bold text-navy uppercase">Expert</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Nursing Staff</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl md:text-2xl font-heading font-bold text-navy uppercase">Trusted</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Dental Partner</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl md:text-2xl font-heading font-bold text-navy uppercase">Quality</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Service First</p>
              </div>
            </div>
          </div>

          {/* Right - Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 border border-border hover:border-gold hover:shadow-medium transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-3">
                  <reason.icon className="w-5 h-5 text-navy" />
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
