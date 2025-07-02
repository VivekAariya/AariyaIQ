"use client";

import {
    handleBanInstructorProfile,
    handleInstructorProfileForm,
    handleSuspendInstructorProfile,
} from "@/app/actions/super-admin-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Mail,
    Pause,
    Phone,
    Save,
    Shield,
    User,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export interface InstructorProfileClientProps {
    instructor: any;
    courses: any;
}

export function InstructorProfileClient({ instructor, courses }: InstructorProfileClientProps) {
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
                return <User className="h-4 w-4" />;
        }
    };

    const handleInstructorProfileFormSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await handleInstructorProfileForm(formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result.message || "Profile updated successfully!",
                });
                router.refresh();
            }
        });
    };

    const handleBanInstructor = async () => {
        startTransition(async () => {
            const result = await handleBanInstructorProfile(instructor.id);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "Failed to ban instructor",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: result?.message || "Instructor has been banned successfully and notified via email",
                    variant: "warn",
                });
                router.refresh();
            }
        });
    };

    const handleSuspendInstructor = async () => {
        startTransition(async () => {
            const result = await handleSuspendInstructorProfile(instructor.id);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "Failed to suspend instructor",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: result?.message || "Instructor has been suspended successfully and notified via email",
                    variant: "warn",
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Quantum Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-ping"
                    style={{ animationDuration: "4s" }}
                />
            </div>

            <div className="relative z-10 space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="bg-black/50 border-white/20 hover:bg-white/10"
                        >
                            <Link href="/super-admin/dashboard/instructors">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Instructor Profile
                            </h1>
                            <p className="text-gray-400">Manage instructor details and permissions</p>
                        </div>
                    </div>
                </div>

                {/* Profile Overview Card */}
                <Card className="bg-black/40 border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage
                                        src={instructor.profile_image || "https://github.com/shadcn.png"}
                                        alt={instructor.first_name + " " + instructor.last_name}
                                    />
                                    <AvatarFallback>{instructor.first_name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>

                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h2 className="text-2xl font-bold text-white">
                                        {instructor.first_name + " " + instructor.last_name}
                                    </h2>
                                    <Badge
                                        className={`${getStatusColor(instructor.profile_status)} flex items-center space-x-1`}
                                    >
                                        {getStatusIcon(instructor.profile_status)}
                                        <span className="capitalize">{instructor.profile_status}</span>
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <Mail className="h-4 w-4 text-cyan-400" />
                                        <span>{instructor.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <Phone className="h-4 w-4 text-cyan-400" />
                                        <span>{instructor.phone_number}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <Calendar className="h-4 w-4 text-cyan-400" />
                                        <span>
                                            Joined{" "}
                                            {new Date(instructor.created_at).toLocaleDateString("en-UK", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <User className="h-4 w-4 text-cyan-400" />
                                        <span>{instructor.studentsEnrolled || 0} </span>
                                        <span className="text-gray-500">Students</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs for Different Sections */}
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="bg-black/40 border border-white/20 backdrop-blur-sm">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500"
                        >
                            Profile Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="courses"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500"
                        >
                            Courses
                        </TabsTrigger>
                        <TabsTrigger
                            value="statistics"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500"
                        >
                            Statistics
                        </TabsTrigger>
                        <TabsTrigger
                            value="actions"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500"
                        >
                            Actions
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Details Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <form action={handleInstructorProfileFormSubmit} name="instructorProfileForm">
                            <input type="hidden" name="id" value={instructor.id} />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <Card className="bg-black/40 border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-cyan-400">Basic Information</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Update instructor's basic profile information
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="profile_status" className="text-gray-300">
                                                Profile Status
                                            </Label>
                                            <Select defaultValue={instructor.profile_status} name="profile_status">
                                                <SelectTrigger className="bg-black/50 border-white/20 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black border-white/20">
                                                    <SelectItem value="approved" className="text-green-400">
                                                        Approved
                                                    </SelectItem>
                                                    <SelectItem value="pending" className="text-yellow-400">
                                                        Pending Review
                                                    </SelectItem>
                                                    <SelectItem value="suspended" className="text-red-400">
                                                        Suspended
                                                    </SelectItem>
                                                    <SelectItem value="banned" className="text-red-300">
                                                        Banned
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-gray-300">
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    defaultValue={instructor.first_name}
                                                    className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-gray-300">
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    defaultValue={instructor.last_name}
                                                    className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-300">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={instructor.email}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-gray-300">
                                                Phone
                                            </Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                defaultValue={instructor.phone_number}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location" className="text-gray-300">
                                                Location
                                            </Label>
                                            <Textarea
                                                id="location"
                                                name="location"
                                                defaultValue={instructor.location}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                rows={3}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Professional Information */}
                                <Card className="bg-black/40 border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-cyan-400">Professional Information</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Instructor's qualifications and experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="years_of_experience" className="text-gray-300">
                                                Experience
                                            </Label>
                                            <Input
                                                id="years_of_experience"
                                                name="years_of_experience"
                                                defaultValue={instructor.years_of_experience}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="professional_bio" className="text-gray-300">
                                                Professional Bio
                                            </Label>
                                            <Textarea
                                                rows={4}
                                                id="professional_bio"
                                                name="professional_bio"
                                                defaultValue={instructor.professional_bio}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="area_of_expertise" className="text-gray-300">
                                                Area of Expertise
                                            </Label>
                                            <Input
                                                id="area_of_expertise"
                                                name="area_of_expertise"
                                                defaultValue={instructor.area_of_expertise}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                placeholder="React, Node.js, Python..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="linkedin_profile" className="text-gray-300">
                                                LinkedIn Profile
                                            </Label>
                                            <Input
                                                id="linkedin_profile"
                                                name="linkedin_profile"
                                                defaultValue={instructor.linkedin_profile}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                placeholder="https://www.linkedin.com/in/your-profile"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="portfolio_website" className="text-gray-300">
                                                Portfolio Website
                                            </Label>
                                            <Input
                                                id="portfolio_website"
                                                name="portfolio_website"
                                                defaultValue={instructor.portfolio_website}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proposed_course_ideas" className="text-gray-300">
                                                Proposed Course Ideas
                                            </Label>
                                            <Textarea
                                                id="proposed_course_ideas"
                                                name="proposed_course_ideas"
                                                defaultValue={instructor.proposed_course_ideas}
                                                className="bg-black/50 border-white/20 text-white focus:border-cyan-500"
                                                rows={4}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="mt-4">
                                    <Button variant={"outline"} className="p-5" type="submit" disabled={isPending}>
                                        <Save className="h-4 w-4 mr-2" />
                                        {isPending ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </TabsContent>

                    {/* Courses Tab */}
                    <TabsContent value="courses" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses && courses.length > 0 ? (
                                courses.map((course: any) => (
                                    <Card
                                        key={course.id}
                                        className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-200 shadow-lg"
                                    >
                                        <CardContent className="p-6 flex flex-col h-full justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                                                    {course.course_title}
                                                </h3>
                                                <p className="text-cyan-300 text-sm mb-2 line-clamp-2">
                                                    {course.short_description}
                                                </p>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-xs text-gray-300 bg-cyan-700/30 px-2 py-1 rounded">
                                                        {course.category || "General"}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {course.level || "All Levels"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 mb-4">
                                                    <User className="h-4 w-4 text-cyan-400" />
                                                    <span className="text-sm text-gray-200">
                                                        {course.enrollment_count || 0} Students
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <Link
                                                    href={`/super-admin/dashboard/courses/${course.id}`}
                                                    passHref
                                                    legacyBehavior
                                                >
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
                                                    >
                                                        <a>View</a>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card className="col-span-3 bg-black/40 border-white/20 backdrop-blur-sm">
                                    <CardContent className="p-6 text-center text-gray-400">
                                        No courses found for this instructor.
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    {/* Statistics Tab */}
                    <TabsContent value="statistics" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-cyan-300 text-sm font-medium">Courses Created</p>
                                            <p className="text-3xl font-bold text-white">{instructor.coursesCreated}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                            <User className="h-6 w-6 text-cyan-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-purple-300 text-sm font-medium">Students Enrolled</p>
                                            <p className="text-3xl font-bold text-white">
                                                {instructor.studentsEnrolled}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                            <User className="h-6 w-6 text-purple-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-300 text-sm font-medium">Average Rating</p>
                                            <p className="text-3xl font-bold text-white">{instructor.rating}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="h-6 w-6 text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-yellow-300 text-sm font-medium">Total Reviews</p>
                                            <p className="text-3xl font-bold text-white">{instructor.totalReviews}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                            <User className="h-6 w-6 text-yellow-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Actions Tab */}
                    <TabsContent value="actions" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-black/40 border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="text-red-400">Restrictive Actions</CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Actions that restrict or penalize the instructor
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <form action={handleBanInstructor}>
                                        <Button
                                            variant="destructive"
                                            className="w-full bg-red-700 hover:bg-red-800"
                                            type="submit"
                                            disabled={isPending}
                                        >
                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                            {isPending ? "Processing..." : "Ban Instructor"}
                                        </Button>
                                    </form>

                                    <form action={handleSuspendInstructor}>
                                        <Button
                                            variant="outline"
                                            className="w-full border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                                            type="submit"
                                            disabled={isPending}
                                        >
                                            <Pause className="h-4 w-4 mr-2" />
                                            {isPending ? "Processing..." : "Suspend Temporarily"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Action Log */}
                        {/* <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-cyan-400">Recent Actions</CardTitle>
                                <CardDescription className="text-gray-400">
                                    History of actions taken on this instructor's profile
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                                            <span className="text-white">Profile approved by Admin</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">2 days ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                            <span className="text-white">Welcome email sent</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">2 days ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                            <span className="text-white">Profile submitted for review</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">5 days ago</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
