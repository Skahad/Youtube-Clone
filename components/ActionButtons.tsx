"use client";

import { ThumbsUp, ThumbsDown, Share2, Download, Scissors, MoreHorizontal, Check, Flag, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useLikedVideos } from "@/components/LikedVideosProvider";
import { useWatchLater } from "@/components/WatchLaterProvider";
import { Video } from "@/data/videos";
import clsx from "clsx";
import ShareModal from "./ShareModal";

interface ActionButtonsProps {
    video: Video;
}

export default function ActionButtons({ video }: ActionButtonsProps) {
    const { isLiked: isVideoLiked, toggleLike } = useLikedVideos();
    const { isInWatchLater, toggleWatchLater } = useWatchLater();
    const [likes, setLikes] = useState(12000);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [inWatchLater, setInWatchLater] = useState(false);
    const [showWatchLaterToast, setShowWatchLaterToast] = useState(false);

    // Sync with global liked state
    useEffect(() => {
        setIsLiked(isVideoLiked(video.id));
    }, [video.id, isVideoLiked]);

    // Sync with global watch later state
    useEffect(() => {
        setInWatchLater(isInWatchLater(video.id));
    }, [video.id, isInWatchLater]);

    const handleLike = () => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
            toggleLike(video);
        } else {
            if (isDisliked) setIsDisliked(false);
            setLikes(prev => prev + 1);
            setIsLiked(true);
            toggleLike(video);
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setIsDisliked(false);
        } else {
            if (isLiked) {
                setLikes(prev => prev - 1);
                setIsLiked(false);
                toggleLike(video);
            }
            setIsDisliked(true);
        }
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 2000);
        }, 1500);
    };

    const handleWatchLater = () => {
        toggleWatchLater(video);
        setShowWatchLaterToast(true);
        setShowMoreMenu(false);
        setTimeout(() => setShowWatchLaterToast(false), 2000);
    };

    return (
        <div className="flex flex-nowrap items-center gap-2 mt-2 md:mt-0 relative">
            <div className="flex items-center bg-gray-100 dark:bg-[#272727] rounded-full overflow-hidden flex-shrink-0">
                <button
                    onClick={handleLike}
                    className={clsx(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors border-r border-gray-200 dark:border-gray-700",
                        isLiked && "text-blue-600 dark:text-blue-400"
                    )}
                    aria-label="Like video"
                    aria-pressed={isLiked}
                >
                    <ThumbsUp className={clsx("w-5 h-5", isLiked ? "fill-current" : "")} />
                    <span className="text-sm font-medium">{likes.toLocaleString()}</span>
                </button>
                <button
                    onClick={handleDislike}
                    className={clsx(
                        "px-3 sm:px-4 py-2 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors relative",
                        isDisliked && "text-blue-600 dark:text-blue-400"
                    )}
                    aria-label="Dislike video"
                    aria-pressed={isDisliked}
                >
                    <ThumbsDown className={clsx("w-5 h-5", isDisliked ? "fill-current" : "")} />
                </button>
            </div>

            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-[#272727] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-full transition-colors relative flex-shrink-0"
                aria-label="Share"
            >
                <Share2 className="w-5 h-5 text-gray-900 dark:text-white" />
                <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">Share</span>
            </button>

            <button
                onClick={handleDownload}
                disabled={isDownloading || downloaded}
                className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-[#272727] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Download"
            >
                {isDownloading ? (
                    <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : downloaded ? (
                    <Check className="w-5 h-5 text-green-500" />
                ) : (
                    <Download className="w-5 h-5 text-gray-900 dark:text-white" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-white hidden lg:inline">
                    {isDownloading ? "Downloading..." : downloaded ? "Downloaded" : "Download"}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white lg:hidden">
                    Download
                </span>
            </button>

            <div className="relative flex-shrink-0">
                <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="flex items-center justify-center p-2 bg-gray-100 dark:bg-[#272727] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-full transition-colors text-black dark:text-white"
                    aria-label="More actions"
                    aria-expanded={showMoreMenu}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>

                {showMoreMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#272727] rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 origin-top-right">
                        <button
                            onClick={handleWatchLater}
                            className={clsx(
                                "flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-left",
                                inWatchLater && "bg-blue-50 dark:bg-blue-900/20"
                            )}
                        >
                            <Clock className={clsx("w-5 h-5", inWatchLater ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white")} />
                            <div className="flex flex-col">
                                <span className={clsx("text-sm", inWatchLater ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-900 dark:text-white")}>
                                    {inWatchLater ? "Remove from Watch later" : "Save to Watch later"}
                                </span>
                            </div>
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-left">
                            <Scissors className="w-5 h-5 text-gray-900 dark:text-white" />
                            <span className="text-sm text-gray-900 dark:text-white">Clip</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-left">
                            <Flag className="w-5 h-5 text-gray-900 dark:text-white" />
                            <span className="text-sm text-gray-900 dark:text-white">Report</span>
                        </button>
                    </div>
                )}
            </div>

            {showMoreMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
            )}

            {/* Watch Later Toast */}
            {showWatchLaterToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-3 rounded-lg shadow-2xl animate-in fade-in slide-in-from-bottom-2 z-50 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium">
                        {inWatchLater ? "Saved to Watch later" : "Removed from Watch later"}
                    </span>
                </div>
            )}

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                videoUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/watch/${video.id}`}
                videoTitle={video.title}
            />
        </div>
    );
}
