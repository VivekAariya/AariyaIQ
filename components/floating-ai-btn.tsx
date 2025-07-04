"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import logger from "@/utils/logger";

interface FloatingAIAssistantProps {
    delay?: number;
    showOnPages?: string[];
}

export function FloatingAIBtn({ delay = 3000, showOnPages = ["/"] }: FloatingAIAssistantProps) {
    const [supabase] = useState(createClient());
    const [user, setUser] = useState<User | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const handleDismiss = () => {
        setIsDismissed(true);
        localStorage.setItem("ai-assistant-dismissed", "true");
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        // Check if user has dismissed the assistant before
        // const dismissed = localStorage.getItem("ai-assistant-dismissed");
        // if (dismissed) {
        //     setIsDismissed(true);
        //     return;
        // }

        // Show the assistant after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                    throw new Error("Error fetching user data");
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    if (isDismissed || !isVisible || !user) return null;

    return (
        <div className={`fixed bottom-6 right-6 z-50`}>
            {/* Floating Button */}
            <div className="relative">
                {/* Animated rings */}
                <div className="absolute inset-0 animate-ping">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-sm"></div>
                </div>
                <div className="absolute inset-0 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30"></div>
                </div>

                {/* Main Button */}
                <div
                    onClick={handleExpand}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border border-cyan-400/30 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-cyan-500/40"
                >
                    <Bot className="w-9 h-9 text-white" />
                </div>

                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-3 h-3 text-white" />
                </div>
            </div>

            {/* Expanded Panel */}
            {isExpanded && (
                <div className="absolute bottom-20 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Neon border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 p-[1px]">
                        <div className="w-full h-full bg-slate-900/95 rounded-2xl"></div>
                    </div>

                    <div className="relative p-6">
                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    AI Learning Assistant
                                </h3>
                                <p className="text-sm text-gray-400">Powered by AariyaIQ</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                🚀 Unlock the power of AI in your learning journey! Our advanced AI tools can help you:
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span>Create custom practice questions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    <span>Get instant summaries and cheat sheets</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span>Generate visual diagrams & summaries</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-2 pt-2">
                                <Link href={`/${user?.user_metadata?.role}/dashboard/courses`} className="w-full">
                                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium transition-all duration-300 hover:scale-105">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Explore AI Tools
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    className="w-full border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300 bg-transparent"
                                    onClick={() => setIsExpanded(false)}
                                >
                                    Maybe Later
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
