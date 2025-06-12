import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function AdminLoginLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <MainNav />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-2 border-purple-400/30 shadow-xl shadow-purple-500/20 bg-gray-950/90">
          <CardHeader className="space-y-2 border-b border-purple-500/20 pb-6">
            <Skeleton className="h-8 w-3/4 bg-gray-800" />
            <Skeleton className="h-4 w-full bg-gray-800" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4 bg-gray-800" />
                <Skeleton className="h-11 w-full bg-gray-800" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/4 bg-gray-800" />
                  <Skeleton className="h-4 w-1/4 bg-gray-800" />
                </div>
                <Skeleton className="h-11 w-full bg-gray-800" />
              </div>
              <Skeleton className="h-12 w-full bg-gray-800" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col border-t border-purple-500/20 pt-6">
            <div className="text-center">
              <Skeleton className="h-4 w-3/4 mx-auto bg-gray-800 mb-2" />
              <Skeleton className="h-10 w-1/2 mx-auto bg-gray-800" />
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
