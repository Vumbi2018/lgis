import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import logo from "@assets/NCDC_Logo_1768314184068.jpg";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiRequest("POST", "/api/login", formData);
      const user = await res.json();

      // Update global user state (assuming useUser hook or similar exists, but explicit query refetch works too)
      queryClient.setQueryData(["/api/user"], user);

      toast({
        title: "Welcome back",
        description: `Logged in as ${user.fullName}`,
      });

      // Redirect based on platform
      // Redirect based on platform and role
      const isMobile = import.meta.env.VITE_IS_MOBILE || /Android|iPhone/i.test(navigator.userAgent);

      if (isMobile) {
        // Send everyone to the main mobile dashboard for access to all modules
        setLocation("/mobile/dashboard");
      } else {
        // Role-based redirection for desktop
        if (user.role === "user") {
          setLocation("/portal");
        } else {
          setLocation("/dashboard");
        }
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Port_Moresby_Skyline.jpg/1200px-Port_Moresby_Skyline.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10">
          <div className="h-16 w-16 bg-white rounded-full p-1 mb-8">
            <img src={logo} alt="NCDC" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-yellow-500">National Capital District Commission</h1>
          <p className="text-xl text-gray-300 max-w-md">Compliance Directorate & Licensing Division Portal</p>
        </div>
        <div className="relative z-10 text-sm text-gray-500">
          &copy; 2026 NCDC. Serving Port Moresby.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center md:hidden">
            <img src={logo} alt="NCDC" className="h-20 w-20 object-contain mb-4" />
            <h2 className="text-2xl font-bold text-black">NCDC Portal</h2>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-black">Sign In</h2>
            <p className="text-gray-500">Access your compliance and licensing dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="officer@ncdc.gov.pg"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-black text-yellow-500 hover:bg-gray-900 hover:text-yellow-400 font-semibold text-lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : "Sign In"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link href="/register" className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline">
                Create one
              </Link>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Secure Government System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
