import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="from-muted/30 to-background border-border/50 relative border-t bg-gradient-to-t">
            {/* Decorative background elements */}
            <div className="from-primary/5 to-accent/5 absolute inset-0 bg-gradient-to-r via-transparent"></div>
            <div className="via-primary/20 absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 transform bg-gradient-to-r from-transparent to-transparent"></div>

            <div className="relative container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-6">
                    {/* Brand Section */}
                    <div className="space-y-3 text-center">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="from-primary to-accent text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold shadow-lg">
                                R
                            </div>
                            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                Resume Roaster
                            </span>
                        </div>
                        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
                            AI-powered resume analysis to help you land your dream job
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link
                            href="/roast"
                            className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200"
                        >
                            Analyze Resume
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground mr-2 text-sm">Follow us:</span>
                        <div className="flex space-x-3">
                            <Link
                                href="https://github.com/Sh1v4nk/Resume-Roaster"
                                className="bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub Repository</span>
                            </Link>
                            <Link
                                href="https://x.com/sh1v4nk"
                                className="bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                            >
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/sh1v4nk/"
                                className="bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-muted-foreground border-border/30 mx-auto flex w-full max-w-md items-center justify-center space-x-2 border-t pt-4 text-xs">
                        <span>© {new Date().getFullYear()} Resume Roaster</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                            <span>Made with</span>
                            <Heart className="h-3 w-3 fill-current text-red-500" />
                            <span>by</span>
                            <Link
                                href="https://github.com/Sh1v4nk"
                                className="hover:text-primary font-medium transition-colors duration-200"
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
