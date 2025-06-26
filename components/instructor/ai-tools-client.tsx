"use client";

import { submitCourseMaterial } from "@/app/actions/instructor-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { deleteBlob, getBlobMetadata, listBlobs } from "@/utils/blob-client";
import logger from "@/utils/logger";
import {
    Brain,
    Check,
    FileText,
    HelpCircle,
    ImageIcon,
    Loader2,
    MessageSquare,
    RefreshCw,
    Sparkles,
    Wand2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FileUploadNew } from "../file-upload";

export default function MaterialsAndAITools({ course, materials }: { course: any; materials: any }) {
    const { toast } = useToast();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [generatedContent, setGeneratedContent] = useState<string>("");
    const [isAILoading, setAILoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null);
    const [showUploadModal, setShowUploadModal] = useState(true);
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
    const [showGenerationOptions, setShowGenerationOptions] = useState<boolean>(false);
    const [previousContent, setPreviousContent] = useState<any>(null);
    const [isLoadingPrevious, setIsLoadingPrevious] = useState<boolean>(false);
    const [userPrompt, setUserPrompt] = useState<string>("");

    const aiTools = [
        {
            id: "q_a",
            name: "Questions & Assignments",
            type: "Quiz Questions and Programming Assignments",
            genType: "text",
            icon: HelpCircle,
        },
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
        setLoading(true);
        try {
            const result = await getBlobMetadata(materials.view_url);
            logger.info("Loaded files:", result);

            if (result) {
                setShowUploadModal(false);
            } else {
                setShowUploadModal(true);
            }

            setFile(result);
            return result;
        } catch (error) {
            console.error("Error loading files:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (url: string) => {
        setLoading(true);
        try {
            const result = await deleteBlob(url);
            if (result.success) {
                await loadFiles();
            } else {
                throw new Error("Failed to delete file");
            }
        } catch (error) {
            logger.error("Error deleting file:", error);
            alert("Failed to delete file");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadComplete = async () => {
        startTransition(async () => {
            const blobResult = await listBlobs(`courses/${course.id}/materials`);
            if (blobResult?.blobs?.length === 0) {
                logger.error("No files found");
                return;
            }

            const formData = new FormData();
            formData.append("courseId", course.id);
            formData.append("userId", course.instructor);

            const result = await submitCourseMaterial(formData, blobResult?.blobs[0]);

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
                window.location.reload();
            }
        });
    };

    const fetchPreviousContent = async (toolName: string, toolId: string) => {
        setIsLoadingPrevious(true);
        try {
            const response = await fetch(
                `/api/ai-tools/fetch?courseId=${course.id}&toolName=${encodeURIComponent(toolName)}&toolId=${toolId}`
            );
            if (!response.ok) {
                logger.error("Error fetching previous content:", response);
                throw new Error(response.statusText);
            }

            const data = await response.json();

            if (data.success) {
                setPreviousContent(data.data);
                if (data.data) {
                    setGeneratedContent(data.data.content);
                }
            } else {
                setPreviousContent(null);
                setGeneratedContent("");
            }
        } catch (error) {
            logger.error("Error fetching previous content:", error);
            setPreviousContent(null);
            setGeneratedContent("");
        } finally {
            setIsLoadingPrevious(false);
        }
    };

    const handleToolClick = async (toolName: string, toolId: string) => {
        if (!file) {
            toast({
                title: "No Materials",
                description: "Please upload some course materials first to use AI tools.",
                variant: "destructive",
            });
            return;
        }

        setSelectedTool(toolName);
        setActiveTool(toolName);
        setSelectedToolId(toolId);
        setShowGenerationOptions(true);

        // Fetch previous content for this tool
        await fetchPreviousContent(toolName, toolId);
    };

    const handleGenerateNew = async () => {
        if (!selectedTool) return;

        const tool = aiTools.find((t) => t.id === selectedToolId);
        if (!tool) return;

        setAILoading(true);
        setGeneratedContent("");
        setShowGenerationOptions(false);

        try {
            const res = await fetch("/api/ai-tools/gen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    toolType: tool.type,
                    toolName: tool.name,
                    toolId: tool.id,
                    genType: tool.genType,
                    userPrompt: userPrompt,
                    file: file,
                    courseTitle: course.course_title,
                    courseId: course.id,
                    instructorId: course.instructor,
                }),
            });

            if (!res.ok) {
                logger.error("Failed to generate content");
                throw new Error("Failed to generate content");
            }

            const data = await res.json();
            setGeneratedContent(data.result || "No content generated.");

            if (data.success) {
                toast({
                    title: "Success",
                    description: "AI content generated and saved successfully!",
                });
            } else if (data.warning) {
                toast({
                    title: "Warning",
                    description: data.warning,
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            setGeneratedContent("Error generating content: " + error.message);
            toast({
                title: "Error",
                description: "Failed to generate content: " + error.message,
                variant: "destructive",
            });
        } finally {
            setAILoading(false);
        }
    };

    const handleUsePrevious = () => {
        if (previousContent && previousContent.content) {
            setGeneratedContent(previousContent.content);
            setShowGenerationOptions(false);
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
        const tool = aiTools.find((t) => t.id === selectedToolId);
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
        loadFiles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Brain className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
                            AI Tools for: {course.course_title}
                        </h1>
                    </div>
                    <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        Back to Course Edit
                    </Button>
                </div>

                {/* AI Header */}
                <Card className="bg-gradient-to-r from-purple-600/80 via-indigo-700/80 to-cyan-600/80 border-purple-500 shadow-2xl backdrop-blur-md mt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <Brain className="h-7 w-7" />
                            AI-Powered Content Tools
                        </CardTitle>
                        <CardDescription className="text-indigo-200">
                            Enhance your course materials with intelligent generation features.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-indigo-100 mb-4">
                            Leverage AI to automatically generate quizzes, summaries, diagrams, and more based on your
                            uploaded course materials.
                        </p>
                    </CardContent>
                </Card>

                {/* Uploaded Materials */}
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-300 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-slate-400" />
                            Uploaded Materials Overview
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            These materials will be used by the AI for content generation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-8 space-y-8">
                            {showUploadModal && (
                                <FileUploadNew
                                    folder={`courses/${course.id}/materials`}
                                    maxSize={10 * 1024 * 1024} // 10MB
                                    acceptedTypes={["application/pdf"]}
                                    onUploadComplete={handleUploadComplete}
                                    onUploadError={(error) => alert(error)}
                                />
                            )}

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Your File</h2>
                                {loading || isPending ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <div className="space-y-2">
                                        {file ? (
                                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium truncate">
                                                        {file?.pathname?.split("/")?.pop()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {(file?.size / (1024 * 1024)).toFixed(1)} MB •{" "}
                                                        {new Date(file?.uploadedAt)?.toLocaleDateString("en-UK", {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link href={file?.url} target="_blank" rel="noopener noreferrer">
                                                        <Button variant={"outline"}>View</Button>
                                                    </Link>

                                                    <Button
                                                        variant={"outline"}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                        onClick={() => handleDelete(file?.url)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 text-center py-8">No files uploaded yet</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Tools */}
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                            <Wand2 className="h-5 w-5" />
                            AI Content Generators
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Select a tool to generate content based on your uploaded course materials.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {aiTools.map((tool) => (
                                <Button
                                    key={tool.name}
                                    variant="outline"
                                    size="lg"
                                    className={`flex flex-col items-center justify-center h-auto p-6 space-y-2 text-center transition-all duration-150 ease-in-out
                              border-2 border-slate-700 bg-slate-800/70 hover:border-purple-500 hover:bg-purple-600/20 group
                              ${activeTool === tool.name ? "border-purple-500 bg-purple-600/30 ring-2 ring-purple-500" : ""}`}
                                    onClick={() => handleToolClick(tool.name, tool.id)}
                                    disabled={isAILoading || isLoadingPrevious}
                                >
                                    <tool.icon
                                        className={`h-10 w-10 mb-2 transition-colors ${activeTool === tool.name ? "text-purple-400" : "text-slate-400 group-hover:text-purple-400"}`}
                                    />
                                    <span
                                        className={`font-medium ${activeTool === tool.name ? "text-purple-300" : "text-slate-300 group-hover:text-purple-300"}`}
                                    >
                                        {tool.name}
                                    </span>
                                </Button>
                            ))}
                        </div>

                        {/* Generation Options Modal */}
                        {showGenerationOptions && (
                            <Card className="bg-slate-800/80 border-slate-600 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        Choose Generation Option for: {selectedTool}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isLoadingPrevious ? (
                                        <div className="flex items-center justify-center p-6">
                                            <Loader2 className="h-6 w-6 animate-spin text-purple-400 mr-2" />
                                            <span className="text-slate-300">Checking for previous content...</span>
                                        </div>
                                    ) : (
                                        <>
                                            {previousContent ? (
                                                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Check className="h-4 w-4 text-green-400" />
                                                        <span className="text-green-400 font-medium">
                                                            Previous content found
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-300 text-sm">
                                                        Last generated:{" "}
                                                        {new Date(previousContent.updated_at).toLocaleDateString(
                                                            "en-UK",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </p>
                                                    <div className="mt-3 max-h-32 overflow-y-auto bg-slate-800 p-2 rounded text-xs text-slate-400">
                                                        {previousContent.content.substring(0, 200)}...
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                                                    <p className="text-slate-300">
                                                        No previous content found for this tool.
                                                    </p>
                                                </div>
                                            )}

                                            {(() => {
                                                const tool = aiTools.find((t) => t.id === selectedToolId);
                                                if (tool && tool.genType === "image") {
                                                    return (
                                                        <div className="space-y-2">
                                                            <label className="block text-slate-300 font-medium">
                                                                Optional: Enter a topic or prompt for the image
                                                                generation. Make sure to take the topic from the
                                                                uploaded materials only.
                                                            </label>
                                                            <Textarea
                                                                value={userPrompt}
                                                                onChange={(e) => setUserPrompt(e.target.value)}
                                                                placeholder="E.g. 'Explain the concept of Quantum Entanglement'"
                                                                rows={2}
                                                                className="bg-slate-900/70 border-slate-600 text-slate-200 focus:ring-cyan-500 focus:border-cyan-500"
                                                            />
                                                            <div className="text-xs text-slate-400 italic">
                                                                If you leave this blank, the AI will pick the very first
                                                                topic it encounters in the PDF.
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })()}

                                            <div className="flex gap-3">
                                                {previousContent && (
                                                    <Button
                                                        onClick={handleUsePrevious}
                                                        className="bg-green-600 hover:bg-green-700 text-white"
                                                    >
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Use Previous Content
                                                    </Button>
                                                )}

                                                <Button
                                                    onClick={handleGenerateNew}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                                >
                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                    Generate New Content
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {isAILoading && (
                            <div className="flex flex-col items-center justify-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
                                <Loader2 className="h-10 w-10 animate-spin text-purple-400 mb-4" />
                                <p className="text-lg text-purple-300">AI is thinking... Generating {activeTool}...</p>
                                <p className="text-sm text-slate-400">This might take a moment.</p>
                            </div>
                        )}

                        {generatedContent && !isAILoading && !showGenerationOptions && (
                            <Card className="bg-slate-800/80 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" /> Generated Output for: {activeTool}
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
                                            <CardFooter>
                                                <Button
                                                    onClick={copyToClipboard}
                                                    variant="ghost"
                                                    className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                                                >
                                                    Copy to Clipboard
                                                </Button>
                                            </CardFooter>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {!generatedContent && !isAILoading && !showGenerationOptions && !file && (
                            <div className="text-center py-6 text-slate-400 border border-dashed border-slate-700 rounded-lg">
                                <FileText className="h-10 w-10 mx-auto mb-2 text-slate-500" />
                                <p className="font-semibold">No Course Materials Found</p>
                                <p className="text-sm">
                                    Please upload course materials on the edit page before using AI tools.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
