import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Organization {
  id: string;
  name: string;
  type: string;
  district: string | null;
  province: string | null;
}

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganization: (org: Organization) => void;
  organizations: Organization[];
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const result = await api.organizations.list();
      return result as Organization[];
    },
  });

  const organizations: Organization[] = (data as Organization[]) || [];

  // Set first organization as default when loaded
  useEffect(() => {
    if (organizations.length > 0 && !currentOrganization) {
      setCurrentOrganization(organizations[0]);
    }
  }, [organizations, currentOrganization]);

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        setCurrentOrganization,
        organizations,
        isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error("useOrganization must be used within OrganizationProvider");
  }
  return context;
}
