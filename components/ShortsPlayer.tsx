"use client";

import { MessageSquare, MoreHorizontal, Share2, ThumbsDown, ThumbsUp, Volume2, VolumeX, Play, X, Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ShortVideo } from "@/data/shorts";
import { useSubscriptions } from "./SubscriptionsProvider";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import ShareModal from "./ShareModal";

interface ShortsPlayerProps {
    short: ShortVideo;
}

export default function ShortsPlayer({ short }: ShortsPlayerProps) {
    const { isSubscribed: isChannelSubscribed, toggleSubscription } = useSubscriptions();
    const { user } = useAuth();
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [likes, setLikes] = useState(short.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [replyingTo, setReplyingTo] = useState<{ commentId: number; userName: string } | null>(null);
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
    const [localComments, setLocalComments] = useState([
        {
            id: 1,
            user: "@alex_j",
            text: "The transition at 0:05 is absolute fire! 🔥",
            time: "2h ago",
            likes: 124,
            likedByMe: false,
            dislikedByMe: false,
            avatar: "A",
            replies: [
                { id: 101, user: "@creative_mind", text: "Totally agree! Must have taken hours to edit.", time: "1h ago", likes: 12, likedByMe: false, dislikedByMe: false, avatar: "C" },
                { id: 102, user: "@alex_j", text: "@creative_mind It actually did! Glad you noticed.", time: "30m ago", likes: 5, likedByMe: false, dislikedByMe: false, avatar: "A" }
            ]
        },
        {
            id: 2,
            user: "@tech_guru",
            text: "What camera did you use for this? The quality is insane.",
            time: "1h ago",
            likes: 45,
            likedByMe: false,
            dislikedByMe: false,
            avatar: "T",
            replies: [
                { id: 201, user: "@short_maker", text: "Shot on Sony A7S III!", time: "45m ago", likes: 20, likedByMe: false, dislikedByMe: false, avatar: "S" }
            ]
        },
        { id: 3, user: "@vibe_check", text: "This deserves way more views. Shared!", time: "45m ago", likes: 89, likedByMe: false, dislikedByMe: false, avatar: "V", replies: [] },
    ]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const commentsRef = useRef<HTMLDivElement>(null);

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

    const isSubscribed = !!user && isChannelSubscribed(short.channelId);

    const handleSubscribe = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            router.push("/login");
            return;
        }
        toggleSubscription(short.channelId);
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

    // Handle click outside more menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setShowMore(false);
            }
        };

        if (showMore) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMore]);

    // Handle click outside comments section
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
                setShowComments(false);
            }
        };

        if (showComments) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showComments]);

    const handleAddComment = () => {
        if (!commentInput.trim()) return;

        const newCommentObj = {
            id: Date.now(),
            user: "@you",
            text: commentInput,
            time: "Just now",
            likes: 0,
            likedByMe: false,
            dislikedByMe: false,
            avatar: "U"
        };

        if (replyingTo) {
            setLocalComments(prev => prev.map(c => {
                if (c.id === replyingTo.commentId) {
                    return {
                        ...c,
                        replies: [...c.replies, { ...newCommentObj, replies: undefined }]
                    };
                }
                return c;
            }));
            if (!expandedComments.has(replyingTo.commentId)) {
                toggleReplies(replyingTo.commentId);
            }
        } else {
            setLocalComments([{ ...newCommentObj, replies: [] }, ...localComments]);
        }

        setCommentInput("");
        setReplyingTo(null);
    };

    const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
        setLocalComments(prev => prev.map(c => {
            if (!isReply && c.id === commentId) {
                const liked = !c.likedByMe;
                return {
                    ...c,
                    likedByMe: liked,
                    dislikedByMe: liked ? false : c.dislikedByMe,
                    likes: liked ? c.likes + 1 : c.likes - 1
                };
            }
            if (isReply && c.id === parentId) {
                return {
                    ...c,
                    replies: c.replies.map(r => {
                        if (r.id === commentId) {
                            const liked = !r.likedByMe;
                            return {
                                ...r,
                                likedByMe: liked,
                                dislikedByMe: liked ? false : r.dislikedByMe,
                                likes: liked ? r.likes + 1 : r.likes - 1
                            };
                        }
                        return r;
                    })
                };
            }
            return c;
        }));
    };

    const handleDislikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
        setLocalComments(prev => prev.map(c => {
            if (!isReply && c.id === commentId) {
                const disliked = !c.dislikedByMe;
                return {
                    ...c,
                    dislikedByMe: disliked,
                    likedByMe: disliked ? false : c.likedByMe,
                    likes: (disliked && c.likedByMe) ? c.likes - 1 : c.likes
                };
            }
            if (isReply && c.id === parentId) {
                return {
                    ...c,
                    replies: c.replies.map(r => {
                        if (r.id === commentId) {
                            const disliked = !r.dislikedByMe;
                            return {
                                ...r,
                                dislikedByMe: disliked,
                                likedByMe: disliked ? false : r.likedByMe,
                                likes: (disliked && r.likedByMe) ? r.likes - 1 : r.likes
                            };
                        }
                        return r;
                    })
                };
            }
            return c;
        }));
    };

    const toggleReplies = (commentId: number) => {
        setExpandedComments(prev => {
            const next = new Set(prev);
            if (next.has(commentId)) {
                next.delete(commentId);
            } else {
                next.add(commentId);
            }
            return next;
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    };

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
                        <ThumbsUp className={clsx("w-7 h-7", isLiked ? "fill-accent text-accent" : "text-white")} />
                    </div>
                    <span className="text-xs font-semibold text-white">{likes.toLocaleString()}</span>
                </button>

                <button onClick={handleDislike} className="flex flex-col items-center gap-1 group">
                    <div className={clsx("p-3 rounded-full transition-colors", isDisliked ? "bg-white/20" : "bg-gray-800/60 hover:bg-gray-700/60")}>
                        <ThumbsDown className={clsx("w-7 h-7", isDisliked ? "fill-accent text-accent" : "text-white")} />
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

                <div className="relative" ref={moreMenuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMore(!showMore);
                        }}
                        className="p-3 rounded-full bg-gray-800/60 hover:bg-gray-700/60 transition-colors"
                    >
                        <MoreHorizontal className="w-7 h-7 text-white" />
                    </button>
                    {showMore && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#272727] rounded-xl shadow-xl overflow-hidden py-1 w-32 animate-in fade-in zoom-in-95 origin-bottom-right z-50">
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white transition-colors">Report</button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white transition-colors">Don't recommend</button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3f3f3f] text-black dark:text-white transition-colors">Description</button>
                        </div>
                    )}
                </div>

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
                    <button onClick={handleSubscribe} className={clsx("text-xs font-bold px-3 py-1.5 rounded-full transition-all ml-2", isSubscribed ? "bg-accent/95 text-white hover:bg-accent/80" : "bg-white text-black hover:bg-gray-200")}>
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
                <div
                    ref={commentsRef}
                    className="absolute inset-x-0 bottom-0 h-[70vh] bg-background border-t border-foreground/10 rounded-t-2xl z-40 flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl"
                >
                    <div className="flex items-center justify-between p-4 border-b border-foreground/10">
                        <h3 className="font-bold text-foreground">Comments ({short.comments})</h3>
                        <button
                            onClick={() => setShowComments(false)}
                            className="p-2 hover:bg-surface-hover rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-foreground" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 no-scrollbar">
                        {localComments.map((comment) => (
                            <div key={comment.id} className="flex flex-col gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                                        {comment.avatar}
                                    </div>
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs font-bold text-foreground">{comment.user}</span>
                                            <span className="text-[10px] text-foreground/50">{comment.time}</span>
                                        </div>
                                        <p className="text-sm text-foreground/90 leading-relaxed">{comment.text}</p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => handleLikeComment(comment.id)}
                                                    className="p-1 hover:bg-surface-hover rounded-full transition-colors group"
                                                >
                                                    <ThumbsUp className={clsx("w-3.5 h-3.5 transition-colors", comment.likedByMe ? "text-accent fill-accent" : "text-foreground/60 group-hover:text-accent")} />
                                                </button>
                                                <span className={clsx("text-[10px] font-medium transition-colors", comment.likedByMe ? "text-accent" : "text-foreground/60")}>{comment.likes}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDislikeComment(comment.id)}
                                                className="p-1 hover:bg-surface-hover rounded-full transition-colors group"
                                            >
                                                <ThumbsDown className={clsx("w-3.5 h-3.5 transition-colors", comment.dislikedByMe ? "text-accent fill-accent" : "text-foreground/60 group-hover:text-accent")} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCommentInput(`@${comment.user.replace('@', '')} `);
                                                    setReplyingTo({ commentId: comment.id, userName: comment.user });
                                                    if (!expandedComments.has(comment.id)) toggleReplies(comment.id);
                                                }}
                                                className="text-xs font-bold text-foreground/60 hover:text-foreground transition-colors ml-1 px-2 py-0.5 rounded-md hover:bg-surface-hover"
                                            >
                                                Reply
                                            </button>
                                        </div>

                                        {comment.replies.length > 0 && (
                                            <button
                                                onClick={() => toggleReplies(comment.id)}
                                                className="text-xs font-bold text-accent hover:underline mt-2 text-left w-fit"
                                            >
                                                {expandedComments.has(comment.id) ? "Hide replies" : `View ${comment.replies.length} replies`}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {expandedComments.has(comment.id) && comment.replies.length > 0 && (
                                    <div className="ml-12 flex flex-col gap-5 border-l-2 border-foreground/5 pl-4 py-2 mt-1 animate-in slide-in-from-top-2 duration-300">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex gap-3">
                                                <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px] font-bold flex-shrink-0">
                                                    {reply.avatar}
                                                </div>
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xs font-bold text-foreground">{reply.user}</span>
                                                        <span className="text-[10px] text-foreground/50">{reply.time}</span>
                                                    </div>
                                                    <p className="text-sm text-foreground/90 leading-relaxed">{reply.text}</p>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                                                className="p-1 hover:bg-surface-hover rounded-full transition-colors group"
                                                            >
                                                                <ThumbsUp className={clsx("w-3 h-3 transition-colors", reply.likedByMe ? "text-accent fill-accent" : "text-foreground/60 group-hover:text-accent")} />
                                                            </button>
                                                            <span className={clsx("text-[10px] font-medium", reply.likedByMe ? "text-accent" : "text-foreground/60")}>{reply.likes}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDislikeComment(reply.id, true, comment.id)}
                                                            className="p-1 hover:bg-surface-hover rounded-full transition-colors group"
                                                        >
                                                            <ThumbsDown className={clsx("w-3 h-3 transition-colors", reply.dislikedByMe ? "text-accent fill-accent" : "text-foreground/60 group-hover:text-accent")} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCommentInput(`@${reply.user.replace('@', '')} `);
                                                                setReplyingTo({ commentId: comment.id, userName: reply.user });
                                                            }}
                                                            className="text-[10px] font-bold text-foreground/60 hover:text-foreground transition-colors ml-1 px-2 py-0.5 rounded-md hover:bg-surface-hover"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-foreground/10 bg-background/80 backdrop-blur-md sticky bottom-0 flex flex-col gap-2">
                        {replyingTo && (
                            <div className="flex items-center justify-between text-[10px] text-foreground/60 px-2 animate-in slide-in-from-bottom-1">
                                <span>Replying to {replyingTo.userName}</span>
                                <button onClick={() => { setReplyingTo(null); setCommentInput(""); }} className="hover:text-foreground">Cancel</button>
                            </div>
                        )}
                        <div className="flex gap-3 items-center">
                            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg">U</div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={replyingTo ? "Add a reply..." : "Add a comment..."}
                                    className="w-full bg-surface border border-foreground/5 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground placeholder:text-foreground/40 transition-all"
                                />
                                <button
                                    onClick={handleAddComment}
                                    disabled={!commentInput.trim()}
                                    className={clsx(
                                        "absolute right-1 top-1 bottom-1 px-3 rounded-full font-bold text-sm transition-all",
                                        commentInput.trim()
                                            ? "text-accent hover:bg-accent/10"
                                            : "text-foreground/20 cursor-not-allowed"
                                    )}
                                >
                                    {replyingTo ? "Reply" : "Send"}
                                </button>
                            </div>
                        </div>
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
