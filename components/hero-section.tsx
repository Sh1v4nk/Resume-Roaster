"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { motion, easeOut, easeInOut } from "motion/react";

export function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
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
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: easeOut,
                delay: 0.4,
            },
        },
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: easeInOut,
            },
        },
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 sm:py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center"
                >
                    {/* Left side - Content */}
                    <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                        <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
                            <motion.h1
                                variants={itemVariants}
                                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl text-balance"
                            >
                                Roast Your Resume Like a{" "}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recruiter</span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
                            >
                                Upload your resume and get instant feedback, keyword match analysis, and improvement suggestions. See your
                                resume through a recruiter&apos;s eyes and land more interviews.
                            </motion.p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto relative overflow-hidden group"
                                >
                                    <Link href="/roast" className="flex items-center justify-center">
                                        Try It Now
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground"
                        >
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Zap className="h-4 w-4 text-primary" />
                                <span>Instant Analysis</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <TrendingUp className="h-4 w-4 text-accent" />
                                <span>AI-Powered Insights</span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side - Visual */}
                    <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                        <motion.div variants={cardVariants} className="relative">
                            {/* Main Resume Analysis Card */}
                            <motion.div
                                variants={floatingVariants}
                                animate="animate"
                                className="relative z-10 rounded-3xl bg-gradient-to-br from-card via-card to-card/80 p-8 sm:p-10 shadow-2xl border border-border/50 max-w-md w-full backdrop-blur-sm"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">Resume Analysis</h3>
                                            <p className="text-xs text-muted-foreground">john-doe-resume.pdf</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        87
                                    </motion.div>
                                </div>

                                {/* Resume Sections */}
                                <div className="space-y-4 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Experience</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "90%" }}
                                                        transition={{ duration: 1.5, delay: 0.5 }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-blue-600">90</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Skills</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "85%" }}
                                                        transition={{ duration: 1.5, delay: 0.7 }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-green-600">85</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Education</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "95%" }}
                                                        transition={{ duration: 1.5, delay: 0.9 }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-purple-600">95</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Keywords Section */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold mb-3 text-foreground">Top Keywords Found</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <motion.div
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.2 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            React
                                        </motion.div>
                                        <motion.div
                                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.4 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            TypeScript
                                        </motion.div>
                                        <motion.div
                                            className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-xs font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.6 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Node.js
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Roast Preview */}
                                <motion.div
                                    className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-800/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 }}
                                >
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-lg">🔥</span>
                                        <span className="text-sm font-semibold text-orange-600">Resume Roast</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground italic">
                                        &ldquo;Your experience section is solid, but your skills could use more quantifiable
                                        achievements...&rdquo;
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -top-6 -right-6 h-20 w-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-6 -left-6 h-16 w-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl"
                                animate={{ rotate: -360, scale: [1, 0.9, 1] }}
                                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            ></motion.div>

                            {/* Success Badge */}
                            <motion.div
                                className="absolute -top-3 -left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 2, type: "spring", stiffness: 200 }}
                            >
                                ✓ Analyzed
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
