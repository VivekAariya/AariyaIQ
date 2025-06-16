"use server";

import { sendPasswordResetEmail, sendEmail } from "@/lib/email-service";
import { createServerClient } from "@/lib/supabase-server-client";
import { supabaseServiceRoleClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export async function registerUser(
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
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
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
    const userType = formData.get("userType") as string;

    if (!email || !password) {
        return { error: "Email and password are required", success: false };
    }

    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !data.session) {
        return { error: error?.message ?? "Invalid credentials", success: false };
    }

    // Optionally: store session or user info in context/localStorage

    return { success: true };
}

export async function forgotPassword(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string;

        if (!email) {
            return {
                error: "Email is required",
                success: false,
            };
        }

        // Simulate sending reset email
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            message: "Password reset email sent successfully",
            success: true,
        };
    } catch (error) {
        return {
            error: "Failed to send reset email. Please try again.",
            success: false,
        };
    }
}

/**
 * Request a password reset
 * @param email User's email address
 */
export async function requestPasswordReset(email: string) {
    try {
        // In a real application, you would check if the email exists in your database
        // For this example, we'll assume the email exists

        // Generate a secure token and expiry time
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

        // Store the token in your database associated with this user
        // This is a placeholder for your actual database operation
        // await db.passwordResetTokens.create({ email, token, expiresAt })

        // Create the reset link
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

        // Calculate expiry time in human-readable format
        const expiryMinutes = 30; // Token expires in 30 minutes
        const expiryText = `${expiryMinutes} minutes`;

        // Send the password reset email
        await sendPasswordResetEmail(email, email.split("@")[0], resetLink, expiryText);

        return {
            success: true,
            message: "If your email is registered with us, you will receive a password reset link shortly.",
        };
    } catch (error) {
        console.error("Error requesting password reset:", error);
        return {
            success: false,
            message: "Failed to process your request. Please try again later.",
        };
    }
}

/**
 * Reset password with token
 * @param token Reset token
 * @param newPassword New password
 */
export async function resetPassword(token: string, newPassword: string) {
    try {
        // In a real application, you would:
        // 1. Verify the token exists and is not expired
        // 2. Get the user associated with the token
        // 3. Update the user's password
        // 4. Delete the used token

        // This is a placeholder for your actual implementation
        // const tokenRecord = await db.passwordResetTokens.findUnique({ where: { token } })
        // if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
        //   return { success: false, message: "Invalid or expired token." }
        // }
        // await db.user.update({ where: { email: tokenRecord.email }, data: { password: hashedPassword } })
        // await db.passwordResetTokens.delete({ where: { token } })

        // For this example, we'll simulate a successful password reset
        return {
            success: true,
            message: "Your password has been successfully reset. You can now log in with your new password.",
        };
    } catch (error) {
        console.error("Error resetting password:", error);
        return {
            success: false,
            message: "Failed to reset your password. Please try again later.",
        };
    }
}
