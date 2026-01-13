import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Building, Store, Car, ArrowRight } from "lucide-react";

const SERVICES = [
  { id: 1, title: "Trading License", category: "Business", fee: "Variable", icon: Store, description: "Apply for or renew annual trading license for retail and wholesale businesses." },
  { id: 2, title: "Property Rates", category: "Land", fee: "Percentage", icon: Building, description: "Assessment and payment of property rates for commercial and residential buildings." },
  { id: 3, title: "Market Dues", category: "Market", fee: "UGX 5,000", icon: Store, description: "Daily or monthly market stall dues payment." },
  { id: 4, title: "Building Permit", category: "Planning", fee: "Variable", icon: FileText, description: "Request for approval of new building plans or renovations." },
  { id: 5, title: "Parking Fees", category: "Transport", fee: "UGX 2,000/hr", icon: Car, description: "Street parking payments and monthly stickers." },
  { id: 6, title: "Birth Certificate", category: "Civil", fee: "UGX 10,000", icon: FileText, description: "Registration of birth and issuance of short birth certificate." },
];

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Service Catalogue</h2>
          <p className="text-muted-foreground">Browse and manage available council services.</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-6 pb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Find a service..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Card key={service.id} className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <div className="flex justify-between items-start">
                 <CardTitle className="text-xl">{service.title}</CardTitle>
                 <Badge variant="outline">{service.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-muted-foreground">
                Base Fee: <span className="text-foreground">{service.fee}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                Configure Service <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
