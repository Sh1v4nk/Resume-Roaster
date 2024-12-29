import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

// RoastFormatter Component
function RoastFormatter({ roast }: { roast: string }) {
  const formattedRoast = roast.split("\n\n").map((paragraph, index) => {
    const boldedText = paragraph.replace(
      /(\*\*.*?\*\*)/g,
      (match) =>
        `<strong class="text-yellow-400">${match.replace(/\*\*/g, "")}</strong>`
    );

    const italicizedText = boldedText.replace(
      /(\*.*?\*)/g,
      (match) => `<em class="text-neutral-300">${match.replace(/\*/g, "")}</em>`
    );

    return (
      <p
        key={index}
        className="text-sm leading-relaxed text-neutral-300 mb-4"
        dangerouslySetInnerHTML={{ __html: italicizedText }}
      ></p>
    );
  });

  return (
    <Card className="bg-neutral-800 text-white p-6 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-neutral-100 mb-4">
          Your Roast
        </CardTitle>
        <CardDescription className="text-neutral-400">
          A brutally honest critique of your resume, served fresh.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{formattedRoast}</CardContent>
    </Card>
  );
}

// Main ResumeRoaster Component
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
      const response = await fetch("http://localhost:3000/roast-resume", {
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
                Generating Roast
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
