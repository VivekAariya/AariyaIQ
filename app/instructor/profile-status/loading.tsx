import { QuantumBackground } from "@/components/quantum-background";

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <QuantumBackground />

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-2xl">
                    {/* Main Card Skeleton */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
                        {/* Icon Skeleton */}
                        <div className="mx-auto w-20 h-20 rounded-full bg-slate-700/50 animate-pulse mb-6"></div>

                        {/* Title Skeleton */}
                        <div className="h-8 bg-slate-700/50 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>

                        {/* Message Skeleton */}
                        <div className="h-6 bg-slate-700/50 rounded-lg animate-pulse mb-6 max-w-lg mx-auto"></div>

                        {/* Description Box Skeleton */}
                        <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse"></div>
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse w-1/2"></div>
                            </div>
                        </div>

                        {/* Info Box Skeleton */}
                        <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                            <div className="h-5 bg-slate-600/50 rounded animate-pulse mb-3 w-1/3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse"></div>
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse w-2/3"></div>
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse w-1/2"></div>
                                <div className="h-4 bg-slate-600/50 rounded animate-pulse w-1/4"></div>
                            </div>
                        </div>

                        {/* Button Skeletons */}
                        <div className="space-y-4">
                            <div className="h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg animate-pulse"></div>
                            <div className="flex gap-4 justify-center">
                                <div className="h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
                                <div className="h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
