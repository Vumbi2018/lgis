import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrganizationProvider } from "@/contexts/organization-context";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/auth/login";
import DashboardPage from "@/pages/dashboard";
import RegistryPage from "@/pages/registry/index";
import ServicesPage from "@/pages/services/index";
import LicensingPage from "@/pages/licensing/index";
import ApplicationWizard from "@/pages/licensing/apply";
import PropertiesPage from "@/pages/properties/index";
import PropertyDetailsPage from "@/pages/properties/property-details";
import RevenuePage from "@/pages/revenue/index";
import SettingsPage from "@/pages/settings/index";
import InspectionsPage from "@/pages/inspections/index";
import EnforcementPage from "@/pages/enforcement/index";
import ConfigurationPage from "@/pages/admin/configuration";
import ComplaintsPage from "@/pages/complaints/index";
import AuditLogsPage from "@/pages/admin/audit-logs";
import GISPage from "@/pages/gis/index";
import IntegrationsPage from "@/pages/admin/integrations";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/registry" component={RegistryPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/licensing" component={LicensingPage} />
      <Route path="/licensing/apply/:id" component={ApplicationWizard} />
      <Route path="/inspections" component={InspectionsPage} />
      <Route path="/enforcement" component={EnforcementPage} />
      <Route path="/complaints" component={ComplaintsPage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/:id" component={PropertyDetailsPage} />
      <Route path="/revenue" component={RevenuePage} />
      <Route path="/configuration" component={ConfigurationPage} />
      <Route path="/audit" component={AuditLogsPage} />
      <Route path="/gis" component={GISPage} />
      <Route path="/integrations" component={IntegrationsPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrganizationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </OrganizationProvider>
    </QueryClientProvider>
  );
}

export default App;
