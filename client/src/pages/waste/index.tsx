import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Trash2, Recycle, MapPin, Calendar, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function WastePage() {
    const collections = [
        { id: 1, zone: "Zone A - Downtown", type: "General Waste", status: "In Progress", vehicle: "TRK-001", completion: 65 },
        { id: 2, zone: "Zone B - Suburbs", type: "Recycling", status: "Completed", vehicle: "TRK-004", completion: 100 },
        { id: 3, zone: "Zone C - Industrial", type: "Hazardous", status: "Pending", vehicle: "TRK-002", completion: 0 },
        { id: 4, zone: "Zone D - Coastal", type: "General Waste", status: "On Route", vehicle: "TRK-005", completion: 20 },
    ];

    const upcomingSchedule = [
        { day: "Tomorrow", date: "Jan 23", zones: ["Zone A", "Zone C"], type: "Recycling" },
        { day: "Friday", date: "Jan 24", zones: ["Zone B", "Zone D"], type: "General Waste" },
        { day: "Monday", date: "Jan 27", zones: ["Zone A", "Zone B"], type: "Green Waste" },
    ];

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Waste Management</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Collection schedules, fleet tracking, and sanitation services.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <Calendar className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        View Schedule
                    </Button>
                    <Button className="font-bold border-none shadow-md hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400' }}>
                        <Truck className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Track Fleet
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Daily Collections</p>
                            <Trash2 className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">124 Tons</div>
                        <p className="text-xs text-black font-medium mt-1">Processed today</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Active Trucks</p>
                            <Truck className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">8/12</div>
                        <p className="text-xs text-black font-medium mt-1">Vehicles on route</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Recycling Rate</p>
                            <Recycle className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">38%</div>
                        <p className="text-xs text-black font-medium mt-1">+2% from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Reported Issues</p>
                            <AlertTriangle className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">3</div>
                        <p className="text-xs text-black font-medium mt-1">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2 shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Live Operations</CardTitle>
                        <CardDescription className="text-black/70 font-medium">Real-time status of collection routes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {collections.map((col) => (
                                <div key={col.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                                            {col.type === 'Recycling' ? <Recycle className="h-5 w-5 text-[#F4C400]" /> : <Trash2 className="h-5 w-5 text-[#F4C400]" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black">{col.zone}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Truck className="h-3 w-3" /> {col.vehicle}
                                                <span>•</span>
                                                <span>{col.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <Badge className={col.status === 'Completed' ? 'bg-emerald-600' : 'bg-[#F4C400] text-black'}>{col.status}</Badge>
                                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-black" style={{ width: `${col.completion}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Upcoming Schedule</CardTitle>
                        <CardDescription className="text-black/70 font-medium">Next 3 collection days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative border-l-2 border-dashed border-gray-300 ml-3 space-y-8 py-2">
                            {upcomingSchedule.map((item, idx) => (
                                <div key={idx} className="relative pl-6">
                                    <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#F4C400] ring-4 ring-white" />
                                    <div>
                                        <h4 className="font-bold text-black text-sm">{item.day}, {item.date}</h4>
                                        <p className="text-xs font-semibold text-[#F4C400] uppercase mt-0.5">{item.type}</p>
                                        <ul className="mt-2 space-y-1">
                                            {item.zones.map(z => (
                                                <li key={z} className="text-xs text-gray-600 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" /> {z}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
