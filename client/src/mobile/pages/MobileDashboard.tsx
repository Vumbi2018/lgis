
import { MobileLayout } from "../MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
    ClipboardCheck,
    Map,
    FileText,
    ShieldAlert,
    DollarSign,
    Settings,
    Briefcase,
    Building,
    Users
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MobileDashboard() {
    const [, setLocation] = useLocation();

    // Fetch Real Data Summary
    // We use multiple queries to get counts. In a real optimization, we'd have a /stats endpoint.
    const { data: inspections } = useQuery<any[]>({ queryKey: ["/api/inspections"] });
    const { data: requests } = useQuery<any[]>({ queryKey: ["/api/v1/service-requests?status=pending"] }); // Assuming endpoint supports filtering
    const { data: businesses } = useQuery<any[]>({ queryKey: ["/api/v1/businesses"] });

    const modules = [
        { title: "Inspections", icon: ClipboardCheck, count: inspections?.length, color: "text-blue-600", bg: "bg-blue-100", path: "/mobile/inspector/inspections" },
        { title: "Licensing", icon: FileText, count: requests?.length, color: "text-yellow-600", bg: "bg-yellow-100", path: "/mobile/licensing" },
        { title: "Businesses", icon: Building, count: businesses?.length, color: "text-purple-600", bg: "bg-purple-100", path: "/mobile/businesses" },
        { title: "GIS Map", icon: Map, color: "text-green-600", bg: "bg-green-100", path: "/mobile/inspector/map" },
        { title: "Revenue", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100", path: "/mobile/revenue" },
        { title: "Enforcement", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-100", path: "/mobile/enforcement" },
        { title: "Citizens", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100", path: "/mobile/citizens" },
        { title: "Admin", icon: Settings, color: "text-gray-600", bg: "bg-gray-100", path: "/mobile/menu" }, // Connect to Menu/Settings
    ];

    return (
        <MobileLayout title="Dashboard" userRole="manager">
            <div className="space-y-6">
                {/* Welcome / Header */}
                <div className="bg-black text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-1">Overview</h2>
                        <p className="text-gray-400 text-sm">National Capital District Commission</p>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {modules.map((m, i) => (
                        <Card
                            key={i}
                            className="border-none shadow-sm active:scale-95 transition-transform cursor-pointer"
                            onClick={() => setLocation(m.path)}
                        >
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                                <div className={`p-3 rounded-full mb-3 ${m.bg}`}>
                                    <m.icon className={`h-6 w-6 ${m.color}`} />
                                </div>
                                <h3 className="font-semibold text-sm text-gray-800">{m.title}</h3>
                                {m.count !== undefined && (
                                    <span className="text-xs font-bold text-gray-500 mt-1">{m.count} Items</span>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
