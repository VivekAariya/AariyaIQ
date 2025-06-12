"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, always succeed
      toast({
        title: "Login Successful",
        description: "Welcome back to AariyaIQ Instructor Portal!",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-2 border-purple-400/30 shadow-xl shadow-purple-500/20 bg-gray-950/90">
          <CardHeader className="space-y-2 border-b border-purple-500/20 pb-6">
            <CardTitle className="text-3xl font-bold text-white">Instructor Login</CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Enter your credentials to access your instructor account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="instructor@example.com"
                  required
                  className="bg-gray-800 border-gray-700 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-200 text-base">
                    Password
                  </Label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-gray-800 border-gray-700 text-white h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t border-purple-500/20 pt-6">
            <div className="text-center">
              <p className="text-gray-300 text-base mb-2">Don&apos;t have an instructor account?</p>
              <Link
                href="/instructor-registration"
                className="inline-block px-6 py-2 bg-indigo-900/50 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors"
              >
                Sign up as Instructor
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
