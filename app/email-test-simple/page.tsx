"use client"

import { useState } from "react"

export default function SimpleEmailTest() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const testBasicEmail = async () => {
    if (!email || !name) {
      setResult("Please enter both name and email")
      return
    }

    setLoading(true)
    setResult("Testing...")

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
        padding: "2rem",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Simple Email Test</h1>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "0.5rem",
              color: "white",
            }}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "0.5rem",
              color: "white",
            }}
          />

          <button
            onClick={testBasicEmail}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
              border: "none",
              borderRadius: "0.5rem",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Testing..." : "Test Email"}
          </button>
        </div>

        {result && (
          <div
            style={{
              background: "rgba(0,0,0,0.4)",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <h3>Result:</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.875rem",
                color: "#10b981",
              }}
            >
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
