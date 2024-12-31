import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoastFormatter } from "@/components/RoastFormatter";

const API_URL: string =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/roast-resume" // Local URL in development
    : import.meta.env.VITE_SERVER_URL || "/roast-resume";

export default function ResumeRoaster() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setRoast(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const analyzeResume = async () => {
    if (!file) return;
    setIsLoading(true);
    setRoast(null);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate roast");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resetHandler = () => {
    setFile(null);
    setRoast(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Upload Section */}
        {!roast && (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed border-neutral-800 rounded-lg
              p-12 text-center cursor-pointer transition-colors
              hover:border-neutral-700 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-neutral-800
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2 text-white">
              <Upload className="h-10 w-10 text-white" />
              <p className="text-md lg:text-lg">
                {file ? file.name : "Drop your resume here or click to browse"}
              </p>
              <p className="text-sm text-white/65">Supports PDF files only</p>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        {!roast && (
          <Button
            variant="default"
            className="w-full rounded-lg h-12 text-md"
            onClick={analyzeResume}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-7 w-7 animate-spin text-black" />
                Generating Roast...
              </>
            ) : (
              "Generate Roast"
            )}
          </Button>
        )}

        {/* Display Roast */}
        {roast && (
          <div className="w-full max-w-2xl">
            <RoastFormatter roast={roast} />
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="p-2 rounded-full"
                onClick={resetHandler}
              >
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-800 p-4 rounded-lg text-white">
            <h3 className="text-lg font-bold mb-2">Error:</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
