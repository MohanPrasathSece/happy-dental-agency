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
  "London-wide coverage",
  "24/7 emergency support line",
];

const DentalPractices = () => {
  return (
    <main>
      <SEO
        title="Book Dental Nurses | Staffing for Dental Practices London"
        description="Reliable locum and permanent dental nurse staffing for London dental practices. Fast response times and fully vetted qualified nurses available across the city."
      />
      <PageHeader
        badge="For Dental Practices"
        title="Book Reliable Dental Nurses"
        subtitle="Access our network of qualified and vetted dental nurses for your practice. Fast, reliable, and professional staffing solutions."
      />

      {/* Services Section */}
      <section id="services" className="section-padding bg-white scroll-mt-20">
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

      {/* Professional Excellence Section */}
      <section className="section-padding bg-slate-50 border-y border-border/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <span className="inline-block bg-navy text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                Vetted & Qualified
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 leading-tight">
                Excellence in <br />
                <span className="text-gold">Dental Nursing</span> Support
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At Happy Dental Agency, we take recruitment beyond just filling shifts. Our team consists of highly skilled, GDC-registered professionals who are passionate about patient care.
                </p>
                <p>
                  Every nurse in our network undergoes a rigorous vetting process, including enhanced DBS checks and qualification verification, ensuring that your practice remains efficient.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white rounded-lg border border-border shadow-sm text-sm font-semibold text-navy">
                  ✓ GDC Registered
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-border shadow-sm text-sm font-semibold text-navy">
                  ✓ DBS Verified
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-border shadow-sm text-sm font-semibold text-navy">
                  ✓ Indemnity
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="/images/uk%20nurse%208.png"
                  alt="Professional Dental Nursing Team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-navy/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Booking Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Benefits */}
            <div className="animate-slide-up">
              <span className="inline-block bg-navy text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Practice Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We understand the unique staffing challenges dental practices face.
                Our commitment to quality, speed, and reliability sets us apart as
                London's trusted nursing partner.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border/50 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span className="text-sm font-medium text-navy/80">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Support Box */}
              <div className="p-6 bg-navy text-white rounded-2xl shadow-xl border border-navy-light/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Headphones className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Need Immediate Help?</p>
                    <a href="tel:+447944624039" className="text-xl font-heading font-bold hover:text-gold transition-colors block">
                      +44 7944 624 039
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-border animate-fade-in">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-heading font-bold text-navy mb-3">Book a Nurse</h3>
                  <p className="text-muted-foreground">
                    Complete the form below and we'll respond within 2 hours.
                  </p>
                </div>
                <BookingForm />

                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-navy">Cancellation Policy:</span> We require at least 24-hour notice for any cancellations. Please note that cancellations made with less than 24 hours' notice will incur a partial payment of the day's scheduled pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Simple Booking Process
            </h2>
            <p className="text-muted-foreground text-lg">
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
                <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-heading font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
