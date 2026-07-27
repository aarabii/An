"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Footer, Navbar } from "@/components/common";
import { PostMeta } from "@/lib/notion";
import { BlogsHeader } from "./BlogsHeader";

interface BlogsClientProps {
  posts: PostMeta[];
}

export default function BlogsClient({ posts }: BlogsClientProps) {
  return (
    <div className="min-h-screen flex flex-col relative text-foreground">
      <Navbar />

      {/* Backdrop filter overlay above global background canvas */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full space-y-16">
          <BlogsHeader />

          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                // Published Articles ({posts.length})
              </h2>
            </div>

            {posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 px-6 text-center border border-dashed border-border rounded-2xl bg-card/40 backdrop-blur-sm space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-accent">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  No Articles Published Yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto font-mono">
                  New blog posts and technical deep-dives will appear here once published in Notion.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="h-full"
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="h-full rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden hover:border-card-border-hover transition-all duration-300 group flex flex-col hover:shadow-xl hover:shadow-accent/5"
                    >
                      {post.coverUrl && (
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-card">
                          <Image
                            src={post.coverUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 font-mono text-xs text-accent font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {post.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
                          {post.keywords.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {post.keywords.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-muted border border-border text-muted-foreground font-mono text-[10px] px-2 py-0.5 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span />
                          )}

                          <span className="font-mono text-xs text-accent/80 group-hover:text-accent flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-all">
                            Read Post <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
