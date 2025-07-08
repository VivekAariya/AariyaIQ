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
        const years_experience = formData.get("years_experience")?.toString().trim();
        const promo_code = formData.get("promo_code")?.toString().trim();
        const course_motivation = formData.get("course_motivation")?.toString().trim();
        const learning_goals = formData.get("learning_goals")?.toString().trim();
        const course_expectations = formData.get("course_expectations")?.toString().trim();
        const preferred_timeline = formData.get("preferred_timeline")?.toString().trim();
        const current_technical_skills = formData.get("current_technical_skills")?.toString().trim();
        const current_challenges = formData.get("current_challenges")?.toString().trim();
        const specific_projects = formData.get("specific_projects")?.toString().trim();
        const preferred_learning_style = formData.get("preferred_learning_style")?.toString().trim();
        const weekly_time_commitment = formData.get("weekly_time_commitment")?.toString().trim();
        const previous_courses_details = formData.get("previous_courses_details")?.toString().trim();
        const excited_topics = formData.get("excited_topics")?.toString().trim();
        const success_metrics = formData.get("success_metrics")?.toString().trim();

        const { error } = await supabaseServiceRoleClient.from("learners_applications").insert({
            learner_id,
            course_id,
            full_name,
            email_address,
            phone_number,
            current_profession,
            years_experience,
            promo_code: promo_code ?? null,
            course_motivation,
            learning_goals,
            course_expectations,
            preferred_timeline,
            current_technical_skills,
            current_challenges,
            specific_projects,
            preferred_learning_style,
            weekly_time_commitment,
            previous_courses_details,
            excited_topics,
            success_metrics,
        });

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
            loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/learner/dashboard/learner-application`,
        });

        return { success: true, message: "Application submitted successfully!" };
    } catch (error: any) {
        logger.error("Exception in submitApplication:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
