import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key not set" }, { status: 500 });
        }
        const { toolType, toolName, toolId, genType, file, courseTitle, courseId, instructorId, userPrompt } =
            await req.json();

        const getPrompt = (
            toolType: string,
            genType: "text" | "image",
            courseTitle: string,
            toolId: string,
            userPrompt: string
        ) => {
            switch (toolId) {
                case "q_a":
                    return `
Course Title: ${courseTitle}
Task: Generate a set of quiz questions (multiple choice, true/false, and short answer, each with a correct answer) and at least one assignment based on the provided course materials.
Instructions:
- Ensure questions cover key concepts and important details.
- For programming assignments, provide a clear problem statement and sample input/output if relevant.
- Output should be well-formatted and easy to copy.
`;
                case "summaries":
                    return `
Course Title: ${courseTitle}
Task: Generate concise key summaries and a quick cheat sheet for the course based on the provided materials.
Instructions:
- Summarize the most important concepts, definitions, and formulas.
- Present the cheat sheet in a clear, bullet-pointed or tabular format.
- Output should be easy to read and reference.
`;
                case "diagrams_images":
                    return ` Course Title: ${courseTitle}
                            User prompt (if any): ${userPrompt}`;
                default:
                    return `
Course Title: ${courseTitle}
Task: Generate ${toolType} for this course.
Materials: [PDF provided as context]
Please provide the output in a clear, readable format.
`;
            }
        };

        if (!courseId || !instructorId) {
            return NextResponse.json(
                {
                    error: "Course ID and User ID are required",
                },
                { status: 400 }
            );
        }

        const materialBuffer = await fetch(file.url).then((response) => response.arrayBuffer());
        const prompt = getPrompt(toolType, genType, courseTitle, toolId, userPrompt);
        const ai = new GoogleGenAI({ apiKey });

        const geminiRes = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: Buffer.from(materialBuffer).toString("base64"),
                    },
                },
            ],
            config: {
                thinkingConfig: {
                    thinkingBudget: -1,
                    includeThoughts: true,
                },
                systemInstruction:
                    genType === "image"
                        ? `You are an academic visual assistant.
                            You will be given a course-related academic PDF file that may contain multiple topics. If no specific topic is mentioned in the user prompt, analyze the PDF and focus on the first significant topic covered in detail. Extract the sub-concepts within that topic (such as definitions, comparisons, workflows, relationships, hierarchies, etc.), and generate an informative, academic-style visual (such as a flowchart, concept map, comparison table, diagram, or labeled illustration) that best explains the selected content clearly.
                            If a specific topic is mentioned in the user prompt, locate the section of the PDF where that topic is discussed, and then generate the most visually educational image that explains the concept clearly — including important subpoints, workflows, components, or relationships as needed.
                            Prioritize clarity, relevance, and pedagogy. Your goal is to make the topic easy to understand for students using a single image.
                            Output should be a detailed description of the image to be generated (e.g., layout, elements, labels, arrows, groupings), ready for image generation tools like DALL·E, Midjourney, or Gemini.
                            Respond only with the image generation prompt.
                            PDF file provided: ${file.pathname.split("/").pop()}`
                        : "You are an expert educational AI assistant. You will generate educational content based on the provided materials. Please provide the output in a clear, readable format.",
            },
        });

        let generatedContent = null;
        generatedContent = geminiRes.text;
        logger.log("Gemini response", generatedContent);

        if (genType === "image") {
            const imageResponse = await ai.models.generateContent({
                model: "gemini-2.0-flash-preview-image-generation",
                contents: geminiRes.text || "",
                config: {
                    responseModalities: [Modality.TEXT, Modality.IMAGE],
                },
            });

            if (
                imageResponse &&
                Array.isArray(imageResponse.candidates) &&
                imageResponse.candidates.length > 0 &&
                imageResponse.candidates[0].content &&
                Array.isArray(imageResponse.candidates[0].content.parts)
            ) {
                for (const part of imageResponse.candidates[0].content.parts) {
                    // Based on the part type, either show the text or save the image
                    if (part.text) {
                        logger.log("Got text output in image gen, rerun with different promt", part.text);
                        throw new Error("Got text output in image gen, please rerun with different promt");
                    } else if (part.inlineData) {
                        const imageData = part.inlineData.data;

                        if (typeof imageData === "string") {
                            // const buffer = Buffer.from(imageData, "base64");
                            // fs.writeFileSync("gemini-native-image.png", buffer);
                            // logger.log("Image saved as gemini-native-image.png");

                            generatedContent = imageData;
                        } else {
                            logger.error("Image data is undefined or not a string.");
                        }
                    }
                }
            }
        }

        const { data, error } = await supabaseServiceRoleClient
            .from("ai_generated_content")
            .upsert(
                {
                    course_id: courseId,
                    instructor_id: instructorId,
                    tool_id: toolId,
                    tool_name: toolName,
                    gen_type: genType,
                    content: generatedContent,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "course_id,tool_id" }
            )
            .select()
            .single();

        if (error) {
            logger.error("Error storing AI content:", error);
            // Still return the generated content even if storage fails
            return NextResponse.json({
                result: generatedContent,
                warning: "Content generated but failed to save to database",
            });
        }

        logger.log("Successfully stored AI content:", data);

        return NextResponse.json({
            result: generatedContent,
            success: true,
            // data: data,
        });
    } catch (error: any) {
        logger.error("Error in AI tools route:", error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
