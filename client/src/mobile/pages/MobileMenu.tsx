
import { MobileLayout } from "../MobileLayout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { LogOut, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MobileMenu() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await apiRequest("POST", "/api/logout");
            setLocation("/");
        } catch (error) {
            toast({
                title: "Logout failed",
                variant: "destructive"
            });
        }
    };

    return (
        <MobileLayout title="Menu" userRole="inspector">
            <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-12" onClick={() => { }}>
                    <User className="mr-3 h-5 w-5" /> Profile
                </Button>
                <Button variant="outline" className="w-full justify-start h-12" onClick={() => { }}>
                    <Settings className="mr-3 h-5 w-5" /> Settings
                </Button>
                <Button variant="destructive" className="w-full justify-start h-12" onClick={handleLogout}>
                    <LogOut className="mr-3 h-5 w-5" /> Logout
                </Button>
            </div>
        </MobileLayout>
    );
}
