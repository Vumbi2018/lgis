import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Car, AlertTriangle, Fuel, Wrench, MapPin, Search, Filter, History } from "lucide-react";

export default function FleetPage() {
    const vehicles = [
        { id: "V-001", type: "Garbage Truck", make: "Isuzu", plate: "LAE 442", status: "Active", driver: "John Doe", fuel: "75%", location: "Boroko" },
        { id: "V-002", type: "Inspection SUV", make: "Toyota", plate: "POM 998", status: "Active", driver: "Jane Smith", fuel: "40%", location: "Waigani" },
        { id: "V-003", type: "Maintenance Van", make: "Ford", plate: "HGN 121", status: "Maintenance", driver: "Mike Ross", fuel: "10%", location: "Workshop" },
        { id: "V-004", type: "Garbage Truck", make: "Isuzu", plate: "LAE 445", status: "Active", driver: "Sam Wilson", fuel: "90%", location: "Gerehu" },
        { id: "V-005", type: "Patrol Car", make: "Toyota", plate: "POM 001", status: "Idle", driver: "N/A", fuel: "100%", location: "HQ" },
    ];

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Fleet Management</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Vehicle tracking, maintenance, and asset utilization.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <History className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        History Logs
                    </Button>
                    <Button className="font-bold border-none shadow-md hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400' }}>
                        <Wrench className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        Schedule Service
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Total Fleet</p>
                            <Car className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">42</div>
                        <p className="text-xs text-black font-medium mt-1">Vehicles registered</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">On Road</p>
                            <Truck className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">28</div>
                        <p className="text-xs text-black font-medium mt-1">Currently active</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">In Maintenance</p>
                            <Wrench className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">4</div>
                        <p className="text-xs text-black font-medium mt-1">Being serviced</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm bg-white border border-gray-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-black uppercase">Fuel Costs</p>
                            <Fuel className="h-4 w-4 text-[#F4C400]" />
                        </div>
                        <div className="text-2xl font-black text-[#F4C400]">K12.5k</div>
                        <p className="text-xs text-black font-medium mt-1">This month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm bg-white border border-gray-100">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-[#F4C400]">Vehicle Registry</CardTitle>
                        <CardDescription className="text-black/70 font-medium">Manage and track fleet assets.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-gray-300">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-500" />
                            <input
                                className="h-8 rounded-md border border-gray-300 pl-8 pr-4 text-sm focus:outline-none focus:border-[#F4C400] w-[200px]"
                                placeholder="Search plate or ID..."
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-bold text-black">Vehicle ID</TableHead>
                                <TableHead className="font-bold text-black">Type</TableHead>
                                <TableHead className="font-bold text-black">Make/Model</TableHead>
                                <TableHead className="font-bold text-black">Status</TableHead>
                                <TableHead className="font-bold text-black">Driver</TableHead>
                                <TableHead className="font-bold text-black">Location</TableHead>
                                <TableHead className="font-bold text-black">Fuel</TableHead>
                                <TableHead className="text-right font-bold text-black">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.map((v) => (
                                <TableRow key={v.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">{v.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {v.type.includes("Truck") ? <Truck className="h-4 w-4 text-gray-400" /> : <Car className="h-4 w-4 text-gray-400" />}
                                            {v.type}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{v.make}</span>
                                            <span className="text-xs text-gray-400">{v.plate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                v.status === 'Active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none' :
                                                    v.status === 'Maintenance' ? 'bg-red-100 text-red-800 hover:bg-red-200 border-none' :
                                                        'bg-gray-100 text-gray-800 hover:bg-gray-200 border-none'
                                            }
                                        >
                                            {v.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{v.driver}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <MapPin className="h-3 w-3" /> {v.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${parseInt(v.fuel) < 20 ? 'bg-red-500' : 'bg-black'}`} style={{ width: v.fuel }} />
                                            </div>
                                            <span className="text-xs font-mono">{v.fuel}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
