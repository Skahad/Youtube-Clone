export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    authorAvatar: string;
    date: string;
    views: string;
    shares: string;
    category: string;
    image: string;
    likes: number;
    dislikes: number;
    commentsCount: number;
}

export const articles: Article[] = [
    {
        id: "1",
        title: "Maha Kumbh",
        description: "Maha Kumbh Mela",
        content: "Maha Kumbh details will come soon. The Kumbh Mela is a major pilgrimage and festival in Hinduism. It is celebrated in a cycle of approximately 12 years, to celebrate every revolution Brihaspati (Jupiter) completes, at four river-bank pilgrimage sites: Prayagraj (Ganges-Yamuna-Sarasvati rivers confluence), Haridwar (Ganges), Nashik (Godavari), and Ujjain (Shipra).",
        author: "Manish Shah",
        authorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
        date: "03/27/25",
        views: "2,181",
        shares: "0",
        category: "Travel & Events",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
        likes: 2,
        dislikes: 2,
        commentsCount: 4
    },
    {
        id: "2",
        title: "The Future of Tech",
        description: "Exploring the next frontier of artificial intelligence.",
        content: "Artificial Intelligence is evolving at an unprecedented pace. From generative models to autonomous systems, the landscape of technology is being reshaped daily. This article dives into the ethical considerations and the massive potential of the next generation of AI.",
        author: "Sarah Chen",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        date: "03/28/25",
        views: "1,542",
        shares: "12",
        category: "Other",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80",
        likes: 15,
        dislikes: 0,
        commentsCount: 2
    },
    {
        id: "3",
        title: "World Travel Guide",
        description: "Hidden gems you must visit this summer.",
        content: "Summer is almost here, and it's time to plan your next escape. Beyond the popular tourist traps lie hidden gems that offer authentic experiences and breathtaking views. We've curated a list of the top 5 underrated destinations for your summer itinerary.",
        author: "Alex Rivera",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        date: "03/29/25",
        views: "3,892",
        shares: "45",
        category: "Travel & Events",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
        likes: 120,
        dislikes: 5,
        commentsCount: 18
    }
];
