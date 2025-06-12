"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevAccessPage() {
  const router = useRouter()

  const enableDevMode = () => {
    localStorage.setItem("dev_mode", "true")
    router.push("/")
  }

  const disableDevMode = () => {
    localStorage.removeItem("dev_mode")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-black/30 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Developer Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-center">
            Use this page to toggle developer mode and bypass the launch page.
          </p>

          <div className="space-y-2">
            <Button onClick={enableDevMode} className="w-full bg-green-600 hover:bg-green-700">
              Enable Developer Mode
            </Button>

            <Button onClick={disableDevMode} variant="outline" className="w-full border-white/20 hover:bg-white/10">
              Disable Developer Mode
            </Button>
          </div>

          <div className="text-sm text-gray-400 space-y-2">
            <p>
              <strong>Quick Access URLs:</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                • <code>/?dev=true</code>
              </li>
              <li>
                • <code>/?admin=aariyatech2025</code>
              </li>
              <li>
                • <code>/?bypass=launch_bypass_2025</code>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
