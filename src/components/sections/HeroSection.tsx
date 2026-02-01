import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";

const HeroSection = () => {
    const highlights = [
        "Fully Qualified Nurses",
        "London-Wide Service",
        "Fast Response",
        "Reliable Staffing",
    ];

    return (
        <section className="relative min-h-screen hero-gradient overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-10 w-64 h-64 bg-champagne-dark/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20">
                    <img src="/images/uk nurse 6.png" alt="Dental Professional" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="container-custom relative z-10 pt-24 pb-16 md:pt-32 md:pb-28">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-10 animate-fade-in">
                        <Logo size="lg" showText={false} />
                    </div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 md:mb-8 shadow-soft animate-fade-in">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium text-navy">
                            Trusted Dental Nursing Agency in London
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy mb-6 animate-slide-up">
                        One of the best <span className="text-navy">dental nursing</span>{" "}
                        agencies in London
                    </h1>

                    {/* Subheading */}
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        Connecting dental practices with qualified and trainee dental nurses
                        across London. Fast, reliable, and professional staffing solutions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <Link to="/dental-practices" className="w-full sm:w-auto">
                            <Button variant="cta" size="xl" className="w-full group">
                                Book for a Nurse
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/dental-nurses?role=qualified#qualified-section" className="w-full sm:w-auto">
                            <Button variant="cta" size="xl" className="w-full group">
                                Register as a Nurse
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/dental-nurses?role=trainee#trainee-section" className="w-full sm:w-auto">
                            <Button variant="hero-outline" size="xl" className="w-full">
                                Register as a Trainee Nurse
                            </Button>
                        </Link>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm md:text-base text-navy"
                            >
                                <CheckCircle2 className="w-5 h-5 text-success" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Phone CTA */}
                    <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <a
                            href="tel:+447944624039"
                            className="inline-flex items-center gap-3 text-navy hover:text-primary-foreground transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-medium flex items-center justify-center">
                                <Phone className="w-5 h-5 text-navy" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground">Call us now</p>
                                <p className="font-semibold text-lg">+44 7944 624 039</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
                        fill="hsl(0 0% 100%)"
                    />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
