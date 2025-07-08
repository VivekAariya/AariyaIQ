import ViewCourse from "@/components/learner/view-course";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

interface CourseProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: any;
    };
}

export default async function ViewCoursePage({ params, searchParams }: CourseProps) {
    const { data: course, error } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error || !course) {
        logger.error("Error fetching course:", error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-6 md:px-8">
                <div className="text-center w-full max-w-md mx-auto">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 break-words">{error?.message || "Something went wrong"}</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Unknown error</p>
                </div>
            </div>
        );
    }

    // Fetch instructors
    const { data: instructor, error: instructorError } = await supabaseServiceRoleClient
        .from("users")
        .select("id, first_name, last_name, email, phone_number, area_of_expertise, years_of_experience, profile_image")
        .eq("id", course?.instructor)
        .single();

    if (instructorError) {
        logger.error("Error fetching instructor:", instructorError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-6 md:px-8">
                <div className="text-center w-full max-w-md mx-auto">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 break-words">Error Fetching Instructor</h1>
                    <p className="text-gray-400 text-sm sm:text-base">{instructorError.message}</p>
                </div>
            </div>
        );
    }

    return <ViewCourse course={course} instructor={instructor} />;
}
