import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, MapPin, Building2, User, FileText, History, DollarSign, Printer } from "lucide-react";
import { useLocation, useRoute } from "wouter";

export default function PropertyDetailsPage() {
  const [, params] = useRoute("/properties/:id");
  const [, setLocation] = useLocation();
  const id = params?.id || "PROP-001";

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" className="mb-4 pl-0" onClick={() => setLocation("/properties")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Registry
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-black">{id}</h1>
              <Badge className="bg-green-600 hover:bg-green-700">Rates Paid</Badge>
            </div>
            <p className="text-muted-foreground flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-red-500" />
              Section 45, Lot 12, Boroko, NCD
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Statement
            </Button>
            <Button className="bg-black text-yellow-500 hover:bg-black/90">
              <DollarSign className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Registered Owner</dt>
                  <dd className="font-medium text-base">Steamships Trading Company</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Property Type</dt>
                  <dd className="font-medium text-base">Commercial / Retail</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Land Area</dt>
                  <dd className="font-medium text-base">1,250 m²</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Title Reference</dt>
                  <dd className="font-medium text-base">Vol 120 Folio 45</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Unimproved Capital Value (UCV)</dt>
                  <dd className="font-medium text-base">PGK 2,500,000</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-muted-foreground">Annual Rates Payable</dt>
                  <dd className="font-medium text-base">PGK 12,500</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                      <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Receipt #</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3 text-right">Amount (PGK)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4">2025-12-15</td>
                        <td className="px-6 py-4">REC-2025-88992</td>
                        <td className="px-6 py-4">Annual Rates Payment</td>
                        <td className="px-6 py-4 text-right font-medium">12,500.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4">2024-12-10</td>
                        <td className="px-6 py-4">REC-2024-44521</td>
                        <td className="px-6 py-4">Annual Rates Payment</td>
                        <td className="px-6 py-4 text-right font-medium">12,000.00</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Map & Actions */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gray-200 w-full relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Port_Moresby_Skyline.jpg/600px-Port_Moresby_Skyline.jpg" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" size="sm" className="shadow-lg">
                  <MapPin className="mr-2 h-4 w-4" /> View on GIS
                </Button>
              </div>
            </div>
            <CardContent className="pt-4">
               <div className="text-sm space-y-2">
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Electorate:</span>
                   <span className="font-medium">Moresby South</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Ward:</span>
                   <span className="font-medium">Boroko</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Zone:</span>
                   <span className="font-medium">Commercial A</span>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
