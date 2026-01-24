
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Search, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function ProcurementPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: orders = [], isLoading } = useQuery<any[]>({
        queryKey: ["/api/v1/procurement/orders"],
    });

    const filteredOrders = orders.filter(o =>
        (o.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const handleAction = (action: string) => {
        toast({
            title: action,
            description: `Starting ${action.toLowerCase()} process...`,
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <Badge className="bg-green-600">Approved</Badge>;
            case 'draft': return <Badge variant="secondary">Draft</Badge>;
            case 'submitted': return <Badge className="bg-blue-600">Submitted</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">Procurement</h2>
                    <p className="text-muted-foreground">Manage purchase orders and vendor requests.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-black text-yellow-500 hover:bg-black/90" onClick={() => handleAction("New Purchase Order")}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Purchase Order
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Purchase Orders</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Loading orders...</span>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No purchase orders found. Click 'New Purchase Order' to start.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Total Amount (PGK)</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell>{order.orderDate ? format(new Date(order.orderDate), 'dd/MM/yyyy') : '-'}</TableCell>
                                        <TableCell className="font-medium">{order.description || "—"}</TableCell>
                                        <TableCell>K{order.totalAmount}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </MainLayout>
    );
}
