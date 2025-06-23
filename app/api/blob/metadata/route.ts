import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";
import logger from "@/utils/logger";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
        }

        const metadata = await head(url);

        logger.info("Retrieved blob metadata:", { url, size: metadata.size });

        return NextResponse.json(metadata);
    } catch (error) {
        logger.error("Error getting blob metadata:", error);
        return NextResponse.json({ error: "Failed to get file metadata" }, { status: 404 });
    }
}
