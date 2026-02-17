"use client";

import { Menu, Search, Mic, Video, Bell, User, Sun, Moon } from "lucide-react";
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
    const router = useRouter();

    const filteredSuggestions = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return videos
            .filter(video =>
                video.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 10); // Limit to 10 suggestions
    }, [searchQuery]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    if (!isClient) return null; // Avoid hydration mismatch for theme

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#0f0f0f] flex items-center justify-between px-4 z-50 border-b border-gray-200 dark:border-gray-800">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
                <Link href="/" className="flex items-center gap-1">
                    <div className="text-red-600 relative flex items-center justify-center">
                        {/* Simple YouTube Logo Simulation */}
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold tracking-tighter dark:text-white">YouTube</span>
                </Link>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex items-center flex-1 max-w-[720px] ml-10 relative">
                <form onSubmit={handleSearch} className="flex w-full group relative">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:border-blue-500 focus:outline-none dark:bg-[#121212] dark:text-white dark:focus:border-blue-500 shadow-inner"
                        />
                        <button type="submit" className="px-6 bg-gray-100 dark:bg-[#222] border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-[#333] transition-colors flex items-center justify-center">
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 origin-top">
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((video) => (
                                    <Link
                                        key={video.id}
                                        href={`/search?q=${encodeURIComponent(video.title)}`}
                                        onClick={() => setShowSuggestions(false)}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] cursor-pointer transition-colors"
                                    >
                                        <Search className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 dark:text-white truncate">{video.title}</span>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500 italic">No suggestions found</div>
                            )}
                        </div>
                    )}
                </form>

                {/* Outside click handler for suggestions */}
                {showSuggestions && (
                    <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
                )}

                <button className="ml-4 p-2 bg-gray-100 dark:bg-[#1f1f1f] rounded-full hover:bg-gray-200 dark:hover:bg-[#333] transition-colors flex-shrink-0">
                    <Mic className="w-5 h-5 text-black dark:text-white" />
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/upload" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] text-sm font-medium transition-colors">
                    <Video className="w-6 h-6 text-gray-800 dark:text-white" />
                </Link>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors relative">
                    <Bell className="w-6 h-6 text-gray-800 dark:text-white" />
                    <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] w-5 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0f0f0f]">
                        9+
                    </span>
                </button>

                <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full transition-colors">
                    {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>

                <button className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold uppercase ml-2">
                    U
                </button>
            </div>
        </nav>
    );
}
