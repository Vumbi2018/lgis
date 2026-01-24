import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OrganizationProvider } from "@/contexts/organization-context";
import { TenantProvider } from "@/providers/TenantProvider";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import PortalDashboard from "@/pages/portal/index";
import BusinessRegistrationPage from "@/pages/portal/business-registration";
import ApplyPage from "@/pages/licensing/apply";
import DashboardPage from "@/pages/dashboard";
import RegistryPage from "@/pages/registry/index";
import ServicesPage from "@/pages/services/index";
import LicensingPage from "@/pages/licensing/index";
import RequestDetailsPage from "@/pages/licensing/request-details";
import ApplicationManagementPage from "@/pages/licensing/management";
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
import VerificationQueuePage from "@/pages/admin/verification-queue";
import AdminInspectionsPage from "@/pages/admin/inspections";
import VerificationPage from "@/pages/public/verify";
import WastePage from "@/pages/waste/index";
import NotificationsPage from "@/pages/notifications/index";
import MobileAppPage from "@/pages/mobile/index";
import FleetPage from "@/pages/fleet/index";
import FeedbackPage from "@/pages/feedback/index";
import EnvironmentPage from "@/pages/environment/index";
import BuildingControlPage from "@/pages/building/index";
import ReportsPage from "@/pages/reports/index";
import DocumentsPage from "@/pages/documents/index";
import WorkflowsPage from "@/pages/workflows/index";
import WorkflowDetailsPage from "@/pages/workflows/workflow-details";
import PlanningPage from "@/pages/planning/index";
import AssetsPage from "@/pages/assets/index";
import ProcurementPage from "@/pages/procurement/index";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/portal" component={PortalDashboard} />
      <Route path="/portal/register-business" component={BusinessRegistrationPage} />
      <Route path="/portal/apply" component={ApplyPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/registry" component={RegistryPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/licensing" component={LicensingPage} />
      <Route path="/licensing/requests/:id" component={RequestDetailsPage} />
      <Route path="/licensing/manage" component={ApplicationManagementPage} />
      <Route path="/licensing/apply/:id" component={ApplicationWizard} />
      <Route path="/inspections" component={InspectionsPage} />
      <Route path="/enforcement" component={EnforcementPage} />
      <Route path="/complaints" component={ComplaintsPage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/:id" component={PropertyDetailsPage} />
      <Route path="/revenue" component={RevenuePage} />
      <Route path="/configuration" component={ConfigurationPage} />
      <Route path="/admin/verification" component={VerificationQueuePage} />
      <Route path="/admin/inspections" component={AdminInspectionsPage} />
      <Route path="/audit" component={AuditLogsPage} />
      <Route path="/gis" component={GISPage} />
      <Route path="/integrations" component={IntegrationsPage} />
      <Route path="/verify/:licenceNo" component={VerificationPage} />
      <Route path="/waste" component={WastePage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/mobile" component={MobileAppPage} />
      <Route path="/fleet" component={FleetPage} />
      <Route path="/feedback" component={FeedbackPage} />
      <Route path="/environment" component={EnvironmentPage} />
      <Route path="/building" component={BuildingControlPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/documents" component={DocumentsPage} />
      <Route path="/workflows" component={WorkflowsPage} />
      <Route path="/planning" component={PlanningPage} />
      <Route path="/workflows/:id" component={WorkflowDetailsPage} />
      <Route path="/workflows" component={WorkflowsPage} />
      <Route path="/planning" component={PlanningPage} />
      <Route path="/workflows/:id" component={WorkflowDetailsPage} />
      <Route path="/assets" component={AssetsPage} />
      <Route path="/procurement" component={ProcurementPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <OrganizationProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </OrganizationProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
}

export default App;
