
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    Bell,
    Search
} from "lucide-react";
import Logo from "../Logo";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const AdminLayout = ({ children, title, subtitle, action }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/admin/login");
            } else {
                setUserEmail(session.user.email || "Admin");
            }
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/admin/login");
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
        toast.success("Logged out successfully");
    };

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Job Listings", path: "/admin/jobs", icon: Briefcase },
        // { name: "Settings", path: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-sans">
            {/* Sidebar - Premium Dark Navy */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen bg-[#0A1628] text-white transition-all duration-300 z-50 shadow-2xl
          ${isSidebarOpen ? "w-72" : "w-20 lg:w-72"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-6 border-b border-white/10 bg-[#0A1628]">
                        <div className={`transition-opacity duration-300 flex items-center gap-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                                H
                            </div>
                            <span className="font-heading font-bold text-lg tracking-wide text-white">HappyDental</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden ml-auto text-white/70 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 py-8 px-4 space-y-2">
                        <p className={`px-4 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                            Overview
                        </p>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                    ${isActive
                                            ? "bg-gold text-[#0A1628] font-bold shadow-lg shadow-gold/20"
                                            : "text-white/60 hover:text-white hover:bg-white/5"}
                  `}
                                >
                                    <item.icon size={20} className={isActive ? "text-[#0A1628]" : "text-white/60 group-hover:text-white"} />
                                    <span className={`${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0A1628]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-white/10 bg-[#081221]">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-yellow-300 p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#0A1628] flex items-center justify-center text-gold font-bold">
                                    {userEmail.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                                <p className="text-sm font-bold text-white truncate w-32">{userEmail.split('@')[0]}</p>
                                <p className="text-xs text-white/40 truncate w-32">Administrator</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300/80 hover:text-red-200 hover:bg-red-500/10 transition-colors
              `}
                        >
                            <LogOut size={20} />
                            <span className={`${isSidebarOpen ? "block" : "hidden lg:block"} text-sm font-medium`}>
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 text-navy hover:bg-gray-100 rounded-lg lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-navy tracking-tight">{title}</h1>
                            {subtitle && <p className="text-sm text-gray-500 font-medium mt-0.5">{subtitle}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {action}
                        <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
                        <button className="relative p-2 text-gray-400 hover:text-navy transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-auto p-6 md:p-10">
                    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
