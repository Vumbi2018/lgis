import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { WorkflowDefinition, WorkflowStep } from "@shared/schema";
import { insertWorkflowStepSchema, insertWorkflowDefinitionSchema } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

interface WorkflowWithSteps extends WorkflowDefinition {
    steps: WorkflowStep[];
}

export default function WorkflowDetailsPage() {
    const [, params] = useRoute("/workflows/:id");
    const workflowId = params?.id;
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isAddStepOpen, setIsAddStepOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const { data: workflow, isLoading } = useQuery<WorkflowWithSteps>({
        queryKey: [`/api/v1/workflow-definitions/${workflowId}`],
        enabled: !!workflowId,
    });

    const editForm = useForm({
        resolver: zodResolver(insertWorkflowDefinitionSchema.partial()),
        defaultValues: {
            name: "",
            description: "",
            active: true,
            version: ""
        }
    });

    useEffect(() => {
        if (workflow) {
            editForm.reset({
                name: workflow.name || "",
                description: workflow.description || "",
                active: workflow.active ?? true,
                version: workflow.version || "",
            });
        }
    }, [workflow, editForm]);

    const updateWorkflowMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await apiRequest("PATCH", `/api/v1/workflow-definitions/${workflowId}`, data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/v1/workflow-definitions/${workflowId}`] });
            setIsEditOpen(false);
            toast({ title: "Workflow Updated", description: "Workflow definition updated successfully." });
        }
    });

    const onEditSubmit = (data: any) => {
        updateWorkflowMutation.mutate(data);
    };

    const getCouncilId = () => {
        const storedOrg = localStorage.getItem('currentOrganization');
        try {
            return storedOrg ? JSON.parse(storedOrg)?.councilId : '';
        } catch (e) {
            return '';
        }
    };

    const form = useForm({
        resolver: zodResolver(insertWorkflowStepSchema),
        defaultValues: {
            councilId: getCouncilId(),
            workflowId: workflowId,
            name: "",
            orderNo: 1,
            assigneeRole: "",
        }
    });

    // Reset default orderNo when workflow is loaded
    useEffect(() => {
        if (workflow?.steps) {
            form.setValue("orderNo", workflow.steps.length + 1);
        }
        form.setValue("workflowId", workflowId as string);
        form.setValue("councilId", getCouncilId());
    }, [workflow, workflowId, form]);

    const createStepMutation = useMutation({
        mutationFn: async (data: z.infer<typeof insertWorkflowStepSchema>) => {
            const res = await apiRequest("POST", "/api/v1/workflow-steps", data);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/v1/workflow-definitions/${workflowId}`] });
            setIsAddStepOpen(false);
            form.reset({
                councilId: getCouncilId(),
                workflowId: workflowId,
                name: "",
                orderNo: (workflow?.steps?.length || 0) + 2,
                assigneeRole: ""
            });
            toast({ title: "Step Added", description: "Workflow step created successfully." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to add step.", variant: "destructive" });
        }
    });

    const deleteStepMutation = useMutation({
        mutationFn: async (stepId: string) => {
            await apiRequest("DELETE", `/api/v1/workflow-steps/${stepId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/v1/workflow-definitions/${workflowId}`] });
            toast({ title: "Step Deleted", description: "Workflow step removed." });
        }
    });

    const onSubmit = (data: any) => {
        createStepMutation.mutate({
            ...data,
            councilId: getCouncilId(),
            workflowId: workflowId,
            orderNo: parseInt(data.orderNo.toString()) // Ensure number
        });
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-[#F4C400]" />
                </div>
            </MainLayout>
        );
    }

    if (!workflow) {
        return (
            <MainLayout>
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold">Workflow not found</h2>
                    <Button onClick={() => setLocation("/workflows")} className="mt-4">Back to Workflows</Button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100 bg-white text-zinc-950">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setLocation("/workflows")}>
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight uppercase text-[#F4C400]">{workflow.name}</h2>
                        <p className="font-medium text-zinc-950/80">{workflow.description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-[#0F0F0F] !text-[#F4C400] hover:bg-black/90 font-bold border-none shadow-md"
                                style={{ color: '#F4C400' }}
                            >
                                Edit Definition
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Workflow Definition</DialogTitle>
                                <DialogDescription>Update workflow details.</DialogDescription>
                            </DialogHeader>
                            <Form {...editForm}>
                                <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                                    <FormField
                                        control={editForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="version"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Version</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="active"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    onValueChange={(val) => field.onChange(val === 'true')}
                                                    defaultValue={field.value ? 'true' : 'false'}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="true">Active</SelectItem>
                                                        <SelectItem value="false">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button type="submit" disabled={updateWorkflowMutation.isPending} className="bg-[#0F0F0F] text-[#F4C400]">
                                            {updateWorkflowMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2 shadow-sm border-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Workflow Steps</CardTitle>
                        <Dialog open={isAddStepOpen} onOpenChange={setIsAddStepOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="bg-[#0F0F0F] !text-[#F4C400] hover:bg-black/90 font-bold border-none shadow-md"
                                    style={{ color: '#F4C400' }}
                                >
                                    <Plus className="mr-2 h-4 w-4 text-[#F4C400]" /> Add Step
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Workflow Step</DialogTitle>
                                    <DialogDescription>Add a new step to this workflow.</DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Step Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Document Verification" {...field} value={field.value || ''} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="orderNo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Order Number</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="assigneeRole"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Assignee Role</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select role" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Officer">Officer</SelectItem>
                                                                <SelectItem value="Inspector">Inspector</SelectItem>
                                                                <SelectItem value="Manager">Manager</SelectItem>
                                                                <SelectItem value="Admin">Admin</SelectItem>
                                                                <SelectItem value="System">System (Automated)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={createStepMutation.isPending} className="bg-[#0F0F0F] text-[#F4C400]">
                                                {createStepMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Add Step
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {workflow.steps && workflow.steps.length > 0 ? (
                                workflow.steps
                                    .sort((a, b) => a.orderNo - b.orderNo)
                                    .map((step) => (
                                        <div key={step.stepId} className="flex items-center p-4 border rounded-lg bg-gray-50 group hover:border-[#F4C400] transition-colors">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#F4C400] flex items-center justify-center text-white font-bold mr-4">
                                                {step.orderNo}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-lg">{step.name}</h4>
                                                <p className="text-sm text-gray-500">Role: {step.assigneeRole}</p>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => deleteStepMutation.mutate(step.stepId)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-gray-500 italic">No steps defined for this workflow.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-100">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="text-sm text-gray-500 block">Version</span>
                            <span className="font-medium">{workflow.version}</span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block">Status</span>
                            <span className={`font-medium ${workflow.active ? 'text-emerald-600' : 'text-gray-600'}`}>
                                {workflow.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500 block">Service ID</span>
                            <span className="font-medium font-mono text-xs truncate block">{workflow.serviceId}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </MainLayout>
    );
}
