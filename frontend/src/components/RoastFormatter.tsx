import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export function RoastFormatter({ roast }: { roast: string }) {
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
