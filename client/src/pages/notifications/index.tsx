import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Clock, AlertTriangle, Info, CreditCard, Shield, Settings } from "lucide-react";

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [notifications, setNotifications] = useState([
        { id: 1, type: "alert", category: "Compliance", title: "Urgent: Inspection Overdue", message: "Property ID #4922 (Lot 5, Sec 12) missed scheduled inspection.", time: "10 mins ago", read: false },
        { id: 2, type: "info", category: "System", title: "System Maintenance Scheduled", message: "Platform will undergo maintenance on Jan 25th from 2AM to 4AM.", time: "2 hours ago", read: false },
        { id: 3, type: "success", category: "Finance", title: "Bulk Payment Processed", message: "Batch #9921 processed successfully. Total: PGK 45,200.", time: "5 hours ago", read: true },
        { id: 4, type: "warning", category: "Licensing", title: "Application Flagged", message: "Liquor License Application #L-2026-001 flagged for document verification.", time: "1 day ago", read: true },
        { id: 5, type: "info", category: "System", title: "New Feature Available", message: "GIS Mapping module has been updated with new satellite layers.", time: "2 days ago", read: true },
    ]);

    const filtered = activeTab === 'all'
        ? notifications
        : activeTab === 'unread'
            ? notifications.filter(n => !n.read)
            : notifications.filter(n => n.read); // Archive = Read for simplicity

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
            case 'warning': return <Shield className="h-5 w-5 text-[#F4C400]" />;
            case 'success': return <CreditCard className="h-5 w-5 text-emerald-500" />;
            default: return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Notifications Center</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>System alerts, updates, and task reminders.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="border-2 font-bold hover:bg-black/90"
                        style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}
                        onClick={markAllRead}
                    >
                        <Check className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Mark All as Read
                    </Button>
                    <Button className="font-bold border-none shadow-md hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400' }}>
                        <Settings className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Settings
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="md:col-span-3 shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                            <div className="flex items-center justify-between mb-4">
                                <CardTitle className="text-[#F4C400]">Recent Inbound</CardTitle>
                                <TabsList className="bg-gray-100">
                                    <TabsTrigger value="all" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">All</TabsTrigger>
                                    <TabsTrigger value="unread" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">Unread</TabsTrigger>
                                    <TabsTrigger value="archived" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400]">Archived</TabsTrigger>
                                </TabsList>
                            </div>
                        </Tabs>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filtered.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                    <p>No notifications found in this view.</p>
                                </div>
                            ) : (
                                filtered.map((item) => (
                                    <div key={item.id} className={`flex gap-4 p-4 rounded-xl border transition-all ${item.read ? 'bg-white border-gray-100' : 'bg-[#F4C400]/5 border-[#F4C400]/30'}`}>
                                        <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.read ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
                                            {getIcon(item.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className={`font-bold ${item.read ? 'text-gray-700' : 'text-black'}`}>{item.title}</h4>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> {item.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">{item.category}</Badge>
                                                {!item.read && <Badge className="bg-[#F4C400] text-black hover:bg-[#F4C400]">New</Badge>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="shadow-sm bg-white border border-gray-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase text-black">Quick Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium"> <AlertTriangle className="mr-2 h-4 w-4 text-red-500" /> Alerts (1) </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium"> <Shield className="mr-2 h-4 w-4 text-[#F4C400]" /> Compliance (1) </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium"> <CreditCard className="mr-2 h-4 w-4 text-green-500" /> Finance (1) </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium"> <Info className="mr-2 h-4 w-4 text-blue-500" /> System Updates (2) </Button>
                        </CardContent>
                    </Card>

                    <div className="bg-[#0F0F0F] rounded-xl p-6 text-[#F4C400] border border-[#F4C400]">
                        <h4 className="font-bold text-lg mb-2">Pro Tip</h4>
                        <p className="text-sm text-white/80">Configure your email preferences in Settings to receive daily digests of these alerts.</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
