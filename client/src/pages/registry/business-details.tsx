import { useParams, useLocation } from "wouter";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft, Building2, MapPin, Phone, Mail, Calendar,
    FileText, DollarSign, ClipboardCheck, Edit, Map as MapIcon,
    Globe, User, Hash, Briefcase, Home
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import { useState, useEffect } from "react";

const defaultIcon = new Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function BusinessDetailsPage() {
    const { id } = useParams();
    const [, setLocation] = useLocation();
    const queryClient = useQueryClient();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        legalName: "",
        tradingName: "",
        registrationNo: "",
        tin: "",
        businessType: "",
        industry: "",
        ownerName: "",
        contactPhone: "",
        contactEmail: "",
        physicalAddress: "",
        section: "",
        lot: "",
        block: "",
        suburb: "",
        district: "",
        province: "",
    });

    // Fetch business details
    const { data: business, isLoading } = useQuery({
        queryKey: [`/api/v1/businesses/${id}`],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/v1/businesses/${id}`);
            return res.json();
        },
        enabled: !!id,
    });

    // Populate edit form when business data loads
    useEffect(() => {
        if (business) {
            setEditForm({
                legalName: business.legalName || "",
                tradingName: business.tradingName || "",
                registrationNo: business.registrationNo || "",
                tin: business.tin || "",
                businessType: business.businessType || "",
                industry: business.industry || "",
                ownerName: business.ownerName || "",
                contactPhone: business.contactPhone || "",
                contactEmail: business.contactEmail || "",
                physicalAddress: business.physicalAddress || "",
                section: business.section || "",
                lot: business.lot || "",
                block: business.block || "",
                suburb: business.suburb || "",
                district: business.district || "",
                province: business.province || "",
            });
        }
    }, [business]);

    // Update business mutation
    const updateMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("PATCH", `/api/v1/businesses/${id}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/v1/businesses/${id}`] });
            setIsEditDialogOpen(false);
            toast({
                title: "Success",
                description: "Business updated successfully",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message || "Failed to update business",
                variant: "destructive",
            });
        },
    });

    // Fetch related licenses
    const { data: licenses } = useQuery({
        queryKey: [`/api/v1/licenses?businessId=${id}`],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/v1/licenses?businessId=${id}`);
            return res.json();
        },
        enabled: !!id,
    });

    // Fetch related payments
    const { data: payments } = useQuery({
        queryKey: [`/api/v1/payments?businessId=${id}`],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/v1/payments?businessId=${id}`);
            return res.json();
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading business details...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!business) {
        return (
            <MainLayout>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">Business not found</p>
                        <Button onClick={() => setLocation("/registry")} className="mt-4 w-full">
                            Back to Registry
                        </Button>
                    </CardContent>
                </Card>
            </MainLayout>
        );
    }

    const hasCoordinates = business.latitude && business.longitude;

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setLocation("/registry")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Registry
                    </Button>
                    <div className="flex gap-2">
                        {hasCoordinates && (
                            <Button
                                variant="outline"
                                onClick={() => setLocation(`/gis?lat=${business.latitude}&lng=${business.longitude}&zoom=18`)}
                            >
                                <MapIcon className="mr-2 h-4 w-4" />
                                View on Map
                            </Button>
                        )}
                        <Button onClick={() => setIsEditDialogOpen(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Business
                        </Button>
                    </div>
                </div>

                {/* Business Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Building2 className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{business.tradingName || business.legalName}</CardTitle>
                                    {business.tradingName && business.legalName !== business.tradingName && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Legal Name: {business.legalName}
                                        </p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                                            {business.status || 'Active'}
                                        </Badge>
                                        {business.isForeignEnterprise && (
                                            <Badge variant="outline">
                                                <Globe className="mr-1 h-3 w-3" />
                                                Foreign Enterprise
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Business Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Hash className="h-4 w-4" />
                                            Registration No
                                        </div>
                                        <p className="font-medium font-mono">{business.registrationNo || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <FileText className="h-4 w-4" />
                                            TIN
                                        </div>
                                        <p className="font-medium font-mono">{business.tin || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Briefcase className="h-4 w-4" />
                                            Business Type
                                        </div>
                                        <p className="font-medium">{business.businessType || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Briefcase className="h-4 w-4" />
                                            Industry
                                        </div>
                                        <p className="font-medium">{business.industry || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Calendar className="h-4 w-4" />
                                            Registered
                                        </div>
                                        <p className="font-medium">
                                            {new Date(business.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <User className="h-4 w-4" />
                                        Business Owner
                                    </div>
                                    <p className="font-medium">{business.ownerName || 'N/A'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Phone className="h-4 w-4" />
                                            Phone
                                        </div>
                                        <p className="font-medium">{business.contactPhone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <Mail className="h-4 w-4" />
                                            Email
                                        </div>
                                        <p className="font-medium">{business.contactEmail || 'N/A'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Location</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <MapPin className="h-4 w-4" />
                                        Physical Address
                                    </div>
                                    <p className="font-medium">{business.physicalAddress || 'N/A'}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {business.section && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Section</p>
                                            <p className="font-medium">{business.section}</p>
                                        </div>
                                    )}
                                    {business.lot && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Lot</p>
                                            <p className="font-medium">{business.lot}</p>
                                        </div>
                                    )}
                                    {business.block && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Block</p>
                                            <p className="font-medium">{business.block}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {business.suburb && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Suburb</p>
                                            <p className="font-medium">{business.suburb}</p>
                                        </div>
                                    )}
                                    {business.district && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">District</p>
                                            <p className="font-medium">{business.district}</p>
                                        </div>
                                    )}
                                    {business.province && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Province</p>
                                            <p className="font-medium">{business.province}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Map */}
                                {hasCoordinates && (
                                    <div className="h-64 rounded-md overflow-hidden border">
                                        <MapContainer
                                            center={[parseFloat(business.latitude), parseFloat(business.longitude)]}
                                            zoom={15}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                            />
                                            <Marker
                                                position={[parseFloat(business.latitude), parseFloat(business.longitude)]}
                                                icon={defaultIcon}
                                            >
                                                <Popup>
                                                    <strong>{business.tradingName || business.legalName}</strong>
                                                    <br />
                                                    {business.physicalAddress}
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Related Entities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="licenses" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="licenses">Licenses</TabsTrigger>
                                        <TabsTrigger value="payments">Payments</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="licenses" className="space-y-2">
                                        {licenses && licenses.length > 0 ? (
                                            licenses.map((license: any) => (
                                                <div key={license.licenceId} className="p-3 border rounded-md">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-medium text-sm">{license.licenseType || 'License'}</p>
                                                        <Badge variant="outline" className="text-xs">
                                                            {license.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {license.licenceNo}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {license.expiryDate ? `Expires: ${new Date(license.expiryDate).toLocaleDateString()}` : 'No expiry'}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center py-4">
                                                No licenses found
                                            </p>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="payments" className="space-y-2">
                                        {payments && payments.length > 0 ? (
                                            payments.slice(0, 5).map((payment: any) => (
                                                <div key={payment.paymentId} className="p-3 border rounded-md">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-medium text-sm">K {parseFloat(payment.amount || 0).toFixed(2)}</p>
                                                        <Badge variant="outline" className="text-xs">
                                                            {payment.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {payment.paymentMethod || 'N/A'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center py-4">
                                                No payments found
                                            </p>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Edit Business Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Business</DialogTitle>
                        <DialogDescription>
                            Update business information
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Tabs defaultValue="business" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="business">Business Info</TabsTrigger>
                                <TabsTrigger value="contact">Contact</TabsTrigger>
                                <TabsTrigger value="location">Location</TabsTrigger>
                            </TabsList>

                            <TabsContent value="business" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="legalName">Legal Name</Label>
                                    <Input
                                        id="legalName"
                                        value={editForm.legalName}
                                        onChange={(e) => setEditForm({ ...editForm, legalName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tradingName">Trading Name</Label>
                                    <Input
                                        id="tradingName"
                                        value={editForm.tradingName}
                                        onChange={(e) => setEditForm({ ...editForm, tradingName: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="registrationNo">Registration No</Label>
                                        <Input
                                            id="registrationNo"
                                            value={editForm.registrationNo}
                                            onChange={(e) => setEditForm({ ...editForm, registrationNo: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tin">TIN</Label>
                                        <Input
                                            id="tin"
                                            value={editForm.tin}
                                            onChange={(e) => setEditForm({ ...editForm, tin: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="businessType">Business Type</Label>
                                        <Input
                                            id="businessType"
                                            value={editForm.businessType}
                                            onChange={(e) => setEditForm({ ...editForm, businessType: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="industry">Industry</Label>
                                        <Input
                                            id="industry"
                                            value={editForm.industry}
                                            onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="contact" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName">Business Owner</Label>
                                    <Input
                                        id="ownerName"
                                        value={editForm.ownerName}
                                        onChange={(e) => setEditForm({ ...editForm, ownerName: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="contactPhone">Phone</Label>
                                        <Input
                                            id="contactPhone"
                                            value={editForm.contactPhone}
                                            onChange={(e) => setEditForm({ ...editForm, contactPhone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contactEmail">Email</Label>
                                        <Input
                                            id="contactEmail"
                                            type="email"
                                            value={editForm.contactEmail}
                                            onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="location" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="physicalAddress">Physical Address</Label>
                                    <Input
                                        id="physicalAddress"
                                        value={editForm.physicalAddress}
                                        onChange={(e) => setEditForm({ ...editForm, physicalAddress: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="section">Section</Label>
                                        <Input
                                            id="section"
                                            value={editForm.section}
                                            onChange={(e) => setEditForm({ ...editForm, section: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lot">Lot</Label>
                                        <Input
                                            id="lot"
                                            value={editForm.lot}
                                            onChange={(e) => setEditForm({ ...editForm, lot: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="block">Block</Label>
                                        <Input
                                            id="block"
                                            value={editForm.block}
                                            onChange={(e) => setEditForm({ ...editForm, block: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="suburb">Suburb</Label>
                                        <Input
                                            id="suburb"
                                            value={editForm.suburb}
                                            onChange={(e) => setEditForm({ ...editForm, suburb: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Input
                                            id="district"
                                            value={editForm.district}
                                            onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="province">Province</Label>
                                        <Input
                                            id="province"
                                            value={editForm.province}
                                            onChange={(e) => setEditForm({ ...editForm, province: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => updateMutation.mutate(editForm)}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
