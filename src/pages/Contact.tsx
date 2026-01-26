import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";
import MapSection from "@/components/sections/MapSection";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    primary: "+44 7944 624 039",
    secondary: "Mon - Fri: 8am - 6pm",
    link: "tel:+447944624039",
  },
  {
    icon: Mail,
    title: "Email",
    primary: "info@happydentalagency.co.uk",
    secondary: "We respond within 24 hours",
    link: "mailto:info@happydentalagency.co.uk",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    primary: "+44 7944 624 039",
    secondary: "Quick chat support",
    link: "https://wa.me/447944624039",
  },
  {
    icon: MapPin,
    title: "Location",
    primary: "Capital Office, 124 City Road",
    secondary: "London, EC1V 2NX",
    link: "https://maps.google.com/?q=Capital+Office,+124+City+Road,+London,+EC1V+2NX",
  },
];

const faqs = [
  {
    question: "How quickly can you provide a dental nurse?",
    answer: "We respond to all booking requests within 2 hours during business hours. For emergency cover, we often can provide nurses within 24 hours.",
  },
  {
    question: "Are all your nurses verified?",
    answer: "Yes, all nurses undergo thorough vetting including DBS checks, reference verification, GDC registration confirmation, and right to work checks.",
  },
  {
    question: "What areas do you cover?",
    answer: "We provide services across the entire United Kingdom including England, Scotland, Wales, and Northern Ireland.",
  },
  {
    question: "How much does it cost?",
    answer: "There are no upfront fees for booking locum nurses. We discuss rates based on your specific requirements. Permanent recruitment fees are discussed on enquiry.",
  },
  {
    question: "Do you support trainee nurses?",
    answer: "Absolutely! We help trainee dental nurses find work placements during their course and liaise with practices to secure permanent positions.",
  },
  {
    question: "What if I'm not satisfied with a placement?",
    answer: "We offer a satisfaction guarantee. If you're not happy with a nurse, we'll find a replacement at no additional cost.",
  },
];

const Contact = () => {
  return (
    <main>
      <SEO
        title="Contact Us | UK Dental Agency Support"
        description="Get in touch with Happy Dental Agency. Reach our professional support team for staffing inquiries or nurse registration across the entire UK."
      />
      <PageHeader
        badge="Contact Us"
        title="Get in Touch"
        subtitle="Have questions or ready to get started? We're here to help. Reach out to our friendly team today."
      />

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover:border-gold hover:shadow-medium transition-all text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
                  <info.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-navy hover:underline font-medium"
                  >
                    {info.primary}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{info.primary}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">{info.secondary}</p>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-large border border-border">
              <h2 className="text-2xl font-heading font-bold text-navy mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Business Hours & Info */}
            <div className="space-y-6">
              {/* Business Hours */}
              <div className="bg-champagne-light rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-navy">Business Hours</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium text-navy">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium text-navy">9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-navy">Closed</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  * Emergency support available 24/7 for existing clients
                </p>
              </div>

              {/* Quick Actions */}
              <div className="bg-navy rounded-2xl p-6 text-white">
                <h3 className="font-heading font-semibold mb-4">Need Immediate Assistance?</h3>
                <p className="text-white/80 text-sm mb-4">
                  For urgent staffing needs or time-sensitive enquiries, please call us directly or message us on WhatsApp.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+447944624039"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-champagne" />
                    <span>+44 7944 624 039</span>
                  </a>
                  <a
                    href="https://wa.me/447944624039"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-600/20 rounded-lg hover:bg-green-600/30 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapSection />

      {/* FAQs */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              FAQs
            </span>
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-medium transition-shadow"
              >
                <h3 className="font-heading font-semibold text-navy mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="general" />
    </main >
  );
};

export default Contact;
