import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const prefix = searchParams.get("prefix") || "uploads/";
        const limit = parseInt(searchParams.get("limit") || "1000");
        const cursor = searchParams.get("cursor") || undefined;

        const supabase = await createClient();
        const { data: userData, error } = await supabase.auth.getUser();

        if (error || !userData?.user) {
            logger.error("User not found", error);
            return NextResponse.json({ error: error?.message }, { status: 404 });
        }

        const result = await list({
            prefix,
            limit,
            cursor,
            // mode: "folded",
        });

        logger.info("Listed blobs:", {
            prefix,
            count: result.blobs.length,
            hasMore: result.hasMore,
        });

        return NextResponse.json({
            blobs: result.blobs,
            hasMore: result.hasMore,
            cursor: result.cursor,
        });
    } catch (error) {
        logger.error("Error listing blobs:", error);
        return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
}
