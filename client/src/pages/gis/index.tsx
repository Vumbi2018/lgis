import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Map as MapIcon, Filter } from "lucide-react";
import { MOCK_GIS_POINTS } from "@/lib/mock-data";

export default function GISPage() {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">GIS & Risk Mapping</h2>
          <p className="text-muted-foreground">Geospatial visualization of licenses, inspections, and assets.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
             <Layers className="mr-2 h-4 w-4" />
             Toggle Layers
           </Button>
           <Button>
             <MapIcon className="mr-2 h-4 w-4" />
             Satellite View
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-3 h-full overflow-hidden relative border-0 shadow-md">
           {/* Mock Map Interface */}
           <div className="absolute inset-0 bg-blue-50/50 flex items-center justify-center">
             <div className="absolute inset-0 opacity-20" style={{ 
               backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
               backgroundSize: "20px 20px" 
             }}></div>
             
             {/* Mock Map Points */}
             {MOCK_GIS_POINTS.map((point) => (
               <div 
                 key={point.id} 
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                 style={{ 
                   left: `${(point.lng - 147.14) * 2000}%`, 
                   top: `${(point.lat + 9.47) * -2000}%` 
                 }}
               >
                 <div className={`
                   h-4 w-4 rounded-full border-2 border-white shadow-lg
                   ${point.type === 'Incident' ? 'bg-red-500 animate-pulse' : 
                     point.type === 'Inspection' ? 'bg-amber-500' : 'bg-blue-500'}
                 `}></div>
                 <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                   {point.label}
                 </div>
               </div>
             ))}

             <div className="text-center text-muted-foreground z-0 pointer-events-none">
               <MapIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
               <p className="text-lg font-medium opacity-50">Interactive Map View</p>
               <p className="text-sm opacity-40">Port Moresby District</p>
             </div>
           </div>
        </Card>

        <div className="space-y-4 h-full overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Layers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-secondary/20">
                <span className="text-sm font-medium">Licensing Zones</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">On</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-secondary/20">
                <span className="text-sm font-medium">Inspection Routes</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">On</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-secondary/20">
                <span className="text-sm font-medium">Risk Hotspots</span>
                <Badge variant="destructive">On</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm font-medium text-muted-foreground">Council Assets</span>
                <Badge variant="outline">Off</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                 <span>Active License</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <span>Pending Inspection</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <span>Non-Compliance / Risk</span>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
