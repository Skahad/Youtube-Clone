"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Video } from "@/data/videos";

interface WatchLaterContextType {
    watchLaterVideos: Video[];
    isInWatchLater: (videoId: string) => boolean;
    toggleWatchLater: (video: Video) => void;
    clearWatchLater: () => void;
}

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);

export function WatchLaterProvider({ children }: { children: ReactNode }) {
    const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([]);

    // Load watch later videos from localStorage on mount
    useEffect(() => {
        const savedWatchLater = localStorage.getItem("watchLaterVideos");
        if (savedWatchLater) {
            try {
                const parsed = JSON.parse(savedWatchLater);
                setWatchLaterVideos(parsed);
            } catch (error) {
                console.error("Failed to load watch later videos:", error);
            }
        }
    }, []);

    // Save watch later videos to localStorage whenever it changes
    useEffect(() => {
        if (watchLaterVideos.length >= 0) {
            localStorage.setItem("watchLaterVideos", JSON.stringify(watchLaterVideos));
        }
    }, [watchLaterVideos]);

    const isInWatchLater = useCallback((videoId: string) => {
        return watchLaterVideos.some((video) => video.id === videoId);
    }, [watchLaterVideos]);

    const toggleWatchLater = useCallback((video: Video) => {
        setWatchLaterVideos((prev) => {
            const isAlreadyAdded = prev.some((v) => v.id === video.id);
            if (isAlreadyAdded) {
                // Remove from watch later
                return prev.filter((v) => v.id !== video.id);
            } else {
                // Add to watch later (most recent first)
                return [video, ...prev];
            }
        });
    }, []);

    const clearWatchLater = useCallback(() => {
        setWatchLaterVideos([]);
        localStorage.removeItem("watchLaterVideos");
    }, []);

    return (
        <WatchLaterContext.Provider value={{ watchLaterVideos, isInWatchLater, toggleWatchLater, clearWatchLater }}>
            {children}
        </WatchLaterContext.Provider>
    );
}

export function useWatchLater() {
    const context = useContext(WatchLaterContext);
    if (context === undefined) {
        throw new Error("useWatchLater must be used within a WatchLaterProvider");
    }
    return context;
}
