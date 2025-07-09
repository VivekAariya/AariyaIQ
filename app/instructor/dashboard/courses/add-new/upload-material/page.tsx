"use client";

import { submitCourseMaterial } from "@/app/actions/instructor-actions";
import { FileUploadNew } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deleteBlob, listBlobs } from "@/utils/blob-client";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";

function AddNew() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [isPending, startTransition] = useTransition();

    const { toast } = useToast();
    const router = useRouter();

    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [supabase] = useState(() => createClient());
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(true);

    const loadFiles = async () => {
        setLoading(true);
        try {
            const result = await listBlobs(`courses/${courseId}/materials`);
            logger.info("Loaded files:", result);

            if (result?.blobs?.length > 0) {
                setShowUploadModal(false);
            } else {
                setShowUploadModal(true);
            }

            setFiles(result?.blobs || []);
        } catch (error) {
            console.error("Error loading files:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (url: string) => {
        const result = await deleteBlob(url);
        if (result.success) {
            await loadFiles(); // Refresh the list
        } else {
            alert("Failed to delete file");
        }
    };

    const handleUploadComplete = () => {
        loadFiles();
    };

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await submitCourseMaterial(formData, files[0]);
            if (!result?.success) {
                toast({
                    title: "Error",
                    description: result?.message || "An unexpected error occurred",
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Success",
                    description: result?.message || "Course material uploaded successfully!",
                });
                router.push("/instructor/dashboard/courses");
            }
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error || !data.user) {
                    logger.error("Error fetching user data:", error);
                    setIsError(true);
                }

                setUser(data?.user);
            } catch (error: any) {
                logger.error("Error fetching user data:", error);
                setIsError(true);
            }
        };

        fetchUser();
        loadFiles();
    }, []);

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged in user</h1>
                    <p className="text-gray-400">Unknown error</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (!courseId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error fetching course</h1>
                    <p className="text-gray-400">Unknown error</p>
                    <Button variant="outline" className="mt-4" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Quantum Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Upload Materials
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Upload materials for your course. Please only upload PDF file
                            </p>
                        </div>
                    </div>
                </div>

                <form action={handleSubmit}>
                    <input type="hidden" name="courseId" value={courseId} />
                    <input type="hidden" name="userId" value={user?.id} />
                    {/* Course Materials */}
                    <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                        <CardContent>
                            <div className="mt-8 space-y-8">
                                {showUploadModal && (
                                    <FileUploadNew
                                        folder={`courses/${courseId}/materials`}
                                        maxSize={10 * 1024 * 1024} // 10MB
                                        acceptedTypes={["application/pdf"]}
                                        onUploadComplete={handleUploadComplete}
                                        onUploadError={(error) => alert(error)}
                                    />
                                )}

                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Your File</h2>
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <div className="space-y-2">
                                            {files.map((file) => (
                                                <div
                                                    key={file.url}
                                                    className="flex items-center justify-between p-3 border rounded-lg"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium truncate">
                                                            {file.pathname.split("/").pop()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {(file.size / (1024 * 1024)).toFixed(1)} MB •{" "}
                                                            {new Date(file.uploadedAt).toLocaleDateString("en-UK", {
                                                                day: "numeric",
                                                                month: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={file.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-700 text-sm"
                                                        >
                                                            View
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(file.url)}
                                                            className="text-red-600 hover:text-red-700 text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {files.length === 0 && (
                                                <div className="text-gray-500 text-center py-8">
                                                    No files uploaded yet
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-3 flex justify-end mt-4">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AddNewCoursePage() {
    return (
        <Suspense>
            <AddNew />
        </Suspense>
    );
}
