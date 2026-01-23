import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText, Bell, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6 text-navy">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Compliant with the UK Data Protection Act 2018 and UK GDPR.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-border space-y-10 prose prose-slate max-w-none">

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">1. Introduction</h2>
                            </div>
                            <p>
                                Happy Dental Agency ("we", "our", or "us") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">2. Data We Collect</h2>
                            </div>
                            <p>For Dental Nurses and Staff, we collect:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact details (name, address, email, phone number).</li>
                                <li>Professional credentials (GDC registration, qualifications).</li>
                                <li>Compliance documents (DBS checks, ID, right to work, immunisation records).</li>
                                <li>Employment history and references.</li>
                            </ul>
                            <p className="mt-4">For Dental Practices, we collect:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Practice details and contact person information.</li>
                                <li>Site-specific requirements and health & safety documentation.</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">3. How We Use Your Data</h2>
                            </div>
                            <p>
                                We use your data primarily to facilitate the matching of dental nurses with clinical vacancies. This includes verifying compliance, processing bookings, and ensuring the safety of patient care in partner practices.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">4. Data Security</h2>
                            </div>
                            <p>
                                We implement robust technical and organisational measures to secure your data. Access is restricted to authorised personnel only, and sensitive documents are stored in encrypted environments.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Bell className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">5. Your Rights</h2>
                            </div>
                            <p>Under UK data protection law, you have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request access to your personal data.</li>
                                <li>Request correction of inaccurate data.</li>
                                <li>Request erasure of your data ("right to be forgotten").</li>
                                <li>Object to or restrict the processing of your data.</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-navy" />
                                <h2 className="text-2xl font-heading font-bold text-navy m-0">6. Contacts</h2>
                            </div>
                            <p>
                                If you have any questions about this policy or our data practices, please contact us at <strong>info@happydentalagency.co.uk</strong>. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO).
                            </p>
                        </section>

                        <div className="pt-10 border-t border-border mt-10 text-center">
                            <Link to="/contact">
                                <Button variant="cta">Inquire About Data</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
