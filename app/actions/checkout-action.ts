"use server";

import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { sendLearnerRegistrationEmail } from "./email-actions";

export async function submitApplication(formData: FormData) {
    try {
        const learner_id = formData.get("learner_id")?.toString().trim();
        const course_id = formData.get("course_id")?.toString().trim();
        const course_name = formData.get("course_name")?.toString().trim();
        const start_date = formData.get("start_date")?.toString().trim();
        const full_name = formData.get("full_name")?.toString().trim();
        const email_address = formData.get("email_address")?.toString().trim();
        const phone_number = formData.get("phone_number")?.toString().trim();
        const current_profession = formData.get("current_profession")?.toString().trim();
        const promo_code = formData.get("promo_code")?.toString().trim();
        const excited_topics = formData.get("excited_topics")?.toString().trim();

        const { data, error } = await supabaseServiceRoleClient
            .from("learners_applications")
            .insert({
                learner_id,
                course_id,
                full_name,
                email_address,
                phone_number,
                current_profession,
                promo_code: promo_code ?? null,
                excited_topics,
            })
            .select()
            .single();

        if (error) {
            logger.error("Error submitting learner application:", error);
            return { success: false, message: error.message || "Error submitting application." };
        }

        if (!full_name || !email_address || !course_name || !start_date) {
            return { success: false, message: "Some fields are missing." };
        }

        await sendLearnerRegistrationEmail({
            learnerName: full_name,
            learnerEmail: email_address,
            courseName: course_name,
            courseStartDate: start_date,
            applicationDate: new Date().toLocaleDateString(),
            loginLink: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/learner/dashboard/learner-application`,
        });

        return { success: true, message: "Application submitted successfully!", data };
    } catch (error: any) {
        logger.error("Exception in submitApplication:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
