"use server"

import { sendEmail } from "@/lib/email-service"

export async function submitLaunchInterest(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = (formData.get("message") as string) || ""

    if (!name || !email) {
      return {
        success: false,
        error: "Name and email are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Check if email service is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("Email service not configured - RESEND_API_KEY missing")
      return {
        success: false,
        error: "Email service is temporarily unavailable. Please try again later.",
      }
    }

    console.log("Attempting to send launch interest emails...")

    // Send confirmation email to user
    const userEmailResult = await sendEmail("launch-page-notification", {
      recipientName: name,
      recipientEmail: email,
      courseName: "AariyaIQ Launch",
      applicationDate: new Date().toLocaleDateString(),
      nextSteps: [
        "Watch for our launch announcement",
        "Prepare to explore our cutting-edge courses",
        "Share with colleagues who might be interested",
      ],
    })

    if (!userEmailResult.success) {
      console.error("Failed to send user email:", userEmailResult.error)
      return {
        success: false,
        error: "Failed to send confirmation email. Please try again.",
      }
    }

    // Send notification email to admin
    const adminEmailResult = await sendEmail("admin-launch-notification", {
      recipientName: "Admin",
      recipientEmail: "hello@aariyatech.co.uk",
      courseName: "Launch Page Interest",
      applicationDate: new Date().toLocaleDateString(),
      expertise: `Name: ${name}, Email: ${email}${message ? `, Message: ${message}` : ""}`,
    })

    if (!adminEmailResult.success) {
      console.error("Failed to send admin email:", adminEmailResult.error)
      // Still return success to user since their email was sent
    }

    return {
      success: true,
      message: "Thank you for your interest! We'll notify you when AariyaIQ launches.",
    }
  } catch (error) {
    console.error("Error submitting launch interest:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}
