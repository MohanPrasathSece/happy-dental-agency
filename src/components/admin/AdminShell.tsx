
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAdmin } from "@/context/AdminContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AdminShell = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/admin/login");
            }
        });
        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-sans overflow-x-hidden relative">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-navy/60 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminShell;
