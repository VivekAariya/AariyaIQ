import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.05),transparent_50%)]" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <Card className="w-full max-w-md relative z-10 neon-container">
                {/* Neon border elements */}
                <div className="neon-top"></div>
                <div className="neon-right"></div>
                <div className="neon-bottom"></div>
                <div className="neon-left"></div>

                <CardHeader className="text-center relative">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-600/10 animate-pulse"></div>
                        <Mail className="h-10 w-10 text-cyan-400 relative z-10" />
                        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping"></div>
                    </div>

                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        Check Your Email
                    </CardTitle>

                    <CardDescription className="text-gray-300 text-base">
                        We've sent a verification link to your email address
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="text-center space-y-4">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20">
                            <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Please check your email and click the verification link to activate your account.
                            </p>
                        </div>

                        <p className="text-gray-400 text-sm">If you don't see the email, check your spam folder.</p>
                    </div>

                    <div className="pt-2 space-y-4">
                        <Button asChild className="w-full h-12 text-base font-medium">
                            <Link href="/login" className="flex items-center justify-center">
                                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Login
                            </Link>
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-400">Didn't receive an email? </span>
                            <Link
                                href="/learner/signup"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium"
                            >
                                Try signing up again
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
