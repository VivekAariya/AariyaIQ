import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-64 bg-slate-700" />
                    <Skeleton className="h-5 w-80 mt-2 bg-slate-700" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32 bg-slate-700" />
                    <Skeleton className="h-10 w-36 bg-slate-700" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column Skeleton */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <Skeleton className="h-48 w-full rounded-t-lg bg-slate-700" />
                            <Skeleton className="h-8 w-3/4 mt-4 bg-slate-700" />
                            <Skeleton className="h-5 w-1/2 mt-2 bg-slate-700" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-1/4 bg-slate-700" />
                                <Skeleton className="h-5 w-1/3 bg-slate-700" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-1/4 bg-slate-700" />
                                <Skeleton className="h-5 w-1/4 bg-slate-700" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-1/3 bg-slate-700" />
                                <Skeleton className="h-5 w-1/4 bg-slate-700" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-1/3 bg-slate-700" />
                                <Skeleton className="h-5 w-1/3 bg-slate-700" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column Skeleton */}
                <div className="lg:col-span-2">
                    <div className="w-full">
                        <div className="grid w-full grid-cols-3 h-10 rounded-md bg-slate-800/50 border border-slate-700 p-1">
                            <Skeleton className="h-full w-full bg-slate-700 rounded-sm" />
                            <Skeleton className="h-full w-full bg-transparent" />
                            <Skeleton className="h-full w-full bg-transparent" />
                        </div>
                        <Card className="bg-slate-800/50 border-slate-700 mt-4">
                            <CardContent className="pt-6 space-y-4">
                                <Skeleton className="h-6 w-1/4 bg-slate-700" />
                                <Skeleton className="h-10 w-full bg-slate-700" />
                                <Skeleton className="h-6 w-1/4 bg-slate-700" />
                                <Skeleton className="h-20 w-full bg-slate-700" />
                                <Skeleton className="h-6 w-1/4 bg-slate-700" />
                                <Skeleton className="h-32 w-full bg-slate-700" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
