import { testEmailService } from "@/lib/email-service"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await testEmailService()

    return NextResponse.json({
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
