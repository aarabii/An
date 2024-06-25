"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Preloader } from "@/components/common/Preloader";

import useScrollDirection from "@/hooks/useScrollDirection";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollDirection = useScrollDirection();
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(true);

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoaded(true);
    };

    simulateLoading();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(top >= 0 && top <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {isLoaded ? (
        <div className="flex-1 flex flex-col">
          <Navbar
            btnText="Resume"
            btnFnc={() => router.push("/resume")}
            className={`transition-transform duration-300 ${
              scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
            } ${isTop ? "" : "border-b border-slate-300"}`}
          />
          <main>{children}</main>
          <Footer />
        </div>
      ) : (
        <Preloader />
      )}
    </LazyMotion>
  );
};

export default HomePageLayout;
