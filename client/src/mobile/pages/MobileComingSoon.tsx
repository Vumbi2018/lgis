
import { MobileLayout } from "../MobileLayout";
import { Hammer } from "lucide-react";

export default function MobileComingSoon() {
    return (
        <MobileLayout title="Coming Soon" userRole="manager">
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                    <Hammer className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="font-bold text-lg">Under Construction</h3>
                <p className="text-sm text-gray-500 px-8">This module is currently being optimized for the mobile experience.</p>
            </div>
        </MobileLayout>
    )
}
