import { useQuery } from "@tanstack/react-query";
import { LicenseType, ChecklistRequirement, SpecialRequirement } from "@shared/schema";

export function useLicenseTypes() {
    return useQuery<LicenseType[]>({
        queryKey: ["/api/v1/license-types"],
    });
}

export function useLicenseType(id: string) {
    return useQuery<LicenseType>({
        queryKey: [`/api/v1/license-types/${id}`],
        enabled: !!id,
    });
}

export function useChecklistRequirements(licenseTypeId: string) {
    return useQuery<ChecklistRequirement[]>({
        queryKey: [`/api/v1/license-types/${licenseTypeId}/checklist`],
        enabled: !!licenseTypeId,
    });
}

export function useSpecialRequirements(licenseTypeId: string) {
    return useQuery<SpecialRequirement[]>({
        queryKey: [`/api/v1/license-types/${licenseTypeId}/special-requirements`],
        enabled: !!licenseTypeId,
    });
}
