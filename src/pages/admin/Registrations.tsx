
import { useEffect, useState } from "react";
import AdminPage from "@/components/admin/AdminPage";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, MapPin, Eye, CheckCircle2, FileText, ArrowUpRight, GraduationCap, UserCheck, Trash2 } from "lucide-react";
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

interface Registration {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    location: string;
    nurse_status: string;
    gdc_number?: string;
    work_preference: string;
    hep_b_vaccination: string;
    message?: string;
    cv_url?: string;
    hep_b_url?: string;
    status: string;
    created_at: string;
}

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [deleteRegId, setDeleteRegId] = useState<string | null>(null);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('nurse_registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error(error);
                toast.error("Failed to load registrations");
            } else {
                setRegistrations(data || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('nurse_registrations')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success("Status updated");
            setRegistrations(regs => regs.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg));
            if (selectedReg?.id === id) {
                setSelectedReg(prev => prev ? { ...prev, status: newStatus } : null);
            }
        }
    };

    const deleteRegistration = async (id: string) => {
        const { error } = await supabase
            .from('nurse_registrations')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error("Failed to delete registration");
            console.error(error);
        } else {
            toast.success("Registration deleted successfully");
            setRegistrations(regs => regs.filter(reg => reg.id !== id));
            if (selectedReg?.id === id) {
                setSelectedReg(null);
            }
        }
        setDeleteRegId(null);
    };

    return (
        <AdminPage
            title="Nurse Registrations"
            subtitle="Manage registrations for qualified and trainee nurses."
        >
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-navy animate-spin" />
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No registrations received yet.
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Nurse Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Process</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((reg) => (
                                <TableRow key={reg.id}>
                                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                                        {new Date(reg.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-medium text-navy">
                                        {reg.full_name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`gap-1.5 ${reg.nurse_status === 'qualified' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                                            {reg.nurse_status === 'qualified' ? <UserCheck className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                                            {reg.nurse_status.charAt(0).toUpperCase() + reg.nurse_status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                            <MapPin className="w-3 h-3" />
                                            {reg.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <a href={`mailto:${reg.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                                <Mail className="w-3 h-3" /> {reg.email}
                                            </a>
                                            <a href={`tel:${reg.phone}`} className="flex items-center gap-1 text-muted-foreground">
                                                <Phone className="w-3 h-3" /> {reg.phone}
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                reg.status === 'reviewed' ? 'bg-green-100 text-green-700' :
                                                    reg.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }
                                        >
                                            {reg.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                                onClick={() => setSelectedReg(reg)}
                                            >
                                                <Eye className="w-4 h-4 text-gray-500" />
                                                <span className="sr-only">View Details</span>
                                            </Button>
                                            {reg.status === 'pending' && (
                                                <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(reg.id, 'reviewed')}>
                                                    Review
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 hover:bg-red-50"
                                                onClick={() => setDeleteRegId(reg.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                <span className="sr-only">Delete Registration</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Registration Details Dialog */}
            <Dialog open={!!selectedReg} onOpenChange={(open) => !open && setSelectedReg(null)}>
                <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-heading font-bold text-navy flex items-center justify-between">
                            <span>Nurse Registration Details</span>
                            {selectedReg && (
                                <Badge variant="outline" className={`gap-1.5 ${selectedReg.nurse_status === 'qualified' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                                    {selectedReg.nurse_status.charAt(0).toUpperCase() + selectedReg.nurse_status.slice(1)}
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Submitted on {selectedReg && new Date(selectedReg.created_at).toLocaleString()}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedReg && (
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <div className="space-y-6 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                                        <p className="font-bold text-navy text-lg">{selectedReg.full_name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Work Preference</p>
                                        <p className="font-semibold text-navy capitalize">{selectedReg.work_preference}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                        <a href={`mailto:${selectedReg.email}`} className="text-blue-600 hover:underline flex items-center gap-1.5 font-medium">
                                            <Mail className="w-4 h-4" /> {selectedReg.email}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                        <a href={`tel:${selectedReg.phone}`} className="text-gray-700 hover:text-navy flex items-center gap-1.5 font-medium">
                                            <Phone className="w-4 h-4" /> {selectedReg.phone}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                        <div className="flex items-center gap-1.5 text-navy font-medium">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {selectedReg.location}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">GDC Number</p>
                                        <p className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 w-fit">{selectedReg.gdc_number || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CV / Resume</p>
                                        {selectedReg.cv_url ? (
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between hover:border-gold hover:text-navy group"
                                                onClick={() => window.open(selectedReg.cv_url, '_blank')}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-navy group-hover:text-gold" />
                                                    View CV
                                                </span>
                                                <ArrowUpRight className="w-4 h-4 text-gray-300" />
                                            </Button>
                                        ) : <p className="text-sm text-gray-400 italic">No CV uploaded</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hepatitis B</p>
                                        <div className="space-y-2">
                                            <Badge variant="outline" className={
                                                selectedReg.hep_b_vaccination === 'yes' ? 'bg-green-50 text-green-700' :
                                                    selectedReg.hep_b_vaccination === 'in_progress' ? 'bg-yellow-50 text-yellow-700' :
                                                        'bg-red-50 text-red-700'
                                            }>
                                                {selectedReg.hep_b_vaccination === 'yes' ? 'Fully Vaccinated' : selectedReg.hep_b_vaccination === 'in_progress' ? 'In Progress' : 'Not Vaccinated'}
                                            </Badge>
                                            {selectedReg.hep_b_url && (
                                                <Button size="sm" variant="ghost" className="w-full justify-between h-9 text-xs px-2 hover:bg-gray-50" onClick={() => window.open(selectedReg.hep_b_url, '_blank')}>
                                                    <span className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4" /> Certificate
                                                    </span>
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {selectedReg.message && (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Additional Information</p>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {selectedReg.message}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3 justify-between pt-4 border-t border-gray-100">
                                    <Button
                                        onClick={() => {
                                            setDeleteRegId(selectedReg.id);
                                            setSelectedReg(null);
                                        }}
                                        variant="outline"
                                        className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete Registration
                                    </Button>
                                    <div className="flex gap-3">
                                        {selectedReg.status === 'pending' && (
                                            <Button onClick={() => updateStatus(selectedReg.id, 'reviewed')} variant="outline" className="gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> Mark Reviewed
                                            </Button>
                                        )}
                                        <Button onClick={() => window.location.href = `mailto:${selectedReg.email}`} className="bg-navy text-white hover:bg-gold hover:text-navy gap-2">
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
            <AlertDialog open={!!deleteRegId} onOpenChange={(open) => !open && setDeleteRegId(null)}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-navy">Delete Registration</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this nurse registration? This action cannot be undone.
                            All registration data including CV and certificates will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteRegId && deleteRegistration(deleteRegId)}
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

export default AdminRegistrations;
