import { User, Shield, FileText, Users, Building2, CreditCard, LayoutDashboard, Settings, ClipboardCheck, AlertTriangle, Sliders, MessageSquare, Map as MapIcon, Activity } from "lucide-react";

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
  { title: "Inspections", url: "/inspections", icon: ClipboardCheck },
  { title: "Enforcement", url: "/enforcement", icon: AlertTriangle },
  { title: "Properties", url: "/properties", icon: Building2 },
  { title: "Revenue", url: "/revenue", icon: CreditCard },
  { title: "Public Interaction", url: "/complaints", icon: MessageSquare },
  { title: "GIS & Maps", url: "/gis", icon: MapIcon },
  { title: "Audit Logs", url: "/audit", icon: Activity },
  { title: "Configuration", url: "/configuration", icon: Sliders },
];

export const MOCK_INSPECTIONS = [
  { id: "INS-2025-001", entity: "Papindo Trading", type: "Health & Safety", date: "2025-02-15", inspector: "Officer Kila", status: "Scheduled", risk: "Medium" },
  { id: "INS-2025-002", entity: "City Pharmacy Waigani", type: "License Compliance", date: "2025-02-14", inspector: "Officer John", status: "Completed", result: "Pass", risk: "Low" },
  { id: "INS-2025-003", entity: "Lakeside Hotel", type: "Fire Safety", date: "2025-02-10", inspector: "Officer Kila", status: "Failed", result: "Critical Violations", risk: "High" },
  { id: "INS-2025-004", entity: "Big Rooster Boroko", type: "Food Hygiene", date: "2025-02-16", inspector: "Unassigned", status: "Pending", risk: "High" },
];

export const MOCK_PENALTIES = [
  { id: "INF-2025-88", entity: "Lakeside Hotel", type: "Fire Safety Violation", date: "2025-02-11", amount: "PGK 5,000.00", status: "Issued", dueDate: "2025-03-11" },
  { id: "INF-2025-45", entity: "Small Trade Store", type: "Unlicensed Trading", date: "2025-01-20", amount: "PGK 500.00", status: "Overdue", dueDate: "2025-02-05" },
  { id: "INF-2025-12", entity: "XYZ Transport", type: "Illegal Parking", date: "2025-02-01", amount: "PGK 200.00", status: "Paid", dueDate: "2025-02-15" },
];

export const MOCK_COMPLAINTS = [
  { id: "CASE-101", subject: "Illegal Dumping at Gerehu", category: "Environmental", date: "2025-02-18", priority: "High", status: "New" },
  { id: "CASE-102", subject: "Noise Complaint - Nightclub", category: "Liquor Licensing", date: "2025-02-17", priority: "Medium", status: "In Progress" },
  { id: "CASE-103", subject: "Pothole on Waigani Drive", category: "Infrastructure", date: "2025-02-15", priority: "Low", status: "Resolved" },
];

export const MOCK_ASSETS = [
  { id: "AST-001", name: "Boroko Market Stall A1", type: "Market Facility", location: "Boroko", condition: "Good", value: "PGK 15,000" },
  { id: "AST-002", name: "Konedobu Council Depot", type: "Building", location: "Konedobu", condition: "Fair", value: "PGK 2.5M" },
  { id: "AST-003", name: "Toyota Hilux Fleet #4", type: "Vehicle", location: "City Hall", condition: "Excellent", value: "PGK 120,000" },
];

export const MOCK_AUDIT_LOGS = [
  { id: "LOG-9001", user: "Officer Kila", action: "Approved License", resource: "LIC-2025-001", timestamp: "2025-01-14 10:30:00", ip: "192.168.1.45" },
  { id: "LOG-9002", user: "System", action: "Generated Invoice", resource: "INV-2025-889", timestamp: "2025-01-14 10:35:12", ip: "System" },
  { id: "LOG-9003", user: "Admin", action: "Updated Tariff Rates", resource: "Trading License Class A", timestamp: "2025-01-13 16:20:00", ip: "192.168.1.10" },
  { id: "LOG-9004", user: "Officer John", action: "Failed Login Attempt", resource: "Auth System", timestamp: "2025-01-13 09:15:00", ip: "203.11.44.22" },
];

export const MOCK_GIS_POINTS = [
  { id: "P-001", lat: -9.478, lng: 147.155, type: "License", status: "Active", label: "Papindo Trading" },
  { id: "P-002", lat: -9.482, lng: 147.160, type: "Inspection", status: "Pending", label: "City Pharmacy" },
  { id: "P-003", lat: -9.475, lng: 147.150, type: "Incident", status: "High Risk", label: "Illegal Dumping Site" },
  { id: "P-004", lat: -9.480, lng: 147.165, type: "Asset", status: "Good", label: "Boroko Market" },
];

export const MOCK_INVOICES = [
  { id: "INV-2025-001", recipient: "Steamships Trading", description: "Annual Property Rates 2025", amount: "PGK 25,000.00", date: "2025-01-01", status: "Unpaid" },
  { id: "INV-2025-002", recipient: "John Doe Stores", description: "Trading License Renewal", amount: "PGK 500.00", date: "2025-01-10", status: "Paid" },
  { id: "INV-2025-003", recipient: "Vision City", description: "Waste Collection Fee (Q1)", amount: "PGK 4,500.00", date: "2025-01-12", status: "Unpaid" },
];
