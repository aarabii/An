import Hero from "./_components/Hero";
import About from "./_components/About";
import RepeatSeparator from "../../components/ui/repeat-separator";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <RepeatSeparator />
            <About />
            <RepeatSeparator />
        </main>
    );
}
