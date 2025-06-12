"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { requestPasswordReset } from "@/app/actions/auth-actions"

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<any>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string
      const result = await requestPasswordReset(email)
      setState(result)
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Reset Password</CardTitle>
          </CardHeader>
          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              {state?.error && <div className="text-red-600 text-sm text-center">{state.error}</div>}

              {state?.message && <div className="text-green-600 text-sm text-center">{state.message}</div>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
