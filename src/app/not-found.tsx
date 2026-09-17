import { Navbar, Footer } from "@/components/common";
import { NotFoundGame } from "@/components/not-found-game";

export default function NotFound() {
  return (
    <body className="min-h-full flex flex-col">
      <Navbar />
      <NotFoundGame />
      <Footer />
    </body>
  );
}
