import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function SuperAdminLoginLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-2 border-purple-400/30 shadow-xl shadow-purple-500/20 bg-black/30 backdrop-blur-sm">
          <CardHeader className="space-y-2 border-b border-purple-500/20 pb-6">
            <div className="flex items-center justify-center mb-2">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="w-full border-t border-gray-700 my-2"></div>
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
