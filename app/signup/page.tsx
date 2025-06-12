"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signupUser } from "@/app/actions/auth-actions"

export default function SignupPage() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<any>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signupUser(null, formData)
      setState(result)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Create Account</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input type="text" name="name" placeholder="Full Name" required className="bg-white border-gray-300" />
            </div>

            <div className="space-y-2">
              <Input type="email" name="email" placeholder="Email" required className="bg-white border-gray-300" />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
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
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
