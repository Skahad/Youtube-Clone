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
}

export default function CommentBox() {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            videoId: "1", // Default video ID for now
            username: "User",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80", // Placeholder user avatar
            content: newComment,
            likes: 0,
            timeAgo: "Just now",
            replies: 0
        };

        setComments([comment, ...comments]);
        setNewComment("");
        setIsFocused(false);
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

    return (
        <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-2 items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {comments.length} Comments
                </h3>
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by</span>
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
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 pb-1 focus:border-black dark:focus:border-white focus:outline-none transition-colors dark:text-gray-100"
                    />
                    {isFocused && (
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={() => {
                                    setIsFocused(false);
                                    setNewComment("");
                                }}
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full text-sm font-medium transition-colors dark:text-gray-300"
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
                                <span className={clsx("text-sm font-semibold text-gray-900 dark:text-white", comment.username === "User" && "bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full")}>
                                    @{comment.username.replace(/\s+/g, '').toLowerCase()}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {comment.timeAgo}
                                </span>
                            </div>

                            <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 leading-relaxed">
                                {comment.content}
                            </p>

                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    onClick={() => toggleLike(comment.id)}
                                    className={clsx(
                                        "flex items-center gap-1.5 p-1.5 -ml-1.5 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors",
                                        comment.isLiked ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
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
                                        "p-1.5 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors",
                                        comment.isDisliked ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                                    )}
                                    aria-label="Dislike comment"
                                    aria-pressed={comment.isDisliked}
                                >
                                    <ThumbsDown className={clsx("w-4 h-4", comment.isDisliked && "fill-current")} />
                                </button>

                                <button
                                    onClick={() => toggleReplyInput(comment.id)}
                                    className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors"
                                >
                                    Reply
                                </button>
                            </div>

                            {/* Reply Input */}
                            {comment.showReplyInput && (
                                <div className="flex gap-3 mt-3 animate-in fade-in slide-in-from-top-1">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        U
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Reply..."
                                            className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-700 text-sm pb-1 focus:border-black dark:focus:border-white focus:outline-none dark:text-white"
                                            autoFocus
                                        />
                                        <button className="text-blue-600 disabled:opacity-50 font-medium text-sm">Reply</button>
                                    </div>
                                </div>
                            )}

                            {comment.replies > 0 && (
                                <div className="mt-1">
                                    <button
                                        onClick={() => toggleReplies(comment.id)}
                                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 w-fit px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {comment.replies} replies
                                        </span>
                                    </button>

                                    {comment.showReplies && (
                                        <div className="pl-4 mt-2 border-l-2 border-gray-200 dark:border-gray-700 flex flex-col gap-3">
                                            {/* Mock Reply */}
                                            <div className="flex gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-900 dark:text-white">@randomuser</span>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">This is a mock reply to show interactions.</p>
                                                </div>
                                            </div>
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
