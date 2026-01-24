import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
    UserPlus,
    MoreVertical,
    Edit,
    Trash2,
    Shield,
    Key,
    Search,
    Users,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Loader2,
    Eye,
    EyeOff
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleManagement } from "./RoleManagement";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
    userId: string;
    fullName: string;
    email: string;
    phone?: string;
    nationalId?: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
    lastLogin?: Date;
    createdAt: Date;
}

interface Role {
    roleId: string;
    name: string;
    scope: 'council' | 'unit' | 'ward';
    permissionCount: number;
}

export function UserManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Mutations
    const deleteUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const res = await apiRequest("DELETE", `/api/v1/users/${userId}`);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/users"] });
            toast({ title: "User Deleted", description: "The user account has been removed." });
            setDeleteUserOpen(false);
            setSelectedUser(null);
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ userId, status }: { userId: string, status: string }) => {
            const res = await apiRequest("PATCH", `/api/v1/users/${userId}/status`, { status });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/users"] });
            toast({ title: "Status Updated", description: "User status has been changed." });
        }
    });

    // Fetch Roles from API
    const { data: roles = [], isLoading: rolesLoading } = useQuery<Role[]>({
        queryKey: ["/api/v1/roles"],
    });

    // Fetch Users from API
    const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
        queryKey: ["/api/v1/users"],
    });

    const filteredUsers = (users || []).filter(u => {
        const matchesSearch = u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.nationalId && u.nationalId.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesRole = !selectedRole || u.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const getStatusBadge = (status: string) => {
        const variants = {
            active: { className: 'bg-positive-dimmest text-positive border-positive-dimmer', icon: CheckCircle2 },
            inactive: { className: 'bg-background-higher text-foreground-dimmest border-outline-dimmer', icon: XCircle },
            suspended: { className: 'bg-negative-dimmest text-negative border-negative-dimmer', icon: AlertCircle }
        };
        const variant = variants[status as keyof typeof variants] || variants.inactive;
        const Icon = variant.icon;

        return (
            <Badge variant="outline" className={variant.className}>
                <Icon className="h-3 w-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    if (usersLoading || rolesLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent-primary-default" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Users Section */}
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl text-foreground-default">
                                <Users className="h-6 w-6 text-accent-primary-default" />
                                User Management
                            </CardTitle>
                            <CardDescription className="mt-2 text-foreground-dimmer">
                                Manage system users, assign roles, and control access
                            </CardDescription>
                        </div>
                        <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-primary shadow-md">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New User</DialogTitle>
                                    <DialogDescription>
                                        Add a new user to the system and assign their role
                                    </DialogDescription>
                                </DialogHeader>
                                <CreateUserForm onClose={() => setCreateUserOpen(false)} roles={roles} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search and Filters */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search users by name, email, or National ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 rounded-xl border transition-all border-outline-dimmer bg-background-higher text-foreground-default"
                            />
                        </div>
                        <Select value={selectedRole || "all"} onValueChange={(v) => setSelectedRole(v === "all" ? null : v)}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                {roles.map(role => (
                                    <SelectItem key={role.roleId} value={role.name}>{role.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* User Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <Card className="bg-accent-primary-dimmest border-accent-primary-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-accent-primary-default">{users.length}</div>
                                <div className="text-xs text-accent-primary-stronger">Total Users</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-positive-dimmest border-accent-primary-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-positive">
                                    {users.filter(u => u.status === 'active').length}
                                </div>
                                <div className="text-xs text-positive">Active</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-background-higher border-outline-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-foreground-default">
                                    {users.filter(u => u.status === 'inactive').length}
                                </div>
                                <div className="text-xs text-foreground-dimmer">Inactive</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-accent-primary-dimmest border-accent-primary-dimmer opacity-80">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-accent-primary-default">{roles.length}</div>
                                <div className="text-xs text-accent-primary-default">Roles</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Users Table */}
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-background-higher">
                                    <TableHead className="text-foreground-dimmer">Name</TableHead>
                                    <TableHead className="text-foreground-dimmer">National ID</TableHead>
                                    <TableHead className="text-foreground-dimmer">Email</TableHead>
                                    <TableHead className="text-foreground-dimmer">Role</TableHead>
                                    <TableHead className="text-foreground-dimmer">Status</TableHead>
                                    <TableHead className="text-foreground-dimmer">Last Login</TableHead>
                                    <TableHead className="text-right text-foreground-dimmer">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.userId} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <TableCell className="font-medium">{user.fullName}</TableCell>
                                        <TableCell>
                                            <code className="bg-background-higher px-2 py-1 rounded text-xs font-bold text-accent-primary-default">
                                                {user.nationalId || 'N/A'}
                                            </code>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-accent-primary-dimmest text-accent-primary-default border-accent-primary-dimmer">
                                                <Shield className="h-3 w-3 mr-1" />
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {user.lastLogin ? user.lastLogin.toLocaleString() : 'Never'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => {
                                                        setSelectedUser(user);
                                                        setEditUserOpen(true);
                                                    }}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        setSelectedUser(user);
                                                        setPasswordDialogOpen(true);
                                                    }}>
                                                        <Key className="h-4 w-4 mr-2" />
                                                        Reset Password
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        const nextStatus = user.status === 'active' ? 'inactive' : 'active';
                                                        updateStatusMutation.mutate({ userId: user.userId, status: nextStatus });
                                                    }}>
                                                        {user.status === 'active' ? <XCircle className="h-4 w-4 mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                                                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setDeleteUserOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit User Dialog */}
            <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user details and access level
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <EditUserForm
                            user={selectedUser}
                            onClose={() => {
                                setEditUserOpen(false);
                                setSelectedUser(null);
                            }}
                            roles={roles}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-negative">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{selectedUser?.fullName}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setDeleteUserOpen(false)}>Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteUserMutation.mutate(selectedUser?.userId)}
                            disabled={deleteUserMutation.isPending}
                        >
                            {deleteUserMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Delete User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset User Password</DialogTitle>
                        <DialogDescription>
                            Set a new password for <strong>{selectedUser?.fullName}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <ChangePasswordForm
                            userId={selectedUser.userId}
                            onClose={() => {
                                setPasswordDialogOpen(false);
                                setSelectedUser(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Roles Section */}
            <RoleManagement />
        </div>
    );
}

function EditUserForm({ onClose, roles, user }: { onClose: () => void; roles: any[]; user: any }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [fullName, setFullName] = useState(user.fullName || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [nationalId, setNationalId] = useState(user.nationalId || "");
    const [roleId, setRoleId] = useState("");

    // Initial role resolution
    useState(() => {
        const userRole = roles.find(r => r.name === user.role);
        if (userRole) setRoleId(userRole.roleId);
    });

    const updateUserMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("PATCH", `/api/v1/users/${user.userId}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/users"] });
            toast({
                title: "User Updated",
                description: "User details have been successfully changed.",
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update user account.",
                variant: "destructive"
            });
        }
    });

    const handleSubmit = () => {
        if (!fullName || !email || !roleId) {
            toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" });
            return;
        }
        updateUserMutation.mutate({ fullName, email, phone, roleId, nationalId });
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="edit-user-name">Full Name *</Label>
                <Input
                    id="edit-user-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                />
            </div>

            <div>
                <Label htmlFor="edit-user-email">Email Address *</Label>
                <Input
                    id="edit-user-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@ncdc.gov.pg"
                />
            </div>

            <div>
                <Label htmlFor="edit-user-phone">Phone Number</Label>
                <Input
                    id="edit-user-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+675 ..."
                />
            </div>

            <div>
                <Label htmlFor="edit-user-national-id">National ID</Label>
                <Input
                    id="edit-user-national-id"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="Enter National ID"
                />
            </div>

            <div>
                <Label>Assign Role *</Label>
                <Select value={roleId} onValueChange={setRoleId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map(role => (
                            <SelectItem key={role.roleId} value={role.roleId}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <DialogFooter className="pt-4">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={updateUserMutation.isPending}
                >
                    {updateUserMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </div>
    );
}

function CreateUserForm({ onClose, roles }: { onClose: () => void; roles: any[] }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [roleId, setRoleId] = useState("");

    const createUserMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("POST", "/api/v1/users", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/users"] });
            toast({
                title: "User Created",
                description: "The new user account has been provisioned.",
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create user account.",
                variant: "destructive"
            });
        }
    });

    const handleSubmit = () => {
        if (!fullName || !email || !roleId) {
            toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" });
            return;
        }
        createUserMutation.mutate({ fullName, email, phone, roleId, nationalId, password });
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="create-user-name">Full Name *</Label>
                <Input
                    id="create-user-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    title="User's Full Name"
                />
            </div>

            <div>
                <Label htmlFor="create-user-email">Email Address *</Label>
                <Input
                    id="create-user-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@ncdc.gov.pg"
                    title="User's Email Address"
                />
            </div>

            <div>
                <Label htmlFor="create-user-phone">Phone Number</Label>
                <Input
                    id="create-user-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+675 ..."
                    title="User's Phone Number"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="create-user-national-id">National ID</Label>
                    <Input
                        id="create-user-national-id"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        placeholder="NID-..."
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="create-user-password">Initial Password</Label>
                    <div className="relative">
                        <Input
                            id="create-user-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to auto-generate"
                            className="pr-20"
                        />
                        <div className="absolute right-0 top-0 flex items-center h-full pr-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide Password" : "Show Password"}
                                type="button"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    setPassword(Math.random().toString(36).slice(-8));
                                    setShowPassword(true);
                                }}
                                title="Generate Password"
                                type="button"
                            >
                                <Key className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Label>Assign Role *</Label>
                <Select value={roleId} onValueChange={setRoleId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map(role => (
                            <SelectItem key={role.roleId} value={role.roleId}>
                                {role.name} ({role.permissionCount} permissions)
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <DialogFooter className="pt-4">
                <Button variant="outline" onClick={onClose} className="text-foreground-default border-outline-dimmer">
                    Cancel
                </Button>
                <Button
                    className="bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold"
                    onClick={handleSubmit}
                    disabled={createUserMutation.isPending}
                >
                    {createUserMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Create User
                </Button>
            </DialogFooter>
        </div>
    );
}

function ChangePasswordForm({ userId, onClose }: { userId: string, onClose: () => void }) {
    const { toast } = useToast();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const passwordMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("POST", `/api/v1/users/${userId}/password`, data);
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Password Reset",
                description: "The user's password has been updated.",
            });
            onClose();
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to reset password.",
                variant: "destructive"
            });
        }
    });

    return (
        <div className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 characters"
                        className="pr-24"
                    />
                    <div className="absolute right-0 top-0 flex items-center h-full pr-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide Password" : "Show Password"}
                            type="button"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="link"
                            size="sm"
                            className="text-xs text-accent-primary-default whitespace-nowrap px-1"
                            onClick={() => {
                                setPassword(Math.random().toString(36).slice(-8));
                                setShowPassword(true);
                            }}
                            title="Auto-generate"
                            type="button"
                        >
                            Auto-generate
                        </Button>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose} className="text-foreground-default border-outline-dimmer">Cancel</Button>
                <Button
                    className="btn-primary"
                    onClick={() => passwordMutation.mutate({ password })}
                    disabled={passwordMutation.isPending || !password}
                >
                    {passwordMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Save New Password
                </Button>
            </DialogFooter>
        </div>
    );
}
