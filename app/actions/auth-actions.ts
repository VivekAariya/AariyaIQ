"use server";

import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export async function registerLearner(
    prevState: any,
    formData: FormData
): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const first_name = formData.get("first_name") as string;
        const last_name = formData.get("last_name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const role = "learner";

        // Basic validation
        if (!first_name || !last_name || !email || !password || !confirmPassword) {
            return {
                error: "All fields are required.",
                success: false,
            };
        }
        if (password.length < 8) {
            return {
                error: "Password must be at least 8 characters.",
                success: false,
            };
        }
        if (password !== confirmPassword) {
            return {
                error: "Passwords do not match.",
                success: false,
            };
        }
        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                error: "Invalid email format.",
                success: false,
            };
        }

        // Check if user already exists
        const { data: existingUser, error: userError } = await supabaseServiceRoleClient
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (userError) {
            logger.error("Error checking existing user:", userError);
            return {
                error: "An error occurred while checking for existing users. Please try again.",
                success: false,
            };
        }

        if (existingUser) {
            logger.error("User already exists with email:", email);
            return {
                error: "A user with this email already exists. Please use a different email.",
                success: false,
            };
        }

        const supabase = await createClient();

        // Use Supabase Auth to create user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    role: role,
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/learner/dashboard`,
            },
        });

        logger.log("Registration data:", data);

        if (error) {
            logger.error("Error during registration:", error);
            return {
                error: error.message,
                success: false,
            };
        }

        //add user to the database
        if (data?.user) {
            const { error } = await supabaseServiceRoleClient.from("users").insert({
                id: data.user.id,
                first_name,
                last_name,
                email,
                password, // TODO: Hash the password before storing it
                role,
            });

            if (error) {
                logger.error("Error inserting user:", error);
                return {
                    error: "An error occurred while creating the user. Please try again.",
                    success: false,
                };
            }
        }

        return {
            success: true,
            message: "Registration successful! Please check your email to verify your account.",
        };
    } catch (error: any) {
        return {
            error: error.message || "Registration failed. Please try again.",
            success: false,
        };
    }
}

export async function registerInstructor(
    prevState: any,
    formData: FormData
): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const first_name = formData.get("firstName") as string;
        const last_name = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const phone = formData.get("phone") as string;
        const location = formData.get("location") as string;
        const expertise = formData.get("expertise") as string;
        const experience = formData.get("experience") as string;
        const bio = formData.get("bio") as string;
        const linkedin = formData.get("linkedin") as string;
        const portfolio = formData.get("portfolio") as string;
        const courseIdeas = formData.get("courseIdeas") as string;
        const role = "instructor";

        const userFormData = {
            first_name,
            last_name,
            email,
            password,
            phone_number: phone,
            location,
            area_of_expertise: expertise,
            years_of_experience: experience,
            professional_bio: bio,
            linkedin_profile: linkedin,
            portfolio_website: portfolio,
            proposed_course_ideas: courseIdeas,
            role,
        };

        logger.log("Instructor registration form data:", userFormData);

        // Basic validation
        if (
            !first_name ||
            !last_name ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone ||
            !location ||
            !expertise ||
            !experience ||
            !bio ||
            !courseIdeas
        ) {
            return {
                error: "All fields are required.",
                success: false,
            };
        }

        if (password.length < 8) {
            return {
                error: "Password must be at least 8 characters.",
                success: false,
            };
        }

        if (password !== confirmPassword) {
            return {
                error: "Passwords do not match.",
                success: false,
            };
        }
        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                error: "Invalid email format.",
                success: false,
            };
        }

        // Check if user already exists
        const { data: existingUser, error: userError } = await supabaseServiceRoleClient
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (userError) {
            logger.error("Error checking existing user:", userError);
            return {
                error: "An error occurred while checking for existing users. Please try again.",
                success: false,
            };
        }

        if (existingUser) {
            logger.error("User already exists with email:", email);
            return {
                error: "A user with this email already exists. Please use a different email.",
                success: false,
            };
        }

        const supabase = await createClient();

        // Use Supabase Auth to create user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userFormData,
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/instructor/dashboard`,
            },
        });

        logger.log("Instructor registration data:", data);

        if (error) {
            logger.error("Error during instructor registration:", error);
            return {
                error: error.message,
                success: false,
            };
        }

        // Add instructor to the database
        if (data?.user) {
            const { error } = await supabaseServiceRoleClient.from("users").insert({
                id: data.user.id,
                ...userFormData,
                profile_status: "pending",
                // TODO: Hash the password before storing it
            });

            if (error) {
                logger.error("Error inserting instructor:", error);
                return {
                    error: "An error occurred while creating the instructor. Please try again.",
                    success: false,
                };
            }
        }

        return {
            success: true,
            message: "Registration successful! Please check your email to verify your account.",
        };
    } catch (error: any) {
        return {
            error: error.message || "Registration failed. Please try again.",
            success: false,
        };
    }
}

export async function login(
    prevState: any,
    formData: FormData,
    userType: "learner" | "instructor" | "super-admin"
): Promise<{ error?: string; success: boolean; redirectUrl: string }> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const url = `/${userType}/login`;

    if (!email || !password) {
        return {
            error: "Email and password are required",
            success: false,
            redirectUrl: url,
        };
    }

    const supabase = await createClient();

    // Check user role using email
    const { data: existingUser, error: userError } = await supabaseServiceRoleClient
        .from("users")
        .select("role")
        .eq("email", email)
        .single();

    if (userError) {
        logger.error("Error checking user role:", userError);
        return {
            error: userError?.message || "Error checking user role. Please try again.",
            success: false,
            redirectUrl: url,
        };
    }

    if (existingUser?.role !== userType) {
        logger.error("User role mismatch:", email);
        return {
            error: "User role mismatch. Please use the correct login method.",
            success: false,
            redirectUrl: url,
        };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !data.session) {
        logger.error("Login error:", error);
        return {
            success: false,
            error: error?.message || "Invalid credentials",
            redirectUrl: `/${userType}/login`,
        };
    }

    return {
        success: true,
        redirectUrl: `/${data?.user?.user_metadata?.role}/dashboard`,
    };
}

export async function forgotPassword(email: string): Promise<{ message?: string; error?: string; success: boolean }> {
    try {
        if (!email) {
            return {
                error: "Email is required",
                success: false,
            };
        }

        const supabase = await createClient();
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`;

        // Use Supabase to send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: url,
        });

        if (error) {
            logger.error("Supabase password reset error:", error);
            return {
                error: error?.message || "Failed to send reset email. Please check your email address.",
                success: false,
            };
        }

        return {
            message: "Password reset email sent successfully. Please check your inbox.",
            success: true,
        };
    } catch (error) {
        logger.error("Password reset error:", error);
        return {
            error: "Failed to send reset email. Please try again.",
            success: false,
        };
    }
}

export async function updatePassword(newPassword: string) {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            logger.error("Password update error:", error);
            return {
                success: false,
                message: error.message || "Failed to update password. Please try again.",
            };
        }

        return {
            success: true,
            message: "Your password has been successfully updated.",
        };
    } catch (error) {
        logger.error("Error updating password:", error);
        return {
            success: false,
            message: "Failed to update your password. Please try again later.",
        };
    }
}
