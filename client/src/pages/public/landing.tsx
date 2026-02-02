import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, FileText, UserPlus, LogIn, Search, Map } from "lucide-react";
import logo from "@assets/NCDC_Logo_1768314184068.jpg";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const { data: user } = useQuery<any>({ queryKey: ["/api/user"] });

    const handleServiceClick = (path: string) => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please sign in or register to access this service.",
                variant: "destructive"
            });
            setLocation("/login");
            return;
        }
        setLocation(path);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="NCDC Logo" className="h-10 w-10 object-contain" />
                        <div className="hidden md:block">
                            <h1 className="text-lg font-bold text-gray-900 leading-none">NCDC</h1>
                            <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wider">Licensing & Compliance</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-black text-yellow-500 hover:bg-gray-900">
                                Register
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Port_Moresby_Skyline.jpg/1200px-Port_Moresby_Skyline.jpg')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6 border border-yellow-500/30">
                            Digital Services Portal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            Access Council Services <span className="text-yellow-500">Online & Anytime</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                            Register your business, apply for licenses, and manage compliance obligations with the National Capital District Commission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register">
                                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold h-12 px-8 text-lg">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/verify">
                                <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-800 text-white h-12 px-8">
                                    Verify a License
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Online Services</h2>
                        <p className="text-gray-500 text-lg">
                            We've digitized our most requested services to save you time and improve transparency.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ServiceCard
                            icon={<Building2 className="h-8 w-8 text-yellow-600" />}
                            title="Business Registration"
                            description="Register your trading entity and manage operational details securely online."
                            onClick={() => handleServiceClick("/portal/register-business")}
                        />
                        <ServiceCard
                            icon={<FileText className="h-8 w-8 text-yellow-600" />}
                            title="Licensing & Permits"
                            description="Apply for new licenses, renew existing ones, and track application status in real-time."
                            onClick={() => handleServiceClick("/licensing")}
                        />
                        <ServiceCard
                            icon={<Map className="h-8 w-8 text-yellow-600" />}
                            title="Regulatory Compliance"
                            description="View inspection reports, pay fees, and ensure your business meets all council regulations."
                            onClick={() => handleServiceClick("/inspections")}
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl font-bold text-gray-900">Simple 3-Step Process</h2>

                            <Step
                                number="1"
                                title="Create an Account"
                                description="Sign up with your email to create a secure citizen profile."
                            />
                            <Step
                                number="2"
                                title="Complete Your Profile"
                                description="Add your business details and required documentation once."
                            />
                            <Step
                                number="3"
                                title="Access Services"
                                description="Apply for licenses, pay fees, and track requests from your dashboard."
                            />
                        </div>
                        <div className="flex-1 bg-yellow-100 rounded-3xl p-8 md:p-12">
                            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono">dashboard.ncdc.gov.pg</div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <Building2 className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-10 bg-gray-50 rounded border border-gray-100 w-full"></div>
                                        <div className="h-10 bg-gray-50 rounded border border-gray-100 w-full"></div>
                                    </div>
                                    <div className="h-10 bg-black rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <img src={logo} alt="NCDC" className="h-8 w-8 opacity-50 grayscale" />
                            <span className="text-sm font-medium">National Capital District Commission</span>
                        </div>
                        <p className="text-sm">&copy; 2026 NCDC. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function ServiceCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick?: () => void }) {
    return (
        <Card
            className="border-none shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            onClick={onClick}
        >
            <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-4">
                    {icon}
                </div>
                <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base text-gray-500 leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-yellow-500 font-bold flex items-center justify-center border-2 border-yellow-500">
                {number}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );
}
