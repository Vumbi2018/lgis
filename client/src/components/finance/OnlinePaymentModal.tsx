
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
    DialogDescription
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CreditCard, Smartphone, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OnlinePaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OnlinePaymentModal({ open, onOpenChange }: OnlinePaymentModalProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [method, setMethod] = useState<"credit_card" | "mobile_money">("credit_card");

    // Amount
    const [amount, setAmount] = useState("");

    // Card State
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: ""
    });

    // Mobile State
    const [mobileDetails, setMobileDetails] = useState({
        provider: "DIGICEL",
        phoneNumber: ""
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const payload = {
                amount: amount,
                method: method,
                paymentDetails: method === 'credit_card' ? cardDetails : mobileDetails,
                accountId: "guest-account" // Or derive from logged in user context
            };
            const res = await apiRequest("POST", "/api/v1/payments/online", payload);
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/payments"] });
            queryClient.invalidateQueries({ queryKey: ["/api/v1/stats"] });
            toast({
                title: "Payment Successful",
                description: `Payment of PGK ${amount} processed successfully. Ref: ${data.paymentRef}`,
                className: "border-l-4 border-positive bg-background-default text-foreground-default",
            });
            onOpenChange(false);
            resetForm();
        },
        onError: (error: any) => {
            toast({
                title: "Payment Failed",
                description: error.message || "Transaction declined.",
                variant: "destructive",
            });
        }
    });

    const resetForm = () => {
        setAmount("");
        setCardDetails({ number: "", expiry: "", cvc: "", name: "" });
        setMobileDetails({ provider: "DIGICEL", phoneNumber: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast({ title: "Invalid Amount", description: "Enter a valid amount.", variant: "destructive" });
            return;
        }
        mutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-positive" />
                        Secure Online Payment
                    </DialogTitle>
                    <DialogDescription>
                        Process payments using our secure gateway simulation.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="credit_card" onValueChange={(v) => setMethod(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="credit_card">Credit / Debit Card</TabsTrigger>
                        <TabsTrigger value="mobile_money">Mobile Money</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-sm font-medium">Amount to Pay (PGK)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground font-bold">K</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-7 text-lg font-bold"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <TabsContent value="credit_card" className="space-y-4 mt-0">
                            <Card className="border-dashed bg-muted/20">
                                <CardContent className="pt-4 pb-4 space-y-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Cardholder Name</Label>
                                        <Input
                                            placeholder="Name on Card"
                                            value={cardDetails.name}
                                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                            required={method === 'credit_card'}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Card Number</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="0000 0000 0000 0000"
                                                className="pl-9 font-mono"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                required={method === 'credit_card'}
                                                maxLength={19}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Expiry</Label>
                                            <Input
                                                placeholder="MM/YY"
                                                className="font-mono"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                required={method === 'credit_card'}
                                                maxLength={5}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">CVC</Label>
                                            <Input
                                                placeholder="123"
                                                className="font-mono"
                                                type="password"
                                                maxLength={3}
                                                value={cardDetails.cvc}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                                required={method === 'credit_card'}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground text-center">
                                Simulation: Use any number not ending in '0000'.
                            </p>
                        </TabsContent>

                        <TabsContent value="mobile_money" className="space-y-4 mt-0">
                            <Card className="border-dashed bg-muted/20">
                                <CardContent className="pt-4 pb-4 space-y-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Provider</Label>
                                        <Select
                                            value={mobileDetails.provider}
                                            onValueChange={(val) => setMobileDetails({ ...mobileDetails, provider: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DIGICEL">Digicel Cellmoni</SelectItem>
                                                <SelectItem value="VODAFONE">Vodafone M-Paisa</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Mobile Number</Label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="7XXXXXXX"
                                                className="pl-9 font-mono"
                                                type="tel"
                                                value={mobileDetails.phoneNumber}
                                                onChange={(e) => setMobileDetails({ ...mobileDetails, phoneNumber: e.target.value })}
                                                required={method === 'mobile_money'}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground text-center">
                                Simulation: Use a number with 8+ digits.
                            </p>
                        </TabsContent>

                        <DialogFooter className="mt-4 pt-2">
                            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button className="w-full bg-positive hover:bg-positive/90 font-bold" type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Pay Now
                            </Button>
                        </DialogFooter>
                    </form>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

