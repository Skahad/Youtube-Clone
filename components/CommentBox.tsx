"use client";

import { comments as initialComments, Comment as CommentType } from "@/data/comments";
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react"; // Import Send icon
import { useState } from "react";
import clsx from "clsx";

interface Comment extends CommentType {
    isLiked?: boolean;
    isDisliked?: boolean;
    showReplyInput?: boolean;
    showReplies?: boolean;
    localRepliesList?: Reply[];
}

interface Reply {
    id: string;
    username: string;
    avatar: string;
    content: string;
    timeAgo: string;
    likes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
}

export default function CommentBox() {
    const [comments, setComments] = useState<Comment[]>(initialComments.map(c => ({
        ...c,
        localRepliesList: [] // Initialize with empty local replies
    })));
    const [newComment, setNewComment] = useState("");
    const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
    const [isFocused, setIsFocused] = useState(false);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            videoId: "1",
            username: "User",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
            content: newComment,
            likes: 0,
            timeAgo: "Just now",
            replies: 0,
            localRepliesList: []
        };

        setComments([comment, ...comments]);
        setNewComment("");
        setIsFocused(false);
    };

    const handleAddReply = (parentId: string) => {
        const replyText = replyInputs[parentId];
        if (!replyText?.trim()) return;

        const newReply: Reply = {
            id: Date.now().toString(),
            username: "User",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
            content: replyText,
            timeAgo: "Just now",
            likes: 0
        };

        setComments(comments.map(c => {
            if (c.id === parentId) {
                return {
                    ...c,
                    replies: (c.replies || 0) + 1,
                    localRepliesList: [...(c.localRepliesList || []), newReply],
                    showReplies: true,
                    showReplyInput: false
                };
            }
            return c;
        }));

        setReplyInputs(prev => ({ ...prev, [parentId]: "" }));
    };

    const toggleLike = (id: string) => {
        setComments(comments.map(c => {
            if (c.id === id) {
                if (c.isLiked) {
                    return { ...c, likes: c.likes - 1, isLiked: false };
                } else {
                    return {
                        ...c,
                        likes: c.likes + 1,
                        isLiked: true,
                        isDisliked: false // Toggle off dislike if liked
                    };
                }
            }
            return c;
        }));
    };

    const toggleDislike = (id: string) => {
        setComments(comments.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    isDisliked: !c.isDisliked,
                    isLiked: c.isLiked && !c.isDisliked ? false : c.isLiked, // Potential logic adjustment needed if strictly one or other
                    // Simpler: if dislike, remove like
                    likes: c.isLiked ? c.likes - 1 : c.likes
                };
            }
            return c;
        }));
    };

    const toggleReplyInput = (id: string) => {
        setComments(comments.map(c => c.id === id ? { ...c, showReplyInput: !c.showReplyInput } : c));
    };

    const toggleReplies = (id: string) => {
        setComments(comments.map(c => c.id === id ? { ...c, showReplies: !c.showReplies } : c));
    };

    const toggleLikeReply = (parentId: string, replyId: string) => {
        setComments(comments.map(c => {
            if (c.id === parentId) {
                return {
                    ...c,
                    localRepliesList: c.localRepliesList?.map(r => {
                        if (r.id === replyId) {
                            const liked = !r.isLiked;
                            return {
                                ...r,
                                isLiked: liked,
                                isDisliked: liked ? false : r.isDisliked,
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

    const toggleDislikeReply = (parentId: string, replyId: string) => {
        setComments(comments.map(c => {
            if (c.id === parentId) {
                return {
                    ...c,
                    localRepliesList: c.localRepliesList?.map(r => {
                        if (r.id === replyId) {
                            const disliked = !r.isDisliked;
                            return {
                                ...r,
                                isDisliked: disliked,
                                isLiked: disliked ? false : r.isLiked,
                                likes: (disliked && r.isLiked) ? r.likes - 1 : r.likes
                            };
                        }
                        return r;
                    })
                };
            }
            return c;
        }));
    };

    return (
        <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-2 items-center mb-4">
                <h3 className="text-xl font-bold text-foreground dark:text-white">
                    {comments.length} Comments
                </h3>
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-sm font-medium text-foreground/60 dark:text-gray-400">Sort by</span>
                </div>
            </div>

            {/* Add Comment Input */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    U
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className="w-full bg-transparent border-b border-foreground/10 pb-1 focus:border-black dark:focus:border-white focus:outline-none transition-colors dark:text-gray-100"
                    />
                    {isFocused && (
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={() => {
                                    setIsFocused(false);
                                    setNewComment("");
                                }}
                                className="px-4 py-2 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full text-sm font-medium transition-colors dark:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comments List */}
            <div className="flex flex-col gap-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                            <img
                                src={comment.avatar}
                                alt={comment.username}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="flex flex-col flex-1 gap-1">
                            <div className="flex items-baseline gap-2">
                                <span className={clsx("text-sm font-semibold text-foreground/70 dark:text-white", comment.username === "User" && "bg-foreground/70 dark:bg-gray-700 px-2 py-0.5 rounded-full")}>
                                    @{comment.username.replace(/\s+/g, '').toLowerCase()}
                                </span>
                                <span className="text-xs text-foreground/60 dark:text-gray-400">
                                    {comment.timeAgo}
                                </span>
                            </div>

                            <p className="text-sm text-foreground/70 dark:text-gray-200 mt-1 leading-relaxed">
                                {comment.content}
                            </p>

                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    onClick={() => toggleLike(comment.id)}
                                    className={clsx(
                                        "flex items-center gap-1.5 p-1.5 -ml-1.5 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full transition-colors",
                                        comment.isLiked ? "text-blue-600 dark:text-blue-400" : "text-foreground/60 dark:text-gray-400"
                                    )}
                                    aria-label="Like comment"
                                    aria-pressed={comment.isLiked}
                                >
                                    <ThumbsUp className={clsx("w-4 h-4", comment.isLiked && "fill-current")} />
                                    <span className="text-xs font-medium">{comment.likes > 0 ? comment.likes : ""}</span>
                                </button>

                                <button
                                    onClick={() => toggleDislike(comment.id)}
                                    className={clsx(
                                        "p-1.5 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full transition-colors",
                                        comment.isDisliked ? "text-blue-600 dark:text-blue-400" : "text-foreground/60 dark:text-gray-400"
                                    )}
                                    aria-label="Dislike comment"
                                    aria-pressed={comment.isDisliked}
                                >
                                    <ThumbsDown className={clsx("w-4 h-4", comment.isDisliked && "fill-current")} />
                                </button>

                                <button
                                    onClick={() => toggleReplyInput(comment.id)}
                                    className={clsx(
                                        "px-3 py-1.5 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full text-xs font-medium transition-colors",
                                        comment.showReplyInput ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "text-foreground/60 dark:text-gray-400"
                                    )}
                                >
                                    Reply
                                </button>
                            </div>

                            {/* Reply Input */}
                            {comment.showReplyInput && (
                                <div className="flex gap-3 mt-3 animate-in fade-in slide-in-from-top-1">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                        U
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add a reply..."
                                            value={replyInputs[comment.id] || ""}
                                            onChange={(e) => setReplyInputs(prev => ({ ...prev, [comment.id]: e.target.value }))}
                                            className="w-full bg-transparent border-b border-foreground/10 text-sm pb-1 focus:border-black dark:focus:border-white focus:outline-none dark:text-white"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleAddReply(comment.id);
                                            }}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleReplyInput(comment.id)}
                                                className="px-3 py-1.5 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full text-xs font-medium dark:text-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleAddReply(comment.id)}
                                                disabled={!replyInputs[comment.id]?.trim()}
                                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-medium transition-colors disabled:opacity-50"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(comment.replies > 0 || (comment.localRepliesList?.length || 0) > 0) && (
                                <div className="mt-1">
                                    <button
                                        onClick={() => toggleReplies(comment.id)}
                                        className="flex items-center gap-2 text-blue-600 hover:bg-foreground/10 dark:hover:bg-blue-900/20 w-fit px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {comment.replies} {(comment.replies === 1) ? 'reply' : 'replies'}
                                        </span>
                                    </button>

                                    {comment.showReplies && (
                                        <div className="pl-4 mt-4 border-l-2 border-foreground/10 flex flex-col gap-6">
                                            {/* Local Replies */}
                                            {comment.localRepliesList?.map((reply) => (
                                                <div key={reply.id} className="flex gap-3 group/reply">
                                                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                                        <img src={reply.avatar} alt={reply.username} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-xs font-bold text-foreground/70 dark:text-white">
                                                                @{reply.username.toLowerCase()}
                                                            </span>
                                                            <span className="text-[10px] text-foreground/60 dark:text-gray-400">{reply.timeAgo}</span>
                                                        </div>
                                                        <p className="text-sm text-foreground/70 dark:text-gray-200">{reply.content}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <button
                                                                onClick={() => toggleLikeReply(comment.id, reply.id)}
                                                                className={clsx(
                                                                    "p-1 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full transition-colors",
                                                                    reply.isLiked ? "text-blue-600 dark:text-blue-400" : "text-foreground/60 dark:text-gray-400"
                                                                )}
                                                            >
                                                                <ThumbsUp className={clsx("w-3.5 h-3.5", reply.isLiked && "fill-current")} />
                                                            </button>
                                                            <span className={clsx("text-[10px] font-medium", reply.isLiked ? "text-blue-600 dark:text-blue-400" : "text-foreground/60 dark:text-gray-400")}>
                                                                {reply.likes > 0 ? reply.likes : ""}
                                                            </span>
                                                            <button
                                                                onClick={() => toggleDislikeReply(comment.id, reply.id)}
                                                                className={clsx(
                                                                    "p-1 hover:bg-foreground/10 dark:hover:bg-[#272727] rounded-full transition-colors",
                                                                    reply.isDisliked ? "text-blue-600 dark:text-blue-400" : "text-foreground/60 dark:text-gray-400"
                                                                )}
                                                            >
                                                                <ThumbsDown className={clsx("w-3.5 h-3.5", reply.isDisliked && "fill-current")} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (!comment.showReplyInput) toggleReplyInput(comment.id);
                                                                    setReplyInputs(prev => ({ ...prev, [comment.id]: `@${reply.username.toLowerCase()} ` }));
                                                                }}
                                                                className="text-[10px] font-bold text-foreground/60 dark:text-gray-400 hover:text-foreground transition-colors ml-1"
                                                            >
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Mock Reply (from initial data if exists) */}
                                            {comment.replies > (comment.localRepliesList?.length || 0) && (
                                                <div className="flex gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-foreground/70 dark:text-white">@randomuser</span>
                                                        <p className="text-sm text-foreground/60 dark:text-gray-200">This is a mock reply to show interactions.</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
