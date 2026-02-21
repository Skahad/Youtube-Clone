"use client";

import { useAuth } from "@/components/AuthContext";
import { History, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import clsx from "clsx";

export default function AboutPage() {
    const { user } = useAuth();
    const pathname = usePathname();
    const { subscribedChannelIds } = useSubscriptions();

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
                                <span className="hidden md:inline">•</span>
                                <span>{subscribedChannelIds.length} Subscribers</span>
                            </div>
                            <p className="text-foreground/70 text-sm max-w-2xl mt-2 line-clamp-2">
                                Daily tips and tricks to improve productivity and code quality.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <button className="bg-foreground text-background px-6 py-2 rounded-full font-bold text-sm uppercase transition-all hover:opacity-90 active:scale-95">
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

            {/* About Content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="py-6 min-h-[400px]">
                        <div className="max-w-3xl bg-surface p-10 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5 font-mono">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <h3 className="text-xl font-black text-foreground uppercase tracking-widest italic">Channel Information</h3>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs font-black text-foreground/30 uppercase tracking-[0.3em] mb-4">Description</h4>
                                    <p className="text-foreground/70 leading-relaxed text-lg font-medium italic">
                                        Welcome to my channel! I share tech tips, coding tutorials, and lofi vibes. Join the community and let's grow together.
                                    </p>
                                </div>

                                <div className="h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent w-full" />

                                <div>
                                    <h4 className="text-xs font-black text-foreground/30 uppercase tracking-[0.3em] mb-6">Audience Stats</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-6 p-6 bg-foreground/5 rounded-3xl border border-foreground/5 transition-all hover:bg-foreground/[0.08] group">
                                            <div className="p-4 bg-background rounded-2xl shadow-lg">
                                                <History className="w-6 h-6 text-[#03a9f4]" strokeWidth={3} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">Joined Date</p>
                                                <p className="font-black text-foreground text-lg italic">Feb 20, 2026</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 p-6 bg-foreground/5 rounded-3xl border border-foreground/5 transition-all hover:bg-foreground/[0.08] group">
                                            <div className="p-4 bg-background rounded-2xl shadow-lg">
                                                <Plus className="w-6 h-6 text-[#03a9f4] rotate-45" strokeWidth={3} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">Total Views</p>
                                                <p className="font-black text-foreground text-lg italic tracking-tighter">0 VIEWS</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <div className="px-8 py-3 bg-gradient-to-r from-transparent via-foreground/5 to-transparent rounded-full flex items-center gap-3">
                                    <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest italic opacity-50">Sharing knowledge since 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
