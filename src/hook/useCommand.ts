"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface useCmdProps {
    onCmdOpn: () => void;
}

export function useCommand({ onCmdOpn }: useCmdProps) {
    const router = useRouter();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const modifier = event.metaKey || event.ctrlKey;

            if (!modifier) return;

            switch (event.key.toLowerCase()) {
                case "k":
                    event.preventDefault();
                    onCmdOpn();
                    break;

                case "backspace":
                    event.preventDefault();
                    router.push("/");
                    break;

                case "p":
                    event.preventDefault();
                    router.push("/projects");
                    break;

                case "b":
                    event.preventDefault();
                    router.push("/blogs");
                    break;

                case "c":
                    event.preventDefault();
                    router.push("/contact");
                    break;

                case "/":
                    event.preventDefault();
                    router.push("/resume");
                    break;

                case "r":
                    event.preventDefault();
                    router.push("/resources");
                    break;

                case "s":
                    event.preventDefault();
                    router.push("/recommendations");
                    break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [router, onCmdOpn]);
}
