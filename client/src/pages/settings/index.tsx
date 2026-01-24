import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Loader2 } from "lucide-react";
import { useOrganization } from "@/contexts/organization-context";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  address: z.string().optional(),
  themeColor: z.string().optional(),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  dateFormat: z.string().optional(),
  timeFormat: z.string().optional(),
  currencyCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SettingsPage() {
  const { currentOrganization, isLoading: orgLoading } = useOrganization();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      themeColor: "#EAB308",
      logoUrl: "",
      dateFormat: "dd/MM/yyyy",
      timeFormat: "HH:mm",
      currencyCode: "PGK",
    },
  });

  useEffect(() => {
    if (currentOrganization) {
      form.reset({
        name: currentOrganization.name || "",
        email: currentOrganization.email || "",
        phone: currentOrganization.phone || "",
        website: currentOrganization.website || "",
        address: currentOrganization.address || "",
        themeColor: currentOrganization?.themeColor || "#1e40af",
        logoUrl: currentOrganization?.logoUrl || "",
        dateFormat: currentOrganization?.dateFormat || "dd/MM/yyyy",
        timeFormat: currentOrganization?.timeFormat || "HH:mm",
        currencyCode: currentOrganization?.currencyCode || "PGK",
      });
    }
  }, [currentOrganization, form]);

  async function onSubmit(data: FormValues) {
    if (!currentOrganization) return;

    setIsSaving(true);
    try {
      await apiRequest("PUT", `/api/v1/councils/${currentOrganization.councilId}`, data);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/councils"] });

      toast({
        title: "Settings saved",
        description: "Organization profile has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (orgLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Configure global preferences and user access.</p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="localization">Localization</TabsTrigger>
              <TabsTrigger value="users">Users & Roles</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Organisation Profile</CardTitle>
                  <CardDescription>Manage {currentOrganization?.name || "Council"} operational details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organisation Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Input value={currentOrganization?.level || ""} disabled className="bg-muted" />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Design & Branding</CardTitle>
                  <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="themeColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color (Hex)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input {...field} placeholder="#1e40af" />
                            </FormControl>
                            <div
                              className="w-10 h-10 rounded border"
                              style={{ backgroundColor: field.value || "#1e40af" }}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com/logo.png" />
                          </FormControl>
                          <FormDescription>Link to an image file.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="localization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                  <CardDescription>Date, time and currency formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="currencyCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency Symbol</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Input value={currentOrganization?.timezone || ""} disabled className="bg-muted" />
                    </div>
                    <FormField
                      control={form.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="dd/MM/yyyy" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Format</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="HH:mm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage staff access and permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 text-center border-dashed border-2 rounded">
                    User management functionality is coming soon.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </form>
      </Form>
    </MainLayout>
  );
}
