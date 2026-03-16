
import { useState, useEffect } from "react";
import AdminPage from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, MapPin, Banknote, Calendar, Briefcase, Users, Mail, Phone, FileText, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
    id: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    created_at: string;
}

interface Application {
    id: string;
    job_id: string;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    gdc_number: string;
    cover_letter?: string;
    hep_b_status?: string;
    resume_url?: string;
    hep_b_url?: string;
    status: string;
    created_at: string;
}

const AdminJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<Job>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Applicants viewing state
    const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
    const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<Job | null>(null);
    const [applicants, setApplicants] = useState<Application[]>([]);
    const [loadingApplicants, setLoadingApplicants] = useState(false);

    const fetchJobs = async () => {
        setIsLoading(true);
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

            if (error) {
                console.error(error);
                toast.error("Failed to fetch jobs");
            } else {
                setJobs(data || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSaveJob = async () => {
        // Validation
        if (!currentJob.title || !currentJob.location) {
            toast.error("Please fill in required fields");
            return;
        }

        setIsSaving(true);

        try {
            const jobData = {
                title: currentJob.title,
                location: currentJob.location,
                type: currentJob.type,
                salary: currentJob.salary,
                description: currentJob.description
                // created_at will be handled by default in DB usually, or we let supabase handle it
            };

            if (isEditing && currentJob.id) {
                const { error } = await supabase
                    .from('jobs')
                    .update(jobData)
                    .eq('id', currentJob.id);
                if (error) throw error;
                toast.success("Job updated successfully");
            } else {
                const { error } = await supabase
                    .from('jobs')
                    .insert([jobData]);
                if (error) throw error;
                toast.success("Job posted successfully");
            }

            setIsDialogOpen(false);
            fetchJobs();
        } catch (error: any) {
            toast.error(error.message || "Error saving job");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            const { error } = await supabase.from('jobs').delete().eq('id', id);
            if (error) {
                toast.error("Failed to delete job");
            } else {
                toast.success("Job deleted");
                fetchJobs();
            }
        }
    };

    const openNewJob = () => {
        setCurrentJob({ type: "Full-time" });
        setIsEditing(false);
        setIsDialogOpen(true);
    };

    const openEditJob = (job: Job) => {
        setCurrentJob(job);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const fetchApplicantsForJob = async (jobId: string) => {
        setLoadingApplicants(true);
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .eq('job_id', jobId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error(error);
                toast.error("Failed to fetch applicants");
            } else {
                setApplicants(data || []);
            }
        } catch (e) {
            console.error(e);
            toast.error("Error loading applicants");
        } finally {
            setLoadingApplicants(false);
        }
    };

    const openApplicantsDialog = (job: Job) => {
        setSelectedJobForApplicants(job);
        setIsApplicantsDialogOpen(true);
        fetchApplicantsForJob(job.id);
    };

    return (
        <AdminPage
            title="Jobs Management"
            subtitle="Post, edit, and manage your job listings."
            action={
                <Button
                    onClick={openNewJob}
                    className="h-11 px-6 gap-2 bg-gold text-navy font-bold rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:bg-[#F5C518] hover:scale-105 transition-all duration-300"
                >
                    <Plus size={18} strokeWidth={2.5} /> Post New Job
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-navy/5 hover:border-gold/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm
                                    ${job.type === 'Locum' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}
                                `}>
                                    {job.type}
                                </span>
                                <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(job.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-heading font-bold text-navy group-hover:text-gold transition-colors duration-300">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100"><MapPin className="w-3.5 h-3.5 text-navy/70" /> {job.location}</span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100"><Banknote className="w-3.5 h-3.5 text-navy/70" /> {job.salary}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform md:translate-x-4 md:group-hover:translate-x-0">
                            <Button variant="outline" size="sm" onClick={() => openApplicantsDialog(job)} className="h-10 px-3 rounded-xl border-gray-200 text-gray-600 hover:text-green-600 hover:bg-green-50 hover:border-green-200 transition-colors gap-2">
                                <Users size={16} /> Applicants
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => openEditJob(job)} className="h-10 w-10 rounded-xl border-gray-200 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                <Pencil size={18} />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(job.id)} className="h-10 w-10 rounded-xl border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors">
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>
                ))}

                {!isLoading && jobs.length === 0 && (
                    <div className="p-12 text-center bg-white rounded-xl border border-dashed border-border">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-navy">No jobs posted yet</h3>
                        <p className="text-muted-foreground mb-6">Create your first job listing to get started.</p>
                        <Button onClick={openNewJob}>Create Job</Button>
                    </div>
                )}
            </div>

            {/* Job Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Job Listing" : "Post New Job Listing"}</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label>Job Title</Label>
                            <Input
                                value={currentJob.title || ""}
                                onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                                placeholder="e.g. Senior Dental Nurse"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={currentJob.location || ""}
                                onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                                placeholder="e.g. Central London"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Job Type</Label>
                            <Select
                                value={currentJob.type}
                                onValueChange={(val: any) => setCurrentJob({ ...currentJob, type: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Locum">Locum</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Salary Range</Label>
                            <Input
                                value={currentJob.salary || ""}
                                onChange={(e) => setCurrentJob({ ...currentJob, salary: e.target.value })}
                                placeholder="e.g. £28,000 - £32,000 per annum"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                                value={currentJob.description || ""}
                                onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                                placeholder="Enter job description..."
                                className="h-32"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveJob} className="bg-navy text-white hover:bg-gold hover:text-navy" disabled={isSaving}>
                            {isSaving ? "Saving..." : (isEditing ? "Save Changes" : "Post Job")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Applicants Dialog */}
            <Dialog open={isApplicantsDialogOpen} onOpenChange={setIsApplicantsDialogOpen}>
                <DialogContent className="max-w-4xl bg-white max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Applicants for {selectedJobForApplicants?.title}</DialogTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'} found
                        </p>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {loadingApplicants ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
                            </div>
                        ) : applicants.length > 0 ? (
                            applicants.map((applicant) => (
                                <div key={applicant.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-navy">{applicant.name}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                Applied on {new Date(applicant.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${applicant.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            applicant.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {applicant.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Mail className="w-4 h-4 text-navy/60" />
                                            <a href={`mailto:${applicant.email}`} className="hover:underline hover:text-gold truncate">
                                                {applicant.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Phone className="w-4 h-4 text-navy/60" />
                                            <a href={`tel:${applicant.phone}`} className="hover:underline hover:text-gold">
                                                {applicant.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-100">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">GDC Number</p>
                                            <p className="text-sm font-medium text-navy">{applicant.gdc_number || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hep B Status</p>
                                            <Badge variant="outline" className={`text-[10px] h-5 ${applicant.hep_b_status === 'Fully Vaccinated' ? 'bg-green-50 text-green-700' :
                                                applicant.hep_b_status === 'In Progress' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50'
                                                }`}>
                                                {applicant.hep_b_status || 'Not Specified'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Documents</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {applicant.resume_url && applicant.resume_url.length > 5 ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-10 gap-2 justify-start border-gray-200 hover:border-gold hover:bg-gold/5 w-full bg-white shadow-sm"
                                                    onClick={() => window.open(applicant.resume_url, '_blank', 'noopener,noreferrer')}
                                                >
                                                    <div className="w-6 h-6 rounded bg-navy/5 flex items-center justify-center">
                                                        <FileText className="w-3.5 h-3.5 text-navy" />
                                                    </div>
                                                    <span className="text-xs font-semibold truncate flex-1 text-left">View Resume / CV</span>
                                                    <ArrowUpRight className="w-3 h-3 text-gold ml-auto" />
                                                </Button>
                                            ) : (
                                                <div className="h-10 border border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50/50 w-full px-3">
                                                    <span className="text-[10px] text-gray-400 italic">No Resume Provided</span>
                                                </div>
                                            )}

                                            {applicant.hep_b_url && applicant.hep_b_url.length > 5 ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-10 gap-2 justify-start border-gray-200 hover:border-gold hover:bg-gold/5 w-full bg-white shadow-sm"
                                                    onClick={() => window.open(applicant.hep_b_url, '_blank', 'noopener,noreferrer')}
                                                >
                                                    <div className="w-6 h-6 rounded bg-green-50 flex items-center justify-center">
                                                        <FileText className="w-3.5 h-3.5 text-green-700" />
                                                    </div>
                                                    <span className="text-xs font-semibold truncate flex-1 text-left">Vaccine Certificate</span>
                                                    <ArrowUpRight className="w-3 h-3 text-gold ml-auto" />
                                                </Button>
                                            ) : (
                                                <div className="h-10 border border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50/50 w-full px-3">
                                                    <span className="text-[10px] text-gray-400 italic font-medium">No Vaccine Cert</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {applicant.cover_letter && (
                                        <div className="mt-2 pt-4 border-t border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Letter / Notes</p>
                                            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 italic">
                                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                    {applicant.cover_letter}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-gray-600">No applicants yet</h3>
                                <p className="text-sm text-gray-500">Applications will appear here when candidates apply for this position.</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-4 pt-4 border-t">
                        <Button variant="outline" onClick={() => setIsApplicantsDialogOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminPage>
    );
};

export default AdminJobs;
