import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft, BookOpen, Calendar, CheckCircle, Clock, Download, Users } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";

interface CourseDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
    let errorMsg = null;
    const supabase = await createClient();

    const { data: userData } = await supabase.auth.getUser();

    const { data: course, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", params.id)
        .single();

    const { data: instructor, error: instructorError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("role", "instructor")
        .eq("id", course?.instructor)
        .single();

    if (courseError) {
        logger.error("Error fetching course:", courseError);
        errorMsg = courseError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching course</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    if (instructorError) {
        logger.error("Error fetching instructor:", instructorError);
        errorMsg = instructorError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Instructor</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "intermediate":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "advanced":
                return "bg-orange-500/20 text-red-400 border-red-500/30";
            case "expert":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
                    <p className="text-gray-400">{errorMsg || "The requested course does not exist."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <MainNav />

            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Back Navigation */}
                <div className="mb-6">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Courses
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Header */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge className={`${getLevelColor(course.level)} border`}>{course.level}</Badge>
                                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                                        {course.category}
                                    </Badge>
                                </div>

                                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                    {course.course_title}
                                </h1>

                                <p className="text-slate-300 text-lg mb-6">{course.short_description}</p>

                                {/* Course Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Clock className="w-5 h-5 text-cyan-400" />
                                        <span className="text-sm">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Users className="w-5 h-5 text-cyan-400" />
                                        <span className="text-sm">{course.enrollment_count.toString()} enrolled</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Calendar className="w-5 h-5 text-cyan-400" />
                                        <span className="text-sm">
                                            Starts{" "}
                                            {new Date(course.start_date).toLocaleDateString("en-UK", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <BookOpen className="w-5 h-5 text-cyan-400" />
                                        <span className="text-sm">
                                            Updated{" "}
                                            {new Date(course.updated_at).toLocaleDateString("en-UK", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Image */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 overflow-hidden">
                            <div className="relative aspect-video">
                                <Image
                                    src={course.course_image || "/placeholder.svg"}
                                    alt={course.course_title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Card>

                        {/* Course Description */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-xl text-cyan-400">About This Course</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                    {course.full_description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Course Contents */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-xl text-cyan-400">Course Curriculum</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {course.course_contents
                                        .trim()
                                        .split("\n\n")
                                        .map((module: any, index: any) => {
                                            const lines = module.split("\n");
                                            const title = lines[0];
                                            const items = lines.slice(1);

                                            return (
                                                <div key={index} className="border border-slate-700/50 rounded-lg p-4">
                                                    <h4 className="font-semibold text-purple-400 mb-3">{title}</h4>
                                                    <ul className="space-y-2">
                                                        {items.map((item: any, itemIndex: any) => (
                                                            <li
                                                                key={itemIndex}
                                                                className="flex items-start gap-2 text-slate-300"
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm">
                                                                    {item.replace("• ", "")}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prerequisites */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-xl text-cyan-400">Prerequisites</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {course.prerequisites
                                        .split("\n")
                                        .filter((item: string) => item.trim() !== "")
                                        .map((prerequisite: string, index: number) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-300">
                                                <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                                <span>{prerequisite.replace("• ", "")}</span>
                                            </li>
                                        ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Learning Outcomes */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-xl text-cyan-400">What You'll Learn</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {course.learning_outcomes
                                        .split("\n")
                                        .filter((item: string) => item.trim() !== "")
                                        .map((outcome: string, index: number) => (
                                            <div key={index} className="flex items-start gap-2 text-slate-300">
                                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{outcome.replace("• ", "")}</span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">
                        {/* Purchase Card */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 sticky top-6">
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                                        {formatPrice(course.price)}
                                    </div>
                                    <p className="text-slate-400 text-sm">One-time payment</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <Link
                                        href={userData?.user ? `/checkout?courseId=${course.id}` : "/learner/login"}
                                        className="w-full"
                                    >
                                        <Button
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
                                        >
                                            {userData?.user ? "Enroll Now" : "Login to Enroll"}
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Download className="w-4 h-4 text-cyan-400" />
                                        <span>Downloadable resources</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Clock className="w-4 h-4 text-cyan-400" />
                                        <span>Lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Instructor Card */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <CardTitle className="text-lg text-cyan-400">Your Instructor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <Avatar>
                                            <AvatarImage src={instructor?.profile_image} />
                                            <AvatarFallback>
                                                {instructor?.first_name
                                                    ? instructor.first_name.charAt(0).toUpperCase()
                                                    : instructor?.email?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white mb-1">
                                            {instructor.first_name + " " + instructor.last_name}
                                        </h4>
                                        <span className="text-slate-400 text-sm mb-3">
                                            {instructor.area_of_expertise} | {instructor.years_of_experience} Years
                                            Experience
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
