import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Search, Filter, Plus, Building2, MapPin, DollarSign, FileText, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock Data for Properties
const PROPERTIES = [
  { 
    id: "PROP-001", 
    section: "45", 
    lot: "12", 
    suburb: "Boroko", 
    owner: "Steamships Trading Company", 
    type: "Commercial", 
    ucv: "2,500,000", 
    ratesStatus: "Paid", 
    lastPayment: "2025-12-15" 
  },
  { 
    id: "PROP-002", 
    section: "12", 
    lot: "04", 
    suburb: "Waigani", 
    owner: "John Doe", 
    type: "Residential", 
    ucv: "450,000", 
    ratesStatus: "Arrears", 
    lastPayment: "2024-06-10" 
  },
  { 
    id: "PROP-003", 
    section: "88", 
    lot: "01", 
    suburb: "Gordons Industrial", 
    owner: "PNG Motors Ltd", 
    type: "Industrial", 
    ucv: "5,200,000", 
    ratesStatus: "Paid", 
    lastPayment: "2026-01-05" 
  },
  { 
    id: "PROP-004", 
    section: "05", 
    lot: "22", 
    suburb: "Touaguba Hill", 
    owner: "Pacific Palms Property", 
    type: "Residential High Covenant", 
    ucv: "3,800,000", 
    ratesStatus: "Pending", 
    lastPayment: "2025-01-20" 
  },
  { 
    id: "PROP-005", 
    section: "102", 
    lot: "15", 
    suburb: "Gerehu Stage 2", 
    owner: "Sarah K.", 
    type: "Residential", 
    ucv: "350,000", 
    ratesStatus: "Paid", 
    lastPayment: "2025-11-30" 
  },
];

export default function PropertiesPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = PROPERTIES.filter(p => 
    p.owner.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `Starting ${action.toLowerCase()} process...`,
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Property Registry</h2>
          <p className="text-muted-foreground">Manage land valuation, rates, and titles.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white hover:bg-yellow-50" onClick={() => handleAction("Generate Rates Notices")}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Rates Notices
           </Button>
           <Button className="bg-black text-yellow-500 hover:bg-black/90" onClick={() => handleAction("New Assessment")}>
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold">PGK 14.5M</div>
             <p className="text-xs text-muted-foreground">Total Rates Collected (YTD)</p>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-yellow-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold">12,450</div>
             <p className="text-xs text-muted-foreground">Registered Properties</p>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-red-500 shadow-sm">
           <CardContent className="pt-6">
             <div className="text-2xl font-bold">PGK 3.2M</div>
             <p className="text-xs text-muted-foreground text-red-600">Outstanding Arrears</p>
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
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>UCV (PGK)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((prop) => (
                <TableRow key={prop.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setLocation(`/properties/${prop.id}`)}>
                  <TableCell className="font-medium">{prop.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">Sect {prop.section} / Lot {prop.lot}</span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {prop.suburb}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{prop.owner}</TableCell>
                  <TableCell>{prop.type}</TableCell>
                  <TableCell>{prop.ucv}</TableCell>
                  <TableCell>
                    <Badge variant={
                      prop.ratesStatus === "Paid" ? "default" : 
                      prop.ratesStatus === "Arrears" ? "destructive" : "secondary"
                    } className={
                      prop.ratesStatus === "Paid" ? "bg-green-600 hover:bg-green-700" : ""
                    }>
                      {prop.ratesStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
