"use client";

import type React from "react";

import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { RegistrationStatusIndicator } from "@/components/registration-status-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Import the email action at the top of the file
import { sendInstructorApplicationEmail } from "@/app/actions/email-actions";

export default function InstructorRegistrationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update the handleSubmit function to send an email
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Get form data
        const formData = new FormData(e.target as HTMLFormElement);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const expertise = formData.get("expertise") as string;
        const fullName = `${firstName} ${lastName}`;

        try {
            // Simulate API call to save application
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Send confirmation email
            await sendInstructorApplicationEmail({
                instructorName: fullName,
                instructorEmail: email,
                expertise: expertise,
                applicationDate: new Date().toLocaleDateString(),
                loginLink: "https://aariyatech.co.uk/dashboard/instructor-application",
            });

            setIsSubmitting(false);
            toast({
                title: "Application Submitted",
                description:
                    "Your instructor application has been submitted and is pending approval. Check your email for confirmation.",
            });
            router.push("/dashboard/instructor-application");
        } catch (error) {
            setIsSubmitting(false);
            toast({
                title: "Application Error",
                description: "There was an error submitting your application. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-600/80 via-indigo-500/70 to-violet-600/80">
            <MainNav />
            <main className="flex-1 py-12">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Instructor Application</h1>
                                <p className="text-muted-foreground">
                                    Complete the form below to apply as an instructor
                                </p>
                            </div>

                            <Card className="border border-white/20 bg-black/20 backdrop-blur-sm dark:border-white/10">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>
                                        Provide your details to begin the application process
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" required />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" required />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" type="tel" required />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input id="location" placeholder="City, Country" required />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                                <Select defaultValue="ai">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select primary expertise" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                                                        <SelectItem value="web">Web Development</SelectItem>
                                                        <SelectItem value="data">Data Science</SelectItem>
                                                        <SelectItem value="cloud">Cloud Computing</SelectItem>
                                                        <SelectItem value="devops">DevOps</SelectItem>
                                                        <SelectItem value="mobile">Mobile Development</SelectItem>
                                                        <SelectItem value="ux">UX/UI Design</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="experience">Years of Experience</Label>
                                                <Select defaultValue="3-5">
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

                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Professional Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    placeholder="Tell us about your professional background and teaching experience"
                                                    rows={5}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                                <Input
                                                    id="linkedin"
                                                    type="url"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="portfolio">Portfolio/Website</Label>
                                                <Input
                                                    id="portfolio"
                                                    type="url"
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="courseIdeas">Proposed Course Ideas</Label>
                                                <Textarea
                                                    id="courseIdeas"
                                                    placeholder="Describe the courses you would like to teach"
                                                    rows={3}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-start space-x-2">
                                                <Checkbox id="terms" required />
                                                <Label
                                                    htmlFor="terms"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    I agree to the terms and conditions and understand that my
                                                    application is subject to approval
                                                </Label>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="border border-white/20 bg-black/20 backdrop-blur-sm dark:border-white/10">
                                <CardHeader>
                                    <CardTitle>Instructor Benefits</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Share your expertise with a global audience</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Competitive compensation structure</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Flexible teaching schedule</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Professional development opportunities</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Access to cutting-edge teaching tools</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-white/20 bg-black/20 backdrop-blur-sm dark:border-white/10">
                                <CardHeader>
                                    <CardTitle>Application Process</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RegistrationStatusIndicator
                                        steps={[
                                            { id: 1, name: "Submit Application", status: "upcoming" },
                                            { id: 2, name: "Initial Review", status: "upcoming" },
                                            { id: 3, name: "Payment", status: "upcoming" },
                                            { id: 4, name: "Compliance Check", status: "upcoming" },
                                            { id: 5, name: "Final Approval", status: "upcoming" },
                                        ]}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
