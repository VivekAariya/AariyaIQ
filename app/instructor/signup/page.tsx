"use client";

import { registerInstructor } from "@/app/actions/auth-actions";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { RegistrationStatusIndicator } from "@/components/super-admin/registration-status-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function InstructorRegistrationPage() {
    const router = useRouter();
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await registerInstructor(null, formData);

            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result.error || result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description:
                        result.message ||
                        "Account created successfully! Please check your email to verify your account.",
                });
                router.replace("/verify-email");
            }
        });
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
                                    <form action={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" required name="firstName" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" required name="lastName" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" required name="email" type="email" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" required name="phone" type="tel" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    required
                                                    name="location"
                                                    placeholder="City, Country"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="expertise">Areas of Expertise</Label>
                                                <Select
                                                    defaultValue="Artificial Intelligence"
                                                    required
                                                    name="expertise"
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
                                                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                                                        <SelectItem value="Management">Management</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="experience">Years of Experience</Label>
                                                <Select defaultValue="3-5" required name="experience">
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
                                                    required
                                                    name="bio"
                                                    placeholder="Tell us about your professional background and teaching experience"
                                                    rows={5}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                                <Input
                                                    id="linkedin"
                                                    required
                                                    name="linkedin"
                                                    type="url"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="portfolio">Portfolio/Website</Label>
                                                <Input
                                                    id="portfolio"
                                                    required
                                                    name="portfolio"
                                                    type="url"
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="courseIdeas">Proposed Course Ideas</Label>
                                                <Textarea
                                                    id="courseIdeas"
                                                    required
                                                    name="courseIdeas"
                                                    placeholder="Describe the courses you would like to teach"
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        required
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        tabIndex={-1}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                                                        onClick={() => setShowPassword((v) => !v)}
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="confirmPassword"
                                                        required
                                                        name="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        tabIndex={-1}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                                                        onClick={() => setShowConfirmPassword((v) => !v)}
                                                        aria-label={
                                                            showConfirmPassword ? "Hide password" : "Show password"
                                                        }
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-2">
                                                <Checkbox id="terms" required />
                                                <Label
                                                    htmlFor="terms"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    I agree to the{" "}
                                                    <Link
                                                        href="/terms"
                                                        className="underline text-cyan-500 hover:text-cyan-600"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        terms and conditions
                                                    </Link>
                                                </Label>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white"
                                            disabled={isPending}
                                        >
                                            {isPending ? "Submitting..." : "Submit Application"}
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
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
