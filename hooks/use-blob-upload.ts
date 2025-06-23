"use client";

import logger from "@/utils/logger";
import { upload } from "@vercel/blob/client";
import { useState, useCallback } from "react";

interface UploadOptions {
    folder?: string;
    onProgress?: (progress: number) => void;
    maxSize?: number; // in bytes
}

interface UploadState {
    isUploading: boolean;
    progress: number;
    error: string | null;
    result: any | null;
}

export function useBlobUpload() {
    const [state, setState] = useState<UploadState>({
        isUploading: false,
        progress: 0,
        error: null,
        result: null,
    });

    const uploadFile = useCallback(async (file: File, options: UploadOptions = {}) => {
        const { folder = "uploads", onProgress, maxSize } = options;

        // Reset state
        setState({
            isUploading: true,
            progress: 0,
            error: null,
            result: null,
        });

        try {
            // Check file size if maxSize is specified
            if (maxSize && file.size > maxSize) {
                throw new Error(`File size (${file.size} bytes) exceeds maximum allowed size (${maxSize} bytes)`);
            }

            // For files smaller than 4.5MB, use server upload
            const serverUploadLimit = 4.5 * 1024 * 1024; // 4.5MB
            const bypassServerUpload = serverUploadLimit - 100 * 1024 * 1024; // adds 100MB to the limit

            // always use client uploads
            if (file.size <= bypassServerUpload) {
                logger.info("Using server upload for file:", file.name);

                // // const formData = new FormData();
                // // formData.append("file", file);
                // // formData.append("folder", folder);

                // // const response = await fetch("/api/blob/server-upload", {
                // //     method: "POST",
                // //     body: formData,
                // // });

                // // if (!response.ok) {
                // //     const errorData = await response.json();
                // //     throw new Error(errorData.error || "Upload failed");
                // // }

                // // const result = await response.json();

                // // setState((prev) => ({
                // //     ...prev,
                // //     isUploading: false,
                // //     progress: 100,
                // //     result: {
                // //         url: result.url,
                // //         pathname: result.filename,
                // //         contentType: file.type,
                // //         contentDisposition: `attachment; filename="${file.name}"`,
                // //         size: result.size,
                // //         uploadedAt: new Date(result.uploadedAt),
                // //     },
                // // }));

                // return result;
            } else {
                logger.info("Using client upload for file:", file.name);

                // For larger files, use client upload
                const clientPayload = JSON.stringify({ folder });

                const result = await upload(`${folder}/${file.name}`, file, {
                    access: "public",
                    handleUploadUrl: "/api/blob/upload",
                    clientPayload,
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setState((prev) => ({ ...prev, progress }));
                        onProgress?.(progress);
                    },
                });

                setState((prev) => ({
                    ...prev,
                    isUploading: false,
                    progress: 100,
                    result,
                }));

                return result;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Upload failed";
            setState((prev) => ({
                ...prev,
                isUploading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, []);

    const reset = useCallback(() => {
        setState({
            isUploading: false,
            progress: 0,
            error: null,
            result: null,
        });
    }, []);

    return {
        uploadFile,
        reset,
        ...state,
    };
}
