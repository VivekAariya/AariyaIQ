import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function LearnersPage() {
    let learnersData: any[] = [];
    let enrolledCoursesMap = new Map();
    const supabase = await createClient();

    const { data: userData, error: userDataError } = await supabase.auth.getUser();

    if (userDataError || !userData?.user) {
        logger.error("Error fetching user data:", userDataError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged in user</h1>
                    <p className="text-gray-400">{userDataError?.message}</p>
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

    const { data: enrollments, error: enrollmentsError } = await supabaseServiceRoleClient
        .from("enrollments")
        .select("learner_id, course_id, course:courses(course_title)")
        .eq("instructor_id", userData.user.id);

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

        learnersData = users;

        enrollments.forEach((enrollment: any) => {
            const id = enrollment.learner_id;
            const title = enrollment.course?.course_title;

            if (!enrolledCoursesMap.has(id)) {
                enrolledCoursesMap.set(id, []);
            }
            if (title) {
                enrolledCoursesMap.get(id).push(title);
            }
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Learners</h1>
            </div>

            <div className="rounded-md border">
                <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Enrolled Courses</div>
                </div>
                {learnersData.map((learner) => (
                    <div key={learner.id} className="grid grid-cols-3 gap-4 border-t p-4">
                        <div>
                            {learner.first_name} {learner.last_name}
                        </div>
                        <div>{learner.email}</div>
                        <div className="line-clamp-3">{enrolledCoursesMap.get(learner.id)?.join(", ") || "-"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
