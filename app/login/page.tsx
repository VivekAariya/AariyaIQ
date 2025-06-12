"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loginUser } from "@/app/actions/auth-actions"

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<any>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await loginUser(null, formData)
      setState(result)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Learner Login</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <input type="hidden" name="userType" value="learner" />

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

            {state?.error && <div className="text-red-600 text-sm text-center">{state.error}</div>}

            {state?.message && <div className="text-green-600 text-sm text-center">{state.message}</div>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col space-y-2">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
