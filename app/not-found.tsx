import type { Metadata } from "next";
import { NotFoundGame } from "@/components/mics/404";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Play the 404 tile matching mini game to win your custom victory trophy!",
};

export default function NotFound() {
  return <NotFoundGame />;
}
