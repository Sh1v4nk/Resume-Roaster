import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                                R
                            </div>
                            <span className="font-bold text-xl">Resume Roaster</span>
                        </div>
                        <p className="text-muted-foreground text-sm">AI-powered resume analysis to help you land your dream job.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/roast" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Resume Analysis
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <Link
                                href="https://github.com/Sh1v4nk"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://x.com/sh1v4nk" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://linkedin.comhttps://www.linkedin.com/in/sh1v4nk/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center">
                    <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Resume Roaster. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
