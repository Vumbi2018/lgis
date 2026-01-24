import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Download, Users, Star, Send, MessageSquare, QrCode, Apple, Play } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MobileAppPage() {
    const [pushMessage, setPushMessage] = useState("");
    const [sending, setSending] = useState(false);

    const downloadStats = [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 52 },
        { name: 'Wed', value: 38 },
        { name: 'Thu', value: 65 },
        { name: 'Fri', value: 48 },
        { name: 'Sat', value: 20 },
        { name: 'Sun', value: 15 },
    ];

    const handleSendPush = () => {
        if (!pushMessage) return;
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setPushMessage("");
            // In a real app, this would call an API
            alert("Push notification sent to 2,400 active users!");
        }, 1500);
    };

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Mobile Application</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Manage the citizen-facing mobile experience.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <QrCode className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Generate QR
                    </Button>
                    <Button className="font-bold border-none shadow-md hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400' }}>
                        <Settings className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        App Config
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Active Users</p>
                            <Users className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">12,450</div>
                        <p className="text-xs text-black font-medium mt-1">+12% this week</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Total Downloads</p>
                            <Download className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">45,200</div>
                        <p className="text-xs text-black font-medium mt-1">iOS & Android</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">App Rating</p>
                            <Star className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">4.8/5</div>
                        <p className="text-xs text-black font-medium mt-1">Based on 1.2k reviews</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Reports Submitted</p>
                            <MessageSquare className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">854</div>
                        <p className="text-xs text-black font-medium mt-1">This month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2 shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Download Trends</CardTitle>
                        <CardDescription className="text-black/70 font-medium">Daily app installs over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={downloadStats}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "1px solid #eee", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                        itemStyle={{ color: "#F4C400", fontWeight: "bold" }}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="#F4C400" strokeWidth={3} dot={{ r: 4, fill: "#000", strokeWidth: 2, stroke: "#F4C400" }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="shadow-sm bg-white border border-gray-100">
                        <CardHeader>
                            <CardTitle className="text-[#F4C400]">Push Notification</CardTitle>
                            <CardDescription className="text-black/70 font-medium">Broadcast alerts to citizens.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black">Message Title</label>
                                <Input placeholder="e.g. Weather Alert" className="bg-gray-50 border-gray-200 focus:border-[#F4C400]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black">Content</label>
                                <Textarea
                                    placeholder="Type your alert message here..."
                                    className="bg-gray-50 border-gray-200 min-h-[100px] focus:border-[#F4C400]"
                                    value={pushMessage}
                                    onChange={(e) => setPushMessage(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold"
                                onClick={handleSendPush}
                                disabled={sending || !pushMessage}
                            >
                                {sending ? "Sending..." : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Send Broadcast
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm bg-[#0F0F0F] border border-[#F4C400]">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[#F4C400] font-bold uppercase">Download Links</h4>
                                <Smartphone className="text-white h-5 w-5" />
                            </div>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10 hover:text-[#F4C400]">
                                    <Apple className="mr-3 h-5 w-5" /> App Store
                                </Button>
                                <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10 hover:text-[#F4C400]">
                                    <Play className="mr-3 h-5 w-5 fill-current" /> Google Play
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}

// Icon for App Config
function Settings(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
