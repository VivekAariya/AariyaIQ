"use client";

import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function ResetPasswordPage() {
    const supabase = useSupabaseClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    // const token = searchParams.get("token");
    const code = searchParams.get("code");

    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    async function updatePassword(newPassword: string) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                logger.error("Password update error:", error);
                return {
                    success: false,
                    message: error.message || "Failed to update password. Please try again.",
                };
            }

            return {
                success: true,
                message: "Your password has been successfully updated.",
            };
        } catch (error) {
            logger.error("Error updating password:", error);
            return {
                success: false,
                message: "Failed to update your password. Please try again later.",
            };
        }
    }

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            if (password !== confirmPassword) {
                setState({
                    success: false,
                    message: "Passwords do not match",
                });
                return;
            }

            if (passwordStrength < 3) {
                setState({
                    success: false,
                    message:
                        "Password is too weak. Please use at least 8 characters with uppercase, lowercase, and numbers.",
                });
                return;
            }

            if (!code) {
                setState({
                    success: false,
                    message: "Invalid reset code",
                });
                return;
            }

            const result = await updatePassword(password);
            setState(result);

            if (result.success) {
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        });
    };

    useEffect(() => {
        if (code) {
            supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
                if (error) {
                    logger.error("Code exchange error:", error.message);
                    setState({
                        success: false,
                        message: error?.message || "Invalid or expired reset code. Please request a new one.",
                    });
                }
            });
        }
    }, [code]);

    if (!code || state?.error) {
        return (
            <div className="min-h-screen bg-slate-900 relative overflow-hidden">
                {/* Quantum Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-purple-500/10"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <MainNav />
                <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
                    <div className="relative group">
                        {/* Neon glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                        <Card className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                            <CardContent className="p-8 text-center">
                                <div className="mb-6">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                                        <AlertCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Invalid Reset Link
                                    </h2>
                                </div>

                                <p className="text-slate-300 mb-6">
                                    This password reset link is invalid or has expired. Please request a new one.
                                </p>

                                <Link
                                    href="/forgot-password"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                                >
                                    Request New Reset Link
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            {/* Quantum Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <MainNav />
            <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
                <div className="relative group">
                    {/* Neon glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                    <Card className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                        <CardHeader className="space-y-1 pb-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Set New Password
                            </CardTitle>
                            <p className="text-slate-400 text-center text-sm">
                                Create a strong password for your account
                            </p>
                        </CardHeader>

                        <form action={handleSubmit}>
                            <CardContent className="space-y-6">
                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="New password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-12 focus:border-cyan-500 focus:ring-cyan-500/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {password && (
                                        <div className="space-y-2">
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-colors ${
                                                            i < passwordStrength
                                                                ? strengthColors[passwordStrength - 1]
                                                                : "bg-slate-600"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p
                                                className={`text-xs ${passwordStrength < 3 ? "text-red-400" : passwordStrength < 4 ? "text-yellow-400" : "text-green-400"}`}
                                            >
                                                Password strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-12 focus:border-cyan-500 focus:ring-cyan-500/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Password Match Indicator */}
                                    {confirmPassword && (
                                        <div className="flex items-center space-x-2">
                                            {password === confirmPassword ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                    <span className="text-xs text-green-400">Passwords match</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                                    <span className="text-xs text-red-400">Passwords don't match</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Status Message */}
                                {state?.message && (
                                    <div
                                        className={`p-4 rounded-lg border ${
                                            state.success
                                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                                : "bg-red-500/10 border-red-500/20 text-red-400"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {state.success ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">{state.message}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isPending || passwordStrength < 3 || password !== confirmPassword}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Updating Password...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </Button>

                                {/* Security Notice */}
                                <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <Lock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-slate-300">
                                            <p className="font-medium text-cyan-400 mb-1">Security Requirements:</p>
                                            <ul className="space-y-1 text-xs">
                                                <li>• At least 8 characters long</li>
                                                <li>• Include uppercase and lowercase letters</li>
                                                <li>• Include at least one number</li>
                                                <li>• Special characters recommended</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </form>

                        <CardFooter className="flex justify-center pt-4">
                            <div className="text-sm text-slate-400">
                                <Link
                                    href="/login"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
