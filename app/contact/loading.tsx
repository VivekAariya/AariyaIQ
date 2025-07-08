import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <Skeleton className="h-8 w-32 mx-auto mb-6 bg-slate-700/50" />
                    <Skeleton className="h-16 w-96 mx-auto mb-6 bg-slate-700/50" />
                    <Skeleton className="h-6 w-full max-w-3xl mx-auto bg-slate-700/50" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Form Skeleton */}
                    <div className="lg:col-span-2">
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-8 w-64 bg-slate-700/50" />
                                <Skeleton className="h-4 w-full bg-slate-700/50" />
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                    <Skeleton className="h-10 w-full bg-slate-700/50" />
                                </div>
                                <Skeleton className="h-32 w-full bg-slate-700/50" />
                                <Skeleton className="h-12 w-full bg-slate-700/50" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-6">
                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-6 w-32 bg-slate-700/50" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-start gap-3 p-3">
                                        <Skeleton className="h-5 w-5 bg-slate-700/50" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-24 bg-slate-700/50" />
                                            <Skeleton className="h-3 w-32 bg-slate-700/50" />
                                            <Skeleton className="h-3 w-28 bg-slate-700/50" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                            <CardHeader>
                                <Skeleton className="h-6 w-40 bg-slate-700/50" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-start gap-3 p-3">
                                        <Skeleton className="h-5 w-5 bg-slate-700/50" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-32 bg-slate-700/50" />
                                            <Skeleton className="h-3 w-full bg-slate-700/50" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
