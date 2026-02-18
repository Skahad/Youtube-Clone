"use client";

import { Menu, Search, Mic, Video, Bell, User, Sun, Moon, ArrowLeft, Plus, Upload, PlaySquare, Film, Settings, LogIn, UserPlus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { videos } from "@/data/videos";
import { useAuth } from "./AuthContext";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showAuthMenu, setShowAuthMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();

    const filteredSuggestions = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return videos
            .filter(video =>
                video.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 10);
    }, [searchQuery]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowMobileSearch(false);
            setShowSuggestions(false);
        }
    };

    if (!isClient) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 bg-background flex items-center justify-between px-2 sm:px-4 z-50 border-b border-foreground/10 transition-colors duration-300">
            {/* Mobile Search Overlay */}
            {showMobileSearch ? (
                <div className="flex items-center w-full gap-1 animate-in slide-in-from-top duration-200 bg-background h-full absolute inset-0 z-[60] px-2">
                    <button
                        onClick={() => setShowMobileSearch(false)}
                        className="p-2 hover:bg-surface-hover rounded-full transition-colors flex-shrink-0"
                    >
                        <ArrowLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search YouTube"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full bg-surface px-4 py-2 rounded-full border border-transparent focus:border-accent focus:outline-none text-foreground text-sm sm:text-base"
                        />
                        {/* Mobile Suggestions */}
                        {showSuggestions && searchQuery.trim() && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                                {filteredSuggestions.map((video) => (
                                    <button
                                        key={video.id}
                                        onClick={() => {
                                            setSearchQuery(video.title);
                                            router.push(`/search?q=${encodeURIComponent(video.title)}`);
                                            setShowMobileSearch(false);
                                            setShowSuggestions(false);
                                        }}
                                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-surface-hover text-left transition-colors"
                                    >
                                        <Search className="w-4 h-4 text-foreground/70" />
                                        <span className="text-sm text-foreground truncate">{video.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                    <button className="p-2 hover:bg-surface-hover rounded-full transition-colors flex-shrink-0">
                        <Mic className="w-5 h-5 text-foreground" />
                    </button>
                </div>
            ) : (
                <>
                    {/* Left Section */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-surface-hover rounded-full transition-colors hidden md:block"
                        >
                            <Menu className="w-6 h-6 text-foreground" />
                        </button>
                        <Link href="/" className="flex items-center gap-1 flex-shrink-0">
                            <div className="text-red-600 relative flex items-center justify-center">
                                <img src="/logo.png" alt="Vimero" width={100} height={100} />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Search Section */}
                    <div className="hidden md:flex items-center flex-1 max-w-[720px] mx-10 relative">
                        <form onSubmit={handleSearch} className="flex w-full group relative">
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    className="w-full px-4 py-2 border border-foreground/10 rounded-l-full focus:border-accent focus:outline-none bg-surface text-foreground shadow-inner"
                                />
                                <button type="submit" className="px-6 bg-surface border border-l-0 border-foreground/10 rounded-r-full hover:bg-surface-hover transition-colors flex items-center justify-center">
                                    <Search className="w-5 h-5 text-foreground/70" />
                                </button>
                            </div>

                            {showSuggestions && searchQuery.trim() && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-foreground/10 rounded-xl shadow-2xl py-2 z-50">
                                    {filteredSuggestions.map((video) => (
                                        <Link
                                            key={video.id}
                                            href={`/search?q=${encodeURIComponent(video.title)}`}
                                            onClick={() => setShowSuggestions(false)}
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-surface-hover transition-colors"
                                        >
                                            <Search className="w-4 h-4 text-foreground/70" />
                                            <span className="text-sm text-foreground truncate">{video.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </form>
                        <button className="ml-4 p-2 bg-surface rounded-full hover:bg-surface-hover transition-colors flex-shrink-0 text-foreground">
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={() => setShowMobileSearch(true)}
                            className="p-2 hover:bg-surface-hover rounded-full transition-colors md:hidden"
                        >
                            <Search className="w-6 h-6 text-foreground" />
                        </button>
                        <button className="p-2 hover:bg-surface-hover rounded-full transition-colors md:hidden">
                            <Mic className="w-6 h-6 text-foreground" />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-surface-hover rounded-full transition-colors flex items-center justify-center"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="w-6 h-6 text-foreground" />
                            ) : (
                                <Sun className="w-6 h-6 text-foreground" />
                            )}
                        </button>
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isAuthenticated) {
                                        setShowCreateMenu(!showCreateMenu);
                                    } else {
                                        router.push("/login");
                                    }
                                }}
                                className="p-2 hover:bg-surface-hover rounded-full transition-colors flex items-center justify-center gap-1 sm:gap-2"
                                aria-label="Create"
                            >
                                <div className="relative">
                                    <Video className="w-6 h-6 text-foreground" />
                                    <Plus className="w-3 h-3 text-background bg-foreground rounded-full absolute -top-1 -right-1 border border-background" />
                                </div>
                                <span className="hidden lg:block text-sm font-medium text-foreground">Create</span>
                            </button>

                            {showCreateMenu && isAuthenticated && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-foreground/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                                    <button
                                        className="flex items-center gap-4 w-full px-4 py-3 hover:bg-surface-hover transition-colors text-left group"
                                        onClick={() => {
                                            setShowCreateMenu(false);
                                            router.push("/upload");
                                        }}
                                    >
                                        <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                                            <Upload className="w-5 h-5 text-accent" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-foreground">Upload video</span>
                                            <span className="text-[10px] text-foreground/50">Post a new video</span>
                                        </div>
                                    </button>
                                    <button
                                        className="flex items-center gap-4 w-full px-4 py-3 hover:bg-surface-hover transition-colors text-left group"
                                        onClick={() => {
                                            setShowCreateMenu(false);
                                            router.push("/shorts");
                                        }}
                                    >
                                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                            <Film className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-foreground">Create Short</span>
                                            <span className="text-[10px] text-foreground/50">Shoot and share</span>
                                        </div>
                                    </button>
                                    <div className="my-1 border-t border-foreground/5" />
                                    <button
                                        className="flex items-center gap-4 w-full px-4 py-3 hover:bg-surface-hover transition-colors text-left group"
                                        onClick={() => {
                                            setShowCreateMenu(false);
                                            router.push("/import");
                                        }}
                                    >
                                        <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                            <PlaySquare className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-foreground">Import</span>
                                            <span className="text-[10px] text-foreground/50">Link from YouTube</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                        <button className="p-2 hover:bg-surface-hover rounded-full transition-colors relative hidden sm:block">
                            <Bell className="w-6 h-6 text-foreground" />
                            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] w-5 h-4 flex items-center justify-center rounded-full border-1 border-white dark:border-[#0f0f0f]">
                                9+
                            </span>
                        </button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                    className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold uppercase ml-1 sm:ml-2 ring-offset-2 ring-offset-background hover:ring-2 hover:ring-foreground/10 transition-all"
                                >
                                    {user?.username?.[0] || "U"}
                                </button>
                                {showUserMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                                        <div className="px-4 py-3 border-b border-foreground/5 mb-2">
                                            <p className="text-sm font-bold text-foreground truncate">{user?.username}</p>
                                            <p className="text-[10px] text-foreground/50 truncate">Account management</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setShowUserMenu(false);
                                                logout();
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-surface-hover transition-colors text-left text-sm text-red-500 font-medium"
                                        >
                                            <User className="w-4 h-4" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAuthMenu(!showAuthMenu);
                                    }}
                                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-hover rounded-full text-accent transition-all font-medium text-sm ml-1 sm:ml-2"
                                >
                                    <span className="hidden lg:inline text-[#065fd4] font-semibold mr-1">My Account</span>
                                    <div className="w-8 h-8 rounded-full bg-[#065fd4] text-white flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <MoreHorizontal className="w-4 h-4 text-foreground/60 hidden sm:block" />
                                </button>

                                {showAuthMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-xl shadow-2xl py-2 z-[70] animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                                        <button
                                            onClick={() => {
                                                setShowAuthMenu(false);
                                                router.push("/login?auth=true");
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-surface-hover transition-colors text-left"
                                        >
                                            <LogIn className="w-5 h-5 text-foreground" />
                                            <span className="text-sm font-medium text-foreground">Login</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAuthMenu(false);
                                                router.push("/register?auth=true");
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-surface-hover transition-colors text-left"
                                        >
                                            <UserPlus className="w-5 h-5 text-foreground" />
                                            <span className="text-sm font-medium text-foreground">Register</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Click outside overlays */}
            {(showSuggestions || showCreateMenu || showAuthMenu || showUserMenu) && (
                <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => {
                        setShowSuggestions(false);
                        setShowCreateMenu(false);
                        setShowAuthMenu(false);
                        setShowUserMenu(false);
                    }}
                />
            )}
        </nav>
    );
}
