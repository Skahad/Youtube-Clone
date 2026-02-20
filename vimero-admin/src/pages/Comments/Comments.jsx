import React from 'react';
import {
    MessageSquare,
    Trash2,
    Flag,
    CheckCircle2,
    MoreVertical,
    ThumbsUp,
    Search
} from 'lucide-react';
import './Comments.css';

const commentData = [
    { id: 1, user: 'beach_vibes', text: 'This tutorial was so helpful, thank you!', video: 'How to Vidmero', status: 'Published', date: '2m ago' },
    { id: 2, user: 'troll_master', text: 'This is a complete waste of time. Uninstalling.', video: 'New Features 2024', status: 'Flagged', date: '10m ago' },
    { id: 3, user: 'tech_guru', text: 'Can you explain the API integration in more detail?', video: 'Developer Hub', status: 'Published', date: '1h ago' },
    { id: 4, user: 'spam_bot_9', text: 'FREE BITCOIN GIVEAWAY CLICK HERE NOW !!!', video: 'Bitcoin Explained', status: 'Removed', date: '3h ago' },
];

const Comments = () => {
    return (
        <div className="comments-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Comment Moderation</h1>
                    <p className="page-subtitle">Manage user engagement and maintain community standards.</p>
                </div>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search comments or users..." />
                </div>
                <div className="filter-group">
                    <button className="filter-btn">Status: All</button>
                    <button className="filter-btn">Video: All</button>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th style={{ width: '40%' }}>Comment</th>
                            <th>Video</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commentData.map((c) => (
                            <tr key={c.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar small">{c.user.charAt(0)}</div>
                                        <span className="user-name">{c.user}</span>
                                    </div>
                                </td>
                                <td className="comment-text-cell">{c.text}</td>
                                <td className="text-secondary">{c.video}</td>
                                <td>
                                    <span className={`status-pill ${c.status.toLowerCase()}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="text-tertiary">{c.date}</td>
                                <td className="col-actions">
                                    <div className="action-row">
                                        <button className="icon-btn-sm success" title="Approve"><CheckCircle2 size={16} /></button>
                                        <button className="icon-btn-sm warning" title="Flag"><Flag size={16} /></button>
                                        <button className="icon-btn-sm danger" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;
