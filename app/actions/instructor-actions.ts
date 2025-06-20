"use server";

import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export async function updateInstructorProfile(formData: FormData) {
    try {
        const id = formData.get("id");
        const first_name = formData.get("firstName");
        const last_name = formData.get("lastName");
        const email = formData.get("email");
        const phone_number = formData.get("phone");
        const location = formData.get("location");
        const professional_bio = formData.get("bio");
        const area_of_expertise = formData.get("area_of_expertise");
        const years_of_experience = formData.get("years_of_experience");
        const linkedin_profile = formData.get("linkedinProfile");
        const portfolio_website = formData.get("portfolioWebsite");
        const proposed_course_ideas = formData.get("proposedCourseIdeas");

        const { error } = await supabaseServiceRoleClient
            .from("users")
            .update({
                first_name,
                last_name,
                email,
                phone_number,
                location,
                years_of_experience,
                professional_bio,
                area_of_expertise,
                linkedin_profile,
                portfolio_website,
                proposed_course_ideas,
            })
            .eq("id", id);

        if (error) {
            logger.error("Error updating instructor profile:", error);
            return {
                success: false,
                message: error?.message || "Failed to update instructor profile. Please try again.",
            };
        }

        return {
            success: true,
            message: "Instructor profile updated successfully.",
        };
    } catch (error) {
        logger.error("Error handling instructor profile form:", error);
        return {
            success: false,
            message: "An error occurred while updating the instructor profile. Please try again.",
        };
    }
}
