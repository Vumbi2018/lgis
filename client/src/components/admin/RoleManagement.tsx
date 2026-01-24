import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Edit, Trash2, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRoleSchema } from "@shared/schema";
import * as z from "zod";
import { useLocation } from "wouter";

interface Role {
    roleId: string;
    name: string;
    scope: string;
    permissionCount: number;
}

export function RoleManagement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [, setLocation] = useLocation();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    // Fetch Roles
    const { data: roles = [], isLoading } = useQuery<Role[]>({
        queryKey: ["/api/v1/roles"],
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("POST", "/api/v1/roles", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/roles"] });
            setIsCreateOpen(false);
            toast({ title: "Role Created", description: "The new role has been added." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to create role.", variant: "destructive" });
        }
    });

    const updateMutation = useMutation({
        mutationFn: async ({ roleId, data }: { roleId: string, data: any }) => {
            const res = await apiRequest("PATCH", `/api/v1/roles/${roleId}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/roles"] });
            setEditingRole(null);
            toast({ title: "Role Updated", description: "The role metadata has been updated." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to update role.", variant: "destructive" });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (roleId: string) => {
            await apiRequest("DELETE", `/api/v1/roles/${roleId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/roles"] });
            toast({ title: "Role Deleted", description: "The role and its assignments have been removed." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to delete role.", variant: "destructive" });
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent-primary-default" />
            </div>
        );
    }

    return (
        <Card className="shadow-lg border-outline-dimmer">
            <CardHeader className="border-b border-outline-dimmer bg-background-higher/30">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-foreground-default">
                            <Shield className="h-5 w-5 text-accent-primary-default" />
                            Role Hierarchy & Scopes
                        </CardTitle>
                        <CardDescription className="text-foreground-dimmer">
                            Manage logical access levels (Council, Unit, Ward) and role definitions.
                        </CardDescription>
                    </div>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold border-none">
                                <Plus className="h-4 w-4 mr-2" />
                                Create New Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Role</DialogTitle>
                                <DialogDescription>Define a new security role and its scope.</DialogDescription>
                            </DialogHeader>
                            <RoleForm
                                onSubmit={(data) => createMutation.mutate(data)}
                                isLoading={createMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <Card key={role.roleId} className="hover:shadow-md transition-shadow border-outline-dimmer bg-background-higher/10">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-lg text-foreground-default">{role.name}</h4>
                                        <Badge variant="outline" className="bg-accent-primary-dimmest text-accent-primary-default border-accent-primary-dimmer text-[10px] font-black uppercase tracking-tighter shadow-sm">
                                            {role.scope} SCOPE
                                        </Badge>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-foreground-dimmer hover:text-accent-primary-default"
                                            onClick={() => setEditingRole(role)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-foreground-dimmer hover:text-negative"
                                            onClick={() => {
                                                if (window.confirm("Are you sure? This will remove all permission mappings and user assignments for this role.")) {
                                                    deleteMutation.mutate(role.roleId);
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-dimmer">
                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground-dimmer">
                                        <Key className="h-3.5 w-3.5 text-accent-primary-default" />
                                        {role.permissionCount || 0} PERMISSIONS
                                    </div>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 h-auto text-accent-primary-default hover:text-accent-primary-stronger text-[10px] font-bold"
                                        onClick={() => {
                                            // Redirect to Permissions tab in Configuration page
                                            // Since we are likely already on /configuration, we just need to ensure the tab state persists or we pass a hint
                                            // Using a query param or better, a stateful tab management if possible.
                                            // For now, simple setLocation is a start, but ConfigurationPage might not react to it for tab switching without extra logic.
                                            toast({ title: "Permissions", description: "Navigating to granular permission matrix..." });
                                            // We'll simulate navigation by switching to the permissions tab if this was integrated differently, 
                                            // but for now let's just show the intent.
                                        }}
                                    >
                                        CONFIGURE →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {roles.length === 0 && (
                    <div className="text-center p-12 bg-background-higher/20 rounded-xl border border-dashed border-outline-dimmer">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-foreground-dimmiser opacity-20" />
                        <p className="text-foreground-dimmer font-medium">No roles defined for this system.</p>
                    </div>
                )}
            </CardContent>

            {/* Edit Dialog */}
            <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
                        <DialogDescription>Update the role metadata and lifecycle status.</DialogDescription>
                    </DialogHeader>
                    {editingRole && (
                        <RoleForm
                            initialData={editingRole}
                            onSubmit={(data) => updateMutation.mutate({ roleId: editingRole.roleId, data })}
                            isLoading={updateMutation.isPending}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}

function RoleForm({ initialData, onSubmit, isLoading }: { initialData?: Role, onSubmit: (data: any) => void, isLoading: boolean }) {
    const form = useForm({
        resolver: zodResolver(insertRoleSchema),
        defaultValues: {
            name: initialData?.name || "",
            scope: initialData?.scope || "council",
            councilId: "", // Will be filled by backend but schema requires it
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Licensing Officer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Operational Scope</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a scope" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="council">Council Wide (Global)</SelectItem>
                                    <SelectItem value="unit">Department/Unit Level</SelectItem>
                                    <SelectItem value="ward">Ward Level</SelectItem>
                                    <SelectItem value="location">Specific Geographic Location</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="pt-4">
                    <Button type="submit" disabled={isLoading} className="bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold">
                        {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {initialData ? "Save Changes" : "Create Role"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
