import { Skeleton } from "@/components/ui/skeleton"

export default function CookiePolicyLoading() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="space-y-6">
          {[...Array(7)].map((_, i) => (
            <section key={i}>
              <Skeleton className="h-8 w-64 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </section>
          ))}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <Skeleton className="h-4 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
