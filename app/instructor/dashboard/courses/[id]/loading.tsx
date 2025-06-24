import { Skeleton } from "@/components/ui/skeleton";
import { Edit3, Info, ListChecks, FileText, Brain } from "lucide-react";

export default function EditCourseLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Edit3 className="h-8 w-8 text-cyan-400" />
                        <Skeleton className="h-10 w-72 bg-slate-700" />
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-24 bg-slate-700" />
                        <Skeleton className="h-10 w-32 bg-slate-700" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md p-6 rounded-lg space-y-4">
                            <div className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-cyan-400" />
                                <Skeleton className="h-6 w-40 bg-slate-700" />
                            </div>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-1/3 bg-slate-700" />
                                    <Skeleton className={`h-${i % 2 === 0 ? "10" : "20"} w-full bg-slate-700`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md p-6 rounded-lg space-y-4">
                            <div className="flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-purple-400" />
                                <Skeleton className="h-6 w-40 bg-slate-700" />
                            </div>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-1/3 bg-slate-700" />
                                    <Skeleton className="h-10 w-full bg-slate-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-pink-400" />
                        <Skeleton className="h-6 w-48 bg-slate-700" />
                    </div>
                    <Skeleton className="h-4 w-2/3 bg-slate-700" />
                    <Skeleton className="h-32 w-full bg-slate-700" /> {/* Placeholder for CourseMaterialUploader */}
                </div>

                <div className="bg-gradient-to-r from-purple-600/80 via-indigo-700/80 to-cyan-600/80 border-purple-500 shadow-2xl backdrop-blur-md p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <Brain className="h-7 w-7 text-white" />
                        <Skeleton className="h-8 w-64 bg-slate-200/30" />
                    </div>
                    <Skeleton className="h-4 w-3/4 bg-slate-200/30" />
                    <Skeleton className="h-12 w-full bg-slate-200/30" />
                </div>
            </div>
        </div>
    );
}
