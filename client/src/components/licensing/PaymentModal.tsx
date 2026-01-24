
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: any; // Service Request
    service?: any; // Service Definition (for fee)
    licenseFee?: any; // Specific License Type Fee
}

export function PaymentModal({ isOpen, onClose, request, service, licenseFee }: PaymentModalProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [method, setMethod] = useState<string>("cash");
    const [amount, setAmount] = useState<string>(
        licenseFee?.amount?.toString() || service?.baseFee?.toString() || ""
    );
    const [reference, setReference] = useState<string>("");

    // Update amount when fees are loaded
    useEffect(() => {
        if (licenseFee?.amount) {
            setAmount(licenseFee.amount.toString());
        } else if (service?.baseFee) {
            setAmount(service.baseFee.toString());
        }
    }, [licenseFee, service]);

    // Dynamic Fields State
    const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvc: "", name: "" });
    const [mobileDetails, setMobileDetails] = useState({ provider: "", phoneNumber: "" });

    const recordPayment = useMutation({
        mutationFn: async () => {
            if (!amount || isNaN(parseFloat(amount))) {
                throw new Error("Please enter a valid amount");
            }

            const paymentData: any = {
                councilId: request.councilId,
                accountId: request.requesterId || "citizen-account-id",
                paymentRef: request.requestId,
                amount: amount.toString(),
                currency: "PGK",
                method: method,
                paymentDetails: {}
            };

            if (method === "credit_card" || method === "debit_card") {
                paymentData.paymentDetails = cardDetails;
            } else if (method === "mobile_money") {
                paymentData.paymentDetails = mobileDetails;
            } else {
                paymentData.externalReference = reference;
            }

            console.log("[Payment] Submitting:", paymentData);
            const res = await apiRequest("POST", "/api/v1/payments", paymentData);
            const json = await res.json();
            console.log("[Payment] Response:", json);
            return json;
        },
        onSuccess: () => {
            console.log("[Payment] Success, closing modal and refreshing...");
            toast({
                title: "Payment Recorded",
                description: "Payment has been successfully verified and recorded.",
            });
            // Update the cache for everything related to this request
            queryClient.invalidateQueries({ queryKey: [`/api/v1/requests/${request.requestId}`] });
            queryClient.invalidateQueries({ queryKey: ["/api/v1/payments"] }); // Broad invalidate
            queryClient.invalidateQueries({ queryKey: [`/api/v1/requests/${request.requestId}/licence`] });

            onClose();
        },
        onError: (error: any) => {
            console.error("[Payment] Mutation Error:", error);
            toast({
                title: "Payment Failed",
                description: error.message || "Failed to record payment.",
                variant: "destructive",
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        recordPayment.mutate();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                    <DialogDescription>
                        Record or verify a payment for Request: {request?.requestRef || request?.requestId}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (PGK)</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="method">Payment Method</Label>
                            <Select value={method} onValueChange={setMethod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="cheque">Cheque</SelectItem>
                                    <SelectItem value="eftpos">EFTPOS</SelectItem>
                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                                    <SelectItem value="mobile_money">Mobile Money</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Dynamic Fields */}
                    {(method === "cash" || method === "cheque" || method === "bank_transfer") && (
                        <div className="space-y-2">
                            <Label htmlFor="ref">Reference Number</Label>
                            <Input
                                id="ref"
                                placeholder="Receipt No / Cheque No"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {method === "mobile_money" && (
                        <div className="space-y-4 border p-4 rounded-md bg-slate-50">
                            <h4 className="text-sm font-medium">Mobile Money Details</h4>
                            <div className="space-y-2">
                                <Label>Provider</Label>
                                <Select
                                    value={mobileDetails.provider}
                                    onValueChange={(val) => setMobileDetails({ ...mobileDetails, provider: val })}
                                >
                                    <SelectTrigger><SelectValue placeholder="Select Provider" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DIGICEL">Digicel CellMoni</SelectItem>
                                        <SelectItem value="VODAFONE">Vodafone M-Paisa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input
                                    placeholder="e.g. 70000000"
                                    value={mobileDetails.phoneNumber}
                                    onChange={(e) => setMobileDetails({ ...mobileDetails, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {(method === "credit_card" || method === "debit_card") && (
                        <div className="space-y-4 border p-4 rounded-md bg-slate-50">
                            <h4 className="text-sm font-medium">Card Details</h4>
                            <div className="space-y-2">
                                <Label>Cardholder Name</Label>
                                <Input
                                    placeholder="Name on Card"
                                    value={cardDetails.name}
                                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Card Number</Label>
                                <Input
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    value={cardDetails.number}
                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Expiry</Label>
                                    <Input
                                        placeholder="MM/YY"
                                        value={cardDetails.expiry}
                                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>CVC</Label>
                                    <Input
                                        placeholder="123"
                                        value={cardDetails.cvc}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={recordPayment.isPending}>
                            {recordPayment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {method === "cash" ? "Record Payment" : "Verify & Pay"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
