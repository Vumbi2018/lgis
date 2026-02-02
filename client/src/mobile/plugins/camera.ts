import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const takePicture = async () => {
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
        });

        return {
            uri: image.webPath,
            format: image.format
        };
    } catch (error) {
        console.error('Camera error:', error);
        throw error;
    }
};

export const selectFromGallery = async () => {
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        return {
            uri: image.webPath,
            format: image.format
        };
    } catch (error) {
        console.error('Gallery error:', error);
        throw error;
    }
};
