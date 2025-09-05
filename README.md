<div align="center">

# Resume Roaster

[![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black)](https://nextjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-orange)](https://ai.google.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

**AI-Powered Resume Analysis & Critique Tool**

Get instant, humorous feedback on your resume with detailed analysis, scoring, and improvement suggestions. See your resume through a recruiter's eyes!

[Live Demo](https://resume-roaster.vercel.app) | [Features](#features) | [Tech Stack](#tech-stack)

</div>

---

## Table of Contents

-   [Features](#features)
    -   [Core Features](#core-features)
    -   [Analysis Features](#analysis-features)
    -   [Unique Features](#unique-features)
-   [Tech Stack](#tech-stack)
    -   [Framework & Language](#framework--language)
    -   [Frontend & Styling](#frontend--styling)
    -   [Backend & AI](#backend--ai)
    -   [UI Components & Forms](#ui-components--forms)
    -   [Export & Utilities](#export--utilities)
-   [Installation](#installation)
    -   [Prerequisites](#prerequisites)
    -   [Quick Start](#quick-start)
-   [Configuration](#configuration)
    -   [Environment Variables](#environment-variables)
    -   [Build Commands](#build-commands)
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
    -   [Development Setup](#development-setup)
    -   [Guidelines](#guidelines)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)
-   [Contact](#contact)

---

## Features

### Core Features

-   **Multi-Format Upload** - Support for PDF and DOCX formats
-   **Google Gemini AI** - Advanced AI-powered resume analysis
-   **Comprehensive Scoring** - Detailed evaluation metrics and insights
-   **Interactive Charts** - Visual representation of resume health
-   **Dark Mode** - Beautiful theme switching with system preference detection
-   **Fully Responsive** - Works perfectly on all devices

### Analysis Features

-   **Keyword Matching** - Compare against job descriptions
-   **Section Completeness** - Evaluate resume structure and content
-   **Content Quality** - AI-powered writing feedback and suggestions
-   **Formatting Analysis** - Visual and structural assessment
-   **Recruiter Perspective** - See your resume as hiring managers do

### Unique Features

-   **Humorous Critique** - Entertaining roast-style feedback
-   **PDF Export** - Download your analysis report
-   **Real-time Processing** - Instant results with progress tracking
-   **Theme Adaptation** - Charts and UI adapt to light/dark themes

---

## Tech Stack

### Framework & Language

-   **Framework:** [Next.js 14](https://nextjs.com/) - React framework with App Router
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
-   **Runtime:** [Bun](https://bun.sh/) - Fast JavaScript runtime & package manager

### Frontend & Styling

-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
-   **Icons:** [Lucide React](https://lucide.dev/) - Beautiful & consistent icon set
-   **Charts:** [Recharts](https://recharts.org/) - Composable charting library
-   **Themes:** [next-themes](https://github.com/pacocoursey/next-themes) - Theme switching

### Backend & AI

-   **AI Engine:** [Google Gemini](https://ai.google.dev/) - Advanced AI for resume analysis
-   **File Processing:**
    -   [PDF.js](https://mozilla.github.io/pdf.js/) - PDF parsing
    -   [Mammoth](https://github.com/moxystudio/node-mammoth) - DOCX processing
-   **API:** Next.js API Routes - Serverless backend functions

### UI Components & Forms

-   **Component Library:** [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
-   **Form Handling:** [React Hook Form](https://react-hook-form.com/) - Performant forms
-   **Validation:** [Zod](https://zod.dev/) - TypeScript-first schema validation
-   **File Upload:** [React Dropzone](https://react-dropzone.js.org/) - Drag & drop file uploads
-   **Notifications:** [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

### Export & Utilities

-   **PDF Export:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/) - Report generation
-   **Utilities:** [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Class management
-   **Styling:** [class-variance-authority](https://cva.style/) - Component variants

---

## Installation

### Prerequisites

-   **Node.js** 18+ or **Bun** (recommended)
-   **Git** for cloning the repository

### Quick Start

1. **Clone the repository**

    ```bash
    git clone https://github.com/Sh1v4nk/Resume-Roaster.git
    cd Resume-Roaster
    ```

2. **Install dependencies**

    ```bash
    # Using Bun (recommended)
    bun install

    # Or using npm
    npm install

    # Or using yarn
    yarn install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    GOOGLE_AI_API_KEY=your_google_ai_api_key_here
    ```

    > **Get your Google AI API key:**
    >
    > 1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
    > 2. Create a new API key
    > 3. Copy the key to your `.env.local` file

4. **Run the development server**

    ```bash
    # Using Bun
    bun dev

    # Or using npm
    npm run dev

    # Or using yarn
    yarn dev
    ```

5. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## Configuration

### Environment Variables

| Variable            | Description                           | Required |
| ------------------- | ------------------------------------- | -------- |
| `GOOGLE_AI_API_KEY` | Google Gemini API key for AI analysis | ✅ Yes   |

### Build Commands

```bash
# Development
bun dev

# Production build
bun run build

# Start production server
bun start

# Lint code
bun run lint
```

---

## Project Structure

```
Resume-Roaster/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── analyze/       # Analysis endpoint
│   │   ├── health/        # Health check endpoint
│   │   └── roast/         # Resume roast endpoint
│   ├── globals.css        # Global styles & theme variables
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── roast/             # Roast page route
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── charts.tsx        # Chart components
│   ├── file-upload.tsx   # File upload component
│   ├── hero-section.tsx  # Hero section
│   ├── navbar.tsx        # Navigation component
│   ├── results-display.tsx # Results display
│   └── ...
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

---

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Guidelines

-   Follow the existing code style
-   Add tests for new features
-   Update documentation as needed
-   Ensure all tests pass
-   Keep PRs focused on a single feature

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

-   **Google Gemini** for powering the AI analysis
-   **Vercel** for hosting and deployment
-   **Radix UI** for accessible component primitives
-   **Tailwind CSS** for the styling system
-   **Framer Motion** for smooth animations

---

## Contact

**Shivank Pandey**

-   **Email:** shivankpandey113@gmail.com
-   **Twitter:** [@sh1v4nk](https://twitter.com/sh1v4nk)
-   **LinkedIn:** [Shivank Pandey](https://www.linkedin.com/in/sh1v4nk/)
-   **Discord:** sh1v4nk#1137

---

<div align="center">

**Made with ❤️ by Shivank Pandey**

[⭐ Star this repo](https://github.com/Sh1v4nk/Resume-Roaster) if you found it helpful!

</div>
