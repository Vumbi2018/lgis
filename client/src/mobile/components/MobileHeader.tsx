import { ArrowLeft, Bell, User } from "lucide-react";
import { useLocation } from "wouter";

interface MobileHeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

export function MobileHeader({ title, showBack = false, onBack }: MobileHeaderProps) {
    const [, setLocation] = useLocation();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    return (
        <header className="sticky top-0 left-0 right-0 bg-white border-b border-gray-200 safe-area-top z-40">
            <div className="flex items-center justify-between h-14 px-4">
                <div className="flex items-center gap-3 flex-1">
                    {showBack && (
                        <button
                            onClick={handleBack}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Go back"
                            title="Go back"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    )}
                    <h1 className="text-lg font-bold truncate">{title}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        aria-label="Notifications"
                        title="Notifications"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setLocation('/mobile/profile')}
                        aria-label="User Profile"
                        title="User Profile"
                    >
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
