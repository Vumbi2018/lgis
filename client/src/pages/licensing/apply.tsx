import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import {
  BarberShopForm,
  DinnerSpecialPermitForm,
  CabaretPermitForm,
  ClubLicenseForm,
  PublicansLicenseForm,
  TradeLicenseForm,
  StorekeeperLicenseForm,
  SecondHandDealerForm,
  RestaurantLicenseForm,
  BottleShopLicenseForm,
  ElectronicShopLicenseForm
} from "./forms/LicenseForms";

// Schema for the initial application step
const applicationSchema = z.object({
  businessId: z.string().min(1, "Please select a business"),
  licenseTypeId: z.string().min(1, "Please select a license type"),
});

export default function ApplyPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"initial" | "requirements" | "form">("initial");
  const [selectedDetails, setSelectedDetails] = useState<{ businessId: string; licenseTypeId: string } | null>(null);

  // Fetch user's businesses
  const { data: businesses } = useQuery({
    queryKey: ["/api/v1/businesses/my"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/v1/businesses");
      return res.json();
    }
  });

  // Fetch license types
  const { data: licenseTypes } = useQuery({
    queryKey: ["/api/v1/license-types"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/v1/license-types");
      return res.json();
    }
  });

  const { id } = useParams();
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      licenseTypeId: id || "",
    }
  });

  // Update form if ID changes
  useEffect(() => {
    if (id) {
      form.setValue("licenseTypeId", id);
    }
  }, [id, form]);

  const applyMutation = useMutation({
    mutationFn: async (formData: any) => {
      const selectedBusiness = businesses?.find((b: any) => b.businessId === selectedDetails?.businessId);

      // Get councilId from business or fallback to organization context
      const storedOrg = localStorage.getItem('currentOrganization');
      const contextCouncilId = storedOrg ? JSON.parse(storedOrg)?.councilId : '';
      const councilId = selectedBusiness?.councilId || contextCouncilId;

      // Extract files from formData
      const processedFormData = { ...formData };
      const filesToUpload: { file: File; path: string }[] = [];

      // Recursively find files
      const extractFiles = (obj: any, path: string = ''): any => {
        if (obj instanceof File) {
          filesToUpload.push({ file: obj, path });
          return { fileName: obj.name, fileSize: obj.size, uploaded: false };
        } else if (Array.isArray(obj)) {
          return obj.map((item, index) => extractFiles(item, `${path}[${index}]`));
        } else if (obj && typeof obj === 'object') {
          const processed: any = {};
          for (const [key, value] of Object.entries(obj)) {
            processed[key] = extractFiles(value, path ? `${path}.${key}` : key);
          }
          return processed;
        }
        return obj;
      };

      // Process the entire formData
      for (const [key, value] of Object.entries(formData)) {
        processedFormData[key] = extractFiles(value, key);
      }

      console.log("Submitting application with:", {
        businessId: selectedDetails?.businessId,
        licenseTypeId: selectedDetails?.licenseTypeId,
        councilId,
        formData: processedFormData
      });

      // Submit the application first
      const res = await apiRequest("POST", "/api/v1/licensing/apply-test", {
        businessId: selectedDetails?.businessId,
        licenseTypeId: selectedDetails?.licenseTypeId,
        councilId,
        formData: processedFormData
      });

      const result = await res.json();

      // Now upload files with the correct requestId
      if (result.request?.requestId) {
        await Promise.all(filesToUpload.map(async ({ file }) => {
          const formDataUpload = new FormData();
          formDataUpload.append('file', file);
          formDataUpload.append('councilId', councilId); // Use resolved councilId
          formDataUpload.append('ownerType', 'service_request');
          formDataUpload.append('ownerId', result.request.requestId);

          const uploadRes = await fetch('/api/v1/uploads', {
            method: 'POST',
            body: formDataUpload
          });

          if (!uploadRes.ok) throw new Error('File upload failed');
        }));
      }

      return result;
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your license application has been submitted successfully.",
      });
      setLocation("/licensing"); // Redirect to Licensing Dashboard
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onInitialSubmit = (values: z.infer<typeof applicationSchema>) => {
    setSelectedDetails(values);
    setStep("requirements");
  };

  const onRequirementsSubmit = () => {
    setStep("form");
  };

  const currentLicenseType = licenseTypes?.find((lt: any) => lt.id === selectedDetails?.licenseTypeId);







  const selectedBusiness = businesses?.find((b: any) => b.businessId === selectedDetails?.businessId);

  const renderForm = () => {
    if (!currentLicenseType) return <div>Error: License Type Not Found</div>;

    const name = currentLicenseType.licenseName.toLowerCase();
    const commonProps = {
      onSubmit: (data: any) => applyMutation.mutate(data),
      isSubmitting: applyMutation.isPending,
      licenseTypeName: currentLicenseType.licenseName,
      business: selectedBusiness
    };

    // Mapping based on License Name - Ideally done via database "form_code" or similar
    if (name.includes("barber")) {
      return <BarberShopForm {...commonProps} />;
    }
    if (name.includes("dinner") || name.includes("special")) {
      return <DinnerSpecialPermitForm {...commonProps} />;
    }
    if (name.includes("cabaret")) {
      return <CabaretPermitForm {...commonProps} />;
    }
    if (name.includes("club")) {
      return <ClubLicenseForm {...commonProps} />;
    }
    if (name.includes("publican") || name.includes("tavern") || name.includes("hotel")) {
      return <PublicansLicenseForm {...commonProps} />;
    }
    if (name.includes("trade") || name.includes("trading") || name.includes("general") || name.includes("business")) {
      return <TradeLicenseForm {...commonProps} />;
    }
    if (name.includes("store")) {
      return <StorekeeperLicenseForm {...commonProps} />;
    }
    if (name.includes("second") || name.includes("dealer")) {
      return <SecondHandDealerForm {...commonProps} />;
    }
    if (name.includes("restaurant") || name.includes("food")) {
      return <RestaurantLicenseForm {...commonProps} />;
    }
    if (name.includes("bottle") || name.includes("liquor")) {
      return <BottleShopLicenseForm {...commonProps} />;
    }
    if (name.includes("electronic")) {
      return <ElectronicShopLicenseForm {...commonProps} />;
    }
    if (name.includes("entertainment") || name.includes("theatre") || name.includes("cinema")) {
      // Map Entertainment to Trade/Business form for now as it captures general details + premises
      return <TradeLicenseForm {...commonProps} />;
    }
    if (name.includes("gas") || name.includes("industrial")) {
      // Map Industrial Gas to Trade/Business form
      return <TradeLicenseForm {...commonProps} />;
    }

    // Default fallback: Use Trade License Form instead of empty submission logic
    return <TradeLicenseForm {...commonProps} />;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 mx-auto w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {step === "initial" ? "New License Application" : (currentLicenseType?.licenseName || "Application Details")}
              </h1>
              <p className="text-gray-500">
                {step === "initial" ? "Select your business and the type of license you need." : "Please fill out the application form below."}
              </p>
            </div>
            {step === "form" && (
              <Button variant="outline" onClick={() => setStep("initial")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{step === "initial" ? "Application Setup" : "Form Details"}</CardTitle>
              <CardDescription>
                {step === "initial" ? "Start a new application for your business." : "Complete the required fields."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "initial" ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInitialSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="businessId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Business</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a business" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {businesses?.map((b: any) => (
                                <SelectItem key={b.businessId} value={b.businessId}>
                                  {b.tradingName || b.legalName || "Unknown Business"} ({b.registrationNo || "N/A"})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licenseTypeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select license type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[300px] overflow-y-auto">
                              {licenseTypes?.map((lt: any) => (
                                <SelectItem key={lt.id} value={lt.id}>
                                  {lt.licenseName} - {lt.licenseCategory}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : step === "requirements" ? (
                <RequirementsStep
                  licenseTypeId={selectedDetails?.licenseTypeId}
                  licenseName={currentLicenseType?.licenseName}
                  onNext={onRequirementsSubmit}
                  onBack={() => setStep("initial")}
                />
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  {renderForm()}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

function RequirementsStep({ licenseTypeId, licenseName, onNext, onBack }: { licenseTypeId: string | undefined, licenseName: string | undefined, onNext: () => void, onBack: () => void }) {
  const [acknowledged, setAcknowledged] = useState(false);

  const { data: checklist, isLoading: isLoadingChecklist } = useQuery({
    queryKey: [`/api/v1/license-types/${licenseTypeId}/checklist`],
    enabled: !!licenseTypeId
  });

  const { data: special, isLoading: isLoadingSpecial } = useQuery({
    queryKey: [`/api/v1/license-types/${licenseTypeId}/special-requirements`],
    enabled: !!licenseTypeId
  });

  if (isLoadingChecklist || isLoadingSpecial) {
    return <div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /><p>Loading requirements...</p></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Requirements for {licenseName}</h2>
        <p className="text-muted-foreground">Please review the following requirements before proceeding.</p>
      </div>

      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="checklist">Checklist Documents</TabsTrigger>
          <TabsTrigger value="special">Special Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="mt-4">
          <ScrollArea className="h-[500px] border rounded-md p-4 bg-muted/20">
            {Array.isArray(checklist) && (checklist as any[]).length > 0 ? (
              <ul className="space-y-4">
                {(checklist as any[]).map((item: any) => (
                  <li key={item.id} className="flex gap-4 p-3 border-b border-muted last:border-0 bg-white dark:bg-slate-900 rounded-sm">
                    <span className="flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full min-w-[28px] h-[28px] text-xs">
                      {item.itemNumber}
                    </span>
                    <div>
                      <p className="font-semibold text-base">{item.documentName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded uppercase tracking-wider font-semibold">Authority</span>
                        <p className="text-muted-foreground text-xs">{item.responsibleEntity}</p>
                      </div>
                      {item.requirementNote && (
                        <div className="mt-2 p-2 bg-blue-50/50 dark:bg-blue-900/20 border-l-2 border-blue-400">
                          <p className="text-xs italic text-blue-800 dark:text-blue-300">{item.requirementNote}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground p-4 text-center">No specific checklist documents found.</p>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="special" className="mt-4">
          <ScrollArea className="h-[500px] border rounded-md p-4 bg-blue-50/50 dark:bg-blue-950/10">
            {Array.isArray(special) && (special as any[]).length > 0 ? (
              <ul className="space-y-4">
                {(special as any[]).map((item: any) => (
                  <li key={item.id} className="p-4 bg-white dark:bg-slate-900 border-l-4 border-blue-500 rounded-r-md shadow-sm">
                    <p className="font-bold text-base text-blue-900 dark:text-blue-100">{item.requirementName}</p>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded uppercase tracking-wider font-semibold">Authority</span>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.issuingAuthority}</p>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground p-4 text-center">No special requirements found.</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="pt-6 border-t space-y-4">
        <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900">
          <Checkbox
            id="acknowledge"
            checked={acknowledged}
            onCheckedChange={(c) => setAcknowledged(c === true)}
          />
          <Label htmlFor="acknowledge" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I acknowledge that I have read and understood the requirements listed above and will provide necessary documentation.
          </Label>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button onClick={onNext} disabled={!acknowledged}>
            Proceed to Application <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
