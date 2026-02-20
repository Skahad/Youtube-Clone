"use client";

import { Download as ImportIcon, Link as LinkIcon, Youtube, Globe, Facebook, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function ImportPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    const platforms = [
        { icon: Youtube, color: "text-red-500", bg: "bg-red-500/10" },
        { id: 'dm', icon: Globe, color: "text-blue-500", bg: "bg-blue-500/10" }, // Dailymotion placeholder
        { id: 'vm', icon: Globe, color: "text-sky-400", bg: "bg-sky-400/10" }, // Vimeo placeholder
        { icon: Facebook, color: "text-blue-600", bg: "bg-blue-600/10" },
        { id: 'ok', icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10" }, // OK.ru placeholder
        { icon: Instagram, color: "text-pink-600", bg: "bg-pink-600/10" },
    ];

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-[#f1f1f1] dark:bg-[#0f0f0f] py-8 px-4 transition-colors duration-300">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#00aaff] p-2 rounded-lg">
                            <ImportIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Import new video</h1>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">One Steps Video Upload</span>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-10 lg:p-20">
                    {/* Center Icon */}
                    <div className="mb-8">
                        <ImportIcon className="w-32 h-32 text-gray-400" strokeWidth={1} />
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                        Use Video URL and Import Video
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-medium text-center">
                        Your videos will be private until you publish them.
                    </p>

                    {/* Platform Icons */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        {platforms.map((p, idx) => (
                            <div key={idx} className={clsx("w-10 h-10 rounded-full flex items-center justify-center shadow-sm", p.bg)}>
                                <p.icon className={clsx("w-6 h-6", p.color)} />
                            </div>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="w-full max-w-3xl flex items-stretch h-14 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-center px-4 bg-gray-50 dark:bg-[#222] border-r border-gray-200 dark:border-gray-800">
                            <LinkIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Video URL"
                            className="flex-1 px-4 bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white outline-none text-lg"
                        />
                        <button className="bg-[#00aaff] hover:bg-[#0099ee] text-white px-8 font-bold text-lg transition-all active:scale-95">
                            Fetch Video
                        </button>
                    </div>

                    {/* Footer Legend */}
                    <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-500 font-medium text-center">
                        YouTube, Dailymotion, Vimeo URLs, Facebook, mp4, ok.ru, YouTube Short, Instagram. You can embed and import videos from your third party websites.
                    </p>
                </div>
            </div>
        </div>
    );
}
