"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ResultsDisplay } from "@/components/results-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Zap } from "lucide-react";

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    file: File;
}

interface AnalysisResults {
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
    sections: {
        name: string;
        score: number;
        completeness: number;
    }[];
    roast: string;
}
export default function RoastPage() {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [results, setResults] = useState<AnalysisResults | null>(null);

    const handleFileUpload = (file: File) => {
        setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
        });
        setResults(null);
    };

    const handleAnalyze = async () => {
        if (!uploadedFile) return;

        setIsAnalyzing(true);
        setAnalysisProgress(0);

        // Simulate analysis progress
        const progressInterval = setInterval(() => {
            setAnalysisProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append("resume", uploadedFile.file);

            const response = await fetch("/api/roast", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to analyze resume");
            }

            const data = await response.json();

            if (data.success && data.data) {
                setResults(data.data);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Analysis error:", error);
            // Fallback to mock data on error
            setResults({
                score: 75,
                feedback: [
                    {
                        type: "error" as const,
                        category: "Analysis Error",
                        message: `Failed to analyze resume: ${error instanceof Error ? error.message : "Unknown error"}`,
                    },
                ],
                keywords: {
                    found: [],
                    missing: [],
                },
                sections: [
                    { name: "Contact Info", score: 0, completeness: 0 },
                    { name: "Summary", score: 0, completeness: 0 },
                    { name: "Experience", score: 0, completeness: 0 },
                    { name: "Skills", score: 0, completeness: 0 },
                    { name: "Education", score: 0, completeness: 0 },
                ],
                roast: "Unable to generate roast at this time. Please try again later.",
            });
        } finally {
            setIsAnalyzing(false);
            clearInterval(progressInterval);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Roast Your Resume
                    </h1>
                    <p className="text-xl text-muted-foreground text-pretty">
                        Upload your resume and get instant AI-powered feedback and analysis
                    </p>
                </div>

                {!results ? (
                    <div className="space-y-8">
                        {/* Step 1: Upload Resume */}
                        <Card className="shadow-lg border-0">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                        1
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Upload Your Resume</CardTitle>
                                        <CardDescription className="text-base">
                                            Upload your resume in PDF or DOCX format to get started
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <FileUpload onFileUpload={handleFileUpload} />

                                {uploadedFile && (
                                    <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="font-medium">{uploadedFile.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatFileSize(uploadedFile.size)} •{" "}
                                                        {uploadedFile.type.includes("pdf") ? "PDF" : "DOCX"}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button onClick={() => setUploadedFile(null)} variant="ghost" size="sm">
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Step 2: Analyze */}
                        {uploadedFile && (
                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                                            2
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Analyze Resume</CardTitle>
                                            <CardDescription className="text-base">
                                                Get AI-powered insights and feedback on your resume
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {!isAnalyzing ? (
                                        <Button
                                            onClick={handleAnalyze}
                                            size="lg"
                                            className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <Zap className="mr-2 h-5 w-5" />
                                            Analyze Resume
                                        </Button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                                <span className="text-lg font-medium">Analyzing your resume...</span>
                                            </div>
                                            <Progress value={analysisProgress} className="w-full" />
                                            <p className="text-sm text-muted-foreground">
                                                {analysisProgress < 30 && "Parsing document structure..."}
                                                {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing content quality..."}
                                                {analysisProgress >= 60 && analysisProgress < 90 && "Checking keyword optimization..."}
                                                {analysisProgress >= 90 && "Generating insights..."}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <ResultsDisplay results={results} fileName={uploadedFile?.name || ""} />
                )}
            </div>
        </div>
    );
}
