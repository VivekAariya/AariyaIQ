"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain, Calendar, CheckCircle, Clock, Info, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CourseDetailsProps {
    course: any;
    instructor: any;
}

export default function ViewCourse({ course, instructor }: CourseDetailsProps) {
    const router = useRouter();

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

    const getCategoryColor = (category: string) => {
        const colors = {
            "web-development": "bg-blue-500/20 text-blue-400 border-blue-500/30",
            "mobile-development": "bg-green-500/20 text-green-400 border-green-500/30",
            "data-science": "bg-purple-500/20 text-purple-400 border-purple-500/30",
            "machine-learning": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
            cybersecurity: "bg-red-500/20 text-red-400 border-red-500/30",
            "cloud-computing": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
            devops: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            "ui-ux-design": "bg-pink-500/20 text-pink-400 border-pink-500/30",
            blockchain: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            management: "bg-teal-500/20 text-teal-400 border-teal-500/30",
            HR: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        };
        return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
    };
    const isStarted = new Date(course.start_date) <= new Date();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                    {/* Back Navigation */}
                    <div className="max-md:mt-10 flex items-center gap-2 sm:gap-3 flex-wrap">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden xs:inline">Back to Courses</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {/* Course Header */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    {/* Course Image */}
                                    <div className="relative aspect-video mb-4 sm:mb-6 rounded-lg overflow-hidden">
                                        <Image
                                            src={course.course_image || "/placeholder.svg"}
                                            alt={course.course_title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
                                        />

                                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                                            <Badge className="bg-green-500/90 text-white text-xs sm:text-sm px-2 py-1">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Enrolled
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                        <Badge className={`${getLevelColor(course.level)} border`}>
                                            {course.level}
                                        </Badge>
                                        <Badge className={`${getCategoryColor(course.category)} border`}>
                                            {course.category
                                                .replace("-", " ")
                                                .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </Badge>
                                        {isStarted && (
                                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                <Clock className="w-3 h-3 mr-1" />
                                                In Progress
                                            </Badge>
                                        )}
                                    </div>

                                    <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text mb-3 sm:mb-4 break-words">
                                        {course.course_title}
                                    </h1>

                                    <p className="text-slate-300 text-base xs:text-lg mb-4 sm:mb-6 leading-relaxed">
                                        {course.short_description}
                                    </p>

                                    <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Clock className="w-5 h-5 text-cyan-400" />
                                            <div>
                                                <div className="text-sm font-medium">{course.duration}</div>
                                                <div className="text-xs text-slate-400">Duration</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Calendar className="w-5 h-5 text-cyan-400" />
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {new Date(course.start_date).toLocaleDateString("en-GB", {
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                                <div className="text-xs text-slate-400">Start Date</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* External Learning Platform */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-pink-400 flex items-center gap-2">
                                        <Info className="h-5 w-5" />
                                        External Learning Platform
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                        {course.external_learning_platform_link}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Course Description */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                                        <Info className="h-5 w-5" />
                                        About This Course
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                        {course.full_description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Course Contents */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Course Contents
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        {course.course_contents.split("\n\n").map((module: any, index: any) => {
                                            const lines = module.split("\n");
                                            const title = lines[0];
                                            const items = lines.slice(1).filter((item: string) => item.trim());

                                            return (
                                                <div
                                                    key={index}
                                                    className="border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-colors"
                                                >
                                                    <h4 className="font-semibold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold">
                                                            {index + 1}
                                                        </div>
                                                        {title}
                                                    </h4>
                                                    <ul className="space-y-1 sm:space-y-2 ml-4 sm:ml-8">
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
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-yellow-400 flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        Prerequisites
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    <ul className="space-y-2 sm:space-y-3">
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
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-green-400 flex items-center gap-2">
                                        <Star className="h-5 w-5" />
                                        What You'll Learn
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 xs:p-3 sm:p-4 md:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
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
                        <div className="space-y-4 sm:space-y-6">
                            {/* Instructor Card */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Your Instructor
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col xs:flex-row items-start gap-3 xs:gap-4">
                                        <div className="relative">
                                            <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
                                                <AvatarImage src={instructor?.profile_image} />
                                                <AvatarFallback>
                                                    {instructor?.first_name
                                                        ? instructor.first_name.charAt(0).toUpperCase()
                                                        : instructor?.email?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white mb-1 text-base sm:text-lg">
                                                {instructor.first_name} {instructor.last_name}
                                            </h4>
                                            <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2">
                                                {instructor.area_of_expertise}
                                            </p>
                                            <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2">
                                                {instructor.email}
                                            </p>
                                            <div className="flex items-center gap-2 sm:gap-4 text-xs text-slate-500">
                                                <span>{instructor.years_of_experience} years exp.</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Course Details Card */}
                            <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                                        <Info className="h-5 w-5" />
                                        Course Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Course ID:</span>
                                        <span className="text-slate-300 font-mono">{course.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Duration:</span>
                                        <span className="text-slate-300">{course.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Level:</span>
                                        <Badge className={`${getLevelColor(course.level)} border text-xs`}>
                                            {course.level}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Last Updated:</span>
                                        <span className="text-slate-300">
                                            {new Date(course.updated_at).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Materials and AI gen content */}
                            <Card className="bg-gradient-to-br from-cyan-900/60 via-purple-900/60 to-indigo-900/60 border-cyan-700 shadow-2xl backdrop-blur-md animate-fade-in">
                                <CardHeader>
                                    <CardTitle className="text-xl text-cyan-300 flex items-center gap-2">
                                        <Info className="h-5 w-5 text-cyan-400" />
                                        Materials
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 sm:space-y-4 text-xs xs:text-sm sm:text-base p-2 xs:p-3 sm:p-4 md:p-6">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-500/30">
                                            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300" />
                                        </span>
                                        <span className="font-semibold text-cyan-200 text-xs sm:text-base">
                                            AI Assistance Used
                                        </span>
                                    </div>
                                    <p className="text-slate-200 leading-relaxed text-xs xs:text-sm sm:text-base">
                                        The instructor has leveraged the platform's integrated AI tools to generate
                                        assignments, diagrams, and other course materials. This ensures high-quality,
                                        up-to-date, and engaging content for your learning journey.
                                    </p>

                                    <Link href={`/learner/dashboard/courses/${course.id}/materials`}>
                                        <Button className="w-full mt-2 sm:mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 text-xs sm:text-base">
                                            View Materials
                                        </Button>
                                    </Link>
                                    <div className="text-xs text-slate-400 mt-1 sm:mt-2">
                                        Materials were created or enhanced using AI via the uploaded course materials.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
