import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertTriangle,
    Clock,
    CheckCircle2,
    XCircle,
    Shield,
    User,
    FileText,
    Timer,
    Eye,
    Lock,
    Search,
    Filter
} from "lucide-react";
import { format } from "date-fns";

interface BreakGlassRequest {
    requestId: string;
    userId: string;
    userName: string;
    incidentRef: string;
    justification: string;
    requestedScope: {
        entities: string[];
        permissions: string[];
    };
    duration: number;
    status: 'pending' | 'approved' | 'denied' | 'expired' | 'revoked' | 'active';
    createdAt: Date;
    approvedAt?: Date;
    expiresAt?: Date;
    authorizerName?: string;
}

export function BreakGlassWorkflow() {
    const [requestDialogOpen, setRequestDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<BreakGlassRequest | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Sample requests
    const requests: BreakGlassRequest[] = [
        {
            requestId: '1',
            userId: 'user1',
            userName: 'John Doe',
            incidentRef: 'INC-2026-001',
            justification: 'Emergency access needed to process urgent license application for public safety incident',
            requestedScope: {
                entities: ['citizen', 'business'],
                permissions: ['citizen:pii', 'licence:write']
            },
            duration: 120,
            status: 'pending',
            createdAt: new Date(2026, 0, 19, 3, 30)
        },
        {
            requestId: '2',
            userId: 'user2',
            userName: 'Jane Smith',
            incidentRef: 'INC-2026-002',
            justification: 'Court order requires immediate access to payment records',
            requestedScope: {
                entities: ['payment'],
                permissions: ['payment:read', 'payment:export']
            },
            duration: 240,
            status: 'approved',
            createdAt: new Date(2026, 0, 18, 14, 15),
            approvedAt: new Date(2026, 0, 18, 14, 45),
            expiresAt: new Date(2026, 0, 18, 18, 45),
            authorizerName: 'Admin User'
        }
    ];

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { className: 'bg-warning-dimmest text-warning border-warning-dimmer', icon: Clock },
            approved: { className: 'bg-positive-dimmest text-positive border-positive-dimmer', icon: CheckCircle2 },
            active: { className: 'bg-negative-dimmest text-negative border-negative-dimmer animate-pulse', icon: AlertTriangle },
            denied: { className: 'bg-negative-dimmest text-negative border-negative-dimmer', icon: XCircle },
            expired: { className: 'bg-background-higher text-foreground-dimmest border-outline-dimmer', icon: Timer },
            revoked: { className: 'bg-negative-dimmest text-negative border-negative-dimmer', icon: XCircle }
        };
        const variant = variants[status as keyof typeof variants] || variants.pending;
        const Icon = variant.icon;

        return (
            <Badge variant="outline" className={variant.className}>
                <Icon className="h-3 w-3 mr-1" />
                {status.toUpperCase()}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Break-Glass Request Form */}
            <Card className="shadow-xl border-accent-negative-dimmer bg-background-default">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl text-negative">
                                <AlertTriangle className="h-6 w-6" />
                                Break-Glass Emergency Access
                            </CardTitle>
                            <CardDescription className="mt-2 text-foreground-dimmer">
                                Request temporary elevated permissions for critical incidents
                            </CardDescription>
                        </div>
                        <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="shadow-md bg-negative text-background-default hover:bg-negative/90">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Request Break-Glass Access
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2 text-negative">
                                        <AlertTriangle className="h-5 w-5" />
                                        Break-Glass Access Request
                                    </DialogTitle>
                                    <DialogDescription className="text-foreground-dimmer">
                                        This request will be logged and reviewed by council audit committee
                                    </DialogDescription>
                                </DialogHeader>

                                <BreakGlassRequestForm onClose={() => setRequestDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Warning Alert */}
                    <div className="border rounded-lg p-4 mb-6 bg-negative-dimmest border-negative-dimmer">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5 text-negative" />
                            <div className="space-y-1">
                                <p className="font-semibold text-negative">Emergency Access Only</p>
                                <p className="text-sm text-accent-negative-stronger">
                                    Break-glass access is strictly for emergency situations. All activities are logged and subject to mandatory review within 48 hours. Misuse may result in disciplinary action.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <Card className="border-outline-dimmer bg-accent-warning-dimmest border-accent-warning-dimmer">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-warning">
                                        {requests.filter(r => r.status === 'pending').length}
                                    </div>
                                    <div className="text-xs text-foreground-dimmer">Pending Approval</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-outline-dimmer bg-accent-primary-dimmest border-accent-primary-dimmer">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-accent-primary-default">
                                        {requests.filter(r => r.status === 'active').length}
                                    </div>
                                    <div className="text-xs text-foreground-dimmer">Active Sessions</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-outline-dimmer bg-accent-positive-dimmest border-accent-positive-dimmer">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-positive">
                                        {requests.filter(r => r.status === 'approved').length}
                                    </div>
                                    <div className="text-xs text-foreground-dimmer">Approved</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-outline-dimmer bg-accent-negative-dimmest border-accent-negative-dimmer">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-negative">
                                        {requests.filter(r => r.status === 'revoked' || r.status === 'denied').length}
                                    </div>
                                    <div className="text-xs text-foreground-dimmer">Denied/Revoked</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Requests Timeline */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Break-Glass Request History
                    </CardTitle>
                    <div className="flex flex-col md:flex-row gap-4 mt-4 lg:mt-0">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-black transition-colors" />
                            <Input
                                placeholder="Search by incident, name, or justification..."
                                className="pl-10 h-10 border-outline-dimmer bg-background-higher"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-[180px]">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="h-10 border-outline-dimmer bg-background-higher">
                                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="denied">Denied</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                    <SelectItem value="revoked">Revoked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {requests.filter(r => {
                            const matchesSearch = r.incidentRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                r.justification.toLowerCase().includes(searchTerm.toLowerCase());
                            const matchesStatus = statusFilter === "all" || r.status === statusFilter;
                            return matchesSearch && matchesStatus;
                        }).map(request => (
                            <Card key={request.requestId} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-semibold text-lg">{request.incidentRef}</h4>
                                                {getStatusBadge(request.status)}
                                                <Badge variant="outline">
                                                    <User className="h-3 w-3 mr-1" />
                                                    {request.userName}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{request.justification}</p>

                                            <div className="grid grid-cols-3 gap-4 text-sm mt-4 p-3 rounded-lg bg-background-higher border border-outline-dimmer">
                                                <div>
                                                    <span className="text-foreground-dimmer">Requested:</span>
                                                    <div className="font-medium text-foreground-default">{format(request.createdAt, 'PPpp')}</div>
                                                </div>
                                                {request.approvedAt && (
                                                    <div>
                                                        <span className="text-foreground-dimmer">Approved by:</span>
                                                        <div className="font-medium text-foreground-default">{request.authorizerName}</div>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-foreground-dimmer">Duration:</span>
                                                    <div className="font-medium text-foreground-default">{request.duration} minutes</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {request.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="border-accent-positive-dimmer text-accent-positive-default bg-accent-positive-dimmest hover:bg-accent-positive-dimmer/20">
                                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="border-accent-negative-dimmer text-accent-negative-default bg-accent-negative-dimmest hover:bg-accent-negative-dimmer/20">
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Deny
                                                    </Button>
                                                </>
                                            )}
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Details
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {request.requestedScope.entities.map(entity => (
                                            <Badge key={entity} variant="outline" className="text-xs">
                                                {entity}
                                            </Badge>
                                        ))}
                                        {request.requestedScope.permissions.map(perm => (
                                            <Badge key={perm} variant="outline" className="text-xs bg-accent-primary-dimmest text-accent-primary-default border-accent-primary-dimmer">
                                                {perm}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function BreakGlassRequestForm({ onClose }: { onClose: () => void }) {
    const [incidentRef, setIncidentRef] = useState("");
    const [justification, setJustification] = useState("");
    const [duration, setDuration] = useState("120");

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="incident-ref">Incident Reference *</Label>
                <Input
                    id="incident-ref"
                    value={incidentRef}
                    onChange={(e) => setIncidentRef(e.target.value)}
                    placeholder="INC-2026-XXX"
                    title="Incident Reference Number"
                />
            </div>

            <div>
                <Label htmlFor="break-glass-justification">Justification * (minimum 50 characters)</Label>
                <Textarea
                    id="break-glass-justification"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Provide detailed justification for emergency access..."
                    rows={4}
                    className="resize-none"
                    title="Detailed Justification"
                />
                <p className="text-xs text-muted-foreground mt-1">
                    {justification.length} / 50 characters
                </p>
            </div>

            <div>
                <Label>Access Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onClose} className="text-foreground-default border-outline-dimmer">
                    Cancel
                </Button>
                <Button className="bg-negative text-background-default hover:bg-negative/90">
                    Submit Request
                </Button>
            </div>
        </div>
    );
}
