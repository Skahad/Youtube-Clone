"use client";

import { useWatchHistory } from "@/components/WatchHistoryProvider";
import { useAuth } from "@/components/AuthContext";
import VideoCard from "@/components/VideoCard";
import { Clock, Trash2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function HistoryPage() {
    const { history, clearHistory, removeFromHistory } = useWatchHistory();
    const { user } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    // Filter history based on search query
    const filteredHistory = history.filter((item) =>
        item.video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group by date
    const groupedHistory = filteredHistory.reduce((acc, item) => {
        const date = new Date(item.watchedAt);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let dateKey: string;
        if (date.toDateString() === today.toDateString()) {
            dateKey = "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            dateKey = "Yesterday";
        } else {
            dateKey = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        }

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
    }, {} as Record<string, typeof history>);

    const handleClearHistory = () => {
        clearHistory();
        setShowClearConfirm(false);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-foreground" />
                    <h1 className="text-2xl font-bold text-foreground">Watch History</h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search watch history"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#272727] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    {/* Clear History Button */}
                    {history.length > 0 && (
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors whitespace-nowrap"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear all</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Clear Confirmation Modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#272727] rounded-xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Clear watch history?</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            This will remove all videos from your watch history. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] rounded-full transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearHistory}
                                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-full transition-colors"
                            >
                                Clear history
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Clock className="w-24 h-24 text-foreground/30 mb-4" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">No watch history yet</h2>
                    <p className="text-foreground/70 max-w-md">
                        Videos you watch will appear here. Start exploring to build your watch history!
                    </p>
                </div>
            ) : filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search className="w-24 h-24 text-foreground/30 mb-4" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
                    <p className="text-foreground/70">
                        Try searching with different keywords
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    {Object.entries(groupedHistory).map(([date, items]) => (
                        <div key={date}>
                            <h2 className="text-lg font-bold text-foreground mb-4 sticky top-14 bg-background py-2 z-10">
                                {date}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                                {items.map((item) => (
                                    <div key={`${item.video.id}-${item.watchedAt.getTime()}`} className="relative group">
                                        <VideoCard video={item.video} />
                                        {/* Remove button */}
                                        <button
                                            onClick={() => removeFromHistory(item.video.id)}
                                            className="absolute top-2 right-2 p-2 bg-black hover:bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            aria-label="Remove from history"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        {/* Watch time */}
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                                            Watched {new Date(item.watchedAt).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
