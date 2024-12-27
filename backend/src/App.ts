import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateRoastPrompt, SAFETY_SETTINGS } from "./configs";

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : process.env.CLIENT_URL,
};

app.use(cors(corsOptions));

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed!"));
    } else {
      cb(null, true);
    }
  },
});

// AI content generation helper
async function generateRoastContent(
  model: any,
  prompt: string
): Promise<string> {
  try {
    const roast = await model.generateContent(prompt);
    return roast.response.text();
  } catch (err) {
    throw new Error(`Failed to generate content: ${(err as Error).message}`);
  }
}

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "API is working" });
});

// POST handler for uploading and processing files
app.post(
  "/roast-resume",
  upload.single("resume"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No resume file uploaded" });
        return;
      }

      const pdfData = await pdf(req.file.buffer);
      const resumeContent = pdfData.text;

      if (!resumeContent || resumeContent.trim().length === 0) {
        res.status(400).json({ error: "Unable to extract text from resume" });
        return;
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: SAFETY_SETTINGS,
      });

      const prompt = generateRoastPrompt(resumeContent);
      const roastText = await generateRoastContent(model, prompt);

      res.status(200).json({
        message: "Success",
        roast: roastText,
      });
    } catch (error) {
      console.error("Error in POST handler:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
