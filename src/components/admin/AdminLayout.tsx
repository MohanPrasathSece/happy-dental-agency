
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    Users,
    LogOut,
    Menu,
    X,
    User,
    Bell,
    Search,
    ChevronRight,
    UserCheck,
    TrendingUp
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState<string>("");

    // Handle initial state and resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize(); // Initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Auto-close sidebar on mobile when navigating
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
        toast.success("Logged out successfully");
    };

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Analytics", path: "/admin/analytics", icon: TrendingUp },
        { name: "Job Listings", path: "/admin/jobs", icon: Briefcase },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-sans overflow-x-hidden relative">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-navy/60 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Premium Dark Navy */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-navy via-[#0A1628] to-[#050B14] text-white transition-all duration-300 ease-in-out z-50 shadow-2xl border-r border-white/5
                    ${isSidebarOpen ? "w-[280px] translate-x-0" : "w-0 lg:w-20 -translate-x-full lg:translate-x-0"}
                `}
            >
                <div className={`flex flex-col h-full overflow-hidden ${!isSidebarOpen && "lg:items-center"}`}>
                    {/* Logo Area */}
                    <div className={`h-24 flex items-center px-6 border-b border-white/10 flex-shrink-0 ${!isSidebarOpen && "lg:px-0 lg:justify-center"}`}>
                        <div className={`transition-all duration-300 flex items-center gap-3 ${isSidebarOpen ? "opacity-100 scale-100" : "opacity-0 lg:opacity-100 scale-75"}`}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-[#F5C518] flex items-center justify-center text-navy font-black text-xl shadow-lg shadow-gold/20 flex-shrink-0">
                                H
                            </div>
                            <div className={`flex flex-col ${!isSidebarOpen && "lg:hidden"}`}>
                                <span className="font-heading font-bold text-lg tracking-wide text-white leading-none whitespace-nowrap">HappyDental</span>
                                <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase mt-1">Admin Panel</span>
                            </div>
                        </div>
                        {isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden ml-auto text-white/50 hover:text-white p-2 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden">
                        <p className={`px-4 text-[10px] font-black text-gold/40 uppercase tracking-[0.2em] mb-4 transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
                            Main Menu
                        </p>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
                                        ${isActive
                                            ? "bg-gradient-to-r from-white/10 to-transparent text-white font-bold shadow-sm border border-white/5"
                                            : "text-white/50 hover:text-white hover:bg-white/5"}
                                        ${!isSidebarOpen && "lg:px-0 lg:justify-center"}
                                    `}
                                >
                                    {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-gold rounded-r-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
                                    <item.icon size={20} className={`transition-colors duration-300 flex-shrink-0 ${isActive ? "text-gold" : "text-white/40 group-hover:text-gold"}`} />
                                    <span className={`${isSidebarOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 lg:hidden -translate-x-4"} transition-all duration-300 tracking-tight whitespace-nowrap font-medium`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile & Logout */}
                    <div className={`p-4 border-t border-white/10 bg-[#06101f]/50 backdrop-blur-md ${!isSidebarOpen && "lg:px-2"}`}>
                        <div className={`flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-xl border border-white/5 ${!isSidebarOpen && "lg:p-1 lg:justify-center"}`}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-yellow-300 p-[2px] shadow-lg shadow-gold/10 flex-shrink-0">
                                <div className="w-full h-full rounded-full bg-[#0A1628] flex items-center justify-center text-gold font-bold">
                                    {userEmail.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all ${isSidebarOpen ? "w-auto opacity-100 mx-1" : "w-0 opacity-0 lg:hidden"}`}>
                                <p className="text-sm font-bold text-white truncate max-w-[120px]">{userEmail.split('@')[0]}</p>
                                <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    online
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300/50 hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/10
                                ${!isSidebarOpen && "lg:px-0 lg:justify-center"}
                            `}
                        >
                            <LogOut size={18} className="flex-shrink-0" />
                            <span className={`${isSidebarOpen ? "block" : "hidden"} text-sm font-bold tracking-tight`}>
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen">
                {/* Top Header */}
                <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 flex-shrink-0">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`p-2.5 -ml-1 text-navy hover:bg-gray-100 rounded-xl lg:hidden transition-colors ${isSidebarOpen && "hidden"}`}
                        >
                            <Menu size={22} strokeWidth={2.5} />
                        </button>
                        <div className="truncate">
                            <h1 className="text-lg md:text-2xl font-black text-navy px-1 truncate tracking-tight">{title}</h1>
                            {subtitle && <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5 px-1 truncate opacity-70">{subtitle}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                        <div className="hidden sm:block">
                            {action}
                        </div>
                        <div className="h-8 w-[1px] bg-gray-200 hidden md:block opacity-50"></div>
                        <button className="relative p-2.5 text-gray-400 hover:text-navy hover:bg-gray-50 rounded-xl transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#F9FAFB] custom-scrollbar scroll-smooth">
                    {/* Action Button for mobile (if provided) */}
                    {action && (
                        <div className="sm:hidden mb-6 flex flex-col gap-3">
                            {action}
                        </div>
                    )}
                    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );

};

export default AdminLayout;
