"use client";

import { MessageSquare, MoreHorizontal, Share2, ThumbsDown, ThumbsUp, Volume2, VolumeX, Play, X, Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShortVideo } from "@/data/shorts";
import Link from "next/link";
import clsx from "clsx";
import ShareModal from "./ShareModal";

interface ShortsPlayerProps {
    short: ShortVideo;
}

export default function ShortsPlayer({ short }: ShortsPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [likes, setLikes] = useState(short.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleLike = () => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } else {
            if (isDisliked) setIsDisliked(false);
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
    };

    const handleDislike = () => {
        if (isDisliked) {
            setIsDisliked(false);
        } else {
            if (isLiked) {
                setLikes(prev => prev - 1);
                setIsLiked(false);
            }
            setIsDisliked(true);
        }
    };

    const handleSubscribe = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSubscribed(!isSubscribed);
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => { });
                    setIsPlaying(true);
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <div className="relative h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] w-full max-w-[450px] aspect-[9/16] bg-black md:rounded-xl overflow-hidden shadow-2xl snap-start flex-shrink-0 group mx-auto">
            <video
                ref={videoRef}
                src={short.videoUrl}
                className="w-full h-full object-cover cursor-pointer"
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlay}
                poster={short.thumbnail}
            />

            {!isPlaying && !showComments && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 z-20">
                    <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                </div>
            )}

            <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-30 p-2 bg-black/40 rounded-full text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-10" />

            <div className={clsx("absolute right-2 bottom-4 flex flex-col items-center gap-6 z-20 pointer-events-auto pb-8 md:pb-4 transition-opacity duration-200", showComments ? "opacity-0" : "opacity-100")}>
                <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
                    <div className={clsx("p-3 rounded-full transition-colors", isLiked ? "bg-white/20" : "bg-gray-800/60 hover:bg-gray-700/60")}>
                        <ThumbsUp className={clsx("w-7 h-7", isLiked ? "fill-white text-white" : "text-white")} />
                    </div>
                    <span className="text-xs font-semibold text-white">{likes.toLocaleString()}</span>
                </button>

                <button onClick={handleDislike} className="flex flex-col items-center gap-1 group">
                    <div className={clsx("p-3 rounded-full transition-colors", isDisliked ? "bg-white/20" : "bg-gray-800/60 hover:bg-gray-700/60")}>
                        <ThumbsDown className={clsx("w-7 h-7", isDisliked ? "fill-white text-white" : "text-white")} />
                    </div>
                    <span className="text-xs font-semibold text-white">Dislike</span>
                </button>

                <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1 group">
                    <div className="p-3 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors">
                        <MessageSquare className="w-7 h-7 text-white fill-white/10" />
                    </div>
                    <span className="text-xs font-semibold text-white">{short.comments}</span>
                </button>

                <button onClick={handleShare} className="flex flex-col items-center gap-1 group relative">
                    <div className="p-3 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors">
                        <Share2 className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white">Share</span>
                </button>

                <button onClick={() => setShowMore(!showMore)} className="p-3 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors relative">
                    <MoreHorizontal className="w-7 h-7 text-white" />
                    {showMore && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#272727] rounded-xl shadow-xl overflow-hidden py-1 w-32 animate-in fade-in zoom-in-95 origin-bottom-right">
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white">Report</button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white">Don't recommend</button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white">Description</button>
                        </div>
                    )}
                </button>

                <Link href={`/channel/${short.channelId}`} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white/20 mt-2 bg-gray-800 animate-spin-slow">
                    <img src={short.thumbnail} className="w-full h-full object-cover opacity-80" alt="Sound" />
                </Link>
            </div>

            <div className={clsx("absolute left-4 bottom-4 right-16 z-20 pointer-events-auto flex flex-col gap-3 pb-8 md:pb-4 transition-opacity duration-200", showComments ? "opacity-0" : "opacity-100")}>
                <div className="flex items-center gap-2">
                    <Link href={`/channel/${short.channelId}`} className="w-9 h-9 rounded-full overflow-hidden border border-white/20 cursor-pointer hover:scale-105 transition-transform flex-shrink-0">
                        <img src={short.channelAvatar} alt={short.channelName} className="w-full h-full object-cover" />
                    </Link>
                    <Link href={`/channel/${short.channelId}`} className="text-sm font-bold text-white drop-shadow-md cursor-pointer hover:underline decoration-white truncate max-w-[150px]">
                        @{short.channelName.replace(/\s+/g, '').toLowerCase()}
                    </Link>
                    <button onClick={handleSubscribe} className={clsx("text-xs font-bold px-3 py-1.5 rounded-full transition-all ml-2", isSubscribed ? "bg-white/20 text-white hover:bg-white/30" : "bg-white text-black hover:bg-gray-200")}>
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                </div>

                <div onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className={clsx("text-sm text-white drop-shadow-md font-medium cursor-pointer transition-all", isDescriptionExpanded ? "line-clamp-none bg-black/40 p-2 rounded-lg backdrop-blur-sm" : "line-clamp-2")}>
                    {short.description}
                </div>

                <div className="flex items-center gap-2 text-white/90 text-sm overflow-hidden font-medium">
                    <div className="w-5 h-5 flex items-center justify-center">🎵</div>
                    <div className="truncate w-full pr-4">
                        <span className="">{short.audioTrack} • Original Audio</span>
                    </div>
                </div>
            </div>

            {showComments && (
                <div className="absolute inset-x-0 bottom-0 h-[70vh] bg-white dark:bg-[#0f0f0f] rounded-t-2xl z-40 flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="font-bold text-black dark:text-white">Comments ({short.comments})</h3>
                        <button onClick={() => setShowComments(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full">
                            <X className="w-5 h-5 text-black dark:text-white" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">@user{i}</span>
                                        <span className="text-[10px] text-gray-500">2h ago</span>
                                    </div>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">This is a mock comment for the shorts viewer! Awesome content.</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <button className="flex items-center gap-1 text-xs text-gray-500"><ThumbsUp className="w-3 h-3" /> 12</button>
                                        <button className="flex items-center gap-1 text-xs text-gray-500"><ThumbsDown className="w-3 h-3" /></button>
                                        <button className="text-xs font-semibold text-gray-500">Reply</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">U</div>
                        <input type="text" placeholder="Add a comment..." className="flex-1 bg-gray-100 dark:bg-[#272727] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black dark:text-white" />
                    </div>
                </div>
            )}

            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                videoUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/shorts/${short.id}`}
                videoTitle={short.description}
            />
        </div>
    );
}
