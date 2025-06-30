import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { Clock } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the client component
const CheckoutForm = dynamic(() => import("@/components/checkout-form"), { ssr: false });

export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const courseId = searchParams.courseId;

    const { data: courseData, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    if (courseError) {
        logger.error("Error fetching course:", courseError);

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching course</h1>
                    <p className="text-gray-400">{courseError.message || "Unknown error"}</p>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Quantum Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="bg-black/40 backdrop-blur-xl border border-gray-800/50 shadow-2xl sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Course Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="aspect-video rounded-lg overflow-hidden">
                                    <img
                                        src={courseData.course_image}
                                        alt={courseData.course_title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">{courseData.course_title}</h3>

                                    <div className="space-y-2 mb-4">
                                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                                            {courseData.level}
                                        </Badge>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{courseData.duration}</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-white">{formatPrice(courseData.price)}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <CheckoutForm courseData={courseData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
