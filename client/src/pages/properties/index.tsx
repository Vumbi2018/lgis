import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Filter, Plus, MapPin, FileText, ArrowRight, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function PropertiesPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: properties = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = properties.filter(p => 
    (p.ownerName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
    (p.suburb?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (p.id?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `Starting ${action.toLowerCase()} process...`,
    });
  };

  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "—";
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-PG', { 
      style: 'currency', 
      currency: 'PGK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(num);
  };

  const getStatusBadge = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "current":
        return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status || "Active"}</Badge>;
    }
  };

  const totalProperties = properties.length;
  const totalRateableValue = properties.reduce((acc, p) => acc + (parseFloat(p.rateableValue) || 0), 0);
  const inactiveProperties = properties.filter(p => p.status?.toLowerCase() === "inactive").length;

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Property Registry</h2>
          <p className="text-muted-foreground">Manage land valuation, rates, and titles.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white hover:bg-yellow-50" onClick={() => handleAction("Generate Rates Notices")} data-testid="button-generate-rates">
            <FileText className="mr-2 h-4 w-4" />
            Generate Rates Notices
           </Button>
           <Button className="bg-black text-yellow-500 hover:bg-black/90" onClick={() => handleAction("New Assessment")} data-testid="button-new-assessment">
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold" data-testid="text-total-value">{formatCurrency(totalRateableValue)}</div>
             <p className="text-xs text-muted-foreground">Total Rateable Value</p>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-yellow-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold" data-testid="text-total-properties">{totalProperties.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">Registered Properties</p>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-red-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold" data-testid="text-inactive-properties">{inactiveProperties}</div>
             <p className="text-xs text-muted-foreground text-red-600">Inactive Properties</p>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Properties List</CardTitle>
            <div className="flex items-center gap-2">
               <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search owner, suburb, or ID..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-properties"
                />
              </div>
              <Button variant="outline" size="icon" data-testid="button-filter-properties">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading properties...</span>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm ? "No properties match your search." : "No properties registered yet. Click 'New Assessment' to add one."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rateable Value (PGK)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((prop) => (
                  <TableRow 
                    key={prop.id} 
                    className="cursor-pointer hover:bg-muted/50" 
                    onClick={() => setLocation(`/properties/${prop.id}`)}
                    data-testid={`row-property-${prop.id}`}
                  >
                    <TableCell className="font-medium font-mono text-xs">{prop.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">Sect {prop.section || "—"} / Lot {prop.lot || "—"}</span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {prop.suburb || prop.district || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{prop.ownerName || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{prop.landType || "Unknown"}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(prop.rateableValue)}</TableCell>
                    <TableCell>
                      {getStatusBadge(prop.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" data-testid={`button-details-property-${prop.id}`}>
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
