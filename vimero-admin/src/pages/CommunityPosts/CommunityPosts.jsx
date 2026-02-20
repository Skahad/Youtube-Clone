import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, BarChart, Image as ImageIcon, MoreVertical, ShieldCheck, Trash2 } from 'lucide-react';
import './CommunityPosts.css';

const initialPostsData = [
    { id: 1, creator: 'TechReviewer', type: 'Poll', content: 'What gadget should I review next?', engagement: '14.2k votes', status: 'Approved', date: '2h ago' },
    { id: 2, creator: 'NatureVlogs', type: 'Image', content: 'Behind the scenes in the Amazon rainforest.', engagement: '8.5k likes', status: 'Pending', date: '5h ago' },
    { id: 3, creator: 'DailyNews', type: 'Text', content: 'Announcement: Our live stream starts tomorrow!', engagement: '1.2k comments', status: 'Flagged', date: '1d ago' },
];

const CommunityPosts = () => {
    const [posts, setPosts] = useState(initialPostsData);

    const handleApprove = (id) => {
        setPosts(posts.map(post => post.id === id ? { ...post, status: 'Approved' } : post));
        alert('Post approved!');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== id));
        }
    };

    const handleMore = (id) => {
        alert('More options coming soon!');
    };

    return (
        <div className="community-posts-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Community Posts Moderation</h1>
                    <p className="page-subtitle">Oversee engagement-driven content like polls, image posts, and text updates.</p>
                </div>
            </div>

            <div className="posts-feed">
                {posts.map((post) => (
                    <div key={post.id} className={`post-card ${post.status.toLowerCase()}`}>
                        <div className="post-header">
                            <div className="creator-info">
                                <div className="creator-avatar">{post.creator[0]}</div>
                                <div>
                                    <span className="creator-name">{post.creator}</span>
                                    <span className="post-type">
                                        {post.type === 'Poll' ? <BarChart size={12} /> :
                                            post.type === 'Image' ? <ImageIcon size={12} /> : <MessageSquare size={12} />}
                                        {post.type} Post
                                    </span>
                                </div>
                            </div>
                            <span className={`status-pill ${post.status.toLowerCase()}`}>{post.status}</span>
                        </div>
                        <div className="post-body">
                            <p className="post-content">{post.content}</p>
                            <div className="engagement-info">
                                <ThumbsUp size={14} /> {post.engagement}
                            </div>
                        </div>
                        <div className="post-footer">
                            <span className="post-date">{post.date}</span>
                            <div className="post-actions">
                                <button
                                    className="icon-btn-md success"
                                    onClick={() => handleApprove(post.id)}
                                    title="Approve"
                                    disabled={post.status === 'Approved'}
                                    style={{ opacity: post.status === 'Approved' ? 0.5 : 1, cursor: post.status === 'Approved' ? 'default' : 'pointer' }}
                                >
                                    <ShieldCheck size={18} />
                                </button>
                                <button
                                    className="icon-btn-md danger"
                                    onClick={() => handleDelete(post.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    className="icon-btn-md"
                                    onClick={() => handleMore(post.id)}
                                    title="More Options"
                                >
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPosts;
