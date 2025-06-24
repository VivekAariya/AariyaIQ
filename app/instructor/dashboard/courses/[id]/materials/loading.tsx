import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Wand2, MessageSquare, Loader2 } from "lucide-react";

export default function CourseMaterialsAILoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Brain className="h-8 w-8 text-cyan-400" />
                        <Skeleton className="h-10 w-80 bg-slate-700" />
                    </div>
                    <Skeleton className="h-10 w-40 bg-slate-700" />
                </div>

                <div className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md p-6 rounded-lg space-y-6">
                    <div className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-cyan-400" />
                        <Skeleton className="h-6 w-56 bg-slate-700" />
                    </div>
                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full bg-slate-700 rounded-lg" />
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
                        <Loader2 className="h-10 w-10 animate-spin text-purple-400 mb-4" />
                        <Skeleton className="h-6 w-1/2 bg-slate-700 mb-2" />
                        <Skeleton className="h-4 w-1/3 bg-slate-700" />
                    </div>
                </div>

                <div className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-slate-400" />
                        <Skeleton className="h-6 w-64 bg-slate-700" />
                    </div>
                    <Skeleton className="h-4 w-full bg-slate-700" />
                    <Skeleton className="h-4 w-5/6 bg-slate-700" />
                    <Skeleton className="h-4 w-full bg-slate-700" />
                </div>
            </div>
        </div>
    );
}
