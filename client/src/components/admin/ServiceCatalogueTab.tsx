import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    DollarSign,
    Clock,
    CheckCircle2,
    XCircle,
    Package
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import { useTenant } from "@/providers/TenantProvider";

interface Service {
    serviceId: string;
    serviceName: string;
    serviceCode: string;
    category: string;
    description: string;
    feeAmount: number;
    processingTimeDays: number;
    isActive: boolean;
}

export function ServiceCatalogueTab() {
    const [searchQuery, setSearchQuery] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const { formatCurrency } = useTenant();

    // Fetch services from API
    const { data: services = [], isLoading } = useQuery<Service[]>({
        queryKey: ['/api/v1/services'],
        queryFn: () => fetchAPI<Service[]>('/v1/services')
    });

    const filteredServices = services.filter(s =>
        (s.serviceName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (s.category?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    const activeCount = services.filter(s => s.isActive).length;
    const categories = Array.from(new Set(services.map(s => s.category)));

    return (
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl text-foreground-default">
                                <Package className="h-6 w-6 text-accent-primary-default" />
                                Service Catalogue Management
                            </CardTitle>
                            <CardDescription className="mt-2 text-foreground-dimmer">
                                Manage available services, fees, and processing times
                            </CardDescription>
                        </div>
                        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Service
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Create New Service</DialogTitle>
                                    <DialogDescription>
                                        Add a new service to the catalogue
                                    </DialogDescription>
                                </DialogHeader>
                                <CreateServiceForm onClose={() => setCreateDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search and Stats */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <Card className="bg-accent-primary-dimmest border-accent-primary-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-accent-primary-default">{services.length}</div>
                                <div className="text-xs text-foreground-dimmer">Total Services</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-positive-dimmest border-positive-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-positive">{activeCount}</div>
                                <div className="text-xs text-foreground-dimmer">Active</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-background-higher border-outline-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-foreground-default">
                                    {services.length - activeCount}
                                </div>
                                <div className="text-xs text-foreground-dimmer">Inactive</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-accent-primary-dimmest border-accent-primary-dimmer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-accent-primary-default">{categories.length}</div>
                                <div className="text-xs text-foreground-dimmer">Categories</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Services Table */}
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-background-higher">
                                    <TableHead className="text-foreground-dimmer">Service Name</TableHead>
                                    <TableHead className="text-foreground-dimmer">Category</TableHead>
                                    <TableHead className="text-foreground-dimmer">Fee</TableHead>
                                    <TableHead className="text-foreground-dimmer">Processing Time</TableHead>
                                    <TableHead className="text-foreground-dimmer">Status</TableHead>
                                    <TableHead className="text-right text-foreground-dimmer">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            Loading services...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredServices.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No services found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredServices.map((service) => (
                                        <TableRow key={service.serviceId} className="hover:bg-background-higher transition-colors">
                                            <TableCell>
                                                <div className="font-medium text-foreground-default">{service.serviceName}</div>
                                                <div className="text-xs text-foreground-dimmest">{service.serviceCode}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-accent-primary-dimmest text-accent-primary-default border-accent-primary-dimmer">
                                                    {service.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3 text-positive" />
                                                    <span className="font-medium text-foreground-default">{formatCurrency(service.feeAmount ?? 0)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-primary" />
                                                    <span>{(service.processingTimeDays ?? 0)} days</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {service.isActive ? (
                                                    <Badge variant="outline" className="bg-positive-dimmest text-positive border-positive-dimmer">
                                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-background-higher text-foreground-dimmer border-outline-dimmer">
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="hover:text-accent-primary-default transition-colors">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-negative hover:bg-negative-dimmest transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function CreateServiceForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        serviceName: "",
        serviceCode: "",
        category: "",
        description: "",
        feeAmount: "",
        processingTimeDays: "",
        isActive: true
    });

    const handleSubmit = () => {
        // TODO: Implement API call
        console.log("Creating service:", formData);
        onClose();
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name *</Label>
                    <Input
                        id="service-name"
                        value={formData.serviceName}
                        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                        placeholder="e.g., Business License"
                        title="Enter Service Name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="service-code">Service Code *</Label>
                    <Input
                        id="service-code"
                        value={formData.serviceCode}
                        onChange={(e) => setFormData({ ...formData, serviceCode: e.target.value })}
                        placeholder="e.g., BIZ-LIC-001"
                        title="Enter Unique Service Code"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="service-category">Category *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger id="service-category">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Licensing">Licensing</SelectItem>
                        <SelectItem value="Permits">Permits</SelectItem>
                        <SelectItem value="Registration">Registration</SelectItem>
                        <SelectItem value="Inspection">Inspection</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                    id="service-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter detailed service description..."
                    rows={3}
                    title="Service Description"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fee-amount">Fee Amount *</Label>
                    <Input
                        id="fee-amount"
                        type="number"
                        value={formData.feeAmount}
                        onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })}
                        placeholder="0.00"
                        title="Service Fee Amount"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="processing-days">Processing Time (days) *</Label>
                    <Input
                        id="processing-days"
                        type="number"
                        value={formData.processingTimeDays}
                        onChange={(e) => setFormData({ ...formData, processingTimeDays: e.target.value })}
                        placeholder="30"
                        title="Processing Time in Days"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="is-active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="is-active">Activate service immediately</Label>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Service
                </Button>
            </DialogFooter>
        </div>
    );
}
