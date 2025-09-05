import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const SAFETY_SETTINGS = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

function generateAnalysisPrompt(resumeContent: string) {
    return `
    Analyze this resume and provide a detailed assessment in the following JSON format only:

    {
      "score": <number between 0-100>,
      "feedback": [
        {
          "type": "good" | "warning" | "error",
          "category": "Contact Information" | "Work Experience" | "Skills" | "Education" | "Summary" | "Other",
          "message": "<specific feedback message>"
        }
      ],
      "keywords": {
        "found": ["keyword1", "keyword2", ...],
        "missing": ["keyword1", "keyword2", ...]
      },
      "sections": [
        {
          "name": "Contact Info" | "Summary" | "Experience" | "Skills" | "Education" | "Other",
          "score": <number between 0-100>,
          "completeness": <number between 0-100>
        }
      ],
      "roast": "<humorous, constructive roast of the resume>"
    }

    Resume content:
    ${resumeContent}

    Provide realistic, constructive feedback that helps improve the resume. Focus on:
    - Completeness and relevance
    - Formatting and clarity
    - Industry-specific keywords
    - Quantifiable achievements
    - Overall impact and presentation

    For the roast section, provide a brief, humorous critique that's constructive and entertaining.

    Return only valid JSON, no additional text or explanations.
  `;
}

async function extractTextFromFile(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();

    if (file.type === "application/pdf") {
        const pdf = (await import("pdf-parse")).default;
        const data = await pdf(Buffer.from(buffer));
        return data.text;
    } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
    ) {
        const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
        return result.value;
    } else {
        throw new Error("Unsupported file type");
    }
}

async function analyzeResume(content: string): Promise<{
    score: number;
    feedback: Array<{
        type: "good" | "warning" | "error";
        category: string;
        message: string;
    }>;
    keywords: {
        found: string[];
        missing: string[];
    };
    sections: Array<{
        name: string;
        score: number;
        completeness: number;
    }>;
    roast: string;
}> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: SAFETY_SETTINGS,
    });

    const prompt = generateAnalysisPrompt(content);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        // Clean the response to ensure it's valid JSON
        const cleanedText = text.replace(/```json\s*|\s*```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch {
        console.error("Failed to parse AI response:", text);
        // Fallback to mock data if parsing fails
        return {
            score: 75,
            feedback: [
                {
                    type: "warning" as const,
                    category: "Analysis",
                    message: "AI analysis failed, showing sample feedback.",
                },
            ],
            keywords: {
                found: ["JavaScript", "React"],
                missing: ["TypeScript", "Node.js"],
            },
            sections: [
                { name: "Contact Info", score: 85, completeness: 90 },
                { name: "Summary", score: 70, completeness: 75 },
                { name: "Experience", score: 75, completeness: 80 },
                { name: "Skills", score: 65, completeness: 60 },
                { name: "Education", score: 90, completeness: 95 },
            ],
            roast: "Your resume is like a participation trophy - it shows up, but nobody's really impressed. The skills section reads like a shopping list from a discount store, and your experience section could use more quantifiable achievements. Keep working on it!",
        };
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json({ error: "No resume file uploaded" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    error: "Invalid file type. Please upload PDF or DOCX files only.",
                },
                { status: 400 },
            );
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be less than 10MB" },
                { status: 400 },
            );
        }

        // Extract text from file
        const resumeContent = await extractTextFromFile(file);

        if (!resumeContent || resumeContent.trim().length === 0) {
            return NextResponse.json(
                {
                    error: "Unable to extract text from resume. Please ensure the file contains readable text.",
                },
                { status: 400 },
            );
        }

        // Analyze resume with AI
        const analysis = await analyzeResume(resumeContent);

        return NextResponse.json({
            success: true,
            data: analysis,
        });
    } catch (error) {
        console.error("Resume analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume. Please try again." },
            { status: 500 },
        );
    }
}
