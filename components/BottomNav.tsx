"use client";

import { Home, Compass, Film, Library, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Shorts", href: "/shorts" },
    { icon: Compass, label: "Subscriptions", href: "/subscriptions" },
    { icon: Library, label: "Library", href: "/library" },
    { icon: User, label: "You", href: "/history" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-2 z-[60] md:hidden">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={clsx(
                            "flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-200",
                            isActive
                                ? "text-accent"
                                : "text-gray-600 dark:text-gray-400 hover:text-accent-hover"
                        )}
                    >
                        <Icon className={clsx("w-6 h-6 transition-transform duration-200", isActive && "fill-current scale-110")} />
                        <span className={clsx("text-[10px] font-medium transition-opacity", isActive ? "opacity-100" : "opacity-80")}>{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
