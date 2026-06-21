"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowUpRight, Inbox } from "lucide-react";

const CATEGORIES = ["All", "API", "Security", "Guides", "Fintech"];

interface BlogPost {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    readingTime: string;
}

interface BlogCollectionClientProps {
    initialPosts: BlogPost[];
}

export default function BlogCollectionClient({ initialPosts }: BlogCollectionClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Matches dynamic parameter routing systems across build lifecycles
    const getSlug = (title: string) =>
        title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");

    // Filtering Pipeline Execution
    const filteredPosts = initialPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            {/* Search & Filter Controls Toolbar */}
            <section className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">

                    {/* Premium Minimal Search Container */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search articles or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#090f1e] border border-slate-800/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all backdrop-blur-sm shadow-inner"
                        />
                        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    </div>

                    {/* Text Pill Filters */}
                    <div className="flex flex-wrap gap-1.5 items-center" role="tablist" aria-label="Filter blog posts by category">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                role="tab"
                                aria-selected={activeCategory === category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-tight border transition-all duration-150 ${activeCategory === category
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                    : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* Blog Cards Grid System */}
            <main className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl max-w-sm mx-auto flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                            <Inbox size={18} />
                        </div>
                        <p className="text-slate-400 font-semibold text-sm">No articles matched your criteria</p>
                        <p className="text-slate-500 text-xs mt-1">Try adjusting keywords or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${getSlug(post.title)}`}
                                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/30 backdrop-blur-md border border-slate-800/60 hover:border-slate-700/60 hover:bg-slate-900/50 transition-all duration-200 shadow-xl overflow-hidden cursor-pointer"
                            >
                                <div>
                                    {/* Card Top Meta Layout */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-md border border-emerald-500/10">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} /> {post.readingTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Post Title */}
                                    <h2 className="text-xl font-bold tracking-tight text-white mb-2.5 group-hover:text-emerald-400 transition-colors duration-150 line-clamp-2 leading-snug">
                                        {post.title}
                                    </h2>

                                    {/* Post Short Excerpt */}
                                    <p className="text-sm text-slate-400 font-normal leading-relaxed mb-6 line-clamp-3">
                                        {post.description}
                                    </p>
                                </div>

                                {/* Action Trigger Area */}
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors mt-auto pt-4 border-t border-slate-800/40">
                                    <span>Read full log</span>
                                    <ArrowUpRight size={14} className="transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-500 group-hover:text-emerald-400" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}