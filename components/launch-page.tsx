"use client";

import { submitLaunchInterest } from "@/app/actions/launch-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { Award, BookOpen, CalendarDays, Instagram, Linkedin, Mail, MapPin, Rocket, Twitter, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export function LaunchPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const launchDate = new Date("2025-07-14T10:00:00Z"); // 10 AM UTC on July 14, 2025

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Show toast when email is sent successfully
    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Thank you for your interest!",
                description: state.message,
            });
            // Clear form
            setEmail("");
            setName("");
            setMessage("");
        } else if (state?.error) {
            toast({
                title: "Error",
                description: state.error,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await submitLaunchInterest(null, formData);
            setState(result);
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <style jsx global>{`
                @keyframes blink {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0;
                    }
                }

                .blinking-iq {
                    display: inline-block;
                    color: #22d3ee;
                    animation: blink 1s infinite;
                }

                .video-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 1;
                }

                .video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 2;
                }
            `}</style>

            {/* Background Container */}
            <div className="absolute inset-0 w-full h-full">
                {/* Fallback Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 z-0"></div>

                {/* Video Background - Direct Blob URL */}
                <video
                    className="video-background"
                    autoPlay
                    loop
                    muted
                    playsInline
                    crossOrigin="anonymous"
                    onError={(e) => {
                        logger.error("Video failed to load:", e);
                        e.currentTarget.style.display = "none";
                    }}
                    onLoadStart={() => console.log("Video loading started")}
                    onCanPlay={() => console.log("Video can play")}
                    onLoadedData={() => console.log("Video loaded")}
                >
                    <source
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250603_0110_Futuristic%20Classroom%20Exploration_simple_compose_01jwshzspxemea6vp8gk64d9x3-gYGgAxIVPws6Ow6KwHEiu2cSeRMaP7.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Dark Overlay */}
                <div className="video-overlay"></div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-20 min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-6">
                    <div className="container mx-auto flex justify-end items-center">
                        <Badge variant="outline" className="border-cyan-400 text-cyan-400 bg-black/30 backdrop-blur-sm">
                            Coming Soon
                        </Badge>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Main Content */}
                            <div className="text-center lg:text-left space-y-8">
                                <div className="space-y-4">
                                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                            Aariya
                                        </span>
                                        <span className="blinking-iq">IQ</span>
                                    </h1>
                                    <h2 className="text-2xl lg:text-3xl text-gray-100 font-semibold drop-shadow-lg">
                                        Learning Intelligence. Leading with AI
                                    </h2>
                                    <p className="text-lg text-gray-200 max-w-2xl drop-shadow-md">
                                        Empowering professionals with cutting-edge skills and knowledge for the digital
                                        age. Join us for the official launch from our Brighton office.
                                    </p>
                                </div>

                                {/* Launch Details */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2 text-cyan-300 drop-shadow-md">
                                        <CalendarDays className="w-5 h-5" />
                                        <span className="font-semibold">July 14th, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-purple-300 drop-shadow-md">
                                        <MapPin className="w-5 h-5" />
                                        <span className="font-semibold">Brighton Office</span>
                                    </div>
                                </div>

                                {/* Features Preview */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                                    <div className="text-center p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20">
                                        <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                        <h3 className="text-white font-semibold">Expert Courses</h3>
                                        <p className="text-gray-300 text-sm">Industry-leading curriculum</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20">
                                        <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                        <h3 className="text-white font-semibold">AI-Powered Learning</h3>
                                        <p className="text-gray-300 text-sm">Personalized experience</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20">
                                        <Award className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                                        <h3 className="text-white font-semibold">Certification</h3>
                                        <p className="text-gray-300 text-sm">Industry-recognized credentials</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Countdown & Signup */}
                            <div className="space-y-8">
                                {/* Countdown Timer */}
                                <Card className="bg-black/60 backdrop-blur-md border-white/30">
                                    <CardContent className="p-8">
                                        <div className="text-center space-y-6">
                                            <div className="flex items-center justify-center gap-2 mb-4">
                                                <Rocket className="w-6 h-6 text-cyan-400" />
                                                <h3 className="text-2xl font-bold text-white">Launch Countdown</h3>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4">
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-4 mb-2">
                                                        <div className="text-3xl font-bold text-white">
                                                            {timeLeft.days}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-300 text-sm">Days</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-4 mb-2">
                                                        <div className="text-3xl font-bold text-white">
                                                            {timeLeft.hours}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-300 text-sm">Hours</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-4 mb-2">
                                                        <div className="text-3xl font-bold text-white">
                                                            {timeLeft.minutes}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-300 text-sm">Minutes</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-4 mb-2">
                                                        <div className="text-3xl font-bold text-white">
                                                            {timeLeft.seconds}
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-300 text-sm">Seconds</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Enhanced Email Signup */}
                                <Card className="bg-black/60 backdrop-blur-md border-white/30">
                                    <CardContent className="p-8">
                                        <div className="text-center space-y-6">
                                            <div className="flex items-center justify-center gap-2 mb-4">
                                                <Mail className="w-6 h-6 text-purple-400" />
                                                <h3 className="text-2xl font-bold text-white">Get Notified</h3>
                                            </div>

                                            <p className="text-gray-300">
                                                Be the first to know when AariyaIQ launches. Get exclusive early access
                                                and special offers.
                                            </p>

                                            <form action={handleSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Your Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                                                        required
                                                    />
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Your Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                                                        required
                                                    />
                                                </div>

                                                <textarea
                                                    name="message"
                                                    placeholder="What interests you most about AariyaIQ? (Optional)"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    rows={3}
                                                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                                                />

                                                <Button
                                                    type="submit"
                                                    disabled={isPending}
                                                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold"
                                                >
                                                    {isPending ? "Sending..." : "Notify Me at Launch 🚀"}
                                                </Button>
                                            </form>

                                            {state?.success && (
                                                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                                                    <p className="text-green-300 text-center">{state.message}</p>
                                                </div>
                                            )}

                                            {state?.error && (
                                                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                                                    <p className="text-red-300 text-center">{state.error}</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Social Links */}
                                <div className="text-center space-y-4">
                                    <p className="text-gray-300">Follow us for updates</p>
                                    <div className="flex justify-center gap-4">
                                        <Link href={"https://x.com/AariyaTech"} target="_blank">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="border-white/30 hover:bg-white/20 text-white"
                                            >
                                                <Twitter className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Link
                                            href={"https://www.linkedin.com/showcase/aariyaiq/about/"}
                                            target="_blank"
                                        >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="border-white/30 hover:bg-white/20 text-white"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Link href={"https://www.instagram.com/aariyatechglobal/"} target="_blank">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="border-white/30 hover:bg-white/20 text-white"
                                            >
                                                <Instagram className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-6 text-center text-gray-300">
                    <p>&copy; 2025 AariyaTech UK. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
