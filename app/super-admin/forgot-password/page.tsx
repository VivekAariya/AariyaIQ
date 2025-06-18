"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Shield, ArrowLeft } from "lucide-react"
import { requestSuperAdminPasswordReset } from "@/app/actions/super-admin-actions"

export default function SuperAdminForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await requestSuperAdminPasswordReset(email)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Request Submitted",
          description: "If your email is registered as a super admin, you will receive reset instructions.",
        })
      } else {
        toast({
          title: "Request Failed",
          description: result.message || "Failed to process your request. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      logger.error("Password reset request error:", error)
      toast({
        title: "System Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-2 border-purple-400/30 shadow-xl shadow-purple-500/20 bg-black/30 backdrop-blur-sm">
          <CardHeader className="space-y-2 border-b border-purple-500/20 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white text-center">Reset Super Admin Password</CardTitle>
            <CardDescription className="text-gray-300 text-base text-center">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive password reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200 text-base">
                    Super Admin Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="superadmin@aariyatech.com"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Send Reset Instructions"}
                </Button>
              </form>
            ) : (
              <div className="space-y-5 py-4">
                <div className="p-4 bg-purple-900/30 border border-purple-500/50 rounded-md text-center">
                  <p className="text-purple-200 text-sm">
                    If your email is registered as a super admin, you will receive password reset instructions shortly.
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Didn't receive an email? Check your spam folder or contact the system administrator.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="w-full border-t border-gray-700 my-2"></div>
            <div className="text-center">
              <Link
                href="/super-admin/login"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Super Admin Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
