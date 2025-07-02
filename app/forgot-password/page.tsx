"use client";

import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { QuantumBackground } from "@/components/quantum-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { forgotPassword } from "../actions/auth-actions";

export default function ForgotPasswordPage() {
    const { toast } = useToast();

    const [isPending, startTransition] = useTransition();

    const [state, setState] = useState<any>(null);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;

            const result = await forgotPassword(email);

            if (!result.success) {
                logger.error("Supabase password reset error:", result?.message);
                setState({
                    error: result?.message || "Failed to send reset email.",
                    success: false,
                });
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
                return;
            } else {
                logger.log("Forgot password result:", result?.message);
                setState({
                    message: "Password reset email sent successfully. Please check your inbox.",
                    success: true,
                });
                toast({
                    title: "Success",
                    description: result?.message || "Password reset email sent successfully. Please check your inbox.",
                });
                return;
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <QuantumBackground />

            <div className="relative z-10 flex min-h-screen flex-col">
                <MainNav />

                <main className="flex-1 flex items-center justify-center py-12 px-4">
                    <div className="w-full max-w-md">
                        {/* Neon container effect */}
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                            <Card className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                                <CardHeader className="space-y-4 text-center">
                                    {/* Icon with gradient background */}
                                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-0.5">
                                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                            <Shield className="w-8 h-8 text-cyan-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                            Reset Password
                                        </CardTitle>
                                        <p className="text-slate-400 text-sm">
                                            Enter your email address and we'll send you a secure link to reset your
                                            password
                                        </p>
                                    </div>
                                </CardHeader>

                                <form action={handleSubmit}>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email address"
                                                    required
                                                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                                                />
                                            </div>
                                        </div>

                                        {/* Error message */}
                                        {state?.error && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                <p className="text-red-400 text-sm text-center">{state.error}</p>
                                            </div>
                                        )}

                                        {/* Success message */}
                                        {state?.success && (
                                            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20">
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                    <p className="text-green-400 text-sm">{state.message}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit button */}
                                        <Button
                                            type="submit"
                                            className="w-full relative group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25"
                                            disabled={isPending}
                                        >
                                            <span className="relative z-10">
                                                {isPending ? (
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        <span>Sending Reset Link...</span>
                                                    </div>
                                                ) : (
                                                    "Send Reset Link"
                                                )}
                                            </span>
                                        </Button>

                                        {/* Security notice */}
                                        <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                                            <p className="text-slate-400 text-xs text-center">
                                                🔒 The reset link will expire in 1 hour for security purposes
                                            </p>
                                        </div>
                                    </CardContent>
                                </form>

                                <CardFooter className="flex flex-col space-y-4">
                                    {/* Back to login */}
                                    <Link
                                        href="/learner/login"
                                        className="flex items-center justify-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                                        <span className="text-sm">Back to Login</span>
                                    </Link>

                                    {/* Sign up link */}
                                    <div className="text-center">
                                        <span className="text-slate-400 text-sm">Don't have an account? </span>
                                        <Link
                                            href="/learner/signup"
                                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
