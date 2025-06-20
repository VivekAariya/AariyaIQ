"use server";

import { login } from "@/app/actions/auth-actions";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { sendInstructorBanEmail, sendInstructorSuspendEmail } from "./email-actions";

export async function loginSuperAdmin(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const securityKey = formData.get("securityKey") as string;

        if (!email || !password || !securityKey) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        if (securityKey !== process.env.SUPER_ADMIN_SECURITY_KEY) {
            return {
                success: false,
                message: "Invalid security key.",
            };
        }

        const result = await login(null, formData, "super-admin");

        if (!result.success) {
            return {
                success: false,
                message: result.error || "Invalid credentials. Please check your email and password.",
            };
        }

        return {
            success: true,
            message: "Login successful",
            redirectUrl: result.redirectUrl,
        };
    } catch (error) {
        logger.error("Super admin login error:", error);
        return {
            success: false,
            message: "An error occurred during authentication. Please try again.",
        };
    }
}

export async function handleInstructorProfileForm(formData: FormData) {
    try {
        const id = formData.get("id");
        const profile_status = formData.get("profile_status");
        const first_name = formData.get("firstName");
        const last_name = formData.get("lastName");
        const email = formData.get("email");
        const phone_number = formData.get("phone");
        const location = formData.get("location");
        const years_of_experience = formData.get("years_of_experience");
        const professional_bio = formData.get("professional_bio");
        const area_of_expertise = formData.get("area_of_expertise");
        const linkedin_profile = formData.get("linkedin_profile");
        const portfolio_website = formData.get("portfolio_website");
        const proposed_course_ideas = formData.get("proposed_course_ideas");

        const { error } = await supabaseServiceRoleClient
            .from("users")
            .update({
                profile_status,
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

export async function handleBanInstructorProfile(id: string) {
    try {
        const { data, error } = await supabaseServiceRoleClient
            .from("users")
            .update({ profile_status: "banned" })
            .eq("id", id)
            .select("first_name, last_name, email");

        if (error) {
            logger.error("Error banning instructor:", error);
            return {
                success: false,
                message: error?.message || "Failed to ban instructor. Please try again.",
            };
        }

        await sendInstructorBanEmail({
            instructorName: data[0].first_name + " " + data[0].last_name,
            instructorEmail: data[0].email,
            loginLink: "",
            nextSteps: [],
        });

        return {
            success: true,
            message: "Instructor banned successfully.",
        };
    } catch (error) {
        logger.error("Error handling ban instructor:", error);
        return {
            success: false,
            message: "An error occurred while banning the instructor. Please try again.",
        };
    }
}

export async function handleSuspendInstructorProfile(id: string) {
    try {
        const { data, error } = await supabaseServiceRoleClient
            .from("users")
            .update({ profile_status: "suspended" })
            .eq("id", id)
            .select("first_name, last_name, email");

        if (error) {
            logger.error("Error suspending instructor:", error);
            return {
                success: false,
                message: error?.message || "Failed to suspend instructor. Please try again.",
            };
        }

        await sendInstructorSuspendEmail({
            instructorName: data[0].first_name + " " + data[0].last_name,
            instructorEmail: data[0].email,
            loginLink: "",
            nextSteps: [],
        });

        return {
            success: true,
            message: "Instructor suspended successfully.",
        };
    } catch (error) {
        logger.error("Error handling suspend instructor:", error);
        return {
            success: false,
            message: "An error occurred while suspending the instructor. Please try again.",
        };
    }
}
