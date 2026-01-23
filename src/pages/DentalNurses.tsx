import { BookOpen, Shield, Gift, Banknote, GraduationCap, Users, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import NurseRegistrationForm from "@/components/forms/NurseRegistrationForm";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const incentives = [
  { icon: BookOpen, title: "Free CPD Courses", desc: "Access complimentary professional development courses" },
  { icon: Shield, title: "Free DBS Support", desc: "We cover DBS check costs and guide you through the process" },
  { icon: Gift, title: "End-of-Year Bonuses", desc: "Loyalty rewards for our dedicated nursing staff" },
  { icon: Banknote, title: "Competitive Rates", desc: "Top hourly rates reflecting your skills and experience" },
];

const qualifiedBenefits = [
  "Flexible locum and permanent opportunities",
  "Work-life balance with shifts that suit you",
  "Access to practices across the UK",
  "Regular work with consistent income",
  "Professional development support",
  "Dedicated account manager",
];

const traineeBenefits = [
  "Help finding work placements during your course",
  "Direct liaison with dental practices",
  "Support through your training journey",
  "Pathway to permanent employment",
  "Mentorship from experienced nurses",
  "Portfolio building opportunities",
];

const DentalNurses = () => {
  return (
    <main className="theme-yellow-5">
      <SEO
        title="Jobs for Dental Nurses | Locum & Permanent Roles UK"
        description="Join leading dental nursing agencies in London and across the UK. Register for flexible locum shifts or permanent nursing roles with great benefits."
      />
      <PageHeader
        badge="For Dental Nurses"
        title="Join Our Nursing Network"
        subtitle="Whether you're a qualified dental nurse seeking opportunities or a trainee looking for placements, we're here to support your career."
      />

      {/* Incentives Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Why Work With Happy Dental Agency?
            </h2>
            <p className="text-muted-foreground text-lg">
              We believe in taking care of our dental nurses with exceptional benefits and support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {incentives.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center border border-border hover:border-gold hover:shadow-large transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualified & Trainee Sections */}
      <section className="section-padding bg-champagne-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Qualified Nurses */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy">
                  Qualified Dental Nurses
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Take control of your career with flexible work opportunities that suit your lifestyle.
                Join our network of professionals and access the best dental practices across the UK.
              </p>
              <ul className="space-y-3">
                {qualifiedBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trainee Nurses */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy">
                  Trainee Dental Nurses
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Struggling to find a placement during your dental nursing course? We're here to help!
                We liaise directly with practices to secure positions while you complete your training.
              </p>
              <ul className="space-y-3">
                {traineeBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                Register With Us Today
              </h2>
              <p className="text-muted-foreground text-lg">
                Complete the form below to join our network. Our team will contact you
                within 24 hours to discuss opportunities.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-large border border-border">
              <NurseRegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-champagne-light">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Your Journey With Us
            </h2>
            <p className="text-muted-foreground text-lg">
              From registration to your first placement, we support you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Register", desc: "Complete our simple registration form" },
              { step: "02", title: "Verification", desc: "We verify your credentials and references" },
              { step: "03", title: "Matching", desc: "We match you with suitable opportunities" },
              { step: "04", title: "Start Working", desc: "Begin your career with ongoing support" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-medium">
                  <span className="text-xl font-heading font-bold text-gold">{item.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="nurses" />
    </main>
  );
};

export default DentalNurses;
