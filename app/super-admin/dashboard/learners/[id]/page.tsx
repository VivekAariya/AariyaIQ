import { LearnerProfileClient } from "@/components/super-admin/learner-profile-client";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

interface LearnerProfileProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: any;
    };
}

export default async function LearnerProfilePage({ params, searchParams }: LearnerProfileProps) {
    let errorMsg = null;

    const { data: learner, error } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("role", "learner")
        .eq("id", params.id)
        .single();

    const { data: enrollments, error: enrollmentsError } = await supabaseServiceRoleClient
        .from("enrollments")
        .select("*, course:courses(*)")
        .eq("learner_id", params.id);

    if (error) {
        logger.error("Error fetching learner:", error);
        errorMsg = error.message || "Unknown error";
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Learner</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    if (!learner) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Learner Not Found</h1>
                    <p className="text-gray-400">{errorMsg || "The requested learner profile does not exist."}</p>
                </div>
            </div>
        );
    }

    const mappedEnrollments = (enrollments || []).map((enrollment: any) => ({
        ...enrollment.course,
        id: enrollment.id,
        course_id: enrollment.course_id,
    }));

    return <LearnerProfileClient learner={learner} enrollments={mappedEnrollments} />;
}
