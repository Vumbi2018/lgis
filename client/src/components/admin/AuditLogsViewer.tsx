import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search, Eye, Filter, Shield, Activity, Clock, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuditLog {
    id: string;
    timestamp: string;
    action: string;
    actor: string;
    module: string;
    severity: "low" | "medium" | "high" | "critical";
    description: string;
}

export function AuditLogsViewer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [severityFilter, setSeverityFilter] = useState("all");

    const logs: AuditLog[] = [
        { id: "1", timestamp: "2026-01-26 05:30:12", action: "REQUIREMENT_UPDATE", actor: "admin_user", module: "Licensing", severity: "high", description: "Updated health certificate requirements for Trading licenses" },
        { id: "2", timestamp: "2026-01-26 05:15:45", action: "ROLE_PERMISSION_CHANGE", actor: "security_officer", module: "Security", severity: "critical", description: "Added 'delete' permission to Ward Manager role" },
        { id: "3", timestamp: "2026-01-26 04:50:22", action: "PROFILE_EDIT", actor: "j.doe", module: "Registry", severity: "low", description: "Modified contact address for citizen record #4592" },
        { id: "4", timestamp: "2026-01-26 04:10:05", action: "AUTH_LOGIN_FAIL", actor: "unknown", module: "Auth", severity: "medium", description: "Multiple failed login attempts detected from IP 192.168.1.45" },
        { id: "5", timestamp: "2026-01-26 03:45:30", action: "TENANT_CONFIG_UPDATE", actor: "super_admin", module: "Administration", severity: "high", description: "Changed system-wide session timeout to 30 minutes" },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             log.action.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
        return matchesSearch && matchesSeverity;
    });

    const getSeverityBadge = (severity: string) => {
        const variants = {
            low: "bg-slate-100 text-slate-700 border-slate-200",
            medium: "bg-blue-100 text-blue-700 border-blue-200",
            high: "bg-orange-100 text-orange-700 border-orange-200",
            critical: "bg-red-100 text-red-700 border-red-200 animate-pulse"
        };
        return variants[severity as keyof typeof variants] || variants.low;
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-none ring-1 ring-black/5">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-500" />
                                Security Audit Logs
                            </CardTitle>
                            <CardDescription>Comprehensive activity tracking and compliance reporting</CardDescription>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-black transition-colors" />
                            <Input 
                                placeholder="Search by description, actor, or action..." 
                                className="pl-10 h-10 border-outline-dimmer bg-background-higher"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-[200px]">
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="h-10 border-outline-dimmer bg-background-higher">
                                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="All Severities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severities</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-background-higher hover:bg-background-higher border-none">
                                <TableHead className="w-[180px] text-[10px] font-black uppercase">Timestamp</TableHead>
                                <TableHead className="text-[10px] font-black uppercase">Action / Module</TableHead>
                                <TableHead className="text-[10px] font-black uppercase">Actor</TableHead>
                                <TableHead className="text-[10px] font-black uppercase">Severity</TableHead>
                                <TableHead className="text-[10px] font-black uppercase">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map((log) => (
                                <TableRow key={log.id} className="border-b last:border-0 hover:bg-black/5 group transition-colors">
                                    <TableCell className="font-mono text-[11px] text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" />
                                            {log.timestamp}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-0.5">
                                            <div className="text-xs font-bold text-foreground-default">{log.action}</div>
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{log.module}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                                {log.actor.charAt(0).toUpperCase()}
                                            </div>
                                            {log.actor}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getSeverityBadge(log.severity)}>
                                            {log.severity.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-foreground-dimmer group-hover:text-black transition-colors">
                                        {log.description}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredLogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 opacity-50 italic text-sm">
                                        No audit logs found matching your criteria
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
