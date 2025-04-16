import PDFViewer from "@/components/sections/Resume";
import { Metadata } from "next";
import React from "react";

// Add metadata for SEO
export const metadata: Metadata = {
  title: "Aarab Nishchal - Resume",
  description:
    "Professional resume of Aarab Nishchal. View and download PDF format.",
};

export default function ResumePage() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-50">
      <main className="container mx-auto px-2 py-6 min-h-screen">
        {/* <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-fuchsia-400 mb-2">
            Aarab&apos;s Resume
          </h1>
        </header> */}
        <PDFViewer />
      </main>
    </div>
  );
}
