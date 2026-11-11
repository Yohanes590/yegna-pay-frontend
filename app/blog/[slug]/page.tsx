import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "../blog";
import ArticleContent from "./article-content";

interface Props {
    params: Promise<{ slug: string }>;
}

const getSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: getSlug(post.title),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => getSlug(p.title) === slug);

    if (!post) return {};

    const siteUrl = "https://yegnapay.com";
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

export default async function BlogDetails({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => getSlug(p.title) === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans antialiased selection:bg-emerald-500/20 pb-32">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-emerald-500/5 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 pt-28 relative z-10">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-10">
                    <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-slate-400 truncate max-w-[250px] sm:max-w-none">{post.title}</span>
                </nav>

                <article>
                    <header className="space-y-4 mb-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md border border-emerald-500/10">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} />
                                    <time dateTime={new Date(post.date).toISOString().split('T')[0]}>{post.date}</time>
                                </span>
                                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                            {post.title}
                        </h1>
                    </header>

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

                    <ArticleContent post={post} />
                </article>

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
