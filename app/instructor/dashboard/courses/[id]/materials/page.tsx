import type { CourseMaterial } from "@/components/course-material-uploader";
import { FileUploadNew } from "@/components/file-upload";
import MaterialsAndAITools from "@/components/instructor/ai-tools-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { Brain, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function CourseMaterialsAIPage({ params }: { params: { id: string } }) {
    const courseId = params.id;

    if (!courseId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course ID not found</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    const mockMaterials: CourseMaterial[] = [
        {
            id: "mat1",
            title: "Intro Slides",
            description: "Week 1 intro",
            type: "lecture",
            url: "#",
            fileName: "intro.pdf",
            fileSize: 102400,
            uploadedAt: new Date(),
        },
        {
            id: "mat2",
            title: "Assignment 1",
            description: "First assignment",
            type: "assignment",
            url: "#",
            fileName: "assign1.docx",
            fileSize: 51200,
            uploadedAt: new Date(),
        },
    ];

    const { data: course, error: courseError } = await supabaseServiceRoleClient
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    const { data: materials, error: materialsError } = await supabaseServiceRoleClient
        .from("materials")
        .select("*")
        .eq("course", courseId)
        .single();

    if (courseError || !course || materialsError || !materials) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{materialsError?.message || "Something went wrong"}</h1>
                    <p className="text-gray-400">Unknown error</p>
                </div>
            </div>
        );
    }

    return <MaterialsAndAITools course={course} courseMaterials={materials}  />;
}
