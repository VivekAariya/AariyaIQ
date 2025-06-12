"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { submitLaunchInterest } from "@/app/actions/launch-actions"

export default function TestLaunchEmailPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    if (!email || !name) {
      setResult({ success: false, error: "Please enter both name and email" })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("message", message)

      const response = await submitLaunchInterest(null, formData)
      setResult(response)
    } catch (error) {
      console.error("Test failed:", error)
      setResult({
        success: false,
        error: "Test failed: " + (error instanceof Error ? error.message : "Unknown error"),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-black/60 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Test Launch Email Functionality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
              <textarea
                placeholder="Optional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />

              <Button
                onClick={testEmail}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                {loading ? "Testing..." : "Test Launch Email"}
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Test Result:</h3>
                {result.success ? (
                  <div className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded">
                    <p>
                      <strong>Success!</strong> {result.message}
                    </p>
                    <p className="text-sm mt-2">Check your email inbox and spam folder.</p>
                  </div>
                ) : (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded">
                    <p>
                      <strong>Error:</strong> {result.error}
                    </p>
                  </div>
                )}

                <details className="bg-black/40 p-4 rounded">
                  <summary className="text-white font-semibold cursor-pointer">Full Response</summary>
                  <pre className="text-green-300 text-xs mt-2 overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            )}

            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <strong>What this test does:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Sends a confirmation email to your provided email address</li>
                <li>Sends a notification email to hello@aariyatech.co.uk</li>
                <li>Uses the same email service as the launch page</li>
                <li>Shows detailed error messages if something fails</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> Check your spam folder if you don't receive the email within a few minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
