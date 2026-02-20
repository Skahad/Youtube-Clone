"use client";

import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import { Grid, Bell } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubscriptionsPage() {
    const { user } = useAuth();
    const { subscribedChannelIds } = useSubscriptions();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    // Filter subscribed channels
    const subscribedChannelsData = channels.filter(c => subscribedChannelIds.includes(c.id));

    // Filter videos from subscribed channels
    const subscriptionVideos = videos.filter(v => subscribedChannelIds.includes(v.channelId)).reverse();

    if (subscribedChannelIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
                    <Bell className="w-10 h-10 text-foreground/40" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Nothing here yet</h2>
                <p className="text-foreground/60 max-w-md mb-8">
                    Start subscribing to see latest videos from your favorite creators!
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                >
                    Browse videos
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1800px] mx-auto pb-10">
            {/* Top Channel Strip - "Stories" style */}
            <div className="w-full overflow-x-auto pb-2 no-scrollbar">
                <div className="flex gap-4 min-w-max px-2">
                    {subscribedChannelsData.map((channel) => (
                        <Link
                            key={channel.id}
                            href={`/channel/${channel.id}`}
                            className="flex flex-col items-center gap-2 group min-w-[72px]"
                        >
                            <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-accent to-accent/50 group-hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-full border-2 border-white dark:border-[#0f0f0f] overflow-hidden bg-white dark:bg-black">
                                    <img
                                        src={channel.avatar}
                                        alt={channel.name}
                                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                                    />
                                </div>
                                {/* Live or New dot indicator */}
                                <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-black"></div>
                            </div>
                            <span className="text-xs text-center text-foreground/70 font-medium truncate w-full group-hover:text-foreground transition-colors">
                                {channel.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Filter / Title Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                    <h2 className="text-xl font-bold text-foreground">Latest</h2>
                    <span className="text-sm text-foreground/50">{subscriptionVideos.length} videos</span>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                {subscriptionVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

            {/* Show older videos section simulation if there are many */}
            {subscriptionVideos.length > 5 && (
                <div className="border-t border-foreground/10 pt-6 mt-4">
                    <h3 className="text-lg font-bold text-foreground mb-6">Suggestions for you</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                        {videos.slice(0, 5).map((video) => (
                            <VideoCard key={`suggested-${video.id}`} video={video} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
