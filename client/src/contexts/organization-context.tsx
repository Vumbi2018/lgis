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
  logoUrl: string | null;
  themeColor: string | null;
  fontFamily: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  dateFormat: string | null;
  timeFormat: string | null;
}

interface OrganizationContextType {
  currentOrganization: Council | null;
  setCurrentOrganization: (org: Council) => void;
  organizations: Council[];
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Council | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('currentOrganization');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const { data, isLoading } = useQuery<Council[]>({
    queryKey: ["/api/councils"],
  });

  const organizations: Council[] = data || [];

  useEffect(() => {
    if (organizations.length > 0 && !currentOrganization) {
      // Load from localStorage or use first organization
      const stored = localStorage.getItem('currentOrganization');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.councilId) {
            setCurrentOrganization(parsed);
          } else {
            throw new Error("Invalid stored org");
          }
        } catch {
          const ncdc = organizations.find(o => o.councilId === '3c4d4a9f-92a7-4dd2-82fb-ceff90c57094') || organizations[0];
          setCurrentOrganization(ncdc);
        }
      } else {
        const ncdc = organizations.find(o => o.councilId === '3c4d4a9f-92a7-4dd2-82fb-ceff90c57094') || organizations[0];
        setCurrentOrganization(ncdc);
      }
    }
  }, [organizations, currentOrganization]);

  // Persist to localStorage whenever it changes
  useEffect(() => {
    if (currentOrganization) {
      localStorage.setItem('currentOrganization', JSON.stringify(currentOrganization));
    }
  }, [currentOrganization]);

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
