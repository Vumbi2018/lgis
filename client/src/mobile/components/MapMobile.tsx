import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMobileProps {
    center: [number, number];
    zoom?: number;
    markers?: Array<{
        id: string;
        position: [number, number];
        title: string;
        description?: string;
        onClick?: () => void;
    }>;
    onMapClick?: (lat: number, lng: number) => void;
    className?: string;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
}

export function MapMobile({ center, zoom = 13, markers = [], onMapClick, className = '' }: MapMobileProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={center} zoom={zoom} />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        eventHandlers={{
                            click: () => marker.onClick?.(),
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-semibold">{marker.title}</h3>
                                {marker.description && (
                                    <p className="text-sm text-gray-600 mt-1">{marker.description}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
