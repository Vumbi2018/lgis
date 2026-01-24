
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
import { Search, Filter, Plus, FileText, Loader2, Box } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function AssetsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: assets = [], isLoading } = useQuery<any[]>({
        queryKey: ["/api/v1/assets"],
    });

    const filteredAssets = assets.filter(a =>
        (a.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (a.assetNo?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const handleAction = (action: string) => {
        toast({
            title: action,
            description: `Starting ${action.toLowerCase()} process...`,
        });
    };

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">Asset Management</h2>
                    <p className="text-muted-foreground">Track council assets, equipment, and facilities.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-black text-yellow-500 hover:bg-black/90" onClick={() => handleAction("Add Asset")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Asset
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Assets List</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search assets..."
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
                            <span className="ml-2">Loading assets...</span>
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No assets found. Click 'Add Asset' to register one.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Asset No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAssets.map((asset) => (
                                    <TableRow key={asset.assetId}>
                                        <TableCell className="font-mono">{asset.assetNo}</TableCell>
                                        <TableCell className="font-medium">{asset.name}</TableCell>
                                        <TableCell>{asset.type}</TableCell>
                                        <TableCell>{asset.location || "—"}</TableCell>
                                        <TableCell><Badge variant="outline">{asset.condition || "Unknown"}</Badge></TableCell>
                                        <TableCell>{asset.value || "—"}</TableCell>
                                        <TableCell><Badge>{asset.status}</Badge></TableCell>
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
