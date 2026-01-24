/**
 * LGIS Permission Catalogue
 * Comprehensive permission definitions for Role-Based Access Control (RBAC)
 */

export interface Permission {
    code: string;
    module: string;
    description: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    requiresMFA?: boolean;
    requiresAudit?: boolean;
}

export const PERMISSION_MODULES = {
    REGISTRY: 'Registry',
    LICENSING: 'Licensing',
    FINANCIAL: 'Financial',
    ENFORCEMENT: 'Enforcement',
    SERVICES: 'Services',
    ADMINISTRATION: 'Administration',
    REPORTING: 'Reporting',
    GIS: 'GIS',
    SECURITY: 'Security'
} as const;

export const PERMISSIONS: Permission[] = [
    // ================================
    // REGISTRY MODULE
    // ================================
    {
        code: 'citizen:read',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'View citizen records',
        riskLevel: 'low',
        requiresAudit: true
    },
    {
        code: 'citizen:write',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Create/update citizen records',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'citizen:delete',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Delete citizen records',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'citizen:export',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Export citizen data',
        riskLevel: 'high',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'citizen:pii',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Access personally identifiable information',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'business:read',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'View business records',
        riskLevel: 'low',
        requiresAudit: true
    },
    {
        code: 'business:write',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Create/update business records',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'business:delete',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Delete business records',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'business:verify',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Verify business registrations',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'business:export',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Export business data',
        riskLevel: 'high',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'property:read',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'View property records',
        riskLevel: 'low'
    },
    {
        code: 'property:write',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Create/update property records',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'property:delete',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Delete property records',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'property:assess',
        module: PERMISSION_MODULES.REGISTRY,
        description: 'Create/update rate assessments',
        riskLevel: 'high',
        requiresAudit: true
    },

    // ================================
    // LICENSING MODULE
    // ================================
    {
        code: 'request:read',
        module: PERMISSION_MODULES.LICENSING,
        description: 'View service requests/applications',
        riskLevel: 'low'
    },
    {
        code: 'request:write',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Create/update service requests',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'request:approve',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Approve requests',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'request:reject',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Reject requests',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'request:delete',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Delete requests',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'licence:read',
        module: PERMISSION_MODULES.LICENSING,
        description: 'View licences',
        riskLevel: 'low'
    },
    {
        code: 'licence:write',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Issue/update licences',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'licence:renew',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Renew licences',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'licence:revoke',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Revoke licences',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'licence:suspend',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Suspend licences',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'inspection:read',
        module: PERMISSION_MODULES.LICENSING,
        description: 'View inspections',
        riskLevel: 'low'
    },
    {
        code: 'inspection:write',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Conduct/update inspections',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'inspection:schedule',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Schedule inspections',
        riskLevel: 'low',
        requiresAudit: true
    },
    {
        code: 'inspection:complete',
        module: PERMISSION_MODULES.LICENSING,
        description: 'Complete inspections',
        riskLevel: 'medium',
        requiresAudit: true
    },

    // ================================
    // FINANCIAL MODULE
    // ================================
    {
        code: 'payment:read',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'View payments',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'payment:write',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Record payments',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'payment:refund',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Process refunds',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'payment:delete',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Delete/void payments',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'payment:export',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Export payment records',
        riskLevel: 'high',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'invoice:read',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'View invoices',
        riskLevel: 'low'
    },
    {
        code: 'invoice:write',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Create/update invoices',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'invoice:delete',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Delete/void invoices',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'invoice:waive',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Waive fees/charges',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'fee:read',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'View fee schedules',
        riskLevel: 'low'
    },
    {
        code: 'fee:write',
        module: PERMISSION_MODULES.FINANCIAL,
        description: 'Manage fee schedules',
        riskLevel: 'high',
        requiresAudit: true
    },

    // ================================
    // ENFORCEMENT MODULE
    // ================================
    {
        code: 'enforcement:read',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'View enforcement cases',
        riskLevel: 'low'
    },
    {
        code: 'enforcement:write',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Create/update cases',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'enforcement:assign',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Assign cases to officers',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'enforcement:close',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Close cases',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'complaint:read',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'View complaints',
        riskLevel: 'low'
    },
    {
        code: 'complaint:write',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Create/update complaints',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'complaint:assign',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Assign complaints',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'notice:read',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'View notices',
        riskLevel: 'low'
    },
    {
        code: 'notice:write',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Issue notices',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'notice:approve',
        module: PERMISSION_MODULES.ENFORCEMENT,
        description: 'Approve notices',
        riskLevel: 'high',
        requiresAudit: true
    },

    // ================================
    // SERVICES MODULE
    // ================================
    {
        code: 'service:read',
        module: PERMISSION_MODULES.SERVICES,
        description: 'View service catalogue',
        riskLevel: 'low'
    },
    {
        code: 'service:write',
        module: PERMISSION_MODULES.SERVICES,
        description: 'Manage service catalogue',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'service:activate',
        module: PERMISSION_MODULES.SERVICES,
        description: 'Activate/deactivate services',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'workflow:read',
        module: PERMISSION_MODULES.SERVICES,
        description: 'View workflows',
        riskLevel: 'low'
    },
    {
        code: 'workflow:write',
        module: PERMISSION_MODULES.SERVICES,
        description: 'Manage workflows',
        riskLevel: 'high',
        requiresAudit: true
    },

    // ================================
    // ADMINISTRATION MODULE
    // ================================
    {
        code: 'user:read',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'View users',
        riskLevel: 'low'
    },
    {
        code: 'user:write',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Create/update users',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'user:delete',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Delete users',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'user:activate',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Activate/deactivate users',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'role:read',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'View roles',
        riskLevel: 'low'
    },
    {
        code: 'role:write',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Create/update roles',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'role:assign',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Assign roles to users',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'permission:read',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'View permissions',
        riskLevel: 'low'
    },
    {
        code: 'permission:assign',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Assign permissions to roles',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'audit:read',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'View audit logs',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'audit:export',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Export audit logs',
        riskLevel: 'high',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'config:read',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'View configuration',
        riskLevel: 'medium'
    },
    {
        code: 'config:write',
        module: PERMISSION_MODULES.ADMINISTRATION,
        description: 'Modify configuration',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },

    // ================================
    // SECURITY MODULE (Break-Glass)
    // ================================
    {
        code: 'breakglass:use',
        module: PERMISSION_MODULES.SECURITY,
        description: 'Use break-glass emergency access',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },
    {
        code: 'breakglass:review',
        module: PERMISSION_MODULES.SECURITY,
        description: 'Review break-glass access logs',
        riskLevel: 'high',
        requiresAudit: true
    },
    {
        code: 'breakglass:approve',
        module: PERMISSION_MODULES.SECURITY,
        description: 'Approve break-glass requests',
        riskLevel: 'critical',
        requiresMFA: true,
        requiresAudit: true
    },

    // ================================
    // REPORTING MODULE
    // ================================
    {
        code: 'report:read',
        module: PERMISSION_MODULES.REPORTING,
        description: 'View reports',
        riskLevel: 'low'
    },
    {
        code: 'report:create',
        module: PERMISSION_MODULES.REPORTING,
        description: 'Create custom reports',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'report:export',
        module: PERMISSION_MODULES.REPORTING,
        description: 'Export reports',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'dashboard:read',
        module: PERMISSION_MODULES.REPORTING,
        description: 'View dashboards',
        riskLevel: 'low'
    },
    {
        code: 'analytics:read',
        module: PERMISSION_MODULES.REPORTING,
        description: 'Access analytics',
        riskLevel: 'medium'
    },

    // ================================
    // GIS MODULE
    // ================================
    {
        code: 'gis:read',
        module: PERMISSION_MODULES.GIS,
        description: 'View GIS maps and layers',
        riskLevel: 'low'
    },
    {
        code: 'gis:write',
        module: PERMISSION_MODULES.GIS,
        description: 'Edit GIS data',
        riskLevel: 'medium',
        requiresAudit: true
    },
    {
        code: 'gis:export',
        module: PERMISSION_MODULES.GIS,
        description: 'Export GIS data',
        riskLevel: 'medium',
        requiresAudit: true
    }
];

// Helper functions
export function getPermissionsByModule(module: string): Permission[] {
    return PERMISSIONS.filter(p => p.module === module);
}

export function getPermissionByCode(code: string): Permission | undefined {
    return PERMISSIONS.find(p => p.code === code);
}

export function getCriticalPermissions(): Permission[] {
    return PERMISSIONS.filter(p => p.riskLevel === 'critical');
}

export function getPermissionsRequiringMFA(): Permission[] {
    return PERMISSIONS.filter(p => p.requiresMFA);
}
