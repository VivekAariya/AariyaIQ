"use server";

import { createServerClient } from "@/lib/supabase-server-client";
import { supabaseServiceRoleClient } from "@/lib/supabaseClient";

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
            console.error("Error checking existing user:", userError);
            return {
                error: "An error occurred while checking for existing users. Please try again.",
                success: false,
            };
        }

        if (existingUser) {
            console.error("User already exists with email:", email);
            return {
                error: "A user with this email already exists. Please use a different email.",
                success: false,
            };
        }

        const supabase = createServerClient();

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
                emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL,
            },
        });

        console.log("Registration data:", data);

        if (error) {
            console.error("Error during registration:", error);
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
                console.error("Error inserting user:", error);
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

export async function loginLearner(prevState: any, formData: FormData): Promise<{ error?: string; success: boolean }> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required", success: false };
    }

    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !data.session) {
        console.error("Login error:", error);
        return { success: false, error: error?.message ?? "Invalid credentials" };
    }

    return { success: true };
}

export async function forgotPassword(email: string): Promise<{ message?: string; error?: string; success: boolean }> {
    try {
        if (!email) {
            return {
                error: "Email is required",
                success: false,
            };
        }

        const supabase = createServerClient();
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`;

        // Use Supabase to send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: url,
        });

        if (error) {
            console.error("Supabase password reset error:", error);
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
        console.error("Password reset error:", error);
        return {
            error: "Failed to send reset email. Please try again.",
            success: false,
        };
    }
}

export async function updatePassword(newPassword: string) {
    try {
        const supabase = createServerClient();

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            console.error("Password update error:", error);
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
        console.error("Error updating password:", error);
        return {
            success: false,
            message: "Failed to update your password. Please try again later.",
        };
    }
}
