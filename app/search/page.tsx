"use client";

import { useSearchParams } from "next/navigation";
import { videos } from "@/data/videos";
import Link from "next/link";
import { CheckCircle2, Filter } from "lucide-react";
import { useState, Suspense } from "react";
import clsx from "clsx";

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [showFilters, setShowFilters] = useState(false);

    // Simple case-insensitive search
    const results = videos.filter((v) =>
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.channelName.toLowerCase().includes(query.toLowerCase())
    );

    const filterCategories = [
        {
            title: "UPLOAD DATE",
            options: ["Last hour", "Today", "This week", "This month", "This year"]
        },
        {
            title: "TYPE",
            options: ["Video", "Channel", "Playlist", "Movie"]
        },
        {
            title: "DURATION",
            options: ["Under 4 minutes", "4 - 20 minutes", "Over 20 minutes"]
        },
        {
            title: "FEATURES",
            options: ["Live", "4K", "Subtitles/CC", "Creative Commons", "360°", "VR180", "HDR", "Location"]
        },
        {
            title: "SORT BY",
            options: ["Relevance", "Upload date", "View count", "Rating"]
        }
    ];

    return (
        <div className="flex flex-col gap-4 w-full p-4 md:p-6 max-w-[1280px] mx-auto">
            {/* Filter Toggle Chip */}
            <div className="flex items-center gap-2 pb-2">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={clsx(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap",
                        showFilters
                            ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                    )}
                >
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>

            {/* Collapsible Filter Section */}
            {showFilters && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 py-6 border-b border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-4 duration-300">
                    {filterCategories.map((category) => (
                        <div key={category.title} className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white tracking-wider">
                                {category.title}
                            </h4>
                            <div className="flex flex-col gap-3">
                                {category.options.map((option) => (
                                    <button
                                        key={option}
                                        className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-left transition-colors"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex flex-col gap-4 mt-2">
                {results.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 text-lg">
                        No results found for <span className="font-semibold text-black dark:text-white">"{query}"</span>
                    </div>
                ) : (
                    results.map((video) => (
                        <div key={video.id} className="flex flex-col sm:flex-row gap-4 group cursor-pointer relative">
                            {/* Thumbnail */}
                            <Link href={`/watch/${video.id}`} className="relative aspect-video w-full sm:w-[360px] h-[202px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                                    {video.duration}
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="flex flex-col py-1 gap-1 w-full">
                                <Link href={`/watch/${video.id}`}>
                                    <h3 className="text-lg md:text-xl font-normal text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {video.title}
                                    </h3>
                                </Link>

                                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center flex-wrap">
                                    <span>{video.views} views</span>
                                    <span className="mx-1.5 min-w-[2px] h-[2px] rounded-full bg-gray-500 dark:bg-gray-400" aria-hidden="true" />
                                    <span>{video.uploadedAt}</span>
                                </div>

                                <div className="flex items-center gap-2 my-2 py-2">
                                    <Link href={`/channel/${video.channelId}`} className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity">
                                        <img src={video.channelAvatar} className="w-full h-full object-cover" alt="" />
                                    </Link>
                                    <Link href={`/channel/${video.channelId}`} className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
                                        {video.channelName}
                                        <CheckCircle2 className="w-3 h-3 fill-gray-500 text-white" />
                                    </Link>
                                </div>

                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed max-w-[800px]">
                                    {video.description}
                                </p>

                                <div className="mt-auto hidden sm:flex gap-1">
                                    <span className="bg-gray-100 dark:bg-[#272727] text-[10px] px-1 py-0.5 rounded text-gray-600 dark:text-gray-400 font-medium">New</span>
                                    <span className="bg-gray-100 dark:bg-[#272727] text-[10px] px-1 py-0.5 rounded text-gray-600 dark:text-gray-400 font-medium">4K</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading search...</div>}>
            <SearchContent />
        </Suspense>
    );
}
