import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, CheckCircle, XCircle, RefreshCw, Database } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const INTEGRATIONS = [
  { 
    id: 1, 
    name: "National ID System (NID)", 
    type: "Identity Provider", 
    status: "Connected", 
    lastSync: "10 mins ago",
    description: "Verifies citizen identities against national database."
  },
  { 
    id: 2, 
    name: "IPA Business Registry", 
    type: "Business Registry", 
    status: "Connected", 
    lastSync: "1 hour ago",
    description: "Syncs business registration details from IPA."
  },
  { 
    id: 3, 
    name: "IFMIS / Treasury", 
    type: "Financial System", 
    status: "Error", 
    lastSync: "2 days ago",
    description: "Financial reporting and reconciliation with Treasury."
  },
  { 
    id: 4, 
    name: "IRC Tax Systems", 
    type: "Tax Authority", 
    status: "Disconnected", 
    lastSync: "Never",
    description: "Tax Identification Number (TIN) validation."
  },
  { 
    id: 5, 
    name: "Bank of South Pacific (BSP)", 
    type: "Payment Gateway", 
    status: "Connected", 
    lastSync: "Real-time",
    description: "Online payment processing."
  },
];

export default function IntegrationsPage() {
  const handleSync = (name: string) => {
    toast({
      title: "Sync Initiated",
      description: `Synchronizing data with ${name}...`,
    });
  };

  return (
    <MainLayout>
       <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">System Integrations</h2>
          <p className="text-muted-foreground">Manage connections with external national and financial systems.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline">
             <Database className="mr-2 h-4 w-4" />
             Connection Logs
           </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {INTEGRATIONS.map((integration) => (
          <Card key={integration.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
             <div className="flex items-start gap-4">
               <div className={`p-3 rounded-full ${integration.status === 'Connected' ? 'bg-green-100' : integration.status === 'Error' ? 'bg-red-100' : 'bg-gray-100'}`}>
                 <Database className={`h-6 w-6 ${integration.status === 'Connected' ? 'text-green-600' : integration.status === 'Error' ? 'text-red-600' : 'text-gray-500'}`} />
               </div>
               <div>
                 <div className="flex items-center gap-2">
                   <h3 className="text-lg font-semibold">{integration.name}</h3>
                   <Badge variant={integration.status === 'Connected' ? 'default' : integration.status === 'Error' ? 'destructive' : 'outline'} 
                          className={integration.status === 'Connected' ? 'bg-green-600' : ''}>
                     {integration.status}
                   </Badge>
                 </div>
                 <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                 <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                   <span>Type: {integration.type}</span>
                   <span>Last Sync: {integration.lastSync}</span>
                 </div>
               </div>
             </div>
             
             <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
               <div className="flex items-center space-x-2">
                 <Switch checked={integration.status === 'Connected' || integration.status === 'Error'} />
                 <span className="text-sm text-muted-foreground">Enabled</span>
               </div>
               <Button variant="outline" size="sm" onClick={() => handleSync(integration.name)}>
                 <RefreshCw className="mr-2 h-4 w-4" /> Sync Now
               </Button>
               <Button variant="ghost" size="icon">
                 <ArrowUpRight className="h-4 w-4" />
               </Button>
             </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
