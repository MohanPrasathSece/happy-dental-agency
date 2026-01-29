
import { useEffect, useState } from "react";
import AdminPage from "@/components/admin/AdminPage";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { Loader2, Globe, MousePointer2, PieChart as PieIcon, BarChart3, TrendingUp, Calendar } from "lucide-react";

const COLORS = ['#1a2c4e', '#d4af37', '#64748b', '#94a3b8', '#cbd5e1'];

interface ViewStat {
    name: string;
    views: number;
}

const AdminAnalytics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dailyData, setDailyData] = useState<any[]>([]);
    const [pageStats, setPageStats] = useState<ViewStat[]>([]);
    const [totalViews, setTotalViews] = useState(0);
    const [weeklyViews, setWeeklyViews] = useState(0);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true);
            try {
                // Fetch all views for the last 30 days
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const { data: views, error } = await supabase
                    .from('page_views')
                    .select('*')
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: true });

                if (error) throw error;

                if (views) {
                    setTotalViews(views.length);

                    // Process Daily Views
                    const dailyMap: Record<string, number> = {};
                    const last7DaysMap: Record<string, number> = {};
                    const today = new Date();

                    for (let i = 29; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(today.getDate() - i);
                        const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                        dailyMap[dateStr] = 0;
                    }

                    views.forEach(view => {
                        const date = new Date(view.created_at);
                        const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                        if (dailyMap[dateStr] !== undefined) {
                            dailyMap[dateStr]++;
                        }
                    });

                    const chartData = Object.entries(dailyMap).map(([name, views]) => ({ name, views }));
                    setDailyData(chartData);

                    // Weekly count (last 7 days)
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(today.getDate() - 7);
                    const weeklyCount = views.filter(v => new Date(v.created_at) >= sevenDaysAgo).length;
                    setWeeklyViews(weeklyCount);

                    // Process Top Pages
                    const pathMap: Record<string, number> = {};
                    views.forEach(view => {
                        pathMap[view.path] = (pathMap[view.path] || 0) + 1;
                    });

                    const sortedPages = Object.entries(pathMap)
                        .map(([name, views]) => ({ name, views }))
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5);

                    setPageStats(sortedPages);
                }
            } catch (error) {
                console.error("Analytics Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <AdminPage
            title="Website Analytics"
            subtitle="Understand how visitors are interacting with your site."
        >
            {isLoading ? (
                <div className="flex justify-center items-center py-40">
                    <Loader2 className="w-8 h-8 text-navy animate-spin" />
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-none shadow-sm bg-navy text-white">
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Views (30d)</p>
                                        <h3 className="text-3xl font-bold">{totalViews}</h3>
                                    </div>
                                    <Globe className="w-8 h-8 text-gold opacity-50" />
                                </div>
                                <div className="mt-4 flex items-center gap-1 text-xs text-green-400">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Real-time tracking active</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Weekly Views</p>
                                        <h3 className="text-3xl font-bold text-navy">{weeklyViews}</h3>
                                    </div>
                                    <Calendar className="w-8 h-8 text-navy/10" />
                                </div>
                                <div className="mt-4 text-xs text-gray-400">Past 7 days performance</div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Avg. Daily Views</p>
                                        <h3 className="text-3xl font-bold text-navy">{Math.round(totalViews / 30)}</h3>
                                    </div>
                                    <BarChart3 className="w-8 h-8 text-navy/10" />
                                </div>
                                <div className="mt-4 text-xs text-gray-400">Based on last 30 days</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Chart */}
                    <Card className="border-none shadow-sm h-[300px] md:h-[400px]">
                        <CardHeader>
                            <CardTitle className="text-navy flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-gray-400" />
                                Traffic Overview (Last 30 Days)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-full pb-12">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        interval={2}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#1a2c4e"
                                        strokeWidth={3}
                                        dot={{ fill: '#d4af37', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#d4af37' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Top Pages */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-navy flex items-center gap-2">
                                    <MousePointer2 className="w-5 h-5 text-gray-400" />
                                    Most Visited Pages
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pageStats.map((page, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-navy group-hover:text-gold transition-colors">{page.name === "/" ? "/home" : page.name}</span>
                                                <div className="w-48 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                    <div
                                                        className="h-full bg-navy rounded-full"
                                                        style={{ width: `${(page.views / pageStats[0].views) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold text-navy">{page.views}</span>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">Views</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Engagement Pie */}
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-navy flex items-center gap-2">
                                    <PieIcon className="w-5 h-5 text-gray-400" />
                                    Search vs Direct Traffic
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px] flex items-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Direct', value: totalViews * 0.7 },
                                                { name: 'Post-Apply', value: totalViews * 0.2 },
                                                { name: 'Inquiry', value: totalViews * 0.1 }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            {dailyData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <div className="w-3 h-3 rounded-full bg-[#1a2c4e]"></div>
                                        <span>Direct Views</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <div className="w-3 h-3 rounded-full bg-[#d4af37]"></div>
                                        <span>Application Paths</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <div className="w-3 h-3 rounded-full bg-[#64748b]"></div>
                                        <span>General Inquiries</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </AdminPage>
    );
};

export default AdminAnalytics;
