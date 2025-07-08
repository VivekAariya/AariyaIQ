"use server";

import { sendEmail } from "@/lib/email-service";
import logger from "@/utils/logger";
import { sendAdminLaunchPageNotification, sendLaunchPageNotification } from "./email-actions";

export async function submitLaunchInterest(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = (formData.get("message") as string) || "";

        if (!name || !email) {
            return {
                success: false,
                error: "Name and email are required",
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: "Please enter a valid email address",
            };
        }

        // Send notification email
        await sendLaunchPageNotification({
            recipientName: name,
            recipientEmail: email,
        });

        // Send notification email to admin
        await sendAdminLaunchPageNotification({
            recipientEmail: "hello@aariyatech.co.uk",
            recipientName: "Admin",
            applicationDate: new Date().toLocaleDateString(),
            expertise: `Name: ${name}, Email: ${email}${message ? `, Message: ${message}` : ""}`,
        });

        return {
            success: true,
            message: "Thank you for your interest! We'll notify you when AariyaIQ launches.",
        };
    } catch (error) {
        logger.error("Error submitting launch interest:", error);
        return {
            success: false,
            error: "Something went wrong. Please try again later.",
        };
    }
}
