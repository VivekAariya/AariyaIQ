import { sendInstructorFinalApprovalEmail, sendInstructorRejectionEmail } from "@/app/actions/email-actions";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        logger.log("data received for instructor final approval:", body);

        const { action, instructorId, instructorName, instructorEmail, loginLink, nextSteps } = body;

        if (action === "approved") {
            const { data, error } = await supabaseServiceRoleClient
                .from("users")
                .update({
                    profile_status: "approved",
                })
                .eq("id", instructorId);

            if (error) {
                logger.error("Error updating instructor profile status:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }

            await sendInstructorFinalApprovalEmail({
                instructorName,
                instructorEmail,
                loginLink,
                nextSteps,
            });
        } else if (action === "suspended") {
            const { data, error } = await supabaseServiceRoleClient
                .from("users")
                .update({
                    profile_status: "suspended",
                })
                .eq("id", instructorId);

            if (error) {
                logger.error("Error updating instructor profile status:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }
            await sendInstructorRejectionEmail({
                instructorName,
                instructorEmail,
                loginLink: "",
                nextSteps: [],
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
