// API client utilities
const API_BASE = "/api";

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Organizations
  organizations: {
    list: () => fetchAPI("/organizations"),
    create: (data: any) => fetchAPI("/organizations", { method: "POST", body: JSON.stringify(data) }),
  },

  // Citizens
  citizens: {
    list: (organizationId: string) => fetchAPI(`/citizens?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/citizens", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/citizens/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Businesses
  businesses: {
    list: (organizationId: string) => fetchAPI(`/businesses?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/businesses", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/businesses/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Properties
  properties: {
    list: (organizationId: string) => fetchAPI(`/properties?organizationId=${organizationId}`),
    get: (id: string) => fetchAPI(`/properties/${id}`),
    create: (data: any) => fetchAPI("/properties", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/properties/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // License Applications
  licenseApplications: {
    list: (organizationId: string) => fetchAPI(`/license-applications?organizationId=${organizationId}`),
    get: (id: string) => fetchAPI(`/license-applications/${id}`),
    create: (data: any) => fetchAPI("/license-applications", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/license-applications/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Licenses
  licenses: {
    list: (organizationId: string) => fetchAPI(`/licenses?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/licenses", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/licenses/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Inspections
  inspections: {
    list: (organizationId: string) => fetchAPI(`/inspections?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/inspections", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/inspections/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Enforcement Cases
  enforcementCases: {
    list: (organizationId: string) => fetchAPI(`/enforcement-cases?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/enforcement-cases", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/enforcement-cases/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Complaints
  complaints: {
    list: (organizationId: string) => fetchAPI(`/complaints?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/complaints", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/complaints/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Invoices
  invoices: {
    list: (organizationId: string) => fetchAPI(`/invoices?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/invoices", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => fetchAPI(`/invoices/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },

  // Transactions
  transactions: {
    list: (organizationId: string) => fetchAPI(`/transactions?organizationId=${organizationId}`),
    create: (data: any) => fetchAPI("/transactions", { method: "POST", body: JSON.stringify(data) }),
  },

  // Audit Logs
  auditLogs: {
    list: (organizationId?: string) => 
      fetchAPI(`/audit-logs${organizationId ? `?organizationId=${organizationId}` : ""}`),
  },
};
