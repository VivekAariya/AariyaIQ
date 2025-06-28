import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Back Navigation Skeleton */}
                <div className="mb-6">
                    <Skeleton className="h-6 w-32 bg-slate-700/50" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Header Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardContent className="p-6">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Skeleton className="h-6 w-20 bg-slate-700/50" />
                                    <Skeleton className="h-6 w-32 bg-slate-700/50" />
                                    <Skeleton className="h-6 w-24 bg-slate-700/50" />
                                </div>

                                <Skeleton className="h-10 w-full mb-4 bg-slate-700/50" />
                                <Skeleton className="h-6 w-full mb-2 bg-slate-700/50" />
                                <Skeleton className="h-6 w-3/4 mb-6 bg-slate-700/50" />

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-full bg-slate-700/50" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Image Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <Skeleton className="aspect-video w-full bg-slate-700/50" />
                        </Card>

                        {/* Course Description Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-7 w-48 bg-slate-700/50" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full bg-slate-700/50" />
                                    ))}
                                    <Skeleton className="h-4 w-2/3 bg-slate-700/50" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Contents Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-7 w-40 bg-slate-700/50" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="border border-slate-700/50 rounded-lg p-4">
                                            <Skeleton className="h-6 w-48 mb-3 bg-slate-700/50" />
                                            <div className="space-y-2">
                                                {Array.from({ length: 4 }).map((_, j) => (
                                                    <Skeleton key={j} className="h-4 w-full bg-slate-700/50" />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">
                        {/* Purchase Card Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <Skeleton className="h-10 w-32 mx-auto mb-2 bg-slate-700/50" />
                                    <Skeleton className="h-4 w-24 mx-auto bg-slate-700/50" />
                                </div>

                                <div className="space-y-3 mb-6">
                                    <Skeleton className="h-12 w-full bg-slate-700/50" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-10 flex-1 bg-slate-700/50" />
                                        <Skeleton className="h-10 w-10 bg-slate-700/50" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Skeleton key={i} className="h-5 w-full bg-slate-700/50" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Instructor Card Skeleton */}
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-6 w-32 bg-slate-700/50" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <Skeleton className="w-15 h-15 rounded-full bg-slate-700/50" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-32 bg-slate-700/50" />
                                        <Skeleton className="h-4 w-40 bg-slate-700/50" />
                                        <div className="space-y-2">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} className="h-4 w-full bg-slate-700/50" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
