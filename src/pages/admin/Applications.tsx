
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Application {
    id: string;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    gdc_number: string;
    status: string;
    created_at: string;
}

const AdminApplications = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                                            {app.status === 'pending' && (
                                                <Button size="sm" variant="outline" onClick={() => updateStatus(app.id, 'reviewed')}>
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
        </AdminLayout>
    );
};

export default AdminApplications;
