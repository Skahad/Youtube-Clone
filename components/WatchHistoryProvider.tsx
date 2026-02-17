"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Video } from "@/data/videos";

interface WatchHistoryItem {
    video: Video;
    watchedAt: Date;
}

interface WatchHistoryContextType {
    history: WatchHistoryItem[];
    addToHistory: (video: Video) => void;
    clearHistory: () => void;
    removeFromHistory: (videoId: string) => void;
}

const WatchHistoryContext = createContext<WatchHistoryContextType | undefined>(undefined);

export function WatchHistoryProvider({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<WatchHistoryItem[]>([]);

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("watchHistory");
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                // Convert date strings back to Date objects
                const historyWithDates = parsed.map((item: any) => ({
                    ...item,
                    watchedAt: new Date(item.watchedAt)
                }));
                setHistory(historyWithDates);
            } catch (error) {
                console.error("Failed to load watch history:", error);
            }
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("watchHistory", JSON.stringify(history));
        }
    }, [history]);

    const addToHistory = useCallback((video: Video) => {
        setHistory((prev) => {
            // Remove existing entry for this video if it exists
            const filtered = prev.filter((item) => item.video.id !== video.id);
            // Add to the beginning of the array (most recent first)
            return [{ video, watchedAt: new Date() }, ...filtered];
        });
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem("watchHistory");
    }, []);

    const removeFromHistory = useCallback((videoId: string) => {
        setHistory((prev) => prev.filter((item) => item.video.id !== videoId));
    }, []);

    return (
        <WatchHistoryContext.Provider value={{ history, addToHistory, clearHistory, removeFromHistory }}>
            {children}
        </WatchHistoryContext.Provider>
    );
}

export function useWatchHistory() {
    const context = useContext(WatchHistoryContext);
    if (context === undefined) {
        throw new Error("useWatchHistory must be used within a WatchHistoryProvider");
    }
    return context;
}
