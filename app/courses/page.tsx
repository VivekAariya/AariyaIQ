import { CourseCard } from "@/components/course-card";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function LearningsPage() {
    let errorMsg = null;

    const { data: courses, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (courseError) {
        logger.error("Error fetching instructors:", courseError);
        errorMsg = courseError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Courses</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    if (!courses) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Courses Not Found</h1>
                    <p className="text-gray-400">{errorMsg || "The requested courses does not exist."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 text-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2 bg-gradient-to-br from-gray-700/15 via-gray-600/15 to-gray-800/15 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg relative neon-container neon-always-on overflow-visible transform translate-y-4 transition-transform duration-700">
                                {/* Neon border elements */}
                                <div className="neon-right absolute opacity-100"></div>
                                <div className="neon-bottom absolute opacity-100"></div>
                                <div className="neon-left absolute opacity-100"></div>

                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">AT Learnings</h1>
                                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Explore our comprehensive courses designed to enhance your skills and advance your
                                    career.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container py-12 md:py-24 lg:py-32">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
