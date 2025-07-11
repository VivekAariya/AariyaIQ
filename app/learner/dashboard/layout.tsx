import { FloatingAIBtn } from "@/components/floating-ai-btn";
import { Sidebar } from "@/components/learner/sidebar";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type React from "react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        logger.error("Error fetching user data:", error);
        redirect("/");
    }

    if (data?.user?.user_metadata?.role !== "learner") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8">{children}</main>

            <FloatingAIBtn delay={1000} user={data?.user} />
        </div>
    );
}
