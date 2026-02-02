import { useEffect } from 'react';
import { syncManager } from './lib/sync-manager';
import { notificationService } from './lib/notifications';
import { Network } from '@capacitor/network';
import { useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function MobileAppInit({ children }: { children: React.ReactNode }) {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Initialize services
        syncManager.initialize();
        notificationService.initialize();

        // Monitor network status
        Network.addListener('networkStatusChange', (status) => {
            setIsOnline(status.connected);
        });

        Network.getStatus().then((status) => {
            setIsOnline(status.connected);
        });

        return () => {
            Network.removeAllListeners();
        };
    }, []);

    return (
        <>
            {/* Offline Indicator */}
            {!isOnline && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium z-50 flex items-center justify-center gap-2">
                    <WifiOff className="h-4 w-4" />
                    <span>Offline Mode - Changes will sync when connection returns</span>
                </div>
            )}

            <div className={!isOnline ? 'pt-10' : ''}>
                {children}
            </div>
        </>
    );
}
