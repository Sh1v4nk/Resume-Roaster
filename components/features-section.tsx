"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Upload,
    Target,
    BarChart3,
    Download,
    CheckCircle,
    AlertTriangle,
    XCircle,
} from "lucide-react";
import { easeOut, motion } from "motion/react";

export function FeaturesSection() {
    const features = [
        {
            icon: Upload,
            title: "Upload Resume & Get Feedback",
            description:
                "Simply drag and drop your PDF or DOCX resume and get instant AI-powered analysis with detailed feedback on structure, content, and formatting.",
            color: "text-primary",
        },
        {
            icon: Target,
            title: "Match Against Job Description",
            description:
                "Compare your resume against specific job descriptions to see keyword matches, missing skills, and optimization opportunities.",
            color: "text-accent",
        },
        {
            icon: BarChart3,
            title: "Visual Insights & Score",
            description:
                "Get a comprehensive score out of 100 with visual charts showing strengths, weaknesses, and areas for improvement.",
            color: "text-chart-3",
        },
        {
            icon: Download,
            title: "Export Reports",
            description:
                "Download detailed PDF reports with all feedback, suggestions, and action items to improve your resume systematically.",
            color: "text-chart-4",
        },
    ];

    const feedbackTypes = [
        {
            icon: CheckCircle,
            label: "Strong Points",
            description: "Well-written sections",
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950",
        },
        {
            icon: AlertTriangle,
            label: "Needs Improvement",
            description: "Areas to enhance",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50 dark:bg-yellow-950",
        },
        {
            icon: XCircle,
            label: "Missing Elements",
            description: "Critical gaps to fill",
            color: "text-red-600",
            bgColor: "bg-red-50 dark:bg-red-950",
        },
    ];

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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    return (
        <section className="bg-muted/30 py-12 sm:py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12 text-center lg:mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-foreground mb-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl"
                    >
                        Powerful Features for Resume Success
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed text-pretty sm:text-xl"
                    >
                        Our AI-powered platform provides comprehensive resume analysis with
                        actionable insights to help you stand out in today&apos;s competitive job
                        market.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-16 lg:grid-cols-4"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                },
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card className="relative h-full overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
                                <CardHeader className="pb-4">
                                    <motion.div
                                        className={`bg-background inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm sm:h-12 sm:w-12 ${feature.color}`}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 17,
                                            },
                                        }}
                                    >
                                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </motion.div>
                                    <CardTitle className="text-base font-semibold sm:text-lg">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm leading-relaxed sm:text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-card rounded-2xl border p-6 shadow-lg sm:p-8"
                >
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 text-center text-xl font-bold sm:mb-8 sm:text-2xl"
                    >
                        Smart Feedback Categories
                    </motion.h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
                    >
                        {feedbackTypes.map((type, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.02,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    },
                                }}
                                className={`${type.bgColor} cursor-pointer rounded-xl border p-4 sm:p-6`}
                            >
                                <div className="mb-3 flex items-center space-x-3">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <type.icon
                                            className={`h-5 w-5 sm:h-6 sm:w-6 ${type.color}`}
                                        />
                                    </motion.div>
                                    <h4 className="text-foreground text-sm font-semibold sm:text-base">
                                        {type.label}
                                    </h4>
                                </div>
                                <p className="text-muted-foreground text-xs sm:text-sm">
                                    {type.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
