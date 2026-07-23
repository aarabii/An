"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Footer, Navbar } from "@/components/common";
import { Post } from "@/lib/notion";

interface BlogPostClientProps {
  post: Post;
  markdownContent: string;
}

export default function BlogPostClient({ post, markdownContent }: BlogPostClientProps) {
  const { title, description, keywords, date, coverUrl } = post.meta;

  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto w-full space-y-10">
          {/* Top Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-accent transition-colors group px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl hover:border-neutral-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Articles</span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 border-b border-neutral-800 pb-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-accent">
              <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {keywords.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-neutral-400" />
                  {keywords.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 px-2 py-0.5 rounded-md text-[11px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-neutral-400 font-mono text-sm sm:text-base leading-relaxed max-w-3xl">
                {description}
              </p>
            )}

            {coverUrl && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-2xl mt-6">
                <Image
                  src={coverUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}
          </motion.header>

          {/* Article Body / Markdown Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert max-w-none space-y-6 text-neutral-300 font-sans"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground mt-10 mb-4 border-b border-neutral-800 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 border-b border-neutral-800/60 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline underline-offset-4 font-mono text-sm transition-colors"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-300 font-sans text-sm sm:text-base">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-300 font-sans text-sm sm:text-base">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-neutral-300 leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-accent pl-4 py-2 my-6 bg-neutral-900/50 rounded-r-xl italic text-neutral-300">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match && !className?.includes("code-block");
                  if (isInline) {
                    return (
                      <code
                        className="bg-neutral-800/80 text-accent font-mono text-xs px-1.5 py-0.5 rounded border border-neutral-700/50"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="relative my-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs sm:text-sm text-neutral-200 overflow-x-auto">
                      {match && (
                        <div className="absolute top-2 right-3 font-mono text-[10px] text-neutral-500 uppercase">
                          {match[1]}
                        </div>
                      )}
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </div>
                  );
                },
                img: ({ src, alt }) => (
                  <span className="block my-6">
                    <img
                      src={src}
                      alt={alt || ""}
                      className="rounded-2xl border border-neutral-800 max-w-full h-auto mx-auto shadow-lg"
                    />
                  </span>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </motion.article>
        </main>

        <Footer />
      </div>
    </div>
  );
}
