import { Link } from "react-router-dom";
import { Scale, CheckCircle, AlertCircle, FileText, Briefcase, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6 text-navy">
                            <Scale className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Governing our professional recruitment and staffing standards in the UK.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-border space-y-10 prose prose-slate max-w-none">

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Briefcase className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">1. Nature of Services</h2>
                            </div>
                            <p>
                                Happy Dental Agency acts as an employment agency for permanent placements and an employment business for temporary/locum placements. These terms constitute the agreement between us, the Dental Practice ("the Client"), and the Dental Nurse ("the Candidate").
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">2. Candidate Compliance</h2>
                            </div>
                            <p>
                                All candidates registered with Happy Dental Agency are required to provide valid GDC registration, current DBS certification, and proof of immunity. Candidates must adhere to the GDC Standards for the Dental Team at all times while on assignment.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">3. Practice Obligations</h2>
                            </div>
                            <p>
                                Dental Practices must provide a safe working environment and ensure that all equipment used by the agency staff is in good working order and complies with health and safety regulations. Practices must also provide necessary site-specific inductions.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">4. Bookings & Cancellations</h2>
                            </div>
                            <p>
                                Bookings are confirmed once Happy Dental Agency issues a confirmation email. Cancellation fees may apply if a booking is cancelled by the Client within 24-48 hours of the assignment start time.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">5. Professional Liability</h2>
                            </div>
                            <p>
                                While we vet all candidates, the final clinical responsibility rests with the Clinical Lead of the Dental Practice. Candidates must maintain their own professional indemnity insurance as per GDC requirements.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">6. Governing Law</h2>
                            </div>
                            <p>
                                These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-border mt-10 text-center">
                            <Link to="/contact">
                                <Button variant="cta">View Full Terms</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
