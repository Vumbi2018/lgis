import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MobileLayout } from "../MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, List } from "lucide-react";
import { MapMobile } from "../components/MapMobile";
import { getCurrentPosition } from "../plugins/geolocation";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function InspectionMap() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    const { data: inspections } = useQuery<any[]>({
        queryKey: ["/api/inspections"],
    });

    useEffect(() => {
        getCurrentPosition()
            .then((pos) => {
                setCurrentLocation([pos.latitude, pos.longitude]);
            })
            .catch(() => {
                // Default to Port Moresby if location fails
                setCurrentLocation([-9.4438, 147.1803]);
            });
    }, []);

    const inspectionMarkers = inspections
        ?.filter((i: any) => i.latitude && i.longitude)
        .map((i: any) => ({
            id: i.inspectionId,
            position: [parseFloat(i.latitude), parseFloat(i.longitude)] as [number, number],
            title: `Inspection #${i.inspectionId?.slice(-6)}`,
            description: i.status,
            onClick: () => setLocation(`/mobile/inspector/inspection/${i.inspectionId}`),
        })) || [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!currentLocation) {
        return (
            <MobileLayout title="Inspection Map" userRole="inspector">
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading map...</p>
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title="Inspection Map" userRole="inspector">
            <div className="space-y-4">
                {/* View Toggle */}
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === 'map' ? 'default' : 'outline'}
                        onClick={() => setViewMode('map')}
                        className="flex-1"
                    >
                        <MapPin className="h-4 w-4 mr-2" />
                        Map View
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        onClick={() => setViewMode('list')}
                        className="flex-1"
                    >
                        <List className="h-4 w-4 mr-2" />
                        List View
                    </Button>
                </div>

                {viewMode === 'map' ? (
                    <>
                        {/* Map */}
                        <div className="h-[500px] rounded-lg overflow-hidden border">
                            <MapMobile
                                center={currentLocation}
                                zoom={13}
                                markers={inspectionMarkers}
                            />
                        </div>

                        {/* Current Location Button */}
                        <Button
                            onClick={async () => {
                                try {
                                    const pos = await getCurrentPosition();
                                    setCurrentLocation([pos.latitude, pos.longitude]);
                                    toast({ title: "Location updated" });
                                } catch (error) {
                                    toast({ title: "Failed to get location", variant: "destructive" });
                                }
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            <Navigation className="h-4 w-4 mr-2" />
                            Center on My Location
                        </Button>

                        {/* Stats */}
                        <Card className="p-4">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-bold">{inspectionMarkers.length}</span> inspections on map
                            </p>
                        </Card>
                    </>
                ) : (
                    <div className="space-y-3">
                        {inspections?.map((inspection: any) => (
                            <Card
                                key={inspection.inspectionId}
                                className="p-4 cursor-pointer active:bg-gray-50"
                                onClick={() => setLocation(`/mobile/inspector/inspection/${inspection.inspectionId}`)}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-sm">
                                            Inspection #{inspection.inspectionId?.slice(-6)}
                                        </h3>
                                        <Badge className={getStatusColor(inspection.status)}>
                                            {inspection.status}
                                        </Badge>
                                    </div>
                                    {inspection.latitude && inspection.longitude && (
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    )}
                                </div>

                                {inspection.latitude && inspection.longitude && (
                                    <p className="text-sm text-gray-600">
                                        {inspection.latitude}, {inspection.longitude}
                                    </p>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
