import Dexie, { Table } from 'dexie';

export interface OfflineInspection {
    id?: number;
    inspectionId: string;
    result: 'pass' | 'fail';
    remarks: string;
    photos: string[];
    latitude?: number;
    longitude?: number;
    performedAt: string;
    synced: boolean;
    createdAt: string;
}

export interface OfflineApproval {
    id?: number;
    requestId: string;
    status: 'approved' | 'rejected';
    comments: string;
    reviewedAt: string;
    synced: boolean;
    createdAt: string;
}

export interface CachedData {
    id?: number;
    key: string;
    data: any;
    timestamp: number;
}

export class OfflineDB extends Dexie {
    inspections!: Table<OfflineInspection, number>;
    approvals!: Table<OfflineApproval, number>;
    cache!: Table<CachedData, number>;

    constructor() {
        super('LGISOffline');

        this.version(1).stores({
            inspections: '++id, inspectionId, synced, createdAt',
            approvals: '++id, requestId, synced, createdAt',
            cache: '++id, key, timestamp'
        });
    }
}

export const db = new OfflineDB();

// Helper functions
export const offlineStorage = {
    // Inspections
    async saveInspection(inspection: Omit<OfflineInspection, 'id' | 'synced' | 'createdAt'>) {
        return await db.inspections.add({
            ...inspection,
            synced: false,
            createdAt: new Date().toISOString()
        });
    },

    async getUnsyncedInspections() {
        return await db.inspections.filter(i => !i.synced).toArray();
    },

    async markInspectionSynced(id: number) {
        return await db.inspections.update(id, { synced: true });
    },

    // Approvals
    async saveApproval(approval: Omit<OfflineApproval, 'id' | 'synced' | 'createdAt'>) {
        return await db.approvals.add({
            ...approval,
            synced: false,
            createdAt: new Date().toISOString()
        });
    },

    async getUnsyncedApprovals() {
        return await db.approvals.filter(a => !a.synced).toArray();
    },

    async markApprovalSynced(id: number) {
        return await db.approvals.update(id, { synced: true });
    },

    // Cache
    async setCacheData(key: string, data: any) {
        const existing = await db.cache.where('key').equals(key).first();
        if (existing) {
            return await db.cache.update(existing.id!, { data, timestamp: Date.now() });
        }
        return await db.cache.add({ key, data, timestamp: Date.now() });
    },

    async getCacheData(key: string, maxAge: number = 3600000) { // 1 hour default
        const cached = await db.cache.where('key').equals(key).first();
        if (!cached) return null;

        const age = Date.now() - cached.timestamp;
        if (age > maxAge) {
            await db.cache.delete(cached.id!);
            return null;
        }

        return cached.data;
    },

    async clearCache() {
        return await db.cache.clear();
    }
};
