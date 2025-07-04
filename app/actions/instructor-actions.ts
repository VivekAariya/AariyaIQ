"use server";

import { sendFeedbackEmail, sendSupportEmail } from "@/lib/email-service";
import logger from "@/utils/logger";
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

export async function createCourse(prevState: any, formData: FormData) {
    try {
        // Extract and validate fields
        const course_title = formData.get("title");
        const short_description = formData.get("shortDescription");
        const full_description = formData.get("description") || formData.get("longDescription");
        const course_contents = formData.get("courseContents");
        const duration = formData.get("duration");
        const course_image = formData.get("courseImage");
        const start_date = formData.get("startDate");
        const external_learning_platform_link = formData.get("externalLearningPlatformLink");
        const price = formData.get("price");
        const category = formData.get("category");
        const level = formData.get("level");
        const enrollment_count = formData.get("enrollmentCount");
        const prerequisites = formData.get("prerequisites");
        const learning_outcomes = formData.get("learningOutcomes");
        const instructor = formData.get("instructorId");
        const status = "pending";

        // Required fields validation
        if (!course_title) return { success: false, message: "Course title is required." };
        if (!short_description) return { success: false, message: "Short description is required." };
        if (!full_description) return { success: false, message: "Full description is required." };
        if (!course_contents) return { success: false, message: "Course contents are required." };
        if (!price) return { success: false, message: "Price is required." };
        if (!category) return { success: false, message: "Category is required." };
        if (!level) return { success: false, message: "Level is required." };
        if (!start_date) return { success: false, message: "Start date is required." };
        if (!course_image) return { success: false, message: "Course image is required." };
        if (!duration) return { success: false, message: "Duration is required." };
        if (!prerequisites) return { success: false, message: "Prerequisites are required." };
        if (!learning_outcomes) return { success: false, message: "Learning outcomes are required." };
        if (!external_learning_platform_link) return { success: false, message: "Learning outcomes are required." };

        // Additional checks
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

        const { data, error } = await supabaseServiceRoleClient
            .from("courses")
            .insert({
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
                status,
                prerequisites,
                learning_outcomes,
                instructor,
            })
            .select()
            .single();

        if (error) {
            logger.error("Error creating course:", error);
            return { success: false, message: error?.message || "Failed to create course." };
        }

        return { success: true, message: "Course created successfully!", data };
    } catch (error: any) {
        logger.error("Exception in createCourse:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function editCourse(prevState: any, formData: FormData) {
    try {
        const id = formData.get("id");
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

export async function submitCourseMaterial(formData: FormData, material: any) {
    try {
        const course = formData.get("courseId");
        const instructor = formData.get("userId");

        const { error } = await supabaseServiceRoleClient.from("materials").insert({
            view_url: material?.url,
            download_url: material?.downloadUrl,
            size: material?.size,
            pathname: material?.pathname,
            course,
            instructor,
        });

        if (error) {
            logger.error("Error uploading course material:", error);
            return { success: false, message: error?.message || "Error uploading course material." };
        }

        return { success: true, message: "Course material uploaded successfully!" };
    } catch (error: any) {
        logger.error("Exception in submitCourseMaterial:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function updateProfileImage(formData: FormData) {
    try {
        const id = formData.get("id") as string;
        const imageBase64 = formData.get("imageBase64") as string;

        const { error: usersError } = await supabaseServiceRoleClient
            .from("users")
            .update({ profile_image: imageBase64 })
            .eq("id", id);

        if (usersError) {
            console.error("Error updating profile image:", usersError);
            return { success: false, message: "Failed to update profile image" };
        }

        return { success: true, message: "Profile image updated successfully!" };
    } catch (error) {
        console.error("Error updating profile image:", error);
        return { success: false, message: "Failed to update profile image" };
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
