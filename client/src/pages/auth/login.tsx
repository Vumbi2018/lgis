import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_COUNCILS } from "@/lib/mock-data";
import logo from "@assets/generated_images/minimalist_government_coat_of_arms_logo_navy_blue_and_gold_vector_flat.png";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary/30 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <Card className="relative z-10 w-full max-w-md border-t-4 border-t-primary shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">LGIS Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access the Local Government Information System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="council">Select Council</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select Council" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_COUNCILS.map((council) => (
                    <SelectItem key={council.id} value={council.id}>
                      {council.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="officer@council.go.ug" defaultValue="admin@kcca.go.ug" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-secondary/50 p-4 text-xs text-muted-foreground">
          &copy; 2026 Ministry of Local Government. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  );
}
