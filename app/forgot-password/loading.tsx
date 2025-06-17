import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { QuantumBackground } from "@/components/quantum-background";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForgotPasswordLoading() {
    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <QuantumBackground />

            <div className="relative z-10 flex min-h-screen flex-col">
                <MainNav />

                <main className="flex-1 flex items-center justify-center py-12 px-4">
                    <div className="w-full max-w-md">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-25 animate-pulse"></div>

                            <Card className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                                <CardHeader className="space-y-4 text-center">
                                    <Skeleton className="mx-auto w-16 h-16 rounded-full bg-slate-700" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-48 mx-auto bg-slate-700" />
                                        <Skeleton className="h-4 w-64 mx-auto bg-slate-700" />
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <Skeleton className="h-12 w-full bg-slate-700" />
                                    <Skeleton className="h-12 w-full bg-slate-700" />
                                    <Skeleton className="h-8 w-full bg-slate-700" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
