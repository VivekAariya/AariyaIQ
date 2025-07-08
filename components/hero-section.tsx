"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
    const [currentLine, setCurrentLine] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [displayedText, setDisplayedText] = useState("");

    const lines = [
        { text: "> Welcome to AariyaIQ Learning Hub", color: "text-green-400" },
        { text: "> Initializing AI learning assistant...", color: "text-green-400" },
        { text: "> Loading course materials...", color: "text-green-400" },
        { text: "> AI: How can I help with your learning journey today?", color: "text-cyan-400" },
        { text: "> User: I want to learn about machine learning", color: "text-purple-400" },
        { text: "> AI: Great choice! Let's start with the fundamentals...", color: "text-cyan-400" },
        { text: "> AI: I'll guide you through:", color: "text-cyan-400" },
        { text: "  - Data preprocessing techniques", color: "text-green-400" },
        { text: "  - Model selection strategies", color: "text-green-400" },
        { text: "  - Training and evaluation methods", color: "text-green-400" },
        { text: "  - Deployment best practices", color: "text-green-400" },
        { text: "> AI: Ready to begin your personalized learning path?", color: "text-cyan-400" },
    ];

    useEffect(() => {
        if (currentLine >= lines.length) {
            // Reset after a delay when all lines are typed
            const timeout = setTimeout(() => {
                setCurrentLine(0);
                setDisplayedText("");
            }, 3000);
            return () => clearTimeout(timeout);
        }

        if (!isTyping) return;

        const currentLineText = lines[currentLine].text;

        if (displayedText.length < currentLineText.length) {
            // Still typing the current line
            const timeout = setTimeout(() => {
                setDisplayedText(currentLineText.substring(0, displayedText.length + 1));
            }, 50); // Adjust typing speed here
            return () => clearTimeout(timeout);
        } else {
            // Finished typing the current line, move to next after a pause
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + 1);
                setDisplayedText("");
            }, 500); // Pause between lines
            return () => clearTimeout(timeout);
        }
    }, [currentLine, displayedText, isTyping, lines]);

    return (
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black/3 backdrop-blur-sm text-white">
            <div className="container px-2 sm:px-4 md:px-6">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] gap-8">
                    {/* Left: Main content */}
                    <div className="flex flex-col justify-center p-4 sm:p-8 md:p-10 lg:p-12 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 shadow-lg relative neon-container neon-always-on overflow-visible min-w-0">
                        {/* Neon border elements */}
                        <div className="neon-right absolute"></div>
                        <div className="neon-bottom absolute"></div>
                        <div className="neon-left absolute"></div>

                        {/* Content with improved spacing */}
                        <div className="space-y-4 sm:space-y-6 md:space-y-8">
                            <div className="space-y-2 sm:space-y-3">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none whitespace-nowrap">
                                    <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                        Aariya
                                    </span>
                                    <span className="blinking-cursor bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                        IQ
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl font-medium tracking-tight sm:text-2xl xl:text-3xl/none whitespace-nowrap text-gray-200">
                                    Learning Intelligence. Leading with AI
                                </p>
                            </div>

                            <p className="max-w-full sm:max-w-[600px] text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
                                Empowering professionals with cutting-edge skills and knowledge for the digital age.
                            </p>
                        </div>

                        {/* Buttons with improved spacing */}
                        <div className="flex flex-col gap-3 min-[400px]:flex-row mt-6 sm:mt-8 md:mt-10 w-full">
                            <Link href="/courses" className="w-full min-[400px]:w-auto">
                                <Button className="w-full min-[400px]:w-auto bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/20 px-6 py-2.5">
                                    Explore Courses
                                </Button>
                            </Link>
                            <Link href="/learner/login" className="w-full min-[400px]:w-auto">
                                <Button
                                    variant="outline"
                                    className="w-full min-[400px]:w-auto border-white/20 backdrop-blur-md bg-transparent text-white hover:bg-white/10 px-6 py-2.5"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <style jsx>{`
                        .neon-always-on .neon-right,
                        .neon-always-on .neon-bottom,
                        .neon-always-on .neon-left {
                            opacity: 1;
                        }

                        .blinking-cursor {
                            position: relative;
                            animation: blink-cursor 1.2s infinite;
                            text-shadow:
                                0 0 10px rgba(6, 182, 212, 0.7),
                                0 0 20px rgba(6, 182, 212, 0.5);
                        }

                        @keyframes blink-cursor {
                            0%,
                            100% {
                                opacity: 1;
                            }
                            40% {
                                opacity: 1;
                            }
                            50% {
                                opacity: 0.5;
                            }
                            60% {
                                opacity: 1;
                            }
                        }

                        @media (max-width: 1023px) {
                            .neon-always-on .neon-right,
                            .neon-always-on .neon-bottom,
                            .neon-always-on .neon-left {
                                opacity: 0.7;
                            }
                        }
                    `}</style>
                    {/* Right: Terminal animation */}
                    <div className="flex items-center justify-center w-full min-w-0">
                        <div className="relative w-full max-w-[95vw] sm:max-w-[400px] h-[220px] sm:h-[350px] rounded-lg bg-black/30 backdrop-blur-xl border border-white/10 shadow-lg neon-container neon-always-on overflow-visible">
                            {/* Neon border elements */}
                            <div className="neon-right absolute"></div>
                            <div className="neon-bottom absolute"></div>
                            <div className="neon-left absolute"></div>

                            {/* Terminal content with overflow hidden */}
                            <div className="absolute inset-0 overflow-hidden rounded-lg">
                                {/* Terminal Header */}
                                <div className="h-8 w-full bg-gray-800/80 flex items-center px-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-gray-400 text-xs mx-auto">AI Learning Assistant</div>
                                </div>

                                {/* Terminal Content */}
                                <div
                                    className="p-2 sm:p-4 overflow-hidden h-[calc(100%-2rem)]"
                                    style={{
                                        fontFamily:
                                            "'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Menlo', 'Monaco', 'Consolas', monospace",
                                        fontSize: "0.8rem",
                                        lineHeight: "1.5",
                                        color: "#4ade80",
                                    }}
                                >
                                    <div className="space-y-1 sm:space-y-2">
                                        {/* Display completed lines */}
                                        {lines.slice(0, currentLine).map((line, index) => (
                                            <p key={index} className={`whitespace-nowrap ${line.color}`}>
                                                {line.text}
                                            </p>
                                        ))}

                                        {/* Current typing line with cursor */}
                                        {currentLine < lines.length && (
                                            <div
                                                className={`whitespace-nowrap inline-flex items-center ${lines[currentLine].color}`}
                                            >
                                                <span>{displayedText}</span>
                                                <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-cursor-blink"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
