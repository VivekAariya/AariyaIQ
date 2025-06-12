import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { courses } from "@/lib/courses"

export default function LearningsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 bg-gradient-to-br from-gray-700/15 via-gray-600/15 to-gray-800/15 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg relative neon-container neon-always-on overflow-visible transform translate-y-4 transition-transform duration-700">
                {/* Neon border elements */}
                <div className="neon-right absolute opacity-100"></div>
                <div className="neon-bottom absolute opacity-100"></div>
                <div className="neon-left absolute opacity-100"></div>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">AT Learnings</h1>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our comprehensive courses designed to enhance your skills and advance your career.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
