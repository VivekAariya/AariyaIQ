import { CourseEditClient } from "@/components/super-admin/course-edit-client";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CourseProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: any;
    };
}

export default async function SuperAdminEditCoursePage({ params, searchParams }: CourseProps) {
    let errorMsg = null;

    const { data: course, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", params.id)
        .single();

    const { data: instructor, error: instructorError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("role", "instructor")
        .eq("id", course?.instructor)
        .single();

    const { data: materials, error: materialsError } = await supabaseServiceRoleClient
        .from("materials")
        .select("*")
        .eq("course", params.id)
        .maybeSingle();

    const { data: aiContent, error: aiContentError } = await supabaseServiceRoleClient
        .from("ai_generated_content")
        .select("*")
        .eq("course_id", params.id);

    if (courseError) {
        logger.error("Error fetching course:", courseError);
        errorMsg = courseError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching course</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/courses">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (materialsError) {
        logger.error("Error fetching materials:", materialsError);
        errorMsg = materialsError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Materials</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/courses">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (instructorError) {
        logger.error("Error fetching instructor:", instructorError);
        errorMsg = instructorError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Instructor</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/instructors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Instructors
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (aiContentError) {
        logger.error("Error fetching aiContent:", aiContentError);
        errorMsg = aiContentError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching aiContent</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/courses">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
                    <p className="text-gray-400">{errorMsg || "The requested course profile does not exist."}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/admins">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Admins
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return <CourseEditClient course={course} materials={materials} instructor={instructor} aiContent={aiContent} />;
}
