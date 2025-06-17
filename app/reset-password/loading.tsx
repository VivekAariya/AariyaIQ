import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function ResetPasswordLoading() {
    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            {/* Quantum Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header Skeleton */}
            <div className="h-16 w-full bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50"></div>

            <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-8rem)]">
                <div className="relative group">
                    {/* Neon glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-50 animate-pulse"></div>

                    <Card className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                        <CardHeader className="space-y-1 pb-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center animate-pulse">
                                    <Lock className="w-8 h-8 text-slate-400" />
                                </div>
                            </div>
                            <div className="h-8 w-48 bg-slate-700 rounded animate-pulse mx-auto"></div>
                            <div className="h-4 w-64 bg-slate-700 rounded animate-pulse mx-auto"></div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Password Field Skeleton */}
                            <div className="space-y-2">
                                <div className="h-10 w-full bg-slate-700 rounded animate-pulse"></div>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-1 flex-1 bg-slate-600 rounded-full animate-pulse"
                                        ></div>
                                    ))}
                                </div>
                                <div className="h-3 w-32 bg-slate-700 rounded animate-pulse"></div>
                            </div>

                            {/* Confirm Password Field Skeleton */}
                            <div className="space-y-2">
                                <div className="h-10 w-full bg-slate-700 rounded animate-pulse"></div>
                                <div className="h-4 w-40 bg-slate-700 rounded animate-pulse"></div>
                            </div>

                            {/* Button Skeleton */}
                            <div className="h-12 w-full bg-gradient-to-r from-slate-600 to-slate-700 rounded animate-pulse"></div>

                            {/* Security Notice Skeleton */}
                            <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-5 h-5 bg-slate-600 rounded animate-pulse mt-0.5 flex-shrink-0"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-slate-600 rounded animate-pulse"></div>
                                        <div className="space-y-1">
                                            <div className="h-3 w-40 bg-slate-600 rounded animate-pulse"></div>
                                            <div className="h-3 w-48 bg-slate-600 rounded animate-pulse"></div>
                                            <div className="h-3 w-36 bg-slate-600 rounded animate-pulse"></div>
                                            <div className="h-3 w-44 bg-slate-600 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <div className="flex justify-center pt-4 pb-6">
                            <div className="h-4 w-24 bg-slate-700 rounded animate-pulse"></div>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Footer Skeleton */}
            <div className="h-16 w-full bg-slate-800/80 backdrop-blur-md border-t border-slate-700/50"></div>
        </div>
    );
}
