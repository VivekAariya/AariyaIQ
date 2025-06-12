"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DetailedEmailTestPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [testType, setTestType] = useState("basic")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [serviceStatus, setServiceStatus] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const checkServiceStatus = async () => {
    try {
      setError(null)
      const response = await fetch("/api/test-email-detailed")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setServiceStatus(data)
    } catch (error) {
      console.error("Service status check failed:", error)
      setServiceStatus({
        error: "Failed to check service status",
        details: error instanceof Error ? error.message : "Unknown error",
      })
      setError(error instanceof Error ? error.message : "Unknown error")
    }
  }

  const testEmail = async () => {
    if (!email || !name) {
      setError("Please enter both name and email")
      return
    }

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch("/api/test-email-detailed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, testType }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Email test failed:", error)
      setResult({
        error: "Failed to test email",
        details: error instanceof Error ? error.message : "Unknown error",
      })
      setError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (success: boolean) => {
    return (
      <span className={`px-2 py-1 rounded text-xs ${success ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
        {success ? "Success" : "Failed"}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-black/60 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Email Functionality Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Service Status Check */}
            <div className="space-y-4">
              <Button
                onClick={checkServiceStatus}
                variant="outline"
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Check Email Service Status
              </Button>

              {serviceStatus && (
                <div className="bg-black/40 p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">Service Status:</h4>
                  {serviceStatus.error ? (
                    <div className="text-red-300">
                      <p>
                        <strong>Error:</strong> {serviceStatus.error}
                      </p>
                      {serviceStatus.details && (
                        <p>
                          <strong>Details:</strong> {serviceStatus.details}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-green-300">
                      <p>
                        <strong>Status:</strong> {serviceStatus.serviceTest?.success ? "Working" : "Failed"}
                      </p>
                      <p>
                        <strong>Environment:</strong> {serviceStatus.environment?.nodeEnv}
                      </p>
                      <p>
                        <strong>API Key:</strong> {serviceStatus.environment?.hasResendKey ? "Present" : "Missing"}
                      </p>
                      <p>
                        <strong>Key Format:</strong> {serviceStatus.environment?.keyFormat}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Email Test Form */}
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

              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                className="w-full p-2 bg-white/20 border border-white/30 text-white rounded"
              >
                <option value="basic">Basic (Launch + Admin)</option>
                <option value="learner">Learner Emails</option>
                <option value="instructor">Instructor Emails</option>
                <option value="all">All Email Types</option>
              </select>

              <Button
                onClick={testEmail}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                {loading ? "Testing Emails..." : `Test ${testType} Emails`}
              </Button>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Test Results:</h3>

                {result.error ? (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded">
                    <p>
                      <strong>Error:</strong> {result.error}
                    </p>
                    {result.details && (
                      <p>
                        <strong>Details:</strong> {result.details}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Summary */}
                    {result.summary && (
                      <div className="bg-black/40 p-4 rounded">
                        <h4 className="text-white font-semibold mb-2">Summary:</h4>
                        <div className="flex gap-4 text-sm">
                          <span className="text-green-300">✅ Successful: {result.summary.successfulEmails}</span>
                          <span className="text-red-300">❌ Failed: {result.summary.failedEmails}</span>
                          <span className="text-blue-300">📧 Total: {result.summary.totalEmails}</span>
                        </div>
                      </div>
                    )}

                    {/* Individual Email Results */}
                    {result.results?.emails && (
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">Individual Email Results:</h4>
                        {Object.entries(result.results.emails).map(([emailType, emailResult]: [string, any]) => (
                          <div key={emailType} className="bg-black/40 p-3 rounded flex justify-between items-center">
                            <span className="text-white capitalize">{emailType.replace(/([A-Z])/g, " $1")}</span>
                            {getStatusBadge(emailResult.success)}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Full Details */}
                <details className="bg-black/40 p-4 rounded">
                  <summary className="text-white font-semibold cursor-pointer">Full Details</summary>
                  <pre className="text-green-300 text-xs mt-2 overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            )}

            {/* Instructions */}
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <strong>Test Types:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Basic:</strong> Launch page notification + Admin notification
                </li>
                <li>
                  <strong>Learner:</strong> Learner registration confirmation
                </li>
                <li>
                  <strong>Instructor:</strong> Instructor application confirmation
                </li>
                <li>
                  <strong>All:</strong> Tests all email types
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
