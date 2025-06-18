import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    // Test user email
    const userResult = await sendEmail("launch-page-notification", {
      recipientName: name,
      recipientEmail: email,
      courseName: "Test Email",
    })

    // Test admin email
    const adminResult = await sendEmail("admin-launch-notification", {
      recipientName: "Admin",
      recipientEmail: "hello@aariyatech.co.uk",
      courseName: "Test Email",
      applicationDate: new Date().toLocaleDateString(),
      expertise: `Test from API - Name: ${name}, Email: ${email}`,
    })

    return NextResponse.json({
      success: true,
      userEmail: userResult,
      adminEmail: adminResult,
      message: "Test emails sent successfully!",
    })
  } catch (error) {
    logger.error("Test email error:", error)
    return NextResponse.json({ error: "Failed to send test emails", details: error }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email test endpoint",
    usage: "POST with { email, name } to test email functionality",
  })
}
