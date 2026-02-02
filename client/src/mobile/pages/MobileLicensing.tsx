
import { MobileLayout } from "../MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MobileLicensing() {
    const [, setLocation] = useLocation();

    // Fetch real service requests
    const { data: requests, isLoading } = useQuery<any[]>({
        queryKey: ["/api/v1/service-requests"],
    });

    if (isLoading) {
        return (
            <MobileLayout title="Licensing" userRole="manager">
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>)}
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title="Licensing" userRole="manager">
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Applications</h3>
                    <Button size="sm" onClick={() => setLocation("/mobile/licensing/apply")}>
                        <Plus className="h-4 w-4 mr-1" /> New
                    </Button>
                </div>

                {requests?.map((req) => (
                    <Card
                        key={req.requestId}
                        className="p-4 active:bg-gray-50 cursor-pointer"
                        onClick={() => {
                            // Could go to details page. For now just show alert or similar
                            // setLocation(`/mobile/licensing/${req.requestId}`)
                        }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-sm">{req.requestRef || 'REF-???'}</h4>
                                <p className="text-xs text-gray-500">{req.serviceId}</p>
                            </div>
                            <Badge className={
                                req.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                            }>
                                {req.status}
                            </Badge>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 gap-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(req.submittedAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(req.submittedAt).toLocaleTimeString()}
                            </div>
                        </div>
                    </Card>
                ))}

                {(!requests || requests.length === 0) && (
                    <div className="text-center py-10 text-gray-500">
                        No applications found.
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
