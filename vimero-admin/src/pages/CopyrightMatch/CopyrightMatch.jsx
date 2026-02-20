import React from 'react';
import { Copyright, Search, Filter, ShieldAlert, MoreVertical, Check, X, DollarSign, Ban } from 'lucide-react';
import './CopyrightMatch.css';

const matchData = [
    { id: 1, video: 'My Summer Trip v2', creator: 'TechTraveler', matchPercentage: '98%', duration: '0:45 - 2:10', status: 'Review', date: '2h ago' },
    { id: 2, video: 'Gaming Highlights #44', creator: 'ProGamerX', matchPercentage: '85%', duration: '4:12 - 5:50', status: 'Monetized', date: '5h ago' },
    { id: 3, video: 'Best Cooking Tips', creator: 'ChefDaily', matchPercentage: '100%', duration: 'Full Video', status: 'Blocked', date: '1d ago' },
];

const CopyrightMatch = () => {
    return (
        <div className="copyright-match-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Copyright Match Management</h1>
                    <p className="page-subtitle">Identify and manage content matches across the platform.</p>
                </div>
            </div>

            <div className="match-stats-grid">
                <div className="match-stat-card">
                    <span className="label">New Matches</span>
                    <span className="value">1,240</span>
                </div>
                <div className="match-stat-card">
                    <span className="label">Resolved</span>
                    <span className="value">85%</span>
                </div>
                <div className="match-stat-card">
                    <span className="label">Manual Reviews</span>
                    <span className="value">142</span>
                </div>
            </div>

            <div className="match-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Video Details</th>
                            <th>Matched Content</th>
                            <th>Confidence</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchData.map((match) => (
                            <tr key={match.id}>
                                <td>
                                    <div className="match-video-cell">
                                        <div className="match-thumb" />
                                        <div>
                                            <div className="video-title">{match.video}</div>
                                            <div className="video-creator">by {match.creator} • {match.date}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="match-content-info">
                                        <span className="match-duration">{match.duration}</span>
                                        <span className="match-type">Visual & Audio Match</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="confidence-pill" style={{ opacity: parseInt(match.matchPercentage) / 100 }}>
                                        {match.matchPercentage}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-pill ${match.status.toLowerCase()}`}>{match.status}</span>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button className="icon-btn-sm" title="Block"><X size={14} /></button>
                                        <button className="icon-btn-sm" title="Monetize"><DollarSign size={14} /></button>
                                        <button className="icon-btn-sm"><MoreVertical size={14} /></button>
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

export default CopyrightMatch;
