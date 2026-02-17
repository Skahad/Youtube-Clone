"use client";

import VideoCard from "@/components/VideoCard";
import { videos as initialVideos, Video } from "@/data/videos";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const loaderRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Gaming", "Music", "Live", "Mixes", "Computers", "Programming", "Podcasts", "News", "Sports", "Learning", "Fashion"];

  // Filter videos based on active category
  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return videos;
    }
    return videos.filter(video => video.category === activeCategory);
  }, [videos, activeCategory]);

  const loadMoreVideos = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newVideos = initialVideos.map((v) => ({
      ...v,
      id: `${v.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));

    setVideos((prev) => [...prev, ...newVideos]);
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          loadMoreVideos();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMoreVideos, loading]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Scroll to top when changing category
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-8 overflow-x-hidden">
      {/* Categories Filter */}
      <div className="sticky top-14 z-20 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm py-3 mb-8 w-full overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-3 px-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeCategory === cat
                  ? "bg-accent/95 text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] text-gray-800 dark:text-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-4 px-4 overflow-x-hidden">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No videos found</p>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different category
          </p>
        </div>
      )}

      {/* Infinite Scroll Sentinel - Only show when "All" is selected */}
      {activeCategory === "All" && (
        <div ref={loaderRef} className="w-full flex justify-center py-8 h-20 items-center">
          {loading && <Loader2 className="w-8 h-8 animate-spin text-gray-500" />}
        </div>
      )}
    </div>
  );
}
