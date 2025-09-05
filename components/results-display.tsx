"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Download, BarChart3, Target, FileText, PieChart, Loader2 } from "lucide-react";
import { SectionsPieChart, SectionsBarChart, KeywordCoverageChart } from "@/components/charts";
import { motion, AnimatePresence, easeOut } from "motion/react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResultsDisplayProps {
    results: {
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
    };
    fileName: string;
}

export function ResultsDisplay({ results, fileName }: ResultsDisplayProps) {
    const [activeTab, setActiveTab] = useState("overview");
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    // const getScoreBgColor = (score: number) => {
    //     if (score >= 80) return "bg-green-100 dark:bg-green-950";
    //     if (score >= 60) return "bg-yellow-100 dark:bg-yellow-950";
    //     return "bg-red-100 dark:bg-red-950";
    // };

    const getFeedbackIcon = (type: string) => {
        switch (type) {
            case "good":
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "warning":
                return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
            case "error":
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return null;
        }
    };

    const getFeedbackBgColor = (type: string) => {
        switch (type) {
            case "good":
                return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
            case "warning":
                return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800";
            case "error":
                return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
            default:
                return "";
        }
    };

    const formatRoastText = (text: string) => {
        return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={index} className="font-bold text-orange-700 dark:text-orange-300">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    const generatePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const element = document.getElementById("results-content");
            if (!element) {
                throw new Error("Results content not found");
            }

            toast.loading("Generating PDF report...", { id: "pdf-generation" });

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
                width: element.scrollWidth,
                height: element.scrollHeight,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            // Add first page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Add header with filename and date
            const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
            const date = new Date().toLocaleDateString();
            pdf.setFontSize(16);
            pdf.text(`Resume Analysis Report - ${fileNameWithoutExt}`, 10, 10);
            pdf.setFontSize(12);
            pdf.text(`Generated on: ${date}`, 10, 20);
            pdf.text(`Overall Score: ${results.score}/100`, 10, 30);

            pdf.save(`resume-analysis-${fileNameWithoutExt}.pdf`);

            toast.success("PDF report downloaded successfully!", { id: "pdf-generation" });
        } catch (error) {
            console.error("PDF generation failed:", error);
            toast.error("Failed to generate PDF. Please try again.", { id: "pdf-generation" });
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <motion.div id="results-content" variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {/* Header with Score */}
            <motion.div variants={itemVariants}>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20">
                    <CardHeader className="pb-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                        className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
                                    >
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            Analysis Results
                                        </CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-muted-foreground">
                                            Comprehensive analysis for <span className="font-semibold text-foreground">{fileName}</span>
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>AI-Powered Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span>Real-time Feedback</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </motion.div>

            {/* Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                                <p className={`text-2xl font-bold ${getScoreColor(results.score)}`}>{results.score}/100</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Keywords Found</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.keywords.found.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-500 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Areas to Improve</p>
                                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                    {results.feedback.filter((f) => f.type === "warning" || f.type === "error").length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Tabs for Results */}
            <motion.div variants={itemVariants}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 gap-1 bg-muted/50 rounded-xl">
                        <TabsTrigger
                            value="overview"
                            className="flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span className="hidden sm:inline">Overview</span>
                            <span className="sm:hidden">Charts</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="suggestions"
                            className="flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                        >
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Suggestions</span>
                            <span className="sm:hidden">Tips</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="keywords"
                            className="flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                        >
                            <Target className="h-4 w-4" />
                            <span>Keywords</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="roast"
                            className="flex items-center justify-center space-x-2 text-xs sm:text-sm py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                🔥
                            </motion.div>
                            <span>Roast</span>
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent value="overview" className="space-y-6">
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                            >
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                                <PieChart className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span>Section Completeness</span>
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                Visual breakdown of resume section completeness
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <SectionsPieChart data={results.sections} />
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span>Section Scores</span>
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                Quality scores and completeness by section
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <SectionsBarChart data={results.sections} />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base sm:text-lg">Section Details</CardTitle>
                                        <CardDescription className="text-sm">Detailed breakdown with progress indicators</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {results.sections.map((section, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-sm sm:text-base">{section.name}</span>
                                                    <span className={`font-bold text-sm sm:text-base ${getScoreColor(section.score)}`}>
                                                        {section.score}/100
                                                    </span>
                                                </div>
                                                <Progress value={section.completeness} className="h-2" />
                                                <p className="text-xs text-muted-foreground">{section.completeness}% complete</p>
                                            </motion.div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="suggestions" className="space-y-4">
                            <motion.div
                                key="suggestions"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {results.feedback.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Card className={`border ${getFeedbackBgColor(item.type)}`}>
                                            <CardContent className="pt-4 sm:pt-6">
                                                <div className="flex items-start space-x-3">
                                                    <motion.div
                                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                    >
                                                        {getFeedbackIcon(item.type)}
                                                    </motion.div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold mb-1 text-sm sm:text-base">{item.category}</h4>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">{item.message}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="keywords" className="space-y-6">
                            <motion.div
                                key="keywords"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                                <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span>Keyword Coverage</span>
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                Visual representation of keyword match rate
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <KeywordCoverageChart data={results.keywords} />
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-green-600 text-base sm:text-lg">Found Keywords</CardTitle>
                                                <CardDescription className="text-sm">
                                                    Keywords that were successfully identified in your resume
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {results.keywords.found.map((keyword, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 text-xs sm:text-sm"
                                                            >
                                                                {keyword}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-red-600 text-base sm:text-lg">Missing Keywords</CardTitle>
                                                <CardDescription className="text-sm">
                                                    Important keywords that could strengthen your resume
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {results.keywords.missing.map((keyword, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <Badge
                                                                variant="outline"
                                                                className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 text-xs sm:text-sm"
                                                            >
                                                                {keyword}
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="roast" className="space-y-6">
                            <motion.div
                                key="roast"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                                    <CardHeader>
                                        <CardTitle className="text-xl sm:text-2xl text-orange-600 dark:text-orange-400 flex items-center gap-2">
                                            🔥 Resume Roast
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            A humorous take on your resume - take it with a grain of salt! 🍿
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-orange-200 dark:border-orange-800"
                                        >
                                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
                                                &ldquo;{formatRoastText(results.roast)}&rdquo;
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-4 text-sm text-muted-foreground text-center"
                                        >
                                            💡 Remember: This is all in good fun! Use the feedback above to improve your resume.
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </motion.div>

            {/* Download Report */}
            <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0">
                    <CardContent className="pt-4 sm:pt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold mb-1 text-base sm:text-lg">Download Detailed Report</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Get a comprehensive PDF report with all feedback and suggestions
                                </p>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="rounded-xl w-full sm:w-auto" onClick={generatePDF} disabled={isGeneratingPDF}>
                                    {isGeneratingPDF ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Download className="mr-2 h-4 w-4" />
                                    )}
                                    {isGeneratingPDF ? "Generating..." : "Download PDF"}
                                </Button>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Analyze Another Resume */}
            <motion.div variants={itemVariants}>
                <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
                    <CardContent className="pt-4 sm:pt-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h3 className="font-semibold mb-2 text-base sm:text-lg">Ready for Another Analysis?</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Upload a different resume or try again with improvements
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button
                                    variant="outline"
                                    asChild
                                    className="rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 w-full sm:w-auto"
                                >
                                    <Link href="/roast">
                                        <motion.div
                                            className="flex items-center space-x-2"
                                            whileHover={{ x: 2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <span>📄</span>
                                            <span>Analyze Another Resume</span>
                                            <motion.div
                                                animate={{ x: [0, 3, 0] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                            >
                                                →
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
