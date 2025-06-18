import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, testEmailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    console.log("Testing launch email functionality...")

    // First test the email service
    const serviceTest = await testEmailService()
    console.log("Service test result:", serviceTest)

    if (!serviceTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service configuration failed",
          serviceTest,
        },
        { status: 500 },
      )
    }

    // Test user notification email
    const userResult = await sendEmail("launch-page-notification", {
      recipientName: name,
      recipientEmail: email,
      courseName: "AariyaIQ Launch Test",
      applicationDate: new Date().toLocaleDateString(),
      nextSteps: ["This is a test email", "Check if you received this email", "Verify the email formatting"],
    })

    // Test admin notification email
    const adminResult = await sendEmail("admin-launch-notification", {
      recipientName: "Admin",
      recipientEmail: "hello@aariyatech.co.uk",
      courseName: "Launch Email Test",
      applicationDate: new Date().toLocaleDateString(),
      expertise: `Test from API - Name: ${name}, Email: ${email}${message ? `, Message: ${message}` : ""}`,
    })

    return NextResponse.json({
      success: true,
      message: "Test emails sent successfully!",
      results: {
        serviceTest,
        userEmail: userResult,
        adminEmail: adminResult,
      },
    })
  } catch (error) {
    logger.error("Launch email test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test launch emails",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Just test the service configuration
    const serviceTest = await testEmailService()

    return NextResponse.json({
      message: "Launch email test endpoint",
      serviceTest,
      usage: "POST with { email, name, message } to test launch email functionality",
      environment: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        keyFormat: process.env.RESEND_API_KEY?.startsWith("re_") ? "Valid" : "Invalid",
        nodeEnv: process.env.NODE_ENV,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Service check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
