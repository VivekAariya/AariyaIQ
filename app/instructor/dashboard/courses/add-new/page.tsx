"use client";

import { createCourse } from "@/app/actions/instructor-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function AddNewCoursePage() {
    const { toast } = useToast();
    const router = useRouter();

    const [supabase] = useState(() => createClient());
    const [isPending, startTransition] = useTransition();
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createCourse(null, formData);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Course created successfully!",
                });
                router.push(`/instructor/dashboard/courses/add-new/upload-material?courseId=${result?.data?.id}`);
            }
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                    setIsError(true);
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
                setIsError(true);
            }
        };

        fetchUser();
    }, []);

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged in user</h1>
                    <p className="text-gray-400">Unknown error</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Quantum Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-ping" />
            </div>

            <div className="relative z-10 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/dashboard/courses">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Create New Course
                            </h1>
                            <p className="text-gray-400 mt-1">Build and publish your next course</p>
                        </div>
                    </div>
                </div>

                <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <input type="hidden" name="instructorId" value={user?.id} />
                    {/* Basic Information */}
                    <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-cyan-400">Basic Information</CardTitle>
                            <CardDescription className="text-gray-400">
                                Essential details about your course
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title" className="text-gray-300">
                                        Course Title *
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        required
                                        placeholder="Enter course title"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="price" className="text-gray-300">
                                        Price ($) *
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            $
                                        </span>
                                        <Input
                                            id="price"
                                            name="price"
                                            required
                                            type="number"
                                            placeholder="0"
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 pl-8"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="enrollmentCount" className="text-gray-300">
                                        Initial Enrollment Count *
                                    </Label>
                                    <Input
                                        id="enrollmentCount"
                                        name="enrollmentCount"
                                        required
                                        type="number"
                                        placeholder="0"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                        min="0"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="shortDescription" className="text-gray-300">
                                        Short Description *
                                    </Label>
                                    <Textarea
                                        id="shortDescription"
                                        name="shortDescription"
                                        required
                                        placeholder="Brief description for course cards and previews"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 resize-none"
                                        rows={2}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description" className="text-gray-300">
                                        Detailed Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="longDescription"
                                        required
                                        placeholder="Comprehensive course description, what students will learn, and why they should take this course"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 resize-none"
                                        rows={7}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Settings */}
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-cyan-400">Course Settings</CardTitle>
                            <CardDescription className="text-gray-400">Configure course parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="duration" className="text-gray-300">
                                    Duration *
                                </Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    required
                                    placeholder="e.g., 8 weeks, 40 hours"
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="category" className="text-gray-300">
                                    Category *
                                </Label>
                                <Select name="category" required>
                                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="web-development">Web Development</SelectItem>
                                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                        <SelectItem value="data-science">Data Science</SelectItem>
                                        <SelectItem value="machine-learning">Machine Learning</SelectItem>
                                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                                        <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                                        <SelectItem value="devops">DevOps</SelectItem>
                                        <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                                        <SelectItem value="blockchain">Blockchain</SelectItem>
                                        <SelectItem value="management">Management</SelectItem>
                                        <SelectItem value="HR">HR</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="level" className="text-gray-300">
                                    Difficulty Level *
                                </Label>
                                <Select name="level" required>
                                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="beginner">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Beginner</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="intermediate">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                <span>Intermediate</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="advanced">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span>Advanced</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="expert">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span>Expert</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="startDate" className="text-gray-300">
                                    Start Date *
                                </Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    required
                                    placeholder="e.g., 2023-09-01"
                                    type="date"
                                    min={(() => {
                                        const d = new Date();
                                        d.setDate(d.getDate() + 14);
                                        return d.toISOString().split("T")[0];
                                    })()}
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="courseImage" className="text-gray-300">
                                    Course Image *
                                </Label>
                                <Input
                                    id="courseImage"
                                    name="courseImage"
                                    required
                                    type="url"
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="externalLearningPlatformLink" className="text-gray-300">
                                    External Learning Platform Link *
                                </Label>
                                <Input
                                    id="externalLearningPlatformLink"
                                    name="externalLearningPlatformLink"
                                    required
                                    placeholder="e.g., https://classroom.google.com/"
                                    type="url"
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Contents & Curriculum */}
                    <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-cyan-400">Course Contents & Curriculum</CardTitle>
                            <CardDescription className="text-gray-400">
                                Detailed course curriculum and learning materials
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label htmlFor="courseContents" className="text-gray-300">
                                    Course Curriculum *
                                </Label>
                                <Textarea
                                    id="courseContents"
                                    name="courseContents"
                                    required
                                    placeholder="Module 1: Introduction to Web Development&#10;- HTML Fundamentals&#10;- CSS Basics&#10;- JavaScript Introduction&#10;&#10;Module 2: Advanced Concepts&#10;- React Framework&#10;- State Management&#10;- API Integration"
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 resize-none"
                                    rows={8}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Structure your course content with modules, lessons, and topics
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="prerequisites" className="text-gray-300">
                                        Prerequisites *
                                    </Label>
                                    <Textarea
                                        id="prerequisites"
                                        name="prerequisites"
                                        required
                                        placeholder="Basic programming knowledge, HTML/CSS familiarity"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 resize-none"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="learningOutcomes" className="text-gray-300">
                                        Learning Outcomes *
                                    </Label>
                                    <Textarea
                                        id="learningOutcomes"
                                        name="learningOutcomes"
                                        required
                                        placeholder="Students will be able to build responsive websites, understand React concepts, deploy applications"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-3 flex justify-end mt-4">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Next"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
