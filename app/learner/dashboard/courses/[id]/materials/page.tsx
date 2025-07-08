"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { listBlobs } from "@/utils/blob-client";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ArrowLeft, FileText, ImageIcon, Loader2, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewCourseMaterailsAndAITools({ params }: { params: { id: string } }) {
    const courseId = params.id;

    const { toast } = useToast();

    const [files, setFiles] = useState<any[]>([]);
    const [supabase] = useState(() => createClient());
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const aiTools = [
        {
            id: "summaries",
            name: "Summaries & Cheat Sheets",
            type: "Key Summaries and Quick Cheat Sheets",
            genType: "text",
            icon: FileText,
        },
        {
            id: "diagrams_images",
            name: "Illustrative Diagrams & Images",
            type: "Concept Diagrams and Visual Aids",
            genType: "image",
            icon: ImageIcon,
        },
    ];

    const loadFiles = async () => {
        try {
            const result = await listBlobs(`courses/${courseId}/materials`);
            logger.info("Loaded files:", result);

            setFiles(result?.blobs || []);
        } catch (error) {
            console.error("Error loading files:", error);
        }
    };

    const fetchAIContent = async (toolName: string, toolId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/ai-tools/fetch?courseId=${courseId}&toolName=${encodeURIComponent(toolName)}&toolId=${toolId}`
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            if (data.success && data.data) {
                setGeneratedContent(data.data.content);
                setSelectedTool(toolName);
            } else {
                setGeneratedContent("");
                toast({
                    title: "No Content Found",
                    description: `No AI-generated content found for ${toolName}. Ask your instructor to generate content first.`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching AI content:", error);
            setGeneratedContent("");
            toast({
                title: "Error",
                description: "Failed to fetch AI content. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedContent);
            toast({
                title: "Copied!",
                description: "Content copied to clipboard successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard.",
                variant: "destructive",
            });
        }
    };

    const isImageTool = () => {
        const tool = aiTools.find((t) => t.name === selectedTool);
        return tool && tool.genType === "image";
    };

    const handleDownloadImage = () => {
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${generatedContent}`;
        link.download = "ai-generated-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    <h1 className="text-2xl font-bold mb-4">Error fetching logged user</h1>
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

                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="userId" value={user?.id} />
                {/* Course Materials */}
                <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                    <CardContent>
                        <div className="mt-8 space-y-8">
                            <div className="space-y-2">
                                {files.map((file) => (
                                    <div
                                        key={file.url}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-blue-700 text-sm"
                                                >
                                                    {file.pathname.split("/").pop()}
                                                </a>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Generated Content */}
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md mt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-cyan-400 flex items-center gap-3">
                            <Wand2 className="h-7 w-7" />
                            AI-Generated Learning Materials
                        </CardTitle>
                        <CardDescription className="text-indigo-200">
                            Access AI-generated content based on your course materials to enhance your learning
                            experience.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {aiTools.map((tool) => (
                                <Button
                                    key={tool.name}
                                    variant="outline"
                                    size="lg"
                                    className={`flex flex-col items-center justify-center h-auto p-6 space-y-2 text-center transition-all duration-150 ease-in-out
                          border-2 border-slate-700 bg-slate-800/70 hover:border-purple-500 hover:bg-purple-600/20 group
                          ${selectedTool === tool.name ? "border-purple-500 bg-purple-600/30 ring-2 ring-purple-500" : ""}`}
                                    onClick={() => fetchAIContent(tool.name, tool.id)}
                                    disabled={isLoading}
                                >
                                    <tool.icon
                                        className={`h-10 w-10 mb-2 transition-colors ${
                                            selectedTool === tool.name
                                                ? "text-purple-400"
                                                : "text-slate-400 group-hover:text-purple-400"
                                        }`}
                                    />
                                    <span
                                        className={`font-medium ${
                                            selectedTool === tool.name
                                                ? "text-purple-300"
                                                : "text-slate-300 group-hover:text-purple-300"
                                        }`}
                                    >
                                        {tool.name}
                                    </span>
                                </Button>
                            ))}
                        </div>

                        {isLoading && (
                            <div className="flex flex-col items-center justify-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
                                <Loader2 className="h-10 w-10 animate-spin text-purple-400 mb-4" />
                                <p className="text-lg text-purple-300">Loading AI content...</p>
                                <p className="text-sm text-slate-400">Please wait a moment.</p>
                            </div>
                        )}

                        {generatedContent &&
                            !isLoading &&
                            // Only show if selectedTool is not "Questions & Assignments"
                            ["Summaries & Cheat Sheets", "Illustrative Diagrams & Images"].includes(
                                selectedTool || ""
                            ) && (
                                <Card className="bg-slate-800/80 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            AI-Generated: {selectedTool}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isImageTool() ? (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={`data:image/png;base64,${generatedContent}`}
                                                    alt="Generated AI Visual"
                                                    className="max-w-full max-h-[500px] rounded shadow-lg border border-slate-600"
                                                />
                                                <div className="flex gap-2 mt-4">
                                                    <Button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(generatedContent);
                                                            toast({
                                                                title: "Copied!",
                                                                description: "Base64 image copied to clipboard.",
                                                            });
                                                        }}
                                                        variant="ghost"
                                                        className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                                                    >
                                                        Copy Base64
                                                    </Button>
                                                    <Button
                                                        onClick={handleDownloadImage}
                                                        variant="ghost"
                                                        className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                                                    >
                                                        Download Image
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <Textarea
                                                    value={generatedContent}
                                                    readOnly
                                                    rows={15}
                                                    className="bg-slate-900/70 border-slate-600 text-slate-200 focus:ring-green-500 focus:border-green-500 whitespace-pre-wrap"
                                                />
                                                <div className="mt-4">
                                                    <Button
                                                        onClick={copyToClipboard}
                                                        variant="ghost"
                                                        className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                                                    >
                                                        Copy to Clipboard
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                        {!generatedContent && !isLoading && !selectedTool && (
                            <div className="text-center py-8 text-slate-400 border border-dashed border-slate-700 rounded-lg">
                                <Sparkles className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                                <p className="font-semibold text-lg">AI Learning Materials</p>
                                <p className="text-sm mt-2">
                                    Click on any tool above to view AI-generated content for this course.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* More AI features coming soon card */}
                <div className="mt-6">
                    <Card className="bg-gradient-to-r from-purple-900/70 to-cyan-900/70 border-2 border-dashed border-purple-500/40 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-purple-300 flex items-center gap-2">
                                <Sparkles className="h-6 w-6 animate-pulse text-purple-400" />
                                More AI Features Coming Soon
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-300">
                                Stay tuned for more powerful AI tools and features to enhance your learning experience!
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
