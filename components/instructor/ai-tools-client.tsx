"use client";

import type { CourseMaterial } from "@/components/course-material-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileText, HelpCircle, ImageIcon, Loader2, MessageSquare, Sparkles, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock AI Generation function
const mockAIGenerate = async (type: string, materials: CourseMaterial[]): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (materials.length === 0) {
        return `Please upload some course materials first to generate ${type}.`;
    }
    return `AI Generated ${type} based on ${materials.length} material(s):\n\n- Example ${type} item 1\n- Example ${type} item 2\n- This is a placeholder for actual AI output.`;
};

const aiTools = [
    { name: "Questions & Assignments", type: "Quiz Questions and Programming Assignments", icon: HelpCircle },
    { name: "Summaries & Cheat Sheets", type: "Key Summaries and Quick Cheat Sheets", icon: FileText },
    { name: "Illustrative Diagrams & Images", type: "Concept Diagrams and Visual Aids", icon: ImageIcon },
];

export default function MaterialsAndAITools({
    courseMaterials,
    course,
}: {
    courseMaterials: CourseMaterial[];
    course: any;
}) {
    const router = useRouter();

    const [generatedContent, setGeneratedContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTool, setActiveTool] = useState<string | null>(null);

    const handleGenerate = async (toolType: string, toolName: string) => {
        setActiveTool(toolName);
        setIsLoading(true);
        setGeneratedContent("");
        const content = await mockAIGenerate(toolType, courseMaterials);
        setGeneratedContent(content);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Brain className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
                            AI Tools for: {course.title}
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
                        {/* {materials.length > 0 ? (
                            <ul className="space-y-2">
                                {materials.map((material: any) => (
                                    <li
                                        key={material.id}
                                        className="p-3 bg-slate-700/50 rounded-md border border-slate-600 text-sm"
                                    >
                                        <p className="font-medium text-cyan-400">
                                            {material.title}{" "}
                                            <span className="text-xs text-slate-400">({material.type})</span>
                                        </p>
                                        <p className="text-slate-300 text-xs">
                                            {material.fileName} - {(material.fileSize / 1024).toFixed(1)} KB
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-400 text-center py-4">
                                No materials uploaded for this course yet.
                            </p>
                        )} */}
                    </CardContent>
                </Card>
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
                                    onClick={() => handleGenerate(tool.type, tool.name)}
                                    disabled={isLoading}
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

                        {isLoading && (
                            <div className="flex flex-col items-center justify-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
                                <Loader2 className="h-10 w-10 animate-spin text-purple-400 mb-4" />
                                <p className="text-lg text-purple-300">AI is thinking... Generating {activeTool}...</p>
                                <p className="text-sm text-slate-400">This might take a moment.</p>
                            </div>
                        )}

                        {generatedContent && !isLoading && (
                            <Card className="bg-slate-800/80 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" /> Generated Output for: {activeTool}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={generatedContent}
                                        readOnly
                                        rows={15}
                                        className="bg-slate-900/70 border-slate-600 text-slate-200 focus:ring-green-500 focus:border-green-500 whitespace-pre-wrap"
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="ghost"
                                        className="text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                                    >
                                        Copy to Clipboard
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}

                        {!generatedContent && !isLoading && courseMaterials.length === 0 && (
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
