import { Footer } from "@/components/footer";
import { RegistrationStatusIndicator } from "@/components/super-admin/registration-status-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { AlertTriangle, CheckCircle, FileText, Loader2 } from "lucide-react";
import Link from "next/link";

export default async function LearnerApplication({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const { data: application, error: applicationError } = await supabaseServiceRoleClient
        .from("learners_applications")
        .select("*, course:courses(id, course_title, category)")
        .eq("id", params.id)
        .single();

    if (applicationError) {
        logger.error("Error fetching application:", applicationError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{applicationError?.message || "Something went wrong"}</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    const getStepStatuses = () => {
        const statusOrder = ["in_review", "pending_payment", "payment_completed", "approved"];
        const currentIdx = statusOrder.indexOf(application?.application_status);

        const steps = statusOrder.map((status, idx) => {
            if (idx === 0) return "completed";
            if (idx < currentIdx) return "completed";
            if (idx === currentIdx) return "current";
            return "upcoming";
        });
        steps.push(application?.application_status === "approved" ? "current" : "upcoming");
        return steps as ("completed" | "current" | "upcoming" | "error")[];
    };

    const stepStatuses = getStepStatuses();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_350px] lg:gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Learner Application Status</h1>
                                <p className="text-muted-foreground">Track your application progress</p>
                            </div>
                            <Button variant="outline" size="sm" asChild className="text-xs">
                                <Link href={`/learner/dashboard/learner-application/`}>Back</Link>
                            </Button>
                        </div>

                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Learner Application</CardTitle>
                                <CardDescription>
                                    Application submitted on{" "}
                                    {new Date(application?.created_at).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="status">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="status">Status</TabsTrigger>
                                        <TabsTrigger value="application_details">Application Details</TabsTrigger>
                                        <TabsTrigger value="messages">Messages</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="status" className="space-y-4 pt-4">
                                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                            <h3 className="text-lg font-semibold mb-4">Application Progress</h3>
                                            <RegistrationStatusIndicator
                                                steps={(() => {
                                                    if (application?.application_status === "approved") {
                                                        return [
                                                            { id: 2, name: "Initial Review", status: "completed" },
                                                            { id: 3, name: "Payment", status: "completed" },
                                                            { id: 4, name: "Compliance Check", status: "completed" },
                                                            { id: 5, name: "Final Approval", status: "completed" },
                                                        ];
                                                    }
                                                    return [
                                                        { id: 2, name: "Initial Review", status: stepStatuses[0] },
                                                        { id: 3, name: "Payment", status: stepStatuses[1] },
                                                        { id: 4, name: "Compliance Check", status: stepStatuses[2] },
                                                        { id: 5, name: "Final Approval", status: stepStatuses[3] },
                                                    ];
                                                })()}
                                            />
                                        </div>

                                        {application?.application_status === "pending_payment" && (
                                            <div className="bg-yellow-900/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30 flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-medium text-yellow-500">Payment Required</h4>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        Your application has been initially approved. Please check your
                                                        email for payment instructions. Once payment is confirmed, your
                                                        application will proceed to the compliance check.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {application?.application_status === "payment_completed" && (
                                            <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 flex items-start gap-3">
                                                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-medium text-blue-500">
                                                        Payment Check in Progress
                                                    </h4>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        Your payment has been confirmed. We are now conducting a
                                                        compliance check. This typically takes 2-3 business days.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {application?.application_status === "approved" && (
                                            <div className="bg-green-900/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-medium text-green-500">Application Approved</h4>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        Congratulations! Your learner application has been approved. You
                                                        can now access the learner dashboard and start your learning
                                                        journey.
                                                    </p>
                                                    <Button className="mt-3 bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white">
                                                        <Link
                                                            href={`/learner/dashboard/courses/${application?.course?.id}`}
                                                        >
                                                            Access Learner Dashboard
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="application_details" className="space-y-4 pt-4">
                                        {/* Contact Information */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Contact Information</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Name:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {application?.full_name || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Email:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {application?.email_address || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Phone:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {application?.phone_number || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Current Profession:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {application?.current_profession || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-400">Experience:</span>
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {application?.years_experience || "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Course Motivation */}
                                        <div>
                                            <h3 className="text-sm font-normal underline text-gray-400">
                                                Course Motivation
                                            </h3>
                                            <div className="mt-1 space-y-4">
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        Why do you want to take this course?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.course_motivation || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What are your specific learning goals?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.learning_goals || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What do you expect from this course?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.course_expectations || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What's your preferred learning timeline?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.preferred_timeline || "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Technical Background */}
                                        <div>
                                            <h3 className="text-sm font-normal underline text-gray-400">
                                                Technical Background
                                            </h3>
                                            <div className="mt-1 space-y-4">
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What are your current technical skills?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.current_technical_skills || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What challenges are you currently facing?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.current_challenges || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        Do you have any specific projects in mind?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.specific_projects || "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Learning Preferences */}
                                        <div>
                                            <h3 className="text-sm font-normal underline text-gray-400">
                                                Learning Preferences
                                            </h3>
                                            <div className="mt-1 space-y-4">
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        What's your preferred learning style?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.preferred_learning_style || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        How much time can you dedicate per week?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.weekly_time_commitment || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        Have you taken similar courses before?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.previous_courses_details || "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Information */}
                                        <div>
                                            <h3 className="text-sm font-normal underline text-gray-400">
                                                Additional Information
                                            </h3>
                                            <div className="mt-1 space-y-4">
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        Any specific topics you're most excited about?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.excited_topics || "-"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block text-sm font-normal text-gray-300">
                                                        How will you measure success in this course?
                                                    </span>
                                                    <span className="block text-sm text-gray-400 font-medium">
                                                        {application?.success_metrics || "-"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Promo Code */}
                                        <div>
                                            <h3 className="text-sm font-medium text-pink-400">Promo Code</h3>
                                            <div className="mt-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-pink-400 font-medium">
                                                        {application?.promo_code || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="messages" className="space-y-4 pt-4">
                                        {/* <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold">Messages</h3>
                                                <Button variant="outline" size="sm">
                                                    Refresh
                                                </Button>
                                            </div>

                                            {currentStatus === "review" && (
                                                <div className="text-center py-8">
                                                    <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                                                    <p className="text-gray-400">No messages yet</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Messages related to your application will appear here
                                                    </p>
                                                </div>
                                            )}

                                            {currentStatus !== "review" && (
                                                <div className="space-y-4">
                                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium">AariyaIQ Admin</span>
                                                            <span className="text-xs text-gray-500">
                                                                {new Date().toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-300">
                                                            Your learner application has been initially approved. Please
                                                            check your email for payment instructions.
                                                        </p>
                                                    </div>

                                                    {currentStatus === "compliance" && (
                                                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium">
                                                                    AariyaIQ Admin
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {new Date().toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-300">
                                                                Thank you for your payment. Your application is now
                                                                undergoing a compliance check. We'll notify you once
                                                                this process is complete.
                                                            </p>
                                                        </div>
                                                    )}

                                                    {currentStatus === "approved" && (
                                                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium">
                                                                    AariyaIQ Admin
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {new Date().toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-300">
                                                                Congratulations! Your learner application has been fully
                                                                approved. You can now access the learner dashboard and
                                                                start your learning journey.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div> */}
                                        <div className="flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                                                    Coming Soon
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    We're working hard to bring you this feature. Stay tuned!
                                                </p>
                                                <div className="flex items-center justify-center mt-4">
                                                    <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {(() => {
                                    const statusOrder = [
                                        "in_review",
                                        "pending_payment",
                                        "payment_completed",
                                        "approved",
                                    ];
                                    const currentIdx = statusOrder.indexOf(application?.application_status);
                                    const steps = [
                                        {
                                            label: "Complete Application",
                                            desc: "Submit your learner application with all required information",
                                        },
                                        {
                                            label: "Complete Payment",
                                            desc: "Pay the learner registration fee",
                                        },
                                        {
                                            label: "Access Learner Dashboard",
                                            desc: "Once approved, access your learner dashboard",
                                        },
                                        {
                                            label: "Start Your Learning Journey",
                                            desc: "Begin exploring courses and learning materials",
                                        },
                                    ];
                                    return (
                                        <div className="space-y-4">
                                            {steps.map((step, idx) => {
                                                let circleClass = "bg-gray-800 text-gray-500";
                                                let icon: any = idx + 1;
                                                let textClass = "text-gray-400";

                                                if (idx === 0) {
                                                    circleClass = "bg-green-500/20 text-green-500";
                                                    icon = <CheckCircle />;
                                                    textClass = "text-green-500";
                                                } else if (idx < currentIdx) {
                                                    circleClass = "bg-green-500/20 text-green-500";
                                                    icon = <CheckCircle />;
                                                    textClass = "text-green-500";
                                                } else if (idx === currentIdx) {
                                                    // Current step
                                                    circleClass = "bg-yellow-500/20 text-yellow-500 animate-pulse";
                                                    icon = idx + 1;
                                                    textClass = "text-yellow-500";
                                                }
                                                return (
                                                    <div className="flex items-start gap-3" key={step.label}>
                                                        <div
                                                            className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${circleClass}`}
                                                        >
                                                            <span className="text-sm">{icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-medium ${textClass}`}>
                                                                {step.label}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Application Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {(() => {
                                        const timelineSteps = [
                                            { label: "Application Submitted" },
                                            { label: "Initial Review Completed" },
                                            { label: "Payment Confirmed" },
                                            { label: "Final Approval Granted" },
                                        ];
                                        const statusOrder = [
                                            "in_review",
                                            "pending_payment",
                                            "payment_completed",
                                            "approved",
                                        ];
                                        let currentIdx = statusOrder.indexOf(application?.application_status);
                                        if (application?.application_status === "approved") {
                                            currentIdx = timelineSteps.length - 1;
                                        }
                                        return timelineSteps.map((step, idx) =>
                                            idx <= currentIdx ? (
                                                <div className="flex items-start gap-3" key={step.label}>
                                                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                                                    <div>
                                                        <p className="text-sm font-medium">{step.label}</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        );
                                    })()}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-white/20 dark:border-white/10">
                            <CardHeader>
                                <CardTitle>Learner Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Access to premium courses and learning materials</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Personalized learning paths and recommendations</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Connect with industry professionals</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                        <p className="text-sm">Earn certificates and build your portfolio</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
