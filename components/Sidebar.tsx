"use client";

import { Home, Compass, PlaySquare, Clock, ThumbsUp, User, History, Film, Library, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { useAuth } from "./AuthContext";
import { useSubscriptions } from "./SubscriptionsProvider";
import { channels } from "@/data/channels";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Shorts", href: "/shorts" },
    { icon: Compass, label: "Subscriptions", href: "/subscriptions" },
    { icon: Library, label: "Library", href: "/library" }, // Divider?
    { icon: History, label: "History", href: "/history" },
    { icon: Clock, label: "Watch Later", href: "/watch-later" },
    { icon: ThumbsUp, label: "Liked Videos", href: "/liked" },
];

export default function Sidebar() {
    const { isOpen, closeSidebar } = useSidebar();
    const { user } = useAuth();
    const { subscribedChannelIds } = useSubscriptions();
    const pathname = usePathname();
    const router = useRouter();

    const subscribedChannels = channels.filter(c => subscribedChannelIds.includes(c.id));

    // Mobile overlay logic
    // If distinct mobile logic is needed, we can add it. 
    // For now, let's assume specific classes for responsiveness.

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeSidebar}
            />

            {/* Sidebar Container */}
            <aside
                className={clsx(
                    "fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] bg-background overflow-y-auto transition-width duration-200 z-50 border-r border-foreground/10",
                    isOpen ? "w-64" : "w-0 md:w-20 hidden md:block"
                )}
            >
                <div className="flex flex-col py-2">
                    {sidebarItems
                        .filter(item => {
                            const isProtected = ["Subscriptions", "Watch Later", "Liked Videos", "History", "Library"].includes(item.label);
                            return !isProtected || !!user;
                        })
                        .map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => router.push(item.href)}
                                    className={clsx(
                                        "flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-200 border",
                                        isActive
                                            ? "bg-accent/10 border-accent font-semibold text-accent"
                                            : "border-transparent text-foreground/80 hover:bg-surface-hover hover:text-accent-hover",
                                        isOpen ? "flex-row gap-5" : "flex-col gap-1 justify-center px-2 py-4 mx-0 rounded-xl text-[10px]"
                                    )}
                                >
                                    <Icon className="w-6 h-6" />
                                    <span className={clsx(isOpen ? "text-sm" : "text-[10px]")}>{item.label}</span>
                                </button>
                            );
                        })}

                    {isOpen && user && (
                        <>
                            <div className="my-2 border-t border-foreground/10 mx-4" />
                            <div className="px-6 py-2">
                                <h3 className="text-base font-semibold text-foreground mb-2">Subscriptions</h3>
                                {subscribedChannels.length > 0 ? (
                                    subscribedChannels.map((channel) => (
                                        <Link
                                            key={channel.id}
                                            href={`/channel/${channel.id}`}
                                            className="flex items-center gap-3 py-2 cursor-pointer hover:bg-surface-hover rounded-lg px-2 -mx-2 group"
                                        >
                                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                                <img src={channel.avatar} alt={channel.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm truncate text-foreground/80 group-hover:text-foreground group-hover:font-medium transition-colors">{channel.name}</span>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-xs text-foreground/50 py-2">No subscriptions yet</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </aside >
        </>
    );
}
