"use client";

import { type CourseMaterial } from "@/components/course-material-uploader"; // Assuming this component exists and is styled
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Brain,
    DollarSign,
    Edit3,
    FileText,
    Info,
    Link,
    ListChecks,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Mock categories and levels if not already defined elsewhere
const courseCategories = [
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "design", label: "UI/UX Design" },
    { value: "other", label: "Other" },
];

const courseLevels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
];

export default function CourseEdit({ course }: { course: any }) {
    const { toast } = useToast();
    const router = useRouter();

    const [courseData, setCourseData] = useState(course);
    const [isStartDatePassed, setIsStartDatePassed] = useState(false);
    const [isEditingDisabled, setIsEditingDisabled] = useState(false);
    const [supabase] = useState(() => createClient());
    const [user, setUser] = useState<User | null>(null);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<any>({
        isError: false,
        message: "Unknown error",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                    setError({ isError: true, message: error?.message });
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
                setError({ isError: true, message: error?.message });
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const startDate = new Date(courseData.start_date);
        const today = new Date();
        const passed = startDate < today;
        setIsStartDatePassed(passed);
        // Disable editing if start date has passed AND course is not in a mutable status like "Draft"
        // For simplicity, we'll just use passed date for now. Add status check if needed.
        setIsEditingDisabled(passed);
    }, [courseData.start_date]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setCourseData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty string for clearing, or convert to number
        setCourseData((prev: any) => ({ ...prev, price: value === "" ? 0 : Number.parseFloat(value) || 0 }));
    };

    const handleMaterialsChange = (materials: CourseMaterial[]) => {
        setCourseData((prev: any) => ({ ...prev, materials }));
    };

    const handleSaveChanges = () => {
        // API call to save changes
        console.log("Saving changes:", courseData);
        // Add toast notification for success/failure
    };

    const inputClassName =
        "bg-slate-800/60 border-slate-700 placeholder-slate-500 text-slate-200 focus:ring-cyan-500 focus:border-cyan-500";
    const labelClassName = "text-slate-300 font-medium";
    const readOnlyInputClassName = `${inputClassName} opacity-70 cursor-not-allowed bg-slate-800/30`;

    if (error.isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{error.message || "Something went wrong"}</h1>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Edit3 className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
                            Edit Course: {courseData.course_title}
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveChanges}
                            disabled={isEditingDisabled}
                            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isEditingDisabled ? "Editing Locked" : "Save Changes"}
                        </Button>
                    </div>
                </div>

                {isEditingDisabled && (
                    <Card className="bg-yellow-900/30 border-yellow-700 text-yellow-200">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <AlertTriangle className="h-6 w-6 text-yellow-400" />
                            <CardTitle className="text-yellow-300">Editing Locked</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                The start date for this course has passed. Most course details can no longer be edited.
                                You can still manage course materials and use AI tools.
                            </p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Core Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                                    <Info className="h-5 w-5" />
                                    Core Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="course_id" className={labelClassName}>
                                        Course ID
                                    </Label>
                                    <Input
                                        id="course_id"
                                        name="id"
                                        value={courseData.id}
                                        readOnly
                                        className={readOnlyInputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="course_title" className={labelClassName}>
                                        Course Title
                                    </Label>
                                    <Input
                                        id="course_title"
                                        name="title"
                                        value={courseData.course_title}
                                        onChange={handleInputChange}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="short_description" className={labelClassName}>
                                        Short Description (Max 150 chars)
                                    </Label>
                                    <Textarea
                                        id="short_description"
                                        name="shortDescription"
                                        value={courseData.short_description}
                                        onChange={handleInputChange}
                                        rows={2}
                                        maxLength={150}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="full_description" className={labelClassName}>
                                        Full Description
                                    </Label>
                                    <Textarea
                                        id="full_description"
                                        name="fullDescription"
                                        value={courseData.full_description}
                                        onChange={handleInputChange}
                                        rows={5}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="course_contents" className={labelClassName}>
                                        Course Contents / Curriculum
                                    </Label>
                                    <Textarea
                                        id="course_contents"
                                        name="courseContents"
                                        value={courseData.course_contents}
                                        onChange={handleInputChange}
                                        rows={8}
                                        placeholder="e.g., Module 1: Topic A, Topic B..."
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="prerequisites" className={labelClassName}>
                                        Prerequisites
                                    </Label>
                                    <Textarea
                                        id="prerequisites"
                                        name="prerequisites"
                                        value={courseData.prerequisites}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="e.g., Basic algebra, Familiarity with computers..."
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="learning_outcomes" className={labelClassName}>
                                        Learning Outcomes (One per line)
                                    </Label>
                                    <Textarea
                                        id="learning_outcomes"
                                        name="learningOutcomes"
                                        value={courseData.learning_outcomes}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="e.g., Students will be able to...\nUnderstand concepts of..."
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Column 2: Details & Settings */}
                    <div className="space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-xl text-purple-400 flex items-center gap-2">
                                    <ListChecks className="h-5 w-5" />
                                    Details & Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="duration" className={labelClassName}>
                                        Duration (e.g., 8 Weeks, 40 Hours)
                                    </Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        value={courseData.duration}
                                        onChange={handleInputChange}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="level" className={labelClassName}>
                                        Level
                                    </Label>
                                    <Select
                                        name="level"
                                        required
                                        defaultValue={courseData.level}
                                        onValueChange={(value) => handleSelectChange("level", value)}
                                        disabled={isEditingDisabled}
                                    >
                                        <SelectTrigger
                                            className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                        >
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
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
                                    <Label htmlFor="category" className={labelClassName}>
                                        Category
                                    </Label>
                                    <Select
                                        name="category"
                                        defaultValue={courseData.category}
                                        onValueChange={(value) => handleSelectChange("category", value)}
                                        disabled={isEditingDisabled}
                                    >
                                        <SelectTrigger
                                            className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
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
                                    <Label htmlFor="price" className={labelClassName}>
                                        Price (INR ₹)
                                    </Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={courseData.price}
                                            onChange={handlePriceChange}
                                            placeholder="e.g., 4999"
                                            readOnly={isEditingDisabled}
                                            className={`${isEditingDisabled ? readOnlyInputClassName : inputClassName} pl-10`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="course_image" className={labelClassName}>
                                        Course Image URL
                                    </Label>
                                    <Input
                                        id="course_image"
                                        name="image"
                                        value={courseData.course_image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.png"
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                    {/* Consider adding FileUploader component here */}
                                </div>
                                <div>
                                    <Label htmlFor="start_date" className={labelClassName}>
                                        Start Date
                                    </Label>
                                    <Input
                                        id="start_date"
                                        name="startDate"
                                        type="date"
                                        value={courseData.start_date.split("T")[0]}
                                        onChange={handleInputChange}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="external_learning_platform_link" className={labelClassName}>
                                        External Learning Platform Link
                                    </Label>
                                    <Input
                                        id="external_learning_platform_link"
                                        name="externalLink"
                                        value={courseData.external_learning_platform_link || ""}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Zoom, Google Classroom link"
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="enrollment_count" className={labelClassName}>
                                        Enrollment Count
                                    </Label>
                                    <Input
                                        id="enrollment_count"
                                        name="enrollmentCount"
                                        type="number"
                                        value={courseData.enrollment_count}
                                        onChange={handleInputChange}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="status" className={labelClassName}>
                                        Status
                                    </Label>
                                    <Input
                                        id="status"
                                        name="status"
                                        value={courseData.status}
                                        readOnly
                                        className={readOnlyInputClassName}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Button
                    size="lg"
                    className="w-full bg-slate-700 text-pink-200 hover:bg-pink-700/80 font-semibold text-lg group mb-6"
                    onClick={() => {
                        router.push(`/instructor/dashboard/courses/${courseData.id}/materials`);
                    }}
                >
                    <FileText className="mr-2 h-5 w-5" />
                    View Materials & AI Tools
                </Button>
            </div>
        </div>
    );
}
