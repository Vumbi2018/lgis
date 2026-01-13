import { User, Shield, FileText, Users, Building2, CreditCard, LayoutDashboard, Settings, Menu, Bell, Search, LogOut } from "lucide-react";

export const MOCK_COUNCILS = [
  { id: "1", name: "National Capital District Commission", type: "City", district: "Port Moresby" },
  { id: "2", name: "Lae City Authority", type: "City", district: "Lae" },
  { id: "3", name: "Mt Hagen City Council", type: "City", district: "Mt Hagen" },
];

export const MOCK_USERS = [
  { id: "u1", name: "Officer Kila", role: "Compliance Officer", email: "kila.m@ncdc.gov.pg", avatar: "OK" },
  { id: "u2", name: "Officer John", role: "Revenue Officer", email: "john.d@ncdc.gov.pg", avatar: "JD" },
];

export const MOCK_STATS = [
  { title: "Total Revenue (YTD)", value: "PGK 4.2M", change: "+12%", trend: "up" },
  { title: "Active Licenses", value: "8,450", change: "+5%", trend: "up" },
  { title: "Pending Inspections", value: "145", change: "+12%", trend: "down" },
  { title: "Citizen Requests", value: "328", change: "+8%", trend: "up" },
];


export const NAV_ITEMS = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Registry", url: "/registry", icon: Users },
  { title: "Services", url: "/services", icon: FileText },
  { title: "Licensing", url: "/licensing", icon: Shield },
  { title: "Properties", url: "/properties", icon: Building2 },
  { title: "Revenue", url: "/revenue", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];
