import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
}
