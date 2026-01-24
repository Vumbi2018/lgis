import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Play, Plus, Clock, ChevronsRight, Settings, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { WorkflowDefinition, Service } from "@shared/schema";
import { insertWorkflowDefinitionSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import * as z from "zod";

interface EnrichedWorkflow extends WorkflowDefinition {
    steps: string[];
}

export function WorkflowManagement() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [, setLocation] = useLocation();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data: workflows = [], isLoading } = useQuery<EnrichedWorkflow[]>({
        queryKey: ["/api/v1/workflow-definitions"],
    });

    const { data: services = [] } = useQuery<Service[]>({
        queryKey: ["/api/v1/services"],
    });

    // Helper to get council ID
    const getCouncilId = () => {
        const storedOrg = localStorage.getItem('currentOrganization');
        try {
            return storedOrg ? JSON.parse(storedOrg)?.councilId : '';
        } catch (e) {
            return '';
        }
    };

    const form = useForm({
        resolver: zodResolver(insertWorkflowDefinitionSchema),
        defaultValues: {
            name: "",
            description: "",
            serviceId: "",
            version: "1.0",
            active: true,
            councilId: getCouncilId(),
        }
    });

    const createMutation = useMutation({
        mutationFn: async (data: z.infer<typeof insertWorkflowDefinitionSchema>) => {
            const res = await apiRequest("POST", "/api/v1/workflow-definitions", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/workflow-definitions"] });
            setIsCreateOpen(false);
            form.reset();
            toast({
                title: "Workflow Created",
                description: "The new workflow definition has been created.",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: "Failed to create workflow.",
                variant: "destructive"
            });
        }
    });

    const onSubmit = (data: any) => {
        createMutation.mutate({ ...data, councilId: getCouncilId() });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#F4C400]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Workflow Automation</h3>
                    <p className="text-sm text-muted-foreground">Design and manage business processes.</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="font-bold border-none shadow-md hover:bg-black/90 bg-[#0F0F0F] !text-[#F4C400]"
                            style={{ color: '#F4C400' }}
                        >
                            <Plus className="mr-2 h-4 w-4 text-[#F4C400]" />
                            Create Workflow
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Create New Workflow</DialogTitle>
                            <DialogDescription>
                                Define the basic details for your new workflow process.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Workflow Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Business License Approval" {...field} value={field.value || ''} />
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
                                                <Textarea placeholder="Describe the purpose of this workflow..." {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="serviceId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Associated Service</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a service" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {services.map(s => (
                                                        <SelectItem key={s.serviceId} value={s.serviceId}>{s.name}</SelectItem>
                                                    ))}
                                                    <SelectItem value="general">General (No specific service)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit" disabled={createMutation.isPending} className="bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90">
                                        {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Create Definition
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {workflows.map((wf) => (
                    <Card key={wf.workflowId} className="shadow-sm bg-white border border-gray-100 hover:shadow-md transition-all">
                        <CardHeader className="pb-4 border-b border-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-black rounded-lg">
                                        <GitBranch className="h-5 w-5 text-[#F4C400]" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold text-black">{wf.name || "Untitled Workflow"}</CardTitle>
                                        <CardDescription className="text-xs text-gray-500 line-clamp-1">{wf.description || "No description provided."}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className={
                                        wf.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }>
                                        {wf.active ? "Active" : "Inactive"}
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="relative flex items-center justify-between w-full overflow-x-auto pb-4 scrollbar-hide">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10" />
                                {wf.steps && wf.steps.length > 0 ? (
                                    wf.steps.map((step, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-1 bg-white px-2 min-w-[70px]">
                                            <div className="h-2.5 w-2.5 rounded-full bg-[#F4C400] ring-2 ring-white" />
                                            <span className="text-[9px] uppercase font-bold text-gray-400 text-center">{step}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-400 italic">No steps defined.</div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-2 text-xs">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Play className="h-3.5 w-3.5 text-emerald-600" />
                                        <span className="text-gray-500">v{wf.version}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-blue-600" />
                                        <span className="text-gray-500">Updated: {new Date(wf.createdAt as any).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-gray-200 hover:bg-black hover:text-[#F4C400] hover:border-black font-medium transition-colors text-[10px] uppercase tracking-wider px-3"
                                    onClick={() => setLocation(`/workflows/${wf.workflowId}`)}
                                >
                                    Details <ChevronsRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {workflows.length === 0 && (
                    <div className="text-center p-12 text-gray-500 bg-gray-50/50 rounded-xl border border-dashed">
                        No defined workflows found for this organization.
                    </div>
                )}
            </div>
        </div>
    );
}
