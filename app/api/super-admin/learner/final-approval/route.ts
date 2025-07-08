import { sendLearnerFinalApprovalEmail } from "@/app/actions/email-actions";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { applicationId } = body;

        const { data: application, error } = await supabaseServiceRoleClient
            .from("learners_applications")
            .update({ application_status: "approved" })
            .eq("id", applicationId)
            .select("learner_id, course_id, full_name, email_address")
            .single();

        if (error) {
            logger.error("Error updating learner application status:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        const { data: instructorId, error: instructorIdError } = await supabaseServiceRoleClient
            .from("courses")
            .select("id, course_title, start_date, instructor")
            .eq("id", application?.course_id)
            .single();

        if (instructorIdError) {
            logger.error("Error getting instructor id:", instructorIdError);
            return NextResponse.json({ success: false, error: instructorIdError.message }, { status: 500 });
        }

        const { error: enrollmentsError } = await supabaseServiceRoleClient.from("enrollments").insert({
            learner_id: application?.learner_id,
            course_id: application?.course_id,
            instructor_id: instructorId?.instructor,
        });

        if (enrollmentsError) {
            logger.error("Error creating enrollments:", enrollmentsError);
            return NextResponse.json({ success: false, error: enrollmentsError.message }, { status: 500 });
        }

        await sendLearnerFinalApprovalEmail({
            learnerName: application?.full_name,
            learnerEmail: application?.email_address,
            courseName: instructorId?.course_title,
            courseStartDate: instructorId?.start_date,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
