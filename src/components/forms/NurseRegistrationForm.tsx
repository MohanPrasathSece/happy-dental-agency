import { useState, useRef } from "react";
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
});

type NurseFormData = z.infer<typeof nurseSchema>;

const NurseRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<NurseFormData>({
    resolver: zodResolver(nurseSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      gdcNumber: "",
      message: "",
    },
  });

  const nurseStatus = form.watch("nurseStatus");

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

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: NurseFormData) => {
    setIsSubmitting(true);

    try {
      let base64File = "";
      if (cvFile) {
        base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(cvFile);
        });
      }

      const response = await fetch("/api/contact", {
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
Location: ${data.location}
Work Preference: ${data.workPreference}
Message: ${data.message || "None"}
          `.trim(),
          attachment: base64File || undefined,
          filename: cvFile?.name || undefined
        }),
      });

      if (!response.ok) throw new Error("Failed to submit registration");

      toast({
        title: "Registration Submitted Successfully!",
        description: "Thank you for registering with Happy Dental Agency. A confirmation has been sent to your email.",
      });

      form.reset();
      setCvFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "We couldn't process your registration at this time. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <FormField
            control={form.control}
            name="gdcNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GDC Number {nurseStatus === "qualified" && "*"}</FormLabel>
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

          <FormField
            control={form.control}
            name="workPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Preference *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="locum">Locum Only</SelectItem>
                    <SelectItem value="permanent">Permanent Only</SelectItem>
                    <SelectItem value="both">Both Locum & Permanent</SelectItem>
                  </SelectContent>
                </Select>
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
                  <FileText className="w-5 h-5 text-gold" />
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
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-champagne-dark hover:bg-primary/20 transition-all"
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
              Submit Registration
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NurseRegistrationForm;
