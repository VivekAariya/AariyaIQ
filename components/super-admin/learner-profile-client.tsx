"use client";

import { handleLearnerProfileForm } from "@/app/actions/super-admin-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, Calendar, Mail, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export interface LearnerProfileClientProps {
    learner: any;
    enrollments: any[];
}

export function LearnerProfileClient({ learner, enrollments }: LearnerProfileClientProps) {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await handleLearnerProfileForm(formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result.message || "Profile updated successfully. ",
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-ping"
                    style={{ animationDuration: "4s" }}
                />
            </div>

            <div className="relative z-10 space-y-6 p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="bg-black/50 border-white/20 hover:bg-white/10"
                    >
                        <Link href="/super-admin/dashboard/learners">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Learner Profile
                        </h1>
                        <p className="text-gray-400">Manage learner details and enrollments</p>
                    </div>
                </div>

                <Card className="bg-black/40 border-white/20 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                            <Avatar>
                                <AvatarImage
                                    src={learner.profile_image}
                                    alt={learner.first_name + " " + learner.last_name}
                                />
                                <AvatarFallback>{learner.first_name?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h2 className="text-2xl font-bold text-white">
                                        {learner.first_name} {learner.last_name}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <Mail className="h-4 w-4 text-cyan-400" />
                                        <span>{learner.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <Calendar className="h-4 w-4 text-cyan-400" />
                                        <span>
                                            Joined{" "}
                                            {learner.created_at
                                                ? new Date(learner.created_at).toLocaleDateString("en-UK", {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                  })
                                                : "-"}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <BookOpen className="h-4 w-4 text-cyan-400" />
                                        <span>{enrollments?.length || 0} Enrollments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="profile" className="space-y-6 mt-6">
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
                            Enrolled Courses
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                        <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-cyan-400">Basic Information</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Learner's basic profile information
                                </CardDescription>
                            </CardHeader>
                            <form action={handleSubmit}>
                                <input type="hidden" name="learnerId" value={learner.id} />
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-gray-300">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                defaultValue={learner.first_name}
                                                required
                                                className="bg-black/50 border-white/20 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-gray-300">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                defaultValue={learner.last_name}
                                                required
                                                className="bg-black/50 border-white/20 text-white"
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
                                            defaultValue={learner.email}
                                            required
                                            className="bg-black/50 border-white/20 text-white"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Button variant={"outline"} className="p-5" type="submit" disabled={isPending}>
                                            <Save className="h-4 w-4 mr-2" />
                                            {isPending ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="courses" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments && enrollments.length > 0 ? (
                                enrollments.map((enrollment: any) => (
                                    <Card
                                        key={enrollment.id}
                                        className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-200 shadow-lg"
                                    >
                                        <CardContent className="p-6 flex flex-col h-full justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                                                    {enrollment.course_title}
                                                </h3>
                                                <p className="text-cyan-300 text-sm mb-2 line-clamp-2">
                                                    {enrollment.short_description}
                                                </p>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-xs text-gray-300 bg-cyan-700/30 px-2 py-1 rounded">
                                                        {enrollment.category || "General"}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {enrollment.level || "All Levels"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <Link
                                                    href={`/super-admin/dashboard/courses/${enrollment.course_id}`}
                                                    passHref
                                                    legacyBehavior
                                                >
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
                                                    >
                                                        <a>View Course</a>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card className="col-span-3 bg-black/40 border-white/20 backdrop-blur-sm">
                                    <CardContent className="p-6 text-center text-gray-400">
                                        No enrolled courses found for this learner.
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
