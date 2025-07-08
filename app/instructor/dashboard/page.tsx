import { FloatingAIBtn } from "@/components/floating-ai-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft, BookOpen, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default async function InstructorDashboardPage() {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        logger.error("Error fetching user data:", userError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged in user</h1>
                    <p className="text-gray-400">{userError?.message}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/instructor/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { data: courseData, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("id, course_title, level, start_date")
        .eq("instructor", userData?.user?.id)
        .order("created_at", { ascending: false })
        .limit(5);

    if (courseError) {
        logger.error("Error fetching courses:", courseError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Courses</h1>
                    <p className="text-gray-400">{courseError.message}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/instructor/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { data: enrollments, error: enrollmentsError } = await supabaseServiceRoleClient
        .from("enrollments")
        .select("id, status")
        .eq("instructor_id", userData?.user?.id);

    if (enrollmentsError) {
        logger.error("Error fetching learners:", enrollmentsError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Learners</h1>
                    <p className="text-gray-400">{enrollmentsError.message}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/instructor/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <FloatingAIBtn delay={500} user={userData?.user} />

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
                <p className="text-muted-foreground">Manage your courses and learners</p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/courses/add-new">
                        <PlusCircle className="h-6 w-6" />
                        <span>Create New Course</span>
                    </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/learners">
                        <Users className="h-6 w-6" />
                        <span>Manage Learners</span>
                    </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/courses">
                        <BookOpen className="h-6 w-6" />
                        <span>View All Courses</span>
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courseData.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{enrollments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {enrollments.filter((enrollment) => enrollment.status === "active").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-indigo-900/10 via-purple-800/10 to-cyan-900/10 backdrop-blur-md p-6 shadow-lg">
                {/* Neon border elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Recent Courses
                        </h2>
                        <Button variant="outline" asChild>
                            <Link href="/instructor/dashboard/courses/add-new">Add New Course</Link>
                        </Button>
                    </div>
                    <div className="mt-4 rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
                        <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                            <div>Title</div>
                            <div>Level</div>
                            <div>Start Date</div>
                            <div>Actions</div>
                        </div>
                        {courseData.slice(0, 5).map((course) => (
                            <div key={course.id} className="grid grid-cols-4 gap-4 border-t p-4">
                                <div>{course.course_title}</div>
                                <div>{course.level}</div>
                                <div>
                                    {new Date(course.start_date).toLocaleDateString("en-UK", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/instructor/dashboard/courses/${course.id}`}>Edit</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/instructor/dashboard/courses">View All Courses</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
