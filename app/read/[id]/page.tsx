"use client";

import { useAuth } from "@/components/AuthContext";
import {
    ThumbsUp, ThumbsDown, MessageSquare, Share2,
    Facebook, Twitter, Linkedin, Github as WhatsApp,
    MoreVertical, ChevronRight, Play, FileText,
    ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import CommentBox from "@/components/CommentBox";
import { articles } from "@/data/articles";

export default function ArticleReadPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useAuth();

    // Interactive State
    const [likes, setLikes] = useState(2);
    const [dislikes, setDislikes] = useState(2);
    const [voteStatus, setVoteStatus] = useState<"none" | "liked" | "disliked">("none");

    const handleLike = () => {
        if (voteStatus === "liked") {
            setLikes(prev => prev - 1);
            setVoteStatus("none");
        } else {
            if (voteStatus === "disliked") {
                setDislikes(prev => prev - 1);
            }
            setLikes(prev => prev + 1);
            setVoteStatus("liked");
        }
    };

    const handleDislike = () => {
        if (voteStatus === "disliked") {
            setDislikes(prev => prev - 1);
            setVoteStatus("none");
        } else {
            if (voteStatus === "liked") {
                setLikes(prev => prev - 1);
            }
            setDislikes(prev => prev + 1);
            setVoteStatus("disliked");
        }
    };

    // Dynamic Data Fetching
    const article = articles.find(a => a.id === id);

    // Update local likes/dislikes when article changes
    useEffect(() => {
        if (article) {
            setLikes(article.likes);
            setDislikes(article.dislikes);
        }
    }, [article]);

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <FileText className="w-20 h-20 text-foreground/10 mb-6" />
                <h1 className="text-3xl font-black text-foreground uppercase italic tracking-tighter">Article Not Found</h1>
                <Link href="/articles" className="mt-6 px-8 py-3 bg-accent text-white rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-accent/20">
                    Back to Feed
                </Link>
            </div>
        );
    }

    const categories = [
        "Film & Animation", "Music", "Pets & Animals",
        "Sports", "Travel & Events", "Gaming",
        "People & Blogs", "Comedy", "Entertainment",
        "News & Politics", "How-to & Style",
        "Non-profits & Activism", "Religion", "Other"
    ];

    const relatedVideos = [
        {
            id: "v1",
            title: "The only way I could do that was if you wanted",
            author: "waseem shah",
            views: "8 Views",
            time: "4 months ago",
            duration: "0:05",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
            category: "Film & Animation"
        },
        {
            id: "v2",
            title: "Mahadev Ki Shadi Hai _ Hansraj Raghuwanshi _",
            author: "V T",
            views: "7 Views",
            time: "7 days ago",
            duration: "3:08",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
            category: "Music"
        },
        {
            id: "v3",
            title: "1001692594",
            author: "CricLover",
            views: "7 Views",
            time: "2 months ago",
            duration: "1:50",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
            category: "Sports"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Top Navigation / Breadcrumb */}
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group mb-8"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold uppercase tracking-tighter italic">Back to Articles</span>
                </button>

                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 tracking-tight">
                    {article.title}
                </h1>

                {/* Article Meta Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-foreground/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                            <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
                        </div>
                        <div className="font-medium">
                            <p className="text-foreground font-bold">{article.author}</p>
                            <div className="flex items-center gap-2 text-xs text-foreground/50 font-bold uppercase tracking-widest">
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>{article.views} Views</span>
                                <span>•</span>
                                <span>{article.shares} Share</span>
                                <span>•</span>
                                <span>Published in <span className="text-accent hover:underline cursor-pointer">{article.category}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Social Share Icons */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-foreground/40 hover:text-foreground transition-colors">
                            <Share2 size={20} />
                        </button>
                        <div className="flex items-center gap-1.5">
                            {[
                                { icon: Facebook, color: "bg-[#1877F2]", url: "https://www.facebook.com/login" },
                                { icon: Twitter, color: "bg-[#1DA1F2]", url: "https://twitter.com/login" },
                                { icon: WhatsApp, color: "bg-[#25D366]", url: "https://web.whatsapp.com/" },
                                { icon: Linkedin, color: "bg-[#0A66C2]", url: "https://www.linkedin.com/login" },
                                { icon: MoreVertical, color: "bg-[#E60023]", url: "https://www.instagram.com/accounts/login/" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-lg",
                                        social.color
                                    )}
                                >
                                    <social.icon size={14} fill="currentColor" strokeWidth={0} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Featured Image Section */}
                        <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
                            {/* Decorative Grey Sidebars as seen in screenshot */}
                            <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gray-500/30 backdrop-blur-sm z-10" />
                            <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gray-500/30 backdrop-blur-sm z-10" />

                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Article Text */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-foreground italic uppercase tracking-tighter">
                                {article.description}
                            </h2>
                            <p className="text-xl text-foreground/80 leading-relaxed font-medium">
                                {article.content}
                            </p>
                        </div>

                        {/* Interaction Bar */}
                        <div className="flex items-center gap-6 py-6 border-y border-foreground/10">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleLike}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className={clsx(
                                        "p-3 rounded-2xl transition-all shadow-sm",
                                        voteStatus === "liked" ? "bg-accent text-white shadow-accent/20" : "bg-foreground/5 text-foreground/60 group-hover:bg-foreground/10"
                                    )}>
                                        <ThumbsUp size={20} className={clsx(voteStatus === "liked" ? "fill-current" : "group-hover:text-accent")} />
                                    </div>
                                    <span className={clsx("font-black", voteStatus === "liked" ? "text-accent" : "text-foreground/60")}>{likes}</span>
                                </button>
                                <button
                                    onClick={handleDislike}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className={clsx(
                                        "p-3 rounded-2xl transition-all shadow-sm",
                                        voteStatus === "disliked" ? "bg-red-500 text-white shadow-red-500/20" : "bg-foreground/5 text-foreground/60 group-hover:bg-foreground/10"
                                    )}>
                                        <ThumbsDown size={20} className={clsx(voteStatus === "disliked" ? "fill-current" : "group-hover:text-red-500")} />
                                    </div>
                                    <span className={clsx("font-black", voteStatus === "disliked" ? "text-red-500" : "text-foreground/60")}>{dislikes}</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-foreground/40 font-black italic">
                                <span>•</span>
                                <span>{article.commentsCount} Comments</span>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-8">
                            <CommentBox />
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Categories List */}
                        <div className="bg-surface p-8 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter italic mb-8 pb-4 border-b border-foreground/10">
                                Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={clsx(
                                            "px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-tighter transition-all border",
                                            cat === article.category
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                : "bg-background border-foreground/10 text-foreground/50 hover:border-accent hover:text-accent"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div className="bg-surface p-8 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter italic mb-8 pb-4 border-b border-foreground/10">
                                Related Articles
                            </h3>
                            <div className="space-y-6">
                                {articles
                                    .filter(a => a.id !== id && (a.category === article.category || article.id === "1"))
                                    .slice(0, 3)
                                    .map((rel) => (
                                        <Link key={rel.id} href={`/read/${rel.id}`} className="group flex items-center gap-4">
                                            <div className="flex-1">
                                                <p className="font-bold text-foreground group-hover:text-accent transition-colors leading-tight line-clamp-2">
                                                    {rel.title}
                                                </p>
                                                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mt-1">
                                                    {rel.date}
                                                </p>
                                            </div>
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                                                <img src={rel.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        {/* Related Videos (YouTube Style UI) */}
                        <div className="bg-surface p-8 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-tighter italic mb-8 pb-4 border-b border-foreground/10">
                                Related Videos
                            </h3>
                            <div className="space-y-6">
                                {relatedVideos.map((video) => (
                                    <Link key={video.id} href={`/watch/${video.id}`} className="group flex flex-col gap-3">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                                            <img src={video.image} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-black text-white">
                                                {video.duration}
                                            </div>
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Play className="text-white fill-current w-10 h-10" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-black text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                                                {video.title}
                                            </h4>
                                            <p className="text-[11px] font-bold text-foreground/50">{video.author}</p>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                                                <span>{video.views}</span>
                                                <span>•</span>
                                                <span>{video.time}</span>
                                            </div>
                                            <span className="text-[10px] bg-foreground/5 w-fit px-2 py-0.5 rounded-lg text-foreground/40 font-bold uppercase mt-1">
                                                {video.category}
                                            </span>
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
