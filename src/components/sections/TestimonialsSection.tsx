import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner, London",
    content:
      "Happy Dental Agency has been invaluable for our practice. They always provide reliable, skilled nurses at short notice. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Thompson",
    role: "Dental Nurse, Manchester",
    content:
      "I've been with Happy Dental for 2 years now. The support is amazing, the rates are competitive, and they truly care about their nurses.",
    rating: 5,
  },
  {
    name: "James Williams",
    role: "Practice Manager, Birmingham",
    content:
      "Excellent service from start to finish. The booking process is seamless, and the nurses are always professional and punctual.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-champagne-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-white text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from dental practices and nurses who have experienced our
            professional recruitment services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-large transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-navy fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-heading font-semibold text-navy">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
