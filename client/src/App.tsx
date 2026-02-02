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
import BusinessDetailsPage from "@/pages/registry/business-details";
import ServicesPage from "@/pages/services/index";
import LicensingPage from "@/pages/licensing/index";
import RequestDetailsPage from "@/pages/licensing/request-details";
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
import VerificationSearchPage from "@/pages/public/verify-search";
import LandingPage from "@/pages/public/landing";
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
import AboutPage from "@/pages/about/index";
import InspectionsList from "@/mobile/pages/InspectionsList";
import InspectionPerform from "@/mobile/pages/InspectionPerform";
import ApprovalQueue from "@/mobile/pages/ApprovalQueue";
import ApprovalDetail from "@/mobile/pages/ApprovalDetail";
import BusinessDashboard from "@/mobile/pages/BusinessDashboard";
import LicenseViewer from "@/mobile/pages/LicenseViewer";
import InspectionMap from "@/mobile/pages/InspectionMap";
import NearbyLicenses from "@/mobile/pages/NearbyLicenses";
import MobileMenu from "@/mobile/pages/MobileMenu";
import MobileDashboard from "@/mobile/pages/MobileDashboard";
import MobileLicensing from "@/mobile/pages/MobileLicensing";
import MobileBusinessList from "@/mobile/pages/MobileBusinessList";
import MobileComingSoon from "@/mobile/pages/MobileComingSoon";
import MobileApply from "@/mobile/pages/MobileApply";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/portal" component={PortalDashboard} />
      <Route path="/portal/register-business" component={BusinessRegistrationPage} />
      <Route path="/portal/apply" component={ApplyPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/registry/business/:id" component={BusinessDetailsPage} />
      <Route path="/registry" component={RegistryPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/licensing" component={LicensingPage} />
      <Route path="/licensing/requests/:id" component={RequestDetailsPage} />
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
      <Route path="/verify" component={VerificationSearchPage} />
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
      <Route path="/about" component={AboutPage} />

      {/* Mobile Routes */}
      <Route path="/mobile/dashboard" component={MobileDashboard} />
      <Route path="/mobile/licensing" component={MobileLicensing} />
      <Route path="/mobile/licensing/apply" component={MobileApply} />
      <Route path="/mobile/businesses" component={MobileBusinessList} />
      <Route path="/mobile/revenue" component={MobileComingSoon} />
      <Route path="/mobile/enforcement" component={MobileComingSoon} />
      <Route path="/mobile/citizens" component={MobileComingSoon} />
      <Route path="/mobile/inspector/inspections" component={InspectionsList} />
      <Route path="/mobile/inspector" component={InspectionsList} />
      <Route path="/mobile/menu" component={MobileMenu} />
      <Route path="/mobile/inspector/inspection/:id" component={InspectionPerform} />
      <Route path="/mobile/manager/approvals" component={ApprovalQueue} />
      <Route path="/mobile/manager" component={ApprovalQueue} />
      <Route path="/mobile/business" component={BusinessDashboard} />
      <Route path="/mobile/business/licenses" component={BusinessDashboard} />
      <Route path="/mobile/business/license/:id" component={LicenseViewer} />
      <Route path="/mobile/inspector/map" component={InspectionMap} />
      <Route path="/mobile/business/nearby" component={NearbyLicenses} />

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
