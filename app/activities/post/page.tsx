"use client";

import { useAuth } from "@/components/AuthContext";
import { MessageSquare, Image as ImageIcon, X, ArrowLeft, Globe, Lock, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Post {
    id: string;
    message: string;
    image: string | null;
    timestamp: number;
    visibility: string;
}

export default function CreatePostPage() {
    const { user } = useAuth();
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [visibility, setVisibility] = useState("Public");
    const [isPublishing, setIsPublishing] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        if (!message.trim() && !image) return;

        setIsPublishing(true);

        const newPost: Post = {
            id: Date.now().toString(),
            message,
            image,
            timestamp: Date.now(),
            visibility
        };

        // Simulate save to localStorage
        const savedPosts = localStorage.getItem("user_posts");
        const posts = savedPosts ? JSON.parse(savedPosts) : [];
        const updatedPosts = [newPost, ...posts];
        localStorage.setItem("user_posts", JSON.stringify(updatedPosts));

        setTimeout(() => {
            setToast("Post published successfully!");
            setTimeout(() => {
                router.push("/activities");
            }, 1500);
        }, 800);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f1f1f1] dark:bg-[#0f0f0f] pb-20 transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/10 sticky top-0 z-40">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-foreground" />
                        </button>
                        <h1 className="text-xl font-black text-foreground italic uppercase tracking-tighter">Create Post</h1>
                    </div>

                    <button
                        onClick={handlePublish}
                        disabled={(!message.trim() && !image) || isPublishing}
                        className={clsx(
                            "px-6 py-2 rounded-full font-black text-sm uppercase italic tracking-tighter transition-all active:scale-95",
                            (!message.trim() && !image) || isPublishing
                                ? "bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed"
                                : "bg-[#03a9f4] text-white shadow-lg shadow-blue-500/20 hover:bg-[#039be5]"
                        )}
                    >
                        {isPublishing ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 mt-6">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-xl overflow-hidden border border-foreground/5">
                    {/* User Info & Visibility */}
                    <div className="p-6 flex items-center justify-between border-b border-foreground/5 bg-gradient-to-r from-transparent to-foreground/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-xl uppercase overflow-hidden ring-2 ring-white dark:ring-black lg:w-14 lg:h-14">
                                {user.avatar && user.avatar !== "U" ? (
                                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{user.username?.[0] || "U"}</span>
                                )}
                            </div>
                            <div className="font-mono">
                                <p className="font-black text-foreground text-lg leading-none">{user.username || "Shaikh Ahad"}</p>
                                <div className="flex items-center gap-2 mt-1.5 p-1 px-2 bg-foreground/5 rounded-lg w-fit">
                                    <Globe className="w-3 h-3 text-[#03a9f4]" />
                                    <span className="text-[10px] font-black text-foreground/50 uppercase tracking-widest">{visibility}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setVisibility("Public")}
                                className={clsx(
                                    "p-2 rounded-xl transition-all",
                                    visibility === "Public" ? "bg-[#03a9f4]/10 text-[#03a9f4]" : "text-foreground/30 hover:bg-foreground/5"
                                )}
                            >
                                <Globe className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setVisibility("Private")}
                                className={clsx(
                                    "p-2 rounded-xl transition-all",
                                    visibility === "Private" ? "bg-red-500/10 text-red-500" : "text-foreground/30 hover:bg-foreground/5"
                                )}
                            >
                                <Lock className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* TextArea */}
                    <div className="p-6">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="What's on your mind? Share an update or poll..."
                            className="w-full h-48 sm:h-64 bg-transparent text-foreground outline-none text-xl sm:text-2xl font-bold placeholder:text-foreground/10 resize-none font-mono leading-relaxed"
                        />
                    </div>

                    {/* Image Preview */}
                    {image && (
                        <div className="px-6 pb-6">
                            <div className="relative rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl group">
                                <img src={image} alt="Selected" className="w-full h-auto max-h-[500px] object-cover" />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm shadow-xl"
                                >
                                    <X className="w-6 h-6" strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Toolbar */}
                    <div className="p-6 bg-gray-50/50 dark:bg-white/5 border-t border-foreground/5 flex items-center gap-4">
                        <label className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-white/10 text-foreground rounded-2xl cursor-pointer transition-all border border-foreground/10 shadow-sm active:scale-95 group">
                            <ImageIcon className="w-6 h-6 text-[#03a9f4] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                            <span className="text-sm font-black uppercase italic tracking-tighter">Add Photo</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>

                        <button className="p-3 bg-white dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-white/10 text-foreground/30 rounded-2xl transition-all border border-foreground/10 shadow-sm">
                            <MessageSquare className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Info Tip */}
                <p className="mt-8 text-center text-xs font-black text-foreground/20 uppercase tracking-[0.2em] font-mono">
                    Keep it respectful. Community guidelines apply.
                </p>
            </div>

            {/* Success Toast */}
            {toast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="px-8 py-4 bg-green-600 text-white rounded-full shadow-2xl flex items-center gap-4 border border-green-500">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="font-black italic uppercase tracking-tighter text-lg">{toast}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
