"use client";

import { X, Copy, Check, Facebook, Twitter, Mail, MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    videoTitle: string;
}

export default function ShareModal({ isOpen, onClose, videoUrl, videoTitle }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(videoUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const shareOptions = [
        { name: "Embed", icon: <X className="rotate-45" />, color: "bg-gray-100 dark:bg-[#272727]" },
        { name: "WhatsApp", icon: <MessageCircle />, color: "bg-green-500 text-white" },
        { name: "Facebook", icon: <Facebook />, color: "bg-blue-600 text-white" },
        { name: "Twitter", icon: <Twitter />, color: "bg-sky-500 text-white" },
        { name: "Email", icon: <Mail />, color: "bg-gray-500 text-white" },
        { name: "Telegram", icon: <Send />, color: "bg-blue-400 text-white" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-[#212121] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                <div className="flex items-center justify-between p-4 border-b border-foreground/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-900 dark:text-white" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Share Options Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-8">
                        {shareOptions.map((option) => (
                            <div key={option.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className={clsx(
                                    "w-12 h-12 flex items-center justify-center rounded-full transition-transform group-hover:scale-110",
                                    option.color
                                )}>
                                    {option.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">{option.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Link Copy Box */}
                    <div className="relative">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#121212] border border-foreground/10 rounded-xl group transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
                            <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate pr-2 select-all">
                                {videoUrl}
                            </span>
                            <button
                                onClick={handleCopy}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                                    copied
                                        ? "bg-green-600 text-white"
                                        : "bg-accent hover:bg-accent-hover text-white"
                                )}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-[#181818] border-t border-foreground/10 flex items-center gap-3">
                    <input type="checkbox" id="start-at" className="w-4 h-4 accent-blue-600 cursor-pointer" />
                    <label htmlFor="start-at" className="text-sm text-gray-900 dark:text-white cursor-pointer font-medium">
                        Start at 0:01
                    </label>
                </div>
            </div>
        </div>
    );
}
