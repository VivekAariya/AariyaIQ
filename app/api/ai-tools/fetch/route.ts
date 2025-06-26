import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const toolName = searchParams.get("toolName");
        const toolId = searchParams.get("toolId");

        if (!courseId || !toolName || !toolId) {
            return NextResponse.json(
                {
                    error: "Course ID, tool name and tool ID are required",
                },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseServiceRoleClient
            .from("ai_generated_content")
            .select("*")
            .eq("course_id", courseId)
            .eq("tool_id", toolId)
            .single();

        if (error) {
            logger.error("Error fetching AI content:", error);
            return NextResponse.json({ error: error?.message || "Failed to fetch previous content" }, { status: 500 });
        }

        logger.log("Fetched AI content:", data);

        return NextResponse.json({
            success: true,
            data: data || null,
        });
    } catch (error: any) {
        logger.error("Error in fetch route:", error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
