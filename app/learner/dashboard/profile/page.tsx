import ProfilePage from "@/components/learner/profile-page";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { ArrowLeft, Link } from "lucide-react";

export default async function MyProfilePage() {
    const supabase = await createClient();

    const { data: userData, error: userDataError } = await supabase.auth.getUser();

    if (userDataError || !userData?.user) {
        logger.error("Error fetching user data:", userDataError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-0">
                <div className="text-center w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Error fetching logged in user</h1>
                    <p className="text-gray-400 break-words">{userDataError?.message}</p>
                    <Button
                        variant="outline"
                        className="mt-4 w-full sm:w-auto flex justify-center items-center"
                        asChild
                    >
                        <Link href="/instructor/dashboard" className="flex items-center justify-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { data: profile, error: profileError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("id", userData?.user?.id)
        .single();

    if (profileError || !profile) {
        logger.error("Error fetching profile data:", profileError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 sm:px-0">
                <div className="text-center w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Error fetching user profile</h1>
                    <p className="text-gray-400 break-words">{profileError?.message}</p>
                    <Button
                        variant="outline"
                        className="mt-4 w-full sm:w-auto flex justify-center items-center"
                        asChild
                    >
                        <Link href="/instructor/dashboard" className="flex items-center justify-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return <ProfilePage profile={profile} />;
}
