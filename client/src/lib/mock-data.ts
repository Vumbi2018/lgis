import { User, Shield, FileText, Users, Building2, CreditCard, LayoutDashboard, Settings, Menu, Bell, Search, LogOut } from "lucide-react";

export const MOCK_COUNCILS = [
  { id: "1", name: "Kampala Capital City Authority", type: "City", district: "Kampala" },
  { id: "2", name: "Gulu City Council", type: "City", district: "Gulu" },
  { id: "3", name: "Entebbe Municipal Council", type: "Municipality", district: "Wakiso" },
  { id: "4", name: "Jinja City Council", type: "City", district: "Jinja" },
];

export const MOCK_USERS = [
  { id: "u1", name: "Sarah K.", role: "Council Admin", email: "admin@kcca.go.ug", avatar: "SK" },
  { id: "u2", name: "John M.", role: "Revenue Officer", email: "revenue@kcca.go.ug", avatar: "JM" },
];

export const MOCK_STATS = [
  { title: "Total Revenue (YTD)", value: "UGX 1.2B", change: "+12%", trend: "up" },
  { title: "Active Licenses", value: "3,450", change: "+5%", trend: "up" },
  { title: "Pending Inspections", value: "45", change: "-2%", trend: "down" },
  { title: "Citizen Requests", value: "128", change: "+8%", trend: "up" },
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
