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
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easeInOut,
                delay: 0.2,
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
        <section className="from-primary/10 via-background to-accent/10 relative overflow-hidden bg-gradient-to-br py-12 sm:py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
                >
                    {/* Left side - Content */}
                    <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                        <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
                            <motion.h1
                                variants={itemVariants}
                                className="text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl"
                            >
                                Roast Your Resume Like a{" "}
                                <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                                    Recruiter
                                </span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl"
                            >
                                Upload your resume and get instant feedback, keyword match analysis,
                                and improvement suggestions. See your resume through a
                                recruiter&apos;s eyes and land more interviews.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="group relative w-full overflow-hidden rounded-2xl px-6 py-4 text-base shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
                                >
                                    <Link
                                        href="/roast"
                                        className="flex items-center justify-center"
                                    >
                                        Try It Now
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="text-muted-foreground flex flex-col items-start space-y-3 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8"
                        >
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                <Zap className="text-primary h-4 w-4" />
                                <span>Instant Analysis</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                <TrendingUp className="text-accent h-4 w-4" />
                                <span>AI-Powered Insights</span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side - Visual */}
                    <div className="mt-8 flex justify-center lg:mt-0 lg:justify-end">
                        <motion.div variants={cardVariants} className="relative">
                            {/* Main Resume Analysis Card */}
                            <motion.div
                                variants={floatingVariants}
                                animate="animate"
                                className="from-card via-card to-card/80 border-border/50 relative z-10 w-full max-w-md rounded-3xl border bg-gradient-to-br p-8 shadow-2xl backdrop-blur-sm sm:p-10"
                            >
                                {/* Header */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="from-primary to-accent flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                                            <Zap className="text-primary-foreground h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground font-semibold">
                                                Resume Analysis
                                            </h3>
                                            <p className="text-muted-foreground text-xs">
                                                john-doe-resume.pdf
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white shadow-lg"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                        }}
                                    >
                                        87
                                    </motion.div>
                                </div>

                                {/* Resume Sections */}
                                <div className="mb-6 space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Experience</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                                                    <motion.div
                                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "90%" }}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: 0.5,
                                                        }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-blue-600">
                                                    90
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Skills</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                                                    <motion.div
                                                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "85%" }}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: 0.7,
                                                        }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-green-600">
                                                    85
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Education</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                                                    <motion.div
                                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "95%" }}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: 0.9,
                                                        }}
                                                    ></motion.div>
                                                </div>
                                                <span className="text-xs font-semibold text-purple-600">
                                                    95
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Keywords Section */}
                                <div className="mb-6">
                                    <h4 className="text-foreground mb-3 text-sm font-semibold">
                                        Top Keywords Found
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <motion.div
                                            className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.2 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            React
                                        </motion.div>
                                        <motion.div
                                            className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.4 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            TypeScript
                                        </motion.div>
                                        <motion.div
                                            className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600"
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
                                    className="rounded-xl border border-orange-200/50 bg-gradient-to-r from-orange-50 to-red-50 p-4 dark:border-orange-800/50 dark:from-orange-950/20 dark:to-red-950/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 }}
                                >
                                    <div className="mb-2 flex items-center space-x-2">
                                        <span className="text-lg">🔥</span>
                                        <span className="text-sm font-semibold text-orange-600">
                                            Resume Roast
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-xs italic">
                                        &ldquo;Your experience section is solid, but your skills
                                        could use more quantifiable achievements...&rdquo;
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                className="from-primary/20 to-accent/20 absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br blur-xl"
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{
                                    duration: 20,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            ></motion.div>
                            <motion.div
                                className="from-accent/20 to-primary/20 absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-gradient-to-br blur-xl"
                                animate={{ rotate: -360, scale: [1, 0.9, 1] }}
                                transition={{
                                    duration: 15,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            ></motion.div>

                            {/* Success Badge */}
                            <motion.div
                                className="absolute -top-3 -left-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 2,
                                    type: "spring",
                                    stiffness: 200,
                                }}
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
