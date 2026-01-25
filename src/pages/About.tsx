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

            {/* CEO Section - Grand Visionary Design */}
            <section className="bg-navy overflow-hidden relative">
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Left side: Image with cinematic overlay */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px]">
                        <img
                            src="/recruitment.png"
                            alt="Akosua Dapaah"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-navy lg:to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 lg:hidden">
                            <p className="font-heading font-bold text-3xl text-white tracking-tight">Akosua Dapaah</p>
                            <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs">CEO & Founder</p>
                        </div>
                    </div>

                    {/* Right side: Bold content */}
                    <div className="w-full lg:w-1/2 flex items-center p-8 md:p-16 lg:p-24 relative bg-navy">
                        <div className="absolute top-10 right-10 opacity-5 select-none text-[20rem] font-bold text-white pointer-events-none leading-none">
                            "
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="h-px w-12 bg-gold"></span>
                                <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm">Leadership Vision</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-10 leading-[1.1]">
                                Our Commitment <br />
                                <span className="text-gold italic">Defined.</span>
                            </h2>

                            <div className="space-y-10">
                                <div className="relative pl-8 border-l-4 border-gold/40">
                                    <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-light italic">
                                        "At the intersection of care and professionalism, we find the true essence of dental nursing. We aren't just staffing practices; we are empowering the backbone of UK dentistry."
                                    </p>
                                </div>

                                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                                    Under Akosua's leadership, Happy Dental Agency has evolved into more than a recruitment firm. It is a community where quality meets compassion, ensuring every nurse is valued and every patient receives exceptional care from happy professionals.
                                </p>

                                <div className="hidden lg:block pt-8">
                                    <p className="font-heading font-bold text-4xl text-white tracking-tight">Akosua Dapaah</p>
                                    <p className="text-gold font-bold uppercase tracking-[0.4em] text-xs mt-3">Founder, Happy Dental Agency</p>
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
