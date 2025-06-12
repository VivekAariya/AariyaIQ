import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ResetPasswordLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50/30 via-indigo-50/30 to-cyan-50/30 backdrop-blur-sm dark:from-purple-950/10 dark:via-indigo-950/10 dark:to-cyan-950/10">
      <div className="h-16 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"></div>
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="mx-auto max-w-md w-full border border-white/20 dark:border-white/10">
          <CardHeader className="space-y-1">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </main>
      <div className="h-16 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"></div>
    </div>
  )
}
