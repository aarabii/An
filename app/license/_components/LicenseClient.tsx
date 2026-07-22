"use client";

import React, { useState } from "react";

import { Footer, Navbar } from "@/components/common";
import { SECTIONS_DATA } from "./license-data";
import { LicenseCodeTab } from "./LicenseCodeTab";
import { LicenseContactBanner } from "./LicenseContactBanner";
import { LicenseDocumentTab } from "./LicenseDocumentTab";
import { LicenseHeader } from "./LicenseHeader";
import { LicenseModeSwitch } from "./LicenseModeSwitch";
import { LicenseOverviewTab } from "./LicenseOverviewTab";

export default function LicenseClient() {
  const [activeTab, setActiveTab] = useState<"overview" | "document" | "code">(
    "overview"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = SECTIONS_DATA.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.subtitle.toLowerCase().includes(q) ||
      sec.points?.some((p) => p.toLowerCase().includes(q)) ||
      sec.items?.some(
        (i) => i.term.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above global background canvas/shader */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <LicenseHeader />

          <LicenseModeSwitch
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {activeTab === "overview" && (
            <LicenseOverviewTab sections={filteredSections} />
          )}

          {activeTab === "document" && <LicenseDocumentTab />}

          {activeTab === "code" && <LicenseCodeTab />}

          <LicenseContactBanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}
