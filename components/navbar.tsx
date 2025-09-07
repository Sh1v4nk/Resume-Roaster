"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion, easeOut } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: easeOut,
            },
        },
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <motion.div
                                className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                R
                            </motion.div>
                            <span className="text-lg font-bold sm:text-xl">Resume Roaster</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center space-x-4 md:flex">
                        <ModeToggle />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild>
                                <Link href="/roast">Try It Now</Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <ModeToggle />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-2 transition-colors"
                        >
                            <motion.div
                                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate={isMobileMenuOpen ? "visible" : "hidden"}
                    className="overflow-hidden md:hidden"
                >
                    <div className="space-y-1 border-t px-2 pt-2 pb-3">
                        <div className="flex flex-col space-y-2 pt-4">
                            <Button asChild className="w-full">
                                <Link href="/roast" onClick={() => setIsMobileMenuOpen(false)}>
                                    Try It Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
