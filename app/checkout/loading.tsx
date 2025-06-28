import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course Summary Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl sticky top-8">
                            <CardHeader>
                                <Skeleton className="h-6 w-32 bg-gray-700/50" />
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Skeleton className="aspect-video w-full bg-gray-700/50" />
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-full bg-gray-700/50" />
                                    <Skeleton className="h-4 w-24 bg-gray-700/50" />
                                    <div className="flex gap-4">
                                        <Skeleton className="h-4 w-16 bg-gray-700/50" />
                                        <Skeleton className="h-4 w-16 bg-gray-700/50" />
                                    </div>
                                    <Skeleton className="h-6 w-20 bg-gray-700/50" />
                                    <Skeleton className="h-4 w-24 bg-gray-700/50" />
                                    <Skeleton className="h-8 w-32 bg-gray-700/50" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Application Form Skeleton */}
                    <div className="lg:col-span-2">
                        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl">
                            <CardHeader>
                                <Skeleton className="h-8 w-64 bg-gray-700/50" />
                                <Skeleton className="h-4 w-full bg-gray-700/50" />
                            </CardHeader>

                            <CardContent className="space-y-8">
                                {/* Personal Information Section */}
                                <div className="space-y-6">
                                    <Skeleton className="h-6 w-48 bg-gray-700/50" />
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-20 bg-gray-700/50" />
                                            <Skeleton className="h-10 w-full bg-gray-700/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-24 bg-gray-700/50" />
                                            <Skeleton className="h-10 w-full bg-gray-700/50" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-28 bg-gray-700/50" />
                                            <Skeleton className="h-10 w-full bg-gray-700/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32 bg-gray-700/50" />
                                            <Skeleton className="h-10 w-full bg-gray-700/50" />
                                        </div>
                                    </div>
                                </div>

                                {/* Course Motivation Section */}
                                <div className="space-y-6">
                                    <Skeleton className="h-6 w-40 bg-gray-700/50" />
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-64 bg-gray-700/50" />
                                            <Skeleton className="h-24 w-full bg-gray-700/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-56 bg-gray-700/50" />
                                            <Skeleton className="h-24 w-full bg-gray-700/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-48 bg-gray-700/50" />
                                            <Skeleton className="h-24 w-full bg-gray-700/50" />
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Background Section */}
                                <div className="space-y-6">
                                    <Skeleton className="h-6 w-44 bg-gray-700/50" />
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-52 bg-gray-700/50" />
                                            <Skeleton className="h-20 w-full bg-gray-700/50" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-60 bg-gray-700/50" />
                                            <Skeleton className="h-20 w-full bg-gray-700/50" />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6 border-t border-gray-800">
                                    <Skeleton className="h-12 w-full bg-gray-700/50" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
