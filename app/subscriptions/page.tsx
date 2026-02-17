"use client";

import { videos } from "@/data/videos";
import { channels } from "@/data/channels";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import { Grid, ListFilter } from "lucide-react";

export default function SubscriptionsPage() {
    // In a real app, we would filter videos by subscribed channels.
    // For now we just reverse the list to show a "latest" feed different from home.
    const subscriptionVideos = [...videos].reverse();

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1800px] mx-auto">
            {/* Top Channel Strip - "Stories" style */}
            <div className="w-full overflow-x-auto pb-2 no-scrollbar">
                <div className="flex gap-4 min-w-max px-2">
                    {channels.map((channel) => (
                        <Link
                            key={channel.id}
                            href={`/channel/${channel.id}`}
                            className="flex flex-col items-center gap-2 group min-w-[72px]"
                        >
                            <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 group-hover:scale-105 transition-transform">
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
                            <span className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium truncate w-full group-hover:text-black dark:group-hover:text-white transition-colors">
                                {channel.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Filter / Title Bar */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Latest</h2>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-full transition-colors">
                    <span className="hidden sm:inline">Manage</span>
                    <Grid className="w-4 h-4 sm:hidden" />
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                {subscriptionVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

            {/* Show older videos section simulation */}
            <div className="border-t border-foreground/10 pt-6 mt-2">
                <h3 className="text-md font-bold text-gray-900 dark:text-white mb-4">Yesterday</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                    {/* Just repeating some videos to simulate "Yesterday" content */}
                    {subscriptionVideos.slice(0, 4).map((video) => (
                        <VideoCard key={`yesterday-${video.id}`} video={{ ...video, id: `y-${video.id}` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
