"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Video } from "@/data/videos";

interface LikedVideosContextType {
    likedVideos: Video[];
    isLiked: (videoId: string) => boolean;
    toggleLike: (video: Video) => void;
    clearLikedVideos: () => void;
}

const LikedVideosContext = createContext<LikedVideosContextType | undefined>(undefined);

export function LikedVideosProvider({ children }: { children: ReactNode }) {
    const [likedVideos, setLikedVideos] = useState<Video[]>([]);

    // Load liked videos from localStorage on mount
    useEffect(() => {
        const savedLiked = localStorage.getItem("likedVideos");
        if (savedLiked) {
            try {
                const parsed = JSON.parse(savedLiked);
                setLikedVideos(parsed);
            } catch (error) {
                console.error("Failed to load liked videos:", error);
            }
        }
    }, []);

    // Save liked videos to localStorage whenever it changes
    useEffect(() => {
        if (likedVideos.length >= 0) {
            localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
        }
    }, [likedVideos]);

    const isLiked = useCallback((videoId: string) => {
        return likedVideos.some((video) => video.id === videoId);
    }, [likedVideos]);

    const toggleLike = useCallback((video: Video) => {
        setLikedVideos((prev) => {
            const isAlreadyLiked = prev.some((v) => v.id === video.id);
            if (isAlreadyLiked) {
                // Remove from liked
                return prev.filter((v) => v.id !== video.id);
            } else {
                // Add to liked (most recent first)
                return [video, ...prev];
            }
        });
    }, []);

    const clearLikedVideos = useCallback(() => {
        setLikedVideos([]);
        localStorage.removeItem("likedVideos");
    }, []);

    return (
        <LikedVideosContext.Provider value={{ likedVideos, isLiked, toggleLike, clearLikedVideos }}>
            {children}
        </LikedVideosContext.Provider>
    );
}

export function useLikedVideos() {
    const context = useContext(LikedVideosContext);
    if (context === undefined) {
        throw new Error("useLikedVideos must be used within a LikedVideosProvider");
    }
    return context;
}
