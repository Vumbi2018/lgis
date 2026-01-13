import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Council {
  councilId: string;
  name: string;
  level: string;
  countryCode: string | null;
  currencyCode: string | null;
  timezone: string | null;
  status: string | null;
}

interface OrganizationContextType {
  currentOrganization: Council | null;
  setCurrentOrganization: (org: Council) => void;
  organizations: Council[];
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Council | null>(null);

  const { data, isLoading } = useQuery<Council[]>({
    queryKey: ["/api/councils"],
  });

  const organizations: Council[] = data || [];

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
