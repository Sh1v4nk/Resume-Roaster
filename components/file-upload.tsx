"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            setError(null);

            if (rejectedFiles.length > 0) {
                const rejection = rejectedFiles[0];
                if (rejection.errors[0]?.code === "file-too-large") {
                    setError("File size must be less than 10MB");
                } else if (rejection.errors[0]?.code === "file-invalid-type") {
                    setError("Please upload a PDF or DOCX file");
                } else {
                    setError("Invalid file. Please try again.");
                }
                return;
            }

            if (acceptedFiles.length > 0) {
                onFileUpload(acceptedFiles[0]);
            }
        },
        [onFileUpload],
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/msword": [".doc"],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
    });

    return (
        <div className="w-full">
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Card
                    {...getRootProps()}
                    className={cn(
                        "hover:border-primary/50 cursor-pointer border-2 border-dashed transition-all duration-300 hover:shadow-lg",
                        isDragActive &&
                            !isDragReject &&
                            "border-primary bg-primary/5 scale-[1.02] shadow-lg",
                        isDragReject && "border-destructive bg-destructive/5",
                        error && "border-destructive",
                    )}
                >
                    <div className="p-6 text-center sm:p-8">
                        <input {...getInputProps()} />

                        <motion.div
                            className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full sm:h-16 sm:w-16"
                            animate={isDragActive ? { scale: [1, 1.1, 1] } : {}}
                            transition={{
                                duration: 0.5,
                                repeat: isDragActive ? Number.POSITIVE_INFINITY : 0,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {isDragReject || error ? (
                                    <motion.div
                                        key="error"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <AlertCircle className="text-destructive h-6 w-6 sm:h-8 sm:w-8" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="upload"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 17,
                                        }}
                                    >
                                        <Upload className="text-muted-foreground h-6 w-6 sm:h-8 sm:w-8" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-base font-semibold sm:text-lg">
                                {isDragActive
                                    ? isDragReject
                                        ? "Invalid file type"
                                        : "Drop your resume here"
                                    : "Upload your resume"}
                            </h3>

                            <p className="text-muted-foreground text-sm sm:text-base">
                                {isDragActive
                                    ? isDragReject
                                        ? "Please upload a PDF or DOCX file"
                                        : "Release to upload"
                                    : "Drag and drop your resume here, or click to browse"}
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Choose File
                                </Button>
                            </motion.div>
                            <div className="text-muted-foreground text-xs sm:text-sm">
                                Supports PDF and DOCX • Max 10MB
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                    className="text-destructive mt-4 flex items-center justify-center space-x-2 text-sm"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
