import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Search, Filter, Download, DollarSign, TrendingUp, CreditCard, Calendar, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const TRANSACTIONS = [
  { id: "TRX-8892", date: "2026-01-13", payer: "Steamships Trading", type: "Property Rates", amount: "12,500.00", status: "Completed", method: "Bank Transfer" },
  { id: "TRX-8893", date: "2026-01-13", payer: "John Doe", type: "Trading License", amount: "500.00", status: "Completed", method: "Cash" },
  { id: "TRX-8894", date: "2026-01-12", payer: "City Pharmacy", type: "Signage Fee", amount: "2,400.00", status: "Pending", method: "Cheque" },
  { id: "TRX-8895", date: "2026-01-12", payer: "Vision City", type: "Property Rates", amount: "45,000.00", status: "Completed", method: "Bank Transfer" },
  { id: "TRX-8896", date: "2026-01-11", payer: "Gordons Market Vendor", type: "Market Dues", amount: "15.00", status: "Completed", method: "Mobile Money" },
];

const REVENUE_BY_SOURCE = [
  { name: "Property Rates", value: 4500000 },
  { name: "Trading Licenses", value: 1200000 },
  { name: "Market Fees", value: 800000 },
  { name: "Building Permits", value: 650000 },
  { name: "Fines & Penalties", value: 150000 },
];

const MONTHLY_REVENUE = [
  { name: "Jul", amount: 850000 },
  { name: "Aug", amount: 920000 },
  { name: "Sep", amount: 1100000 },
  { name: "Oct", amount: 980000 },
  { name: "Nov", amount: 1250000 },
  { name: "Dec", amount: 1450000 },
];

const COLORS = ["#000000", "#FFD700", "#EF4444", "#3B82F6", "#10B981"];

export default function RevenuePage() {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Revenue Management</h2>
          <p className="text-muted-foreground">Financial overview, billing, and collections.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white hover:bg-yellow-50">
            <Calendar className="mr-2 h-4 w-4" />
            Fiscal Year 2026
           </Button>
           <Button className="bg-black text-yellow-500 hover:bg-black/90">
            <Download className="mr-2 h-4 w-4" />
            Export Report
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="shadow-sm">
           <CardContent className="pt-6">
             <div className="flex items-center justify-between mb-2">
               <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
               <DollarSign className="h-4 w-4 text-green-600" />
             </div>
             <div className="text-2xl font-bold">PGK 4.2M</div>
             <p className="text-xs text-green-600 flex items-center mt-1">
               <TrendingUp className="h-3 w-3 mr-1" /> +12% vs last month
             </p>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="pt-6">
             <div className="flex items-center justify-between mb-2">
               <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
               <FileText className="h-4 w-4 text-red-600" />
             </div>
             <div className="text-2xl font-bold">PGK 1.8M</div>
             <p className="text-xs text-red-600 mt-1">Arrears {'>'} 90 days</p>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="pt-6">
             <div className="flex items-center justify-between mb-2">
               <p className="text-sm font-medium text-muted-foreground">Daily Average</p>
               <ActivityIcon className="h-4 w-4 text-blue-600" />
             </div>
             <div className="text-2xl font-bold">PGK 45K</div>
             <p className="text-xs text-muted-foreground mt-1">Based on last 30 days</p>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="pt-6">
             <div className="flex items-center justify-between mb-2">
               <p className="text-sm font-medium text-muted-foreground">Digital Payments</p>
               <CreditCard className="h-4 w-4 text-yellow-600" />
             </div>
             <div className="text-2xl font-bold">68%</div>
             <p className="text-xs text-muted-foreground mt-1">adoption rate</p>
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly collection performance.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
                  <Tooltip 
                    formatter={(value) => `PGK ${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #eee" }}
                  />
                  <Bar dataKey="amount" fill="#000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Sources Breakdown</CardTitle>
            <CardDescription>Revenue distribution by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={REVENUE_BY_SOURCE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {REVENUE_BY_SOURCE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `PGK ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {REVENUE_BY_SOURCE.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search receipt or payer..." className="pl-9" />
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
                <TableHead>Receipt ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount (PGK)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-medium">{trx.id}</TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.payer}</TableCell>
                  <TableCell>{trx.type}</TableCell>
                  <TableCell>{trx.method}</TableCell>
                  <TableCell className="font-bold">{trx.amount}</TableCell>
                  <TableCell>
                    <Badge variant={trx.status === "Completed" ? "default" : "secondary"} className={trx.status === "Completed" ? "bg-green-600" : ""}>
                      {trx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
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

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
