import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPickerProps {
  latitude: number | null;
  longitude: number | null;
  onLocationChange: (lat: number, lng: number) => void;
  height?: string;
}

function LocationMarker({ position, onLocationChange }: {
  position: LatLngTuple | null;
  onLocationChange: (lat: number, lng: number) => void;
}) {
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(position);

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      const newPos: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      setMarkerPosition(newPos);
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return markerPosition === null ? null : (
    <Marker position={markerPosition} icon={defaultIcon}>
      <Popup>
        Business Location<br />
        Lat: {markerPosition[0].toFixed(6)}<br />
        Lng: {markerPosition[1].toFixed(6)}
      </Popup>
    </Marker>
  );
}

export function BusinessLocationMap({
  latitude,
  longitude,
  onLocationChange,
  height = "300px"
}: LocationPickerProps) {
  const [currentLocation, setCurrentLocation] = useState<LatLngTuple | null>(null);
  const [loading, setLoading] = useState(false);

  // Default to Port Moresby coordinates if no location set
  const defaultCenter: LatLngTuple = [-9.4438, 147.1803]; // Port Moresby, Papua New Guinea
  const center: LatLngTuple = latitude && longitude ? [latitude, longitude] : defaultCenter;
  const zoom = latitude && longitude ? 15 : 10;

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos: LatLngTuple = [latitude, longitude];
          setCurrentLocation(newPos);
          onLocationChange(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          // Fallback to Port Moresby if geolocation fails
          setCurrentLocation(defaultCenter);
          onLocationChange(defaultCenter[0], defaultCenter[1]);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-detect location on component mount if no coordinates provided
    if (!latitude || !longitude) {
      getCurrentLocation();
    }
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="business-map-picker" className="text-sm font-medium text-foreground-default">Business Location</label>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="text-xs btn-primary rounded-md disabled:opacity-50 h-auto py-1 px-3"
          title="Detect and use current location via GPS"
        >
          {loading ? "Detecting..." : "📍 Use Current Location"}
        </button>
      </div>

      <div
        id="business-map-picker"
        // eslint-disable-next-line react/forbid-dom-props
        style={{ "--map-height": height } as React.CSSProperties}
        className="border rounded-md overflow-hidden border-outline-dimmer h-[var(--map-height)]"
      >
        <MapContainer
          center={center}
          zoom={zoom}
          className="z-0 h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={latitude && longitude ? [latitude, longitude] : currentLocation}
            onLocationChange={onLocationChange}
          />
        </MapContainer>
      </div>

      <div className="text-xs bg-background-higher p-2 rounded border border-outline-dimmer text-foreground-dimmer">
        <p><strong className="text-foreground-default">Instructions:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Click "Use Current Location" to auto-detect your position</li>
          <li>Or click anywhere on the map to set the business location</li>
          <li>The marker shows the selected business location</li>
        </ul>
      </div>

      {(latitude || longitude) && (
        <div className="text-xs text-foreground-dimmer">
          <strong className="text-foreground-default">Selected Coordinates:</strong> {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
        </div>
      )}
    </div>
  );
}