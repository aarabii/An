"use client";

import React from "react";
import { motion } from "motion/react";

import { profile } from "@/constant";

export const LicenseDocumentTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-10 space-y-8 font-mono text-xs sm:text-sm leading-relaxed text-muted-foreground shadow-2xl"
    >
      <div className="border-b border-border/40 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground uppercase tracking-wider">
            Custom Portfolio License
          </h2>
          <span className="text-xs text-accent">
            Copyright (c) 2026 Aarab Nishchal
          </span>
        </div>
        <span className="px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
          Official Legal Document
        </span>
      </div>

      <div className="space-y-6">
        <p>
          This license governs the use, modification, and distribution of this
          software and its associated source code, design, and documentation
          (collectively, the "Software"), authored and owned by Aarab Nishchal
          (the "Author").
        </p>
        <p>
          By cloning, forking, downloading, or otherwise using the Software, you
          ("User") agree to be bound by the terms below.
        </p>

        <hr className="border-border/40" />

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            1. Definitions
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">"Software"</strong> means the
              source code, styles, components, assets, and documentation
              contained in this repository.
            </li>
            <li>
              <strong className="text-foreground">"Personal Use"</strong> means
              using the Software, modified or unmodified, to build and publish
              your own individual or organizational portfolio, website, or
              project for yourself.
            </li>
            <li>
              <strong className="text-foreground">"Resale"</strong> means
              distributing, sublicensing, selling, or offering the Software — in
              original or modified form — as a standalone product, template,
              theme, boilerplate, starter kit, or paid deliverable to a third
              party.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            2. Grant of Permission
          </h3>
          <p className="mb-2">
            Subject to Section 3 restrictions, the Author grants you a
            worldwide, royalty-free, non-exclusive license to:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Clone and fork this repository.</li>
            <li>
              Modify the Software in any way to fit your personal portfolio.
            </li>
            <li>
              Deploy and publish your modified version as your own personal
              portfolio.
            </li>
            <li>
              Use it privately for learning, experimentation, or internal
              tooling.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">
            3. Restrictions
          </h3>
          <p className="mb-2">You may NOT, under any circumstances:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-rose-300/90">
            <li>
              Resell or redistribute the Software as a paid or free template or
              starter kit.
            </li>
            <li>Build client deliverables from this Software for payment.</li>
            <li>Sublicense the Software under different terms.</li>
            <li>Remove or alter this license file or copyright notice.</li>
            <li>
              Claim original authorship of the underlying codebase or design
              system.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            4. Attribution
          </h3>
          <p>
            Attribution is not required on your live site, but keeping this
            LICENSE file in your repository satisfies all attribution
            requirements.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            5. Termination
          </h3>
          <p>
            Any violation of Section 3 automatically terminates your rights
            under this license.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            6. No Warranty
          </h3>
          <p className="uppercase text-[11px] tracking-wider text-muted-foreground/80 bg-muted/40 p-4 rounded-xl border border-border/40">
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED... IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
            CLAIM, DAMAGES, OR OTHER LIABILITY.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            7. Governing Terms
          </h3>
          <p>
            This license does not grant trademark rights to the Author's name or
            personal identity. Personal photos, resume copy, and bio content
            specific to Aarab Nishchal must be replaced.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
            8. Contact
          </h3>
          <p>
            For licensing questions or commercial exceptions, contact:{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline hover:text-foreground font-semibold"
            >
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
