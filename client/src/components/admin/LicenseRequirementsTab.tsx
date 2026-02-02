import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Plus,
    Pencil,
    Trash2,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ShieldCheck,
    ClipboardList,
    Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LicenseType, ChecklistRequirement, SpecialRequirement } from "@shared/schema";

export function LicenseRequirementsTab() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [selectedLicense, setSelectedLicense] = useState<LicenseType | null>(null);
    const [reqSearch, setReqSearch] = useState("");
    const [specialSearch, setSpecialSearch] = useState("");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Queries
    const { data: licenseTypes = [], isLoading } = useQuery<LicenseType[]>({
        queryKey: ["/api/v1/license-types"],
        queryFn: () => api.v1.licenseTypes.list() as Promise<LicenseType[]>,
    });

    const { data: checklist = [] } = useQuery<ChecklistRequirement[]>({
        queryKey: ["/api/v1/license-types", selectedLicense?.id, "checklist"],
        queryFn: () => api.v1.licenseTypes.checklist.list(selectedLicense!.id) as Promise<ChecklistRequirement[]>,
        enabled: !!selectedLicense,
    });

    const { data: special = [] } = useQuery<SpecialRequirement[]>({
        queryKey: ["/api/v1/license-types", selectedLicense?.id, "special"],
        queryFn: () => api.v1.licenseTypes.special.list(selectedLicense!.id) as Promise<SpecialRequirement[]>,
        enabled: !!selectedLicense,
    });

    // Mutations
    const deleteLicenseMutation = useMutation({
        mutationFn: (id: string) => api.v1.licenseTypes.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/license-types"] });
            toast({ title: "License Type Deleted" });
            if (selectedLicense?.id === id) setSelectedLicense(null);
        },
    });

    // Filtered List
    const filteredLicenses = (licenseTypes as LicenseType[]).filter(lt => {
        const matchesSearch = (lt.licenseName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lt.licenseCode || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || lt.licenseCategory === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = Array.from(new Set((licenseTypes as LicenseType[]).map(l => l.licenseCategory)));

    const filteredChecklist = (checklist as ChecklistRequirement[]).filter(r =>
        (r.documentName || "").toLowerCase().includes(reqSearch.toLowerCase())
    );

    const filteredSpecial = (special as SpecialRequirement[]).filter(r =>
        (r.requirementName || "").toLowerCase().includes(specialSearch.toLowerCase()) ||
        (r.description || "").toLowerCase().includes(specialSearch.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center justify-between bg-black text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-[#F4C400] text-black rounded-xl flex items-center justify-center font-black">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                            Requirement Authority
                            <Badge className="bg-[#F4C400] text-black text-[9px] font-black uppercase">Authoritative Source</Badge>
                        </h2>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-0.5">Official NCD Licensing Requirement Catalog & Master Data</p>
                    </div>
                </div>
                <div className="flex gap-6 text-right">
                    <div>
                        <div className="text-xl font-black">{licenseTypes.length}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Licenses</div>
                    </div>
                    <div className="h-10 w-px bg-slate-800" />
                    <div>
                        <div className="text-xl font-black">{checklist.length + special.length}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Rules</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List Column */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="shadow-lg border-none ring-1 ring-black/5 bg-background-highest h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle className="text-sm font-black uppercase tracking-tight">License Catalog</CardTitle>
                                <LicenseTypeFormDialog />
                            </div>
                            <DataTableToolbar
                                searchTerm={searchTerm}
                                onSearchChange={(val: string) => setSearchTerm(val)}
                                placeholder="Search licenses..."
                                filters={[
                                    {
                                        title: "Category",
                                        value: categoryFilter,
                                        options: categories.map(c => ({ label: c, value: c })),
                                        onChange: (val: string) => setCategoryFilter(val)
                                    }
                                ]}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
                                {filteredLicenses.map((lt: LicenseType) => (
                                    <div
                                        key={lt.id}
                                        onClick={() => setSelectedLicense(lt)}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${selectedLicense?.id === lt.id
                                            ? 'border-black bg-[#FFFDF5] shadow-md'
                                            : 'border-transparent bg-background-default hover:border-outline-dimmer hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-[#F4C400] mb-1">
                                                    {lt.licenseCode}
                                                </div>
                                                <h4 className="font-bold text-sm group-hover:text-black transition-colors">{lt.licenseName}</h4>
                                            </div>
                                            <ChevronRight className={`h-4 w-4 transition-transform ${selectedLicense?.id === lt.id ? 'translate-x-1' : ''}`} />
                                        </div>
                                    </div>
                                ))}

                                {filteredLicenses.length === 0 && (
                                    <div className="text-center py-10 opacity-50 italic text-sm">
                                        No license types found
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detail Column */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedLicense ? (
                        <>
                            {/* Header & Meta */}
                            <Card className="shadow-lg border-none ring-1 ring-black/5 bg-gradient-to-br from-white to-slate-50">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-2xl bg-black flex items-center justify-center text-[#F4C400] shadow-xl">
                                                <ShieldCheck className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge className="bg-[#F4C400] text-black font-black text-[9px] tracking-widest">
                                                        {selectedLicense.licenseCategory}
                                                    </Badge>
                                                    <span className="text-xs font-mono font-bold text-muted-foreground">{selectedLicense.licenseCode}</span>
                                                </div>
                                                <h2 className="text-2xl font-black uppercase tracking-tight">{selectedLicense.licenseName}</h2>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <LicenseTypeFormDialog existing={selectedLicense} />
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this license type and all its requirements?")) {
                                                        deleteLicenseMutation.mutate(selectedLicense.id);
                                                    }
                                                }}
                                                className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600 rounded-lg h-10 px-4 font-bold text-xs"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Checklist Section */}
                                <Card className="shadow-md border-none ring-1 ring-black/5">
                                    <CardHeader className="pb-3 border-b">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                <ClipboardList className="h-4 w-4 text-[#F4C400]" />
                                                Document Checklist
                                            </CardTitle>
                                            <RequirementFormDialog type="checklist" licenseTypeId={selectedLicense.id} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1 group">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-black transition-colors" />
                                                <Input
                                                    placeholder="Filter checklist..."
                                                    className="pl-10 h-9 text-xs border-outline-dimmer bg-background-higher"
                                                    id="checklist-search"
                                                    value={reqSearch}
                                                    onChange={(e) => setReqSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-background-higher hover:bg-background-higher border-none">
                                                    <TableHead className="text-[10px] font-black uppercase">Document Name</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase text-center">Required</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredChecklist.map((req: ChecklistRequirement) => (
                                                    <TableRow key={req.id} className="border-b last:border-0">
                                                        <TableCell className="py-3 font-medium text-sm">
                                                            {req.documentName}
                                                            {req.requirementNote && <p className="text-[10px] text-muted-foreground mt-0.5">{req.requirementNote}</p>}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {req.isRequired ? (
                                                                <CheckCircle2 className="h-4 w-4 text-[#0D7A2C] mx-auto" />
                                                            ) : (
                                                                <div className="h-2 w-2 rounded-full bg-slate-300 mx-auto" />
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <RequirementFormDialog type="checklist" licenseTypeId={selectedLicense.id} existing={req} />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                    onClick={() => {
                                                                        if (confirm("Delete this requirement?")) {
                                                                            api.v1.checklistRequirements.delete(req.id).then(() => {
                                                                                queryClient.invalidateQueries({ queryKey: ["/api/v1/license-types", selectedLicense.id, "checklist"] });
                                                                                toast({ title: "Requirement Deleted" });
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {filteredChecklist.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center py-10 opacity-50 italic text-xs">
                                                            No documents defined for this license
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>

                                {/* Special Requirements Section */}
                                <Card className="shadow-md border-none ring-1 ring-black/5">
                                    <CardHeader className="pb-3 border-b">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-[#F4C400]" />
                                                Special Conditions
                                            </CardTitle>
                                            <RequirementFormDialog type="special" licenseTypeId={selectedLicense.id} />
                                        </div>
                                        <div className="relative group">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-black transition-colors" />
                                            <Input
                                                placeholder="Filter conditions..."
                                                className="pl-10 h-9 text-xs border-outline-dimmer bg-background-higher"
                                                id="special-search"
                                                value={specialSearch}
                                                onChange={(e) => setSpecialSearch(e.target.value)}
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {filteredSpecial.map((req: SpecialRequirement) => (
                                                <div key={req.id} className="p-4 flex items-start justify-between group">
                                                    <div className="space-y-1">
                                                        <h5 className="text-sm font-bold">{req.requirementName}</h5>
                                                        <p className="text-xs text-muted-foreground line-clamp-2">{req.description}</p>
                                                    </div>
                                                    <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <RequirementFormDialog type="special" licenseTypeId={selectedLicense.id} existing={req} />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-700"
                                                            onClick={() => {
                                                                if (confirm("Delete this condition?")) {
                                                                    api.v1.specialRequirements.delete(req.id).then(() => {
                                                                        queryClient.invalidateQueries({ queryKey: ["/api/v1/license-types", selectedLicense.id, "special"] });
                                                                        toast({ title: "Condition Removed" });
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {filteredSpecial.length === 0 && (
                                                <div className="text-center py-12 opacity-50 italic text-xs">
                                                    No special conditions defined
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-background-higher rounded-2xl border-2 border-dashed border-outline-dimmer min-h-[500px]">
                            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-outline-dimmer">
                                <FileText className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Select a License Type</h3>
                            <p className="text-muted-foreground max-w-sm mb-6">
                                Choose a license from the catalog to manage its document requirements and special conditions.
                            </p>
                            <LicenseTypeFormDialog />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ================================
// FORMS
// ================================

function LicenseTypeFormDialog({ existing }: { existing?: LicenseType }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        licenseName: existing?.licenseName || "",
        licenseCode: existing?.licenseCode || "",
        licenseCategory: existing?.licenseCategory || "TRADING",
        description: existing?.description || "",
    });

    const mutation = useMutation({
        mutationFn: (data: any) =>
            existing
                ? api.v1.licenseTypes.update(existing.id, data)
                : api.v1.licenseTypes.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/license-types"] });
            toast({ title: existing ? "License Updated" : "License Created" });
            setOpen(false);
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {existing ? (
                    <Button variant="outline" className="h-10 border-2 border-black font-bold text-xs rounded-lg px-4">
                        <Pencil className="h-4 w-4 mr-2" /> Edit Details
                    </Button>
                ) : (
                    <Button className="bg-black text-[#F4C400] font-black uppercase text-[10px] tracking-widest rounded-lg h-10 px-6 shadow-md shadow-black/10 active:scale-95 transition-all">
                        <Plus className="h-4 w-4 mr-2" /> New License
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="rounded-2xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                        {existing ? "Edit License Type" : "Create License Type"}
                    </DialogTitle>
                    <DialogDescription>Define a new category of license for the NCD region.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Code</Label>
                            <Input
                                placeholder="TR-001"
                                value={formData.licenseCode}
                                onChange={(e) => setFormData({ ...formData, licenseCode: e.target.value })}
                                className="h-11 border-outline-dimmer bg-background-higher font-mono font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Category</Label>
                            <Input
                                placeholder="TRADING"
                                value={formData.licenseCategory}
                                onChange={(e) => setFormData({ ...formData, licenseCategory: e.target.value })}
                                className="h-11 border-outline-dimmer bg-background-higher font-bold"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</Label>
                        <Input
                            placeholder="e.g. General Trading License"
                            value={formData.licenseName}
                            onChange={(e) => setFormData({ ...formData, licenseName: e.target.value })}
                            className="h-11 border-outline-dimmer bg-background-higher font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Description</Label>
                        <Textarea
                            placeholder="Official purpose of this license..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="min-h-[100px] border-outline-dimmer bg-background-higher"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        className="w-full h-12 bg-black text-[#F4C400] font-black uppercase tracking-widest rounded-xl text-xs"
                        onClick={() => mutation.mutate(formData)}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Saving..." : "Save License Type"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function RequirementFormDialog({ type, licenseTypeId, existing }: { type: 'checklist' | 'special', licenseTypeId: string, existing?: any }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: existing?.documentName || existing?.requirementName || "",
        description: existing?.description || existing?.requirementNote || "", // Use existing?.requirementNote for checklist
        isRequired: existing?.isRequired ?? true,
    });

    const mutation = useMutation({
        mutationFn: (data: any) => {
            if (type === 'checklist') {
                return existing
                    ? api.v1.checklistRequirements.update(existing.id, { documentName: data.name, requirementNote: data.description, isRequired: data.isRequired })
                    : api.v1.licenseTypes.checklist.create(licenseTypeId, { documentName: data.name, requirementNote: data.description, isRequired: data.isRequired, itemNumber: 0 });
            } else {
                return existing
                    ? api.v1.specialRequirements.update(existing.id, { requirementName: data.name, description: data.description })
                    : api.v1.licenseTypes.special.create(licenseTypeId, { requirementName: data.name, description: data.description });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/v1/license-types", licenseTypeId, type] });
            toast({ title: existing ? "Updated Successfully" : "Added Successfully" });
            setOpen(false);
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {existing ? (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-black">
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-outline-dimmer hover:bg-black hover:text-[#F4C400] transition-all">
                        <Plus className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="rounded-2xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase tracking-tight">
                        {existing ? "Edit Requirement" : `Add ${type === 'checklist' ? 'Document' : 'Condition'}`}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                            {type === 'checklist' ? 'Document Name' : 'Requirement Name'}
                        </Label>
                        <Input
                            placeholder={type === 'checklist' ? "e.g. Health Certificate" : "e.g. Operational Hours"}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-11 border-outline-dimmer bg-background-higher font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Detailed Description</Label>
                        <Textarea
                            placeholder="Explain how to fulfill this requirement..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="min-h-[100px] border-outline-dimmer bg-background-higher"
                        />
                    </div>
                    {type === 'checklist' && (
                        <div className="flex items-center space-x-2 bg-background-higher p-3 rounded-xl border border-outline-dimmer">
                            <input
                                type="checkbox"
                                id="is-required"
                                title="Strictly mandatory"
                                checked={formData.isRequired}
                                onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <Label htmlFor="is-required" className="text-sm font-bold cursor-pointer select-none">Mark as strictly mandatory for application submission</Label>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        className="w-full h-12 bg-black text-[#F4C400] font-black uppercase tracking-widest rounded-xl text-xs"
                        onClick={() => mutation.mutate(formData)}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Saving..." : "Save Requirement"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
