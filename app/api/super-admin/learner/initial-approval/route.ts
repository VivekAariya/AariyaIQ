import { sendLearnerInitialApprovalEmail } from "@/app/actions/email-actions";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { applicationId } = body;

        const { data, error } = await supabaseServiceRoleClient
            .from("learners_applications")
            .update({ application_status: "pending_payment" })
            .eq("id", applicationId)
            .select("*, course:course_id(id, course_title, start_date, price)")
            .single();

        if (error) {
            logger.error("Error updating learner application status:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        await sendLearnerInitialApprovalEmail({
            learnerName: data?.full_name,
            learnerEmail: data?.email_address,
            courseName: data?.course?.course_title,
            courseStartDate: data?.course?.start_date,
            paymentAmount: data?.course?.price,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
