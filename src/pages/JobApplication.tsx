
import PageHeaderComp from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const JobApplication = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gdcNumber: "",
        coverLetter: ""
    });

    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) return;
            const { data, error } = await supabase
                .from('jobs')
                .select('title')
                .eq('id', jobId)
                .single();

            if (data) {
                setJobTitle(data.title);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from('applications')
                .insert([{
                    job_id: jobId,
                    job_title: jobTitle,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    gdc_number: formData.gdcNumber
                    // status is 'pending' by default
                }]);

            if (dbError) throw dbError;

            // 2. Send Notifications (Client & Admin) - calling our existing API
            // We use the 'type' field to distinguish this as a job application
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    type: `Job Application: ${jobTitle}`,
                    message: `
                        Applicant Name: ${formData.name}
                        Job Title: ${jobTitle}
                        Phone: ${formData.phone}
                        GDC Number: ${formData.gdcNumber}
                        
                        Cover Letter / Notes:
                        ${formData.coverLetter}
                    `,
                    subject: `New Application: ${jobTitle} - ${formData.name}`
                })
            });

            if (!response.ok) {
                console.warn("Email API warning:", await response.text());
            }

            setIsSubmitted(true);
            window.scrollTo(0, 0);

        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/30">
                <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-border">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-4">Application Sent!</h2>
                    <p className="text-muted-foreground mb-8">
                        Thank you for applying for the position of <strong>{jobTitle}</strong>.
                        Our team will review your application and get back to you shortly.
                    </p>
                    <Link to="/jobs">
                        <Button className="bg-navy hover:bg-gold hover:text-navy text-white min-w-[200px]">
                            Back to Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main>
            <SEO
                title={`Apply for ${jobTitle || 'Job'} | Happy Dental Agency`}
                description="Submit your application for dental nursing positions."
            />
            <PageHeaderComp
                badge="Careers"
                title="Job Application"
                subtitle={`Applying for: ${jobTitle || 'Loading...'}`}
            />

            <section className="section-padding bg-white">
                <div className="container-custom max-w-2xl">
                    <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Job Listings
                    </Link>

                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-border/50">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Full Name *</Label>
                                    <Input
                                        required
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address *</Label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="jane@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Phone Number *</Label>
                                    <Input
                                        required
                                        placeholder="07700 900000"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>GDC Number (if applicable)</Label>
                                    <Input
                                        placeholder="123456"
                                        value={formData.gdcNumber}
                                        onChange={e => setFormData({ ...formData, gdcNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Cover Letter / Additional Notes</Label>
                                <Textarea
                                    className="h-32"
                                    placeholder="Tell us a bit about your experience..."
                                    value={formData.coverLetter}
                                    onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg bg-navy hover:bg-gold hover:text-navy text-white transition-all shadow-lg shadow-navy/20"
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : (
                                    <>
                                        Submit Application <Send className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JobApplication;
