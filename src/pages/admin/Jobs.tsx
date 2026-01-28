
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
                <Button onClick={openNewJob} className="gap-2 bg-navy hover:bg-gold hover:text-navy transition-colors">
                    <Plus size={18} /> Post New Job
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded-xl border border-border/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${job.type === 'Locum' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}
                                `}>
                                    {job.type}
                                </span>
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(job.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-navy">{job.title}</h3>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                <span className="flex items-center gap-1"><Banknote className="w-3 h-3" /> {job.salary}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditJob(job)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                <Pencil size={16} />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 size={16} />
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
