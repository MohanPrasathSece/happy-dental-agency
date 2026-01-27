import PageHeaderComp from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { Target, Eye, Heart, Shield, Award, Users, GraduationCap, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Care & Compassion",
            desc: "We treat every placement and every practice with genuine heart and understanding.",
        },
        {
            icon: Shield,
            title: "Integrity & Trust",
            desc: "Building lasting relationships through honesty, transparency, and reliable service.",
        },
        {
            icon: Award,
            title: "Excellence",
            desc: "Maintaining the highest standards in dental nursing recruitment and placement.",
        },
    ];

    return (
        <main>
            <SEO
                title="About Us | London Dental Nursing Recruitment Experts"
                description="Learn about Happy Dental Agency's mission to provide the best dental nursing staffing solutions across London. Dedicated to excellence and diversity."
            />
            <PageHeaderComp
                badge="About Us"
                title="Our Journey & Mission"
                subtitle="Dedicated to connecting the best dental talent with leading practices across London."
            />

            {/* Mission Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-up">
                            <h2 className="text-3xl font-heading font-bold text-navy mb-6">
                                Providing Excellence in Dental Staffing
                            </h2>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                Happy Dental Agency was founded with a clear vision: to elevate the standard of dental nursing recruitment. We understand the challenges that both practices and nurses face in the modern dental industry.
                            </p>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                Our team is passionate about creating perfect matches. We don't just fill gaps; we build long-term partnerships that benefit practices, professionals, and ultimately, patients.
                            </p>

                            <div className="space-y-4">
                                {values.map((value, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                                            <value.icon className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-navy mb-1">{value.title}</h3>
                                            <p className="text-sm text-muted-foreground">{value.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in group">
                            <img
                                src="/qualified-nurse.png"
                                alt="Qualified Dental Nurse"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CEO Section - Blended Premium Design */}
            <section className="section-padding bg-white overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-slide-up order-2 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                                LEADERSHIP
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 leading-tight">
                                Setting the Standard in <br />
                                <span className="text-gold">Dental Excellence</span>
                            </h2>

                            <div className="relative mb-6">
                                <div className="absolute -left-4 -top-4 text-gold/10 text-7xl font-serif">"</div>
                                <p className="text-lg md:text-xl text-navy/80 italic leading-relaxed font-medium pl-6">
                                    "At Happy Dental Agency, we believe that the heart of every successful practice is its people. My mission is to ensure that every dental professional we place is not just qualified, but truly happy and supported in their role."
                                </p>
                            </div>

                            <p className="text-muted-foreground text-base mb-8 leading-relaxed border-l-4 border-gold/30 pl-6">
                                Our commitment goes beyond simple staffing. We are dedicated to elevating the dental nursing profession by ensuring every placement reflects the high standards our practices expect and our nurses deserve.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white shadow-lg">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-xl text-navy">Akosua Dapaah</p>
                                        <p className="text-muted-foreground font-semibold text-sm">CEO & Founder</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 pl-0 sm:pl-6 sm:border-l border-border">
                                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm" aria-label="LinkedIn">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm" aria-label="Twitter">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm" aria-label="Instagram">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm" aria-label="Facebook">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[700px] rounded-[2.5rem] overflow-hidden group shadow-2xl order-1 lg:order-1">
                            <img
                                src="/ceo-office.png"
                                alt="Professional Dental Office"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Diversity & Inclusion Section */}
            <section className="section-padding bg-muted/30">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">
                                Celebrating <span className="text-gold">Diversity</span> in Dentistry
                            </h2>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                At Happy Dental Agency, we take immense pride in our multi-cultural and diverse network of dental professionals. We understand that representation matters—not just for our staff, but for the varied patient communities they serve across London.
                            </p>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                From qualified dental nurses and dedicated trainees to professionals from all backgrounds and faiths, we create an environment where everyone feels valued and supported. Whether it's accommodating religious requirements like the hijab or celebrating our Asian and international colleagues, diversity is our strength.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-border">
                                    <p className="font-bold text-navy text-xl mb-1">15+</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Nationalities</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-border">
                                    <p className="font-bold text-navy text-xl mb-1">100%</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Inclusive</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 lg:gap-6 relative pt-12 lg:pt-0">
                            {/* Decorative background element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[100px] -z-10" />

                            <div className="space-y-4 lg:space-y-6">
                                {/* Large Featured Image */}
                                <div className="aspect-[3/4] bg-navy/5 rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group relative transform hover:-rotate-1 transition-all duration-500">
                                    <img
                                        src="/images/black%20nurse%202.png"
                                        alt="Qualified Dental Nurse"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                {/* Bottom Overlap Image */}
                                <div className="aspect-square bg-gold/5 rounded-[1.5rem] overflow-hidden shadow-xl border border-white/20 group relative lg:-mt-12 lg:ml-8 transform hover:rotate-1 transition-all duration-500">
                                    <img
                                        src="/images/hijab%20woman.png"
                                        alt="Inclusive Dental Care"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                {/* Floating Sideways Image */}
                                <div className="aspect-[4/5] w-full bg-navy/5 rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group relative lg:-ml-4 transform hover:scale-[1.02] transition-all duration-500">
                                    <img
                                        src="/images/asian-woman.png"
                                        alt="Professional Dental Recruitment"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection variant="general" />
        </main>
    );
};

export default About;
