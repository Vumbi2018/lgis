import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MobileLayout } from "../MobileLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Calendar, Building2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ApprovalDetail() {
    const { id } = useParams<{ id: string }>();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [comments, setComments] = useState("");

    const { data: request, isLoading } = useQuery<any>({
        queryKey: [`/api/service-requests/${id}`],
    });

    const updateMutation = useMutation({
        mutationFn: async ({ status, comments }: { status: string; comments: string }) => {
            const response = await fetch(`/api/service-requests/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    processingData: {
                        ...request?.processingData,
                        managerComments: comments,
                        reviewedAt: new Date().toISOString()
                    }
                }),
            });
            if (!response.ok) throw new Error('Failed to update');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/service-requests'] });
            toast({ title: "Request updated successfully!" });
            setLocation('/mobile/manager/approvals');
        },
    });

    const handleApprove = () => {
        updateMutation.mutate({ status: 'approved', comments });
    };

    const handleReject = () => {
        if (!comments.trim()) {
            toast({ title: "Please provide rejection reason", variant: "destructive" });
            return;
        }
        updateMutation.mutate({ status: 'rejected', comments });
    };

    if (isLoading) {
        return (
            <MobileLayout title="Loading..." userRole="manager" showBack>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title="Application Details" userRole="manager" showBack>
            <div className="space-y-4">
                {/* Request Header */}
                <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h2 className="font-bold text-lg mb-1">
                                {request?.requestRef || `REQ-${id?.slice(-6)}`}
                            </h2>
                            <Badge className="bg-yellow-100 text-yellow-800">
                                {request?.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        {request?.formData?.businessName && (
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">{request.formData.businessName}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {new Date(request?.submittedAt).toLocaleDateString()}</span>
                        </div>

                        {request?.formData?.licenseType && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <FileText className="h-4 w-4" />
                                <span>Type: {request.formData.licenseType}</span>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Application Details */}
                <Card className="p-4">
                    <h3 className="font-semibold mb-3">Application Information</h3>
                    <div className="space-y-2 text-sm">
                        {Object.entries(request?.formData || {}).map(([key, value]) => (
                            <div key={key} className="flex">
                                <span className="text-gray-600 w-1/3">{key}:</span>
                                <span className="font-medium w-2/3">{String(value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Comments */}
                <Card className="p-4">
                    <h3 className="font-semibold mb-3">Comments</h3>
                    <Textarea
                        placeholder="Add your review comments..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={4}
                    />
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        onClick={handleReject}
                        variant="outline"
                        className="h-14 border-2 border-red-500 text-red-500 hover:bg-red-50"
                        disabled={updateMutation.isPending}
                    >
                        <X className="h-5 w-5 mr-2" />
                        Reject
                    </Button>
                    <Button
                        onClick={handleApprove}
                        className="h-14 bg-green-600 hover:bg-green-700"
                        disabled={updateMutation.isPending}
                    >
                        <Check className="h-5 w-5 mr-2" />
                        Approve
                    </Button>
                </div>
            </div>
        </MobileLayout>
    );
}
