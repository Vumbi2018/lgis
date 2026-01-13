import { MainLayout } from "@/components/layout/main-layout";
import { LICENSE_TYPES, LicenseType } from "@/lib/licensing-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, FileText, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function LicensingPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredLicenses = LICENSE_TYPES.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? license.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(LICENSE_TYPES.map(l => l.category)));

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Licensing & Permits</h2>
          <p className="text-muted-foreground">Apply for new licenses or renew existing ones.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            My Applications (3)
           </Button>
           <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
           </Button>
        </div>
      </div>

      {/* Active Applications Section */}
      <div className="mt-8 mb-8">
        <h3 className="text-lg font-semibold mb-4">In Progress</h3>
        <div className="grid gap-4 md:grid-cols-3">
           <Card className="border-l-4 border-l-amber-500">
             <CardHeader className="pb-2">
               <div className="flex justify-between items-start">
                 <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Under Review</Badge>
                 <span className="text-xs text-muted-foreground">Submitted 2 days ago</span>
               </div>
               <CardTitle className="text-base mt-2">Tavern License</CardTitle>
               <CardDescription>REF: LIC-2026-8892</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-sm">
                 <div className="flex justify-between mb-1">
                   <span className="text-muted-foreground">Stage:</span>
                   <span className="font-medium">Inspection Pending</span>
                 </div>
                 <div className="w-full bg-secondary h-2 rounded-full mt-2">
                   <div className="bg-amber-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                 </div>
               </div>
             </CardContent>
             <CardFooter>
               <Button variant="ghost" className="w-full h-8 text-xs">View Status</Button>
             </CardFooter>
           </Card>

           <Card className="border-l-4 border-l-blue-500">
             <CardHeader className="pb-2">
               <div className="flex justify-between items-start">
                 <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Docs Required</Badge>
                 <span className="text-xs text-muted-foreground">Updated 1 week ago</span>
               </div>
               <CardTitle className="text-base mt-2">Food Establishment</CardTitle>
               <CardDescription>REF: LIC-2026-1209</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-sm">
                 <div className="flex justify-between mb-1">
                   <span className="text-muted-foreground">Missing:</span>
                   <span className="font-medium text-destructive">HACCP Cert</span>
                 </div>
                 <div className="w-full bg-secondary h-2 rounded-full mt-2">
                   <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                 </div>
               </div>
             </CardContent>
             <CardFooter>
               <Button variant="ghost" className="w-full h-8 text-xs">Upload Documents</Button>
             </CardFooter>
           </Card>
        </div>
      </div>

      <div className="border-t pt-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search available licenses..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button 
              variant={categoryFilter === null ? "default" : "outline"} 
              onClick={() => setCategoryFilter(null)}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"} 
                onClick={() => setCategoryFilter(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLicenses.map((license) => (
            <Card key={license.id} className="group hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <license.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">{license.category}</Badge>
                </div>
                <CardTitle className="mt-4">{license.name}</CardTitle>
                <CardDescription>
                  Requires {license.formType} & {license.checklist.length} supporting docs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {license.checklist.slice(0, 3).map(item => (
                    <li key={item.id} className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      {item.label}
                    </li>
                  ))}
                  {license.checklist.length > 3 && (
                    <li className="pl-5 opacity-70">+{license.checklist.length - 3} more requirements</li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setLocation(`/licensing/apply/${license.id}`)}
                >
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
