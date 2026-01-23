import { Check, Clock, Shield, FileCheck, Users, Headphones } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/forms/BookingForm";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const services = [
  {
    icon: Clock,
    title: "Locum Dental Nurses",
    description: "Temporary cover for holidays, sickness, or busy periods. Available at short notice with flexible booking options.",
  },
  {
    icon: Users,
    title: "Permanent Recruitment",
    description: "Find the perfect long-term addition to your team. We handle screening, interviews, and reference checks.",
  },
  {
    icon: Shield,
    title: "Emergency Cover",
    description: "Same-day and next-day emergency dental nurse cover when you need it most. Our extensive network ensures fast response.",
  },
  {
    icon: FileCheck,
    title: "Holiday & Sickness Cover",
    description: "Planned cover for annual leave or unexpected absences. Keep your practice running smoothly without interruption.",
  },
];

const benefits = [
  "All nurses are DBS checked and verified",
  "Flexible booking - from one day to permanent",
  "Fast response within 2 hours",
  "No placement fees for locum bookings",
  "Satisfaction guarantee on all placements",
  "Dedicated account manager support",
  "UK-wide coverage",
  "24/7 emergency support line",
];

const DentalPractices = () => {
  return (
    <main className="theme-yellow-4">
      <SEO
        title="Book Dental Nurses | Staffing for Dental Practices UK"
        description="Reliable locum and permanent dental nurse staffing for UK dental practices. Fast response times and fully vetted qualified nurses in London and nationwide."
      />
      <PageHeader
        badge="For Dental Practices"
        title="Book Reliable Dental Nurses"
        subtitle="Access our network of qualified and vetted dental nurses for your practice. Fast, reliable, and professional staffing solutions."
      />

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Our Staffing Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you need temporary cover or permanent staff, we have the solution for your practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-border hover:border-champagne-dark hover:shadow-large transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Booking Form Section */}
      <section className="section-padding bg-champagne-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-muted-foreground mb-8">
                We understand the unique staffing challenges dental practices face.
                Our commitment to quality and reliability sets us apart.
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Support Box */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Need Immediate Help?</p>
                    <a href="tel:+447944624039" className="text-navy hover:underline font-semibold">
                      Call us: +44 7944 624 039
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-large">
              <h2 className="text-2xl font-heading font-bold text-navy mb-2">
                Book a Dental Nurse
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we'll respond within 2 hours.
              </p>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Simple Booking Process
            </h2>
            <p className="text-white/80 text-lg">
              Getting reliable dental nursing staff has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Request", desc: "Fill out our quick booking form with your requirements" },
              { step: "02", title: "We Match", desc: "We find the perfect nurse from our vetted network" },
              { step: "03", title: "Confirmation", desc: "Receive confirmation with nurse details and arrival time" },
              { step: "04", title: "Nurse Arrives", desc: "Your professional dental nurse arrives ready to work" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center border border-white/10">
                  <span className="text-xl font-heading font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="practices" />
    </main>
  );
};

export default DentalPractices;
