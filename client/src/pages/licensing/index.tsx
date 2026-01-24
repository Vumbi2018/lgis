import { MainLayout } from "@/components/layout/main-layout";
import { useLicenseTypes } from "@/hooks/use-licenses";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Clock, ArrowRight, Loader2, FileText, ShoppingBag, Wrench, Zap, Factory, Utensils, Pill, Wine, Hotel, Users, Store, Truck, Anchor, Briefcase, Music, Tv, Scissors } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { LicenseDetailsDialog } from "./license-details-dialog";
import { LicenseType } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTenant } from "@/providers/TenantProvider";


// Map text icons to Lucide components
const ICON_MAP: Record<string, any> = {
  "ShoppingBag": ShoppingBag,
  "Tv": Tv,
  "Scissors": Scissors,
  "Music": Music,
  "Wrench": Wrench,
  "Car": Truck,
  "Zap": Zap,
  "Factory": Factory,
  "Utensils": Utensils,
  "Pill": Pill,
  "Wine": Wine,
  "Hotel": Hotel,
  "Users": Users,
  "Store": Store,
  "Truck": Truck,
  "Anchor": Anchor,
  "Briefcase": Briefcase,
};

export default function LicensingPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Dialog state
  const [selectedLicense, setSelectedLicense] = useState<LicenseType | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { data: licenseTypes, isLoading } = useLicenseTypes();
  const tenant = useTenant();
  const councilId = tenant.config.councilId;

  // Fetch user's requests
  const { data: requests, isLoading: loadingRequests } = useQuery({
    queryKey: [`/api/v1/requests?councilId=${councilId}`],
    queryFn: async () => {
      // Explicitly pass the council ID to ensure we get the correct data
      const res = await apiRequest("GET", `/api/v1/requests?councilId=${councilId}`);
      return res.json();
    }
  });


  // Fetch services for name mapping
  const { data: services } = useQuery({
    queryKey: [`/api/v1/services?councilId=${councilId}`],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/v1/services?councilId=${councilId}`);
      return res.json();
    }
  });

  const activeRequests = requests?.filter((r: any) =>
    ['submitted', 'processing', 'inspection', 'approved', 'completed', 'issued', 'rejected'].includes(r.status)
  ) || [];

  const myApplicationsCount = activeRequests.length;

  const filteredLicenses = licenseTypes?.filter(license => {
    const matchesSearch = license.licenseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? license.licenseCategory === categoryFilter : true;
    return matchesSearch && matchesCategory;
  }) || [];

  // Get unique categories
  const categories = Array.from(new Set(licenseTypes?.map(l => l.licenseCategory) || []));

  const getIcon = (license: LicenseType) => {
    // Simple heuristic to map categories/names to icons since we can't store components in DB
    // This could be improved with a dedicated icon field in the DB mapped to string keys
    if (license.licenseCategory === "TRADING") return ShoppingBag;
    if (license.licenseCategory === "LIQUOR") return Wine;
    if (license.licenseCategory === "HEALTH") return Pill;
    if (license.licenseCategory === "INDUSTRIAL") return Factory;

    // Fallback
    return FileText;
  };

  const handleViewDetails = (license: LicenseType) => {
    setSelectedLicense(license);
    setDetailsOpen(true);
  };

  const renderRequestGrid = (requestList: any[], emptyMessage: string) => {
    if (loadingRequests) {
      return (
        <div className="flex gap-4">
          {[1, 2].map(i => (
            <div key={i} className="h-40 w-full md:w-1/3 bg-muted/20 animate-pulse rounded-xl" />
          ))}
        </div>
      );
    }

    if (!requestList || requestList.length === 0) {
      return (
        <div className="text-center py-10 border-2 dashed border-muted rounded-xl bg-muted/5">
          <p className="text-muted-foreground mb-2">{emptyMessage}</p>
          <Button variant="link" size="sm" onClick={() => document.getElementById('search-licenses')?.focus()}>
            Browse Licenses to Apply
          </Button>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-3">
        {requestList.map((request: any) => {
          const service = services?.find((s: any) => s.serviceId === request.serviceId);

          // Calculate Progress
          const progress = request.status === 'submitted' ? 25
            : request.status === 'processing' ? 50
              : request.status === 'inspection' ? 75
                : ['approved', 'completed', 'issued'].includes(request.status) ? 100
                  : 10;

          // Theme Logic
          const isSuccess = ['approved', 'completed', 'issued'].includes(request.status);
          const isRejected = request.status === 'rejected';
          const isSubmitted = request.status === 'submitted';
          const isProcessing = ['processing', 'inspection'].includes(request.status);

          // Colors
          const statusColors = isSuccess
            ? { bg: 'bg-[#0D7A2C]', text: 'text-white', border: 'border-[#0D7A2C]' }
            : isRejected
              ? { bg: 'bg-[#D93025]', text: 'text-white', border: 'border-[#D93025]' }
              : isSubmitted
                ? { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-600' }
                : { bg: 'bg-[#F4C400]', text: 'text-[#0F0F0F]', border: 'border-[#F4C400]' };

          return (
            <Card
              key={request.requestId}
              className={`border-0 border-l-8 shadow-md hover:shadow-xl transition-all cursor-pointer group rounded-xl overflow-hidden bg-white`}
              style={{ borderLeftColor: isSuccess ? '#0D7A2C' : isRejected ? '#D93025' : isSubmitted ? '#2563EB' : '#F4C400' }}
              onClick={() => setLocation(`/licensing/requests/${request.requestId}`)}
            >
              <CardHeader className="pb-3 p-5">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`rounded-md px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none shadow-sm ${statusColors.bg} ${statusColors.text}`}>
                    {request.status}
                  </Badge>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : 'Draft'}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Permit Type:</span>
                  <h3 className="text-lg font-black text-[#0F0F0F] leading-tight group-hover:text-[#F4C400] transition-colors line-clamp-2">
                    {licenseTypes?.find(lt => lt.id === (request.formData as any)?.licenseTypeId)?.licenseName || service?.name || "Service Request"}
                  </h3>
                </div>

                {/* Show Business Name if available */}
                {(request.processingData?.tradingName || request.processingData?.businessName || request.formData?.tradingName || request.formData?.businessName || request.formData?.applicantName) && (
                  <div className="mt-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Company:</span>
                    <p className="text-sm font-bold text-gray-600 line-clamp-1 italic">
                      {request.processingData?.tradingName || request.processingData?.businessName || request.formData?.tradingName || request.formData?.businessName || request.formData?.applicantName}
                    </p>
                  </div>
                )}

                <p className="font-mono text-xs text-gray-400 flex items-center gap-1 mt-2">
                  <FileText className="h-3 w-3" />
                  REF: <span className="text-[#0F0F0F] font-bold">{request.requestRef || request.requestId.substring(0, 8).toUpperCase()}</span>
                </p>
              </CardHeader>

              <CardContent className="p-5 pt-0">
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs items-end">
                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-wider">Application Status</span>
                    <span className="font-black text-[#0F0F0F]">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: isSuccess ? '#0D7A2C' : isRejected ? '#D93025' : isSubmitted ? '#2563EB' : '#F4C400'
                      }}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-0 border-t border-gray-100">
                <div className="w-full flex items-center justify-between p-3 px-5 bg-gray-50 group-hover:bg-[#FFFDF5] transition-colors">
                  <span className="text-xs font-bold text-gray-500 group-hover:text-[#F4C400]">View Details</span>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#F4C400] transform group-hover:translate-x-1 transition-all" />
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="gov-page-header">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight">Licensing & Permits</h1>
          <p className="flex items-center mt-2 text-sm opacity-90">Official Registry for Permits, Trade, and Compliance within the city limits.</p>
        </div>
        <div className="flex gap-3 items-center">
          <Button variant="outline" className="font-medium h-10 rounded-lg backdrop-blur-sm bg-white/50 border-outline-dimmer" onClick={() => document.getElementById('search-licenses')?.focus()}>
            <Clock className="mr-2 h-4 w-4 text-primary" />
            My Applications ({myApplicationsCount})
          </Button>
          <Button
            className="btn-primary font-bold h-10 rounded-lg shadow-sm"
            onClick={() => setLocation('/portal/apply')}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setLocation('/licensing/manage')}>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Applications Tabs */}
      <div className="mb-10">
        <Tabs defaultValue="processing" className="w-full">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-black uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-6 bg-secondary"></div>
              My Applications
            </h3>
            <TabsList className="bg-transparent p-0 h-auto gap-2 flex-wrap justify-end">
              {['all', 'submitted', 'processing', 'approved', 'rejected'].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="bg-transparent border-2 border-[#0F0F0F] text-[#0F0F0F] text-[10px] uppercase font-black px-6 h-10 rounded-lg data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-[#F4C400] data-[state=active]:border-[#0F0F0F] transition-all tracking-widest hover:translate-y-[-1px] hover:shadow-md hover:bg-black/5"
                  style={{ color: 'inherit' }} // Allow data-[state=active] to override
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>


          <TabsContent value="all" className="mt-0">
            {renderRequestGrid(requests || [], "No applications found.")}
          </TabsContent>

          <TabsContent value="submitted" className="mt-0">
            {renderRequestGrid(requests?.filter((r: any) => r.status === 'submitted') || [], "No submitted applications.")}
          </TabsContent>

          <TabsContent value="processing" className="mt-0">
            {renderRequestGrid(requests?.filter((r: any) => ['processing', 'inspection'].includes(r.status)) || [], "No applications in processing.")}
          </TabsContent>

          <TabsContent value="approved" className="mt-0">
            {renderRequestGrid(requests?.filter((r: any) => ['approved', 'completed', 'issued'].includes(r.status)) || [], "No approved licenses.")}
          </TabsContent>

          <TabsContent value="rejected" className="mt-0">
            {renderRequestGrid(requests?.filter((r: any) => r.status === 'rejected') || [], "No rejected applications.")}
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-white rounded-2xl border-none shadow-sm min-h-[400px]">
        <div className="p-4 border-b bg-background-higher rounded-t-2xl flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="search-licenses"
              placeholder="Search catalog by name or permit type..."
              className="pl-10 h-10 border-outline-dimmer focus-visible:ring-primary rounded-xl bg-background-default"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button
              variant={categoryFilter === null ? "default" : "outline"}
              onClick={() => setCategoryFilter(null)}
              className={`whitespace-nowrap rounded-lg h-10 px-6 font-black uppercase text-[10px] tracking-widest transition-all border-2`}
              style={{
                backgroundColor: categoryFilter === null ? '#0F0F0F' : 'transparent',
                color: categoryFilter === null ? '#F4C400' : '#0F0F0F',
                borderColor: '#0F0F0F'
              }}
            >
              All Permits
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                onClick={() => setCategoryFilter(cat)}
                className={`whitespace-nowrap rounded-lg h-10 px-6 font-black uppercase text-[10px] tracking-widest transition-all border-2`}
                style={{
                  backgroundColor: categoryFilter === cat ? '#0F0F0F' : 'transparent',
                  color: categoryFilter === cat ? '#F4C400' : '#0F0F0F',
                  borderColor: '#0F0F0F'
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-secondary" />
              <p className="text-sm font-bold uppercase tracking-widest text-secondary">Loading Permit Catalog</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {filteredLicenses.map((license) => {
                const Icon = getIcon(license);
                return (
                  <Card key={license.id} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col rounded-2xl overflow-hidden bg-background-default ring-1 ring-black/5">
                    <div className="h-2 bg-primary/20 w-full group-hover:bg-primary transition-colors"></div>
                    <CardHeader className="p-6 flex-row items-start justify-between space-y-0">
                      <div className="h-14 w-14 rounded-2xl bg-background-higher flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner border border-outline-dimmer">
                        <Icon className="h-7 w-7" style={{ color: '#F4C400' }} />
                      </div>
                      <Badge className="bg-primary/10 text-primary border-none px-3 py-1 rounded-md text-[9px] uppercase font-black tracking-widest shadow-sm">{license.licenseCategory}</Badge>
                    </CardHeader>
                    <CardContent className="px-6 py-0 flex-1">
                      <CardTitle className="text-sm font-black mb-2 line-clamp-1 uppercase tracking-tight group-hover:text-primary transition-colors font-display text-foreground-default">{license.licenseName}</CardTitle>
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3 font-medium">
                        {license.description || `Official Permit for ${license.licenseName}. Legal authority to operate within NCD.`}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 gap-2 mt-6 flex-row">
                      <Button
                        variant="outline"
                        className="h-10 text-[10px] font-black uppercase flex-1 rounded-lg border-outline-dimmer bg-background-default text-foreground hover:bg-background-higher transition-all font-bold"
                        onClick={() => handleViewDetails(license)}
                      >
                        Requirements
                      </Button>
                      <Button
                        className="h-10 text-[10px] font-black uppercase flex-1 shadow-md active:scale-95"
                        style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}
                        onClick={() => setLocation(`/licensing/apply/${license.id}`)}
                      >
                        Apply <ArrowRight className="ml-2 h-4 w-4" style={{ color: '#F4C400' }} />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}

        </div>
      </div>

      <LicenseDetailsDialog
        license={selectedLicense}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </MainLayout>
  );
}
