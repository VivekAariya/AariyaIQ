"use client";

import { FloatingAIBtn } from "@/components/floating-ai-btn";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import HeroSectionCourses from "@/components/hero-section-courses";
import { LaunchPage } from "@/components/launch-page";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";




export default function HomeContent() {
    const [showLaunchPage, setShowLaunchPage] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        try {
            // Check for developer bypass
            const devAccess = searchParams.get("dev");
            const adminAccess = searchParams.get("admin");
            const bypassKey = searchParams.get("bypass");

            // Check if current date is before launch date (July 14, 2025)
            const launchDate = new Date("2025-07-14T00:00:00Z");
            const currentDate = new Date();
            const isBeforeLaunch = currentDate < launchDate;

            // Developer bypass conditions
            const isDeveloper =
                devAccess === "true" ||
                adminAccess === "aariyatech2025" ||
                bypassKey === "launch_bypass_2025" ||
                (typeof window !== "undefined" && localStorage.getItem("dev_mode") === "true");

            // Show main site if after launch date OR if developer bypass is active
            if (!isBeforeLaunch || isDeveloper) {
                setShowLaunchPage(false);
                if (isDeveloper && typeof window !== "undefined") {
                    localStorage.setItem("dev_mode", "true");
                }
            }

            setIsLoading(false);
        } catch (err) {
            console.error("Error in useEffect:", err);
            setError("Failed to initialize page");
            setIsLoading(false);
        }
    }, [searchParams]);

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-cyan-500 hover:bg-cyan-600">
                        Reload Page
                    </Button>
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-white">Loading AariyaIQ...</p>
                </div>
            </div>
        );
    }

    // Show launch page or main site
    if (showLaunchPage) {
        return <LaunchPage />;
    }

    // Main site (original content)
    return (
        <div className="flex min-h-screen flex-col relative z-10">
            {/* Developer Mode Banner */}
            <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
                🔧 Developer Mode Active - Launch Page Bypassed
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("dev_mode");
                            window.location.href = "/";
                        }
                    }}
                    className="ml-4 underline hover:no-underline"
                >
                    Exit Dev Mode
                </button>
            </div>

            <MainNav />

            <main className="flex-1">
                <HeroSection />
                <section className="container py-12 md:py-24 lg:py-32 relative z-10">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-white">
                            Elevate Your Skills with AariyaIQ
                        </h2>
                        <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7">
                            Discover industry-relevant courses designed to enhance your professional growth and career
                            advancement.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link href="/courses">
                                <Button className="bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white">
                                    Explore Courses
                                </Button>
                            </Link>
                            <Link href="/learner/login">
                                <Button
                                    variant="outline"
                                    className="text-white border-white hover:bg-white hover:text-black"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <HeroSectionCourses />
            </main>
            <Footer />

            <FloatingAIBtn delay={1000} />
        </div>
    );
}
