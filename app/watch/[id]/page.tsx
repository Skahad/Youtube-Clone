"use client";

import { useParams } from "next/navigation";
import { videos } from "@/data/videos";
import VideoPlayer from "@/components/VideoPlayer";
import ActionButtons from "@/components/ActionButtons";
import CommentBox from "@/components/CommentBox";
import VideoCard from "@/components/VideoCard";
import { useWatchHistory } from "@/components/WatchHistoryProvider";
import { useSubscriptions } from "@/components/SubscriptionsProvider";
import { useAuth } from "@/components/AuthContext";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function WatchPage() {
    const params = useParams();
    const id = params?.id as string;
    const video = videos.find((v) => v.id === id) || videos[0]; // Fallback to first video
    const recommendations = videos.filter((v) => v.id !== video.id);
    const [isClient, setIsClient] = useState(false);
    const { addToHistory } = useWatchHistory();
    const { isSubscribed, toggleSubscription } = useSubscriptions();
    const { user } = useAuth();
    const router = useRouter();

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const subscribed = !!user && isSubscribed(video.channelId);

    const handleSubscribe = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        toggleSubscription(video.channelId);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Add video to watch history when component mounts or video changes
    useEffect(() => {
        if (isClient && video) {
            addToHistory(video);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient, video.id]); // Only depend on video.id, not the entire video object or addToHistory

    if (!isClient) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 w-full max-w-[1800px] mx-auto">
            {/* Main Content */}
            <div className="flex-1 w-full max-w-[1280px]">
                <VideoPlayer url={video.videoUrl} poster={video.thumbnail} />

                <h1 className="text-xl md:text-2xl font-bold text-foreground dark:text-white mt-4 line-clamp-2">
                    {video.title}
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <Link href={`/channel/${video.channelId}`} className="flex-shrink-0">
                            <img
                                src={video.channelAvatar}
                                alt={video.channelName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </Link>
                        <div className="flex flex-col min-w-0">
                            <Link href={`/channel/${video.channelId}`} className="flex items-center gap-1 font-semibold text-foreground/70 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 truncate">
                                {video.channelName}
                                <CheckCircle2 className="w-3.5 h-3.5 fill-foreground/50 text-background flex-shrink-0" />
                            </Link>
                            <span className="text-xs text-foreground/60 dark:text-gray-400 truncate">1.2M subscribers</span>
                        </div>

                        <button
                            onClick={handleSubscribe}
                            className={clsx(
                                "px-4 py-2 rounded-full font-medium text-sm transition-all ml-4 whitespace-nowrap flex-shrink-0",
                                subscribed
                                    ? "bg-accent/95 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-accent/80 dark:hover:bg-[#3f3f3f]"
                                    : "bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
                            )}
                        >
                            {subscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                        <ActionButtons video={video} />
                    </div>
                </div>

                <div
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-4 bg-background dark:bg-[#272727] p-3 rounded-xl cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover transition-colors group"
                >
                    <div className="flex gap-2 text-sm font-semibold text-foreground dark:text-white mb-1">
                        <span>{video.views} views</span>
                        <span>{video.uploadedAt}</span>
                    </div>
                    <p className={clsx(
                        "text-sm text-foreground dark:text-gray-200 whitespace-pre-line leading-relaxed",
                        !isDescriptionExpanded && "line-clamp-2"
                    )}>
                        {video.description}
                    </p>
                    <span className="block mt-2 font-medium text-foreground dark:text-white text-sm">
                        {isDescriptionExpanded ? "Show less" : "Show more"}
                    </span>
                </div>

                <CommentBox />
            </div>

            {/* Recommended Videos Sidebar */}
            <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-4">
                {recommendations.map((vid) => (
                    <div key={vid.id} className="flex gap-2 group cursor-pointer">
                        <Link href={`/watch/${vid.id}`} className="relative aspect-video w-[168px] rounded-lg overflow-hidden flex-shrink-0 bg-surface dark:bg-surface-hover">
                            <img
                                src={vid.thumbnail}
                                alt={vid.title}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded">
                                {vid.duration}
                            </div>
                        </Link>
                        <div className="flex flex-col gap-1 w-full">
                            <Link href={`/watch/${vid.id}`}>
                                <h4 className="text-sm font-semibold text-foreground dark:text-white line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                                    {vid.title}
                                </h4>
                            </Link>
                            <Link href={`/channel/${vid.channelId}`} className="text-xs text-foreground/70 dark:text-gray-400 hover:text-foreground/50 dark:hover:text-white transition-colors mt-1">
                                {vid.channelName}
                            </Link>
                            <div className="text-xs text-foreground/60 dark:text-gray-400 flex items-center flex-wrap">
                                <span>{vid.views} views</span>
                                <span className="mx-1.5 min-w-[2px] h-[2px] rounded-full bg-gray-500 dark:bg-gray-400" aria-hidden="true" />
                                <span>{vid.uploadedAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
