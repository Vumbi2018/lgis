import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Download, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterConfig {
    title: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
}

interface DataTableToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    filters?: FilterConfig[];
    onExport?: () => void;
    actionButton?: React.ReactNode;
}

export function DataTableToolbar({
    searchTerm,
    onSearchChange,
    placeholder = "Search...",
    filters = [],
    onExport,
    actionButton
}: DataTableToolbarProps) {
    const hasActiveFilters = searchTerm !== "" || filters.some(f => f.value !== "all" && f.value !== "");

    const handleReset = () => {
        onSearchChange("");
        filters.forEach(f => f.onChange("all"));
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-background-higher rounded-xl border border-outline-dimmer mb-6 shadow-sm">
            <div className="flex flex-1 flex-col md:flex-row items-center gap-3 w-full">
                {/* Search Input */}
                <div className="relative w-full md:w-[350px] group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-black transition-colors" />
                    <Input
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 h-10 border-outline-dimmer bg-background-default focus-visible:ring-black rounded-lg"
                    />
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-transparent"
                            onClick={() => onSearchChange("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Dynamic Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {filters.map((filter) => (
                        <div key={filter.title} className="flex items-center gap-2">
                            <Select value={filter.value} onValueChange={filter.onChange}>
                                <SelectTrigger className="h-10 px-3 border-outline-dimmer bg-background-default font-bold text-[10px] uppercase tracking-wider rounded-lg min-w-[120px]">
                                    <Filter className="mr-2 h-3 w-3 text-muted-foreground" />
                                    <SelectValue placeholder={filter.title} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All {filter.title}</SelectItem>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={handleReset}
                            className="h-10 px-3 text-[10px] font-black uppercase tracking-widest text-[#D93025] hover:text-[#D93025] hover:bg-red-50"
                        >
                            Reset
                            <X className="ml-2 h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
                {onExport && (
                    <Button
                        variant="outline"
                        className="h-10 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black/5"
                        onClick={onExport}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                )}
                {actionButton}
            </div>
        </div>
    );
}
