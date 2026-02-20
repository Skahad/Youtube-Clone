"use client";

import { useAuth } from "@/components/AuthContext";
import { History, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutPage() {
    const { user } = useAuth();
    const pathname = usePathname();

    const tabs = [
        { label: "PlayLists", href: "/playlists" },
        { label: "Activities", href: "/activities" },
        { label: "About", href: "/about" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#0f0f0f] pb-20">
            {/* Profile Header */}
            <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.1) 0%, transparent 20%)' }}></div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-white/10 px-4 md:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-end -mt-12 pb-6 gap-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-[#0f0f0f] overflow-hidden bg-purple-600 shadow-lg relative z-10 flex-shrink-0">
                        {user?.avatar && user.avatar !== "U" ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold uppercase text-white font-mono">
                                {user?.username?.[0] || "U"}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full font-mono">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-black text-foreground">{user?.username || "Shaikh Ahad"}</h1>
                            <p className="text-sm text-foreground/50 font-bold mt-1 tracking-tighter">0 Subscribers</p>
                        </div>
                        <button className="mt-4 md:mt-0 bg-[#7a7a7a] hover:bg-[#6a6a6a] text-white px-6 py-2 rounded-md font-black text-sm uppercase transition-all active:scale-95">
                            Manage
                        </button>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={`px-4 py-3 text-sm font-black whitespace-nowrap transition-all relative ${pathname === tab.href
                                    ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#03a9f4]"
                                    : "text-foreground/50 hover:text-foreground"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* About Content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-3xl bg-white dark:bg-[#1a1a1a] p-10 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5 font-mono">
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
                                    <div className="flex items-center gap-6 p-6 bg-foreground/5 rounded-3xl border border-white/5 transition-all hover:bg-foreground/[0.08] group">
                                        <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-lg">
                                            <History className="w-6 h-6 text-[#03a9f4]" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">Joined Date</p>
                                            <p className="font-black text-foreground text-lg italic">Feb 20, 2026</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 p-6 bg-foreground/5 rounded-3xl border border-white/5 transition-all hover:bg-foreground/[0.08] group">
                                        <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-lg">
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
    );
}
