import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CourseLearners({ params }: { params: { id: string } }) {
    let learnersData: any[] = [];

    const { data: enrollments, error: enrollmentsError } = await supabaseServiceRoleClient
        .from("enrollments")
        .select("id, learner_id, enrollment_date")
        .eq("course_id", params.id);

    if (enrollmentsError) {
        logger.error("Error fetching learners:", enrollmentsError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Enrollments</h1>
                    <p className="text-gray-400">{enrollmentsError.message}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/instructor/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (enrollments) {
        const learnerIds = enrollments.map((learner) => learner.learner_id);

        const { data: users, error: usersError } = await supabaseServiceRoleClient
            .from("users")
            .select("id, first_name, last_name, email")
            .in("id", learnerIds)
            .order("created_at", { ascending: false });

        if (usersError) {
            logger.error("Error fetching users:", usersError);
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Error Fetching Users</h1>
                        <p className="text-gray-400">{usersError.message}</p>
                        <Button variant="outline" className="mt-4" asChild>
                            <Link href="/instructor/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            );
        }

        learnersData = users.map((learner) => {
            return {
                id: learner.id,
                first_name: learner.first_name,
                last_name: learner.last_name,
                email: learner.email,
                enrollment_date: enrollments.find((enrollment) => enrollment.learner_id === learner.id)
                    ?.enrollment_date,
            };
        });
    }

    logger.log("learnersData", learnersData);

    return (
        <div className="space-y-6">
            <div className="max-md:mt-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Course Learners</h1>
            </div>

            <div className="rounded-md border overflow-x-auto">
                <div className="min-w-[500px]">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Enrollment Date</div>
                    </div>
                    {learnersData.map((learner) => (
                        <div key={learner.id} className="grid grid-cols-3 gap-4 border-t p-4 text-sm md:text-base">
                            <div className="break-words max-w-[180px]">
                                {learner.first_name} {learner.last_name}
                            </div>
                            <div className="break-all max-w-[220px]">{learner.email}</div>
                            <div className="whitespace-nowrap">
                                {new Date(learner.enrollment_date).toLocaleString("en-GB", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
