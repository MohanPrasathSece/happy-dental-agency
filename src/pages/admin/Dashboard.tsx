
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Eye, Plus, ArrowUpRight, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        jobs: 0,
        applications: 0,
        registrations: 0,
        visitors: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get Jobs Count
                const { count: jobsCount } = await supabase
                    .from('jobs')
                    .select('*', { count: 'exact', head: true });

                // Get Applications Count
                const { count: appsCount } = await supabase
                    .from('applications')
                    .select('*', { count: 'exact', head: true });

                // Get Registrations Count
                const { count: regsCount } = await supabase
                    .from('nurse_registrations')
                    .select('*', { count: 'exact', head: true });

                // Get Visitors Count
                const { count: visitorsCount } = await supabase
                    .from('page_views')
                    .select('*', { count: 'exact', head: true });

                setStats({
                    jobs: jobsCount || 0,
                    applications: appsCount || 0,
                    registrations: regsCount || 0,
                    visitors: visitorsCount || 0
                });
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Nurse Registrations",
            value: stats.registrations,
            icon: Users,
            color: "text-amber-600",
            bg: "bg-amber-100",
            desc: "Total nurses joined"
        },
        {
            title: "Job Applications",
            value: stats.applications,
            icon: Briefcase,
            color: "text-purple-600",
            bg: "bg-purple-100",
            desc: "For live listings"
        },
        {
            title: "Live Vacancies",
            value: stats.jobs,
            icon: ArrowUpRight,
            color: "text-blue-600",
            bg: "bg-blue-100",
            desc: "Currently active"
        },
        {
            title: "Total Visits",
            value: stats.visitors,
            icon: Eye,
            color: "text-green-600",
            bg: "bg-green-100",
            desc: "Page views"
        },
    ];

    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Overview of your agency's performance."
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-navy">{isLoading ? "-" : stat.value}</div>
                            <p className="text-xs text-gray-400 mt-2 font-medium flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                                {stat.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {/* Quick Action Card */}
                <Card className="border-none shadow-sm bg-gradient-to-br from-navy to-[#1a2c4e] text-white">
                    <CardHeader>
                        <CardTitle className="text-lg text-gold">Quick Action</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-white/80 text-sm">Post a new vacancy instantly.</p>
                        <Link to="/admin/jobs" className="block mt-2">
                            <Button className="w-full bg-white text-navy hover:bg-gold hover:text-navy font-bold">
                                <Plus className="w-4 h-4 mr-2" /> Post New Job
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-navy flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-400" /> Performance Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-400 mb-1">Analytics Visualization</p>
                                <p className="text-xs text-gray-300">Data collecting...</p>
                                <div className="mt-4 flex gap-2 justify-center">
                                    <div className="h-16 w-3 bg-blue-200 rounded-t-sm"></div>
                                    <div className="h-24 w-3 bg-blue-300 rounded-t-sm"></div>
                                    <div className="h-10 w-3 bg-blue-200 rounded-t-sm"></div>
                                    <div className="h-32 w-3 bg-navy rounded-t-sm"></div>
                                    <div className="h-20 w-3 bg-blue-300 rounded-t-sm"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-navy">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 text-green-700">
                                <span className="flex items-center gap-2 text-sm font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                                    Database Connection
                                </span>
                                <span className="text-xs font-bold uppercase">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 text-blue-700">
                                <span className="flex items-center gap-2 text-sm font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
                                    Analytics Tracker
                                </span>
                                <span className="text-xs font-bold uppercase">Live</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
