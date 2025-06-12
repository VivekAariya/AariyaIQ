"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    if (!email || !name) {
      alert("Please enter both name and email")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to test email", details: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-black/60 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white text-center">Email Functionality Test</CardTitle>
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
              <Button
                onClick={testEmail}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500"
              >
                {loading ? "Sending Test Emails..." : "Send Test Emails"}
              </Button>
            </div>

            {result && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-2">Test Result:</h3>
                <pre className="bg-black/40 p-4 rounded text-green-300 text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <strong>What this test does:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Sends a test confirmation email to your address</li>
                <li>Sends a test admin notification to hello@aariyatech.co.uk</li>
                <li>Shows the API response and any errors</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
