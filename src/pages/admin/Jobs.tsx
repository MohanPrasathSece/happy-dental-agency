
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, MapPin, Banknote, Calendar, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const AdminJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<Job>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

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

    return (
        <AdminLayout
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
        </AdminLayout>
    );
};

export default AdminJobs;
