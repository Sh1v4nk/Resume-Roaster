import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-t from-muted/30 to-background border-t border-border/50">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Brand Section */}
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg">
                                R
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Resume Roaster
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                            AI-powered resume analysis to help you land your dream job
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/roast" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
                            Analyze Resume
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground text-sm mr-2">Follow us:</span>
                        <div className="flex space-x-3">
                            <Link
                                href="https://github.com/Sh1v4nk/Resume-Roaster"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub Repository</span>
                            </Link>
                            <Link
                                href="https://x.com/sh1v4nk"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                            >
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/sh1v4nk/"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-4 border-t border-border/30 w-full max-w-md mx-auto">
                        <span>© {new Date().getFullYear()} Resume Roaster</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                            <span>Made with</span>
                            <Heart className="h-3 w-3 text-red-500 fill-current" />
                            <span>by</span>
                            <Link
                                href="https://github.com/Sh1v4nk"
                                className="hover:text-primary transition-colors duration-200 font-medium"
                            >
                                Shivank
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
