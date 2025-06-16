"use client";

import { loginLearner } from "@/app/actions/auth-actions";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await loginLearner(null, formData);

            if (!result?.success) {
                toast({
                    title: "Login Failed",
                    description: result.error,
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome back to AariyaIQ!",
                });

                // Redirect to the dashboard or home page
                router.replace("/learner/dashboard");
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
            <MainNav />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md border-2 border-cyan-400/30 shadow-xl shadow-cyan-500/20 bg-gray-950/90">
                    <CardHeader className="space-y-2 border-b border-cyan-500/20 pb-6">
                        <CardTitle className="text-3xl font-bold text-white">Learner Login</CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                            Enter your credentials to access your learning dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form action={handleSubmit} className="space-y-5">
                            <input type="hidden" name="userType" value="learner" />

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-200 text-base">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="learner@example.com"
                                    required
                                    className="bg-gray-800 border-gray-700 text-white h-11"
                                />
                            </div>
                            <div className="relative space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-200 text-base">
                                        Password
                                    </Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                {/* <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-gray-800 border-gray-700 text-white h-11"
                                /> */}

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
                                    className="absolute right-2 top-11 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                                disabled={isPending}
                            >
                                {isPending ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col border-t border-cyan-500/20 pt-6">
                        <div className="text-center">
                            <p className="text-gray-300 text-base mb-2">Don&apos;t have a learner account?</p>
                            <Link
                                href="/learner/signup"
                                className="inline-block px-6 py-2 bg-cyan-900/50 hover:bg-cyan-800 text-white font-medium rounded-md transition-colors"
                            >
                                Sign up as Learner
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
