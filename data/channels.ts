export interface Channel {
    id: string;
    name: string;
    avatar: string;
    banner: string;
    subscribers: string;
    description: string;
}

export const channels: Channel[] = [
    {
        id: "c1",
        name: "Code Master",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1600&q=80",
        subscribers: "1.2M",
        description: "Welcome to Code Master! Here we teach you everything about web development, from basics to advanced topics.",
    },
    {
        id: "c2",
        name: "Dev Tips",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=80",
        subscribers: "540K",
        description: "Daily tips and tricks for developers to improve productivity and code quality.",
    },
    {
        id: "c3",
        name: "Lofi Girl",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=1600&q=80",
        subscribers: "12M",
        description: "Lofi hip hop beats to relax and study to.",
    },
    {
        id: "c4",
        name: "Nature Planet",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=80",
        subscribers: "8.5M",
        description: "Exploring the most beautiful places on Earth.",
    },
    {
        id: "c5",
        name: "Chef Gordon",
        avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80",
        subscribers: "20M",
        description: "Mastering the art of cooking.",
    },
    {
        id: "c6",
        name: "Fireship",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1600&q=80",
        subscribers: "3M",
        description: "High-intensity code tutorials to help you build apps faster.",
    },
    {
        id: "c7",
        name: "Wanderlust",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        banner: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80",
        subscribers: "450K",
        description: "Travel smarter, cheaper, and longer.",
    }
];
