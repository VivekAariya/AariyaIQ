import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <Skeleton className="h-10 w-48 bg-slate-700/50 mb-2" />
                            <Skeleton className="h-4 w-64 bg-slate-700/50" />
                        </div>
                        <Skeleton className="h-10 w-32 bg-slate-700/50" />
                    </div>
                </div>

                {/* Profile Overview Card Skeleton */}
                <Card className="mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Profile Picture Skeleton */}
                            <Skeleton className="w-24 h-24 rounded-full bg-slate-700/50" />

                            {/* Profile Info Skeleton */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-48 bg-slate-700/50" />
                                    <Skeleton className="h-6 w-16 bg-slate-700/50 rounded-full" />
                                </div>
                                <Skeleton className="h-5 w-40 bg-slate-700/50" />
                                <div className="flex flex-wrap gap-4">
                                    <Skeleton className="h-4 w-32 bg-slate-700/50" />
                                    <Skeleton className="h-4 w-28 bg-slate-700/50" />
                                    <Skeleton className="h-4 w-36 bg-slate-700/50" />
                                </div>
                            </div>

                            {/* Quick Stats Skeleton */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="text-center space-y-1">
                                        <Skeleton className="h-8 w-12 bg-slate-700/50 mx-auto" />
                                        <Skeleton className="h-3 w-16 bg-slate-700/50 mx-auto" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Skeleton */}
                <div className="space-y-6">
                    <div className="flex space-x-1 bg-slate-800/50 border border-white/10 rounded-lg p-1">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-10 flex-1 bg-slate-700/50" />
                        ))}
                    </div>

                    {/* Content Skeleton */}
                    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10">
                        <CardHeader>
                            <Skeleton className="h-6 w-48 bg-slate-700/50" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-4 w-24 bg-slate-700/50" />
                                        <Skeleton className="h-10 w-full bg-slate-700/50" />
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16 bg-slate-700/50" />
                                <Skeleton className="h-24 w-full bg-slate-700/50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
