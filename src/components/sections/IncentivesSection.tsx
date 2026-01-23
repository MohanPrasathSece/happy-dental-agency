import { BookOpen, Shield, Gift, Banknote, Award, HeartHandshake } from "lucide-react";

const incentives = [
  {
    icon: BookOpen,
    title: "Free CPD Courses",
    description: "Access complimentary Continuing Professional Development courses to enhance your skills.",
  },
  {
    icon: Shield,
    title: "Free DBS Support",
    description: "We cover the cost of your DBS check and guide you through the entire process.",
  },
  {
    icon: Gift,
    title: "End-of-Year Bonuses",
    description: "Rewarding loyalty with annual bonuses for our dedicated dental nurses.",
  },
  {
    icon: Banknote,
    title: "Competitive Rates",
    description: "Earn top hourly rates that reflect your skills and experience in the industry.",
  },
  {
    icon: Award,
    title: "Career Progression",
    description: "We support your growth with opportunities for advancement and new roles.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "Dedicated support team available to assist you throughout your journey with us.",
  },
];

const IncentivesSection = () => {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-white">
            Nurse Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Why Join Happy Dental Agency?
          </h2>
          <p className="text-white/80 text-lg">
            We believe in taking care of our dental nurses with exceptional benefits
            and ongoing support throughout their careers.
          </p>
        </div>

        {/* Incentives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {incentives.map((incentive, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover-lift border border-white/10 hover:border-gold"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold mx-auto mb-4 flex items-center justify-center">
                <incentive.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {incentive.title}
              </h3>
              <p className="text-white/70 text-sm">
                {incentive.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncentivesSection;
