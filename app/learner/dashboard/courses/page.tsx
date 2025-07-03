import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search || "";
    let enrollments: any = [];
    let errorMsg = null;

    try {
        const supabase = await createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
            errorMsg = userError?.message || "User not authenticated";
            logger.error("Error fetching user:", errorMsg);

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Error fetching logged in user</h1>
                        <p className="text-gray-400">{errorMsg}</p>
                    </div>
                </div>
            );
        }

        let query = supabaseServiceRoleClient
            .from("enrollments")
            .select("id, course_id, instructor_id, enrollment_date, course:courses(id, course_title, category)")
            .eq("learner_id", userData?.user?.id)
            .order("enrollment_date", { ascending: false });

        if (search) {
            query = query.or(`course_title.ilike.%${search}%,category.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            logger.error("Error fetching courses:", error);
            errorMsg = error.message || "Unknown error";

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Error fetching courses</h1>
                        <p className="text-gray-400">{errorMsg}</p>
                    </div>
                </div>
            );
        } else {
            enrollments = data || [];
        }
    } catch (error: any) {
        logger.error("Error fetching courses:", error);
        errorMsg = error?.message || "Unknown error";
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">View Courses</h1>
            </div>

            <div className="rounded-md border border-white/20 bg-black/90 backdrop-blur-none overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Enrolled At</div>
                    <div>Actions</div>
                </div>

                {errorMsg ? (
                    <div className="p-4 text-red-500">Error: {errorMsg}</div>
                ) : enrollments.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">No courses found.</div>
                ) : (
                    enrollments.map((enrollment: any) => (
                        <div key={enrollment?.id} className="grid grid-cols-5 gap-4 border-t p-4">
                            <div className="truncate">{enrollment?.course?.course_title}</div>
                            <div className="truncate">{enrollment?.course?.category}</div>
                            <div className="truncate"></div>
                            <div className="truncate">
                                {new Date(enrollment?.enrollment_date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" asChild className="text-xs">
                                    <Link href={`/learner/dashboard/courses/${enrollment?.course?.id}`}>
                                        View Course
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
