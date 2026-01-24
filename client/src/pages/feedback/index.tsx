import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, CheckCircle2, History } from "lucide-react";

export default function FeedbackPage() {
    const [feedbackType, setFeedbackType] = useState("suggestion");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Mock History
    const history = [
        { id: 1, type: "Complaint", subject: "Road Pothole", date: "Jan 10, 2026", status: "Resolved" },
        { id: 2, type: "Suggestion", subject: "Park Lighting", date: "Jan 15, 2026", status: "Under Review" },
        { id: 3, type: "Praise", subject: "Staff Efficiency", date: "Jan 20, 2026", status: "Received" },
    ];

    const handleSubmit = () => {
        if (!message) return;
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(false);
            setMessage("");
            alert("Feedback submitted successfully!");
        }, 1500);
    };

    return (
        <MainLayout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100" style={{ backgroundColor: '#FFFFFF', color: '#0F0F0F' }}>
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#F4C400' }}>Citizen Feedback</h2>
                    <p className="font-medium" style={{ color: '#0F0F0F', opacity: 0.8 }}>Voice your complaints, suggestions, and compliments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-2 font-bold hover:bg-black/90" style={{ backgroundColor: '#0F0F0F', color: '#F4C400', borderColor: '#F4C400' }}>
                        <History className="mr-2 h-4 w-4" style={{ color: '#F4C400' }} />
                        My History
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Submission Form */}
                <Card className="col-span-2 shadow-sm bg-white border border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-[#F4C400]">Submit Feedback</CardTitle>
                        <CardDescription className="text-black/70 font-medium">We value your input to improve our services.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black">Feedback Type</label>
                                <Select value={feedbackType} onValueChange={setFeedbackType}>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="complaint">Complaint</SelectItem>
                                        <SelectItem value="suggestion">Suggestion</SelectItem>
                                        <SelectItem value="praise">Praise / Compliment</SelectItem>
                                        <SelectItem value="inquiry">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-black">Department (Optional)</label>
                                <Select>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Relevant Dept." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="waste">Waste Management</SelectItem>
                                        <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                                        <SelectItem value="parks">Parks & Recreation</SelectItem>
                                        <SelectItem value="licensing">Licensing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-black">Subject</label>
                            <Input placeholder="Short summary of your feedback" className="bg-gray-50 border-gray-200 focus:border-[#F4C400]" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-black">Message</label>
                            <Textarea
                                placeholder="Please maintain respectful language. Describe your feedback in detail..."
                                className="min-h-[150px] bg-gray-50 border-gray-200 focus:border-[#F4C400]"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full bg-[#0F0F0F] text-[#F4C400] hover:bg-black/90 font-bold"
                            onClick={handleSubmit}
                            disabled={submitted || !message}
                        >
                            {submitted ? (
                                <>Sending...</>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Submit Feedback
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Sidebar Status / History */}
                <div className="space-y-6">
                    <Card className="shadow-sm bg-white border border-gray-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase text-black">Community Sentiment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-around py-4">
                                <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                                        <ThumbsUp className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div className="text-xl font-black text-black">84%</div>
                                    <div className="text-xs text-gray-500">Positive</div>
                                </div>
                                <div className="h-12 w-px bg-gray-200" />
                                <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                                        <ThumbsDown className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="text-xl font-black text-black">16%</div>
                                    <div className="text-xs text-gray-500">Negative</div>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-2">Based on last 30 days metrics</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm bg-white border border-gray-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase text-black">Recent Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {history.map((item) => (
                                    <div key={item.id} className="flex items-start justify-between border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                        <div>
                                            <h4 className="font-bold text-sm text-black">{item.subject}</h4>
                                            <p className="text-xs text-gray-500">{item.type} • {item.date}</p>
                                        </div>
                                        <Badge variant="outline" className={`text-xs ${item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                item.status === 'Under Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                            }`}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
