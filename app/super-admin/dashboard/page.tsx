import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import Link from "next/link";

export default async function SuperAdminDashboardPage() {
    let totalCourses: any = null;

    const { data: coursesData, error: coursesError } = await supabaseServiceRoleClient.from("courses").select("id");

    if (coursesError) {
        logger.error("Error fetching courses:", coursesError);
        totalCourses = 0;
    } else {
        totalCourses = coursesData?.length || 0;
    }

    const { data: usersData, error: usersError } = await supabaseServiceRoleClient
        .from("users")
        .select("id, first_name, last_name, email, role, created_at, profile_status")
        .order("created_at", { ascending: false });

    if (usersError) {
        logger.error("Error fetching users:", usersError);
        return <div>Error loading data</div>;
    }

    const learners = usersData?.filter((u) => u.role === "learner") || [];
    const instructors = usersData?.filter((u) => u.role === "instructor") || [];
    const recentLearners = learners.slice(0, 4);

    return (
        <div className="space-y-8 px-2 sm:px-4 md:px-8">
            <div className="mt-6 md:mt-10">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Manage your entire learning platform</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{totalCourses}</div>
                    </CardContent>
                </Card>
                <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Total Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{learners.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-black/80 backdrop-blur-[2px] border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium">Instructors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">{instructors.length}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold tracking-tight">Instructors</h2>
                    </div>
                    <div className="mt-4 rounded-md border overflow-x-auto">
                        <div className="min-w-[500px] grid grid-cols-12 gap-2 p-4 font-medium text-xs sm:text-sm">
                            <div className="col-span-3">Name</div>
                            <div className="col-span-4">Email</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-2">Actions</div>
                        </div>
                        {instructors.map((instructor) => (
                            <div key={instructor.id} className="min-w-[500px] grid grid-cols-12 gap-2 border-t p-4 items-center text-xs sm:text-sm">
                                <div className="col-span-3 truncate">
                                    {instructor.first_name + " " + instructor.last_name}
                                </div>
                                <div className="col-span-4 truncate">{instructor.email}</div>
                                <div className="col-span-3">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                            instructor.profile_status === "approved"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {instructor.profile_status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex space-x-2">
                                    <Link href={`/super-admin/dashboard/instructors/${instructor.id}`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold tracking-tight">Recent Learners</h2>
                    </div>
                    <div className="mt-4 rounded-md border overflow-x-auto">
                        <div className="min-w-[400px] grid grid-cols-12 gap-2 p-4 font-medium text-xs sm:text-sm">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-4">Joined</div>
                            <div className="col-span-4">Actions</div>
                        </div>
                        {recentLearners.map((learner) => (
                            <div key={learner.id} className="min-w-[400px] grid grid-cols-12 gap-2 border-t p-4 items-center text-xs sm:text-sm">
                                <div className="col-span-4 truncate">
                                    {learner.first_name + " " + learner.last_name}
                                </div>
                                <div className="col-span-4 truncate">
                                    {new Date(learner.created_at).toLocaleDateString("en-UK", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="col-span-4 flex space-x-2">
                                    <Link href={`/super-admin/dashboard/learners/${learner.id}`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
