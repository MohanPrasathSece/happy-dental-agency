
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    LogOut,
    X,
    TrendingUp,
    Clock,
    UserCheck
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminSidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUserEmail(session.user.email || "Admin");
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
        toast.success("Logged out successfully");
    };

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Timesheets", path: "/admin/timesheets", icon: Clock },
        { name: "Analytics", path: "/admin/analytics", icon: TrendingUp },
        { name: "Job Listings", path: "/admin/jobs", icon: Briefcase },
        { name: "Registrations", path: "/admin/registrations", icon: UserCheck },
        { name: "Applications", path: "/admin/applications", icon: Users },
    ];

    return (
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
                                onClick={() => {
                                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                }}
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
                                {userEmail ? userEmail.charAt(0).toUpperCase() : "A"}
                            </div>
                        </div>
                        <div className={`overflow-hidden transition-all ${isSidebarOpen ? "w-auto opacity-100 mx-1" : "w-0 opacity-0 lg:hidden"}`}>
                            <p className="text-sm font-bold text-white truncate max-w-[120px]">{userEmail ? userEmail.split('@')[0] : "Admin"}</p>
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
    );
};

export default AdminSidebar;
