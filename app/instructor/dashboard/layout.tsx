import { InstructorSidebar } from "@/components/instructor/sidebar";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { redirect } from "next/navigation";
import type React from "react";

export default async function InstructorDashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        logger.error("Error fetching user data:", error);
        redirect("/");
    }

    if (data?.user?.user_metadata?.role !== "instructor") {
        redirect("/");
    }

    // Check profile status
    const { data: profileStatusData, error: profileStatusError } = await supabaseServiceRoleClient
        .from("users")
        .select("profile_status")
        .eq("id", data?.user?.id)
        .single();

    if (profileStatusError || !profileStatusData?.profile_status) {
        logger.error("Error checking profile status:", profileStatusError);
        redirect("/");
    }

    if (profileStatusData?.profile_status === "pending" || profileStatusData?.profile_status === "banned") {
        redirect("/instructor/profile-status");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <InstructorSidebar />
            <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-indigo-900/5 via-purple-800/5 to-cyan-900/5 backdrop-blur-sm relative overflow-hidden border-l border-white/10">
                {/* Subtle neon border effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
                </div>
                <div className="relative z-10">{children}</div>
            </main>
        </div>
    );
}
