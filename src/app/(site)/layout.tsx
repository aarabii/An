import { Navbar, Footer } from "@/components/common";

export default function MainSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="min-h-full flex flex-col">
      <Navbar />
      <div className="relative mx-auto min-h-screen w-full max-w-178 border-x border-border">
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </div>
    </body>
  );
}
