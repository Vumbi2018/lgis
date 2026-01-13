import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Upload, Plus, Database, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function ConfigurationPage() {
  const [, setLocation] = useLocation();

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
          <Button variant="outline" onClick={() => setLocation("/integrations")}>
            <Database className="mr-2 h-4 w-4" />
            Integrations
          </Button>
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
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        {/* ... (Organization) ... */}

        {/* ... (Services) ... */}

        {/* ... (Workflows) ... */}

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Manage SMS and Email alerts for system events.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                 {[
                   { event: "Application Received", channels: ["Email", "SMS"], active: true },
                   { event: "Payment Confirmation", channels: ["Email", "SMS"], active: true },
                   { event: "Inspection Scheduled", channels: ["Email"], active: true },
                   { event: "License Renewal Reminder", channels: ["Email", "SMS", "WhatsApp"], active: false },
                 ].map((notif, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                      <div>
                        <div className="font-medium">{notif.event}</div>
                        <div className="text-xs text-muted-foreground">Channels: {notif.channels.join(", ")}</div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center space-x-2">
                            <Switch checked={notif.active} />
                            <Label className="text-xs">Active</Label>
                         </div>
                         <Button variant="ghost" size="sm">Edit Template</Button>
                      </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
