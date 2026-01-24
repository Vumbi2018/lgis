import { MainLayout } from "@/components/layout/main-layout";
import { WorkflowManagement } from "@/components/admin/WorkflowManagement";

export default function WorkflowsPage() {
    return (
        <MainLayout>
            <div className="p-6">
                <WorkflowManagement />
            </div>
        </MainLayout>
    );
}
