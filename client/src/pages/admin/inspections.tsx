import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { Loader2, CheckCircle, XCircle, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function InspectionsPage() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedInspection, setSelectedInspection] = useState<string | null>(null);
    const [result, setResult] = useState<string>("pass");
    const [remarks, setRemarks] = useState<string>("");

    const { data: inspections, isLoading } = useQuery({
        queryKey: ["/api/v1/inspections"],
        queryFn: async () => {
            // Using legacy endpoint mapping for now as it returns joined data likely? 
            // Actually let's use the route we check logic for. 
            // The legacy route returns mapped data, let's use that for convenience if it works
            const res = await apiRequest("GET", "/api/inspections");
            return res.json();
        }
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, result, remarks }: { id: string, result: string, remarks: string }) => {
            const res = await apiRequest("PATCH", `/api/v1/inspections/${id}`, {
                result,
                remarks,
                performedAt: new Date()
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/inspections"] });
            toast({
                title: "Inspection Completed",
                description: "Result has been recorded.",
            });
            setSelectedInspection(null);
        },
        onError: (error: any) => {
            toast({
                title: "Action Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const handleComplete = () => {
        if (selectedInspection) {
            updateMutation.mutate({ id: selectedInspection, result, remarks });
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Inspections</h1>
                            <p className="text-gray-500">Manage scheduled inspections.</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Tasks</CardTitle>
                            <CardDescription>Inspections pending completion.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                </div>
                            ) : inspections?.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-100" />
                                    <p>No inspections found.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Scheduled Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inspections?.map((insp: any) => (
                                            <TableRow key={insp.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                        {insp.location || "N/A"}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                        {insp.scheduledAt ? format(new Date(insp.scheduledAt), "MMM d, yyyy") : "Unscheduled"}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={insp.result ? (insp.result === 'pass' ? 'default' : 'destructive') : 'secondary'}>
                                                        {insp.result ? insp.result.toUpperCase() : 'PENDING'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {!insp.result && (
                                                        <Dialog open={selectedInspection === insp.id} onOpenChange={(open) => !open && setSelectedInspection(null)}>
                                                            <DialogTrigger asChild>
                                                                <Button size="sm" onClick={() => setSelectedInspection(insp.id)}>
                                                                    Record Result
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Complete Inspection</DialogTitle>
                                                                    <DialogDescription>Record the result of the inspection.</DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4 py-4">
                                                                    <div className="space-y-2">
                                                                        <Label>Result</Label>
                                                                        <Select value={result} onValueChange={setResult}>
                                                                            <SelectTrigger>
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="pass">Pass</SelectItem>
                                                                                <SelectItem value="fail">Fail</SelectItem>
                                                                                <SelectItem value="conditional">Conditional Pass</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label>Remarks</Label>
                                                                        <Textarea
                                                                            placeholder="Enter inspection notes..."
                                                                            value={remarks}
                                                                            onChange={(e) => setRemarks(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <Button variant="outline" onClick={() => setSelectedInspection(null)}>Cancel</Button>
                                                                    <Button onClick={handleComplete} disabled={updateMutation.isPending}>
                                                                        {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                        Submit Result
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}
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
