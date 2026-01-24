import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useTenant } from "@/providers/TenantProvider";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { config } = useTenant();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen overflow-hidden bg-background-root">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main
          className="flex-1 overflow-y-auto p-8 bg-background-root"
        >
          <div className="h-full animate-in fade-in duration-500">
            {children}
          </div>
        </main>
        {/* Dynamic Copyright Footer */}
        <footer
          className="px-8 py-4 bg-background-root border-t border-outline-dimmer"
        >
          <div className="flex items-center justify-between">
            <p className="text-foreground-dimmer text-xs">
              © {currentYear} {config.councilName || config.shortName}. All rights reserved.
            </p>
            <p className="text-foreground-dimmest text-xs">
              Powered by LGIS v1.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
