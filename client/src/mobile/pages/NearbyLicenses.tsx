import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MobileLayout } from "../MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";
import { MapMobile } from "../components/MapMobile";
import { getCurrentPosition } from "../plugins/geolocation";
import { useLocation } from "wouter";

export default function NearbyLicenses() {
    const [, setLocation] = useLocation();
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [radius, setRadius] = useState(5); // km

    const { data: licenses } = useQuery<any[]>({
        queryKey: ["/api/licences"],
    });

    useEffect(() => {
        getCurrentPosition()
            .then((pos) => {
                setCurrentLocation([pos.latitude, pos.longitude]);
            })
            .catch(() => {
                setCurrentLocation([-9.4438, 147.1803]);
            });
    }, []);

    // Simple distance calculation (Haversine formula)
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const nearbyLicenses = currentLocation
        ? licenses?.filter((license: any) => {
            if (!license.latitude || !license.longitude) return false;
            const distance = calculateDistance(
                currentLocation[0],
                currentLocation[1],
                parseFloat(license.latitude),
                parseFloat(license.longitude)
            );
            return distance <= radius;
        })
        : [];

    const licenseMarkers = nearbyLicenses?.map((license: any) => ({
        id: license.licenceId,
        position: [parseFloat(license.latitude), parseFloat(license.longitude)] as [number, number],
        title: license.licenceNo,
        description: `Status: ${license.status}`,
        onClick: () => setLocation(`/mobile/business/license/${license.licenceId}`),
    })) || [];

    if (!currentLocation) {
        return (
            <MobileLayout title="Nearby Licenses" userRole="business">
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading map...</p>
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title="Nearby Licenses" userRole="business">
            <div className="space-y-4">
                {/* Radius Filter */}
                <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Search Radius</span>
                        <span className="text-sm font-bold text-[#F4C400]">{radius} km</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 5, 10, 20].map((r) => (
                            <Button
                                key={r}
                                size="sm"
                                variant={radius === r ? 'default' : 'outline'}
                                onClick={() => setRadius(r)}
                                className="flex-1"
                            >
                                {r} km
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Map */}
                <div className="h-[500px] rounded-lg overflow-hidden border">
                    <MapMobile
                        center={currentLocation}
                        zoom={12}
                        markers={licenseMarkers}
                    />
                </div>

                {/* Stats */}
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {nearbyLicenses?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600">Licenses nearby</p>
                        </div>
                        <MapPin className="h-10 w-10 text-gray-300" />
                    </div>
                </Card>

                {/* List of Nearby Licenses */}
                {nearbyLicenses && nearbyLicenses.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-3">Nearby Businesses</h3>
                        <div className="space-y-2">
                            {nearbyLicenses.slice(0, 10).map((license: any) => {
                                const distance = calculateDistance(
                                    currentLocation[0],
                                    currentLocation[1],
                                    parseFloat(license.latitude),
                                    parseFloat(license.longitude)
                                );

                                return (
                                    <Card
                                        key={license.licenceId}
                                        className="p-3 cursor-pointer active:bg-gray-50"
                                        onClick={() => setLocation(`/mobile/business/license/${license.licenceId}`)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{license.licenceNo}</p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {distance.toFixed(2)} km away
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs ${license.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {license.status}
                                            </span>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
