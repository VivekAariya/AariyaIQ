"use server"

import { Resend } from "resend"

// Initialize Resend with API key and error handling
function initializeResend() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    throw new Error("Email service is not configured. Please set RESEND_API_KEY environment variable.")
  }

  if (!apiKey.startsWith("re_")) {
    console.error("Invalid Resend API key format. Key should start with 're_'")
    throw new Error("Invalid email service configuration.")
  }

  return new Resend(apiKey)
}

// Email configuration
const emailConfig = {
  sender: "hello@aariyatech.co.uk",
}

// Email types
export type EmailType =
  | "learner-registration-received"
  | "learner-initial-approval"
  | "learner-payment-required"
  | "learner-compliance-check"
  | "learner-final-approval"
  | "instructor-application-received"
  | "instructor-initial-approval"
  | "instructor-payment-required"
  | "instructor-compliance-check"
  | "instructor-final-approval"
  | "password-reset"
  | "launch-page-notification"
  | "admin-launch-notification"

// Email data interface
export interface EmailData {
  recipientName: string
  recipientEmail: string
  courseName?: string
  courseStartDate?: string
  paymentAmount?: string
  paymentLink?: string
  applicationDate?: string
  expertise?: string
  loginLink?: string
  approvalStage?: string
  nextSteps?: string[]
  resetLink?: string
  resetExpiry?: string
}

/**
 * Generate HTML email template
 */
function generateEmailHTML(type: EmailType, data: EmailData): string {
  const baseStyles = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0; }
      .content { background-color: #ffffff; padding: 20px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
      .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
      .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; margin: 20px 0; }
      .alert { padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #f59e0b; background-color: #fff7ed; }
      .highlight { background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #0ea5e9; }
    </style>
  `

  const header = `
    <div class="header">
      <h1 style="margin: 0;">AariyaIQ Learning Hub</h1>
    </div>
  `

  const footer = `
    <div class="footer">
      <p>hello@aariyatech.co.uk | © ${new Date().getFullYear()} AariyaTech UK. All rights reserved.</p>
    </div>
  `

  let content = ""

  switch (type) {
    case "launch-page-notification":
      content = `
        <h2>Hello ${data.recipientName},</h2>
        <p>Thank you for showing interest in <strong>AariyaIQ</strong>! We're excited to have you join our community of learners and innovators.</p>
        <p>We're working hard to bring you an amazing learning experience. You'll be among the first to know when we launch!</p>
        <div class="highlight">
          <h3 style="color: #0369a1; margin: 0 0 15px 0;">What's Coming:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Cutting-edge technology courses</li>
            <li>Expert instructors from the industry</li>
            <li>Hands-on learning experiences</li>
            <li>Career advancement opportunities</li>
          </ul>
        </div>
        ${
          data.nextSteps && data.nextSteps.length > 0
            ? `
          <p><strong>Next Steps:</strong></p>
          <ul>
            ${data.nextSteps.map((step) => `<li>${step}</li>`).join("")}
          </ul>
        `
            : ""
        }
        <p>Stay tuned for updates and exclusive early access!</p>
        <p>Best regards,<br/>The AariyaIQ Team</p>
      `
      break

    case "admin-launch-notification":
      content = `
        <h2>New Launch Page Interest</h2>
        <p>Someone has shown interest in AariyaIQ from the launch page.</p>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
          <p><strong>Date:</strong> ${data.applicationDate || new Date().toLocaleDateString()}</p>
          <p><strong>Details:</strong> ${data.expertise || "No additional details provided"}</p>
        </div>
        <p style="font-size: 14px; color: #6b7280;">This notification was sent from the AariyaIQ launch page.</p>
      `
      break

    case "learner-registration-received":
      content = `
        <h2>Hello ${data.recipientName},</h2>
        <p>Thank you for registering for <strong>${data.courseName || "our course"}</strong> at AariyaIQ Learning Hub. We have received your application and it is currently under review.</p>
        <p><strong>Application Date:</strong> ${data.applicationDate || new Date().toLocaleDateString()}<br/>
        <strong>Course Start Date:</strong> ${data.courseStartDate || "To be announced"}</p>
        <p>Our team will review your application and get back to you shortly with the next steps.</p>
        ${data.loginLink ? `<p>You can check the status of your application by logging into your dashboard:<br/><a href="${data.loginLink}" class="button">View Application Status</a></p>` : ""}
        <p>If you have any questions, please contact our support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.</p>
      `
      break

    case "instructor-application-received":
      content = `
        <h2>Hello ${data.recipientName},</h2>
        <p>Thank you for your interest in becoming an instructor with AariyaIQ Learning Hub!</p>
        <p>We have received your application and it is currently under review.</p>
        <p><strong>Application Date:</strong> ${data.applicationDate || new Date().toLocaleDateString()}<br/>
        <strong>Expertise:</strong> ${data.expertise || "Please contact us for details"}</p>
        <p>Our team will review your application and get back to you shortly with the next steps.</p>
        <p>If you have any questions, please contact our support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.</p>
      `
      break

    case "password-reset":
      content = `
        <h2>Hello ${data.recipientName},</h2>
        <p>We received a request to reset your password for your AariyaIQ Learning Hub account.</p>
        ${data.resetLink ? `<p>To reset your password, please click the button below:<br/><a href="${data.resetLink}" class="button">Reset Password</a></p>` : ""}
        <div class="alert">
          <h4 style="margin: 0 0 5px 0; color: #d97706;">Important</h4>
          <p style="margin: 0; color: #7c2d12;">This link will expire in ${data.resetExpiry || "24 hours"}. If you did not request a password reset, please ignore this email or contact us if you have concerns.</p>
        </div>
        <p>If you have any questions, please contact our support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.</p>
      `
      break

    default:
      content = `
        <h2>Hello ${data.recipientName || "there"},</h2>
        <p>Thank you for your interest in AariyaIQ Learning Hub.</p>
        <p>This is a notification from our system.</p>
        <p>If you have any questions, please contact our support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.</p>
      `
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>${getEmailSubject(type, data)}</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        ${header}
        <div class="content">
          ${content}
        </div>
        ${footer}
      </div>
    </body>
    </html>
  `
}

/**
 * Send an email notification
 * @param type Email template type
 * @param data Email data
 * @returns Promise with send result
 */
export async function sendEmail(type: EmailType, data: EmailData) {
  try {
    console.log(`[EMAIL SERVICE] Starting email send process for type: ${type}`)
    console.log(`[EMAIL SERVICE] Recipient: ${data.recipientEmail}`)

    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("[EMAIL SERVICE] RESEND_API_KEY not found in environment variables")
      return {
        success: false,
        error: "Email service not configured. Please contact administrator.",
        debug: { step: "api_key_check", hasKey: false },
      }
    }

    console.log(`[EMAIL SERVICE] API key found, length: ${process.env.RESEND_API_KEY.length}`)

    // Initialize Resend client
    let resend
    try {
      resend = initializeResend()
      console.log("[EMAIL SERVICE] Resend client initialized successfully")
    } catch (initError) {
      console.error("[EMAIL SERVICE] Failed to initialize Resend:", initError)
      return {
        success: false,
        error: "Failed to initialize email service",
        debug: { step: "resend_init", error: initError.message },
      }
    }

    // Generate email HTML
    let emailHtml
    try {
      emailHtml = generateEmailHTML(type, data)
      console.log(`[EMAIL SERVICE] Email HTML generated successfully, length: ${emailHtml.length}`)

      // Verify it's a string
      if (typeof emailHtml !== "string") {
        throw new Error(`Email HTML is not a string, got: ${typeof emailHtml}`)
      }
    } catch (renderError) {
      console.error("[EMAIL SERVICE] Failed to generate email HTML:", renderError)
      return {
        success: false,
        error: "Failed to generate email content",
        debug: { step: "html_generation", error: renderError.message },
      }
    }

    // Get email subject based on type
    const subject = getEmailSubject(type, data)
    console.log(`[EMAIL SERVICE] Email subject: ${subject}`)

    // Prepare email data
    const emailData = {
      from: `AariyaIQ <${emailConfig.sender}>`,
      to: data.recipientEmail,
      subject: subject,
      html: emailHtml,
    }

    console.log(`[EMAIL SERVICE] Attempting to send email via Resend API`)
    console.log(`[EMAIL SERVICE] Email data prepared:`, {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      htmlLength: emailData.html.length,
      htmlType: typeof emailData.html,
    })

    // Send email using Resend
    const result = await resend.emails.send(emailData)

    console.log(`[EMAIL SERVICE] Email sent successfully! Message ID: ${result.id}`)
    return {
      success: true,
      messageId: result.id,
      debug: {
        step: "send_success",
        subject,
        recipient: data.recipientEmail,
        type,
        htmlLength: emailHtml.length,
      },
    }
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending email:", error)

    // Provide more specific error messages
    let errorMessage = "Failed to send email. Please try again later."
    const debugInfo: any = { step: "send_error" }

    if (error instanceof Error) {
      debugInfo.errorMessage = error.message
      debugInfo.errorName = error.name

      if (error.message.includes("API key")) {
        errorMessage = "Email service configuration error. Please contact administrator."
        debugInfo.issue = "api_key_invalid"
      } else if (error.message.includes("domain")) {
        errorMessage = "Email domain not verified. Please contact administrator."
        debugInfo.issue = "domain_not_verified"
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Email rate limit exceeded. Please try again later."
        debugInfo.issue = "rate_limit"
      } else if (error.message.includes("invalid email")) {
        errorMessage = "Invalid email address provided."
        debugInfo.issue = "invalid_email"
      } else if (error.message.includes("validation_error")) {
        errorMessage = "Email validation error. Please check the email format."
        debugInfo.issue = "validation_error"
      }
    }

    return {
      success: false,
      error: errorMessage,
      debug: debugInfo,
    }
  }
}

/**
 * Get email subject based on type
 */
function getEmailSubject(type: EmailType, data: EmailData): string {
  const subjects: Record<EmailType, string> = {
    "learner-registration-received": `Your AariyaIQ Registration: ${data.courseName || "Course"} - Received`,
    "learner-initial-approval": `Your AariyaIQ Registration: ${data.courseName || "Course"} - Initially Approved`,
    "learner-payment-required": `Action Required: Payment for ${data.courseName || "Course"} Registration`,
    "learner-compliance-check": `Your AariyaIQ Registration: Compliance Check in Progress`,
    "learner-final-approval": `Congratulations! Your AariyaIQ Course Registration is Approved`,
    "instructor-application-received": "Your AariyaIQ Instructor Application - Received",
    "instructor-initial-approval": "Your AariyaIQ Instructor Application - Initially Approved",
    "instructor-payment-required": "Action Required: Payment for Instructor Registration",
    "instructor-compliance-check": "Your AariyaIQ Instructor Application: Compliance Check in Progress",
    "instructor-final-approval": "Congratulations! Your AariyaIQ Instructor Application is Approved",
    "password-reset": "Reset Your AariyaIQ Password",
    "launch-page-notification": "Thank you for your interest in AariyaIQ!",
    "admin-launch-notification": "New Launch Page Interest - AariyaIQ",
  }

  return subjects[type]
}

/**
 * Send a password reset email
 * @param recipientEmail Email address to send to
 * @param recipientName Name of the recipient
 * @param resetLink Password reset link
 * @param resetExpiry Expiry time for the reset link
 * @returns Promise with send result
 */
export async function sendPasswordResetEmail(
  recipientEmail: string,
  recipientName: string,
  resetLink: string,
  resetExpiry?: string,
) {
  return await sendEmail("password-reset", {
    recipientName,
    recipientEmail,
    resetLink,
    resetExpiry: resetExpiry || "24 hours",
  })
}

/**
 * Test email service configuration
 */
export async function testEmailService() {
  try {
    console.log("[EMAIL SERVICE] Testing email service configuration...")

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.error("[EMAIL SERVICE] No API key found")
      return {
        success: false,
        error: "RESEND_API_KEY environment variable is not set",
        debug: {
          hasApiKey: false,
          apiKeyFormat: "N/A",
          environment: process.env.NODE_ENV || "unknown",
          timestamp: new Date().toISOString(),
        },
      }
    }

    console.log(`[EMAIL SERVICE] API key found, checking format...`)

    if (!apiKey.startsWith("re_")) {
      console.error("[EMAIL SERVICE] Invalid API key format")
      return {
        success: false,
        error: "Invalid API key format. Should start with 're_'",
        debug: {
          hasApiKey: true,
          apiKeyFormat: "Invalid",
          keyPrefix: apiKey.substring(0, 3),
          keyLength: apiKey.length,
          environment: process.env.NODE_ENV || "unknown",
          timestamp: new Date().toISOString(),
        },
      }
    }

    console.log("[EMAIL SERVICE] API key format is valid")

    // Try to initialize Resend
    try {
      const resend = new Resend(apiKey)
      console.log("[EMAIL SERVICE] Resend client created successfully")

      return {
        success: true,
        message: "Email service configured correctly",
        debug: {
          hasApiKey: true,
          apiKeyFormat: "Valid",
          keyPrefix: apiKey.substring(0, 3),
          keyLength: apiKey.length,
          environment: process.env.NODE_ENV || "unknown",
          sender: emailConfig.sender,
          timestamp: new Date().toISOString(),
        },
      }
    } catch (resendError) {
      console.error("[EMAIL SERVICE] Failed to create Resend client:", resendError)
      return {
        success: false,
        error: "Failed to initialize Resend client",
        debug: {
          hasApiKey: true,
          apiKeyFormat: "Valid",
          initError: resendError instanceof Error ? resendError.message : "Unknown error",
          environment: process.env.NODE_ENV || "unknown",
          timestamp: new Date().toISOString(),
        },
      }
    }
  } catch (error) {
    console.error("[EMAIL SERVICE] Test service error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      debug: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        apiKeyFormat: process.env.RESEND_API_KEY?.startsWith("re_") ? "Valid" : "Invalid",
        environment: process.env.NODE_ENV || "unknown",
        testError: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    }
  }
}
