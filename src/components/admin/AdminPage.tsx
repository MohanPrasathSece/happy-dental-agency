
import { Menu, Bell } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface AdminPageProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const AdminPage = ({ children, title, subtitle, action }: AdminPageProps) => {
    const { isSidebarOpen, setIsSidebarOpen } = useAdmin();

    return (
        <>
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
        </>
    );
};

export default AdminPage;
