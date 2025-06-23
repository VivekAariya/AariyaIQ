import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import logger from "@/utils/logger";

/**
 * Server-side upload route for files smaller than 4.5MB
 * or when you need server-side processing
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = (formData.get("folder") as string) || "uploads";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Check file size (4.5MB limit for server uploads)
        const maxSize = 4.5 * 1024 * 1024; // 4.5MB in bytes
        if (file.size > maxSize) {
            return NextResponse.json(
                {
                    error: "File too large for server upload. Use client upload for files > 4.5MB",
                    maxSize,
                    fileSize: file.size,
                },
                { status: 413 }
            );
        }

        // Generate unique filename
        const fileExtension = file.name.split(".").pop() || "";
        const uniqueFilename = `${folder}/${nanoid()}.${fileExtension}`;

        // Upload to Vercel Blob
        const blob = await put(uniqueFilename, file, {
            access: "public",
            addRandomSuffix: false,
        });

        const response = {
            url: blob.url,
            size: blob.size,
            uploadedAt: new Date(),
            filename: uniqueFilename,
        };

        logger.info("Server upload completed:", response);

        return NextResponse.json(response);
    } catch (error) {
        logger.error("Error in server upload:", error);
        return NextResponse.json({ error: "Failed to upload file. Please try again." }, { status: 500 });
    }
}
