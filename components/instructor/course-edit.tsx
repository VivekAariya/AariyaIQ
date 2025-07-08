"use client";

import { editCourse } from "@/app/actions/instructor-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    DollarSign,
    Edit3,
    FileText,
    Info,
    ListChecks,
    UserIcon,
    XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CourseEdit({ course }: { course: any }) {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "suspended":
                return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "banned":
                return "bg-red-600/20 text-red-300 border-red-600/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "suspended":
                return <XCircle className="h-4 w-4" />;
            case "banned":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <UserIcon className="h-4 w-4" />;
        }
    };

    const inputClassName =
        "bg-slate-800/60 border-slate-700 placeholder-slate-500 text-slate-200 focus:ring-cyan-500 focus:border-cyan-500";
    const labelClassName = "text-slate-300 font-medium";
    const readOnlyInputClassName = `${inputClassName} opacity-70 cursor-not-allowed bg-slate-800/30`;

    const isEditingDisabled = (() => {
        const startDate = new Date(course.start_date);
        const today = new Date();
        return startDate < today;
    })();

    const handleFormSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await editCourse(null, formData);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: result.message || "Course updated successfully!",
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        {course.course_image && (
                            <Image
                                src={course.course_image || "/placeholder.svg"}
                                alt="Course"
                                className="rounded-lg border-2 border-slate-700 shadow"
                                width={48}
                                height={48}
                                style={{
                                    objectFit: "fill",
                                    aspectRatio: "1/1",
                                }}
                            />
                        )}
                        <Edit3 className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 flex-shrink-0" />
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text min-w-0">
                            <span className="block sm:inline">Edit Course:</span>
                            <span className="block sm:inline sm:ml-2 break-words">{course.course_title}</span>
                        </h1>
                    </div>
                    <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white flex-1 sm:flex-none"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="courseEditForm"
                            disabled={isEditingDisabled || isPending}
                            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                        >
                            <span className="hidden sm:inline">
                                {isEditingDisabled ? "Editing Locked" : isPending ? "Saving..." : "Save Changes"}
                            </span>
                            <span className="sm:hidden">
                                {isEditingDisabled ? "Locked" : isPending ? "Saving..." : "Save"}
                            </span>
                        </Button>
                    </div>
                </div>

                {isEditingDisabled && (
                    <Card className="bg-yellow-900/30 border-yellow-700 text-yellow-200">
                        <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-6">
                            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
                            <CardTitle className="text-yellow-300 text-lg sm:text-xl">Editing Locked</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm sm:text-base">
                                The start date for this course has passed. Most course details can no longer be edited.
                                You can still manage course materials and use AI tools.
                            </p>
                        </CardContent>
                    </Card>
                )}

                <form
                    id="courseEditForm"
                    action={handleFormSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    <input type="hidden" name="id" value={course.id} />

                    {/* Column 1: Core Info */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                            <CardHeader className="pb-3 sm:pb-6">
                                <CardTitle className="text-lg sm:text-xl text-cyan-400 flex items-center gap-2">
                                    <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Core Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                <div>
                                    <Label htmlFor="course_id" className={labelClassName}>
                                        Course ID
                                    </Label>
                                    <Input
                                        id="course_id"
                                        name="id"
                                        required
                                        value={course.id}
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
                                        name="course_title"
                                        required
                                        defaultValue={course.course_title}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="short_description" className={labelClassName}>
                                        Short Description{" "}
                                        <span className="text-xs text-slate-400">(Max 150 chars)</span>
                                    </Label>
                                    <Textarea
                                        id="short_description"
                                        name="short_description"
                                        required
                                        defaultValue={course.short_description}
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
                                        name="full_description"
                                        required
                                        defaultValue={course.full_description}
                                        rows={4}
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
                                        name="course_contents"
                                        required
                                        defaultValue={course.course_contents}
                                        rows={6}
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
                                        required
                                        defaultValue={course.prerequisites}
                                        rows={3}
                                        placeholder="e.g., Basic algebra, Familiarity with computers..."
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="learning_outcomes" className={labelClassName}>
                                        Learning Outcomes <span className="text-xs text-slate-400">(One per line)</span>
                                    </Label>
                                    <Textarea
                                        id="learning_outcomes"
                                        name="learning_outcomes"
                                        required
                                        defaultValue={course.learning_outcomes}
                                        rows={4}
                                        placeholder="e.g., Students will be able to...&#10;Understand concepts of..."
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Column 2: Details & Settings */}
                    <div className="space-y-4 sm:space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                            <CardHeader className="pb-3 sm:pb-6">
                                <CardTitle className="text-lg sm:text-xl text-purple-400 flex items-center gap-2">
                                    <ListChecks className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Details & Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                                    <Label htmlFor="status" className={labelClassName}>
                                        Status
                                    </Label>
                                    <Badge
                                        className={`${getStatusColor(course.status)} flex items-center space-x-1 w-fit`}
                                    >
                                        {getStatusIcon(course.status)}
                                        <span className="capitalize">{course.status}</span>
                                    </Badge>
                                </div>
                                <div>
                                    <Label htmlFor="duration" className={labelClassName}>
                                        Duration{" "}
                                        <span className="text-xs text-slate-400">(e.g., 8 Weeks, 40 Hours)</span>
                                    </Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        required
                                        defaultValue={course.duration}
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
                                        defaultValue={course.level}
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
                                        required
                                        defaultValue={course.category}
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
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
                                        <Input
                                            id="price"
                                            name="price"
                                            required
                                            type="number"
                                            defaultValue={course.price}
                                            placeholder="e.g., 4999"
                                            readOnly={isEditingDisabled}
                                            className={`${isEditingDisabled ? readOnlyInputClassName : inputClassName} pl-9 sm:pl-10`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-start mb-1 space-y-1 sm:space-y-0">
                                        <Label htmlFor="course_image" className={labelClassName}>
                                            Course Image URL
                                        </Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="sm:ml-2 h-4 w-4 text-slate-400" />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-slate-800 border-2 border-slate-700 max-w-xs sm:max-w-sm">
                                                    <p className="text-xs sm:text-sm">
                                                        You can use this website to upload your image and then paste the
                                                        link here
                                                        <br />
                                                        <a
                                                            href="https://imgbb.com/upload"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="underline break-all"
                                                        >
                                                            https://imgbb.com/upload
                                                        </a>
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="course_image"
                                        name="course_image"
                                        required
                                        defaultValue={course.course_image}
                                        placeholder="https://example.com/image.png"
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="start_date" className={labelClassName}>
                                        Start Date
                                    </Label>
                                    <Input
                                        id="start_date"
                                        name="start_date"
                                        required
                                        type="date"
                                        min={new Date(Date.now() + 12096e5).toISOString().split("T")[0]}
                                        defaultValue={course.start_date.split("T")[0]}
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
                                        name="external_learning_platform_link"
                                        required
                                        defaultValue={course.external_learning_platform_link || ""}
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
                                        name="enrollment_count"
                                        required
                                        type="number"
                                        defaultValue={course.enrollment_count}
                                        readOnly={isEditingDisabled}
                                        className={isEditingDisabled ? readOnlyInputClassName : inputClassName}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>

                <Button
                    size="lg"
                    className="w-full bg-slate-900 text-pink-400 hover:bg-slate-800 font-semibold text-base sm:text-lg group mb-6"
                    onClick={() => {
                        router.push(`/instructor/dashboard/courses/${course.id}/materials`);
                    }}
                >
                    <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Materials & AI Tools</span>
                </Button>
            </div>
        </div>
    );
}
