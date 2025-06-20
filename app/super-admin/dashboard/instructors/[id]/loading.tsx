import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InstructorProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Quantum Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 space-y-6 p-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-9 w-32 bg-white/10" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64 bg-white/10" />
                            <Skeleton className="h-4 w-48 bg-white/10" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-32 bg-white/10" />
                </div>

                {/* Profile Overview Card Skeleton */}
                <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                            <Skeleton className="w-24 h-24 rounded-full bg-white/10" />
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-8 w-48 bg-white/10" />
                                    <Skeleton className="h-6 w-20 bg-white/10" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-32 bg-white/10" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Skeleton */}
                <div className="space-y-6">
                    <div className="flex space-x-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-24 bg-white/10" />
                        ))}
                    </div>

                    {/* Content Cards Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Card key={i} className="bg-black/40 border-white/20 backdrop-blur-sm">
                                <CardHeader>
                                    <Skeleton className="h-6 w-40 bg-white/10" />
                                    <Skeleton className="h-4 w-64 bg-white/10" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <div key={j} className="space-y-2">
                                            <Skeleton className="h-4 w-24 bg-white/10" />
                                            <Skeleton className="h-10 w-full bg-white/10" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
