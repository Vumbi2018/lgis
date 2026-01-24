import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Wind, Droplets, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnvironmentPage() {
    const airQualityData = [
        { time: '06:00', aqi: 45 },
        { time: '09:00', aqi: 65 },
        { time: '12:00', aqi: 85 },
        { time: '15:00', aqi: 72 },
        { time: '18:00', aqi: 55 },
        { time: '21:00', aqi: 40 },
    ];

    const reports = [
        { id: "EIA-2026-001", project: "Harbour City Expansion", type: "Impact Assessment", status: "Under Review", date: "Jan 18, 2026" },
        { id: "ENV-2026-042", project: "Tuanaimato Industrial", type: "Waste Audit", status: "Compliant", date: "Jan 15, 2026" },
        { id: "INV-2026-009", project: "River Water Quality", type: "Investigation", status: "Action Required", date: "Jan 12, 2026" },
    ];

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Environmental Control</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Monitoring air quality, water safety, and environmental compliance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <FileText className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        New Assessment
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mb-6">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Air Quality Index</p>
                            <Wind className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">62</div>
                        <p className="text-xs text-black font-medium mt-1">Moderate (PM2.5)</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Water Quality</p>
                            <Droplets className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">Safe</div>
                        <p className="text-xs text-black font-medium mt-1">Latest harbor test</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Active Cases</p>
                            <FileText className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">15</div>
                        <p className="text-xs text-black font-medium mt-1">Pending review</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Alerts</p>
                            <AlertTriangle className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">1</div>
                        <p className="text-xs text-black font-medium mt-1">High priority</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Air Quality Trends</CardTitle>
                        <CardDescription className="text-black/70 font-medium">24-hour AQI monitoring.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={airQualityData}>
                                    <defs>
                                        <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F4C400" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#F4C400" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "1px solid #eee" }}
                                    />
                                    <Area type="monotone" dataKey="aqi" stroke="#F4C400" fillOpacity={1} fill="url(#colorAqi)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Recent Assessments</CardTitle>
                        <CardDescription className="text-black/70 font-medium">Environmental impact cases.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reports.map((report) => (
                                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            <Leaf className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black text-sm">{report.project}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span>{report.id}</span>
                                                <span>•</span>
                                                <span>{report.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={`text-xs ${report.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            report.status === 'Action Required' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-yellow-50 text-yellow-700 border-yellow-200'
                                        }`}>
                                        {report.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Button variant="link" className="text-[#F4C400] font-bold">View All Reports</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
