import { Home, ClipboardCheck, CheckSquare, Briefcase, Menu } from "lucide-react";
import { useLocation } from "wouter";

export function BottomNav({ userRole }: { userRole: 'inspector' | 'manager' | 'business' }) {
    const [location, setLocation] = useLocation();

    const inspectorNavItems = [
        { icon: Home, label: "Home", path: "/mobile/dashboard" },
        { icon: ClipboardCheck, label: "Inspections", path: "/mobile/inspector/inspections" },
        { icon: Menu, label: "More", path: "/mobile/menu" },
    ];

    const managerNavItems = [
        { icon: Home, label: "Home", path: "/mobile/dashboard" },
        { icon: CheckSquare, label: "Approvals", path: "/mobile/manager/approvals" },
        { icon: Menu, label: "More", path: "/mobile/menu" },
    ];

    const businessNavItems = [
        { icon: Home, label: "Home", path: "/mobile/dashboard" },
        { icon: Briefcase, label: "Licenses", path: "/mobile/business/licenses" },
        { icon: Menu, label: "More", path: "/mobile/menu" },
    ];

    const navItems =
        userRole === 'inspector' ? inspectorNavItems :
            userRole === 'manager' ? managerNavItems :
                businessNavItems;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => setLocation(item.path)}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-[#F4C400]' : 'text-gray-500'
                                }`}
                        >
                            <Icon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
