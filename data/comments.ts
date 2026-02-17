export interface Comment {
    id: string;
    videoId: string;
    username: string;
    avatar: string;
    content: string;
    likes: number;
    replies: number;
    timeAgo: string;
}

export const comments: Comment[] = [
    {
        id: "co1",
        videoId: "1",
        username: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
        content: "This tutorial is exactly what I was looking for! Thanks for sharing.",
        likes: 245,
        replies: 12,
        timeAgo: "2 days ago",
    },
    {
        id: "co2",
        videoId: "1",
        username: "Sarah Lee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        content: "Great explanation of the App Router. It finally makes sense.",
        likes: 89,
        replies: 5,
        timeAgo: "1 day ago",
    },
    {
        id: "co3",
        videoId: "1",
        username: "DevMike",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        content: "Can you do a video on database integration next?",
        likes: 56,
        replies: 8,
        timeAgo: "15 hours ago",
    },
    {
        id: "co4",
        videoId: "2",
        username: "CodeLover",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
        content: "Live Share is a game changer for remote pairing.",
        likes: 120,
        replies: 3,
        timeAgo: "3 hours ago",
    },
    {
        id: "co5",
        videoId: "2",
        username: "NewbieDev",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80",
        content: "Thanks for the recommendations!",
        likes: 15,
        replies: 0,
        timeAgo: "1 hour ago",
    }
];
