import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { Loader2, CheckCircle, XCircle, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationRequest {
    requestId: string;
    businessId: string;
    businessName: string; // Joined from businesses
    registrationNo: string;
    submittedAt: string;
    status: string;
    documentCount: number;
}

export default function VerificationQueuePage() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: requests, isLoading } = useQuery<VerificationRequest[]>({
        queryKey: ["/api/v1/verifications/pending"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/v1/verifications/pending");
            return res.json();
        }
    });

    const verifyMutation = useMutation({
        mutationFn: async ({ id, status, comments }: { id: string, status: 'approved' | 'rejected', comments?: string }) => {
            const res = await apiRequest("POST", `/api/v1/verifications/${id}/verify`, { status, comments });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/verifications/pending"] });
            toast({
                title: "Verification Processed",
                description: "Business status has been updated.",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Action Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const handleVerify = (id: string, status: 'approved' | 'rejected') => {
        verifyMutation.mutate({ id, status, comments: "Processed by admin" });
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Verification Queue</h1>
                            <p className="text-gray-500">Review and approve new business registrations.</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Requests</CardTitle>
                            <CardDescription>Businesses awaiting verification documents check.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                </div>
                            ) : requests?.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-100" />
                                    <p>All caught up! No pending verifications.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Business Name</TableHead>
                                            <TableHead>Registration No.</TableHead>
                                            <TableHead>Submitted Date</TableHead>
                                            <TableHead>Documents</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {requests?.map((req) => (
                                            <TableRow key={req.requestId}>
                                                <TableCell className="font-medium">{req.businessName}</TableCell>
                                                <TableCell>{req.registrationNo}</TableCell>
                                                <TableCell>{format(new Date(req.submittedAt), "MMM d, yyyy")}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2 text-sm text-blue-600 cursor-pointer hover:underline">
                                                        <FileText className="h-4 w-4" />
                                                        <span>{req.documentCount} Files</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 hover:bg-red-50"
                                                        onClick={() => handleVerify(req.requestId, 'rejected')}
                                                        disabled={verifyMutation.isPending}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleVerify(req.requestId, 'approved')}
                                                        disabled={verifyMutation.isPending}
                                                    >
                                                        Approve
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
