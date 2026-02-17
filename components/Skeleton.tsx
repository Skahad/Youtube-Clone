
export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
    );
}

export function VideoCardSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="flex gap-3 px-1 mt-1">
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="flex flex-col w-full gap-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-3 w-[60%]" />
                </div>
            </div>
        </div>
    );
}
