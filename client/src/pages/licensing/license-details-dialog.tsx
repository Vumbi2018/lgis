import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { LicenseType } from "@shared/schema";
import { useChecklistRequirements, useSpecialRequirements } from "@/hooks/use-licenses";
import { useLocation } from "wouter";

interface LicenseDetailsDialogProps {
    license: LicenseType | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LicenseDetailsDialog({ license, open, onOpenChange }: LicenseDetailsDialogProps) {
    const [, setLocation] = useLocation();

    const { data: checklist, isLoading: loadingChecklist } = useChecklistRequirements(license?.id ?? "");
    const { data: special, isLoading: loadingSpecial } = useSpecialRequirements(license?.id ?? "");

    if (!license) return null;

    const handleApply = () => {
        onOpenChange(false);
        setLocation(`/licensing/apply/${license.id}`);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
                <div className="p-6 pb-2">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="w-fit">
                                {license.licenseCategory}
                            </Badge>
                            {license.applicationForm && (
                                <Badge variant="secondary" className="w-fit">
                                    {license.applicationForm}
                                </Badge>
                            )}
                        </div>
                        <DialogTitle className="text-2xl">{license.licenseName}</DialogTitle>
                        <DialogDescription className="text-base mt-2">
                            {license.description || "Review the requirements below before starting your application."}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="flex-1 overflow-hidden">
                    <Tabs defaultValue="checklist" className="h-full flex flex-col">
                        <div className="px-6 border-b">
                            <TabsList className="w-full justify-start h-12 bg-transparent gap-6 p-0">
                                <TabsTrigger
                                    value="checklist"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 flex items-center gap-2 font-semibold transition-all"
                                >
                                    <FileText className="h-4 w-4" /> Required Documents
                                </TabsTrigger>
                                <TabsTrigger
                                    value="special"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 flex items-center gap-2 font-semibold transition-all"
                                >
                                    <AlertCircle className="h-4 w-4" /> Special Requirements
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-hidden px-6">
                            <TabsContent value="checklist" className="h-full m-0 py-4 focus-visible:outline-none">
                                <ScrollArea className="h-[450px] pr-4 -mr-4">
                                    {loadingChecklist ? (
                                        <div className="flex flex-col items-center justify-center h-40 space-y-3">
                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                            <p className="text-sm text-muted-foreground">Loading requirements...</p>
                                        </div>
                                    ) : checklist && checklist.length > 0 ? (
                                        <div className="grid gap-3 pb-4">
                                            {checklist.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group relative flex items-start gap-4 bg-background-default border border-outline-dimmer p-4 rounded-xl shadow-sm hover:shadow-md hover:border-accent-primary-default/20 transition-all duration-200"
                                                >
                                                    <div className="flex items-center justify-center bg-background-higher text-foreground-dimmer font-bold rounded-lg w-8 h-8 text-xs shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-outline-dimmer">
                                                        {item.itemNumber}
                                                    </div>
                                                    <div className="flex-1 space-y-1.5">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="font-bold text-sm leading-tight text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                                                                {item.documentName}
                                                            </span>
                                                        </div>

                                                        {item.responsibleEntity && (
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-[9px] px-1.5 py-0.5 bg-background-higher rounded-md font-bold text-foreground-dimmer uppercase tracking-wider border border-outline-dimmer">Authority</span>
                                                                <span className="text-xs text-foreground-dimmer font-medium">{item.responsibleEntity}</span>
                                                            </div>
                                                        )}

                                                        {item.requirementNote && (
                                                            <div className="mt-3 relative p-3 rounded-lg border overflow-hidden bg-accent-primary-dimmest border-accent-primary-dimmer">
                                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary-default" />
                                                                <p className="text-xs leading-relaxed text-foreground-default">
                                                                    {item.requirementNote}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-60 text-center space-y-3 opacity-60">
                                            <div className="p-4 bg-background-higher rounded-full border border-outline-dimmer">
                                                <FileText className="h-8 w-8 text-foreground-dimmest" />
                                            </div>
                                            <p className="text-sm font-medium text-foreground-dimmer">No specific document requirements found.</p>
                                        </div>
                                    )}
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="special" className="h-full m-0 py-4 focus-visible:outline-none">
                                <ScrollArea className="h-[450px] pr-4 -mr-4">
                                    {loadingSpecial ? (
                                        <div className="flex flex-col items-center justify-center h-40 space-y-3">
                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                            <p className="text-sm text-muted-foreground">Loading requirements...</p>
                                        </div>
                                    ) : special && special.length > 0 ? (
                                        <div className="grid gap-4 pb-4">
                                            {special.map((req) => (
                                                <div
                                                    key={req.id}
                                                    className="relative flex flex-col p-5 rounded-xl transition-all shadow-sm border bg-accent-warning-dimmest border-accent-warning-dimmer"
                                                >
                                                    <div className="absolute top-0 right-0 p-2">
                                                        <AlertCircle className="h-4 w-4 text-accent-warning-default opacity-20" />
                                                    </div>

                                                    <h4 className="font-bold flex items-center gap-2 text-accent-warning-stronger">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-accent-warning-default" />
                                                        {req.requirementName}
                                                    </h4>

                                                    {req.description && (
                                                        <p className="text-sm mt-3 leading-relaxed text-foreground-default">
                                                            {req.description}
                                                        </p>
                                                    )}

                                                    {req.issuingAuthority && (
                                                        <div className="mt-4 pt-4 border-t flex items-center gap-2 border-outline-dimmer">
                                                            <div className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter border bg-accent-warning-dimmer text-accent-warning-stronger border-accent-warning-default">
                                                                Issuing Authority
                                                            </div>
                                                            <span className="text-xs font-bold text-accent-warning-stronger">
                                                                {req.issuingAuthority}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-60 text-center space-y-3 opacity-60">
                                            <div className="p-4 bg-background-higher rounded-full border border-outline-dimmer">
                                                <AlertCircle className="h-8 w-8 text-foreground-dimmest" />
                                            </div>
                                            <p className="text-sm font-medium text-foreground-dimmer">No special requirements found.</p>
                                        </div>
                                    )}
                                </ScrollArea>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>


                <div className="pt-4 mt-auto border-t flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button onClick={handleApply}>
                        Start Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
