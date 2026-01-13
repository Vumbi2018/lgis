import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Upload, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ConfigurationPage() {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Configuration changes have been applied.",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">System Configuration</h2>
          <p className="text-muted-foreground">Manage organization profile, users, and service rules.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="organization" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="organization">Organization & Tenant</TabsTrigger>
          <TabsTrigger value="services">Service Catalogue</TabsTrigger>
          <TabsTrigger value="workflows">Workflows & Rules</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>Configure details for the current Local Level Government (LLG) or Council.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Council Name</Label>
                  <Input defaultValue="National Capital District Commission" />
                </div>
                <div className="space-y-2">
                  <Label>Organization Type</Label>
                  <Input defaultValue="City Authority" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Jurisdiction District</Label>
                  <Input defaultValue="Port Moresby" />
                </div>
                <div className="space-y-2">
                  <Label>Currency Symbol</Label>
                  <Input defaultValue="PGK (K)" />
                </div>
                <div className="col-span-2 space-y-2">
                   <Label>Contact Address</Label>
                   <Textarea defaultValue="PO Box 7270, Boroko, NCD, Papua New Guinea" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Branding</h3>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 bg-secondary/20 border rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Current Logo</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload New Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                 <div>
                    <CardTitle>Service Catalogue Definitions</CardTitle>
                    <CardDescription>Define available licenses, permits, and fee structures.</CardDescription>
                 </div>
                 <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
              </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                 {[
                   { name: "Trading License", code: "TL-01", fee: "Variable", active: true },
                   { name: "Liquor License", code: "LL-02", fee: "Fixed", active: true },
                   { name: "Building Permit", code: "BP-03", fee: "Variable", active: true },
                 ].map((service, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-xs text-muted-foreground">Code: {service.code} • Fee Model: {service.fee}</div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center space-x-2">
                            <Switch checked={service.active} />
                            <Label className="text-xs">Active</Label>
                         </div>
                         <Button variant="ghost" size="sm">Configure</Button>
                      </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="workflows">
           <Card>
             <CardHeader>
               <CardTitle>Approval Workflows</CardTitle>
               <CardDescription>Configure routing logic for applications and inspections.</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-center py-8 text-muted-foreground">
                 Workflow engine configuration visualization would go here.
                 <br />
                 (Drag-and-drop workflow builder)
               </div>
             </CardContent>
           </Card>
         </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
