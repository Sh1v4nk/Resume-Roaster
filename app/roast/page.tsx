"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ResultsDisplay } from "@/components/results-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Zap, Trash2 } from "lucide-react";

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

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleAnalyze = async () => {
        if (!uploadedFile) return;

        setIsAnalyzing(true);
        setAnalysisProgress(0);
        const startTime = Date.now();

        // Simulate analysis progress with more realistic timing
        const progressInterval = setInterval(() => {
            setAnalysisProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Slower, more variable increments for realism
                const increment = Math.random() * 8 + 2; // 2-10 increment
                return Math.min(prev + increment, 100);
            });
        }, 400); // Slower interval

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
                // Ensure minimum 3-second duration for better UX
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 3000 - elapsedTime);

                setTimeout(() => {
                    setResults(data.data);
                }, remainingTime);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Analysis error:", error);
            // Fallback to mock data on error
            setResults({
                score: 0,
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
            // Ensure minimum 3-second duration for better UX
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 3000 - elapsedTime);

            setTimeout(() => {
                setIsAnalyzing(false);
                clearInterval(progressInterval);
            }, remainingTime);
        }
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
                                            <Button
                                                onClick={() => setUploadedFile(null)}
                                                variant="outline"
                                                size="sm"
                                                className="hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/40"
                                            >
                                                <Trash2 className="h-4 w-4" />
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
                                                {analysisProgress < 20 && "Reading document structure..."}
                                                {analysisProgress >= 20 && analysisProgress < 40 && "Extracting text content..."}
                                                {analysisProgress >= 40 && analysisProgress < 60 && "Analyzing resume sections..."}
                                                {analysisProgress >= 60 && analysisProgress < 80 && "Evaluating content quality..."}
                                                {analysisProgress >= 80 && analysisProgress < 95 && "Checking keyword optimization..."}
                                                {analysisProgress >= 95 && "Generating personalized feedback..."}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <ResultsDisplay
                        results={results}
                        fileName={uploadedFile?.name || ""}
                        onReset={() => {
                            setResults(null);
                            setUploadedFile(null);
                            setAnalysisProgress(0);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
