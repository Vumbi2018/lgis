import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/mock-data";
import logo from "@assets/NCDC_Logo_1768314184068.jpg";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-6 bg-white/5">
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-white p-0.5">
           <img src={logo} alt="NCDC Logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-white">NCDC</span>
          <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Compliance Portal</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.url || location.startsWith(item.url + "/");
            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md translate-x-1"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:pl-4"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70")} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4 bg-black/20">
        <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
          <p className="text-[10px] font-bold text-yellow-500 uppercase mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-medium text-white">Online & Synced</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
