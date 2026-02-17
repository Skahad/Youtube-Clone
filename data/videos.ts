export interface Video {
    id: string;
    title: string;
    thumbnail: string;
    channelId: string;
    channelName: string;
    channelAvatar: string;
    views: string;
    uploadedAt: string;
    duration: string;
    description: string;
    videoUrl: string; // For the watch page mock
    category: string;
}

export const videos: Video[] = [
    {
        id: "1",
        title: "Building a YouTube Clone with Next.js",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        channelId: "c1",
        channelName: "Code Master",
        channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        views: "120K",
        uploadedAt: "2 days ago",
        duration: "10:05",
        description: "Learn how to build a full-stack YouTube clone using Next.js 14, Tailwind CSS, and more in this comprehensive tutorial.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        category: "Programming",
    },
    {
        id: "2",
        title: "Top 10 VS Code Extensions for 2024",
        thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        channelId: "c2",
        channelName: "Dev Tips",
        channelAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
        views: "54K",
        uploadedAt: "5 hours ago",
        duration: "8:20",
        description: "Boost your productivity with these essential VS Code extensions that every developer should use.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        category: "Programming",
    },
    {
        id: "3",
        title: "Understanding React Server Components",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        channelId: "c1",
        channelName: "Code Master",
        channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        views: "89K",
        uploadedAt: "1 week ago",
        duration: "15:45",
        description: "Deep dive into RSC and how they change the way we build React applications.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        category: "Programming",
    },
    {
        id: "4",
        title: "lofi hip hop radio - beats to relax/study to",
        thumbnail: "https://images.unsplash.com/photo-1631222193608-b887bb1f3c23?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        channelId: "c3",
        channelName: "Lofi Girl",
        channelAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80",
        views: "25K",
        uploadedAt: "LIVE",
        duration: "LIVE",
        description: "Join the study session with lofi beats.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        category: "Music",
    },
    {
        id: "5",
        title: "Amazing Nature 4K",
        thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
        channelId: "c4",
        channelName: "Nature Planet",
        channelAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
        views: "2M",
        uploadedAt: "1 year ago",
        duration: "45:00",
        description: "Experience the beauty of nature in stunning 4K resolution.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        category: "Learning",
    },
    {
        id: "6",
        title: "How to Cook the Perfect Steak",
        thumbnail: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        channelId: "c5",
        channelName: "Chef Gordon",
        channelAvatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&q=80",
        views: "500K",
        uploadedAt: "3 weeks ago",
        duration: "12:30",
        description: "Learn the secrets to cooking a restaurant-quality steak at home.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        category: "Learning",
    },
    {
        id: "7",
        title: "Javascript in 100 Seconds",
        thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
        channelId: "c6",
        channelName: "Fireship",
        channelAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80",
        views: "1.5M",
        uploadedAt: "1 month ago",
        duration: "1:40",
        description: "A quick overview of JavaScript.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        category: "Programming",
    },
    {
        id: "8",
        title: "Travel Vlog: Tokyo, Japan",
        thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        channelId: "c7",
        channelName: "Wanderlust",
        channelAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        views: "300K",
        uploadedAt: "4 days ago",
        duration: "22:15",
        description: "Join me as I explore the vibrant streets of Tokyo.",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        category: "News",
    }
];
