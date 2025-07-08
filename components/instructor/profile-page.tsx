"use client";

import { updateInstructorProfile, updateProfileImage } from "@/app/actions/instructor-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    AlertTriangle,
    BookOpen,
    Calendar,
    Camera,
    CheckCircle,
    Clock,
    Mail,
    MapPin,
    Shield,
    Upload,
    User,
    X,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ProfilePage({ profile, courses }: any) {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(profile?.profile_image || null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isImageUploading, setIsImageUploading] = useState(false);

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

    const handleInstructorProfileSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateInstructorProfile(formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: result.message || "Profile updated successfully!",
                });
                setIsEditing(false);
                router.refresh();
            }
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast({
                    title: "Invalid file type",
                    description: "Please select an image file",
                    variant: "destructive",
                });
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 5MB",
                    variant: "destructive",
                });
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSave = async () => {
        if (!imageFile) {
            toast({
                title: "No image selected",
                description: "Please select an image first",
                variant: "destructive",
            });
            return;
        }

        setIsImageUploading(true);

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target?.result as string;

                const formData = new FormData();
                formData.append("id", profile?.id);
                formData.append("imageBase64", base64);

                const result = await updateProfileImage(formData);

                if (result.success) {
                    toast({
                        title: "Success",
                        description: result.message,
                    });
                    setImageFile(null);
                    router.refresh();
                } else {
                    toast({
                        title: "Error",
                        description: result.message,
                        variant: "destructive",
                    });
                }
            };
            reader.readAsDataURL(imageFile);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        } finally {
            setIsImageUploading(false);
        }
    };

    const handleImageRemove = () => {
        setImageFile(null);
        setImagePreview(profile?.profile_image || null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/5 via-transparent to-transparent rounded-full"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                My Profile
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">
                                Manage your instructor profile and settings
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Overview Card */}
                <Card className="mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
                            {/* Profile Picture */}
                            <div className="relative group self-center md:self-auto">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-1">
                                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-white">
                                                    {profile?.first_name?.charAt(0)?.toUpperCase() || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload overlay */}
                                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <label htmlFor="profileImageInput" className="cursor-pointer p-5">
                                        <Camera className="w-6 h-6 text-white" />
                                    </label>
                                    <input
                                        id="profileImageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                {/* Upload indicator */}
                                {isImageUploading && (
                                    <div className="absolute inset-0 rounded-full bg-black/80 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    </div>
                                )}
                            </div>

                            {imageFile && (
                                <div className="flex flex-col gap-3 bg-slate-700/30 rounded-lg p-4 border border-white/10 w-full md:w-auto">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Upload className="w-4 h-4" />
                                        New image selected: {imageFile.name}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            onClick={handleImageSave}
                                            disabled={isImageUploading}
                                            size="sm"
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                        >
                                            {isImageUploading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Save Image
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            onClick={handleImageRemove}
                                            disabled={isImageUploading}
                                            size="sm"
                                            variant="outline"
                                            className="border-white/20 text-gray-300 hover:bg-slate-700/50"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Profile Info */}
                            <div className="flex-1 w-full min-w-0">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                                        {profile?.first_name} {profile?.last_name}
                                    </h2>

                                    <Badge
                                        className={`${getStatusColor(profile?.profile_status)} flex items-center space-x-1`}
                                    >
                                        {getStatusIcon(profile?.profile_status)}
                                        <span className="capitalize">{profile?.profile_status}</span>
                                    </Badge>
                                </div>
                                <p className="text-cyan-400 font-medium mb-2 text-sm sm:text-base truncate">
                                    {profile?.area_of_expertise}
                                </p>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" />
                                        {profile?.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {profile?.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {profile?.years_of_experience} years experience
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full md:w-auto mt-4 md:mt-0">
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                                        {courses.length || 0}
                                    </div>
                                    <div className="text-xs text-gray-400">Courses</div>
                                </div>

                                {/*  <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-400">
                                        {stats.totalStudents.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-400">Students</div>
                                </div>
                              <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">{stats.averageRating}</div>
                                    <div className="text-xs text-gray-400">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">{stats.completionRate}%</div>
                                    <div className="text-xs text-gray-400">Completion</div>
                                </div> */}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabbed Content */}
                <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-white/10">
                        <TabsTrigger
                            value="personal"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                        >
                            Personal Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger
                            value="statistics"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
                        >
                            Statistics
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Info Tab (now includes Professional fields) */}
                    <TabsContent value="personal">
                        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <User className="w-5 h-5 text-cyan-400" />
                                    Personal Information
                                </CardTitle>
                                <CardTitle className="text-white">
                                    <Button
                                        onClick={() => setIsEditing((v) => !v)}
                                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                                    >
                                        {isEditing ? "Cancel" : "Edit Profile"}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form action={handleInstructorProfileSubmit} className="space-y-6">
                                    <input type="hidden" name="id" value={profile?.id} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-gray-300">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                defaultValue={profile?.first_name}
                                                disabled={!isEditing || isPending}
                                                className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-gray-300">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                defaultValue={profile?.last_name}
                                                disabled={!isEditing || isPending}
                                                className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-300">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={profile?.email}
                                                disabled={!isEditing || isPending}
                                                className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-gray-300">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                defaultValue={profile?.phone_number}
                                                disabled={!isEditing || isPending}
                                                className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-gray-300">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            defaultValue={profile?.location}
                                            disabled={!isEditing || isPending}
                                            className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio" className="text-gray-300">
                                            Bio
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            defaultValue={profile?.professional_bio}
                                            disabled={!isEditing || isPending}
                                            rows={4}
                                            className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60 resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="area_of_expertise">Areas of Expertise</Label>
                                            <Select
                                                name="area_of_expertise"
                                                defaultValue={profile?.area_of_expertise}
                                                disabled={!isEditing || isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select primary expertise" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Artificial Intelligence">
                                                        Artificial Intelligence
                                                    </SelectItem>
                                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                                    <SelectItem value="Data Science">Data Science</SelectItem>
                                                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                                                    <SelectItem value="DevOps">DevOps</SelectItem>
                                                    <SelectItem value="Mobile Development">
                                                        Mobile Development
                                                    </SelectItem>
                                                    <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="years_of_experience">Years of Experience</Label>
                                            <Select
                                                name="years_of_experience"
                                                defaultValue={profile?.years_of_experience}
                                                disabled={!isEditing || isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select years of experience" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-2">1-2 years</SelectItem>
                                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                                    <SelectItem value="6-10">6-10 years</SelectItem>
                                                    <SelectItem value="10+">10+ years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedinProfile" className="text-gray-300">
                                            LinkedIn Profile
                                        </Label>
                                        <Input
                                            id="linkedinProfile"
                                            name="linkedinProfile"
                                            defaultValue={profile?.linkedin_profile}
                                            disabled={!isEditing || isPending}
                                            className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="portfolioWebsite" className="text-gray-300">
                                            Portfolio Website
                                        </Label>
                                        <Input
                                            id="portfolioWebsite"
                                            name="portfolioWebsite"
                                            defaultValue={profile?.portfolio_website}
                                            disabled={!isEditing || isPending}
                                            className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="proposedCourseIdeas" className="text-gray-300">
                                            Proposed Course Ideas
                                        </Label>
                                        <Textarea
                                            id="proposedCourseIdeas"
                                            name="proposedCourseIdeas"
                                            defaultValue={profile?.proposed_course_ideas}
                                            disabled={!isEditing || isPending}
                                            rows={2}
                                            className="bg-slate-700/50 border-white/10 text-white disabled:opacity-60 resize-none"
                                        />
                                    </div>
                                    {isEditing && (
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Saving..." : "Save Changes"}
                                        </Button>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Account Tab */}
                    <TabsContent value="account">
                        <div className="space-y-6">
                            {/* Password Change */}
                            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-400" />
                                        Security Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">
                                            If you wish to change your password, please click the button below
                                        </Label>
                                    </div>
                                    <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                                        <Link href="/forgot-password">Forgot Password</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Notification Preferences */}
                            {/* <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-yellow-400" />
                                        Notification Preferences
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-gray-300">Email Notifications</Label>
                                            <p className="text-sm text-gray-400">
                                                Receive notifications about your courses and students
                                            </p>
                                        </div>
                                        <Switch
                                        // checked={profileData.emailNotifications}
                                        // onCheckedChange={(checked) =>
                                        //     handleInputChange("emailNotifications", checked)
                                        // }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-gray-300">Course Updates</Label>
                                            <p className="text-sm text-gray-400">
                                                Get notified when students enroll or complete courses
                                            </p>
                                        </div>
                                        <Switch
                                        // checked={profileData.courseUpdates}
                                        // onCheckedChange={(checked) => handleInputChange("courseUpdates", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label className="text-gray-300">Marketing Emails</Label>
                                            <p className="text-sm text-gray-400">
                                                Receive updates about new features and promotions
                                            </p>
                                        </div>
                                        <Switch
                                        // checked={profileData.marketingEmails}
                                        // onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                                        />
                                    </div>
                                </CardContent>
                            </Card> */}
                        </div>
                    </TabsContent>

                    {/* Statistics Tab */}
                    <TabsContent value="statistics">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Total Courses */}
                            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm border border-cyan-500/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-cyan-400 text-sm font-medium">Total Courses</p>
                                            <p className="text-3xl font-bold text-white">{courses.length || 0}</p>
                                        </div>
                                        <BookOpen className="w-8 h-8 text-cyan-400" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* <div>
                             Total Students 
                                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-purple-400 text-sm font-medium">Total Students</p>
                                                <p className="text-3xl font-bold text-white">
                                                    {stats.totalStudents.toLocaleString()}
                                                </p>
                                            </div>
                                            <Users className="w-8 h-8 text-purple-400" />
                                        </div>
                                    </CardContent>
                                </Card>

                                 Average Rating 
                                <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-500/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-yellow-400 text-sm font-medium">Average Rating</p>
                                                <p className="text-3xl font-bold text-white flex items-center gap-1">
                                                    {stats.averageRating}
                                                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                                </p>
                                            </div>
                                            <Star className="w-8 h-8 text-yellow-400" />
                                        </div>
                                    </CardContent>
                                </Card>

                                 Total Earnings 
                                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-green-400 text-sm font-medium">Total Earnings</p>
                                                <p className="text-3xl font-bold text-white">
                                                    ${stats.totalEarnings.toLocaleString()}
                                                </p>
                                            </div>
                                            <DollarSign className="w-8 h-8 text-green-400" />
                                        </div>
                                    </CardContent>
                                </Card>

                                 Completion Rate 
                                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-blue-400 text-sm font-medium">Completion Rate</p>
                                                <p className="text-3xl font-bold text-white">{stats.completionRate}%</p>
                                            </div>
                                            <TrendingUp className="w-8 h-8 text-blue-400" />
                                        </div>
                                    </CardContent>
                                </Card>

                                 Response Time 
                                <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 backdrop-blur-sm border border-indigo-500/20">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-indigo-400 text-sm font-medium">Response Time</p>
                                                <p className="text-3xl font-bold text-white">{stats.responseTime}</p>
                                            </div>
                                            <Mail className="w-8 h-8 text-indigo-400" />
                                        </div>
                                    </CardContent>
                                </Card>

                                 */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
