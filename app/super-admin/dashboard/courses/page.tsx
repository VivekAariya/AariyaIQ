import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { AlertTriangle, CheckCircle, Clock, Edit, PlusCircle, Search, Trash2, User, XCircle } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search || "";
    let supabaseCourses: any = [];
    let instructorMap = null;
    let errorMsg = null;

    try {
        let query = supabaseServiceRoleClient.from("courses").select("*").order("created_at", { ascending: false });

        if (search) {
            query = query.or(
                `course_title.ilike.%${search}%,category.ilike.%${search}%,instructor.first_name.ilike.%${search}%,instructor.last_name.ilike.%${search}%`
            );
        }

        const { data: courseData, error } = await query;

        if (error) {
            logger.error("Error fetching courses:", error);
            errorMsg = error.message || "Unknown error";
        } else {
            supabaseCourses = courseData || [];

            // Get all unique instructor IDs
            const instructorIds = [...new Set(courseData.map((c) => c.instructor))];

            // Fetch instructors
            const { data: instructors, error: instructorError } = await supabaseServiceRoleClient
                .from("users")
                .select("id, first_name, last_name, email")
                .in("id", instructorIds);

            // 4. Map instructors by ID
            instructorMap = instructors ? Object.fromEntries(instructors.map((u) => [u.id, u])) : null;
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
        <div className="space-y-6">
            <div className="max-md:mt-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
            </div>

            <form className="flex w-full max-w-sm items-center space-x-2 mt-4" action="" method="get">
                <div className="relative w-full">
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
                <Button type="submit" size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                </Button>
            </form>

            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>
                        Manage your platform courses, edit content, and track enrollments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Enrollments</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {errorMsg ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-red-500">
                                        Error: {errorMsg}
                                    </TableCell>
                                </TableRow>
                            ) : supabaseCourses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-400">
                                        No courses found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                supabaseCourses.map((course: any) => (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/super-admin/dashboard/courses/${course.id}`}
                                                className="hover:underline"
                                            >
                                                {course.course_title}
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            {course.instructor && instructorMap
                                                ? `${instructorMap[course.instructor]?.first_name} ${instructorMap[course.instructor]?.last_name}`
                                                : "-"}
                                        </TableCell>

                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>{course.price}</TableCell>
                                        <TableCell>{course.enrollment_count}</TableCell>

                                        <TableCell>
                                            <div className="truncate">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(
                                                        course.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(course.status)}
                                                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                <Button variant="outline" size="sm" asChild className="text-xs">
                                                    <Link href={`/super-admin/dashboard/courses/${course.id}`}>
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
