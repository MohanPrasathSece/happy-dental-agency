import { useState } from "react";
import { Building2, Users, ArrowRight, Check, Clock, Shield, FileCheck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const practiceSteps = [
  {
    number: "01",
    title: "Submit Your Request",
    description: "Fill out our quick booking form with your practice details, staffing requirements, dates, and duration needed.",
    details: ["Practice name and location", "Type of nurse required", "Dates and duration", "Any specific requirements"],
  },
  {
    number: "02",
    title: "We Find the Perfect Match",
    description: "Our team quickly reviews your requirements and matches you with a suitable nurse from our vetted network.",
    details: ["Skill matching", "Location proximity", "Availability confirmation", "Experience verification"],
  },
  {
    number: "03",
    title: "Receive Confirmation",
    description: "You'll receive confirmation with full details of the assigned nurse, including their qualifications and arrival time.",
    details: ["Nurse profile and qualifications", "Confirmed arrival time", "Contact information", "Cancellation policy"],
  },
  {
    number: "04",
    title: "Your Nurse Arrives",
    description: "Your professional dental nurse arrives at your practice, fully prepared and ready to provide excellent support.",
    details: ["Professional arrival", "Proper documentation", "Ready to work", "Quality assured service"],
  },
];

const nurseSteps = [
  {
    number: "01",
    title: "Register With Us",
    description: "Complete our simple online registration form with your details, qualifications, and work preferences.",
    details: ["Personal information", "Qualifications and GDC number", "Work preferences", "Upload your CV"],
  },
  {
    number: "02",
    title: "Verification Process",
    description: "We verify your credentials, conduct reference checks, and ensure all documentation is up to date.",
    details: ["DBS verification", "Reference checks", "GDC registration confirmation", "Right to work verification"],
  },
  {
    number: "03",
    title: "Get Matched",
    description: "Based on your preferences and location, we match you with suitable opportunities at dental practices.",
    details: ["Location-based matching", "Skill-appropriate placements", "Flexible scheduling", "Rate negotiation"],
  },
  {
    number: "04",
    title: "Start Working",
    description: "Accept assignments that work for you and start your dental nursing career with ongoing support from our team.",
    details: ["Confirmed bookings", "Ongoing support", "Timely payments", "Career progression"],
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"practices" | "nurses">("practices");

  return (
    <main>
      <SEO
        title="How It Works | Recruitment Process London"
        description="Our simple recruitment process for dental practices and nurses. Learn how we match quality practices in London with top nursing talent across the UK."
      />
      <PageHeader
        badge="How It Works"
        title="Simple & Transparent Process"
        subtitle="Our streamlined process makes it easy to get started and achieve your goals."
      />

      {/* Switch Toggle */}
      <section className="bg-background pt-12 pb-6">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="bg-muted p-1.5 rounded-2xl inline-flex gap-1 shadow-inner">
              <button
                onClick={() => setActiveTab("practices")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold ${activeTab === "practices" ? "bg-white text-navy shadow-md" : "text-muted-foreground hover:text-navy"}`}
              >
                <Building2 className="w-5 h-5" />
                For Practices
              </button>
              <button
                onClick={() => setActiveTab("nurses")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold ${activeTab === "nurses" ? "bg-white text-navy shadow-md" : "text-muted-foreground hover:text-navy"}`}
              >
                <Users className="w-5 h-5" />
                For Nurses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Section */}
      <section className="section-padding bg-background overflow-hidden relative">
        <div className="container-custom relative z-10 transition-all duration-500">
          {activeTab === "practices" ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy">
                    For Dental Practices
                  </h2>
                </div>
              </div>

              <div className="space-y-8 max-w-4xl mx-auto">
                {practiceSteps.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 items-start group">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-2xl font-heading font-bold text-primary-foreground">{step.number}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-8 border border-border group-hover:border-gold group-hover:shadow-lg transition-all">
                      <h3 className="text-xl font-heading font-semibold text-navy mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-success flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Link to="/dental-practices">
                  <Button variant="cta" size="xl">
                    Book a Nurse Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy">
                    For Dental Nurses
                  </h2>
                </div>
              </div>

              <div className="space-y-8 max-w-4xl mx-auto">
                {nurseSteps.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 items-start group">
                    <div className="w-20 h-20 rounded-2xl bg-white flex-shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-border">
                      <span className="text-2xl font-heading font-bold text-navy">{step.number}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-8 border border-border group-hover:border-gold group-hover:shadow-lg transition-all">
                      <h3 className="text-xl font-heading font-semibold text-navy mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-success flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Link to="/dental-nurses">
                  <Button variant="cta" size="xl">
                    Register Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Our Commitment to Excellence
            </h2>
            <p className="text-muted-foreground text-lg">
              At every step, we maintain the highest standards of service and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Fast Response", desc: "We respond within 2 hours during business hours" },
              { icon: Shield, title: "Fully Vetted", desc: "All nurses undergo thorough background and credential checks" },
              { icon: FileCheck, title: "Compliant", desc: "We handle all documentation and compliance requirements" },
              { icon: Headphones, title: "Ongoing Support", desc: "Dedicated support team available for practices and nurses" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center border border-border hover:shadow-xl transition-all hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-navy mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="general" />
    </main>
  );
};

export default HowItWorks;
