import React from "react";
import { Bookmark, Tag } from "lucide-react";
import { BLOG_POSTS } from "../blog";

export type BlogPost = (typeof BLOG_POSTS)[number];

export default function ArticleContent({ post }: { post: BlogPost }) {
    return (
        <div className="space-y-8 text-slate-300 text-[16px] sm:text-[17px] leading-relaxed">
            <p className="text-lg text-slate-200 font-medium border-l-2 border-emerald-500 pl-5 my-6 py-1 bg-slate-900/40 rounded-r-xl leading-relaxed">
                {post.excerpt}
            </p>

            <div className="space-y-6">
                {post.contentPreview.map((paragraph: string, index: number) => (
                    <p key={index} className="text-slate-300 font-normal">
                        {paragraph}
                    </p>
                ))}
            </div>

            {post.highlights && post.highlights.length > 0 && (
                <section className="my-8 p-6 rounded-2xl bg-[#090f1e]/60 border border-slate-800/80" aria-label="Key Highlights">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2">
                        <Bookmark size={14} className="text-emerald-400" /> Key Engineering Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        {post.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-slate-300">
                                <span className="text-emerald-400 mt-1 font-bold" aria-hidden="true">✓</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {post.tags && post.tags.length > 0 && (
                <footer className="pt-4 flex flex-wrap items-center gap-2">
                    <Tag size={13} className="text-slate-500 mr-1" aria-hidden="true" />
                    {post.tags.map((tag: string, index: number) => (
                        <span
                            key={index}
                            className="text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800/60 px-2.5 py-1 rounded-lg"
                        >
                            #{tag}
                        </span>
                    ))}
                </footer>
            )}
        </div>
    );
}
