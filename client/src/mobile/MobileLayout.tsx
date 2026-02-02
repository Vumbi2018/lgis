import { ReactNode } from "react";
import { BottomNav } from "./components/BottomNav";
import { MobileHeader } from "./components/MobileHeader";

interface MobileLayoutProps {
    children: ReactNode;
    title: string;
    userRole: 'inspector' | 'manager' | 'business';
    showBack?: boolean;
    onBack?: () => void;
}

export function MobileLayout({ children, title, userRole, showBack, onBack }: MobileLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <MobileHeader title={title} showBack={showBack} onBack={onBack} />
            <main className="p-4">
                {children}
            </main>
            <BottomNav userRole={userRole} />
        </div>
    );
}
