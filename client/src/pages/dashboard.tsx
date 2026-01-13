import { MOCK_STATS } from "@/lib/mock-data";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, Calendar, MapPin, Shield, Store, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 2100 },
  { name: "May", total: 1800 },
  { name: "Jun", total: 2400 },
  { name: "Jul", total: 3200 },
];

const districtData = [
  { name: "Moresby North-West", value: 450 },
  { name: "Moresby North-East", value: 320 },
  { name: "Moresby South", value: 280 },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">Commission Dashboard</h2>
          <p className="text-muted-foreground flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1 text-red-500" />
            National Capital District Overview • FY 2026
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white border-gray-200 hover:bg-yellow-50 hover:text-black">
            <Calendar className="mr-2 h-4 w-4" />
            Today: {new Date().toLocaleDateString()}
          </Button>
          <Button size="sm" className="bg-black text-yellow-500 hover:bg-black/90">Generate Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {MOCK_STATS.map((stat, index) => (
          <Card key={index} className="border-t-4 border-t-yellow-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              {stat.trend === "up" ? (
                <div className="bg-green-100 p-1 rounded-full">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                </div>
              ) : (
                <div className="bg-red-100 p-1 rounded-full">
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.trend === "up" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {stat.change}
                </span>{" "}
                vs previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Collections</CardTitle>
            <CardDescription>
              Monthly revenue across all NCDC divisions (Millions PGK).
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "1px solid #eee", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    itemStyle={{ color: "#000" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#000" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Compliance by Electorate</CardTitle>
            <CardDescription>
              Active licenses per electorate.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} layout="vertical" margin={{ left: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#000" radius={[0, 4, 4, 0]} barSize={30}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500 shadow-sm">
           <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2">
               <AlertTriangle className="h-5 w-5 text-red-500" />
               Critical Alerts
             </CardTitle>
           </CardHeader>
           <CardContent className="pt-2">
             <div className="space-y-4">
               <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md">
                 <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                 <div>
                   <p className="text-sm font-medium text-red-900">License Expired: Vision City Mega Mall</p>
                   <p className="text-xs text-red-700 mt-1">30 days overdue. Enforcement action required.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md">
                 <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                 <div>
                   <p className="text-sm font-medium text-red-900">Health Violation: Boroko Market</p>
                   <p className="text-xs text-red-700 mt-1">Failed inspection. Immediate follow-up.</p>
                 </div>
               </div>
             </div>
           </CardContent>
        </Card>

        <Card className="col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Licensing Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center border border-yellow-200">
                    <Store className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-black">Trading License Issued</p>
                    <p className="text-xs text-muted-foreground">To: Papindo Trading Ltd • Waigani Drive</p>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <span className="text-sm font-bold text-black">PGK 5,000</span>
                    <span className="text-xs text-muted-foreground">{i * 2} hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

// Helper for the chart
import { YAxis } from "recharts";
