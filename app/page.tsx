"use client";

import { FloatingAIBtn } from "@/components/floating-ai-btn";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import HeroSectionCourses from "@/components/hero-section-courses";
import { LaunchPage } from "@/components/launch-page";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// launch date (July 14, 2025)
// const LAUNCH_DATE = new Date("2025-07-14T10:00:00Z");

function HomeContentInner() {
    const searchParams = useSearchParams();

    const [supabase] = useState(() => createClient());
    const [showLaunchPage, setShowLaunchPage] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const LAUNCH_DATE = new Date("2025-07-14T10:00:00Z");

        const devAccess = searchParams.get("dev") === "true";
        const adminAccess = searchParams.get("admin") === "aariyatech2025";
        const bypassKey = searchParams.get("bypass") === "launch_bypass_2025";
        const localDev = typeof window !== "undefined" && localStorage.getItem("dev_mode") === "true";
        const isDeveloper = devAccess || adminAccess || bypassKey || localDev;

        let timer: ReturnType<typeof setInterval>;

        const checkIfLaunched = () => {
            const now = new Date();
            if (now >= LAUNCH_DATE || isDeveloper) {
                setShowLaunchPage(false);
                if (isDeveloper && typeof window !== "undefined") {
                    localStorage.setItem("dev_mode", "true");
                }

                clearInterval(timer);
            }
            setIsLoading(false);
        };

        checkIfLaunched();
        timer = setInterval(checkIfLaunched, 1000);

        return () => clearInterval(timer);
    }, [searchParams]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error) {
                    logger.error("Error fetching user data:", error);
                    throw new Error("Error fetching user data");
                }

                if (data?.user) {
                    setUser(data?.user);
                }
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

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
        <div className="flex min-h-screen flex-col relative z-10 bg-gradient-to-br from-slate-950 to-slate-900">
            {/* Developer Mode Banner */}

            {typeof window !== "undefined" && localStorage.getItem("dev_mode") === "true" && (
                <div className="bg-yellow-500 text-black text-center py-2 text-xs sm:text-sm font-medium px-2">
                    🔧 Developer Mode Active - Launch Page Bypassed
                    <button
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                localStorage.removeItem("dev_mode");
                                window.location.href = "/";
                            }
                        }}
                        className="ml-2 sm:ml-4 underline hover:no-underline"
                    >
                        Exit Dev Mode
                    </button>
                </div>
            )}

            <MainNav />

            <main className="flex-1 w-full">
                <HeroSection />
                <section className="w-full px-4 sm:px-6 md:px-0 py-8 sm:py-12 md:py-24 lg:py-32 relative z-10">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                        <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-5xl font-bold leading-tight text-white">
                            Elevate Your Skills with AariyaIQ
                        </h2>
                        <p className="max-w-full sm:max-w-[85%] leading-normal text-gray-300 text-base sm:text-lg sm:leading-7 px-1">
                            Discover industry-relevant courses designed to enhance your professional growth and career
                            advancement.
                        </p>
                        <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row items-stretch sm:items-center">
                            <Link href="/courses" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white text-base sm:text-lg py-3 px-6">
                                    Explore Courses
                                </Button>
                            </Link>
                            <Link href="/learner/login" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black text-base sm:text-lg py-3 px-6"
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

            <FloatingAIBtn delay={1000} user={user} />
        </div>
    );
}

export default function HomeContent() {
    return (
        <Suspense>
            <HomeContentInner />
        </Suspense>
    );
}
