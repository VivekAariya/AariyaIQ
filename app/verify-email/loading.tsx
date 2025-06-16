import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifyEmailLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.05),transparent_50%)]" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <Card className="w-full max-w-md relative z-10">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600/30">
                        <Skeleton className="h-10 w-10 rounded" />
                    </div>
                    <Skeleton className="h-8 w-48 mx-auto mb-2 bg-gray-700/50" />
                    <Skeleton className="h-5 w-64 mx-auto bg-gray-700/30" />
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-gray-600/20">
                            <Skeleton className="h-6 w-6 mx-auto mb-2 bg-gray-700/50" />
                            <Skeleton className="h-4 w-full mb-1 bg-gray-700/30" />
                            <Skeleton className="h-4 w-3/4 mx-auto bg-gray-700/30" />
                        </div>
                        <Skeleton className="h-4 w-48 mx-auto bg-gray-700/30" />
                    </div>

                    <div className="pt-2 space-y-4">
                        <Skeleton className="h-12 w-full bg-gray-700/50" />
                        <Skeleton className="h-4 w-48 mx-auto bg-gray-700/30" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
