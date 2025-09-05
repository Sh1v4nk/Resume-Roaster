import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Resume Roast - AI-Powered Resume Analysis",
    description: "Get instant AI-powered feedback on your resume with detailed analysis, scoring, and improvement suggestions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-sans antialiased`}>
                <Navbar />
                {children}
                <Toaster position="top-right" richColors closeButton expand={false} visibleToasts={3} />
            </body>
        </html>
    );
}
