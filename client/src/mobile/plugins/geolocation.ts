import { Geolocation } from '@capacitor/geolocation';

export const getCurrentPosition = async () => {
    try {
        const coordinates = await Geolocation.getCurrentPosition();
        return {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude,
            accuracy: coordinates.coords.accuracy,
            timestamp: coordinates.timestamp
        };
    } catch (error) {
        console.error('Geolocation error:', error);
        throw error;
    }
};

export const watchPosition = (callback: (position: any) => void) => {
    return Geolocation.watchPosition({}, callback);
};
