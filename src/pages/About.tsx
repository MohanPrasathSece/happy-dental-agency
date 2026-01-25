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

            {/* CEO Section - Redesigned */}
            <section className="section-padding bg-white overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-champagne-light/30 -skew-x-12 translate-x-32 z-0" />

                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                            {/* Image Part */}
                            <div className="w-full md:w-5/12 relative">
                                <div className="absolute -inset-4 bg-gold/20 rounded-[2rem] blur-xl animate-pulse-slow" />
                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                                    <img
                                        src="/recruitment.png"
                                        alt="Akosua Dapaah - CEO"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                                </div>
                                {/* Decorative badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-in-right">
                                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Founder</p>
                                        <p className="text-sm font-bold text-navy">Akosua Dapaah</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="w-full md:w-7/12">
                                <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                    Leadership
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-8 leading-tight">
                                    Our Commitment <br />
                                    <span className="text-gold">to You</span>
                                </h2>

                                <div className="relative mb-10">
                                    <div className="absolute -left-6 -top-4 text-gold/20 select-none">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017C12.4647 13 12.017 12.5523 12.017 12V9C12.017 7.34315 13.3601 6 15.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 16.6569 20.6739 18 19.017 18H16.017L16.017 21H14.017ZM4.01695 21L4.01695 18C4.01695 16.8954 4.91238 16 6.01695 16H9.01695C9.56923 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56923 8 9.01695 8H6.01695C5.46467 8 5.01695 8.44772 5.01695 9V12C5.01695 12.5523 4.56923 13 4.01695 13H3.01695C2.46467 13 2.01695 12.5523 2.01695 12V9C2.01695 7.34315 3.3601 6 5.01695 6H9.01695C10.6738 6 12.017 7.34315 12.017 9V15C12.017 16.6569 10.6738 18 9.01695 18H6.01695L6.01695 21H4.01695Z" />
                                        </svg>
                                    </div>
                                    <p className="text-xl md:text-2xl text-navy/80 font-medium leading-relaxed italic relative z-10">
                                        "At Happy Dental Agency, we believe that the heart of every successful practice is its people. My mission is to ensure that every dental professional we place is not just qualified, but truly happy and supported in their role."
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        With a focus on integrity and professional excellence, Akosua leads Happy Dental Agency with a hands-on approach, personally ensuring that the values of the agency are reflected in every interaction with our nurses and partner practices.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 w-12 bg-gold" />
                                        <div>
                                            <p className="font-heading font-bold text-2xl text-navy">Akosua Dapaah</p>
                                            <p className="text-gold font-bold uppercase tracking-widest text-[10px]">CEO & Founder</p>
                                        </div>
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
