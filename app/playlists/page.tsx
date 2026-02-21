"use client";

import { useAuth } from "@/components/AuthContext";
import { ListVideo, Plus, VideoOff, MoreVertical, Edit2, Trash2, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { usePlaylists, Playlist } from "@/components/PlaylistsProvider";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import clsx from "clsx";

export default function PlaylistsPage() {
    const { user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const { playlists, addPlaylist, updatePlaylist, deletePlaylist } = usePlaylists();
    const { subscribedChannelIds } = useSubscriptions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDesc, setPlaylistDesc] = useState("");
    const [visibility, setVisibility] = useState<"Public" | "Private">("Private");

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
    const [privacySettings, setPrivacySettings] = useState<any>({});

    const menuRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { label: "PlayLists", href: "/playlists" },
        { label: "Activities", href: "/activities" },
        { label: "About", href: "/about" }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        // Fetch privacy settings
        if (user?.handle) {
            const saved = localStorage.getItem(`privacy_settings_${user.handle}`);
            if (saved) {
                setPrivacySettings(JSON.parse(saved));
            }
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [user]);

    const showToast = (message: string, type: "success" | "info" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleCreateOrUpdate = () => {
        if (!playlistName.trim()) return;

        if (editingPlaylist) {
            updatePlaylist(editingPlaylist.id, playlistName, playlistDesc, visibility);
            showToast("Playlist updated successfully");
        } else {
            addPlaylist(playlistName, playlistDesc, visibility);
            showToast("Playlist created successfully");
        }

        closeModal();
    };

    const openCreateModal = () => {
        setEditingPlaylist(null);
        setPlaylistName("");
        setPlaylistDesc("");
        setVisibility("Private");
        setIsModalOpen(true);
    };

    const openEditModal = (playlist: Playlist) => {
        setEditingPlaylist(playlist);
        setPlaylistName(playlist.name);
        setPlaylistDesc(playlist.description);
        setVisibility(playlist.visibility);
        setIsModalOpen(true);
        setActiveMenu(null);
    };

    const handleDelete = (id: string) => {
        deletePlaylist(id);
        showToast("Playlist deleted", "info");
        setActiveMenu(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPlaylist(null);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Banner */}
            <div className="h-32 md:h-52 w-full bg-surface relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                        {user?.avatar && user.avatar !== "U" ? (
                            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold uppercase text-white bg-purple-600 font-mono">
                                {user?.username?.[0] || "U"}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1 pt-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">
                                    {user?.username || "Shaikh Ahad"}
                                </h1>
                                <div className="text-foreground/70 text-sm flex flex-col md:flex-row gap-1 md:gap-2 font-medium mt-1">
                                    <span className="font-semibold">@{user?.username?.replace(/\s+/g, '').toLowerCase() || "user"}</span>
                                    {privacySettings.showSubscriptions !== "No" && (
                                        <>
                                            <span className="hidden md:inline">•</span>
                                            <span>{subscribedChannelIds.length} subscribers</span>
                                        </>
                                    )}
                                    {privacySettings.watchWho !== "Only Me" && (
                                        <>
                                            <span className="hidden md:inline">•</span>
                                            <span>{playlists.length} playlists</span>
                                        </>
                                    )}
                                </div>
                                <p className="text-foreground/70 text-sm max-w-2xl mt-2 line-clamp-2">
                                    Daily tips and tricks to improve productivity and code quality.
                                </p>
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <button
                                    onClick={() => router.push(`/settings/profile/${user?.handle || '@me'}`)}
                                    className="bg-foreground text-background px-6 py-2 rounded-full font-bold text-sm uppercase transition-all hover:opacity-90 active:scale-95"
                                >
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-foreground/10 flex items-center gap-6 overflow-x-auto no-scrollbar font-mono">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={clsx(
                                "px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
                                pathname === tab.href
                                    ? "border-foreground text-foreground"
                                    : "border-transparent text-foreground/50 hover:text-foreground"
                            )}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-foreground/10 pb-4 mb-12 gap-4 font-mono">
                            <div className="flex items-center gap-3">
                                <ListVideo className="w-5 h-5 text-[#03a9f4]" strokeWidth={3} />
                                <h2 className="text-xl font-black text-foreground italic uppercase tracking-tighter">My PlayLists</h2>
                            </div>
                            <button
                                onClick={openCreateModal}
                                className="flex items-center justify-center gap-2 bg-[#03a9f4] hover:bg-[#039be5] text-white px-6 py-2.5 rounded-md font-black text-sm uppercase transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                            >
                                <Plus size={16} strokeWidth={4} />
                                Create new
                            </button>
                        </div>

                        {playlists.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                                    <VideoOff className="w-10 h-10 text-cyan-500" strokeWidth={3} />
                                </div>
                                <p className="text-xl font-black italic uppercase tracking-tighter text-black dark:text-white">No playlists found!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                {playlists.map((playlist) => (
                                    <div key={playlist.id} className="flex flex-col group">
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] group-hover:scale-[1.02] transition-transform duration-300 shadow-md dark:shadow-black/20">
                                            <img
                                                src={playlist.thumbnail}
                                                alt={playlist.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/90 dark:bg-black/95 flex items-center gap-2">
                                                <ListVideo className="w-4 h-4 text-white" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-[0.1em]">Playlist Items {playlist.itemsCount}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-between items-start relative px-1">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-black text-black dark:text-gray-100 truncate uppercase italic tracking-tighter leading-none mb-1">
                                                    {playlist.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-black/40 dark:text-white/30 uppercase tracking-[0.2em]">
                                                        {playlist.visibility}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === playlist.id ? null : playlist.id)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                                                >
                                                    <MoreVertical className="w-5 h-5 text-black/40 dark:text-white/40" />
                                                </button>

                                                {activeMenu === playlist.id && (
                                                    <div
                                                        ref={menuRef}
                                                        className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#222] border border-gray-100 dark:border-white/10 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/5 dark:ring-white/5"
                                                    >
                                                        <button
                                                            onClick={() => openEditModal(playlist)}
                                                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-left transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm font-bold text-black/80 dark:text-white/80 tracking-tighter uppercase italic">Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(playlist.id)}
                                                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 dark:hover:bg-red-500/10 text-left transition-colors group"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500/60 group-hover:text-red-500" />
                                                            <span className="text-sm font-bold text-red-500/80 group-hover:text-red-500 tracking-tighter uppercase italic">Delete</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" onClick={closeModal} />
                    <div className="bg-background w-full max-w-md rounded-2xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden font-mono border border-foreground/10">
                        <div className="p-8 border-b border-foreground/5 bg-surface/30">
                            <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter">
                                {editingPlaylist ? "Edit playlist" : "Create new playlist"}
                            </h3>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-1">Playlist Name</label>
                                <input
                                    type="text"
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value.slice(0, 30))}
                                    placeholder={`e.g. My Favorites ${playlistName.length} / 30`}
                                    className="w-full px-5 py-4 bg-surface border-2 border-transparent focus:border-[#03a9f4] rounded-xl focus:outline-none transition-all text-foreground font-bold shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-1">Privacy Status</label>
                                <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value as "Public" | "Private")}
                                    className="w-full px-5 py-4 bg-surface border-2 border-transparent focus:border-[#03a9f4] rounded-xl focus:outline-none transition-all text-foreground font-bold appearance-none cursor-pointer shadow-inner"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 1.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem', opacity: 0.5 }}
                                >
                                    <option value="Private">🔒 Private</option>
                                    <option value="Public">🌐 Public</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-1">Description (Optional)</label>
                                <textarea
                                    value={playlistDesc}
                                    onChange={(e) => setPlaylistDesc(e.target.value)}
                                    placeholder="Tell us what this playlist is about..."
                                    rows={4}
                                    className="w-full px-5 py-4 bg-surface border-2 border-transparent focus:border-[#03a9f4] rounded-xl focus:outline-none transition-all text-foreground font-bold resize-none shadow-inner leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-surface border-t border-foreground/5 flex gap-4">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-4 bg-[#a6a6a6] hover:bg-[#8a8a8a] text-white rounded-xl font-black text-sm uppercase italic tracking-tighter transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateOrUpdate}
                                disabled={!playlistName.trim()}
                                className="flex-2 px-12 py-4 bg-[#03a9f4] hover:bg-[#039be5] text-white rounded-xl font-black text-sm uppercase italic tracking-tighter transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-blue-500/20"
                            >
                                {editingPlaylist ? "Update" : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[150] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className={clsx(
                        "px-6 py-3 rounded-full shadow-2xl border flex items-center gap-3",
                        toast.type === "success"
                            ? "bg-green-600 border-green-500 text-white"
                            : "bg-blue-600 border-blue-500 text-white"
                    )}>
                        {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <ListVideo className="w-5 h-5" />}
                        <span className="font-black italic uppercase tracking-tighter text-sm">
                            {toast.message}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
