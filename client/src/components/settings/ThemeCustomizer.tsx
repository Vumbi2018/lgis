import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Save, RotateCcw, Eye, Download, Upload, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Theme Customization Component
 * Allows administrators to customize LGIS brand colors while maintaining
 * government-grade design standards and WCAG 2.2 AA accessibility
 */

interface ColorToken {
    name: string;
    variable: string;
    value: string;
    description: string;
    category: 'brand' | 'ui' | 'status' | 'component';
    wcagRequirement?: string;
}

const DEFAULT_THEME: ColorToken[] = [
    // Brand Colors
    {
        name: 'Primary Brand Color',
        variable: '--color-brand-primary',
        value: '#F4C400',
        description: 'Main brand color for CTAs, highlights, and active states',
        category: 'brand',
        wcagRequirement: 'AA on white background'
    },
    {
        name: 'Primary Hover',
        variable: '--color-brand-primary-hover',
        value: '#DDB200',
        description: 'Hover state for primary brand color',
        category: 'brand'
    },
    {
        name: 'Primary Active',
        variable: '--color-brand-primary-active',
        value: '#C29F00',
        description: 'Active/pressed state for primary brand color',
        category: 'brand'
    },

    // UI Foundation
    {
        name: 'UI Black',
        variable: '--color-ui-black',
        value: '#0F0F0F',
        description: 'Sidebar, headers, primary text',
        category: 'ui',
        wcagRequirement: 'AAA on white'
    },
    {
        name: 'UI White',
        variable: '--color-ui-white',
        value: '#FFFFFF',
        description: 'Cards and content surfaces',
        category: 'ui'
    },
    {
        name: 'Page Background',
        variable: '--color-ui-background',
        value: '#FFF2B2',
        description: 'Main page workspace background',
        category: 'ui'
    },
    {
        name: 'Border Color',
        variable: '--color-ui-border',
        value: '#E5E5E5',
        description: 'Dividers and card borders',
        category: 'ui'
    },

    // Status Colors
    {
        name: 'Success (Approved)',
        variable: '--color-status-success',
        value: '#1E8E3E',
        description: 'Approved, completed states',
        category: 'status',
        wcagRequirement: 'AA on white'
    },
    {
        name: 'Warning (Pending)',
        variable: '--color-status-warning',
        value: '#FFD84D',
        description: 'Pending, review states',
        category: 'status'
    },
    {
        name: 'Error (Rejected)',
        variable: '--color-status-error',
        value: '#D93025',
        description: 'Rejected, invalid states',
        category: 'status',
        wcagRequirement: 'AA on white'
    },

    // Component Specific
    {
        name: 'Sidebar Background',
        variable: '--sidebar-background',
        value: '#0F0F0F',
        description: 'Left navigation sidebar',
        category: 'component'
    },
    {
        name: 'Sidebar Active Item',
        variable: '--sidebar-item-active-bg',
        value: '#F4C400',
        description: 'Active sidebar menu item',
        category: 'component'
    },
    {
        name: 'Header Background',
        variable: '--header-background',
        value: '#FFFFFF',
        description: 'Top header bar',
        category: 'component'
    },
];

export function ThemeCustomizer() {
    const [theme, setTheme] = useState<ColorToken[]>(DEFAULT_THEME);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const { toast } = useToast();

    // Update a color value
    const updateColor = (variable: string, newValue: string) => {
        setTheme(prev =>
            prev.map(token =>
                token.variable === variable
                    ? { ...token, value: newValue }
                    : token
            )
        );
        setUnsavedChanges(true);
    };

    // Apply theme to DOM
    const applyTheme = () => {
        const root = document.documentElement;
        theme.forEach(token => {
            root.style.setProperty(token.variable, token.value);
        });
        setUnsavedChanges(false);

        toast({
            title: 'Theme Applied',
            description: 'Your custom theme has been applied successfully.',
        });
    };

    // Save theme to database
    const saveTheme = async () => {
        try {
            // TODO: Implement API call to save theme
            const response = await fetch('/api/v1/theme/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    theme: theme.reduce((acc, token) => ({
                        ...acc,
                        [token.variable]: token.value
                    }), {})
                })
            });

            if (!response.ok) throw new Error('Failed to save theme');

            setUnsavedChanges(false);
            toast({
                title: 'Theme Saved',
                description: 'Your custom theme has been saved to the database.',
            });
        } catch (error) {
            toast({
                title: 'Save Failed',
                description: 'Could not save theme. Please try again.',
                variant: 'destructive',
            });
        }
    };

    // Reset to default government theme
    const resetTheme = () => {
        setTheme(DEFAULT_THEME);
        setUnsavedChanges(true);
        applyTheme();

        toast({
            title: 'Theme Reset',
            description: 'Default LGIS government theme restored.',
        });
    };

    // Export theme as JSON
    const exportTheme = () => {
        const themeData = theme.reduce((acc, token) => ({
            ...acc,
            [token.variable]: token.value
        }), {});

        const blob = new Blob([JSON.stringify(themeData, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lgis-theme.json';
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: 'Theme Exported',
            description: 'Theme configuration downloaded as JSON.',
        });
    };

    // Import theme from JSON
    const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                const newTheme = theme.map(token => ({
                    ...token,
                    value: imported[token.variable] || token.value
                }));
                setTheme(newTheme);
                setUnsavedChanges(true);

                toast({
                    title: 'Theme Imported',
                    description: 'Theme loaded from file. Click Apply to see changes.',
                });
            } catch (error) {
                toast({
                    title: 'Import Failed',
                    description: 'Invalid theme file format.',
                    variant: 'destructive',
                });
            }
        };
        reader.readAsText(file);
    };

    // Calculate contrast ratio for accessibility check
    const getContrastRatio = (hex1: string, hex2: string): number => {
        const getLuminance = (hex: string): number => {
            const rgb = parseInt(hex.slice(1), 16);
            const r = ((rgb >> 16) & 0xff) / 255;
            const g = ((rgb >> 8) & 0xff) / 255;
            const b = ((rgb >> 0) & 0xff) / 255;

            const [rs, gs, bs] = [r, g, b].map(c =>
                c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
            );

            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };

        const l1 = getLuminance(hex1);
        const l2 = getLuminance(hex2);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    };

    // Check if color meets WCAG requirements
    const checkAccessibility = (color: string, background: string = '#FFFFFF'): {
        ratio: number;
        aa: boolean;
        aaa: boolean;
    } => {
        const ratio = getContrastRatio(color, background);
        return {
            ratio,
            aa: ratio >= 4.5,
            aaa: ratio >= 7
        };
    };

    const ColorPicker = ({ token }: { token: ColorToken }) => {
        const accessibility = token.wcagRequirement
            ? checkAccessibility(token.value)
            : null;

        return (
            <div className="space-y-2 p-4 border border-ui-border rounded-md bg-card">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <Label className="font-semibold text-sm text-foreground">
                            {token.name}
                        </Label>
                        <p className="text-xs text-foreground-dimmer mt-1">
                            {token.description}
                        </p>
                        <code className="text-xs text-foreground-dimmest mt-1 block">
                            {token.variable}
                        </code>
                    </div>

                    <div className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 rounded border-2 border-ui-border flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: token.value }}
                        >
                            {/* Show contrast text for accessibility test */}
                            {token.category === 'brand' && (
                                <span className="text-xs font-bold" style={{ color: '#FFFFFF' }}>
                                    Aa
                                </span>
                            )}
                        </div>
                        <Input
                            type="color"
                            value={token.value}
                            onChange={(e) => updateColor(token.variable, e.target.value)}
                            className="w-20 h-12 p-1 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <Input
                        type="text"
                        value={token.value}
                        onChange={(e) => updateColor(token.variable, e.target.value)}
                        className="w-32 text-xs font-mono"
                        placeholder="#000000"
                    />

                    {accessibility && (
                        <div className="flex gap-1">
                            <Badge
                                variant={accessibility.aa ? 'default' : 'destructive'}
                                className="text-xs"
                            >
                                {accessibility.aa ? '✓' : '✗'} AA ({accessibility.ratio.toFixed(2)}:1)
                            </Badge>
                            {token.wcagRequirement?.includes('AAA') && (
                                <Badge
                                    variant={accessibility.aaa ? 'default' : 'secondary'}
                                    className="text-xs"
                                >
                                    {accessibility.aaa ? '✓' : '✗'} AAA
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const brandColors = theme.filter(t => t.category === 'brand');
    const uiColors = theme.filter(t => t.category === 'ui');
    const statusColors = theme.filter(t => t.category === 'status');
    const componentColors = theme.filter(t => t.category === 'component');

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Palette className="h-6 w-6 text-accent-primary-default" />
                            <div>
                                <CardTitle>Theme Customization</CardTitle>
                                <CardDescription>
                                    Customize LGIS brand colors while maintaining government-grade standards
                                </CardDescription>
                            </div>
                        </div>
                        {unsavedChanges && (
                            <Badge variant="warning">Unsaved Changes</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={applyTheme} disabled={!unsavedChanges}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Changes
                        </Button>
                        <Button onClick={saveTheme} disabled={!unsavedChanges}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Theme
                        </Button>
                        <Button onClick={resetTheme} variant="secondary">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset to Default
                        </Button>
                        <Button onClick={exportTheme} variant="secondary">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="secondary" asChild>
                            <label>
                                <Upload className="h-4 w-4 mr-2" />
                                Import
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={importTheme}
                                    className="sr-only"
                                />
                            </label>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Color Groups */}
            <Tabs defaultValue="brand" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="brand">Brand Colors</TabsTrigger>
                    <TabsTrigger value="ui">UI Foundation</TabsTrigger>
                    <TabsTrigger value="status">Status Colors</TabsTrigger>
                    <TabsTrigger value="components">Components</TabsTrigger>
                </TabsList>

                <TabsContent value="brand" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Brand Identity</CardTitle>
                            <CardDescription>
                                Primary brand colors for CTAs, highlights, and active states.
                                Must maintain WCAG AA contrast on white backgrounds.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {brandColors.map(token => (
                                <ColorPicker key={token.variable} token={token} />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ui" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">UI Foundation Colors</CardTitle>
                            <CardDescription>
                                Core colors for backgrounds, text, and borders.
                                These affect the overall page appearance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {uiColors.map(token => (
                                <ColorPicker key={token.variable} token={token} />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="status" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Workflow & Status Colors</CardTitle>
                            <CardDescription>
                                Colors for application states, badges, and workflow indicators.
                                Must be distinguishable and accessible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {statusColors.map(token => (
                                <ColorPicker key={token.variable} token={token} />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="components" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Component-Specific Colors</CardTitle>
                            <CardDescription>
                                Colors for sidebar, header, and other major UI components.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {componentColors.map(token => (
                                <ColorPicker key={token.variable} token={token} />
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Design Guidelines */}
            <Card className="border-warning-dimmer bg-warning-dimmest">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        Design Guidelines
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p><strong>• WCAG 2.2 AA Required:</strong> All text must meet minimum 4.5:1 contrast ratio</p>
                    <p><strong>• Yellow Restriction:</strong> Never use yellow (#F4C400) for paragraph text</p>
                    <p><strong>• Status Colors:</strong> Red and green must always include text labels or icons</p>
                    <p><strong>• No Gradients:</strong> Avoid gradients in core workflows for consistency</p>
                    <p><strong>• Print-Friendly:</strong> Colors should work in black & white printouts</p>
                </CardContent>
            </Card>
        </div>
    );
}
