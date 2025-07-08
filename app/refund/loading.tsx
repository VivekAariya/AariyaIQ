import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { QuantumBackground } from "@/components/quantum-background";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

export default function RefundPolicyLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <QuantumBackground />

            <div className="relative z-10">
                <MainNav />

                <main className="container mx-auto px-4 py-12 max-w-4xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <RefreshCw className="h-8 w-8 text-cyan-400" />
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                                Refund Policy
                            </Badge>
                        </div>
                        <Skeleton className="h-12 w-80 mx-auto mb-4 bg-slate-700/50" />
                        <Skeleton className="h-6 w-96 mx-auto mb-6 bg-slate-700/50" />
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <Skeleton className="h-4 w-32 bg-slate-700/50" />
                            <div className="h-4 w-px bg-slate-600" />
                            <Skeleton className="h-4 w-32 bg-slate-700/50" />
                        </div>
                    </div>

                    {/* Back Navigation */}
                    <div className="mb-8">
                        <Skeleton className="h-10 w-32 bg-slate-700/50" />
                    </div>

                    {/* Main Content */}
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-8">
                            {/* Loading Sections */}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((section) => (
                                <div key={section} className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Skeleton className="h-6 w-6 bg-slate-700/50" />
                                        <Skeleton className="h-8 w-64 bg-slate-700/50" />
                                    </div>
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full bg-slate-700/50" />
                                        <Skeleton className="h-4 w-5/6 bg-slate-700/50" />
                                        <Skeleton className="h-4 w-4/5 bg-slate-700/50" />
                                    </div>
                                    {section === 3 && (
                                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                                            <Skeleton className="h-32 bg-slate-700/50" />
                                            <Skeleton className="h-32 bg-slate-700/50" />
                                        </div>
                                    )}
                                    {section === 4 && (
                                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                                            {[1, 2, 3, 4].map((step) => (
                                                <Skeleton key={step} className="h-24 bg-slate-700/50" />
                                            ))}
                                        </div>
                                    )}
                                    {section === 6 && (
                                        <div className="grid gap-4 md:grid-cols-3 mt-4">
                                            {[1, 2, 3].map((item) => (
                                                <Skeleton key={item} className="h-32 bg-slate-700/50" />
                                            ))}
                                        </div>
                                    )}
                                    {section < 8 && <div className="h-px bg-slate-700/50 my-8" />}
                                </div>
                            ))}

                            {/* Footer Note */}
                            <div className="mt-12 pt-8 border-t border-slate-700/50">
                                <div className="text-center space-y-2">
                                    <Skeleton className="h-4 w-96 mx-auto bg-slate-700/50" />
                                    <Skeleton className="h-4 w-64 mx-auto bg-slate-700/50" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>

                <Footer />
            </div>
        </div>
    );
}
