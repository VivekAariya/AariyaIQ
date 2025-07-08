"use client";

import { submitCourseMaterial } from "@/app/actions/instructor-actions";
import { handleCourseEdit } from "@/app/actions/super-admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getBlobMetadata } from "@/lib/blob-storage";
import { deleteBlob, listBlobs } from "@/utils/blob-client";
import logger from "@/utils/logger";
import {
    AlertTriangle,
    BookOpen,
    Brain,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    FileText,
    Loader2,
    Image as LucideImage,
    Save,
    User,
    Users,
    XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FileUploadNew } from "../file-upload";
import { Badge } from "../ui/badge";

export interface CourseEditClient {
    course: any;
    materials: any;
    aiContent: any;
    instructor: any;
}

export function CourseEditClient({ course, materials, instructor, aiContent }: CourseEditClient) {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<any>(null);
    const [showUploadModal, setShowUploadModal] = useState(true);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await handleCourseEdit(formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description:
                        result.message ||
                        "Account created successfully! Please check your email to verify your account.",
                });
                router.refresh();
            }
        });
    };

    const loadFiles = async () => {
        setLoading(true);
        try {
            const result = await getBlobMetadata(materials.view_url);
            logger.info("Loaded files:", result);

            if (result) {
                setShowUploadModal(false);
            } else {
                setShowUploadModal(true);
            }

            setFile(result);
            return result;
        } catch (error) {
            console.error("Error loading files:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (url: string) => {
        setLoading(true);
        try {
            const result = await deleteBlob(url);
            if (result.success) {
                await loadFiles();
            } else {
                throw new Error("Failed to delete file");
            }
        } catch (error) {
            logger.error("Error deleting file:", error);
            alert("Failed to delete file");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadComplete = async () => {
        startTransition(async () => {
            const blobResult = await listBlobs(`courses/${course.id}/materials`);
            if (blobResult?.blobs?.length === 0) {
                logger.error("No files found");
                return;
            }

            const formData = new FormData();
            formData.append("courseId", course.id);
            formData.append("userId", course.instructor);

            const result = await submitCourseMaterial(formData, blobResult?.blobs[0]);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Course material uploaded successfully!",
                });
                window.location.reload();
            }
        });
    };

    const handleDownloadImage = (content: any) => {
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${content}`;
        link.download = "ai-generated-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                return <User className="h-4 w-4" />;
        }
    };

    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            toast({
                title: "Copied!",
                description: "Content copied to clipboard successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    return (
        <div className="max-md:mt-10 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 md:p-8 space-y-8 max-w-[100vw]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Edit Course
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Managing course: <span className="font-semibold text-cyan-400">{course.course_title}</span>
                        </p>
                        <p>
                            <span className="text-gray-400">Instructor:</span>{" "}
                            <span className="font-semibold text-cyan-400">
                                {instructor.first_name} {instructor.last_name}
                            </span>
                        </p>

                        <Badge className={`${getStatusColor(course.status)} flex items-center space-x-1 w-fit mt-2`}>
                            {getStatusIcon(course.status)}
                            <span className="capitalize">{course.status}</span>
                        </Badge>
                    </div>
                </div>
                <form action={handleSubmit}>
                    <input type="hidden" name="course_id" value={course.id} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                                        <BookOpen className="h-5 w-5 mr-2 text-cyan-400" />
                                        Core Information
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        The main details of the course.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label htmlFor="course_title" className="text-gray-300">
                                            Course Title
                                        </Label>
                                        <Input
                                            id="course_title"
                                            name="course_title"
                                            required
                                            defaultValue={course.course_title}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="short_description" className="text-gray-300">
                                            Short Description
                                        </Label>
                                        <Textarea
                                            id="short_description"
                                            name="short_description"
                                            required
                                            defaultValue={course.short_description}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="full_description" className="text-gray-300">
                                            Full Description
                                        </Label>
                                        <Textarea
                                            id="full_description"
                                            name="full_description"
                                            required
                                            defaultValue={course.full_description}
                                            rows={6}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                                        <FileText className="h-5 w-5 mr-2 text-purple-400" />
                                        Curriculum Details
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        What students will learn and need to know.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label htmlFor="course_contents" className="text-gray-300">
                                            Course Contents
                                        </Label>
                                        <Textarea
                                            id="course_contents"
                                            name="course_contents"
                                            required
                                            defaultValue={course.course_contents}
                                            rows={12}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20 font-mono text-sm"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="prerequisites" className="text-gray-300">
                                            Prerequisites
                                        </Label>
                                        <Textarea
                                            id="prerequisites"
                                            name="prerequisites"
                                            required
                                            defaultValue={course.prerequisites}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                            rows={4}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="learning_outcomes" className="text-gray-300">
                                            Learning Outcomes
                                        </Label>
                                        <Textarea
                                            id="learning_outcomes"
                                            name="learning_outcomes"
                                            required
                                            defaultValue={course.learning_outcomes}
                                            rows={5}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Course Image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative overflow-hidden rounded-lg">
                                        <Image
                                            src={
                                                course.course_image ||
                                                "/placeholder.svg?width=400&height=225&query=Course+Image"
                                            }
                                            alt={course.course_title}
                                            width={400}
                                            height={225}
                                            className="rounded-lg object-cover w-full hover:scale-105 transition-transform duration-300 max-h-56 sm:max-h-none"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div>
                                        <Label htmlFor="course_image" className="text-gray-300">
                                            Image URL
                                        </Label>
                                        <Input
                                            id="course_image"
                                            name="course_image"
                                            required
                                            defaultValue={course.course_image}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Metadata & Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-gray-300">Course ID</Label>
                                        <Input
                                            value={course.id}
                                            readOnly
                                            className="font-mono text-cyan-400 bg-slate-900/50 border-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="status" className="text-gray-300">
                                            Status
                                        </Label>
                                        <Select name="status" required defaultValue={course.status}>
                                            <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                <SelectItem value="approved" className="text-green-400">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="pending" className="text-yellow-400">
                                                    Pending Review
                                                </SelectItem>
                                                <SelectItem value="suspended" className="text-orange-400">
                                                    Suspended
                                                </SelectItem>
                                                <SelectItem value="banned" className="text-red-400">
                                                    Banned
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="price" className="text-gray-300 flex items-center">
                                            <DollarSign className="h-4 w-4 mr-1" />
                                            Price (₹)
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            required
                                            type="number"
                                            defaultValue={course.price}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="level" className="text-gray-300">
                                            Level
                                        </Label>
                                        <Select name="level" required defaultValue={course.level}>
                                            <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                <SelectItem value="beginner" className="text-green-400">
                                                    Beginner
                                                </SelectItem>
                                                <SelectItem value="intermediate" className="text-yellow-400">
                                                    Intermediate
                                                </SelectItem>
                                                <SelectItem value="advanced" className="text-orange-400">
                                                    Advanced
                                                </SelectItem>
                                                <SelectItem value="expert" className="text-red-400">
                                                    Expert
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="category" className="text-gray-300">
                                            Category
                                        </Label>
                                        <Select name="category" required defaultValue={course.category}>
                                            <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white">
                                                <SelectValue />
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
                                        <Label htmlFor="duration" className="text-gray-300">
                                            Duration
                                        </Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            required
                                            defaultValue={course.duration}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="enrollment_count" className="text-gray-300 flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            Enrollments
                                        </Label>
                                        <Input
                                            id="enrollment_count"
                                            name="enrollment_count"
                                            required
                                            type="number"
                                            defaultValue={course.enrollment_count}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="start_date" className="text-gray-300 flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            Start Date
                                        </Label>
                                        <Input
                                            id="start_date"
                                            name="start_date"
                                            required
                                            type="date"
                                            defaultValue={new Date(course.start_date).toISOString().split("T")[0]}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                            min={new Date(Date.now() + 12096e5).toISOString().split("T")[0]}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="external_learning_platform_link" className="text-gray-300">
                                            External Link
                                        </Label>
                                        <Input
                                            id="external_learning_platform_link"
                                            name="external_learning_platform_link"
                                            required
                                            defaultValue={course.external_learning_platform_link}
                                            className="bg-slate-900/80 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-4">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 w-full sm:w-auto"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
                {/* Materials Section */}
                <div className="mt-12">
                    <div className="border-t border-slate-700/50 my-8"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
                        Course Materials
                    </h2>
                    <div className="mt-8 space-y-8">
                        {showUploadModal && (
                            <FileUploadNew
                                folder={`courses/${course.id}/materials`}
                                maxSize={10 * 1024 * 1024} // 10MB
                                acceptedTypes={["application/pdf"]}
                                onUploadComplete={handleUploadComplete}
                                onUploadError={(error) => alert(error)}
                            />
                        )}

                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold mb-4">Your File</h2>
                            {loading || isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <div className="space-y-2">
                                    {file ? (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">
                                                    {file?.pathname?.split("/")?.pop()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {(file?.size / (1024 * 1024)).toFixed(1)} MB •{" "}
                                                    {new Date(file?.uploadedAt)?.toLocaleDateString("en-UK", {
                                                        day: "numeric",
                                                        month: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex flex-row space-x-2 w-full sm:w-auto">
                                                <Link href={file?.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                                    <Button variant={"outline"} className="w-full sm:w-auto">View</Button>
                                                </Link>

                                                <Button
                                                    variant={"outline"}
                                                    className="text-red-600 hover:text-red-700 text-sm w-full sm:w-auto"
                                                    onClick={() => handleDelete(file?.url)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 text-center py-8">No files uploaded yet</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* AI Generated Content Section */}
                <div className="mt-12">
                    <div className="border-t border-slate-700/50 my-8"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 flex items-center">
                        <Brain className="h-8 w-8 mr-2 text-cyan-400" />
                        AI Generated Content
                    </h2>

                    {aiContent && aiContent.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {aiContent.map((content: any) => (
                                <Card
                                    key={content.id}
                                    className="bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group hover:border-cyan-500/30"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                                                    {content.gen_type === "image" ? (
                                                        <LucideImage className="h-5 w-5 mr-2 text-purple-400" />
                                                    ) : (
                                                        <FileText className="h-5 w-5 mr-2 text-cyan-400" />
                                                    )}
                                                    {content.tool_name}
                                                </CardTitle>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Badge
                                                        className={`${
                                                            content.gen_type === "image"
                                                                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                                                : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                                        } text-xs`}
                                                    >
                                                        {content.gen_type.toUpperCase()}
                                                    </Badge>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(content.created_at).toLocaleDateString("en-GB", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {content.gen_type === "image" ? (
                                            <div className="relative">
                                                <div className="aspect-video bg-slate-900/50 rounded-lg border border-slate-600 flex items-center justify-center overflow-hidden">
                                                    {content.content !== "" ? (
                                                        <img
                                                            src={`data:image/png;base64,${content.content}`}
                                                            alt="Generated AI Visual"
                                                            className="max-w-full max-h-[300px] sm:max-h-[500px] rounded shadow-lg border border-slate-600"
                                                        />
                                                    ) : (
                                                        <div className="text-center text-gray-400">
                                                            <LucideImage className="h-12 w-12 mx-auto mb-2 opacity-40" />
                                                            <p className="text-sm">Image Preview</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <Textarea
                                                value={content.content}
                                                readOnly
                                                rows={10}
                                                className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 text-xs sm:text-sm"
                                            />
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-2">
                                            <div className="text-xs text-gray-500">
                                                Updated: {new Date(content.updated_at).toLocaleDateString("en-GB")}
                                            </div>
                                            <div className="flex flex-row space-x-2 w-full sm:w-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-slate-700/50 border-slate-600 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-xs w-full sm:w-auto"
                                                    onClick={() => {
                                                        if (content.gen_type === "image") {
                                                            handleDownloadImage(content.content);
                                                        } else {
                                                            copyToClipboard(content.content);
                                                        }
                                                    }}
                                                >
                                                    {content.gen_type === "image" ? "Download" : "Copy to Clipboard"}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-slate-800/30 border-slate-700/50 text-white backdrop-blur-sm">
                            <CardContent className="py-12">
                                <div className="text-center text-gray-400">
                                    <div className="mx-auto w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl">🤖</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                                        No AI Content Generated Yet
                                    </h3>
                                    <p className="text-sm max-w-md mx-auto leading-relaxed">
                                        AI-generated content like summaries, diagrams, and assignments will appear here
                                        once created for this course.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
