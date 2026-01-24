import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, ChevronRight, CheckCircle2, Lock, Loader2, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Role {
    roleId: string;
    name: string;
    scope: string;
    permissionCount: number;
}

interface Permission {
    permissionCode: string;
    description: string;
}

export function PermissionManagement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'roles' | 'catalogue'>('roles');

    // Fetch Roles
    const { data: roles = [], isLoading: rolesLoading } = useQuery<Role[]>({
        queryKey: ["/api/v1/roles"],
    });

    // Fetch All Permissions
    const { data: allPermissions = [], isLoading: permissionsLoading } = useQuery<Permission[]>({
        queryKey: ["/api/v1/permissions"],
    });

    // Fetch Role Permissions
    const { data: rolePermissionsData, isLoading: rolePermissionsLoading, isSuccess: rolePermissionsSuccess } = useQuery<Permission[]>({
        queryKey: ["/api/v1/roles", selectedRoleId, "permissions"],
        enabled: !!selectedRoleId,
    });

    const rolePermissions = rolePermissionsData || [];

    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    // Group permissions by module
    const categorizedPermissions = useMemo(() => {
        const groups: Record<string, Permission[]> = {};
        allPermissions.forEach(p => {
            const [module] = p.permissionCode.split(':');
            const groupName = module.charAt(0).toUpperCase() + module.slice(1);
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(p);
        });
        return groups;
    }, [allPermissions]);

    // Handle initial permission selection when role is selected
    useEffect(() => {
        if (rolePermissionsData) {
            setSelectedPermissions(rolePermissionsData.map(p => p.permissionCode));
        } else if (selectedRoleId) {
            setSelectedPermissions([]);
        }
    }, [rolePermissionsData, selectedRoleId]);

    const updatePermissionsMutation = useMutation({
        mutationFn: async ({ roleId, permissions }: { roleId: string, permissions: string[] }) => {
            const res = await apiRequest("POST", `/api/v1/roles/${roleId}/permissions`, { permissions });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/roles"] });
            queryClient.invalidateQueries({ queryKey: ["/api/v1/roles", selectedRoleId, "permissions"] });
            toast({
                title: "Permissions Updated",
                description: "Role permissions updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update permissions.",
                variant: "destructive"
            });
        }
    });

    const togglePermission = (code: string) => {
        setSelectedPermissions(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    const handleSave = () => {
        if (selectedRoleId) {
            updatePermissionsMutation.mutate({ roleId: selectedRoleId, permissions: selectedPermissions });
        }
    };

    const isLoading = rolesLoading || permissionsLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent-primary-default" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-background-higher p-1 rounded-xl border border-outline-dimmer">
                        <TabsTrigger value="roles" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-accent-primary-default data-[state=active]:shadow-sm">
                            Role Assignment
                        </TabsTrigger>
                        <TabsTrigger value="catalogue" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-accent-primary-default data-[state=active]:shadow-sm">
                            Permission Catalogue
                        </TabsTrigger>
                    </TabsList>

                    {viewMode === 'roles' && selectedRoleId && (
                        <Button
                            onClick={handleSave}
                            disabled={updatePermissionsMutation.isPending}
                            className="bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold"
                        >
                            {updatePermissionsMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Permissions
                        </Button>
                    )}
                </div>

                <TabsContent value="roles" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sidebar: Role List */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-dimmer px-1">Available Roles</h4>
                            {roles.map((role) => (
                                <div
                                    key={role.roleId}
                                    onClick={() => setSelectedRoleId(role.roleId)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedRoleId === role.roleId
                                        ? 'bg-accent-primary-dimmest border-accent-primary-default shadow-sm'
                                        : 'bg-white border-outline-dimmer hover:border-accent-primary-dimmer'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-bold ${selectedRoleId === role.roleId ? 'text-accent-primary-default' : 'text-foreground-default'}`}>
                                            {role.name}
                                        </span>
                                        {selectedRoleId === role.roleId && <CheckCircle2 className="h-4 w-4 text-accent-primary-default" />}
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-foreground-dimmer capitalize">{role.scope} Scope</span>
                                        <Badge variant="outline" className="bg-white border-outline-dimmer text-[10px] font-bold">
                                            {role.permissionCount} PERMS
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Main: Permission Matrix */}
                        <Card className="md:col-span-2 border-outline-dimmer shadow-sm">
                            <CardHeader className="border-b border-outline-dimmer bg-background-higher/30">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-accent-primary-default" />
                                    {selectedRoleId
                                        ? `Permissions for ${roles.find(r => r.roleId === selectedRoleId)?.name}`
                                        : "Select a role to configure permissions"
                                    }
                                </CardTitle>
                                <CardDescription>
                                    Define granular access control for this specific role.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-[500px]">
                                    {!selectedRoleId ? (
                                        <div className="flex flex-col items-center justify-center h-full p-12 text-center text-foreground-dimmer">
                                            <Shield className="h-12 w-12 mb-4 opacity-20" />
                                            <p>Select a role from the left to manage its permissions.</p>
                                        </div>
                                    ) : rolePermissionsLoading ? (
                                        <div className="flex justify-center p-12">
                                            <Loader2 className="h-8 w-8 animate-spin text-accent-primary-default" />
                                        </div>
                                    ) : (
                                        <div className="p-6 space-y-8">
                                            {Object.entries(categorizedPermissions).map(([module, perms]) => (
                                                <div key={module} className="space-y-4">
                                                    <div className="flex items-center gap-2 pb-2 border-b border-outline-dimmer">
                                                        <h5 className="font-black text-xs uppercase tracking-widest text-accent-primary-default">{module} Module</h5>
                                                        <Badge variant="outline" className="text-[9px] h-4">{perms.length}</Badge>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {perms.map(p => (
                                                            <div
                                                                key={p.permissionCode}
                                                                className="flex items-start gap-3 p-3 rounded-lg border border-outline-dimmer bg-background-higher/20 hover:bg-background-higher/40 transition-colors"
                                                            >
                                                                <Checkbox
                                                                    id={p.permissionCode}
                                                                    checked={selectedPermissions.includes(p.permissionCode)}
                                                                    onCheckedChange={() => togglePermission(p.permissionCode)}
                                                                    className="mt-0.5"
                                                                />
                                                                <div className="space-y-1 cursor-pointer" onClick={() => togglePermission(p.permissionCode)}>
                                                                    <label
                                                                        htmlFor={p.permissionCode}
                                                                        className="text-sm font-bold text-foreground-default cursor-pointer block"
                                                                    >
                                                                        {p.permissionCode.split(':')[1].replace('_', ' ').charAt(0).toUpperCase() + p.permissionCode.split(':')[1].slice(1)}
                                                                    </label>
                                                                    <p className="text-xs text-foreground-dimmer leading-relaxed">
                                                                        {p.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="catalogue" className="mt-0">
                    <Card className="border-outline-dimmer shadow-sm">
                        <CardHeader className="bg-background-higher/30">
                            <CardTitle>Permission Catalogue</CardTitle>
                            <CardDescription>
                                Full list of the 78+ standard permissions implemented across the LGIS platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Object.entries(categorizedPermissions).map(([module, perms]) => (
                                    <div key={module} className="bg-background-default rounded-xl border border-outline-dimmer p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-bold text-sm text-foreground-default">{module}</h5>
                                            <Badge variant="outline" className="text-[10px] font-bold">{perms.length} PERMS</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            {perms.slice(0, 5).map(p => (
                                                <div key={p.permissionCode} className="flex items-start gap-2">
                                                    <Key className="h-3 w-3 mt-1 text-accent-primary-default opacity-50" />
                                                    <div className="text-[10px] text-foreground-dimmer leading-tight">
                                                        <span className="font-bold text-foreground-default uppercase mr-1">
                                                            {p.permissionCode.split(':')[1]}
                                                        </span>
                                                        {p.description}
                                                    </div>
                                                </div>
                                            ))}
                                            {perms.length > 5 && (
                                                <p className="text-[9px] text-accent-primary-default font-bold italic pt-1">
                                                    + {perms.length - 5} more permissions
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
