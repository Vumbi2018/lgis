import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useOrganization } from "@/contexts/organization-context";
import { Loader2, Upload, Building2, ArrowLeft, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { BusinessLocationMap } from "@/components/BusinessLocationMap";

// Helper to generate options 01-99
const numberOptions = Array.from({ length: 99 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
);

export default function BusinessRegistrationPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const { currentOrganization } = useOrganization();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        legalName: "",
        tradingName: "",
        businessType: "", // Sole Trader, Company, etc.
        regNumber: "",
        tin: "",
        email: "",
        phone: "",
        address: "",
        section: "",
        lot: "",
        suburb: "",
        latitude: null as number | null,
        longitude: null as number | null
    });

    const [documents, setDocuments] = useState<FileList | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleLocationChange = (latitude: number, longitude: number) => {
        setFormData({ ...formData, latitude, longitude });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setDocuments(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentOrganization) return;

        setLoading(true);

        try {
            const formPayload = new FormData();
            // Append business data as JSON string because we're sending multipart/form-data
            formPayload.append("data", JSON.stringify({
                ...formData,
                councilId: currentOrganization.councilId,
                contactEmail: formData.email,
                contactPhone: formData.phone,
                physicalAddress: formData.address,
                registrationNo: formData.regNumber,
                latitude: formData.latitude,
                longitude: formData.longitude,
                section: formData.section,
                lot: formData.lot,
                suburb: formData.suburb
            }));

            // Append files
            if (documents) {
                for (let i = 0; i < documents.length; i++) {
                    formPayload.append("documents", documents[i]);
                }
            }

            // We use fetch directly here because apiRequest sets JSON headers by default
            const res = await fetch("/api/v1/businesses/register", {
                method: "POST",
                body: formPayload
                // Note: Do NOT set Content-Type header manually for FormData, browser does it with boundary
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            toast({
                title: "Registration Submitted",
                description: "Your business verification request has been submitted.",
            });

            setLocation("/portal");
        } catch (error: any) {
            toast({
                title: "Submission Failed",
                description: "Could not register business. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 mx-auto w-full">
                    <div className="mb-6">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent" onClick={() => setLocation("/portal")}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">New Business Registration</CardTitle>
                            <CardDescription>Register your business entity to apply for licenses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Section 1: Business Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium flex items-center">
                                        <Building2 className="w-5 h-5 mr-2 text-yellow-600" />
                                        Business Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="legalName">Legal Name *</Label>
                                            <Input id="legalName" value={formData.legalName} onChange={handleChange} required placeholder="Registered Company Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tradingName">Trading Name</Label>
                                            <Input id="tradingName" value={formData.tradingName} onChange={handleChange} placeholder="DBA (if different)" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="businessType">Business Entity Type *</Label>
                                            <Select onValueChange={(v) => handleSelectChange("businessType", v)} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Sole Trader">Sole Trader</SelectItem>
                                                    <SelectItem value="Partnership">Partnership</SelectItem>
                                                    <SelectItem value="Company">Limited Company (Pty Ltd)</SelectItem>
                                                    <SelectItem value="Association">Association / NGO</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="regNumber">IPA Registration No.</Label>
                                            <Input id="regNumber" value={formData.regNumber} onChange={handleChange} placeholder="e.g. 1-12345" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                                            <Input id="tin" value={formData.tin} onChange={handleChange} placeholder="Optional for registration" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Physical Address & Contact */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="text-lg font-medium">Location & Contact</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Business Email *</Label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                        </div>

                                        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="section">Section</Label>
                                                <Select onValueChange={(v) => handleSelectChange("section", v)} value={formData.section}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Section" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px] overflow-y-auto">
                                                        {numberOptions.map(opt => (
                                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lot">Lot / Allotment</Label>
                                                <Select onValueChange={(v) => handleSelectChange("lot", v)} value={formData.lot}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Lot" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px] overflow-y-auto">
                                                        {numberOptions.map(opt => (
                                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="suburb">Suburb</Label>
                                            <Input id="suburb" value={formData.suburb} onChange={handleChange} placeholder="e.g. Waigani" />
                                        </div>

                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="address">Physical Address Detail (Street Name/Building)</Label>
                                            <Textarea id="address" value={formData.address} onChange={handleChange} placeholder="Detailed address information..." />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Business Location */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="text-lg font-medium flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                                        Business Location & GPS Coordinates
                                    </h3>
                                    <div className="bg-green-50 p-4 rounded-md text-sm text-green-800 mb-4">
                                        Set your business location on the map. This helps with service delivery and location-based services.
                                    </div>
                                    <BusinessLocationMap
                                        latitude={formData.latitude}
                                        longitude={formData.longitude}
                                        onLocationChange={handleLocationChange}
                                        height="350px"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label>Latitude</Label>
                                            <Input
                                                type="number"
                                                step="any"
                                                value={formData.latitude || ""}
                                                readOnly
                                                placeholder="Will be set from map"
                                                className="bg-gray-50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Longitude</Label>
                                            <Input
                                                type="number"
                                                step="any"
                                                value={formData.longitude || ""}
                                                readOnly
                                                placeholder="Will be set from map"
                                                className="bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Documents */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="text-lg font-medium flex items-center">
                                        <Upload className="w-5 h-5 mr-2 text-yellow-600" />
                                        Required Documents
                                    </h3>
                                    <div className="bg-yellow-50 p-4 rounded-md text-sm text-yellow-800 mb-4">
                                        Please upload your <b>Certificate of Incorporation</b> or <b>Business Name Registration</b>.
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="documents">Upload Files (PDF, JPG, PNG)</Label>
                                        <Input id="documents" type="file" onChange={handleFileChange} multiple required className="cursor-pointer" />
                                    </div>
                                </div>

                                <CardFooter className="px-0 pt-6">
                                    <Button type="submit" className="w-full h-11 bg-black text-yellow-500 hover:bg-gray-900 font-semibold" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting Registration...
                                            </>
                                        ) : "Submit Registration"}
                                    </Button>
                                </CardFooter>

                            </form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
