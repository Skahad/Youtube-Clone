"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { channels } from "@/data/channels";
import { videos } from "@/data/videos";
import { shorts } from "@/data/shorts";
import VideoCard from "@/components/VideoCard";
import { useState, useEffect } from "react";
import { CheckCircle2, Search } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function ChannelPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = params?.id as string;
    const channel = channels.find((c) => c.id === id) || channels[0];
    const channelVideos = videos.filter((v) => v.channelId === id);
    const channelShorts = shorts.filter((s) => s.channelId === id);

    // Get active tab from URL or default to "Home"
    const activeTab = searchParams.get("tab") || "Home";
    const [isClient, setIsClient] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleTabClick = (tab: string) => {
        // Special handling for Shorts - redirect to shorts page
        if (tab === "Shorts") {
            router.push("/shorts");
            return;
        }

        // For other tabs, update the URL with query parameter
        router.push(`/channel/${id}?tab=${tab}`);
    };

    if (!isClient) return null;

    return (
        <div className="flex flex-col w-full h-full">
            {/* Banner */}
            <div className="h-32 md:h-52 w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                <img src={channel.banner} alt="Banner" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-transparent flex-shrink-0">
                        <img src={channel.avatar} alt={channel.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 z-10">
                        <h1 className="text-3xl font-bold text-black dark:text-white flex items-center justify-center md:justify-start gap-2">
                            {channel.name}
                            <CheckCircle2 className="w-5 h-5 fill-black/50 text-white dark:text-black" />
                        </h1>
                        <div className="text-foreground/70 dark:text-gray-400 text-sm flex flex-col md:flex-row gap-1 md:gap-2">
                            <span className="font-semibold">@{channel.name.replace(/\s+/g, '').toLowerCase()}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{channel.subscribers} subscribers</span>
                            <span className="hidden md:inline">•</span>
                            <span>{channelVideos.length} videos</span>
                        </div>

                        <p className="text-foreground/70 dark:text-gray-400 text-sm max-w-2xl line-clamp-2 cursor-pointer mt-1">
                            {channel.description}
                        </p>

                        <div className="flex justify-center md:justify-start mt-2">
                            <button
                                onClick={() => setIsSubscribed(!isSubscribed)}
                                className={clsx(
                                    "px-4 py-2 rounded-full font-medium text-sm transition-all ml-4 whitespace-nowrap flex-shrink-0 border",
                                    isSubscribed
                                        ? "bg-surface border-foreground/10 text-foreground hover:bg-surface-hover"
                                        : "bg-foreground text-background border-transparent hover:opacity-90"
                                )}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-gray-200 dark:border-white/10 flex items-center gap-6 overflow-x-auto no-scrollbar">
                    {["Home", "Videos", "Shorts", "Live", "Playlists", "Community", "Channels", "About"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={clsx(
                                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                activeTab === tab
                                    ? "border-foreground text-foreground"
                                    : "border-transparent text-foreground/50 hover:text-foreground"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className="flex-1" />
                    <button className="p-2 hover:bg-white dark:hover:bg-[#272727] rounded-full transition-colors">
                        <Search className="w-5 h-5 text-black dark:text-foreground" />
                    </button>
                </div>

                {/* Tab Content */}
                <div className="py-6 min-h-[400px]">
                    {activeTab === "Home" && (
                        <div className="flex flex-col gap-8">
                            {/* Latest Videos Section */}
                            {channelVideos.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Latest Videos</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                                        {channelVideos.slice(0, 4).map((video) => (
                                            <VideoCard key={video.id} video={video} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Shorts Section */}
                            {channelShorts.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Shorts</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {channelShorts.slice(0, 6).map((short) => (
                                            <Link key={short.id} href="/shorts" className="aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer">
                                                <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg">{short.title}</p>
                                                    <p className="text-white text-xs mt-1 drop-shadow-lg">{short.views} views</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "Videos" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
                            {channelVideos.length > 0 ? (
                                channelVideos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
                                    No videos available.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "Live" && (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">No live streams</h3>
                                <p className="text-sm">This channel hasn't gone live yet.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "Playlists" && (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">No playlists</h3>
                                <p className="text-sm">This channel hasn't created any playlists yet.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "Community" && (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Community posts</h3>
                                <p className="text-sm">This channel hasn't posted anything yet.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "Channels" && (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Featured channels</h3>
                                <p className="text-sm">This channel hasn't featured any other channels.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "About" && (
                        <div className="max-w-3xl">
                            <div className="bg-surface border border-foreground/10 rounded-xl p-6 space-y-4 shadow-sm">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                                    <p className="text-foreground/80 text-sm whitespace-pre-wrap">{channel.description}</p>
                                </div>
                                <div className="border-t border-foreground/10 pt-4">
                                    <h3 className="font-semibold text-foreground mb-2">Stats</h3>
                                    <div className="space-y-1 text-sm text-foreground/70">
                                        <p>{channel.subscribers} subscribers</p>
                                        <p>{channelVideos.length} videos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

