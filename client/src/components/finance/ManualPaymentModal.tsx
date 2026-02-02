
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ManualPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

import { useQuery } from "@tanstack/react-query";

export function ManualPaymentModal({ open, onOpenChange }: ManualPaymentModalProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [serviceType, setServiceType] = useState("");
    const [formData, setFormData] = useState({
        amount: "",
        payer: "",
        method: "cash",
        reference: "",
        description: "Counter Payment"
    });

    const { data: requests } = useQuery({
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

    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const res = await apiRequest("POST", "/api/v1/payments/manual", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/payments"] });
            queryClient.invalidateQueries({ queryKey: ["/api/v1/stats"] }); // Update dashboard revenue too
            toast({
                title: "Payment Recorded",
                description: `Successfully recorded PGK ${formData.amount}`,
                className: "border-l-4 border-positive bg-background-default text-foreground-default",
            });
            onOpenChange(false);
            setServiceType("");
            setFormData({
                amount: "",
                payer: "",
                method: "cash",
                reference: "",
                description: "Counter Payment"
            });
        },
        onError: (error: any) => {
            toast({
                title: "Error Recording Payment",
                description: error.message || "Failed to save payment.",
                variant: "destructive",
            });
        }
    });

    const handleRequestSelect = (requestId: string) => {
        const req = requests?.find((r: any) => r.requestId === requestId);
        if (req) {
            const formData = req.formData || {};
            // Extract business name with fallbacks
            const businessName = formData.tradingName || formData.applicantName || formData.companyName || formData.businessName || "Unknown Payer";

            // Map service ID to name
            const service = services?.find((s: any) => s.id === req.serviceId);
            const sType = service?.name || req.serviceType || "General Service";

            setServiceType(sType);
            setFormData({
                ...formData,
                payer: businessName,
                reference: req.requestId, // Link using Request ID
                description: `Payment for ${sType} (${businessName})`
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || isNaN(Number(formData.amount))) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid amount.",
                variant: "destructive",
            });
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label>Link to Application (Optional)</Label>
                        <Select onValueChange={handleRequestSelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select pending application..." />
                            </SelectTrigger>
                            <SelectContent>
                                {requests?.map((req: any) => {
                                    const formData = req.formData || {};
                                    const businessName = formData.tradingName || formData.applicantName || formData.companyName || formData.businessName || "Unnamed";
                                    const service = services?.find((s: any) => s.id === req.serviceId);
                                    const sType = service?.name || req.serviceType || "Service";
                                    return (
                                        <SelectItem key={req.requestId} value={req.requestId}>
                                            {businessName} - {sType}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Input
                            id="serviceType"
                            value={serviceType}
                            placeholder="General / Counter"
                            readOnly
                            className="bg-accent-neutral-dimmest/50"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount (PGK)</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="payer">Payer Name</Label>
                        <Input
                            id="payer"
                            placeholder="Enter payer name"
                            value={formData.payer}
                            onChange={(e) => setFormData({ ...formData, payer: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <Select
                            value={formData.method}
                            onValueChange={(val) => setFormData({ ...formData, method: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="eftpos">EFTPOS</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                                <SelectItem value="bank_transfer">Direct Deposit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="reference">Reference / Receipt No.</Label>
                        <Input
                            id="reference"
                            placeholder="e.g. RCP-12345"
                            value={formData.reference}
                            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Record Payment
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
