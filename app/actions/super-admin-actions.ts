"use server";

import { login } from "@/app/actions/auth-actions";
import logger from "@/utils/logger";

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
