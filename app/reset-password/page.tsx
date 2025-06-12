"use client"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { resetPassword } from "@/app/actions/auth-actions"

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<any>(null)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const newPassword = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string

      if (newPassword !== confirmPassword) {
        setState({
          success: false,
          message: "Passwords do not match",
        })
        return
      }

      if (!token) {
        setState({
          success: false,
          message: "Invalid reset token",
        })
        return
      }

      const result = await resetPassword(token, newPassword)
      setState(result)
    })
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600">
        <MainNav />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6 text-center">
              <p className="text-red-600">Invalid or missing reset token.</p>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Request a new reset link
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Set New Password</CardTitle>
          </CardHeader>
          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              {state?.message && (
                <div className={`text-sm text-center ${state.success ? "text-green-600" : "text-red-600"}`}>
                  {state.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-600">
              <Link href="/login" className="text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
