import ApprovalsDashboard from "@/components/super-admin/approvals-dashboard";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

// Move mock data to server comp for now (replace with real fetch later)
const learnerRegistrations = [
    {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        course: "AI Recruitment Fundamentals",
        date: "2023-05-15",
        status: "pending_initial",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        course: "MERN Stack Fundamentals",
        date: "2023-05-14",
        status: "pending_payment",
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael@example.com",
        course: "Data Science Essentials",
        date: "2023-05-12",
        status: "pending_compliance",
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily@example.com",
        course: "Cloud Computing Fundamentals",
        date: "2023-05-10",
        status: "pending_final",
    },
    {
        id: "5",
        name: "David Wilson",
        email: "david@example.com",
        course: "DevOps Engineering",
        date: "2023-05-08",
        status: "approved",
    },
];


export default async function ApprovalsPage() {
    const { data: instructorApplications, error: instructorApplicationsError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("role", "instructor")
        .eq("profile_status", "pending")
        .order("created_at", { ascending: false });

    if (instructorApplicationsError) {
        logger.error("Error fetching instructor applications:", instructorApplicationsError);
        return <div>Error loading data</div>;
    }

    if (!instructorApplications) {
        logger.warn("No instructor applications found");
        return <div>No instructor applications found</div>;
    }

    return (
        <ApprovalsDashboard
            initialLearnerData={learnerRegistrations}
            initialInstructorData={instructorApplications}
        />
    );
}
