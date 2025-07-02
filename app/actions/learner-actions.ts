"use server";

import { sendFeedbackEmail, sendSupportEmail } from "@/lib/email-service";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export async function updateProfile(formData: FormData) {
    try {
        const id = formData.get("id");
        const first_name = formData.get("firstName");
        const last_name = formData.get("lastName");
        const email = formData.get("email");
        const phone_number = formData.get("phone") || null;
        const location = formData.get("location") || null;
        const professional_bio = formData.get("bio") || null;
        const area_of_expertise = formData.get("area_of_expertise") || null;
        const years_of_experience = formData.get("years_of_experience") || null;
        const linkedin_profile = formData.get("linkedinProfile") || null;
        const portfolio_website = formData.get("portfolioWebsite") || null;

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
            })
            .eq("id", id);

        if (error) {
            logger.error("Error updating learner profile:", error);
            return {
                success: false,
                message: error?.message || "Failed to update learner profile. Please try again.",
            };
        }

        return {
            success: true,
            message: "learner profile updated successfully.",
        };
    } catch (error) {
        logger.error("Error handling learner profile form:", error);
        return {
            success: false,
            message: "An error occurred while updating the learner profile. Please try again.",
        };
    }
}

export async function support(formData: FormData) {
    try {
        const id = formData.get("id");
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const priority = formData.get("priority");
        const message = formData.get("message");

        if (!id || !name || !email || !subject || !priority || !message) {
            return { success: false, message: "All fields are required." };
        }

        await sendSupportEmail({
            id: id.toString(),
            name: name.toString(),
            email: email.toString(),
            subject: subject.toString(),
            priority: priority.toString(),
            message: message.toString(),
        });

        return { success: true, message: "Message sent successfully!" };
    } catch (error: any) {
        logger.error("Exception in support:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function feedback(formData: FormData) {
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const category = formData.get("category");
        const rating = formData.get("rating");
        const feedback = formData.get("feedback");

        if (!category || !rating || !feedback) {
            return { success: false, message: `category, rating and feedback is required` };
        }

        await sendFeedbackEmail({
            name: name?.toString() || "",
            email: email?.toString() || "",
            category: category?.toString() || "",
            rating: rating.toString(),
            message: feedback.toString(),
        });

        return { success: true, message: "Message sent successfully!" };
    } catch (error: any) {
        logger.error("Exception in feedback:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
