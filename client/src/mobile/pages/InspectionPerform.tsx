import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MobileLayout } from "../MobileLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, Check, X } from "lucide-react";
import { takePicture } from "../plugins/camera";
import { getCurrentPosition } from "../plugins/geolocation";
import { useToast } from "@/hooks/use-toast";

export default function InspectionPerform() {
    const { id } = useParams<{ id: string }>();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [result, setResult] = useState<'pass' | 'fail' | null>(null);
    const [remarks, setRemarks] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);
    const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);

    const { data: inspection } = useQuery<any>({
        queryKey: [`/api/inspections/${id}`],
    });

    const handleCapturePhoto = async () => {
        try {
            const photo = await takePicture();
            if (photo?.uri) {
                setPhotos([...photos, photo.uri]);
                toast({ title: "Photo captured!" });
            }
        } catch (error) {
            toast({ title: "Camera error", variant: "destructive" });
        }
    };

    const handleGetLocation = async () => {
        try {
            const position = await getCurrentPosition();
            setGpsLocation({ lat: position.latitude, lng: position.longitude });
            toast({ title: "Location captured!" });
        } catch (error) {
            toast({ title: "Location error", variant: "destructive" });
        }
    };

    const completeMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch(`/api/inspections/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/inspections'] });
            toast({ title: "Inspection completed!" });
            setLocation('/mobile/inspector/inspections');
        },
    });

    const handleComplete = () => {
        if (!result) {
            toast({ title: "Please select Pass or Fail", variant: "destructive" });
            return;
        }

        completeMutation.mutate({
            result,
            remarks,
            performedAt: new Date().toISOString(),
            latitude: gpsLocation?.lat,
            longitude: gpsLocation?.lng,
        });
    };

    return (
        <MobileLayout title="Perform Inspection" userRole="inspector" showBack>
            <div className="space-y-4">
                {/* Inspection Details */}
                <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">Inspection #{id?.slice(-6)}</h3>
                    {inspection?.scheduledAt && (
                        <p className="text-sm text-gray-600">
                            Scheduled: {new Date(inspection.scheduledAt).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Result Selection */}
                <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold mb-3">Result</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={result === 'pass' ? 'default' : 'outline'}
                            className={`h-20 ${result === 'pass' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={() => setResult('pass')}
                        >
                            <Check className="h-6 w-6 mr-2" />
                            Pass
                        </Button>
                        <Button
                            variant={result === 'fail' ? 'default' : 'outline'}
                            className={`h-20 ${result === 'fail' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                            onClick={() => setResult('fail')}
                        >
                            <X className="h-6 w-6 mr-2" />
                            Fail
                        </Button>
                    </div>
                </div>

                {/* Remarks */}
                <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold mb-3">Remarks</h3>
                    <Textarea
                        placeholder="Enter inspection notes..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Photos */}
                <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold mb-3">Photos ({photos.length})</h3>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {photos.map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                alt={`Photo ${i + 1}`}
                                className="w-full h-24 object-cover rounded"
                            />
                        ))}
                    </div>
                    <Button onClick={handleCapturePhoto} variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Capture Photo
                    </Button>
                </div>

                {/* GPS Location */}
                <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold mb-3">Location</h3>
                    {gpsLocation ? (
                        <p className="text-sm text-gray-600 mb-2">
                            {gpsLocation.lat.toFixed(6)}, {gpsLocation.lng.toFixed(6)}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 mb-2">No location captured</p>
                    )}
                    <Button onClick={handleGetLocation} variant="outline" className="w-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Current Location
                    </Button>
                </div>

                {/* Complete Button */}
                <Button
                    onClick={handleComplete}
                    className="w-full h-12 bg-[#F4C400] hover:bg-[#d4a800] text-black font-bold"
                    disabled={completeMutation.isPending}
                >
                    {completeMutation.isPending ? 'Saving...' : 'Complete Inspection'}
                </Button>
            </div>
        </MobileLayout>
    );
}
