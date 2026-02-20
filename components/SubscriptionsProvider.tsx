"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SubscriptionsContextType {
    subscribedChannelIds: string[];
    isSubscribed: (channelId: string) => boolean;
    toggleSubscription: (channelId: string) => void;
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(undefined);

export function SubscriptionsProvider({ children }: { children: React.ReactNode }) {
    const [subscribedChannelIds, setSubscribedChannelIds] = useState<string[]>([]);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("subscribedChannels");
        if (saved) {
            try {
                setSubscribedChannelIds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse subscriptions", e);
            }
        }
    }, []);

    const isSubscribed = (channelId: string) => {
        return subscribedChannelIds.includes(channelId);
    };

    const toggleSubscription = (channelId: string) => {
        setSubscribedChannelIds(prev => {
            let next;
            if (prev.includes(channelId)) {
                next = prev.filter(id => id !== channelId);
            } else {
                next = [...prev, channelId];
            }
            localStorage.setItem("subscribedChannels", JSON.stringify(next));
            return next;
        });
    };

    return (
        <SubscriptionsContext.Provider value={{ subscribedChannelIds, isSubscribed, toggleSubscription }}>
            {children}
        </SubscriptionsContext.Provider>
    );
}

export function useSubscriptions() {
    const context = useContext(SubscriptionsContext);
    if (context === undefined) {
        throw new Error("useSubscriptions must be used within a SubscriptionsProvider");
    }
    return context;
}
