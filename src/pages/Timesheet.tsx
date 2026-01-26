import PageHeader from "@/components/PageHeader";
import TimesheetForm from "@/components/forms/TimesheetForm";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";
import { Clock, ShieldCheck, Mail } from "lucide-react";

const Timesheet = () => {
    return (
        <main>
            <SEO
                title="Submit Timesheet | Happy Dental Agency"
                description="Electronic timesheet submission for dental nurses. Fill out your shift details and share them with the practice and our team automatically."
            />
            <PageHeader
                badge="Nurse Tools"
                title="Electronic Timesheet"
                subtitle="Submit your shift hours quickly and securely. No more paper timesheets."
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Info Side */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-navy rounded-[2rem] p-8 text-white">
                                <h3 className="text-2xl font-heading font-bold mb-6">How it works</h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0 font-bold text-navy">1</div>
                                        <p className="text-white/80">Fill in your name and shift date/location.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0 font-bold text-navy">2</div>
                                        <p className="text-white/80">Enter your start time, end time and total break taken.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0 font-bold text-navy">3</div>
                                        <p className="text-white/80">Hand the device to the Practice Manager to verify the entries.</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-champagne-light rounded-[2rem] p-8 border border-gold/20">
                                <h4 className="font-heading font-bold text-navy mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-gold" />
                                    Why E-Timesheets?
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-navy/40 mt-1" />
                                        <p className="text-sm text-navy/70">Instant tracking and faster payments.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-navy/40 mt-1" />
                                        <p className="text-sm text-navy/70">Automatic email confirmation for both you and the practice.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-large border border-border">
                                <TimesheetForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection variant="nurses" />
        </main>
    );
};

export default Timesheet;
