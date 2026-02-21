"use client";

import React from "react";
import {
    Settings, User, Shield, DollarSign, Key, CreditCard,
    Image as ImageIcon, CheckCircle, Star, Smartphone,
    UserX, Link as LinkIcon, Fingerprint, FileText, Trash2,
    ChevronRight
} from "lucide-react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import clsx from "clsx";

const settingsTabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "monetization", label: "Monetization", icon: DollarSign },
    { id: "password", label: "Password", icon: Key },
    { id: "balance", label: "Balance", icon: CreditCard },
    { id: "avatar", label: "Avatar & Cover", icon: ImageIcon },
    { id: "verification", label: "Verification", icon: CheckCircle },
    { id: "points", label: "Points", icon: Star },
    { id: "2fa", label: "Two-factor authentication", icon: Smartphone },
    { id: "blocked", label: "Blocked Users", icon: UserX },
    { id: "invitation", label: "Invitation Links", icon: LinkIcon },
    { id: "sessions", label: "Manage Sessions", icon: Fingerprint },
    { id: "info", label: "My Information", icon: FileText },
    { id: "delete", label: "Delete account", icon: Trash2 },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();
    const params = useParams();

    const currentTab = params?.tab as string || "general";
    const username = params?.username as string || (user?.handle || "@me");

    const handleTabClick = (tabId: string) => {
        router.push(`/settings/${tabId}/${username}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-10 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar / Top Tabs for Mobile */}
                    <div className="lg:w-80 w-full flex-shrink-0">
                        {/* Desktop Sidebar */}
                        <div className="hidden lg:block bg-surface rounded-2xl border border-foreground/5 shadow-xl shadow-black/5 overflow-hidden">
                            <div className="py-4">
                                {settingsTabs.map((tab) => {
                                    const isActive = currentTab === tab.id;
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(tab.id)}
                                            className={clsx(
                                                "w-full flex items-center justify-between px-6 py-4 transition-all group relative",
                                                isActive
                                                    ? "bg-accent/5 text-accent font-bold"
                                                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={clsx(
                                                    "p-2 rounded-xl transition-all",
                                                    isActive ? "bg-accent text-white" : "bg-foreground/5 group-hover:bg-foreground/10"
                                                )}>
                                                    <Icon size={18} />
                                                </div>
                                                <span className="text-[15px]">{tab.label}</span>
                                            </div>
                                            {isActive && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full" />
                                            )}
                                            <ChevronRight size={16} className={clsx(
                                                "transition-transform",
                                                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-10 group-hover:translate-x-0"
                                            )} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Horizontal Tabs */}
                        <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 no-scrollbar scroll-smooth">
                            {settingsTabs.map((tab) => {
                                const isActive = currentTab === tab.id;
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        className={clsx(
                                            "flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl transition-all border whitespace-nowrap font-bold text-sm",
                                            isActive
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                : "bg-surface border-foreground/5 text-foreground/50 hover:border-accent/30 hover:text-accent"
                                        )}
                                    >
                                        <Icon size={16} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-surface rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5 p-6 md:p-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
