import { type NextRequest, NextResponse } from "next/server"
import { testEmailService, sendEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email, name, testType = "basic" } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    console.log("Starting email test with:", { email, name, testType })

    // First, test the email service configuration
    const serviceTest = await testEmailService()
    console.log("Email service test result:", serviceTest)

    if (!serviceTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service configuration failed",
          details: serviceTest,
        },
        { status: 500 },
      )
    }

    const results: any = {
      serviceTest,
      emails: {},
    }

    // Test different email types based on testType
    if (testType === "basic" || testType === "all") {
      // Test launch page notification
      try {
        const launchResult = await sendEmail("launch-page-notification", {
          recipientName: name,
          recipientEmail: email,
          courseName: "Email Test Course",
          nextSteps: ["Check your email", "Verify functionality", "Report any issues"],
        })
        results.emails.launchNotification = launchResult
        console.log("Launch notification result:", launchResult)
      } catch (error) {
        logger.error("Launch notification error:", error)
        results.emails.launchNotification = { success: false, error: error.message }
      }

      // Test admin notification
      try {
        const adminResult = await sendEmail("admin-launch-notification", {
          recipientName: "Admin",
          recipientEmail: "hello@aariyatech.co.uk",
          applicationDate: new Date().toLocaleDateString(),
          expertise: `Email test from ${name} (${email}) - ${new Date().toISOString()}`,
        })
        results.emails.adminNotification = adminResult
        console.log("Admin notification result:", adminResult)
      } catch (error) {
        logger.error("Admin notification error:", error)
        results.emails.adminNotification = { success: false, error: error.message }
      }
    }

    if (testType === "learner" || testType === "all") {
      // Test learner registration email
      try {
        const learnerResult = await sendEmail("learner-registration-received", {
          recipientName: name,
          recipientEmail: email,
          courseName: "Full Stack Development",
          courseStartDate: "2025-02-01",
          applicationDate: new Date().toLocaleDateString(),
          loginLink: "https://aariyaiq.vercel.app/login",
        })
        results.emails.learnerRegistration = learnerResult
        console.log("Learner registration result:", learnerResult)
      } catch (error) {
        logger.error("Learner registration error:", error)
        results.emails.learnerRegistration = { success: false, error: error.message }
      }
    }

    if (testType === "instructor" || testType === "all") {
      // Test instructor application email
      try {
        const instructorResult = await sendEmail("instructor-application-received", {
          recipientName: name,
          recipientEmail: email,
          expertise: "React, Node.js, TypeScript",
          applicationDate: new Date().toLocaleDateString(),
          loginLink: "https://aariyaiq.vercel.app/instructor/login",
        })
        results.emails.instructorApplication = instructorResult
        console.log("Instructor application result:", instructorResult)
      } catch (error) {
        logger.error("Instructor application error:", error)
        results.emails.instructorApplication = { success: false, error: error.message }
      }
    }

    // Check if any emails were sent successfully
    const emailResults = Object.values(results.emails)
    const successfulEmails = emailResults.filter((result: any) => result.success).length
    const totalEmails = emailResults.length

    return NextResponse.json({
      success: successfulEmails > 0,
      message: `${successfulEmails}/${totalEmails} emails sent successfully`,
      results,
      summary: {
        totalEmails,
        successfulEmails,
        failedEmails: totalEmails - successfulEmails,
      },
    })
  } catch (error) {
    logger.error("Detailed email test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Email test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Test just the service configuration
    const serviceTest = await testEmailService()

    return NextResponse.json({
      message: "Email service status check",
      serviceTest,
      usage: "POST with { email, name, testType } to test email functionality",
      testTypes: ["basic", "learner", "instructor", "all"],
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
