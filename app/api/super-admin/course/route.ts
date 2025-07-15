import { sendCourseFinalApprovalEmail, sendCourseRejectionEmail } from "@/app/actions/email-actions";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        logger.log("data received for course final approval:", body);

        const { action, courseId, courseTitle, instructorId } = body;

        const { data: instructor, error: instructorError } = await supabaseServiceRoleClient
            .from("users")
            .select("first_name, last_name, email")
            .eq("id", instructorId)
            .single();

        if (instructorError) {
            logger.error("Error updating course approval status:", instructorError);
            return NextResponse.json({ success: false, error: instructorError.message }, { status: 500 });
        }

        if (action === "approved") {
            const { data, error } = await supabaseServiceRoleClient
                .from("courses")
                .update({ status: "approved" })
                .eq("id", courseId);

            if (error) {
                logger.error("Error updating course approval status:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }

            await sendCourseFinalApprovalEmail({
                courseTitle,
                instructorName: instructor.first_name + " " + instructor.last_name,
                instructorEmail: instructor.email,
            });
        } else if (action === "suspended") {
            const { data, error } = await supabaseServiceRoleClient
                .from("courses")
                .update({ status: "suspended" })
                .eq("id", courseId);

            if (error) {
                logger.error("Error updating course approval status:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }
            await sendCourseRejectionEmail({
                courseTitle,
                instructorName: instructor.first_name + " " + instructor.last_name,
                instructorEmail: instructor.email,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
