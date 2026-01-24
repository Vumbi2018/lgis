import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Edit,
    DollarSign,
    Loader2,
    AlertCircle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LicenseType, LicenseTypeFee } from "@shared/schema";

export function LicenseFeeManagement() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedFee, setSelectedFee] = useState<LicenseTypeFee | null>(null);
    const [selectedLicenseTypeId, setSelectedLicenseTypeId] = useState<string | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: licenseTypes = [], isLoading: isLoadingTypes } = useQuery<LicenseType[]>({
        queryKey: ["/api/v1/license-types"],
    });

    const { data: fees = [], isLoading: isLoadingFees } = useQuery<LicenseTypeFee[]>({
        queryKey: ["/api/v1/license-type-fees"],
    });

    if (isLoadingTypes || isLoadingFees) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent-primary-default" />
            </div>
        );
    }

    // Combine data
    const combinedData = licenseTypes.map(lt => {
        const fee = fees.find(f => f.licenseTypeId === lt.id && f.active);
        return {
            ...lt,
            fee: fee
        };
    });

    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-accent-primary-dimmer">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl text-foreground-default">
                                <DollarSign className="h-6 w-6 text-accent-primary-default" />
                                Licence Fee Structure
                            </CardTitle>
                            <CardDescription className="mt-2 text-foreground-dimmer">
                                Define and manage official fees for all license types and permits.
                            </CardDescription>
                        </div>
                        <Button className="btn-primary" onClick={() => setIsAddOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Define New Fee
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border border-outline-dimmer overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-background-higher">
                                    <TableHead className="text-foreground-dimmer font-bold uppercase tracking-widest text-[10px]">License Type</TableHead>
                                    <TableHead className="text-foreground-dimmer font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
                                    <TableHead className="text-foreground-dimmer font-bold uppercase tracking-widest text-[10px]">Current Fee</TableHead>
                                    <TableHead className="text-foreground-dimmer font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                                    <TableHead className="text-right text-foreground-dimmer font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {combinedData.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <TableCell className="font-bold text-foreground-default uppercase text-xs">
                                            {item.licenseName}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-accent-primary-dimmest text-accent-primary-default border-accent-primary-dimmer text-[9px] uppercase font-black">
                                                {item.licenseCategory}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono font-bold text-accent-primary-default">
                                            {item.fee ? `K${Number(item.fee.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : (
                                                <span className="text-foreground-dimmest italic flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    Not Defined
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.fee ? (
                                                <Badge variant="outline" className="bg-positive-dimmest text-positive border-positive-dimmer text-[9px] uppercase font-black">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-background-higher text-foreground-dimmer border-outline-dimmer text-[9px] uppercase font-black">
                                                    Pending
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    if (item.fee) {
                                                        setSelectedFee(item.fee);
                                                        setIsEditOpen(true);
                                                    } else {
                                                        setSelectedLicenseTypeId(item.id);
                                                        setIsAddOpen(true);
                                                    }
                                                }}
                                            >
                                                <Edit className="h-4 w-4 mr-2" />
                                                {item.fee ? "Update" : "Define"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Add Fee Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Define License Fee</DialogTitle>
                        <DialogDescription>
                            Assign a new fee to an existing license type.
                        </DialogDescription>
                    </DialogHeader>
                    <AddFeeForm
                        onClose={() => {
                            setIsAddOpen(false);
                            setSelectedLicenseTypeId(null);
                        }}
                        licenseTypes={licenseTypes}
                        initialLicenseTypeId={selectedLicenseTypeId || undefined}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Fee Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update License Fee</DialogTitle>
                        <DialogDescription>
                            Modify the existing fee for this license type.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedFee && (
                        <EditFeeForm
                            fee={selectedFee}
                            onClose={() => {
                                setIsEditOpen(false);
                                setSelectedFee(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function AddFeeForm({ onClose, licenseTypes, initialLicenseTypeId }: { onClose: () => void; licenseTypes: LicenseType[], initialLicenseTypeId?: string }) {
    const [licenseTypeId, setLicenseTypeId] = useState(initialLicenseTypeId || "");
    const [amount, setAmount] = useState("");
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("POST", "/api/v1/license-type-fees", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/license-type-fees"] });
            toast({ title: "Fee Defined", description: "Successfully assigned fee to license type." });
            onClose();
        }
    });

    const handleSubmit = () => {
        if (!licenseTypeId || !amount) {
            toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
            return;
        }
        mutation.mutate({
            licenseTypeId,
            amount: amount.toString(),
            currency: "PGK"
        });
    };

    return (
        <div className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>License Type</Label>
                <Select value={licenseTypeId} onValueChange={setLicenseTypeId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                        {licenseTypes.map(lt => (
                            <SelectItem key={lt.id} value={lt.id}>{lt.licenseName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Amount (PGK)</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-foreground-dimmer">K</span>
                    <Input
                        className="pl-7"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button className="btn-primary" onClick={handleSubmit} disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Define Fee
                </Button>
            </DialogFooter>
        </div>
    );
}

function EditFeeForm({ onClose, fee }: { onClose: () => void; fee: LicenseTypeFee }) {
    const [amount, setAmount] = useState(fee.amount.toString());
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("PATCH", `/api/v1/license-type-fees/${fee.id}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/license-type-fees"] });
            toast({ title: "Fee Updated", description: "The license fee has been modified." });
            onClose();
        }
    });

    const handleSubmit = () => {
        if (!amount) return;
        mutation.mutate({ amount: amount });
    };

    return (
        <div className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>New Amount (PGK)</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-foreground-dimmer">K</span>
                    <Input
                        className="pl-7"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button className="btn-primary" onClick={handleSubmit} disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Update Fee
                </Button>
            </DialogFooter>
        </div>
    );
}
