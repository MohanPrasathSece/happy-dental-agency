
import { useEffect, useState } from "react";
import AdminPage from "@/components/admin/AdminPage";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar, Eye, CheckCircle2, FileText, ArrowUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Application {
    id: string;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    gdc_number: string;
    status: string;
    cover_letter?: string;
    hep_b_status?: string;
    resume_url?: string;
    hep_b_url?: string;
    created_at: string;
}

const AdminApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [deleteAppId, setDeleteAppId] = useState<string | null>(null);

    const fetchApplications = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            toast.error("Failed to load applications");
        } else {
            setApplications(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success("Status updated");
            setApplications(apps => apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
            if (selectedApp?.id === id) {
                setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
            }
        }
    };

    const deleteApplication = async (id: string) => {
        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error("Failed to delete application");
            console.error(error);
        } else {
            toast.success("Application deleted successfully");
            setApplications(apps => apps.filter(app => app.id !== id));
            if (selectedApp?.id === id) {
                setSelectedApp(null);
            }
        }
        setDeleteAppId(null);
    };

    return (
        <AdminPage
            title="Applications"
            subtitle="Manage incoming job applications."
        >
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-navy animate-spin" />
                    </div>
                ) : applications.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No applications received yet.
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Applying For</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>GDC</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                                        {new Date(app.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-medium text-navy">
                                        {app.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-navy bg-blue-50">
                                            {app.job_title || 'General'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <a href={`mailto:${app.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                                <Mail className="w-3 h-3" /> {app.email}
                                            </a>
                                            <a href={`tel:${app.phone}`} className="flex items-center gap-1 text-muted-foreground">
                                                <Phone className="w-3 h-3" /> {app.phone}
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell>{app.gdc_number || '-'}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                app.status === 'reviewed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                    app.status === 'contacted' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                                        'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                            }
                                        >
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                                onClick={() => setSelectedApp(app)}
                                            >
                                                <Eye className="w-4 h-4 text-gray-500" />
                                                <span className="sr-only">View Details</span>
                                            </Button>
                                            {app.status === 'pending' && (
                                                <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(app.id, 'reviewed')}>
                                                    Mark Reviewed
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 hover:bg-red-50"
                                                onClick={() => setDeleteAppId(app.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                <span className="sr-only">Delete Application</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Application Details Dialog */}
            <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
                <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-heading font-bold text-navy flex items-center justify-between">
                            <span>Application Details</span>
                            {selectedApp && (
                                <Badge
                                    className={
                                        selectedApp.status === 'reviewed' ? 'bg-green-100 text-green-700' :
                                            selectedApp.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                    }
                                >
                                    {selectedApp.status}
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Submitted on {selectedApp && new Date(selectedApp.created_at).toLocaleString()}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedApp && (
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <div className="space-y-6 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Applicant Name</p>
                                        <p className="font-semibold text-navy text-lg">{selectedApp.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Applying For</p>
                                        <p className="font-medium text-navy">{selectedApp.job_title}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Email Address</p>
                                        <a href={`mailto:${selectedApp.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {selectedApp.email}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Phone Number</p>
                                        <a href={`tel:${selectedApp.phone}`} className="text-gray-700 hover:text-navy flex items-center gap-1">
                                            <Phone className="w-3 h-3" /> {selectedApp.phone}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">GDC Number</p>
                                        <p className="font-mono text-gray-600">{selectedApp.gdc_number || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Hepatitis B</p>
                                        <div className="flex flex-col gap-2">
                                            <Badge variant="outline" className={
                                                selectedApp.hep_b_status === 'Fully Vaccinated' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    selectedApp.hep_b_status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-red-50 text-red-700 border-red-200'
                                            }>
                                                {selectedApp.hep_b_status || 'Not Specified'}
                                            </Badge>
                                            {selectedApp.hep_b_url && (
                                                <Button size="sm" variant="ghost" className="h-7 text-[10px] gap-1.5 text-navy hover:text-gold" onClick={() => window.open(selectedApp.hep_b_url, '_blank')}>
                                                    <FileText className="w-3 h-3" /> View Certificate
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase">Resume / CV</p>
                                    {selectedApp.resume_url ? (
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between hover:border-gold hover:text-navy"
                                            onClick={() => window.open(selectedApp.resume_url, '_blank')}
                                        >
                                            <span className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-navy" />
                                                View Candidate Resume
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                        </Button>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No resume uploaded</p>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-2">Cover Letter / Notes</p>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedApp.cover_letter || "No cover letter provided."}
                                    </p>
                                </div>

                                <div className="flex gap-3 justify-between pt-2">
                                    <Button
                                        onClick={() => {
                                            setDeleteAppId(selectedApp.id);
                                            setSelectedApp(null);
                                        }}
                                        variant="outline"
                                        className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete Application
                                    </Button>
                                    <div className="flex gap-3">
                                        {selectedApp.status === 'pending' && (
                                            <Button onClick={() => updateStatus(selectedApp.id, 'reviewed')} variant="outline" className="gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> Mark as Reviewed
                                            </Button>
                                        )}
                                        <Button onClick={() => window.location.href = `mailto:${selectedApp.email}`} className="bg-navy text-white hover:bg-gold hover:text-navy gap-2">
                                            <Mail className="w-4 h-4" /> Reply via Email
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteAppId} onOpenChange={(open) => !open && setDeleteAppId(null)}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-navy">Delete Application</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this application? This action cannot be undone.
                            All application data including resume and documents will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteAppId && deleteApplication(deleteAppId)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminPage>
    );
};

export default AdminApplications;
