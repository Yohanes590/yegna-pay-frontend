import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Tag, Bookmark } from "lucide-react";
import { BLOG_POSTS } from "../blog"; // Adjust path based on your file structure
import CodeBlock from "./code-block";

interface Props {
    params: Promise<{ slug: string }>;
}

// Global deterministic URL slugifier helper
const getSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

/**
 * 1. SSG Optimization: generateStaticParams
 * Instructs Next.js to pre-compile these HTML nodes during production build pipelines
 */
export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: getSlug(post.title),
    }));
}

/**
 * 2. Search Engine Optimization: generateMetadata
 * Compiles unique structural metadata headers dynamically for crawling bots
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => getSlug(p.title) === slug);

    if (!post) return {};

    const siteUrl = "https://yegnapay.com"; // Swap with production host domain
    const articleUrl = `${siteUrl}/blog/${slug}`;

    return {
        title: `${post.title} | Yegna Pay Blog`,
        description: post.description,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: articleUrl,
            siteName: "Yegna Pay",
            type: "article",
            publishedTime: new Date(post.date).toISOString(),
            authors: ["Yegna Pay Core Engineering"],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

/**
 * 3. Server Core Page Component
 */
export default async function BlogDetails({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => getSlug(p.title) === slug);

    // If the record parameter isn't found, trigger the native global Next.js 404 router
    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans antialiased selection:bg-emerald-500/20 pb-32">

            {/* Atmospheric background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 pt-28 relative z-10">

                {/* Clean Breadcrumb Trail */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-10">
                    <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-slate-400 truncate max-w-[250px] sm:max-w-none">{post.title}</span>
                </nav>

                {/* Semantic Article Wrapper */}
                <article>
                    <header className="space-y-4 mb-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md border border-emerald-500/10">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} />
                                    <time dateTime={new Date(post.date).toISOString().split('T')}>{post.date}</time>
                                </span>
                                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime}</span>
                            </div>
                        </div>

                        {/* Highly-Critical Semantic H1 Entry Point */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                            {post.title}
                        </h1>
                    </header>

                    {/* Team Profile Block */}
                    <div className="flex items-center justify-between border-y border-slate-800/80 py-4 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-slate-950 shadow-inner">
                                YP
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Yegna Pay Engineering</p>
                                <p className="text-xs text-slate-500">Core Infrastructure Team</p>
                            </div>
                        </div>
                        <div className="hidden sm:block text-right">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500/90 bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/10">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Update
                            </span>
                        </div>
                    </div>

                    {/* Post Content Sections */}
                    <div className="space-y-8 text-slate-300 text-[16px] sm:text-[17px] leading-relaxed">

                        {/* Excerpt Block */}
                        <p className="text-lg text-slate-200 font-medium border-l-2 border-emerald-500 pl-5 my-6 py-1 bg-slate-900/40 rounded-r-xl leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Content Preview Paragraph Loop */}
                        <div className="space-y-6">
                            {post.contentPreview.map((paragraph, index) => (
                                <p key={index} className="text-slate-300 font-normal">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Technical Highlights Section */}
                        {post.highlights && post.highlights.length > 0 && (
                            <section className="my-8 p-6 rounded-2xl bg-[#090f1e]/60 border border-slate-800/80" aria-label="Key Highlights">
                                <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2">
                                    <Bookmark size={14} className="text-emerald-400" /> Key Engineering Highlights
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {post.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-2 text-slate-300">
                                            <span className="text-emerald-400 mt-1 font-bold" aria-hidden="true">✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Isolated Client Component Code Snippet */}
                        {/* <CodeBlock slug={slug} /> */}

                        {/* Tags Infrastructure Layout */}
                        {post.tags && post.tags.length > 0 && (
                            <footer className="pt-4 flex flex-wrap items-center gap-2">
                                <Tag size={13} className="text-slate-500 mr-1" aria-hidden="true" />
                                {post.tags.map((tag, index) => (
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
                </article>

                {/* Outer Document Footer Metadata */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-medium text-slate-500">
                    <span>© 2026 Yegna Pay Inc. All rights reserved.</span>
                    <a
                        href="https://docs.yegnapay.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                    >
                        Read Technical Documentation →
                    </a>
                </div>

            </div>
        </div>
    );
}