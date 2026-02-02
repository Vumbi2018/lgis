
import { MobileLayout } from "../MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Building } from "lucide-react";
import { useLocation } from "wouter";

export default function MobileBusinessList() {
    const [, setLocation] = useLocation();

    const { data: businesses, isLoading } = useQuery<any[]>({
        queryKey: ["/api/v1/businesses"],
    });

    if (isLoading) {
        return (
            <MobileLayout title="Businesses" userRole="manager">
                <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>)}
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title="Businesses" userRole="manager">
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Registered Entities</h3>
                    <Badge variant="outline">{businesses?.length || 0} Total</Badge>
                </div>

                {businesses?.map((biz) => (
                    <Card
                        key={biz.businessId}
                        className="p-4 active:bg-gray-50 cursor-pointer"
                    // onClick={() => setLocation(`/mobile/businesses/${biz.businessId}`)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-sm">{biz.tradingName || biz.legalName}</h4>
                                <p className="text-xs text-gray-500">{biz.registrationNo}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="flex flex-col text-xs text-gray-500 gap-1">
                            {biz.physicalAddress && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate w-64">{biz.physicalAddress}</span>
                                </div>
                            )}
                            {biz.contactPhone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-3 w-3" />
                                    <span>{biz.contactPhone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Building className="h-3 w-3" />
                                <span>{biz.industry}</span>
                            </div>
                        </div>
                    </Card>
                ))}

                {(!businesses || businesses.length === 0) && (
                    <div className="text-center py-10 text-gray-500">
                        No businesses found.
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
