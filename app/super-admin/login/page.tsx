"use client"

import type React from "react"

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
import { Shield, Lock, AlertTriangle } from "lucide-react"
import { loginSuperAdmin } from "@/app/actions/super-admin-actions"

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const result = await loginSuperAdmin(formData)

      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to AariyaIQ Super Admin Portal!",
        })
        router.push("/super-admin/dashboard")
      } else {
        setError(result.message || "Authentication failed. Please check your credentials.")
        toast({
          title: "Login Failed",
          description: result.message || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      logger.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
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
            <CardTitle className="text-3xl font-bold text-white text-center">Super Admin</CardTitle>
            <CardDescription className="text-gray-300 text-base text-center">
              Restricted access - Authorized personnel only
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="superadmin@aariyatech.com"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-200 text-base">
                    Password
                  </Label>
                  <Link
                    href="/super-admin/forgot-password"
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
                  className="bg-gray-800/50 border-gray-700 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityKey" className="text-gray-200 text-base">
                  Security Key
                </Label>
                <div className="relative">
                  <Input
                    id="securityKey"
                    name="securityKey"
                    type="password"
                    placeholder="Enter your security key"
                    required
                    className="bg-gray-800/50 border-gray-700 text-white h-11 pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  The security key is provided to authorized super administrators only.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : "Access System"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="w-full border-t border-gray-700 my-2"></div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                This is a secure area. All login attempts are monitored and logged.
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
