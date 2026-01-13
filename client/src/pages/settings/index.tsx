import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, User, Bell, Shield, Database, Globe } from "lucide-react";
import { MOCK_COUNCILS, MOCK_USERS } from "@/lib/mock-data";

export default function SettingsPage() {
  const currentUser = MOCK_USERS[0];
  const currentCouncil = MOCK_COUNCILS[0];

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-black">System Settings</h2>
          <p className="text-muted-foreground">Configure global preferences and user access.</p>
        </div>
        <Button className="bg-black text-yellow-500 hover:bg-black/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organisation Profile</CardTitle>
              <CardDescription>Manage NCDC operational details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Organisation Name</Label>
                  <Input defaultValue={currentCouncil.name} />
                </div>
                <div className="space-y-2">
                  <Label>District / Region</Label>
                  <Input defaultValue={currentCouncil.district} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="support@ncdc.gov.pg" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+675 324 0700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Global defaults for the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Disable access for non-admin users.</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Force Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all staff accounts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2 pt-2">
                 <div className="space-y-2">
                  <Label>Currency Symbol</Label>
                  <Input defaultValue="PGK (K)" />
                </div>
                 <div className="space-y-2">
                  <Label>Fiscal Year Start</Label>
                  <Input defaultValue="January 1st" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage staff access and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_USERS.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.role} • {user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                ))}
                <Button variant="ghost" className="w-full border-dashed border-2">
                  + Add New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
           <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure how system alerts are delivered.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send digests and alerts via email.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Urgent alerts for enforcement officers.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
