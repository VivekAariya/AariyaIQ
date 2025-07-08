import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { BookOpen, FileText, User } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        logger.error("Error fetching user data:", userError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged user</h1>
                    <p className="text-gray-400">{userError?.message}</p>
                </div>
            </div>
        );
    }

    const { data: enrollments, error: enrollmentsError } = await supabaseServiceRoleClient
        .from("enrollments")
        .select(
            "id, course_id, instructor_id, enrollment_date, course:courses(id, course_title, category, course_image)"
        )
        .eq("learner_id", userData?.user?.id)
        .order("enrollment_date", { ascending: false });

    if (enrollmentsError) {
        logger.error("Error fetching enrollments:", enrollmentsError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching enrollments</h1>
                    <p className="text-gray-400">{enrollmentsError?.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-2 sm:px-4 md:px-8 mx-auto">
            <div className="max-md:mt-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Learner Dashboard</h1>
                <p className="text-muted-foreground text-base sm:text-lg">Welcome to your learning journey!</p>
            </div>

            {/* Quick access cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border border-white/20 dark:border-white/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg">My Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">Access your enrolled courses</p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/learner/dashboard/courses">
                                <BookOpen className="mr-2 h-4 w-4" />
                                <span className="hidden xs:inline">View Courses</span>
                                <span className="inline xs:hidden">Courses</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border border-white/20 dark:border-white/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg">My Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                            Update your personal information
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/learner/dashboard/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span className="hidden xs:inline">Edit Profile</span>
                                <span className="inline xs:hidden">Profile</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border border-white/20 dark:border-white/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base sm:text-lg">Application Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">Check your application progress</p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/learner/dashboard/learner-application">
                                <FileText className="mr-2 h-4 w-4" />
                                <span className="hidden xs:inline">View Status</span>
                                <span className="inline xs:hidden">Status</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4 border border-white/10 bg-black/40 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Recently Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="hidden sm:grid grid-cols-4 gap-4 p-4 font-medium">
                        <div>Title</div>
                        <div>Level</div>
                        <div>Start Date</div>
                        <div>Actions</div>
                    </div>
                    {/* Mobile Table Header */}
                    <div className="sm:hidden grid grid-cols-2 gap-2 p-2 font-medium text-sm">
                        <div>Course</div>
                        <div>Action</div>
                    </div>
                    {enrollments.length === 0 ? (
                        <div className="p-4 text-muted-foreground col-span-4">No recent courses found.</div>
                    ) : (
                        enrollments.slice(0, 5).map((enrollment: any) => (
                            <div
                                key={enrollment.id}
                                className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 border-t p-2 sm:p-4 items-center text-sm"
                            >
                                {/* Mobile: Title & Level stacked */}
                                <div>
                                    <div className="font-semibold">{enrollment?.course?.course_title}</div>
                                    <div className="sm:hidden text-xs text-muted-foreground">
                                        {enrollment?.course?.category || "-"}
                                    </div>
                                </div>
                                {/* Mobile: Action button */}
                                <div className="sm:hidden flex flex-col gap-1">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/learner/dashboard/courses/${enrollment?.course?.id}`}>
                                            Go to Course
                                        </Link>
                                    </Button>
                                    <div className="text-xs text-muted-foreground">
                                        {enrollment?.enrollment_date
                                            ? new Date(enrollment.enrollment_date).toLocaleDateString("en-UK", {
                                                  day: "numeric",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "-"}
                                    </div>
                                </div>
                                {/* Desktop: Level */}
                                <div className="hidden sm:block">{enrollment?.course?.category || "-"}</div>
                                {/* Desktop: Start Date */}
                                <div className="hidden sm:block">
                                    {enrollment?.enrollment_date
                                        ? new Date(enrollment.enrollment_date).toLocaleDateString("en-UK", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                          })
                                        : "-"}
                                </div>
                                {/* Desktop: Actions */}
                                <div className="hidden sm:flex space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/learner/dashboard/courses/${enrollment?.course?.id}`}>
                                            Go to Course
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
