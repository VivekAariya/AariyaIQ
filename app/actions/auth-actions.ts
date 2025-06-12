"use server"

import { redirect } from "next/navigation"
import { sendPasswordResetEmail } from "@/lib/email-service"

export async function loginUser(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const userType = formData.get("userType") as string

    if (!email || !password) {
      return {
        error: "Email and password are required",
        success: false,
      }
    }

    // Simulate authentication logic
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - replace with real logic
    if (email && password) {
      // Redirect based on user type
      if (userType === "learner") {
        redirect("/dashboard")
      } else if (userType === "instructor") {
        redirect("/instructor/dashboard")
      } else if (userType === "admin") {
        redirect("/admin/dashboard")
      } else if (userType === "super-admin") {
        redirect("/super-admin/dashboard")
      }
    }

    return {
      error: "Invalid credentials",
      success: false,
    }
  } catch (error) {
    return {
      error: "Login failed. Please try again.",
      success: false,
    }
  }
}

export async function signupUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!name || !email || !password || !confirmPassword) {
      return {
        error: "All fields are required",
        success: false,
      }
    }

    if (password !== confirmPassword) {
      return {
        error: "Passwords do not match",
        success: false,
      }
    }

    // Simulate user creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful registration
    redirect("/dashboard")
  } catch (error) {
    return {
      error: "Registration failed. Please try again.",
      success: false,
    }
  }
}

export async function forgotPassword(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email) {
      return {
        error: "Email is required",
        success: false,
      }
    }

    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      message: "Password reset email sent successfully",
      success: true,
    }
  } catch (error) {
    return {
      error: "Failed to send reset email. Please try again.",
      success: false,
    }
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
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now

    // Store the token in your database associated with this user
    // This is a placeholder for your actual database operation
    // await db.passwordResetTokens.create({ email, token, expiresAt })

    // Create the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`

    // Calculate expiry time in human-readable format
    const expiryMinutes = 30 // Token expires in 30 minutes
    const expiryText = `${expiryMinutes} minutes`

    // Send the password reset email
    await sendPasswordResetEmail(email, email.split("@")[0], resetLink, expiryText)

    return {
      success: true,
      message: "If your email is registered with us, you will receive a password reset link shortly.",
    }
  } catch (error) {
    console.error("Error requesting password reset:", error)
    return {
      success: false,
      message: "Failed to process your request. Please try again later.",
    }
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
    }
  } catch (error) {
    console.error("Error resetting password:", error)
    return {
      success: false,
      message: "Failed to reset your password. Please try again later.",
    }
  }
}
