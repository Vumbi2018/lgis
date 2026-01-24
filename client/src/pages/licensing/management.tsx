
import { useState } from "react";
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
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Eye, ArrowUpDown, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function ApplicationManagementPage() {
    const [, setLocation] = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>("all");

    const { data: requests, isLoading } = useQuery({
        queryKey: ["/api/v1/requests"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/v1/requests");
            return res.json();
        }
    });

    const { data: services } = useQuery({
        queryKey: ["/api/v1/services"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/v1/services");
            return res.json();
        }
    });

    // Filter requests
    const filteredRequests = requests?.filter((r: any) => {
        const matchesSearch = r.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.status.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" ? true : r.status === statusFilter;

        return matchesSearch && matchesStatus;
    }) || [];

    const getServiceName = (serviceId: string) => {
        return services?.find((s: any) => s.serviceId === serviceId)?.name || "Unknown Service";
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'submitted': return <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>;
            case 'processing': return <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Reviewing</Badge>;
            case 'approved': return <Badge className="bg-emerald-600 hover:bg-emerald-700">Approved</Badge>;
            case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
            case 'draft': return <Badge variant="outline">Draft</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center bg-[#0F0F0F] p-6 rounded-2xl shadow-sm border border-[#F4C400]">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight uppercase text-gold">Application Management</h2>
                        <p className="text-gold font-medium opacity-90">Review and process license applications.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search applications..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Select value={statusFilter || "all"} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="submitted">Submitted</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Reference</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Applicant</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10">
                                                Loading applications...
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                                No applications found matching your criteria.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRequests.map((request: any) => (
                                            <TableRow key={request.requestId} className="cursor-pointer hover:bg-muted/50" onClick={() => setLocation(`/licensing/requests/${request.requestId}`)}>
                                                <TableCell className="font-mono font-medium">
                                                    {request.requestRef || request.requestId.substring(0, 8).toUpperCase()}
                                                </TableCell>
                                                <TableCell>
                                                    {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : '-'}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {getServiceName(request.serviceId)}
                                                </TableCell>
                                                <TableCell>
                                                    {request.formData?.businessName || request.formData?.applicantName || request.requesterId}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(request.status)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLocation(`/licensing/requests/${request.requestId}`);
                                                    }}>
                                                        Review <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
