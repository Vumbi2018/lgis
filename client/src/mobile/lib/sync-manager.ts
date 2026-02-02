import { Network } from '@capacitor/network';
import { offlineStorage } from './offline-storage';
import { useToast } from '@/hooks/use-toast';

class SyncManager {
    private isSyncing = false;
    private syncCallbacks: Array<() => void> = [];

    async initialize() {
        // Listen for network status changes
        Network.addListener('networkStatusChange', async (status) => {
            console.log('Network status changed:', status.connected);
            if (status.connected && !this.isSyncing) {
                await this.syncAll();
            }
        });

        // Check current status
        const status = await Network.getStatus();
        if (status.connected) {
            await this.syncAll();
        }
    }

    async syncAll() {
        if (this.isSyncing) return;

        this.isSyncing = true;
        console.log('[SyncManager] Starting sync...');

        try {
            await this.syncInspections();
            await this.syncApprovals();

            // Notify listeners
            this.syncCallbacks.forEach(cb => cb());

            console.log('[SyncManager] Sync completed');
        } catch (error) {
            console.error('[SyncManager] Sync failed:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    private async syncInspections() {
        const unsynced = await offlineStorage.getUnsyncedInspections();
        console.log(`[SyncManager] Syncing ${unsynced.length} inspections`);

        for (const inspection of unsynced) {
            try {
                const response = await fetch(`/api/inspections/${inspection.inspectionId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        result: inspection.result,
                        remarks: inspection.remarks,
                        performedAt: inspection.performedAt,
                        latitude: inspection.latitude,
                        longitude: inspection.longitude,
                    }),
                });

                if (response.ok) {
                    await offlineStorage.markInspectionSynced(inspection.id!);
                    console.log(`[SyncManager] Inspection ${inspection.inspectionId} synced`);
                }
            } catch (error) {
                console.error(`[SyncManager] Failed to sync inspection ${inspection.inspectionId}:`, error);
            }
        }
    }

    private async syncApprovals() {
        const unsynced = await offlineStorage.getUnsyncedApprovals();
        console.log(`[SyncManager] Syncing ${unsynced.length} approvals`);

        for (const approval of unsynced) {
            try {
                const response = await fetch(`/api/service-requests/${approval.requestId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        status: approval.status,
                        processingData: {
                            managerComments: approval.comments,
                            reviewedAt: approval.reviewedAt,
                        },
                    }),
                });

                if (response.ok) {
                    await offlineStorage.markApprovalSynced(approval.id!);
                    console.log(`[SyncManager] Approval ${approval.requestId} synced`);
                }
            } catch (error) {
                console.error(`[SyncManager] Failed to sync approval ${approval.requestId}:`, error);
            }
        }
    }

    onSyncComplete(callback: () => void) {
        this.syncCallbacks.push(callback);
    }

    async getNetworkStatus() {
        return await Network.getStatus();
    }
}

export const syncManager = new SyncManager();
