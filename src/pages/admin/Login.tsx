
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            toast.success("Welcome back!");
            navigate("/admin");
        } catch (error: any) {
            toast.error(error.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Hero / Branding */}
            <div className="hidden lg:flex relative bg-navy flex-col justify-between p-12 lg:p-16 overflow-hidden">
                <div className="relative z-10">
                    <Logo size="lg" variant="light" showText={true} />
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h1 className="text-4xl xl:text-5xl font-heading font-bold text-white leading-tight">
                        Manage your <br />
                        <span className="text-gold">Dental Agency</span> <br />
                        with ease.
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Secure access to your recruitment dashboard. Post jobs, manage candidates, and track performance all in one place.
                    </p>

                    <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3 text-white/90">
                            <CheckCircle2 className="w-5 h-5 text-gold" />
                            <span>Real-time Job Board Management</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <CheckCircle2 className="w-5 h-5 text-gold" />
                            <span>Secure & Private Access</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <CheckCircle2 className="w-5 h-5 text-gold" />
                            <span>Staffing Analytics</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Happy Dental Agency. All rights reserved.
                    </p>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-6 bg-gray-50/50">
                <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <Logo size="lg" showText={true} />
                        </div>
                        <h2 className="text-3xl font-bold text-navy">Welcome Back</h2>
                        <p className="text-muted-foreground mt-2">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-navy ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-navy transition-colors" />
                                <Input
                                    type="email"
                                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-navy ml-1">Password</label>
                                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-navy transition-colors" />
                                <Input
                                    type="password"
                                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-navy hover:bg-navy-light text-white font-semibold rounded-xl text-base shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 transition-all duration-300 group"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In to Dashboard"}
                            {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
