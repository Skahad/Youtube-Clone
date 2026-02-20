"use client";

import { useAuth } from "@/components/AuthContext";
import { ListVideo, Plus, VideoOff, MoreVertical, Edit2, Trash2, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { usePlaylists, Playlist } from "@/components/PlaylistsProvider";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import clsx from "clsx";

export default function PlaylistsPage() {
    const { user } = useAuth();
    const pathname = usePathname();
    const { playlists, addPlaylist, updatePlaylist, deletePlaylist } = usePlaylists();
    const { subscribedChannelIds } = useSubscriptions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDesc, setPlaylistDesc] = useState("");
    const [visibility, setVisibility] = useState<"Public" | "Private">("Private");

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#0f0f0f] pb-20">
            {/* User Banner */}
            <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.1) 0%, transparent 20%)' }}></div>
                </div>
            </div>

            {/* Profile Info Section */}
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
                            <p className="text-sm text-foreground/50 font-bold mt-1 tracking-tighter">{subscribedChannelIds.length} Subscribers</p>
                        </div>
                        <button className="mt-4 md:mt-0 bg-[#7a7a7a] hover:bg-[#6a6a6a] text-white px-6 py-2 rounded-md font-black text-sm uppercase transition-all active:scale-95">
                            Manage
                        </button>
                    </div>
                </div>

                {/* Profile Tabs */}
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

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 mb-12 gap-4 font-mono">
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
                                <p className="text-xl font-black italic uppercase tracking-tighter">No playlists found!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                {playlists.map((playlist) => (
                                    <div key={playlist.id} className="flex flex-col group">
                                        <div className="relative aspect-video rounded-xl overflow-hidden bg-surface group-hover:scale-[1.02] transition-transform duration-300">
                                            <img
                                                src={playlist.thumbnail}
                                                alt={playlist.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 flex items-center gap-2">
                                                <ListVideo className="w-4 h-4 text-white" />
                                                <span className="text-xs font-bold text-white uppercase tracking-tighter">Playlist Items {playlist.itemsCount}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex justify-between items-start relative px-1">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-black text-foreground truncate uppercase italic tracking-tighter leading-tight">
                                                    {playlist.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-tighter">
                                                        {playlist.visibility}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === playlist.id ? null : playlist.id)}
                                                    className="p-1.5 hover:bg-surface-hover rounded-full transition-colors"
                                                >
                                                    <MoreVertical className="w-5 h-5 text-foreground/60" />
                                                </button>

                                                {activeMenu === playlist.id && (
                                                    <div
                                                        ref={menuRef}
                                                        className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                                                    >
                                                        <button
                                                            onClick={() => openEditModal(playlist)}
                                                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 text-left transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                            <span className="text-sm font-bold text-foreground/80 tracking-tighter">Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(playlist.id)}
                                                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-left transition-colors group"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500 opacity-60 group-hover:opacity-100" />
                                                            <span className="text-sm font-bold text-red-500/80 group-hover:text-red-500 tracking-tighter">Delete</span>
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

            {/* Modal - Match Screenshot 1 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-md rounded-xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden font-sans">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                                {editingPlaylist ? "Edit playlist" : "Create new playlist"}
                            </h3>

                            <div className="space-y-5">
                                <div className="space-y-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={playlistName}
                                            onChange={(e) => setPlaylistName(e.target.value.slice(0, 30))}
                                            placeholder={`Playlist name ${playlistName.length} / 30`}
                                            className="w-full px-4 py-3 bg-[#f9f9f9] dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#03a9f4]/50 focus:border-[#03a9f4] transition-all text-foreground"
                                        />
                                    </div>
                                </div>

                                <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value as "Public" | "Private")}
                                    className="w-full px-4 py-3 bg-[#f9f9f9] dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#03a9f4]/50 transition-all text-foreground appearance-none cursor-pointer"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                                >
                                    <option value="Private">Private</option>
                                    <option value="Public">Public</option>
                                </select>

                                <textarea
                                    value={playlistDesc}
                                    onChange={(e) => setPlaylistDesc(e.target.value)}
                                    placeholder="Description.."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-[#f9f9f9] dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#03a9f4]/50 transition-all text-foreground resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50/50 dark:bg-white/5 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 bg-[#a6a6a6] hover:bg-[#8a8a8a] text-white rounded-md font-bold transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateOrUpdate}
                                disabled={!playlistName.trim()}
                                className="px-6 py-2.5 bg-[#03a9f4] hover:bg-[#039be5] text-white rounded-md font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-500/20"
                            >
                                {editingPlaylist ? "Update" : "Create"}
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

