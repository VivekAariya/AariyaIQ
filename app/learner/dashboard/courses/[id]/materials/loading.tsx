import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddNewCourseLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Quantum Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 p-6 space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 bg-slate-700" />
                        <div>
                            <Skeleton className="h-8 w-64 bg-slate-700" />
                            <Skeleton className="h-4 w-48 bg-slate-700 mt-2" />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Skeleton className="h-10 w-24 bg-slate-700" />
                        <Skeleton className="h-10 w-32 bg-slate-700" />
                        <Skeleton className="h-10 w-36 bg-slate-700" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Basic Information Card Skeleton */}
                    <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 bg-slate-700" />
                            <Skeleton className="h-4 w-64 bg-slate-700" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Skeleton className="h-4 w-24 bg-slate-700 mb-2" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                                <div>
                                    <Skeleton className="h-4 w-20 bg-slate-700 mb-2" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                                <div>
                                    <Skeleton className="h-4 w-28 bg-slate-700 mb-2" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                                <div>
                                    <Skeleton className="h-4 w-16 bg-slate-700 mb-2" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                                <div>
                                    <Skeleton className="h-4 w-32 bg-slate-700 mb-2" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                                <div className="md:col-span-2">
                                    <Skeleton className="h-4 w-32 bg-slate-700 mb-2" />
                                    <Skeleton className="h-16 w-full bg-slate-700" />
                                </div>
                                <div className="md:col-span-2">
                                    <Skeleton className="h-4 w-36 bg-slate-700 mb-2" />
                                    <Skeleton className="h-24 w-full bg-slate-700" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Settings Card Skeleton */}
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-32 bg-slate-700" />
                            <Skeleton className="h-4 w-48 bg-slate-700" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Skeleton className="h-4 w-20 bg-slate-700 mb-2" />
                                <Skeleton className="h-10 w-full bg-slate-700" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-20 bg-slate-700 mb-2" />
                                <Skeleton className="h-10 w-full bg-slate-700" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-32 bg-slate-700" />
                                <Skeleton className="h-6 w-12 bg-slate-700 rounded-full" />
                            </div>
                            <div className="pt-4 border-t border-slate-700">
                                <Skeleton className="h-6 w-20 bg-slate-700" />
                                <Skeleton className="h-3 w-48 bg-slate-700 mt-2" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Contents Card Skeleton */}
                    <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-56 bg-slate-700" />
                            <Skeleton className="h-4 w-72 bg-slate-700" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Skeleton className="h-4 w-32 bg-slate-700 mb-2" />
                                <Skeleton className="h-32 w-full bg-slate-700" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Skeleton className="h-4 w-24 bg-slate-700 mb-2" />
                                    <Skeleton className="h-20 w-full bg-slate-700" />
                                </div>
                                <div>
                                    <Skeleton className="h-4 w-32 bg-slate-700 mb-2" />
                                    <Skeleton className="h-20 w-full bg-slate-700" />
                                </div>
                            </div>
                            <div>
                                <Skeleton className="h-4 w-28 bg-slate-700 mb-2" />
                                <Skeleton className="h-20 w-full bg-slate-700" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Materials Card Skeleton */}
                    <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-36 bg-slate-700" />
                            <Skeleton className="h-4 w-80 bg-slate-700" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full bg-slate-700" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
