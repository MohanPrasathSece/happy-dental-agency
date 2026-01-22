import { Link } from "react-router-dom";
import { Scale, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6 text-gold">
                            <Scale className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Cultivating a harmonious and legally sophisticated professional landscape for dental excellence.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-border space-y-10 prose prose-slate max-w-none">

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Consensual Governance</h2>
                            </div>
                            <p>
                                By engaging with the Happy Dental Agency platform, you implicitly enter into a sophisticated covenant of mutual professional respect. These terms delineate the constitutional framework governing our recruitment and staffing services.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Professional Jurisdictions</h2>
                            </div>
                            <p>
                                Nurses registered with our agency are expected to maintain an impeccable standard of clinical practice. Similarly, partner dental practices are obligated to provide an environment conducive to ethical and safe dental nursing. We facilitate these connections as orchestrators of excellence, not as direct overseers of clinical outcomes.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Proprietary Assets</h2>
                            </div>
                            <p>
                                The digital architecture, visual aesthetics, and brand identity of Happy Dental Agency are protected by robust intellectual property laws. Unauthorized duplication or appropriation of our creative assets will be met with rigorous legal advocacy.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">Amendment Protocols</h2>
                            </div>
                            <p>
                                Happy Dental Agency reserves the exclusive prerogative to evolve these terms as the clinical and digital landscapes shift. Continued utilization of our services post-amendment signifies your voluntary alignment with our updated standards.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-border mt-10 text-center">
                            <p className="text-sm text-muted-foreground mb-6">
                                Should you require a detailed dissertation of these conditions, our legal liaisons are available for consultation.
                            </p>
                            <Link to="/contact">
                                <Button variant="cta">Consultation</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
