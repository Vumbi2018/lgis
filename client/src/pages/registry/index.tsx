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
import { Plus, Search, Filter, MoreHorizontal, MapPin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { MOCK_ASSETS } from "@/lib/mock-data";

const CITIZENS = [
  { id: "CIT-001", name: "Kila Wari", nin: "NID1002345678", location: "Boroko", status: "Active" },
  { id: "CIT-002", name: "Grace Morea", nin: "NID1003456789", location: "Gerehu Stage 2", status: "Active" },
  { id: "CIT-003", name: "James Kora", nin: "NID1004567890", location: "Waigani", status: "Pending" },
  { id: "CIT-004", name: "Mary Arua", nin: "NID1005678901", location: "Tokarara", status: "Active" },
  { id: "CIT-005", name: "John Tau", nin: "NID1006789012", location: "Badili", status: "Suspended" },
];

const BUSINESSES = [
  { id: "BUS-001", name: "Papindo Trading", type: "Retail", tin: "5000234567", location: "Waigani Drive", status: "Compliant" },
  { id: "BUS-002", name: "City Pharmacy Ltd", type: "Medical", tin: "5000234568", location: "Boroko", status: "Compliant" },
  { id: "BUS-003", name: "Lakeside Hotel", type: "Hospitality", tin: "5000234569", location: "Ggaba", status: "Non-Compliant" },
];

export default function RegistryPage() {
  const handleNewRegistration = () => {
    toast({
      title: "Registration Form",
      description: "Opening new registration wizard...",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Registry</h2>
          <p className="text-muted-foreground">Manage citizen and business records.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleNewRegistration}>
            <Plus className="mr-2 h-4 w-4" />
            New Registration
          </Button>
        </div>
      </div>

      <div className="pt-6">
        <Tabs defaultValue="citizens" className="space-y-4">
          <TabsList>
            <TabsTrigger value="citizens">Citizens</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="assets">Assets & Facilities</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Name, ID, or TIN..."
                className="pl-9 w-full md:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <TabsContent value="citizens">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>NID Number</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CITIZENS.map((citizen) => (
                      <TableRow key={citizen.id}>
                        <TableCell className="font-medium">{citizen.id}</TableCell>
                        <TableCell>{citizen.name}</TableCell>
                        <TableCell>{citizen.nin}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {citizen.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={citizen.status === "Active" ? "default" : "secondary"} className={citizen.status === "Active" ? "bg-emerald-600 hover:bg-emerald-700" : ""}>
                            {citizen.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businesses">
             <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>TIN</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BUSINESSES.map((biz) => (
                      <TableRow key={biz.id}>
                        <TableCell className="font-medium">{biz.id}</TableCell>
                        <TableCell>{biz.name}</TableCell>
                        <TableCell>{biz.type}</TableCell>
                        <TableCell>{biz.tin}</TableCell>
                         <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {biz.location}
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant={biz.status === "Compliant" ? "outline" : "destructive"} className={biz.status === "Compliant" ? "border-emerald-500 text-emerald-600" : ""}>
                            {biz.status}
                          </Badge>
                        </TableCell>
                         <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
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
                      <TableRow key={asset.id}>
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
