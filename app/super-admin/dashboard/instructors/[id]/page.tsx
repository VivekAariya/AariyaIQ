import { InstructorProfileClient } from "@/components/super-admin/instructor-profile-client";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface InstructorProfileProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: any;
    };
}

export default async function InstructorProfilePage({ params, searchParams }: InstructorProfileProps) {
    let errorMsg = null;

    const { data: instructor, error } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {
        logger.error("Error fetching instructors:", error);
        errorMsg = error.message || "Unknown error";

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error Fetching Instructor</h1>
                    <p className="text-gray-400">{errorMsg}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/admins">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Admins
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (!instructor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Instructor Not Found</h1>
                    <p className="text-gray-400">{errorMsg || "The requested instructor profile does not exist."}</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/super-admin/dashboard/admins">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Admins
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return <InstructorProfileClient instructor={instructor} />;
}
