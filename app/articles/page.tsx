"use client";

import { FileText, Search, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/components/AuthContext";
import { articles } from "@/data/articles";

export default function ArticlesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All", "Film & Animation", "Music", "Pets & Animals",
        "Sports", "Travel & Events", "Gaming",
        "People & Blogs", "Comedy", "Entertainment",
        "News & Politics", "How-to & Style",
        "Non-profits & Activism", "Religion", "Other"
    ];


    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-2xl shadow-lg ring-1 ring-accent/20">
                            <FileText className="w-8 h-8 text-accent" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl font-black text-foreground italic uppercase tracking-tighter">
                            Most recent articles
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            if (user) {
                                router.push("/articles/create");
                            } else {
                                router.push("/login?redirect=/articles/create");
                            }
                        }}
                        className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase transition-all active:scale-95 shadow-xl shadow-accent/20"
                    >
                        <Plus size={18} strokeWidth={4} />
                        Create article
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content - Articles Feed */}
                    <div className="lg:col-span-8 space-y-8">
                        {filteredArticles.length > 0 ? (
                            <>
                                {filteredArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="group bg-surface rounded-[2.5rem] overflow-hidden border border-foreground/5 shadow-2xl shadow-black/5 hover:shadow-accent/5 transition-all duration-500 hover:scale-[1.01]"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-72 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 p-8 flex flex-col">
                                                <h2 className="text-2xl font-black text-foreground mb-3 group-hover:text-accent transition-colors">
                                                    {article.title}
                                                </h2>
                                                <p className="text-foreground/60 text-lg mb-8 line-clamp-2 italic font-medium">
                                                    {article.description}
                                                </p>
                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-foreground/5">
                                                    <span className="text-sm font-black text-foreground/30 uppercase tracking-widest">
                                                        {article.date}
                                                    </span>
                                                    <Link
                                                        href={`/read/${article.id}`}
                                                        className="flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 px-6 py-2.5 rounded-xl text-foreground font-black text-xs uppercase tracking-tighter transition-all italic group/btn"
                                                    >
                                                        Read more
                                                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={3} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-8 flex justify-center">
                                    <button className="px-12 py-4 bg-background border border-foreground/10 rounded-2xl font-black text-foreground uppercase italic tracking-tighter hover:bg-surface transition-all shadow-xl shadow-black/5">
                                        Show more
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-surface rounded-[2.5rem] border border-dashed border-foreground/10">
                                <FileText className="w-16 h-16 text-foreground/10 mb-6" />
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter italic">No post found!</h3>
                                <p className="text-foreground/40 mt-2 font-bold">Try selecting a different category or search term.</p>
                                <button
                                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                                    className="mt-8 text-accent font-black uppercase text-sm italic hover:underline"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Search & Categories */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Search Bar */}
                        <div className="bg-surface p-6 rounded-[2rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search for articles"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold shadow-inner"
                                />
                                <button className="absolute right-2 top-2 p-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/20">
                                    <Search size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Categories Chips */}
                        <div className="bg-surface p-8 rounded-[2rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter italic mb-8 pb-4 border-b border-foreground/5">
                                Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={clsx(
                                            "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter transition-all border",
                                            cat === selectedCategory
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/10"
                                                : "bg-background border-foreground/10 text-foreground/50 hover:border-accent hover:text-accent"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Most Popular */}
                        <div className="bg-surface p-8 rounded-[2rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter italic mb-8 pb-4 border-b border-foreground/5">
                                Most popular
                            </h3>
                            <div className="space-y-6">
                                {articles.slice(0, 3).map((article) => (
                                    <Link key={article.id} href={`/read/${article.id}`} className="group flex items-center gap-4">
                                        <div className="flex-1">
                                            <p className="font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                                                {article.title}
                                            </p>
                                            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mt-1">
                                                {article.date}
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                                            <img src={article.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
