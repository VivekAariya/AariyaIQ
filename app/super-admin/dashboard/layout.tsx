import { SuperAdminSidebar } from "@/components/super-admin/sidebar";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";

export default async function SuperAdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        logger.error("Error fetching user data:", error);
        redirect("/");
    }

    // Check if user is super admin
    if (data?.user?.user_metadata?.role !== "super-admin") {
        logger.error("Unauthorized access attempt by user:", data.user.id);
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <SuperAdminSidebar />
            <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-purple-900/5 via-indigo-800/5 to-cyan-900/5 backdrop-blur-sm relative overflow-hidden border-l border-white/10">
                {/* Subtle neon border effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
                </div>
                <div className="relative z-10">{children}</div>
            </main>
        </div>
    );
}
