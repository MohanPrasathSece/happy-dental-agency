
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
    Search,
    ChevronRight
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
          fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-navy via-[#0A1628] to-[#050B14] text-white transition-all duration-300 z-50 shadow-2xl border-r border-white/5
          ${isSidebarOpen ? "w-72" : "w-20 lg:w-72"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-24 flex items-center px-6 border-b border-white/10">
                        <div className={`transition-opacity duration-300 flex items-center gap-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-[#F5C518] flex items-center justify-center text-navy font-black text-xl shadow-lg shadow-gold/20">
                                H
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-lg tracking-wide text-white leading-none">HappyDental</span>
                                <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase mt-1">Admin Panel</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden ml-auto text-white/70 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                        <p className={`px-4 text-[10px] font-bold text-gold/60 uppercase tracking-widest mb-4 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                            Main Menu
                        </p>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
                    ${isActive
                                            ? "bg-white/10 text-white font-bold shadow-lg border border-white/5"
                                            : "text-white/60 hover:text-white hover:bg-white/5"}
                  `}
                                >
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold rounded-r-full" />}
                                    <item.icon size={20} className={`transition-colors duration-300 ${isActive ? "text-gold" : "text-white/40 group-hover:text-gold"}`} />
                                    <span className={`${isSidebarOpen ? "block" : "hidden lg:block"} tracking-tight`}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <ChevronRight size={16} className={`ml-auto text-white/30 ${isSidebarOpen ? "block" : "hidden lg:block"}`} />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-white/10 bg-[#06101f]">
                        <div className="flex items-center gap-3 mb-4 px-2 bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-yellow-300 p-[2px] shadow-lg shadow-gold/10">
                                <div className="w-full h-full rounded-full bg-[#0A1628] flex items-center justify-center text-gold font-bold">
                                    {userEmail.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
                                <p className="text-sm font-bold text-white truncate w-32">{userEmail.split('@')[0]}</p>
                                <p className="text-[10px] text-emerald-400 font-medium tracking-wide flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    online
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300/60 hover:text-red-200 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/10
              `}
                        >
                            <LogOut size={18} />
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
