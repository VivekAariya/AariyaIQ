import ApprovalsDashboard from "@/components/super-admin/approvals-dashboard";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export default async function ApprovalsPage() {
    const { data: instructorApplications, error: instructorApplicationsError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("role", "instructor")
        .eq("profile_status", "pending")
        .order("created_at", { ascending: false });

    const { data: learnerApplications, error: learnerApplicationsError } = await supabaseServiceRoleClient
        .from("learners_applications")
        .select("*, course:course_id(id, course_title)")
        .in("application_status", ["in_review", "pending_payment", "payment_completed"])
        .order("created_at", { ascending: false });

    const { data: courses, error: coursesError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    if (instructorApplicationsError) {
        logger.error("Error fetching instructor applications:", instructorApplicationsError);
        return <div>Error loading instructor applications</div>;
    }

    if (learnerApplicationsError) {
        logger.error("Error fetching learner applications:", learnerApplicationsError);
        return <div>Error loading learner applications</div>;
    }

    if (coursesError) {
        logger.error("Error fetching learner applications:", coursesError);
        return <div>Error loading courses</div>;
    }

    return (
        <ApprovalsDashboard initialLearnerData={learnerApplications} initialInstructorData={instructorApplications} initialCourseData={courses} />
    ); 
}
