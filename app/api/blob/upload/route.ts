import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = (await request.json()) as HandleUploadBody;

        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname: string, clientPayload: string | null, multipart: boolean) => {
                // ⚠️ Authenticate and authorize users before generating the token
                // Otherwise, you're allowing anonymous uploads
                const supabase = await createClient();
                const { data: userData, error } = await supabase.auth.getUser();

                if (error || !userData?.user) {
                    logger.error("User not found", error);
                    throw new Error("User not found");
                }

                // Parse client payload to get folder preference
                const payload = clientPayload ? JSON.parse(clientPayload) : {};
                const folder = payload.folder || "uploads";

                return {
                    allowedContentTypes: ["application/pdf"],
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({
                        folder,
                        uploadedAt: new Date().toISOString(),
                        // Add user info if authenticated
                        userId: userData?.user?.id,
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                logger.info("Blob upload completed:", {
                    url: blob.url,
                    pathname: blob.pathname,
                    tokenPayload,
                });

                try {
                    // Parse token payload
                    const payload = tokenPayload ? JSON.parse(tokenPayload) : {};

                    // Run any logic after file upload completed
                    // Examples:
                    // - Update database with file URL
                    // - Send notification
                    // - Process the file

                    // const { userId, folder } = payload;
                    // await db.files.create({
                    //   url: blob.url,
                    //   size: blob.size,
                    //   folder,
                    //   userId,
                    //   uploadedAt: new Date(payload.uploadedAt)
                    // });
                } catch (error) {
                    logger.error("Error in onUploadCompleted:", error);
                    throw new Error("Could not process upload completion");
                }
            },
        });

        logger.info("Blob upload response:", jsonResponse);

        return NextResponse.json(jsonResponse);
    } catch (error) {
        logger.error("Error in blob upload handler:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
