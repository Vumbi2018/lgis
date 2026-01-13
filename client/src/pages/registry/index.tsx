import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, MoreHorizontal, MapPin, Loader2, X, Eye, Pencil, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Citizen {
  citizenId: string;
  councilId: string;
  nationalId: string | null;
  localCitizenNo: string | null;
  firstName: string;
  lastName: string;
  dob: string | null;
  sex: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  village: string | null;
  district: string | null;
  province: string | null;
  status: string | null;
  createdAt: string;
}

interface Business {
  businessId: string;
  councilId: string;
  registrationNo: string | null;
  tin: string | null;
  legalName: string;
  tradingName: string | null;
  businessType: string | null;
  industry: string | null;
  ownerName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  physicalAddress: string | null;
  section: string | null;
  lot: string | null;
  suburb: string | null;
  status: string | null;
  createdAt: string;
}

interface Asset {
  assetId: string;
  councilId: string;
  assetNo: string;
  name: string;
  type: string;
  location: string | null;
  condition: string | null;
  value: string | null;
  status: string | null;
}

interface CitizenFormData {
  firstName: string;
  lastName: string;
  nationalId: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  village: string;
  district: string;
  province: string;
}

interface BusinessFormData {
  legalName: string;
  tradingName: string;
  tin: string;
  businessType: string;
  ownerName: string;
  industry: string;
  contactPhone: string;
  contactEmail: string;
  physicalAddress: string;
  section: string;
  lot: string;
  suburb: string;
}

const initialCitizenForm: CitizenFormData = {
  firstName: "", lastName: "", nationalId: "", dob: "",
  phone: "", email: "", address: "", village: "", district: "", province: ""
};

const initialBusinessForm: BusinessFormData = {
  legalName: "", tradingName: "", tin: "", businessType: "",
  ownerName: "", industry: "", contactPhone: "", contactEmail: "",
  physicalAddress: "", section: "", lot: "", suburb: ""
};

export default function RegistryPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("citizens");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");
  const [showNewCitizenModal, setShowNewCitizenModal] = useState(false);
  const [showNewBusinessModal, setShowNewBusinessModal] = useState(false);

  const [citizenForm, setCitizenForm] = useState<CitizenFormData>(initialCitizenForm);
  const [businessForm, setBusinessForm] = useState<BusinessFormData>(initialBusinessForm);
  const [editCitizenForm, setEditCitizenForm] = useState<CitizenFormData>(initialCitizenForm);
  const [editBusinessForm, setEditBusinessForm] = useState<BusinessFormData>(initialBusinessForm);

  const { data: citizens = [], isLoading: loadingCitizens } = useQuery<Citizen[]>({
    queryKey: ["/api/citizens"],
  });

  const { data: businesses = [], isLoading: loadingBusinesses } = useQuery<Business[]>({
    queryKey: ["/api/businesses"],
  });

  const { data: assets = [], isLoading: loadingAssets } = useQuery<Asset[]>({
    queryKey: ["/api/assets"],
  });

  interface Council {
    councilId: string;
    name: string;
  }

  const { data: councils = [] } = useQuery<Council[]>({
    queryKey: ["/api/councils"],
  });

  const defaultCouncilId = councils.length > 0 ? councils[0].councilId : "";

  const createCitizenMutation = useMutation({
    mutationFn: async (data: CitizenFormData) => {
      const response = await apiRequest("POST", "/api/citizens", {
        organizationId: defaultCouncilId,
        fullName: `${data.firstName} ${data.lastName}`,
        ...data,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/citizens"] });
      toast({ title: "Success", description: "Citizen registered successfully." });
      setShowNewCitizenModal(false);
      setCitizenForm(initialCitizenForm);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to register citizen.", variant: "destructive" });
    },
  });

  const updateCitizenMutation = useMutation({
    mutationFn: async ({ citizenId, data }: { citizenId: string; data: Partial<CitizenFormData> }) => {
      const response = await apiRequest("PATCH", `/api/citizens/${citizenId}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/citizens"] });
      toast({ title: "Success", description: "Citizen record updated." });
      setSelectedCitizen(null);
      setViewMode("view");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update citizen.", variant: "destructive" });
    },
  });

  const deactivateCitizenMutation = useMutation({
    mutationFn: async (citizenId: string) => {
      const response = await apiRequest("PATCH", `/api/citizens/${citizenId}`, { status: "inactive" });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/citizens"] });
      toast({ title: "Deactivated", description: "Citizen record has been deactivated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to deactivate citizen.", variant: "destructive" });
    },
  });

  const createBusinessMutation = useMutation({
    mutationFn: async (data: BusinessFormData) => {
      const response = await apiRequest("POST", "/api/businesses", {
        organizationId: defaultCouncilId,
        businessName: data.legalName,
        tradingAs: data.tradingName,
        tinNumber: data.tin,
        ...data,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/businesses"] });
      toast({ title: "Success", description: "Business registered successfully." });
      setShowNewBusinessModal(false);
      setBusinessForm(initialBusinessForm);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to register business.", variant: "destructive" });
    },
  });

  const updateBusinessMutation = useMutation({
    mutationFn: async ({ businessId, data }: { businessId: string; data: Partial<BusinessFormData> }) => {
      const response = await apiRequest("PATCH", `/api/businesses/${businessId}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/businesses"] });
      toast({ title: "Success", description: "Business record updated." });
      setSelectedBusiness(null);
      setViewMode("view");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update business.", variant: "destructive" });
    },
  });

  const deactivateBusinessMutation = useMutation({
    mutationFn: async (businessId: string) => {
      const response = await apiRequest("PATCH", `/api/businesses/${businessId}`, { status: "inactive" });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/businesses"] });
      toast({ title: "Deactivated", description: "Business record has been deactivated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to deactivate business.", variant: "destructive" });
    },
  });

  const filteredCitizens = citizens.filter(c => {
    const matchesSearch = searchTerm === "" || 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nationalId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.localCitizenNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = searchTerm === "" ||
      b.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tradingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.registrationNo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAssets = assets.filter(a => {
    const matchesSearch = searchTerm === "" ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleNewRegistration = () => {
    if (activeTab === "citizens") {
      setCitizenForm(initialCitizenForm);
      setShowNewCitizenModal(true);
    } else if (activeTab === "businesses") {
      setBusinessForm(initialBusinessForm);
      setShowNewBusinessModal(true);
    } else {
      toast({ title: "Coming Soon", description: "Asset registration will be available soon." });
    }
  };

  const handleViewCitizen = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setViewMode("view");
  };

  const handleEditCitizen = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setEditCitizenForm({
      firstName: citizen.firstName || "",
      lastName: citizen.lastName || "",
      nationalId: citizen.nationalId || "",
      dob: citizen.dob || "",
      phone: citizen.phone || "",
      email: citizen.email || "",
      address: citizen.address || "",
      village: citizen.village || "",
      district: citizen.district || "",
      province: citizen.province || "",
    });
    setViewMode("edit");
  };

  const handleViewBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setViewMode("view");
  };

  const handleEditBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setEditBusinessForm({
      legalName: business.legalName || "",
      tradingName: business.tradingName || "",
      tin: business.tin || "",
      businessType: business.businessType || "",
      ownerName: business.ownerName || "",
      industry: business.industry || "",
      contactPhone: business.contactPhone || "",
      contactEmail: business.contactEmail || "",
      physicalAddress: business.physicalAddress || "",
      section: business.section || "",
      lot: business.lot || "",
      suburb: business.suburb || "",
    });
    setViewMode("edit");
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setViewMode("view");
  };

  const handleDeactivateCitizen = (citizenId: string) => {
    deactivateCitizenMutation.mutate(citizenId);
  };

  const handleDeactivateBusiness = (businessId: string) => {
    deactivateBusinessMutation.mutate(businessId);
  };

  const handleSaveCitizen = () => {
    if (selectedCitizen) {
      updateCitizenMutation.mutate({ citizenId: selectedCitizen.citizenId, data: editCitizenForm });
    }
  };

  const handleSaveBusiness = () => {
    if (selectedBusiness) {
      updateBusinessMutation.mutate({ businessId: selectedBusiness.businessId, data: editBusinessForm });
    }
  };

  const handleCreateCitizen = () => {
    if (!citizenForm.firstName || !citizenForm.lastName) {
      toast({ title: "Error", description: "First name and last name are required.", variant: "destructive" });
      return;
    }
    createCitizenMutation.mutate(citizenForm);
  };

  const handleCreateBusiness = () => {
    if (!businessForm.legalName) {
      toast({ title: "Error", description: "Legal name is required.", variant: "destructive" });
      return;
    }
    createBusinessMutation.mutate(businessForm);
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-600 hover:bg-emerald-700">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge className="bg-emerald-600 hover:bg-emerald-700">Active</Badge>;
    }
  };

  const getConditionBadge = (condition: string | null) => {
    switch (condition?.toLowerCase()) {
      case "excellent":
        return <Badge className="bg-emerald-600 hover:bg-emerald-700">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Good</Badge>;
      case "fair":
        return <Badge variant="secondary">Fair</Badge>;
      case "poor":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return <Badge variant="outline">{condition || "Unknown"}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Registry</h2>
          <p className="text-muted-foreground">Manage citizen and business records.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleNewRegistration} data-testid="button-new-registration">
            <Plus className="mr-2 h-4 w-4" />
            New Registration
          </Button>
        </div>
      </div>

      <div className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="citizens" data-testid="tab-citizens">Citizens ({filteredCitizens.length})</TabsTrigger>
            <TabsTrigger value="businesses" data-testid="tab-businesses">Businesses ({filteredBusinesses.length})</TabsTrigger>
            <TabsTrigger value="assets" data-testid="tab-assets">Assets & Facilities ({filteredAssets.length})</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Name, ID, or TIN..."
                className="pl-9 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="citizens" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Registered Citizens</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingCitizens ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>National ID</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCitizens.map((citizen) => (
                        <TableRow 
                          key={citizen.citizenId} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewCitizen(citizen)}
                          data-testid={`row-citizen-${citizen.citizenId}`}
                        >
                          <TableCell className="font-medium">
                            {citizen.firstName} {citizen.lastName}
                          </TableCell>
                          <TableCell>{citizen.nationalId || citizen.localCitizenNo || "—"}</TableCell>
                          <TableCell>
                            <div className="text-sm">{citizen.phone || "—"}</div>
                            <div className="text-xs text-muted-foreground">{citizen.email || ""}</div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{citizen.address || "—"}</TableCell>
                          <TableCell>{getStatusBadge(citizen.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" data-testid={`button-actions-citizen-${citizen.citizenId}`}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewCitizen(citizen); }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditCitizen(citizen); }}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={(e) => { e.stopPropagation(); handleDeactivateCitizen(citizen.citizenId); }}
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCitizens.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No citizens found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Registered Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingBusinesses ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>TIN</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBusinesses.map((business) => (
                        <TableRow 
                          key={business.businessId} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewBusiness(business)}
                          data-testid={`row-business-${business.businessId}`}
                        >
                          <TableCell>
                            <div className="font-medium">{business.legalName}</div>
                            {business.tradingName && (
                              <div className="text-xs text-muted-foreground">Trading as: {business.tradingName}</div>
                            )}
                          </TableCell>
                          <TableCell>{business.tin || "—"}</TableCell>
                          <TableCell>{business.businessType || "—"}</TableCell>
                          <TableCell>{business.ownerName || "—"}</TableCell>
                          <TableCell>{getStatusBadge(business.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" data-testid={`button-actions-business-${business.businessId}`}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewBusiness(business); }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditBusiness(business); }}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={(e) => { e.stopPropagation(); handleDeactivateBusiness(business.businessId); }}
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredBusinesses.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No businesses found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assets & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingAssets ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets.map((asset) => (
                        <TableRow 
                          key={asset.assetId} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewAsset(asset)}
                          data-testid={`row-asset-${asset.assetId}`}
                        >
                          <TableCell className="font-mono text-sm">{asset.assetNo}</TableCell>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {asset.location || "—"}
                            </div>
                          </TableCell>
                          <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                          <TableCell>{asset.value || "—"}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewAsset(asset); }}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredAssets.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No assets found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedCitizen} onOpenChange={(open) => { if (!open) { setSelectedCitizen(null); setViewMode("view"); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {viewMode === "view" ? "Citizen Profile" : "Edit Citizen"}
            </DialogTitle>
            <DialogDescription>
              {viewMode === "view" ? "View citizen record information" : "Update citizen information"}
            </DialogDescription>
          </DialogHeader>
          {selectedCitizen && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Citizen ID</Label>
                  <p className="font-mono text-sm">{selectedCitizen.localCitizenNo || selectedCitizen.citizenId}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">National ID</Label>
                  <p className="font-medium">{selectedCitizen.nationalId || "Not provided"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">First Name</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editCitizenForm.firstName} 
                      onChange={(e) => setEditCitizenForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedCitizen.firstName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Last Name</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editCitizenForm.lastName}
                      onChange={(e) => setEditCitizenForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedCitizen.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editCitizenForm.phone}
                      onChange={(e) => setEditCitizenForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedCitizen.phone || "Not provided"}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editCitizenForm.email}
                      onChange={(e) => setEditCitizenForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedCitizen.email || "Not provided"}</p>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                {viewMode === "edit" ? (
                  <Input 
                    value={editCitizenForm.address}
                    onChange={(e) => setEditCitizenForm(prev => ({ ...prev, address: e.target.value }))}
                  />
                ) : (
                  <p className="font-medium">{selectedCitizen.address || "Not provided"}</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Village</Label>
                  <p className="font-medium">{selectedCitizen.village || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">District</Label>
                  <p className="font-medium">{selectedCitizen.district || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Province</Label>
                  <p className="font-medium">{selectedCitizen.province || "—"}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {viewMode === "view" ? (
              <>
                <Button variant="outline" onClick={() => setSelectedCitizen(null)}>Close</Button>
                <Button onClick={() => { if (selectedCitizen) handleEditCitizen(selectedCitizen); }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setViewMode("view")}>Cancel</Button>
                <Button 
                  onClick={handleSaveCitizen}
                  disabled={updateCitizenMutation.isPending}
                >
                  {updateCitizenMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedBusiness} onOpenChange={(open) => { if (!open) { setSelectedBusiness(null); setViewMode("view"); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {viewMode === "view" ? "Business Profile" : "Edit Business"}
            </DialogTitle>
            <DialogDescription>
              {viewMode === "view" ? "View business record information" : "Update business information"}
            </DialogDescription>
          </DialogHeader>
          {selectedBusiness && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Registration No</Label>
                  <p className="font-mono text-sm">{selectedBusiness.registrationNo || selectedBusiness.businessId}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">TIN</Label>
                  <p className="font-medium">{selectedBusiness.tin || "Not provided"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Legal Name</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editBusinessForm.legalName}
                      onChange={(e) => setEditBusinessForm(prev => ({ ...prev, legalName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedBusiness.legalName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Trading Name</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editBusinessForm.tradingName}
                      onChange={(e) => setEditBusinessForm(prev => ({ ...prev, tradingName: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedBusiness.tradingName || "—"}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Business Type</Label>
                  <p className="font-medium">{selectedBusiness.businessType || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Industry</Label>
                  <p className="font-medium">{selectedBusiness.industry || "—"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Owner Name</Label>
                  <p className="font-medium">{selectedBusiness.ownerName || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedBusiness.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Contact Phone</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editBusinessForm.contactPhone}
                      onChange={(e) => setEditBusinessForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedBusiness.contactPhone || "—"}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Contact Email</Label>
                  {viewMode === "edit" ? (
                    <Input 
                      value={editBusinessForm.contactEmail}
                      onChange={(e) => setEditBusinessForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  ) : (
                    <p className="font-medium">{selectedBusiness.contactEmail || "—"}</p>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Physical Address</Label>
                <p className="font-medium">{selectedBusiness.physicalAddress || "—"}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Section</Label>
                  <p className="font-medium">{selectedBusiness.section || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Lot</Label>
                  <p className="font-medium">{selectedBusiness.lot || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Suburb</Label>
                  <p className="font-medium">{selectedBusiness.suburb || "—"}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {viewMode === "view" ? (
              <>
                <Button variant="outline" onClick={() => setSelectedBusiness(null)}>Close</Button>
                <Button onClick={() => { if (selectedBusiness) handleEditBusiness(selectedBusiness); }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setViewMode("view")}>Cancel</Button>
                <Button 
                  onClick={handleSaveBusiness}
                  disabled={updateBusinessMutation.isPending}
                >
                  {updateBusinessMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>View asset information</DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Asset ID</Label>
                  <p className="font-mono text-sm">{selectedAsset.assetNo}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <p className="font-medium">{selectedAsset.type}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Name</Label>
                <p className="font-medium">{selectedAsset.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <p className="font-medium">{selectedAsset.location || "—"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Condition</Label>
                  <div className="mt-1">{getConditionBadge(selectedAsset.condition)}</div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Value</Label>
                <p className="font-medium text-lg">{selectedAsset.value || "—"}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAsset(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewCitizenModal} onOpenChange={setShowNewCitizenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Citizen Registration</DialogTitle>
            <DialogDescription>Register a new citizen in the system</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input 
                  placeholder="Enter first name" 
                  value={citizenForm.firstName}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input 
                  placeholder="Enter last name"
                  value={citizenForm.lastName}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>National ID</Label>
                <Input 
                  placeholder="NID-XXXX-XXXXX"
                  value={citizenForm.nationalId}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, nationalId: e.target.value }))}
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input 
                  type="date"
                  value={citizenForm.dob}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, dob: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input 
                  placeholder="+675 XXXX XXXX"
                  value={citizenForm.phone}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="email@example.com"
                  value={citizenForm.email}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input 
                placeholder="Section XX, Lot XX, Suburb"
                value={citizenForm.address}
                onChange={(e) => setCitizenForm(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Village</Label>
                <Input 
                  placeholder="Village name"
                  value={citizenForm.village}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, village: e.target.value }))}
                />
              </div>
              <div>
                <Label>District</Label>
                <Input 
                  placeholder="District"
                  value={citizenForm.district}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, district: e.target.value }))}
                />
              </div>
              <div>
                <Label>Province</Label>
                <Input 
                  placeholder="Province"
                  value={citizenForm.province}
                  onChange={(e) => setCitizenForm(prev => ({ ...prev, province: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCitizenModal(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateCitizen}
              disabled={createCitizenMutation.isPending}
            >
              {createCitizenMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Citizen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewBusinessModal} onOpenChange={setShowNewBusinessModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Business Registration</DialogTitle>
            <DialogDescription>Register a new business in the system</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Legal Name *</Label>
                <Input 
                  placeholder="Company legal name"
                  value={businessForm.legalName}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, legalName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Trading Name</Label>
                <Input 
                  placeholder="Trading as..."
                  value={businessForm.tradingName}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, tradingName: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>TIN</Label>
                <Input 
                  placeholder="Tax Identification Number"
                  value={businessForm.tin}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, tin: e.target.value }))}
                />
              </div>
              <div>
                <Label>Business Type</Label>
                <Select value={businessForm.businessType} onValueChange={(val) => setBusinessForm(prev => ({ ...prev, businessType: val }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="sole_trader">Sole Trader</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Owner Name</Label>
                <Input 
                  placeholder="Primary owner name"
                  value={businessForm.ownerName}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, ownerName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Industry</Label>
                <Input 
                  placeholder="e.g. Retail, Healthcare"
                  value={businessForm.industry}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, industry: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact Phone</Label>
                <Input 
                  placeholder="+675 XXX XXXX"
                  value={businessForm.contactPhone}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input 
                  type="email" 
                  placeholder="business@example.com"
                  value={businessForm.contactEmail}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Physical Address</Label>
              <Input 
                placeholder="Full address"
                value={businessForm.physicalAddress}
                onChange={(e) => setBusinessForm(prev => ({ ...prev, physicalAddress: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Section</Label>
                <Input 
                  placeholder="XX"
                  value={businessForm.section}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, section: e.target.value }))}
                />
              </div>
              <div>
                <Label>Lot</Label>
                <Input 
                  placeholder="XX"
                  value={businessForm.lot}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, lot: e.target.value }))}
                />
              </div>
              <div>
                <Label>Suburb</Label>
                <Input 
                  placeholder="Suburb name"
                  value={businessForm.suburb}
                  onChange={(e) => setBusinessForm(prev => ({ ...prev, suburb: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewBusinessModal(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateBusiness}
              disabled={createBusinessMutation.isPending}
            >
              {createBusinessMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Business
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
