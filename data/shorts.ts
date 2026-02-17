export interface ShortVideo {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    channelId: string;
    channelName: string;
    channelAvatar: string;
    views: string;
    likes: number;
    comments: number;
    description: string;
    audioTrack: string;
}

export const shorts: ShortVideo[] = [
    {
        id: "s1",
        title: "Satisfying Hydraulic Press 🤯",
        thumbnail: "https://images.unsplash.com/photo-1589903308904-7bc188d78396?w=400&q=80",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Using placeholder
        channelId: "c1",
        channelName: "Code Master",
        channelAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        views: "1.5M",
        likes: 125000,
        comments: 450,
        description: "Don't try this at home! #satisfying #shorts",
        audioTrack: "Original Sound - Code Master",
    },
    {
        id: "s2",
        title: "Cutest Puppy Ever? 🐶",
        thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        channelId: "c2",
        channelName: "Dev Tips",
        channelAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        views: "890K",
        likes: 98000,
        comments: 2000,
        description: "Look at those eyes! #dog #puppy #cute",
        audioTrack: "Happy Music - Dev Tips",
    },
    {
        id: "s3",
        title: "Insane Skate Trick! 🛹",
        thumbnail: "https://images.unsplash.com/photo-1520045864914-69480a4aa1e3?w=400&q=80",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        channelId: "c3",
        channelName: "Lofi Girl",
        channelAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80",
        views: "2.1M",
        likes: 210000,
        comments: 800,
        description: "First try! #skate #tricks #viral",
        audioTrack: "Skater Boy - Lofi Girl",
    },
    {
        id: "s4",
        title: "Fastest Coding Setup 💻",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        channelId: "c4",
        channelName: "Nature Planet",
        channelAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
        views: "500K",
        likes: 45000,
        comments: 120,
        description: "My productivity setup for 2024. #setup #coding #tech",
        audioTrack: "Chill Beats - Nature Planet",
    }
];
