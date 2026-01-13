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
import { Search, Filter, Plus, FileWarning, Gavel, DollarSign, CheckCircle } from "lucide-react";
import { MOCK_PENALTIES } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function EnforcementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPenalties = MOCK_PENALTIES.filter(p => 
    p.entity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueNotice = () => {
    toast({
      title: "Issue Infringement",
      description: "Generating new penalty notice...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return <Badge className="bg-green-600">Paid</Badge>;
      case "Overdue": return <Badge variant="destructive">Overdue</Badge>;
      case "Issued": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Issued</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Enforcement & Penalties</h2>
          <p className="text-muted-foreground">Manage infringements, notices, and legal actions.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="destructive" onClick={handleIssueNotice}>
            <FileWarning className="mr-2 h-4 w-4" />
            Issue Infringement
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PGK 45,500</div>
            <p className="text-xs text-muted-foreground">Overdue penalties</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notices</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Within payment period</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Fines paid on time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Infringement History</CardTitle>
             <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search entity or ID..." 
                    className="pl-9 w-[250px]" 
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
                <TableHead>Notice ID</TableHead>
                <TableHead>Entity / Person</TableHead>
                <TableHead>Infringement Type</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPenalties.map((pen) => (
                <TableRow key={pen.id}>
                  <TableCell className="font-medium">{pen.id}</TableCell>
                  <TableCell>{pen.entity}</TableCell>
                  <TableCell>{pen.type}</TableCell>
                  <TableCell>{pen.date}</TableCell>
                  <TableCell>{pen.dueDate}</TableCell>
                  <TableCell className="text-right font-medium">{pen.amount}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(pen.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
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
