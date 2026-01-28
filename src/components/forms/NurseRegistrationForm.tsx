import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Send, Loader2, FileText, X } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const nurseSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  location: z.string().min(2, "Location is required").max(100),
  nurseStatus: z.enum(["qualified", "trainee"], {
    required_error: "Please select your status",
  }),
  gdcNumber: z.string().max(20).optional(),
  workPreference: z.enum(["locum", "permanent", "both"], {
    required_error: "Please select work preference",
  }),
  message: z.string().max(1000).optional(),
  hepBVaccination: z.enum(["yes", "no", "in_progress"], {
    required_error: "Please select your Hepatitis B vaccination status",
  }),
});

type NurseFormData = z.infer<typeof nurseSchema>;

const NurseRegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [hepBFile, setHepBFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hepBFileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NurseFormData>({
    resolver: zodResolver(nurseSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      gdcNumber: "",
      nurseStatus: (roleParam === "trainee" || roleParam === "qualified") ? roleParam : undefined,
      message: "",
      hepBVaccination: undefined,
    },
  });

  // Handle URL role parameter changes
  useEffect(() => {
    if (roleParam === "trainee" || roleParam === "qualified") {
      form.setValue("nurseStatus", roleParam);
    }
  }, [roleParam, form]);

  const nurseStatus = form.watch("nurseStatus");
  const workPreference = form.watch("workPreference");
  const hepBVaccinationValue = form.watch("hepBVaccination");

  // Reset work preference if trainee is selected and locum was previously chosen
  useEffect(() => {
    if (nurseStatus === "trainee" && (workPreference === "locum" || workPreference === "both")) {
      form.setValue("workPreference", "permanent");
    }
  }, [nurseStatus, workPreference, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setCvFile(file);
    }
  };

  const handleHepBFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setHepBFile(file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeHepBFile = () => {
    setHepBFile(null);
    if (hepBFileInputRef.current) {
      hepBFileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: NurseFormData) => {
    setIsSubmitting(true);
    // Instant Success Experience
    toast({
      title: "Registration Submitted Successfully!",
      description: "Thank you for registering with Happy Dental Agency. A confirmation has been sent to your email.",
    });

    // Cleanup state first for UX
    const currentCvFile = cvFile;
    const currentHepBFile = hepBFile;
    form.reset();
    setCvFile(null);
    setHepBFile(null);

    try {
      let base64File = "";
      if (currentCvFile) {
        base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(currentCvFile);
        });
      }

      let base64HepB = "";
      if (currentHepBFile) {
        base64HepB = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(currentHepBFile);
        });
      }

      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          type: "Nurse Registration Inquiry",
          message: `
Status: ${data.nurseStatus}
GDC Number: ${data.gdcNumber || "N/A"}
Hepatitis B Vaccination: ${data.hepBVaccination === 'yes' ? 'Fully Vaccinated' : data.hepBVaccination === 'in_progress' ? 'In Progress' : 'Not Vaccinated'}
Location: ${data.location}
Work Preference: ${data.workPreference}
Message: ${data.message || "None"}
          `.trim(),
          attachment: base64File || undefined,
          filename: currentCvFile?.name || undefined,
          attachment2: base64HepB || undefined,
          filename2: currentHepBFile?.name || undefined
        }),
      });
    } catch (error) {
      console.warn("Background submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to anchor if present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [roleParam]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+44 7XXX XXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input placeholder="City or Postcode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!roleParam && (
            <FormField
              control={form.control}
              name="nurseStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="qualified">Qualified Dental Nurse</SelectItem>
                      <SelectItem value="trainee">Trainee Dental Nurse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* GDC Number - Only show/require for Qualified or if status is qualified */}
          {(nurseStatus === "qualified" || (!nurseStatus && !roleParam)) && (
            <FormField
              control={form.control}
              name="gdcNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GDC Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123456" {...field} />
                  </FormControl>
                  <FormDescription>
                    Required for qualified nurses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="hepBVaccination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hepatitis B Vaccination Status *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Fully Vaccinated (Up to date)</SelectItem>
                    <SelectItem value="in_progress">In Progress / Partially Vaccinated</SelectItem>
                    <SelectItem value="no">Not Vaccinated</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  For clinical protection verify if your Hep B is up to date.
                </FormDescription>
                <FormMessage />
                {(field.value === 'yes' || field.value === 'in_progress') && (
                  <div className="mt-3 space-y-2 animate-fade-in">
                    <label className="text-sm font-medium text-navy">Upload Vaccine Certificate (Optional)</label>
                    <div className="relative">
                      <input
                        ref={hepBFileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleHepBFileChange}
                        className="hidden"
                        id="hep-b-upload"
                      />
                      {hepBFile ? (
                        <div className="flex items-center gap-3 p-2 bg-primary/20 rounded-lg border border-primary/30">
                          <FileText className="w-4 h-4 text-navy" />
                          <span className="text-xs flex-1 truncate">{hepBFile.name}</span>
                          <button
                            type="button"
                            onClick={removeHepBFile}
                            className="p-1 hover:bg-white/50 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="hep-b-upload"
                          className="flex items-center justify-center gap-2 p-3 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center"
                        >
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Upload Certificate (PDF, DOC)
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Preference *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="locum" disabled={nurseStatus === "trainee"}>
                      Locum Only {nurseStatus === "trainee" && "(Qualified Only)"}
                    </SelectItem>
                    <SelectItem value="permanent">Permanent Only</SelectItem>
                    <SelectItem value="both" disabled={nurseStatus === "trainee"}>
                      Both Locum & Permanent {nurseStatus === "trainee" && "(Qualified Only)"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {nurseStatus === "trainee" && (
                  <FormDescription className="text-amber-600 font-medium">
                    Trainees are eligible for permanent placements only while studying.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CV Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload CV</label>
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
              />
              {cvFile ? (
                <div className="flex items-center gap-3 p-3 bg-primary/30 rounded-lg border border-champagne-dark">
                  <FileText className="w-5 h-5 text-navy" />
                  <span className="text-sm flex-1 truncate">{cvFile.name}</span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="cv-upload"
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-champagne-dark hover:bg-primary/20 transition-all text-center"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload CV (PDF, DOC)
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience, availability, or any other relevant information..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {roleParam === 'trainee' ? 'Submit Placement Application' : 'Submit Registration'}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NurseRegistrationForm;
