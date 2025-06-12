import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function InstructorSignupLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-96 w-full max-w-2xl bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
