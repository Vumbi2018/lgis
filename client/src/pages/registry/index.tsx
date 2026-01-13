import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Search, Filter, MoreHorizontal, MapPin, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { MOCK_ASSETS } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";

export default function RegistryPage() {
  const { data: citizens = [], isLoading: loadingCitizens } = useQuery<any[]>({
    queryKey: ["/api/citizens"],
  });

  const { data: businesses = [], isLoading: loadingBusinesses } = useQuery<any[]>({
    queryKey: ["/api/businesses"],
  });

  const handleNewRegistration = () => {
    toast({
      title: "Registration Form",
      description: "Opening new registration wizard...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-600 hover:bg-emerald-700">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "compliant":
        return <Badge variant="outline" className="border-emerald-500 text-emerald-600">Compliant</Badge>;
      case "non_compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
        <Tabs defaultValue="citizens" className="space-y-4">
          <TabsList>
            <TabsTrigger value="citizens" data-testid="tab-citizens">Citizens ({citizens.length})</TabsTrigger>
            <TabsTrigger value="businesses" data-testid="tab-businesses">Businesses ({businesses.length})</TabsTrigger>
            <TabsTrigger value="assets" data-testid="tab-assets">Assets & Facilities</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Name, ID, or TIN..."
                className="pl-9 w-full md:w-[300px]"
                data-testid="input-search"
              />
            </div>
            <Button variant="outline" size="icon" data-testid="button-filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <TabsContent value="citizens">
            <Card>
              <CardContent className="p-0">
                {loadingCitizens ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading citizens...</span>
                  </div>
                ) : citizens.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No citizens registered yet. Click "New Registration" to add one.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Citizen ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>NID Number</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {citizens.map((citizen) => (
                        <TableRow key={citizen.id} data-testid={`row-citizen-${citizen.id}`}>
                          <TableCell className="font-medium font-mono text-xs">{citizen.id.slice(0, 8)}...</TableCell>
                          <TableCell className="font-medium">{citizen.fullName}</TableCell>
                          <TableCell>{citizen.nidNumber || "—"}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {citizen.district || citizen.village}, {citizen.province}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-600 hover:bg-emerald-700">Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-actions-citizen-${citizen.id}`}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businesses">
             <Card>
              <CardContent className="p-0">
                {loadingBusinesses ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading businesses...</span>
                  </div>
                ) : businesses.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No businesses registered yet.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business ID</TableHead>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>TIN</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {businesses.map((biz) => (
                        <TableRow key={biz.id} data-testid={`row-business-${biz.id}`}>
                          <TableCell className="font-medium font-mono text-xs">{biz.id.slice(0, 8)}...</TableCell>
                          <TableCell className="font-medium">{biz.businessName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{biz.businessType || "General"}</Badge>
                          </TableCell>
                          <TableCell>{biz.tinNumber || "—"}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              Sect {biz.section || "—"} / Lot {biz.lot || "—"}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(biz.status || "active")}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`button-actions-business-${biz.id}`}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Assessment History</DropdownMenuItem>
                                <DropdownMenuItem>Invoices</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
             <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Name / Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_ASSETS.map((asset) => (
                      <TableRow key={asset.id} data-testid={`row-asset-${asset.id}`}>
                        <TableCell className="font-medium">{asset.id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                         <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {asset.location}
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline">{asset.condition}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{asset.value}</TableCell>
                         <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
