"use client";

import { useAuth } from "@/components/AuthContext";
import { Plus, VideoOff, Bell, Camera, X, MessageSquare, History } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Post {
    id: string;
    message: string;
    image: string | null;
    timestamp: number;
}

export default function ActivitiesPage() {
    const { user } = useAuth();
    const pathname = usePathname();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [postImage, setPostImage] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const savedPosts = localStorage.getItem("user_posts");
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
    }, []);

    const handlePublishPost = () => {
        if (!postMessage.trim() && !postImage) return;

        const newPost: Post = {
            id: Date.now().toString(),
            message: postMessage,
            image: postImage,
            timestamp: Date.now(),
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem("user_posts", JSON.stringify(updatedPosts));

        setPostMessage("");
        setPostImage(null);
        setShowCreatePost(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPostImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const tabs = [
        { label: "PlayLists", href: "/playlists" },
        { label: "Activities", href: "/activities" },
        { label: "About", href: "/about" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#0f0f0f] pb-20">
            {/* Profile Header (Same as Playlists) */}
            <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.1) 0%, transparent 20%)' }}></div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-white/10 px-4 md:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-end -mt-12 pb-6 gap-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-[#0f0f0f] overflow-hidden bg-purple-600 shadow-lg relative z-10 flex-shrink-0">
                        {user?.avatar && user.avatar !== "U" ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold uppercase text-white font-mono">
                                {user?.username?.[0] || "U"}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-end w-full font-mono">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-black text-foreground">{user?.username || "Shaikh Ahad"}</h1>
                            <p className="text-sm text-foreground/50 font-bold mt-1 tracking-tighter">0 Subscribers</p>
                        </div>
                        <button className="mt-4 md:mt-0 bg-[#7a7a7a] hover:bg-[#6a6a6a] text-white px-6 py-2 rounded-md font-black text-sm uppercase transition-all active:scale-95">
                            Manage
                        </button>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={`px-4 py-3 text-sm font-black whitespace-nowrap transition-all relative ${pathname === tab.href
                                    ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#03a9f4]"
                                    : "text-foreground/50 hover:text-foreground"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Activities Content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 mb-8 gap-4 font-mono">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-[#03a9f4]" strokeWidth={3} />
                            <h2 className="text-xl font-black text-foreground italic uppercase tracking-tighter">Most recent activities</h2>
                        </div>
                        <button
                            onClick={() => setShowCreatePost(true)}
                            className="flex items-center justify-center gap-2 bg-[#03a9f4] hover:bg-[#039be5] text-white px-6 py-2.5 rounded-md font-black text-sm uppercase transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            Create Post
                        </button>
                    </div>

                    {posts.length > 0 ? (
                        <div className="flex flex-col gap-8 max-w-4xl">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-xl shadow-black/5 border border-foreground/5 transform transition-all hover:scale-[1.01]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black uppercase overflow-hidden border-2 border-white dark:border-black shadow-md">
                                            {user?.avatar && user.avatar !== "U" ? (
                                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xl">{user?.username?.[0] || "U"}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-black text-foreground text-lg leading-none">{user?.username || "Shaikh Ahad"}</p>
                                            <p className="text-xs text-foreground/40 font-bold mt-1">{new Date(post.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    {post.message && (
                                        <p className="text-foreground/80 mb-6 whitespace-pre-wrap leading-relaxed text-lg font-medium">{post.message}</p>
                                    )}
                                    {post.image && (
                                        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
                                            <img src={post.image} alt="Activity" className="w-full h-auto" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                            <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                                <VideoOff className="w-10 h-10 text-cyan-500" strokeWidth={3} />
                            </div>
                            <p className="text-xl font-black italic uppercase tracking-tighter">No activities found for now.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Post Modal (Same as Playlists) */}
            {showCreatePost && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 border border-white/10">
                        <div className="px-8 py-6 border-b border-foreground/5 flex items-center justify-between bg-gradient-to-r from-transparent to-foreground/5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-tr from-[#03a9f4] to-cyan-400 rounded-2xl shadow-lg shadow-blue-500/40">
                                    <MessageSquare className="w-6 h-6 text-white" strokeWidth={3} />
                                </div>
                                <h2 className="text-2xl font-black text-foreground italic uppercase tracking-tighter">Create new post</h2>
                            </div>
                            <button onClick={() => setShowCreatePost(false)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-all active:scale-95 group">
                                <X className="w-8 h-8 text-foreground/30 group-hover:text-red-500" strokeWidth={3} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="flex-1">
                                    <label className="block text-xs font-black text-foreground/40 mb-3 ml-2 uppercase tracking-[0.2em]">Write a message...</label>
                                    <textarea
                                        value={postMessage}
                                        onChange={(e) => setPostMessage(e.target.value)}
                                        placeholder="Speak your mind..."
                                        className="w-full h-56 bg-[#f8f9fa] dark:bg-[#272727] rounded-3xl p-6 text-foreground outline-none focus:ring-4 focus:ring-[#03a9f4]/20 border-2 border-transparent focus:border-[#03a9f4] transition-all resize-none shadow-inner text-xl font-bold placeholder:text-foreground/10"
                                    />
                                </div>

                                <div className="w-full md:w-72">
                                    <label className="block text-xs font-black text-foreground/40 mb-3 ml-2 uppercase tracking-[0.2em]">Add Visuals</label>
                                    <div className="relative aspect-square bg-[#f8f9fa] dark:bg-[#272727] rounded-3xl border-3 border-dashed border-foreground/10 flex flex-col items-center justify-center cursor-pointer hover:bg-foreground/5 transition-all overflow-hidden group shadow-inner">
                                        {postImage ? (
                                            <>
                                                <img src={postImage} alt="Selected" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                    <Camera className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={3} />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 transition-transform group-hover:scale-110">
                                                <div className="p-5 bg-foreground/5 rounded-full shadow-lg border border-white/5">
                                                    <Camera className="w-10 h-10 text-foreground/20" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm font-black text-foreground/30 uppercase tracking-widest">Upload image</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-12 pb-2">
                                <button
                                    onClick={handlePublishPost}
                                    className="px-20 py-4.5 bg-gradient-to-r from-[#03a9f4] to-cyan-500 hover:to-blue-500 text-white font-black text-2xl italic uppercase rounded-full transition-all active:scale-95 shadow-2xl shadow-blue-500/40 tracking-tighter"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
