import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/mock-data";
import logo from "@assets/generated_images/minimalist_government_coat_of_arms_logo_navy_blue_and_gold_vector_flat.png";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <img src={logo} alt="LGIS Logo" className="h-8 w-8 object-contain" />
        <span className="text-lg font-bold tracking-tight">LGIS Portal</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.url;
            return (
              <Link key={item.url} href={item.url}>
                <a
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent/50 p-4">
          <p className="text-xs font-medium text-sidebar-foreground/70">System Version</p>
          <p className="text-sm font-bold text-sidebar-foreground">v2.4.0 (Stable)</p>
        </div>
      </div>
    </aside>
  );
}
