import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { ShareButton } from "@/components/share-button"
import type { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group relative h-full">
      {/* Neon border wrapper - completely separate from content */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Top border */}
        <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent rounded-t-lg shadow-[0_0_8px_1px_rgba(6,182,212,0.7)]"></div>
        {/* Right border */}
        <div className="absolute top-4 right-0 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-purple-500/80 to-transparent rounded-r-lg shadow-[0_0_8px_1px_rgba(124,58,237,0.7)]"></div>
        {/* Bottom border */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent rounded-b-lg shadow-[0_0_8px_1px_rgba(6,182,212,0.7)]"></div>
        {/* Left border */}
        <div className="absolute top-4 left-0 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-purple-500/80 to-transparent rounded-l-lg shadow-[0_0_8px_1px_rgba(124,58,237,0.7)]"></div>
      </div>

      {/* Actual card content */}
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <ShareButton courseId={course.id} courseTitle={course.title} />
        </div>
        <CardHeader className="flex-none">
          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2 h-10">{course.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <div className="mb-4">
            <CountdownTimer targetDate={course.startDate} />
          </div>
        </CardContent>
        <CardFooter className="flex-none mt-auto">
          <Link href="/login" className="w-full">
            <Button className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white">
              View Course Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
