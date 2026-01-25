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

            {/* CEO Section - Executive Signature Design */}
            <section className="section-padding bg-muted/20 overflow-hidden relative">
                <div className="container-custom">
                    <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gold/10 relative">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-20 z-0 hidden lg:block" />

                        <div className="grid lg:grid-cols-12 relative z-10">
                            {/* Left Content Column */}
                            <div className="lg:col-span-7 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                                <div className="inline-block bg-gold/10 text-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8">
                                    Executive Message
                                </div>

                                <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mb-10 leading-tight">
                                    Setting the Standard in <br />
                                    <span className="text-gold italic">Dental Excellence</span>
                                </h2>

                                <div className="space-y-8">
                                    <p className="text-xl md:text-2xl text-navy/70 leading-relaxed font-light">
                                        "Quality is never an accident; it is the result of intelligent direction and skillful execution. We represent the bridge between professional ambition and clinical excellence."
                                    </p>

                                    <div className="h-0.5 w-24 bg-gradient-to-r from-gold to-transparent" />

                                    <div className="prose prose-slate max-w-none text-muted-foreground italic text-lg line-height-relaxed">
                                        "Our commitment goes beyond simple staffing. We are dedicated to elevating the dental nursing profession by ensuring every placement reflects the high standards our practices expect and our nurses deserve."
                                    </div>

                                    <div className="flex items-center gap-6 pt-6">
                                        <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center text-white shadow-lg">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="font-heading font-bold text-3xl text-navy tracking-tight">Akosua Dapaah</p>
                                            <p className="text-gold font-bold uppercase tracking-widest text-xs mt-1">CEO & Founder</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image Column */}
                            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full">
                                <img
                                    src="/recruitment.png"
                                    alt="Akosua Dapaah"
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-navy/30 via-transparent to-white/10 lg:to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute top-10 right-10 flex flex-col gap-2">
                                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-gentle">
                                        <p className="text-navy font-bold text-center leading-none">100%</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Commitment</p>
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
