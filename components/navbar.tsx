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
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
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
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                R
                            </motion.div>
                            <span className="font-bold text-lg sm:text-xl">Resume Roaster</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/"
                                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Home
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/roast"
                                    className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Roast My Resume
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ModeToggle />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild>
                                <Link href="/roast">Try It Now</Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ModeToggle />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate={isMobileMenuOpen ? "visible" : "hidden"}
                    className="md:hidden overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/roast"
                            className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Roast My Resume
                        </Link>
                        <div className="pt-4 flex flex-col space-y-2">
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
