"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { courses } from "@/lib/courses"
import { useState, useEffect } from "react"
import type { Course } from "@/lib/types"

export function UpcomingCourses() {
  const [upcomingCourses, setUpcomingCourses] = useState<Course[]>([])

  useEffect(() => {
    // Sort courses by start date (closest first) and take the first 3
    const sortedCourses = [...courses]
      .filter((course) => new Date(course.startDate) > new Date())
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3)

    setUpcomingCourses(sortedCourses)
  }, [])

  if (upcomingCourses.length === 0) {
    return null
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-50/80 via-indigo-50/80 to-cyan-50/80 backdrop-blur-md dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-cyan-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Courses</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't miss out on these courses starting soon. Enroll now to secure your spot!
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden transition-all hover:shadow-md border border-white/20 dark:border-white/10"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-medium text-center mb-2">Starting in:</p>
                  <CountdownTimer targetDate={course.startDate} />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-600/90 via-indigo-700/90 to-cyan-500/90 backdrop-blur-md text-white">
                    Enroll Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
