"use client";

import { Home, Compass, PlaySquare, Clock, ThumbsUp, User, History, Film, Library, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();

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
                    "fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-[#0f0f0f] overflow-y-auto transition-width duration-200 z-50 border-r border-gray-200 dark:border-gray-800",
                    isOpen ? "w-64" : "w-0 md:w-20 hidden md:block"
                )}
            >
                <div className="flex flex-col py-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={clsx(
                                    "flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-200 border",
                                    isActive
                                        ? "bg-accent/10 border-accent font-semibold text-accent"
                                        : "border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] hover:text-accent-hover",
                                    isOpen ? "flex-row gap-5" : "flex-col gap-1 justify-center px-2 py-4 mx-0 rounded-xl text-[10px]"
                                )}
                            >
                                <Icon className="w-6 h-6" />
                                <span className={clsx(isOpen ? "text-sm" : "text-[10px]")}>{item.label}</span>
                            </Link>
                        );
                    })}

                    {isOpen && (
                        <>
                            <div className="my-2 border-t border-gray-200 dark:border-gray-700 mx-4" />
                            <div className="px-6 py-2">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">Subscriptions</h3>
                                {/* Mock Subscriptions */}
                                {["Code Master", "Dev Tips", "Lofi Girl", "Fireship"].map((channel, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg px-2 -mx-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex-shrink-0" />
                                        <span className="text-sm truncate text-gray-700 dark:text-gray-300">{channel}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </aside >
        </>
    );
}
