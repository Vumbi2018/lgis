import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getVersionInfo, APP_VERSION } from "@shared/version";
import { useTenant } from "@/providers/TenantProvider";
import {
    Info,
    Calendar,
    Tag,
    Code,
    Server,
    Database,
    Shield,
    Globe,
    Smartphone
} from "lucide-react";

export function AboutPage() {
    const versionInfo = getVersionInfo();
    const { config } = useTenant();

    const features = [
        { icon: Globe, name: "Multi-Tenant", description: "Support for multiple councils" },
        { icon: Shield, name: "RBAC Security", description: "Role-based access control" },
        { icon: Database, name: "PostgreSQL", description: "Enterprise database" },
        { icon: Server, name: "REST API", description: "Modern API architecture" },
        { icon: Smartphone, name: "Mobile Ready", description: "Android app available" },
        { icon: Code, name: "TypeScript", description: "Full type safety" },
    ];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">
                        Local Government Information System
                    </h1>
                    <p className="text-muted-foreground">
                        Comprehensive digital platform for PNG local government councils
                    </p>
                </div>

                {/* Version Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Version Information
                        </CardTitle>
                        <CardDescription>
                            Current application version and release details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Tag className="h-4 w-4" />
                                    Version
                                </p>
                                <Badge variant="default" className="text-lg">
                                    {versionInfo.displayVersion}
                                </Badge>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Release Date
                                </p>
                                <p className="font-medium">{versionInfo.releaseDate}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Release Name</p>
                                <p className="font-medium">{versionInfo.releaseName}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Council</p>
                                <p className="font-medium">{config.councilName || config.shortName}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Features</CardTitle>
                        <CardDescription>
                            Key capabilities of the LGIS platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                                >
                                    <feature.icon className="h-5 w-5 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-medium">{feature.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Modules */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Modules</CardTitle>
                        <CardDescription>
                            Integrated modules in this version
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Registry",
                                "Licensing",
                                "Inspections",
                                "Revenue",
                                "GIS Mapping",
                                "Enforcement",
                                "Workflows",
                                "Reporting",
                                "Administration",
                                "Mobile App"
                            ].map((module) => (
                                <Badge key={module} variant="secondary">
                                    {module}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Technical Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Frontend</p>
                                <p>React 19, TypeScript, Tailwind CSS</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Backend</p>
                                <p>Node.js, Express.js, TypeScript</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Database</p>
                                <p>PostgreSQL 15, Drizzle ORM</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Mobile</p>
                                <p>Capacitor (Android)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Separator />

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground space-y-1">
                    <p>© 2026 Local Government Information System</p>
                    <p>Developed for Papua New Guinea Local Government Councils</p>
                    <p className="text-xs">
                        Version {versionInfo.fullVersion} | Released {versionInfo.releaseDate}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
