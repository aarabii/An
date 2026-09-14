import { Hero, About, Skills, Experience } from "./_components";

import RepeatSeparator from "../../components/ui/repeat-separator";
import TopBanner from "@/components/misc/TopBanner";

export default function Home() {
    return (
        <main className="min-h-screen">
            <TopBanner />
            <Hero />
            <RepeatSeparator />
            <About />
            <RepeatSeparator />
            <Skills />
            <RepeatSeparator />
            <Experience />
            <RepeatSeparator />
        </main>
    );
}
