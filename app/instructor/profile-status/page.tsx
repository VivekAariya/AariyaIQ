import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getInstructorStatus(instructorId: string) {
    const { data, error } = await supabaseServiceRoleClient
        .from("users")
        .select("profile_status, first_name, email")
        .eq("id", instructorId)
        .single();

    if (error || !data?.profile_status) {
        logger.error("Error fetching instructor status:", error);
        redirect("/");
    }

    return {
        status: data?.profile_status,
        name: data?.first_name,
        email: data?.email,
    };
}

export default async function InstructorProfileStatus() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        logger.error("Error fetching user data:", error);
        redirect("/");
    }

    const instructor = await getInstructorStatus(data.user.id);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "pending":
                return {
                    icon: Clock,
                    title: "Profile Under Review",
                    message: "Your instructor profile is currently being reviewed by our admin team.",
                    description:
                        "Please wait while we verify your credentials and qualifications. This process typically takes 2-3 business days. You will receive an email notification once your profile has been approved.",
                    color: "text-yellow-400",
                    bgColor: "bg-yellow-400/10",
                    borderColor: "border-yellow-400/20",
                    buttonText: "Check Back Later",
                    showContactInfo: true,
                };
            case "banned":
                return {
                    icon: XCircle,
                    title: "Profile Banned",
                    message: "Your instructor profile has been banned and you cannot access the dashboard.",
                    description:
                        "Your account has been banned due to violations of our terms of service or community guidelines. This decision is final and cannot be appealed. Please do not contact support regarding this matter.",
                    color: "text-red-400",
                    bgColor: "bg-red-400/10",
                    borderColor: "border-red-400/20",
                    buttonText: "Return to Home",
                    showContactInfo: false,
                };

            default:
                return {
                    icon: CheckCircle,
                    title: "Profile Approved",
                    message: "Congratulations! Your instructor profile has been approved.",
                    description:
                        "You now have full access to the instructor dashboard and can start creating and managing courses.",
                    color: "text-green-400",
                    bgColor: "bg-green-400/10",
                    borderColor: "border-green-400/20",
                    buttonText: "Go to Dashboard",
                    showContactInfo: false,
                };
        }
    };

    const config = getStatusConfig(instructor.status);
    const StatusIcon = config.icon;

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-2xl">
                    {/* Main Status Card */}
                    <Card
                        className={`bg-slate-800/50 backdrop-blur-sm border-slate-700/50 ${config.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10`}
                    >
                        <CardContent className="p-8 text-center">
                            {/* Status Icon */}
                            <div
                                className={`mx-auto w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center mb-6 relative`}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                                <StatusIcon className={`w-10 h-10 ${config.color} relative z-10`} />
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    {config.title}
                                </span>
                            </h1>

                            {/* Main Message */}
                            <p className="text-xl text-gray-300 mb-6">{config.message}</p>

                            {/* Description */}
                            <div className={`${config.bgColor} rounded-lg p-6 mb-8 border ${config.borderColor}`}>
                                <p className="text-gray-300 leading-relaxed">{config.description}</p>
                            </div>

                            {/* Instructor Info */}
                            <div className="bg-slate-700/30 rounded-lg p-4 mb-6 text-left">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Profile Information</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p>
                                        <span className="text-gray-400">Name:</span> {instructor.name}
                                    </p>
                                    <p>
                                        <span className="text-gray-400">Email:</span> {instructor.email}
                                    </p>

                                    <p>
                                        <span className="text-gray-400">Status:</span>
                                        <span
                                            className={`ml-2 px-2 py-1 rounded text-sm ${config.bgColor} ${config.color} border ${config.borderColor}`}
                                        >
                                            {instructor.status.charAt(0).toUpperCase() + instructor.status.slice(1)}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="space-y-4">
                                {/* Additional Actions */}
                                <div className="flex gap-4 justify-center">
                                    {instructor.status === "approved" ? (
                                        <Link href="/instructor/dashboard">
                                            <Button
                                                variant="outline"
                                                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500"
                                            >
                                                Go to Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/">
                                            <Button
                                                variant="outline"
                                                className="border-slate-600 text-gray-300 hover:bg-slate-700"
                                            >
                                                Return to Home
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            {config.showContactInfo && (
                                <div className="mt-8 pt-6 border-t border-slate-700">
                                    <p className="text-sm text-gray-400">
                                        Questions about your application? Contact us at{" "}
                                        <a
                                            href="mailto:hello@aariyatech.co.uk"
                                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            hello@aariyatech.co.uk
                                        </a>
                                    </p>
                                </div>
                            )}

                            {/* No Contact Warning for Banned Users */}
                            {!config.showContactInfo && instructor.status === "banned" && (
                                <div className="mt-8 pt-6 border-t border-red-500/20">
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                        <p className="text-sm text-red-300 font-medium">
                                            ⚠️ Please do not contact support regarding this suspension. This decision is
                                            final.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Additional Info Cards */}
                    {instructor.status === "pending" && (
                        <Card className="mt-6 bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-cyan-400 mb-3">What happens next?</h3>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>Our admin team will review your qualifications and submitted documents</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>You'll receive an email notification with the decision</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p>If approved, you'll gain access to the instructor dashboard</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
