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

    const { data: profile, error: profileError } = await supabaseServiceRoleClient
        .from("users")
        .select("*")
        .eq("id", userData?.user?.id)
        .single();

    if (profileError || !profile) {
        logger.error("Error fetching profile data:", profileError);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching user profile</h1>
                    <p className="text-gray-400">{profileError?.message}</p>
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

    return <ProfilePage profile={profile} />;
}
