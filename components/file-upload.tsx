"use client";

import { useBlobUpload } from "@/hooks/use-blob-upload";
import React, { useRef, useState } from "react";

interface FileUploadProps {
    folder?: string;
    maxSize: number;
    acceptedTypes?: string[];
    onUploadComplete?: (result: any) => void;
    onUploadError?: (error: string) => void;
}

export function FileUploadNew({
    folder = "uploads",
    maxSize,
    acceptedTypes,
    onUploadComplete,
    onUploadError,
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const { uploadFile, isUploading, progress, error, result, reset } = useBlobUpload();

    const handleFileSelect = async (file: File) => {
        try {
            if (acceptedTypes && !acceptedTypes.includes(file.type)) {
                throw new Error(`File type ${file.type} not allowed`);
            }

            if (file.size > maxSize) {
                throw new Error(
                    `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed size (${(maxSize / (1024 * 1024)).toFixed(1)} MB)`
                );
            }

            const uploadResult = await uploadFile(file, {
                folder,
                maxSize,
                onProgress: (prog) => console.log(`Upload progress: ${prog}%`),
            });

            onUploadComplete?.(uploadResult);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Upload failed";
            onUploadError?.(errorMessage);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    return (
        <div className="w-full mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleInputChange}
                    className="hidden"
                    accept={acceptedTypes?.join(",")}
                    disabled={isUploading}
                    multiple={false}
                />

                {isUploading ? (
                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">Uploading...</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-xs text-gray-500">{progress}%</div>
                    </div>
                ) : (
                    <>
                        <div className="text-gray-600 mb-2">
                            Drop a file here or{" "}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-700 underline"
                            >
                                browse
                            </button>
                        </div>
                        {maxSize && (
                            <div className="text-xs text-gray-500">
                                Max size: {(maxSize / (1024 * 1024)).toFixed(1)} MB
                            </div>
                        )}
                    </>
                )}
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="text-red-700 text-sm">{error}</div>
                    <button onClick={reset} className="mt-2 text-xs text-red-600 hover:text-red-700 underline">
                        Try again
                    </button>
                </div>
            )}
            {result && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="text-green-700 text-sm font-medium">Upload successful!</div>
                    <div className="text-green-600 text-xs mt-1 break-all">URL: {result.url}</div>
                </div>
            )}
        </div>
    );
}
