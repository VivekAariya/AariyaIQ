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

export async function handleCourseEdit(formData: FormData) {
    try {
        const id = formData.get("course_id");
        const course_title = formData.get("course_title");
        const short_description = formData.get("short_description");
        const full_description = formData.get("full_description");
        const course_contents = formData.get("course_contents");
        const duration = formData.get("duration");
        const course_image = formData.get("course_image");
        const start_date = formData.get("start_date");
        const external_learning_platform_link = formData.get("external_learning_platform_link");
        const price = formData.get("price");
        const category = formData.get("category");
        const level = formData.get("level");
        const enrollment_count = formData.get("enrollment_count");
        const prerequisites = formData.get("prerequisites");
        const learning_outcomes = formData.get("learning_outcomes");
        const status = formData.get("status");

        if (isNaN(Number(price)) || Number(price) < 0) {
            return { success: false, message: "Price must be a non-negative number." };
        }
        if (enrollment_count && (isNaN(Number(enrollment_count)) || Number(enrollment_count) < 0)) {
            return { success: false, message: "Enrollment count must be a non-negative number." };
        }
        if (start_date && isNaN(Date.parse(start_date.toString()))) {
            return { success: false, message: "Start date is invalid." };
        }
        if (external_learning_platform_link && !/^https?:\/\//.test(external_learning_platform_link.toString())) {
            return { success: false, message: "External link must be a valid URL." };
        }

        const { error } = await supabaseServiceRoleClient
            .from("courses")
            .update({
                course_title,
                short_description,
                full_description,
                course_contents,
                duration,
                course_image,
                start_date,
                external_learning_platform_link,
                price: Number(price),
                category,
                level,
                enrollment_count: Number(enrollment_count),
                prerequisites,
                learning_outcomes,
                status,
            })
            .eq("id", id);

        if (error) {
            logger.error("Error updating course:", error);
            return { success: false, message: error?.message || "Failed to update course." };
        }

        return { success: true, message: "Course updated successfully!" };
    } catch (error: any) {
        logger.error("Exception in editCourse:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
