import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { AlertTriangle, CheckCircle, Clock, Search, User, Wand2, XCircle } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search || "";
    let supabaseCourses = [];
    let errorMsg = null;

    try {
        const supabase = await createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
            errorMsg = userError?.message || "User not authenticated";
            logger.error("Error fetching user:", errorMsg);
        }

        let query = supabaseServiceRoleClient
            .from("courses")
            .select("*")
            .eq("instructor", userData?.user?.id)
            .order("created_at", { ascending: false });

        if (search) {
            query = query.or(`course_title.ilike.%${search}%,category.ilike.%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            logger.error("Error fetching courses:", error);
            errorMsg = error.message || "Unknown error";
        } else {
            supabaseCourses = data || [];
        }
    } catch (error: any) {
        logger.error("Error fetching courses:", error);
        errorMsg = error?.message || "Unknown error";
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "suspended":
                return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "banned":
                return "bg-red-600/20 text-red-300 border-red-600/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "suspended":
                return <XCircle className="h-4 w-4" />;
            case "banned":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <User className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6 px-2 sm:px-4">
            <div className="max-md:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manage Courses</h1>
            </div>

            <form
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
                action=""
                method="get"
            >
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search courses..."
                            className="w-full pl-8"
                            defaultValue={search}
                            autoComplete="off"
                        />
                    </div>
                    <Button type="submit" className="ml-2" variant={"outline"}>
                        Search
                    </Button>
                </div>

                <div className="flex-shrink-0">
                    <Link
                        href={`/instructor/dashboard/courses/add-new`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md block text-center"
                    >
                        Add New Course
                    </Link>
                </div>
            </form>

            <div className="rounded-md border border-white/20 bg-black/90 backdrop-blur-none overflow-x-auto">
                <div className="min-w-[600px]">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                        <div>Name</div>
                        <div>Category</div>
                        <div>Status</div>
                        <div>Created At</div>
                        <div>Actions</div>
                    </div>

                    {errorMsg ? (
                        <div className="p-4 text-red-500">Error: {errorMsg}</div>
                    ) : supabaseCourses.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">No courses found.</div>
                    ) : (
                        supabaseCourses.map((course) => (
                            <div key={course.id} className="grid grid-cols-5 gap-4 border-t p-4">
                                <div className="truncate">{course.course_title}</div>
                                <div className="truncate">{course.category}</div>
                                <div className="truncate">
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(
                                            course.status
                                        )}`}
                                    >
                                        {getStatusIcon(course.status)}
                                        {course?.status?.charAt(0).toUpperCase() + course?.status?.slice(1)}
                                    </span>
                                </div>
                                <div className="truncate">
                                    {new Date(course.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="text-xs rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                                    >
                                        <Link href={`/instructor/dashboard/courses/${course.id}/materials`}>
                                            <div className="flex items-center gap-1">
                                                <Wand2 className="h-4 w-4" />
                                                AI Tools
                                            </div>
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild className="text-xs">
                                        <Link href={`/instructor/dashboard/courses/${course.id}`}>Edit</Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild className="text-xs">
                                        <Link href={`/instructor/dashboard/courses/${course.id}/learners`}>
                                            View Learners
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
