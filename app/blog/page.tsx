import { Metadata } from "next";
import NavigationBarRender from "@/components/landing-page/nav-bar";
import BlogCollectionClient from "./blog-collection-client";
import { BLOG_POSTS } from "./blog";

// High-end metadata configuration for search engine optimization indexing
export const metadata: Metadata = {
    title: "The Yegna Pay Blog | Developer-First Fintech Insights",
    description: "Deep dives into payment infrastructure, secure API architecture, and scalable fintech solutions engineered for modern development teams in Ethiopia.",
    alternates: {
        canonical: "https://yegnapay.com/blog",
    },
    openGraph: {
        title: "The Yegna Pay Blog | Fintech Infrastructure",
        description: "Deep dives into payment infrastructure, secure API architecture, and scalable fintech solutions.",
        url: "https://yegnapay.com/blog",
        siteName: "Yegna Pay",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Yegna Pay Blog | Fintech Infrastructure",
        description: "Deep dives into payment infrastructure and scalable fintech solutions.",
    },
};

export default function BlogPage() {
    return (
        <>
            <NavigationBarRender />
            <div className="min-h-screen bg-[#020617] text-slate-300 font-sans antialiased selection:bg-emerald-500/20 relative overflow-hidden">

                {/* Smooth atmospheric backdrop ambient elements */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
                <div className="absolute top-[30%] right-10 w-[600px] h-[500px] rounded-full bg-emerald-600/5 blur-[150px] pointer-events-none" />

                {/* Hero / Header Section */}
                <header className="max-w-4xl mx-auto text-center pt-32 pb-16 px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 mb-4 tracking-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Engineering Changelogs & Insights
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        The Yegna Pay <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">Blog</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Technical articles, architectural case studies, and payment infrastructure guides written straight from our core engineering team.
                    </p>
                </header>

                {/* Hydrating our interactive collection wrapper with raw static array */}
                <BlogCollectionClient initialPosts={BLOG_POSTS} />

                {/* Minimalist Footing */}
                <footer className="border-t border-slate-800 bg-[#020617] py-8 text-center text-xs font-medium text-slate-600 relative z-10">
                    <p>© 2026 Yegna Pay Inc. All software parameters reserved.</p>
                </footer>
            </div>
        </>
    );
}