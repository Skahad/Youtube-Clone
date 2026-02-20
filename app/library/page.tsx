"use client";

import { useWatchHistory } from "@/components/WatchHistoryProvider";
import { useWatchLater } from "@/components/WatchLaterProvider";
import { useLikedVideos } from "@/components/LikedVideosProvider";
import { useAuth } from "@/components/AuthContext";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";
import { History, Clock, ThumbsUp, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LibraryPage() {
    const { history } = useWatchHistory();
    const { watchLaterVideos } = useWatchLater();
    const { likedVideos } = useLikedVideos();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    const sections = [
        {
            title: "History",
            icon: History,
            items: history.map(h => h.video),
            href: "/history",
            emptyMsg: "Videos you watch will appear here."
        },
        {
            title: "Watch Later",
            icon: Clock,
            items: watchLaterVideos,
            href: "/watch-later",
            emptyMsg: "Save videos to watch later."
        },
        {
            title: "Liked Videos",
            icon: ThumbsUp,
            items: likedVideos,
            href: "/liked",
            emptyMsg: "Videos you like will appear here."
        }
    ];

    return (
        <div className="flex flex-col gap-10 w-full max-w-[1800px] mx-auto pb-10">
            <h1 className="text-2xl font-bold text-foreground px-4">Library</h1>

            <div className="flex flex-col gap-12">
                {sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-4">
                            <Link href={section.href} className="flex items-center gap-3 group">
                                <section.icon className="w-6 h-6 text-foreground" />
                                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                                <span className="text-sm text- font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    See all <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                            {section.items.length > 0 && (
                                <span className="text-sm text-foreground/60 font-medium">
                                    {section.items.length} videos
                                </span>
                            )}
                        </div>

                        {section.items.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 px-4">
                                {section.items.slice(0, 5).map((video, idx) => (
                                    <VideoCard key={`${section.title}-${video.id}-${idx}`} video={video} />
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-8 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl mx-4 border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
                                <section.icon className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-2" />
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{section.emptyMsg}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
