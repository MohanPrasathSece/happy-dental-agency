import PageHeaderComp from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { Target, Eye, Heart, Shield, Award, Users } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Care & Compassion",
            description: "We care deeply about our nurses' wellbeing and the patients they serve."
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Transparency and honesty are at the heart of every placement we make."
        },
        {
            icon: Award,
            title: "Excellence",
            description: "We strive for the highest standards in dental nursing recruitment."
        },
        {
            icon: Users,
            title: "Community",
            description: "Building lasting professional relationships across the dental industry."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title="About Us | UK Dental Nursing Specialists"
                description="Learn about Happy Dental Agency, London's trusted partner in dental staffing. Our mission is to connect excellence with opportunity across the UK."
            />
            <PageHeaderComp
                title="About Happy Dental Agency"
                subtitle="Dedicated to excellence in dental nursing recruitment across the UK."
                badge="Our Story"
            />

            {/* Vision & Mission */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 bg-primary/20 text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                <Target className="w-4 h-4" />
                                Our Mission
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-navy mb-6">Connecting Excellence with Opportunity</h2>
                            <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                                Founded with a deep understanding of the dental industry, Happy Dental Agency was created to bridge the gap between quality practices and exceptional nursing talent.
                            </p>
                            <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                                We don't just fill shifts; we build teams. Our approach combines rigorous vetting with a personal touch to ensure every placement is a perfect match.
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gold/10 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                            <div className="relative bg-navy rounded-3xl overflow-hidden text-white">
                                <img src="/about-dental.png" alt="Dental Support" className="w-full h-64 md:h-80 object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent flex flex-col justify-end p-8 md:p-12">
                                    <div className="inline-flex items-center gap-2 bg-white/10 text-champagne px-4 py-1.5 rounded-full text-sm font-semibold mb-6 w-fit">
                                        <Eye className="w-4 h-4" />
                                        Our Vision
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold mb-6 italic leading-relaxed">
                                        "To be the UK's most trusted partner in dental staffing, known for our unwavering commitment to quality and happiness."
                                    </h3>
                                    <div className="w-20 h-1 bg-white/50 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-muted/30">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground text-lg">
                            The principles that guide everything we do at Happy Dental Agency.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl transition-all hover-lift">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                                    <value.icon className="w-8 h-8 text-navy" />
                                </div>
                                <h4 className="text-xl font-heading font-bold text-navy mb-3">{value.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEO Section - Elegant Minimal Design */}
            <section className="section-padding bg-white mt-12">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto bg-muted/30 rounded-[2.5rem] p-8 md:p-16 border border-border/50">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-10">
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl -m-4" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <img
                                        src="/recruitment.png"
                                        alt="Akosua Dapaah"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                                CEO Message
                            </div>

                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mb-10 max-w-3xl leading-tight">
                                Dedication to Your Success <br /> is our <span className="text-gold">Top Priority</span>
                            </h2>

                            <div className="max-w-3xl relative">
                                <p className="text-xl md:text-2xl text-navy/70 italic leading-relaxed font-medium">
                                    "Quality care starts with happy, supported professionals. Our mission is to ensure every dental practice we serve and every nurse we represent finds their perfect match."
                                </p>

                                <div className="mt-10 flex flex-col items-center">
                                    <div className="h-0.5 w-16 bg-gold mb-6" />
                                    <p className="font-heading font-bold text-3xl text-navy">Akosua Dapaah</p>
                                    <p className="text-muted-foreground font-semibold mt-1">Founder & CEO, Happy Dental Agency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection variant="general" />
        </div>
    );
};

export default About;
