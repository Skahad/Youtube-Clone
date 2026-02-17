"use client";

import { shorts } from "@/data/shorts";
import ShortsPlayer from "@/components/ShortsPlayer";

export default function ShortsPage() {
    return (
        <div className="flex justify-center w-full h-[calc(100vh-3.5rem)] overflow-y-scroll snap-y snap-mandatory bg-black dark:bg-[#0f0f0f] no-scrollbar pb-20">
            <div className="flex flex-col gap-6 py-4 items-center w-full">
                {shorts.map((short) => (
                    <ShortsPlayer key={short.id} short={short} />
                ))}
                {/* Placeholder for more content */}
                <div className="h-[200px] w-full flex items-center justify-center text-gray-500 snap-start">
                    End of suggestions
                </div>
            </div>
        </div>
    );
}
