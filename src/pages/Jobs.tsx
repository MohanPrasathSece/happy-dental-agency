
import PageHeaderComp from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";
import { MapPin, Banknote, Calendar, ArrowRight, Loader2, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Job {
    id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    postedDate: string;
}

const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Application Modal State
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gdcNumber: "",
        coverLetter: ""
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Check if Supabase is configured
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                if (!supabaseUrl || supabaseUrl.includes("PLEASE_PASTE")) {
                    console.warn("Supabase not configured yet");
                    setIsLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data) {
                    setJobs(data.map(job => ({
                        id: job.id,
                        title: job.title,
                        location: job.location,
                        type: job.type,
                        salary: job.salary,
                        description: job.description,
                        postedDate: new Date(job.created_at).toLocaleDateString()
                    })));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleApplyClick = (job: Job) => {
        setSelectedJob(job);
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", gdcNumber: "", coverLetter: "" });
        setIsApplicationOpen(true);
    };

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;
        setIsSubmitting(true);

        try {
            // 1. Save to Supabase (Dashboard)
            const { error: dbError } = await supabase
                .from('applications')
                .insert([{
                    job_id: selectedJob.id,
                    job_title: selectedJob.title,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    gdc_number: formData.gdcNumber
                }]);

            if (dbError) throw dbError;

            // 2. Send Notifications (Email)
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    type: `Job Application: ${selectedJob.title}`,
                    message: `
                        Applicant Name: ${formData.name}
                        Job Title: ${selectedJob.title}
                        Phone: ${formData.phone}
                        GDC Number: ${formData.gdcNumber}
                        
                        Cover Letter / Notes:
                        ${formData.coverLetter}
                    `,
                    subject: `New Application: ${selectedJob.title} - ${formData.name}`
                })
            });

            if (!response.ok) {
                console.warn("Email API warning");
            }

            setIsSuccess(true);
            toast.success("Application submitted successfully!");

        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
            setIsSubmitting(false); // Only stop loading if error, otherwise keep success state
        }
    };

    return (
        <main>
            <SEO
                title="Jobs | Dental Nursing Vacancies in London"
                description="Browse the latest dental nursing jobs in London. Qualified and trainee positions available with competitive salaries."
            />
            <PageHeaderComp
                badge="Careers"
                title="Join Our Team"
                subtitle="Explore the latest opportunities for dental nurses across London."
            />

            <section className="section-padding bg-muted/30">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            </div>
                        ) : jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 hover:shadow-md transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="bg-primary/20 text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        {job.type}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        Posted: {job.postedDate}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-heading font-bold text-navy group-hover:text-gold transition-colors">
                                                    {job.title}
                                                </h3>
                                            </div>

                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Banknote className="w-4 h-4 text-primary" />
                                                    {job.salary}
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {job.description}
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0 pt-2">
                                            <Button
                                                onClick={() => handleApplyClick(job)}
                                                className="w-full md:w-auto gap-2 bg-navy hover:bg-gold text-white"
                                            >
                                                Apply Now <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-border/50 shadow-sm">
                                <h3 className="text-xl font-heading font-bold text-navy mb-2">No Vacancies Currently</h3>
                                <p className="text-muted-foreground">Please check back later or contact us directly.</p>
                                <div className="mt-6">
                                    <Link to="/contact">
                                        <Button variant="outline">Contact Us</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <CTASection variant="nurses" />

            {/* Application Modal */}
            <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
                <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
                    <div className="absolute right-4 top-4 z-50">
                        {/* Shadcn Dialog Close is automatic, but we can add UI if needed */}
                    </div>
                    {!isSuccess ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-navy">Apply for {selectedJob?.title}</DialogTitle>
                                <DialogDescription>
                                    Please fill out the form below to submit your application.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleApplicationSubmit} className="space-y-6 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <Label>Cover Letter / Notes</Label>
                                    <Textarea
                                        className="h-32"
                                        placeholder="Tell us about yourself..."
                                        value={formData.coverLetter}
                                        onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-navy hover:bg-gold hover:text-navy text-white text-lg h-12"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : (
                                        <>Submit Application <Send className="w-4 h-4 ml-2" /></>
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy">Application Sent!</h2>
                            <p className="text-muted-foreground max-w-sm">
                                Thank you for applying to be a <strong>{selectedJob?.title}</strong>. We have received your details and will be in touch shortly.
                            </p>
                            <Button
                                onClick={() => setIsApplicationOpen(false)}
                                variant="outline"
                            >
                                Close
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default Jobs;
