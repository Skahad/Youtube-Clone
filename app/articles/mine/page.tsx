"use client";

import { FileText, Search, ChevronRight, Plus, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/components/AuthContext";
import { articles } from "@/data/articles";

export default function MyArticlesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    // Protect the page - redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    // Filter articles for the current user
    // In our mock data, we'll assume no articles belong to the current user yet
    // unless we add a 'userId' field to the data. For now, we'll show an empty state.
    const userArticles = articles.filter(a => a.author === user.username);

    const filteredArticles = userArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/articles")}
                            className="p-2 hover:bg-foreground/5 rounded-full text-foreground/40 hover:text-foreground transition-all"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-black text-foreground italic uppercase tracking-tighter">
                            My articles
                        </h1>
                    </div>
                    <button
                        onClick={() => router.push("/articles/create")}
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
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-surface rounded-[2.5rem] border border-dashed border-foreground/10">
                                <FileText className="w-16 h-16 text-foreground/10 mb-6" />
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter italic">No posts found!</h3>
                                <p className="text-foreground/40 mt-2 font-bold">You haven't written any articles yet.</p>
                                <button
                                    onClick={() => router.push("/articles/create")}
                                    className="mt-8 px-8 py-3 bg-accent text-white rounded-xl font-black uppercase text-xs italic shadow-lg shadow-accent/20 hover:scale-105 transition-all"
                                >
                                    Write your first article
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Search Bar */}
                        <div className="bg-surface p-6 rounded-[2rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search your articles"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold shadow-inner"
                                />
                                <button className="absolute right-2 top-2 p-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/20">
                                    <Search size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Tip Box */}
                        <div className="bg-accent/5 p-8 rounded-[2rem] border border-accent/10">
                            <h3 className="text-xl font-black text-accent uppercase tracking-tighter italic mb-4">
                                Pro Tip
                            </h3>
                            <p className="text-sm font-medium text-foreground/60 leading-relaxed italic">
                                High-quality images and engaging titles lead to 40% more reads. Don't forget to choose a relevant category!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
