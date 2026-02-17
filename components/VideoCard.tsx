"use client";

import Link from "next/link";
import { CheckCircle2, MoreVertical, Clock, Share2, Check } from "lucide-react";
import { Video } from "@/data/videos";
import { useState, useRef, useEffect } from "react";
import { useWatchLater } from "./WatchLaterProvider";
import clsx from "clsx";

import ShareModal from "./ShareModal";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    const { isInWatchLater, toggleWatchLater } = useWatchLater();
    const [showMenu, setShowMenu] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isAddedToWatchLater = isInWatchLater(video.id);

    const handleToggleWatchLater = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchLater(video);
        setShowMenu(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(false);
        setShowShareModal(true);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="flex flex-col gap-2 group cursor-pointer relative">
            {/* Thumbnail Container */}
            <Link href={`/watch/${video.id}`} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-[#272727]">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                    {video.duration}
                </div>

                {/* Hover Quick Action: Watch Later */}
                <button
                    onClick={handleToggleWatchLater}
                    className={clsx(
                        "absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10",
                        isAddedToWatchLater && "opacity-100 bg-blue-600"
                    )}
                    title={isAddedToWatchLater ? "Remove from Watch later" : "Save to Watch later"}
                >
                    <Clock className="w-5 h-5" />
                </button>
            </Link>

            {/* Info */}
            <div className="flex gap-3 px-1 mt-1 relative">
                {/* Channel Avatar */}
                <Link href={`/channel/${video.channelId}`} className="flex-shrink-0">
                    <img
                        src={video.channelAvatar}
                        alt={video.channelName}
                        className="w-9 h-9 rounded-full object-cover hover:opacity-80 transition-opacity"
                    />
                </Link>

                {/* Text Info */}
                <div className="flex flex-col pr-8 w-full">
                    <Link href={`/watch/${video.id}`}>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {video.title}
                        </h3>
                    </Link>

                    <Link href={`/channel/${video.channelId}`} className="text-sm text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                        {video.channelName}
                        <CheckCircle2 className="w-3.5 h-3.5 fill-gray-500 text-white" />
                    </Link>

                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center flex-wrap">
                        <span>{video.views} views</span>
                        <span className="mx-1.5 min-w-[2px] h-[2px] rounded-full bg-gray-500 dark:bg-gray-400" aria-hidden="true" />
                        <span>{video.uploadedAt}</span>
                    </div>
                </div>

                {/* More Menu Trigger */}
                <div className="absolute top-0 right-0" ref={menuRef}>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    {showMenu && (
                        <div className="absolute top-10 right-0 w-56 bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 origin-top-right">
                            <button
                                onClick={handleToggleWatchLater}
                                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-left text-sm text-gray-900 dark:text-white"
                            >
                                <Clock className="w-5 h-5" />
                                {isAddedToWatchLater ? "Remove from Watch later" : "Save to Watch later"}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-left text-sm text-gray-900 dark:text-white"
                            >
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* In-card Toast */}
            {showToast && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-in fade-in slide-in-from-bottom-2 z-20 flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-400" />
                    {isAddedToWatchLater ? "Added to Watch later" : "Removed"}
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
