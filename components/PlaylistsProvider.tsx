"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Playlist {
    id: string;
    name: string;
    description: string;
    visibility: "Public" | "Private";
    itemsCount: number;
    thumbnail: string;
}

interface PlaylistsContextType {
    playlists: Playlist[];
    addPlaylist: (name: string, description: string, visibility: "Public" | "Private") => void;
    updatePlaylist: (id: string, name: string, description: string, visibility: "Public" | "Private") => void;
    deletePlaylist: (id: string) => void;
}

const PlaylistsContext = createContext<PlaylistsContextType | undefined>(undefined);

export function PlaylistsProvider({ children }: { children: React.ReactNode }) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("user_playlists");
        if (saved) {
            try {
                setPlaylists(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse playlists", e);
            }
        }
    }, []);

    const savePlaylists = (newPlaylists: Playlist[]) => {
        setPlaylists(newPlaylists);
        localStorage.setItem("user_playlists", JSON.stringify(newPlaylists));
    };

    const addPlaylist = (name: string, description: string, visibility: "Public" | "Private") => {
        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            description,
            visibility,
            itemsCount: 0,
            thumbnail: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" // Default colorful gradient placeholder
        };
        savePlaylists([...playlists, newPlaylist]);
    };

    const updatePlaylist = (id: string, name: string, description: string, visibility: "Public" | "Private") => {
        const updated = playlists.map(p =>
            p.id === id ? { ...p, name, description, visibility } : p
        );
        savePlaylists(updated);
    };

    const deletePlaylist = (id: string) => {
        const filtered = playlists.filter(p => p.id !== id);
        savePlaylists(filtered);
    };

    return (
        <PlaylistsContext.Provider value={{ playlists, addPlaylist, updatePlaylist, deletePlaylist }}>
            {children}
        </PlaylistsContext.Provider>
    );
}

export function usePlaylists() {
    const context = useContext(PlaylistsContext);
    if (context === undefined) {
        throw new Error("usePlaylists must be used within a PlaylistsProvider");
    }
    return context;
}
