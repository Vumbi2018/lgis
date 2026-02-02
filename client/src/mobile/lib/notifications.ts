import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

class NotificationService {
    async initialize() {
        if (!Capacitor.isNativePlatform()) {
            console.log('[Notifications] Not on native platform, skipping setup');
            return;
        }

        // Request permission
        const result = await PushNotifications.requestPermissions();

        if (result.receive === 'granted') {
            await PushNotifications.register();
            console.log('[Notifications] Registration successful');
        } else {
            console.log('[Notifications] Permission denied');
        }

        // Setup listeners
        PushNotifications.addListener('registration', (token: Token) => {
            console.log('[Notifications] Push token:', token.value);
            this.saveTokenToBackend(token.value);
        });

        PushNotifications.addListener('registrationError', (error: any) => {
            console.error('[Notifications] Registration error:', error);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
            console.log('[Notifications] Push received:', notification);
            // Show in-app notification
            this.handleNotification(notification);
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
            console.log('[Notifications] Action performed:', action);
            this.handleNotificationAction(action);
        });
    }

    private async saveTokenToBackend(token: string) {
        try {
            await fetch('/api/user/push-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });
            console.log('[Notifications] Token saved to backend');
        } catch (error) {
            console.error('[Notifications] Failed to save token:', error);
        }
    }

    private handleNotification(notification: PushNotificationSchema) {
        // You can show a toast or custom in-app notification here
        console.log('Notification received:', notification.title, notification.body);
    }

    private handleNotificationAction(action: ActionPerformed) {
        const data = action.notification.data;

        // Navigate based on notification type
        if (data.type === 'inspection') {
            window.location.href = `/mobile/inspector/inspection/${data.inspectionId}`;
        } else if (data.type === 'approval') {
            window.location.href = `/mobile/manager/approval/${data.requestId}`;
        } else if (data.type === 'license') {
            window.location.href = `/mobile/business/license/${data.licenseId}`;
        }
    }

    async getDeliveredNotifications() {
        const result = await PushNotifications.getDeliveredNotifications();
        return result.notifications;
    }

    async removeAllDelivered() {
        await PushNotifications.removeAllDeliveredNotifications();
    }
}

export const notificationService = new NotificationService();
