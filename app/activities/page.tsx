"use client";

import { useAuth } from "@/components/AuthContext";
import { Plus, VideoOff, Bell, History } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface Post {
    id: string;
    message: string;
    image: string | null;
    timestamp: number;
}

export default function ActivitiesPage() {
    const { user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [privacySettings, setPrivacySettings] = useState<any>({});

    useEffect(() => {
        const savedPosts = localStorage.getItem("user_posts");
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }

        // Fetch privacy settings
        if (user?.handle) {
            const saved = localStorage.getItem(`privacy_settings_${user.handle}`);
            if (saved) {
                setPrivacySettings(JSON.parse(saved));
            }
        }
    }, [user]);

    const tabs = [
        { label: "PlayLists", href: "/playlists" },
        { label: "Activities", href: "/activities" },
        { label: "About", href: "/about" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Banner */}
            <div className="h-32 md:h-52 w-full bg-surface relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                        {user?.avatar && user.avatar !== "U" ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold uppercase text-white bg-purple-600 font-mono">
                                {user?.username?.[0] || "U"}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full font-mono">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-foreground">
                                {user?.username || "Shaikh Ahad"}
                            </h1>
                            <div className="text-foreground/70 text-sm flex flex-col md:flex-row gap-1 md:gap-2 font-medium mt-1">
                                <span className="font-semibold">@{user?.username?.replace(/\s+/g, '').toLowerCase() || "user"}</span>
                                {privacySettings.showSubscriptions !== "No" && (
                                    <>
                                        <span className="hidden md:inline">•</span>
                                        <span>0 Subscribers</span>
                                    </>
                                )}
                                {privacySettings.watchWho !== "Only Me" && (
                                    <>
                                        <span className="hidden md:inline">•</span>
                                        <span>{posts.length} activity posts</span>
                                    </>
                                )}
                            </div>
                            <p className="text-foreground/70 text-sm max-w-2xl mt-2 line-clamp-2">
                                Daily tips and tricks to improve productivity and code quality.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <button
                                onClick={() => router.push(`/settings/profile/${user?.handle || '@me'}`)}
                                className="bg-foreground text-background px-6 py-2 rounded-full font-bold text-sm uppercase transition-all hover:opacity-90 active:scale-95"
                            >
                                Manage
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-foreground/10 flex items-center gap-6 overflow-x-auto no-scrollbar font-mono">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={clsx(
                                "px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
                                pathname === tab.href
                                    ? "border-foreground text-foreground"
                                    : "border-transparent text-foreground/50 hover:text-foreground"
                            )}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Activities Content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-foreground/10 pb-4 mb-8 gap-4 font-mono">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-[#03a9f4]" strokeWidth={3} />
                                <h2 className="text-xl font-black text-foreground italic uppercase tracking-tighter">Most recent activities</h2>
                            </div>
                            <button
                                onClick={() => router.push("/activities/post")}
                                className="flex items-center justify-center gap-2 bg-[#03a9f4] hover:bg-[#039be5] text-white px-6 py-2.5 rounded-md font-black text-sm uppercase transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                            >
                                <Plus size={16} strokeWidth={4} />
                                Create Post
                            </button>
                        </div>

                        {posts.length > 0 ? (
                            <div className="flex flex-col gap-8 max-w-4xl">
                                {posts.map((post) => (
                                    <div key={post.id} className="bg-surface rounded-2xl p-6 shadow-xl shadow-black/5 border border-foreground/10 transform transition-all hover:scale-[1.01]">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black uppercase overflow-hidden border-2 border-white dark:border-black shadow-md">
                                                {user?.avatar && user.avatar !== "U" ? (
                                                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xl">{user?.username?.[0] || "U"}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-foreground text-lg leading-none">{user?.username || "Shaikh Ahad"}</p>
                                                <p className="text-xs text-foreground/40 font-bold mt-1">{new Date(post.timestamp).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        {post.message && (
                                            <p className="text-foreground/80 mb-6 whitespace-pre-wrap leading-relaxed text-lg font-medium">{post.message}</p>
                                        )}
                                        {post.image && (
                                            <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
                                                <img src={post.image} alt="Activity" className="w-full h-auto" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                                    <VideoOff className="w-10 h-10 text-cyan-500" strokeWidth={3} />
                                </div>
                                <p className="text-xl font-black italic uppercase tracking-tighter text-foreground">No activities found for now.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
