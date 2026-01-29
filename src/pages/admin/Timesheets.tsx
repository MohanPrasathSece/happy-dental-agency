
import { useEffect, useState, useRef } from "react";
import AdminPage from "@/components/admin/AdminPage";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Printer, Search, Download, Send, CreditCard, Building, User, Mail, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Timesheet {
    id: string;
    nurse_name: string;
    nurse_email: string;
    practice_name: string;
    shift_date: string;
    start_time: string;
    end_time: string;
    break_duration: number;
    total_hours: number;
    verifier_name: string;
    verifier_role: string;
    feedback?: string;
    status: string;
    created_at: string;
}

const AdminTimesheets = () => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);

    // Editable Invoice State
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: "",
        date: new Date().toISOString().split('T')[0],
        nurseName: "",
        nurseEmail: "",
        practiceName: "",
        practiceEmail: "",
        shiftDate: "",
        totalHours: 0,
        hourlyRate: 20,
        verifierName: "",
        description: "Nursing Services"
    });

    const printRef = useRef<HTMLDivElement>(null);

    const fetchTimesheets = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('timesheets')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error(error);
                toast.error("Failed to load timesheets");
            } else {
                setTimesheets(data || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('timesheets')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success("Status updated");
            setTimesheets(ts => ts.map(t => t.id === id ? { ...t, status: newStatus } : t));
        }
    };

    const generateInvoiceNumber = () => {
        const date = new Date();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${random}`;
    };

    const openInvoiceDialog = (ts: Timesheet) => {
        setSelectedTimesheet(ts);
        setInvoiceData({
            invoiceNumber: generateInvoiceNumber(),
            date: new Date().toISOString().split('T')[0],
            nurseName: ts.nurse_name,
            nurseEmail: ts.nurse_email,
            practiceName: ts.practice_name,
            practiceEmail: "", // Admin can fill this
            shiftDate: ts.shift_date,
            totalHours: ts.total_hours,
            hourlyRate: 20,
            verifierName: ts.verifier_name,
            description: "Nursing Services"
        });
    };

    const handlePrint = () => {
        if (!printRef.current) return;

        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'height=800,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>&nbsp;</title>');
            printWindow.document.write('<style>');
            printWindow.document.write(`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                @page { size: auto; margin: 0; }
                * { box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif; color: #1e293b; margin: 0; padding: 15mm; -webkit-print-color-adjust: exact; background: white; }
                .invoice-wrapper { width: 100%; margin: 0 auto; padding: 0; position: relative; }
                .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 30px; }
                .logo-img { height: 60px; width: auto; display: block; }
                .agency-info { font-size: 11px; color: #64748b; line-height: 1.5; margin-top: 15px; }
                .agency-info p { margin: 2px 0; }
                .invoice-title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: -0.02em; }
                .meta-row { display: flex; justify-content: flex-end; gap: 10px; font-size: 13px; margin-top: 6px; }
                .meta-label { color: #94a3b8; text-transform: uppercase; font-weight: 700; font-size: 10px; tracking: 0.1em; }
                .meta-val { font-weight: 600; color: #0f172a; }
                
                .billing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 40px; }
                .bill-to-sect h3 { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 12px; letter-spacing: 0.1em; }
                .bill-to-sect h2 { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }
                .bill-to-sect p { font-size: 13px; color: #64748b; margin: 3px 0; }
                
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th { background: #f8fafc; text-align: left; padding: 12px 15px; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.1em; }
                td { padding: 18px 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
                .text-right { text-align: right; }
                .item-main { font-weight: 700; color: #0f172a; font-size: 15px; }
                .item-sub { font-size: 11px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; font-weight: 500; }
                
                .totals-area { margin-left: auto; width: 280px; margin-top: 20px; }
                .total-line { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #64748b; }
                .grand-total-line { border-top: 1.5px solid #0f172a; margin-top: 12px; padding-top: 15px; font-weight: 800; color: #0f172a; font-size: 18px; }
                
                .footer-sect { margin-top: 60px; border-top: 1px solid #f1f5f9; padding-top: 30px; text-align: center; }
                .footer-sect p { font-size: 14px; font-weight: 800; color: #d4af37; letter-spacing: 0.05em; margin: 0; }
                .no-print { display: none !important; }
            `);
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(printContent);
            printWindow.document.write(`
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    };
                </script>
            `);
            printWindow.document.close();

            if (selectedTimesheet && selectedTimesheet.status === 'pending') {
                updateStatus(selectedTimesheet.id, 'invoiced');
            }
        }
    };

    const sendInvoiceEmail = async () => {
        if (!invoiceData.practiceEmail) {
            toast.error("Please provide a recipient email address");
            return;
        }

        setIsSending(true);
        try {
            const htmlContent = printRef.current?.innerHTML || "";

            const response = await fetch("/api/invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: invoiceData.practiceEmail,
                    subject: `Invoice ${invoiceData.invoiceNumber} from Happy Dental Agency`,
                    invoiceNumber: invoiceData.invoiceNumber,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #1e293b;">
                            ${htmlContent}
                        </div>
                    `
                }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Invoice sent successfully");
                if (selectedTimesheet && selectedTimesheet.status === 'pending') {
                    updateStatus(selectedTimesheet.id, 'invoiced');
                }
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error("Failed to send email");
        } finally {
            setIsSending(false);
        }
    };

    const totalAmount = (invoiceData.totalHours * invoiceData.hourlyRate).toFixed(2);

    return (
        <AdminPage
            title="Timesheets"
            subtitle="View all submitted timesheets and generate invoices."
        >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-navy animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="font-bold">Shift Date</TableHead>
                                    <TableHead className="font-bold">Nurse Details</TableHead>
                                    <TableHead className="font-bold">Practice</TableHead>
                                    <TableHead className="font-bold">Hours</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="text-right font-bold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {timesheets.map((ts) => (
                                    <TableRow key={ts.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="text-sm font-medium text-gray-600">
                                            {new Date(ts.shift_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-navy">{ts.nurse_name}</span>
                                                <span className="text-xs text-gray-500">{ts.nurse_email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-700 font-medium">
                                            {ts.practice_name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3">
                                                {ts.total_hours} hrs
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                                                    ${ts.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                        ts.status === 'invoiced' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-amber-100 text-amber-700'}
                                                `}
                                            >
                                                {ts.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="gap-2 border-gray-200 hover:border-gold hover:text-navy transition-all"
                                                onClick={() => openInvoiceDialog(ts)}
                                            >
                                                <FileText className="w-4 h-4" /> Invoice
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            <Dialog open={!!selectedTimesheet} onOpenChange={() => setSelectedTimesheet(null)}>
                <DialogContent className="max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white rounded-2xl">
                    <DialogHeader className="p-4 md:p-6 border-b flex-row justify-between items-center space-y-0">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gold" />
                            Invoice Editor
                        </DialogTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handlePrint} className="h-9">
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                            <Button onClick={sendInvoiceEmail} disabled={isSending} size="sm" className="h-9 bg-navy text-white hover:bg-gold hover:text-navy">
                                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                                Send
                            </Button>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-gray-50/50">
                        {/* Inline Editor Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Invoice Number</Label>
                                <Input value={invoiceData.invoiceNumber} onChange={e => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })} className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Issue Date</Label>
                                <Input type="date" value={invoiceData.date} onChange={e => setInvoiceData({ ...invoiceData, date: e.target.value })} className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Practice Email</Label>
                                <Input value={invoiceData.practiceEmail} onChange={e => setInvoiceData({ ...invoiceData, practiceEmail: e.target.value })} placeholder="recipient@email.com" className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Practice Name</Label>
                                <Input value={invoiceData.practiceName} onChange={e => setInvoiceData({ ...invoiceData, practiceName: e.target.value })} className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hours</Label>
                                <Input type="number" step="0.5" value={invoiceData.totalHours} onChange={e => setInvoiceData({ ...invoiceData, totalHours: Number(e.target.value) })} className="h-9" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Hourly Rate (£)</Label>
                                <Input type="number" value={invoiceData.hourlyRate} onChange={e => setInvoiceData({ ...invoiceData, hourlyRate: Number(e.target.value) })} className="h-9" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</Label>
                                <Input value={invoiceData.description} onChange={e => setInvoiceData({ ...invoiceData, description: e.target.value })} className="h-9" />
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className="max-w-[800px] mx-auto bg-white shadow-xl border border-gray-200 rounded p-6 md:p-12 mb-10 overflow-hidden" ref={printRef}>
                            <div className="invoice-wrapper">
                                {/* Invoice Header */}
                                <div className="header">
                                    <div className="header-left">
                                        <img src="/logo_main.png" alt="Happy Dental Staff" className="logo-img" />
                                        <div className="agency-info">
                                            <p className="font-bold text-navy" style={{ fontSize: '13px' }}>Happy Dental Agency Ltd</p>
                                            <p>Capital Office, 124 City Road</p>
                                            <p>London, EC1V 2NX</p>
                                            <p>info@happydentalagency.co.uk</p>
                                            <p>www.happydentalagency.co.uk</p>
                                            <p>+44 7561 704177</p>
                                        </div>
                                    </div>
                                    <div className="header-right text-right">
                                        <h1 className="invoice-title">INVOICE</h1>
                                        <div className="meta-box" style={{ marginTop: '10px' }}>
                                            <div className="meta-row">
                                                <span className="meta-label">Number:</span>
                                                <span className="meta-val">{invoiceData.invoiceNumber}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span className="meta-label">Date:</span>
                                                <span className="meta-val">{new Date(invoiceData.date).toLocaleDateString('en-GB')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bill To / Info */}
                                <div className="billing-grid">
                                    <div className="bill-to-sect">
                                        <h3>Bill To</h3>
                                        <div className="bill-content">
                                            <h2>{invoiceData.practiceName}</h2>
                                            <p>Professional Nursing Services</p>
                                            <p>Verified by: {invoiceData.verifierName}</p>
                                        </div>
                                    </div>
                                    <div className="bill-to-sect text-right">
                                        <h3>Provider</h3>
                                        <div className="bill-content">
                                            <h2>{invoiceData.nurseName}</h2>
                                            <p className="font-medium">{invoiceData.nurseEmail}</p>
                                            <p>Shift Date: {new Date(invoiceData.shiftDate).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Line Items */}
                                <table className="items-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '55%' }}>Description</th>
                                            <th className="text-right">Hours</th>
                                            <th className="text-right">Rate</th>
                                            <th className="text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="item-main">{invoiceData.description}</div>
                                                <div className="item-sub">Service Date: {invoiceData.shiftDate}</div>
                                            </td>
                                            <td className="text-right">{invoiceData.totalHours}</td>
                                            <td className="text-right">£{invoiceData.hourlyRate.toFixed(2)}</td>
                                            <td className="text-right font-bold text-navy">£{totalAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Grand Totals */}
                                <div className="totals-area">
                                    <div className="total-line">
                                        <span>Subtotal</span>
                                        <span>£{totalAmount}</span>
                                    </div>
                                    <div className="total-line">
                                        <span>VAT (0%)</span>
                                        <span>£0.00</span>
                                    </div>
                                    <div className="total-line grand-total-line">
                                        <span>Total Due</span>
                                        <span>£{totalAmount}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="footer-sect">
                                    <p>THANK YOU FOR YOUR BUSINESS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminPage>
    );
};

export default AdminTimesheets;
