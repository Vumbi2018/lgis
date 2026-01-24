import { useState, useEffect } from "react";
import { Clock, Calendar, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeBanner() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

    return (
        <Card
            className="relative overflow-hidden border border-[#F4C400] shadow-lg mb-8 group bg-[#FFFFFF] text-[#0F0F0F] rounded-xl"
        >
            {/* Decorative accent */}
            <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl transition-all bg-[#F4C400] opacity-10"
            />
            <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full -ml-24 -mb-24 blur-3xl bg-[#F4C400] opacity-5"
            />

            <CardContent className="relative p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div
                        className="p-4 rounded-xl shadow-lg animate-pulse flex items-center justify-center bg-[#F4C400]/10 border border-[#F4C400]/20"
                    >
                        <Sun className="h-8 w-8 text-[#F4C400]" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#0F0F0F]">
                            Welcome back, <span className="text-[#F4C400]">System Administrator</span>
                        </h1>
                        <p className="mt-1 flex items-center gap-2 text-[#0F0F0F] opacity-80 font-medium">
                            <Calendar className="h-4 w-4 text-[#F4C400]" />
                            {formatDate(time)}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-4 backdrop-blur-md rounded-2xl p-4 px-8 border shadow-inner bg-white border-[#F4C400]/20"
                >
                    <Clock className="h-6 w-6 animate-spin-slow text-[#F4C400]" />
                    <div className="flex flex-col">
                        <span
                            className="text-2xl font-black tracking-wider tabular-nums font-mono text-[#0F0F0F]"
                        >
                            {formatTime(time)}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F0F0F] opacity-60">
                            Current System Time
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
