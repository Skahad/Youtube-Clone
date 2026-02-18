"use client";

import { Menu, Search, Mic, Video, Bell, User, Sun, Moon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { videos } from "@/data/videos";

export default function Navbar() {
    const { toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
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
                        <button className="p-2 hover:bg-surface-hover rounded-full transition-colors relative hidden sm:block">
                            <Bell className="w-6 h-6 text-foreground" />
                            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] w-5 h-4 flex items-center justify-center rounded-full border-1 border-white dark:border-[#0f0f0f]">
                                9+
                            </span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold uppercase ml-1 sm:ml-2">
                            U
                        </button>
                    </div>
                </>
            )}

            {/* Click outside for suggestions */}
            {showSuggestions && (
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowSuggestions(false)} />
            )}
        </nav>
    );
}
