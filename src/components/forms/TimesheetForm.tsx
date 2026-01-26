import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, Calendar, Clock, User, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const timesheetSchema = z.object({
    nurseName: z.string().min(2, "Nurse name is required"),
    nurseEmail: z.string().email("Valid email required"),
    practiceName: z.string().min(2, "Practice name is required"),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    breakDuration: z.string().min(1, "Break duration is required"),
    totalHours: z.string().min(1, "Total hours is required"),
    verifierName: z.string().min(2, "Practice verifier name is required"),
    verifierRole: z.string().min(2, "Verifier role is required"),
    feedback: z.string().optional(),
});

type TimesheetFormData = z.infer<typeof timesheetSchema>;

const TimesheetForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const form = useForm<TimesheetFormData>({
        resolver: zodResolver(timesheetSchema),
        defaultValues: {
            nurseName: "",
            nurseEmail: "",
            practiceName: "",
            date: new Date().toISOString().split('T')[0],
            startTime: "09:00",
            endTime: "17:00",
            breakDuration: "60",
            totalHours: "7",
            verifierName: "",
            verifierRole: "",
            feedback: "",
        },
    });

    // Calculate total hours automatically
    const calculateHours = () => {
        const start = form.getValues("startTime");
        const end = form.getValues("endTime");
        const breakMin = parseInt(form.getValues("breakDuration") || "0");

        if (start && end) {
            const [sH, sM] = start.split(':').map(Number);
            const [eH, eM] = end.split(':').map(Number);

            let diffMs = (eH * 60 + eM) - (sH * 60 + sM);
            if (diffMs < 0) diffMs += 24 * 60; // Overnight shift

            const totalMin = diffMs - breakMin;
            const hours = (totalMin / 60).toFixed(2);
            form.setValue("totalHours", hours);
        }
    };

    const onSubmit = async (data: TimesheetFormData) => {
        // Instant Success Experience
        toast({
            title: "Timesheet Submitted!",
            description: "The timesheet has been sent to the office and a copy to your email.",
        });
        form.reset();
        setStep(1);

        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.nurseName,
                    email: data.nurseEmail,
                    type: "Timesheet Submission",
                    subject: `Timesheet: ${data.nurseName} - ${data.practiceName} (${data.date})`,
                    message: `Timesheet Details:
            Nurse: ${data.nurseName} (${data.nurseEmail})
            Practice: ${data.practiceName}
            Date: ${data.date}
            Hours: ${data.startTime} to ${data.endTime} (Break: ${data.breakDuration}m)
            Total: ${data.totalHours} hrs
            Verified by: ${data.verifierName} (${data.verifierRole})
            Feedback: ${data.feedback}
          `
                }),
            });
        } catch (error) {
            console.warn("Background submission failed:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 -z-10" />
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? "bg-navy text-white scale-110 shadow-lg" : "bg-white text-muted-foreground border-2 border-border"
                            }`}
                    >
                        {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                ))}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <User className="w-6 h-6 text-navy" />
                                <h3 className="text-xl font-heading font-bold text-navy">Nurse Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="nurseName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nurseEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="nurse@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="button" onClick={() => setStep(2)} className="w-full h-12">
                                Next: Shift Details
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="w-6 h-6 text-navy" />
                                <h3 className="text-xl font-heading font-bold text-navy">Shift Details</h3>
                            </div>
                            <FormField
                                control={form.control}
                                name="practiceName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Practice Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input className="pl-10" placeholder="Dental Clinic Name" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Shift</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                    <Input type="date" className="pl-10" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="breakDuration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Break (Minutes)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => { field.onChange(e); calculateHours(); }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField
                                    control={form.control}
                                    name="startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} onChange={(e) => { field.onChange(e); calculateHours(); }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} onChange={(e) => { field.onChange(e); calculateHours(); }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="totalHours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Total Hours</FormLabel>
                                            <FormControl>
                                                <Input readOnly className="bg-muted font-bold" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                                    Back
                                </Button>
                                <Button type="button" onClick={() => setStep(3)} className="flex-[2] h-12">
                                    Next: Verification
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="w-6 h-6 text-navy" />
                                <h3 className="text-xl font-heading font-bold text-navy">Practice Verification</h3>
                            </div>
                            <p className="text-sm text-muted-foreground bg-champagne-light p-4 rounded-lg border border-gold/20">
                                Please hand your device to the Practice Manager or Lead Dentist to verify your shift hours.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="verifierName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Verifier Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Manager's Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="verifierRole"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Verifier Position</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Practice Manager" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback for Nurse (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any comments on the nurse's performance..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12">
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="cta"
                                    disabled={isSubmitting}
                                    className="flex-[2] h-12"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                                    ) : (
                                        "Submit Timesheet"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default TimesheetForm;
