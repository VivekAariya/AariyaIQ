import CourseEdit from "@/components/instructor/course-edit";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

interface CourseProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: any;
    };
}

export default async function EditCoursePage({ params, searchParams }: CourseProps) {
    const { data: course, error } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{error?.message || "Something went wrong"}</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    return <CourseEdit course={course} />;
}
