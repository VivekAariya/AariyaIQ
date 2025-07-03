import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { AlertTriangle, CheckCircle, Clock, InfoIcon, User, XCircle } from "lucide-react";
import Link from "next/link";

export default async function LearnerApplicationStatusPage() {
    let errorMsg: string | null = null;

    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        errorMsg = userError?.message || "User not authenticated";
        logger.error("Error fetching user:", errorMsg);

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged user</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    const { data: applicationsData, error: applicationsError } = await supabaseServiceRoleClient
        .from("learners_applications")
        .select("id, application_status, created_at, course:course_id(id, course_title, category)")
        .eq("learner_id", userData?.user?.id)
        .order("created_at", { ascending: false });

    if (applicationsError) {
        logger.error("Error fetching applications:", applicationsError);
        errorMsg = applicationsError.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching applications</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "in_review":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "pending_payment":
                return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "payment_completed":
                return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
            case "approved":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "rejected":
                return "bg-red-600/20 text-red-300 border-red-600/30";
            case "waitlisted":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "in_review":
                return <Clock className="h-4 w-4" />;
            case "pending_payment":
                return <XCircle className="h-4 w-4" />;
            case "payment_completed":
                return <CheckCircle className="h-4 w-4" />;
            case "approved":
                return <CheckCircle className="h-4 w-4" />;
            case "rejected":
                return <AlertTriangle className="h-4 w-4" />;
            case "waitlisted":
                return <InfoIcon className="h-4 w-4" />;
            default:
                return <User className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Learner Application Status</h1>
            </div>

            <div className="rounded-md border border-white/20 bg-black/90 backdrop-blur-none overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Application Status</div>
                    <div>Applied Date</div>
                    <div>Actions</div>
                </div>

                {errorMsg ? (
                    <div className="p-4 text-red-500">Error: {errorMsg}</div>
                ) : applicationsData.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">No courses found.</div>
                ) : (
                    applicationsData.map((application: any) => (
                        <div key={application?.id} className="grid grid-cols-5 gap-4 border-t p-4">
                            <div className="truncate">{application?.course?.course_title}</div>
                            <div className="truncate">{application?.course?.category}</div>
                            <div className="truncate">
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(
                                        application.application_status
                                    )}`}
                                >
                                    {getStatusIcon(application.application_status)}
                                    {application?.application_status?.charAt(0).toUpperCase() +
                                        application?.application_status?.slice(1)}
                                </span>
                            </div>
                            <div className="truncate">
                                {new Date(application?.created_at).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {application.application_status === "approved" ? (
                                    <Button variant="outline" size="sm" asChild className="text-xs">
                                        <Link href={`/learner/dashboard/courses/${application?.course?.id}`}>
                                            View Course
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="sm" asChild className="text-xs">
                                        <Link href={`/learner/dashboard/learner-application/${application?.id}`}>
                                            View Application
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
