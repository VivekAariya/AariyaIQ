"use server";

import { hashPassword, passwordsMatch, validatePassword } from "@/lib/auth-utils";
import { sendContactUsEmail } from "@/lib/email-service";
import logger from "@/utils/logger";

interface RegistrationResult {
    success: boolean;
    message: string;
    userId?: string;
}

export async function registerUser(formData: FormData): Promise<RegistrationResult> {
    try {
        // Extract form data
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            return { success: false, message: "All fields are required" };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Please enter a valid email address" };
        }

        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return { success: false, message: passwordValidation.message };
        }

        // Check if passwords match
        if (!passwordsMatch(password, confirmPassword)) {
            return { success: false, message: "Passwords do not match" };
        }

        // In a real application, you would check if the email already exists
        // For example: const existingUser = await db.user.findUnique({ where: { email } })
        // if (existingUser) return { success: false, message: "Email already registered" }

        // Hash the password
        const { hash, salt } = hashPassword(password);

        // Create a new user in the database
        // In a real application, you would store the user in your database
        // For example: const newUser = await db.user.create({ data: { name, email, password: hash, salt } })

        // For now, we'll simulate a successful registration
        const userId = `user_${Date.now()}`;

        // Return success
        return {
            success: true,
            message: "Account created successfully! You can now log in.",
            userId,
        };
    } catch (error) {
        logger.error("Error registering user:", error);
        return {
            success: false,
            message: "An error occurred during registration. Please try again.",
        };
    }
}

export async function contactUs(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!firstName || !lastName || !email || !phone || !subject || !message) {
            return { success: false, message: "All fields are required." };
        }

        await sendContactUsEmail({ email, firstName, lastName, phone, subject, message });

        return { success: true, message: "Message sent successfully!" };
    } catch (error: any) {
        logger.error("Exception in support:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}
