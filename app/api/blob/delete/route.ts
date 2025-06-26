import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: userData, error } = await supabase.auth.getUser();

        if (error || !userData?.user) {
            logger.error("User not found", error);
            return NextResponse.json({ error: error?.message }, { status: 404 });
        }

        await del(url);

        logger.info("Blob deleted successfully:", { url });

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Error deleting blob:", error);
        return NextResponse.json({ success: false, error: "Failed to delete file" }, { status: 500 });
    }
}

// Alternative: app/api/blob/delete/route.ts with POST method for body data
export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
            logger.error("User not found", userError);
            return NextResponse.json({ error: userError?.message }, { status: 404 });
        }

        await del(url);

        logger.info("Blob deleted successfully:", { url });

        const { error } = await supabaseServiceRoleClient.from("materials").delete().eq("view_url", url);
        if (error) {
            throw new Error(error.message);
        }

        logger.info("Material deleted from database successfully", { url });

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Error deleting blob:", error);
        return NextResponse.json({ success: false, error: "Failed to delete file" }, { status: 500 });
    }
}
