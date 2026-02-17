"use client";

import { ThumbsUp, ThumbsDown, Share2, Download, Scissors, MoreHorizontal, Check, Flag, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

    const menuRef = useRef<HTMLDivElement>(null);

    // Sync with global liked state
    useEffect(() => {
        setIsLiked(isVideoLiked(video.id));
    }, [video.id, isVideoLiked]);

    // Sync with global watch later state
    useEffect(() => {
        setInWatchLater(isInWatchLater(video.id));
    }, [video.id, isInWatchLater]);

    // Handle click outside more menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
        };

        if (showMoreMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMoreMenu]);

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
        <div className="flex items-center gap-2 w-full relative">
            {/* Scrollable Content */}
            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 flex-1">
                <div className="flex items-center bg-surface rounded-full overflow-hidden flex-shrink-0">
                    <button
                        onClick={handleLike}
                        className={clsx(
                            "flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-foreground/10 rounded-full transition-colors border-foreground/10",
                            isLiked && "text-accent"
                        )}
                        aria-label="Like video"
                        aria-pressed={isLiked}
                    >
                        <ThumbsUp className={clsx("w-5 h-5", isLiked ? "fill-accent" : "")} />
                        <span className="text-sm font-medium">{likes.toLocaleString()}</span>
                    </button>
                    <button
                        onClick={handleDislike}
                        className={clsx(
                            "px-3 sm:px-4 py-2 hover:bg-foreground/10 rounded-full transition-colors relative",
                            isDisliked && "text-accent"
                        )}
                        aria-label="Dislike video"
                        aria-pressed={isDisliked}
                    >
                        <ThumbsDown className={clsx("w-5 h-5", isDisliked ? "fill-accent" : "")} />
                    </button>
                </div>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-surface hover:bg-foreground/10 rounded-full transition-colors relative flex-shrink-0"
                    aria-label="Share"
                >
                    <Share2 className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-medium text-foreground hidden sm:inline">Share</span>
                </button>

                <button
                    onClick={handleDownload}
                    disabled={isDownloading || downloaded}
                    className="md:flex items-center gap-2 px-2 sm:px-4 py-2 bg-surface hover:bg-foreground/10 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Download"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                    ) : downloaded ? (
                        <Check className="w-5 h-5 text-green-500" />
                    ) : (
                        <Download className="w-5 h-5 text-foreground" />
                    )}
                    <span className="text-sm font-medium text-foreground hidden lg:inline">
                        {isDownloading ? "Downloading..." : downloaded ? "Downloaded" : "Download"}
                    </span>
                    {/* <span className="text-sm font-medium text-gray-900 dark:text-white lg:hidden rounded-full">
                        
                    </span> */}
                </button>
            </div>

            {/* Static Content (More Menu) - Fixed on the right to avoid clipping */}
            <div className="relative flex-shrink-0" ref={menuRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowMoreMenu(!showMoreMenu);
                    }}
                    className="flex items-center justify-center p-2 bg-surface hover:bg-foreground/10 rounded-full transition-colors text-foreground"
                    aria-label="More actions"
                    aria-expanded={showMoreMenu}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>

                {showMoreMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-background rounded-xl shadow-xl py-2 z-50 border border-foreground/10 animate-in fade-in zoom-in-95 origin-bottom-right">
                        <button
                            onClick={handleWatchLater}
                            className={clsx(
                                "flex items-center gap-3 w-full px-4 py-2 hover:bg-foreground/10 text-left",
                                inWatchLater && "bg-accent/10"
                            )}
                        >
                            <Clock className={clsx("w-5 h-5", inWatchLater ? "text-accent" : "text-foreground")} />
                            <div className="flex flex-col">
                                <span className={clsx("text-sm", inWatchLater ? "text-accent font-medium" : "text-foreground")}>
                                    {inWatchLater ? "Remove from Watch later" : "Save to Watch later"}
                                </span>
                            </div>
                        </button>
                        <div className="border-t border-foreground/10 my-2" />
                        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-foreground/10 text-left group">
                            <Scissors className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                            <span className="text-sm text-foreground group-hover:text-accent transition-colors">Clip</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-foreground/10 text-left group">
                            <Flag className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                            <span className="text-sm text-foreground group-hover:text-accent transition-colors">Report</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Watch Later Toast */}
            {showWatchLaterToast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-3 rounded-lg shadow-2xl animate-in fade-in slide-in-from-bottom-2 z-[70] flex items-center gap-2">
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
