import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Building, Store, Car, ArrowRight, Plus, Pencil, Trash2, Loader2, MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Service {
  serviceId: string;
  councilId: string;
  code: string;
  name: string;
  category: string;
  description: string;
  requiresInspection: boolean;
  requiresApproval: boolean;
  active: boolean;
}

const serviceSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  requiresInspection: z.boolean().default(false),
  requiresApproval: z.boolean().default(true),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/v1/services"],
  });

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      code: "",
      name: "",
      category: "",
      description: "",
      requiresInspection: false,
      requiresApproval: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      // In a real app the councilId would come from auth context
      const payload = { ...data, councilId: "123e4567-e89b-12d3-a456-426614174000" };
      const res = await apiRequest("POST", "/api/v1/services", payload);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/services"] });
      toast({ title: "Success", description: "Service created successfully" });
      setIsCreateOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      if (!editingService) throw new Error("No service selected for update");
      const res = await apiRequest("PATCH", `/api/v1/services/${editingService.serviceId}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/services"] });
      toast({ title: "Success", description: "Service updated successfully" });
      setEditingService(null);
      setIsCreateOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      await apiRequest("DELETE", `/api/v1/services/${serviceId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/services"] });
      toast({ title: "Success", description: "Service deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const onSubmit = (data: ServiceFormData) => {
    if (editingService) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(serviceId);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.reset({
      code: service.code,
      name: service.name,
      category: service.category,
      description: service.description || "",
      requiresInspection: service.requiresInspection,
      requiresApproval: service.requiresApproval,
    });
    setIsCreateOpen(true);
  };

  const getIcon = (category: string) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("land") || cat.includes("property")) return Building;
    if (cat.includes("transport") || cat.includes("parking")) return Car;
    if (cat.includes("business") || cat.includes("trade")) return Store;
    return FileText;
  };

  const filteredServices = services.filter(s =>
    (s.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (s.code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (s.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="gov-page-header">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight">Service Catalogue</h1>
          <p className="flex items-center mt-2 text-sm opacity-90">Browse and manage available council services and utility offerings.</p>
        </div>
        <Button onClick={() => { setEditingService(null); form.reset(); setIsCreateOpen(true); }} className="btn-primary shadow-md">
          <Plus className="mr-2 h-4 w-4" /> New Service
        </Button>
      </div>

      <div className="flex items-center space-x-2 pt-6 pb-6">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Find a service..."
            className="pl-9 rounded-xl border transition-all border-outline-dimmer bg-background-higher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.category);
            return (
              <Card
                key={service.serviceId}
                className="group transition-all relative border shadow-sm hover:shadow-md rounded-xl bg-background-higher border-outline-dimmer"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-black/5 dark:hover:bg-white/5">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(service)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(service.serviceId)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardHeader>
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg transition-colors border bg-accent-primary-dimmest border-accent-primary-dimmer"
                  >
                    <Icon className="h-6 w-6 text-accent-primary-default" />
                  </div>
                  <div className="flex justify-between items-start pr-6">
                    <CardTitle className="text-xl text-foreground-default">{service.name}</CardTitle>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{service.category}</Badge>
                    <Badge variant="secondary" className="font-mono text-xs">{service.code}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {service.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1 text-foreground-dimmer">
                    <div className="flex justify-between">
                      <span>Inspection Required:</span>
                      <span className={`font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded border ${service.requiresInspection
                        ? 'bg-warning-dimmest border-warning-dimmer text-warning'
                        : 'bg-background-default border-outline-dimmer text-foreground-dimmest'
                        }`}>
                        {service.requiresInspection ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approval Required:</span>
                      <span className={`font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded border ${service.requiresApproval
                        ? 'bg-accent-primary-dimmest border-accent-primary-dimmer text-accent-primary-default'
                        : 'bg-background-default border-outline-dimmer text-foreground-dimmest'
                        }`}>
                        {service.requiresApproval ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filteredServices.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No services found</h3>
              <p className="text-sm text-muted-foreground mt-1">Get started by creating a new service.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Service
              </Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Create New Service"}</DialogTitle>
            <DialogDescription>
              {editingService ? "Update the service details below." : "Add a new service to the catalogue."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. TRD-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Property">Property</SelectItem>
                          <SelectItem value="Licensing">Licensing</SelectItem>
                          <SelectItem value="Waste">Waste Mgmt</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Annual Trading License" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of the service" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editingService ? "Save Changes" : "Create Service"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
