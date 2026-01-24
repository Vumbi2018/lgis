import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, PieChart, Calendar, Printer, Share2, Filter, FileSpreadsheet } from "lucide-react";

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState("all");

    const reports = [
        { id: "RPT-2025-001", name: "Q4 2025 Financial Summary", type: "Financial", format: "PDF", date: "Jan 15, 2026", status: "Ready", size: "2.4 MB" },
        { id: "RPT-2025-009", name: "Annual Licensing Audit", type: "Compliance", format: "Excel", date: "Jan 10, 2026", status: "Ready", size: "850 KB" },
        { id: "RPT-2026-003", name: "January Waste Collection Logs", type: "Operational", format: "CSV", date: "Jan 22, 2026", status: "Processing", size: "-" },
        { id: "RPT-2026-012", name: "Building Inspection Failures", type: "Compliance", format: "PDF", date: "Jan 20, 2026", status: "Ready", size: "1.2 MB" },
        { id: "RPT-2025-099", name: "Revenue by District", type: "Financial", format: "Excel", date: "Dec 31, 2025", status: "Archived", size: "3.1 MB" },
    ];

    const filteredReports = activeTab === 'all'
        ? reports
        : reports.filter(r => r.type.toLowerCase() === activeTab);

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Reports & Analytics</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Generate insights, export data, and view audits.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <Calendar className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Schedule Report
                    </Button>
                    <Button className="font-bold border-none shadow-md hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400' }}>
                        <Printer className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Print Summary
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4 mb-6">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Generated</p>
                            <FileText className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">128</div>
                        <p className="text-xs text-black font-medium mt-1">This month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Scheduled</p>
                            <Calendar className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">12</div>
                        <p className="text-xs text-black font-medium mt-1">Recurring jobs</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm bg-white border border-gray-100">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-[#F4C400]">Report Repository</CardTitle>
                            <CardDescription className="text-black/70 font-medium">Access and download generated reports.</CardDescription>
                        </div>
                        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-[400px]">
                            <TabsList className="bg-gray-100 w-full">
                                <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">All</TabsTrigger>
                                <TabsTrigger value="financial" className="flex-1 data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">Financial</TabsTrigger>
                                <TabsTrigger value="compliance" className="flex-1 data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">Compliance</TabsTrigger>
                                <TabsTrigger value="operational" className="flex-1 data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">Ops</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {filteredReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                                        {report.format === 'PDF' ? <FileText className="h-5 w-5 text-red-500" /> : <FileSpreadsheet className="h-5 w-5 text-green-600" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black text-sm">{report.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span>{report.id}</span>
                                            <span>•</span>
                                            <span>{report.date}</span>
                                            <span>•</span>
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className={`text-xs ${report.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            report.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                        {report.status}
                                    </Badge>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={report.status !== 'Ready'}>
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
