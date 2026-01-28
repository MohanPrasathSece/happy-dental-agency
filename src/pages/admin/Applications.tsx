
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar, Eye, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
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
    created_at: string;
}

const AdminApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

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

    return (
        <AdminLayout
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
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-2">Cover Letter / Notes</p>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedApp.cover_letter || "No cover letter provided."}
                                    </p>
                                </div>

                                <div className="flex gap-3 justify-end pt-2">
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
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default AdminApplications;
