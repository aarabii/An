import Hero from "./_components/Hero";
import About from "./_components/About";
import Skills from "./_components/Skills";
import Experience from "./_components/Experience";

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
