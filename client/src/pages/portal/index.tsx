import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useOrganization } from "@/contexts/organization-context";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Building2, User, FileText } from "lucide-react";

export default function PortalDashboard() {
    const { currentOrganization } = useOrganization();

    // Fetch businesses owned by the current user
    const { data: businesses, isLoading } = useQuery({
        queryKey: ["/api/v1/businesses/my"],
        queryFn: async () => {
            // Stub for now, we'll need a route to get businesses by owner
            // For now, let's just use the main list or implement a filtered route
            const res = await apiRequest("GET", `/api/v1/businesses`);
            // In a real implementation, we'd filter by user on the backend or have a /my-businesses endpoint
            return res.json();
        },
        enabled: !!currentOrganization
    });

    // Fetch service requests
    const { data: requests } = useQuery({
        queryKey: ["/api/v1/requests"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/v1/requests");
            return res.json();
        }
    });

    // Filter requests for my businesses
    const myRequests = requests?.filter((r: any) =>
        businesses?.some((b: any) => b.businessId === r.requesterId)
    );

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Business Portal</h1>
                            <p className="text-gray-500">Manage your businesses and license applications.</p>
                        </div>
                        <Link href="/portal/register-business">
                            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                                <Plus className="mr-2 h-4 w-4" />
                                Register New Business
                            </Button>
                        </Link>
                        <Link href="/portal/apply">
                            <Button variant="outline" className="ml-2">
                                <FileText className="h-4 w-4 mr-2" />
                                Apply for License
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Summary Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                    <CardDescription>Your account activity summary.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Verified Businesses</span>
                                        <span className="text-xl font-bold">{(businesses || []).filter((b: any) => b.status === 'verified').length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Pending Verifications</span>
                                        <span className="text-xl font-bold text-yellow-600">{(businesses || []).filter((b: any) => b.status === 'pending_verification').length}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Business List */}
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>My Businesses</CardTitle>
                                    <CardDescription>List of businesses registered under your account.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {businesses?.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <Building2 className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                            <p>No businesses registered yet.</p>
                                            <Link href="/portal/register-business">
                                                <Button variant="link" className="text-yellow-600">Register your first business</Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {businesses?.map((business: any) => (
                                                <div key={business.businessId} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="bg-gray-100 p-2 rounded">
                                                            <Building2 className="h-6 w-6 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{business.legalName}</h3>
                                                            <p className="text-sm text-gray-500">{business.tradingName || business.businessType}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${business.status === 'verified' ? 'bg-green-100 text-green-700' :
                                                            business.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {business.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                        <Button variant="outline" size="sm">Manage</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
