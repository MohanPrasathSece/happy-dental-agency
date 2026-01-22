import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6 text-gold">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Empowering your digital trust through transparent data stewardship at Happy Dental Agency.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-border space-y-10 prose prose-slate max-w-none">

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Our Ethical Commitment</h2>
                            </div>
                            <p>
                                At Happy Dental Agency, your privacy is not just a regulatory requirement—it is a cornerstone of our professional relationship. We believe in the sanctity of personal information and are committed to orchestrating a secure environment for all our clients and nursing professionals.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Data Acquisition & Utility</h2>
                            </div>
                            <p>
                                We curate personal identifiers to facilitate seamless dental staffing experiences. This includes, but is not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Professional credentials and clinical history for our dedicated nurses.</li>
                                <li>Strategic operational requirements for our partner dental practices.</li>
                                <li>Digital footprints strictly used to refine your artisanal user experience on our platform.</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Security Architecture</h2>
                            </div>
                            <p>
                                Utilizing state-of-the-art encryption protocols and rigorous administrative safeguards, we ensure your data resides in a fortress of digital protection. Our internal audits are meticulously designed to preempt vulnerabilities and maintain an impenetrable standard of confidentiality.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Rights & Autonomy</h2>
                            </div>
                            <p>
                                You retain ultimate sovereignty over your data. You may exercise your right to access, rectify, or expunge your information at any moment. Happy Dental Agency honors every request with swift precision and absolute transparency.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-border mt-10 text-center">
                            <p className="text-sm text-muted-foreground mb-6">
                                For further inquiries regarding our privacy tapestry, please reach out to our dedicated compliance team.
                            </p>
                            <Link to="/contact">
                                <Button variant="cta">Get in Touch</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
