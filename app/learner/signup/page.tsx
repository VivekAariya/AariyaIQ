"use client";

import { registerLearner } from "@/app/actions/auth-actions";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignupPage() {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await registerLearner(null, formData);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
            <MainNav />
            <div className="flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border-cyan-500/20 shadow-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
                        <CardDescription className="text-gray-300">
                            Join AariyaIQ and start your learning journey
                        </CardDescription>
                    </CardHeader>
                    <form action={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name" className="text-sm font-medium text-gray-200">
                                    First Name
                                </Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    required
                                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name" className="text-sm font-medium text-gray-200">
                                    Last Name
                                </Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter your last name"
                                    required
                                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a password"
                                        required
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 pr-10"
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
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        required
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                                        onClick={() => setShowConfirmPassword((v) => !v)}
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
                                disabled={isPending}
                            >
                                {isPending ? "Creating Account..." : "Create Account"}
                            </Button>
                        </CardContent>
                    </form>

                    <CardFooter className="flex justify-center">
                        <div className="text-sm text-gray-300">
                            Already have an account?{" "}
                            <Link
                                href="/learner/login"
                                className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
