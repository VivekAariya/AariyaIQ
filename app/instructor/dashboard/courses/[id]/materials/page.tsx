import MaterialsAndAITools from "@/components/instructor/ai-tools-client";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export default async function CourseMaterialsAIPage({ params }: { params: { id: string } }) {
    const courseId = params.id;

    if (!courseId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course ID not found</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    const { data: course, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    if (courseError) {
        logger.error("Error fetching course:", courseError);
    }

    const { data: materials, error: materialsError } = await supabaseServiceRoleClient
        .from("materials")
        .select("*")
        .eq("course", courseId)
        .maybeSingle();

    if (materialsError) {
        logger.error("Error fetching materials:", materialsError);
    }

    if (courseError || !course || materialsError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{courseError?.message || "Something went wrong"}</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    return <MaterialsAndAITools course={course} materials={materials} />;
}
