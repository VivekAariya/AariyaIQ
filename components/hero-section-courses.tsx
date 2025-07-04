import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
    id: string;
    course_title: string;
    short_description: string;
    start_date: string;
    course_image?: string;
    created_at?: string;
}

export default function HeroSectionCourses() {
    const [upcomingCourses, setUpcomingCourses] = useState<Course[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/courses/hero-section");
                const data = await res.json();

                if (res.ok) {
                    setUpcomingCourses(data.upcomingCourses || []);
                    setCourses(data.courses || []);
                } else {
                    setError(data.error || "Failed to fetch courses");
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading courses...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-50/80 via-indigo-50/80 to-cyan-50/80 backdrop-blur-md dark:from-purple-950/30 dark:via-indigo-950/30 dark:to-cyan-950/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {upcomingCourses.length > 0 ? "Upcoming Courses" : "Explore Our Courses"}
                        </h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {upcomingCourses.length > 0
                                ? "Don't miss out on these courses starting soon. Enroll now to secure your spot!"
                                : "Discover a wide range of courses to enhance your learning experience."}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    {upcomingCourses.length > 0 ? (
                        <>
                            {upcomingCourses.map((course) => (
                                <Card
                                    key={course.id}
                                    className="overflow-hidden transition-all hover:shadow-md border border-white/20 dark:border-white/10 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={course.course_image || "/placeholder.svg"}
                                            alt={course.course_title}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{course.course_title}</CardTitle>
                                        <CardDescription className="line-clamp-3 break-all">
                                            {course.short_description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-center mb-2">Starting in:</p>
                                            <CountdownTimer targetDate={course.start_date} />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/courses/${course.id}`} className="w-full">
                                            <Button className="w-full bg-gradient-to-r from-purple-600/90 via-indigo-700/90 to-cyan-500/90 backdrop-blur-md text-white">
                                                Enroll Now
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <>
                            {courses.map((course) => (
                                <Card
                                    key={course.id}
                                    className="overflow-hidden transition-all hover:shadow-md border border-white/20 dark:border-white/10 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={course.course_image || "/placeholder.svg"}
                                            alt={course.course_title}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{course.course_title}</CardTitle>
                                        <CardDescription className="line-clamp-3 break-all">
                                            {course.short_description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-center mb-2">Starting in:</p>
                                            <CountdownTimer targetDate={course?.start_date} />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/courses/${course.id}`} className="w-full">
                                            <Button className="w-full bg-gradient-to-r from-purple-600/90 via-indigo-700/90 to-cyan-500/90 backdrop-blur-md text-white">
                                                Enroll Now
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
