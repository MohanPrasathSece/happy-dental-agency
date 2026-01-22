import PageHeaderComp from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { Target, Eye, Heart, Shield, Award, Users } from "lucide-react";

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
                            <div className="relative bg-navy rounded-3xl p-10 md:p-14 text-white">
                                <div className="inline-flex items-center gap-2 bg-white/10 text-champagne px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                                    <Eye className="w-4 h-4" />
                                    Our Vision
                                </div>
                                <h3 className="text-3xl font-heading font-bold mb-6 italic line-height-relaxed">
                                    "To be the UK's most trusted partner in dental staffing, known for our unwavering commitment to quality and happiness."
                                </h3>
                                <div className="w-20 h-1 bg-gold rounded-full" />
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
                                    <value.icon className="w-8 h-8 text-gold" />
                                </div>
                                <h4 className="text-xl font-heading font-bold text-navy mb-3">{value.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Intro placeholder */}
            <section className="section-padding bg-white overflow-hidden">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-primary/10 aspect-square rounded-2xl flex items-center justify-center text-navy font-bold text-4xl">H</div>
                                <div className="bg-navy/10 aspect-square rounded-2xl flex items-center justify-center text-navy font-bold text-4xl">D</div>
                                <div className="bg-gold/10 aspect-square rounded-2xl flex items-center justify-center text-navy font-bold text-4xl">A</div>
                                <div className="bg-success/10 aspect-square rounded-2xl flex items-center justify-center text-navy font-bold text-4xl">!</div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">Meet the Team</h2>
                            <p className="text-muted-foreground text-xl mb-6 leading-relaxed">
                                Behind Happy Dental Agency is a team of dedicated recruitment specialists and dental professionals who understand the day-to-day realities of practice life.
                            </p>
                            <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                                We're passionate about what we do and we're always here to support our family of dental nurses and partner practices.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-gold/20" />
                                    <div>
                                        <p className="font-bold text-navy">Emma Watson</p>
                                        <p className="text-sm text-muted-foreground">Founder & CEO</p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-full bg-navy/20" />
                                    <div>
                                        <p className="font-bold text-navy">Sarah Jenkins</p>
                                        <p className="text-sm text-muted-foreground">Placement Lead</p>
                                    </div>
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
