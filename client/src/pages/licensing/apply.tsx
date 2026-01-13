import { MainLayout } from "@/components/layout/main-layout";
import { LICENSE_TYPES } from "@/lib/licensing-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { CheckCircle, Upload, ChevronRight, ChevronLeft, FileText, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function ApplicationWizard() {
  const [, params] = useRoute("/licensing/apply/:id");
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  
  const licenseId = params?.id;
  const license = LICENSE_TYPES.find(l => l.id === licenseId);

  if (!license) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold">License Type Not Found</h2>
          <Button onClick={() => setLocation("/licensing")} className="mt-4">
            Return to Catalogue
          </Button>
        </div>
      </MainLayout>
    );
  }

  const steps = [
    { number: 1, title: "Applicant Details", description: "Basic information about you or your company" },
    { number: 2, title: "Document Checklist", description: "Upload required supporting documents" },
    { number: 3, title: "Review & Submit", description: "Verify information and submit" }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 pl-0" onClick={() => setLocation("/licensing")}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Catalogue
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <license.icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">{license.name} Application</h1>
              <p className="text-muted-foreground">New Application • {license.formType}</p>
            </div>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-secondary -z-10" />
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center bg-background px-4 z-10">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s.number 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s.number}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.number ? "text-primary" : "text-muted-foreground"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {step === 1 && (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
                <CardDescription>Please provide details about the business entity applying for the license.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bizName">Business Name (As Registered)</Label>
                    <Input id="bizName" placeholder="e.g. Papindo Trading Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                    <Input id="tin" placeholder="10 Digits" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input id="contactName" placeholder="Full Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+675..." />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address">Physical Address of Premises</Label>
                    <Textarea id="address" placeholder="Section, Lot, Suburb, District..." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Document Checklist</CardTitle>
                <CardDescription>
                  Upload digital copies of the required documents. 
                  <span className="block text-amber-600 mt-1 text-xs font-medium">
                    Note: All documents must be valid and clearly legible.
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {license.checklist.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 border p-4 rounded-lg bg-secondary/10">
                      <Checkbox id={item.id} className="mt-1" />
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={item.id} className="font-medium leading-none cursor-pointer">
                          {item.label}
                          {item.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Responsible: {item.responsible} {item.note && `• ${item.note}`}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-3 w-3 mr-2" /> Upload
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Review Application</CardTitle>
                <CardDescription>Please confirm that all information is correct before submitting.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-secondary/20 p-4 mb-6">
                  <div className="flex items-center gap-2 text-primary font-medium mb-2">
                    <FileText className="h-4 w-4" />
                    Application Summary
                  </div>
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">License Type</dt>
                      <dd className="font-medium">{license.name}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Form Type</dt>
                      <dd className="font-medium">{license.formType}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Documents Attached</dt>
                      <dd className="font-medium">{license.checklist.length} Files</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Application Fee</dt>
                      <dd className="font-medium">PGK 50.00</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I declare that the information provided is true and correct to the best of my knowledge.
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setLocation("/licensing")}>
                  Submit Application
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
