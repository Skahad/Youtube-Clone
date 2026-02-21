"use client";

import { useLikedVideos } from "@/components/LikedVideosProvider";
import VideoCard from "@/components/VideoCard";
import { ThumbsUp, Trash2, Search } from "lucide-react";
import { useState } from "react";

export default function LikedVideosPage() {
    const { likedVideos, clearLikedVideos, toggleLike } = useLikedVideos();
    const [searchQuery, setSearchQuery] = useState("");
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Filter liked videos based on search query
    const filteredVideos = likedVideos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClearLiked = () => {
        clearLikedVideos();
        setShowClearConfirm(false);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <ThumbsUp className="w-8 h-8 text-foreground" />
                    <h1 className="text-2xl font-bold text-foreground">Liked Videos</h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search liked videos"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-surface rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
                        />
                    </div>

                    {/* Clear All Button */}
                    {likedVideos.length > 0 && (
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-foreground/10 dark:hover:bg-red-900/20 rounded-full transition-colors whitespace-nowrap"
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
                    <div className="bg-surface rounded-xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-foreground mb-2">Clear all liked videos?</h3>
                        <p className="text-foreground/60 text-sm mb-6">
                            This will remove all videos from your liked videos. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-foreground/10 rounded-full transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearLiked}
                                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-full transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            {likedVideos.length > 0 && (
                <div className="bg-surface rounded-xl p-4">
                    <p className="text-sm text-foreground/60">
                        <span className="font-semibold text-foreground">{likedVideos.length}</span> liked video{likedVideos.length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}

            {/* Content */}
            {likedVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Trash2 className="w-24 h-24 text-foreground/30 dark:text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold  dark:text-white mb-2">No liked videos yet</h2>
                    <p className="text-foreground/70 dark:text-gray-400 max-w-md">
                        Videos you like will appear here. Start exploring and like videos you enjoy!
                    </p>
                </div>
            ) : filteredVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try searching with different keywords
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
                    {filteredVideos.map((video) => (
                        <div key={video.id} className="relative group">
                            <VideoCard video={video} />
                            {/* Unlike button */}
                            <button
                                onClick={() => toggleLike(video)}
                                className="absolute top-2 right-2 p-2 bg-black hover:bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                aria-label="Unlike video"
                            >
                                <Trash2 className="w-4 h-4 " />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
