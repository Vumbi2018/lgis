import { Capacitor } from '@capacitor/core';

export const getPlatform = () => {
    return Capacitor.getPlatform(); // 'web', 'ios', or 'android'
};

export const isNative = () => {
    return Capacitor.isNativePlatform();
};

export const isAndroid = () => {
    return Capacitor.getPlatform() === 'android';
};

export const isIOS = () => {
    return Capacitor.getPlatform() === 'ios';
};

export const isWeb = () => {
    return Capacitor.getPlatform() === 'web';
};
