import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Blogs,
  Contact,
  ILove,
  Quotes,
} from "./_components";

import RepeatSeparator from "@/components/ui/repeat-separator";
import TopBanner from "@/components/misc/TopBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBanner />
      <Hero />
      <RepeatSeparator />
      <About />
      <RepeatSeparator />
      <ILove />
      <RepeatSeparator />
      <Experience />
      <RepeatSeparator />
      <Skills />
      <RepeatSeparator />
      <Projects />
      <RepeatSeparator />
      <Blogs />
      <RepeatSeparator />
      <Contact />
      <RepeatSeparator />
      <Quotes />
      <RepeatSeparator />
    </main>
  );
}
