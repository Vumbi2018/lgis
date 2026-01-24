import { MOCK_STATS } from "@/lib/mock-data";
import { MainLayout } from "@/components/layout/main-layout";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
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
      <WelcomeBanner />
      <div className="flex-1 w-full flex flex-col overflow-hidden max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="gov-page-header">
          <div>
            <h1 className="text-3xl font-bold tracking-tight uppercase">Commission Dashboard</h1>
            <p className="flex items-center mt-2 text-sm opacity-90">
              <MapPin className="h-4 w-4 mr-1" />
              National Capital District Overview • FY 2026
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="font-bold border-2 border-[#F4C400] bg-[#0F0F0F] text-[#F4C400] hover:bg-black/80">
              <Calendar className="mr-2 h-4 w-4" />
              Today: {new Date().toLocaleDateString()}
            </Button>
            <Button size="sm" className="bg-[#F4C400] text-black font-black hover:bg-[#D4A000] shadow-lg">
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {MOCK_STATS.map((stat, index) => (
          <Card key={index} className="border-2 border-card-border shadow-md hover:shadow-lg transition-all duration-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-foreground-dimmer">{stat.title}</CardTitle>
              {stat.trend === "up" ? (
                <div className="p-1.5 rounded-full bg-accent-positive-dimmest">
                  <ArrowUpRight className="h-4 w-4 text-positive" />
                </div>
              ) : (
                <div className="p-1.5 rounded-full bg-accent-negative-dimmest">
                  <ArrowDownRight className="h-4 w-4 text-negative" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground-default">{stat.value}</div>
              <p className="text-xs mt-2 text-foreground-dimmer">
                <span className={stat.trend === "up" ? "text-positive font-semibold" : "text-negative font-semibold"}>
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
                      <stop offset="5%" stopColor="var(--accent-primary-default)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-primary-default)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--foreground-dimmest)" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-dimmest)" />
                  <Tooltip
                    contentStyle={{ borderRadius: "var(--border-radius-8)", border: "1px solid var(--outline-dimmer)", backgroundColor: 'var(--background-default)', color: 'var(--foreground-default)', boxShadow: "var(--shadow-lg)" }}
                    itemStyle={{ color: "var(--foreground-default)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="var(--accent-primary-default)"
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
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: 'var(--foreground-dimmer)' }} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="var(--accent-primary-default)" radius={[0, 4, 4, 0]} barSize={30}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 shadow-sm border-l-accent-negative-default">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-foreground-default">
              <AlertTriangle className="h-5 w-5 text-negative" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-md bg-accent-negative-dimmest">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent-negative-default" />
                <div>
                  <p className="text-sm font-medium text-foreground-default">License Expired: Vision City Mega Mall</p>
                  <p className="text-xs mt-1 text-foreground-dimmer">30 days overdue. Enforcement action required.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-md bg-accent-negative-dimmest">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent-negative-default" />
                <div>
                  <p className="text-sm font-medium text-foreground-default">Health Violation: Boroko Market</p>
                  <p className="text-xs mt-1 text-foreground-dimmer">Failed inspection. Immediate follow-up.</p>
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
                  <div className="h-10 w-10 rounded-full flex items-center justify-center border bg-background-higher border-outline-dimmer">
                    <Store className="h-5 w-5 text-accent-primary-default" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground-default">Trading License Issued</p>
                    <p className="text-xs text-foreground-dimmer">To: Papindo Trading Ltd • Waigani Drive</p>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <span className="text-sm font-bold text-foreground-default">PGK 5,000</span>
                    <span className="text-xs text-foreground-dimmer">{i * 2} hours ago</span>
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
