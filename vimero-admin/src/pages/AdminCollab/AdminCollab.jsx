import React from 'react';
import { Users2, MessageSquare, ShieldCheck, Clock, UserPlus, MoreVertical, Search } from 'lucide-react';
import './AdminCollab.css';

const activities = [
    { id: 1, admin: 'Alex S.', action: 'Suspended @GamingWithGabe', target: 'Creator Studio', time: '12m ago' },
    { id: 2, admin: 'Sarah L.', action: 'Updated Search Rules', target: 'Search Control', time: '45m ago' },
    { id: 3, admin: 'Mike R.', action: 'Resolved Appeal #142', target: 'Appeals', time: '2h ago' },
];

const AdminCollab = () => {
    return (
        <div className="admin-collab-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Admin Collaboration Tools</h1>
                    <p className="page-subtitle">Track cross-admin activity, escalate issues, and manage internal coordination.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary"><UserPlus size={16} /> Invite Admin</button>
                </div>
            </div>

            <div className="collab-grid">
                <div className="activity-feed">
                    <div className="section-header">
                        <h3>Live Activity Feed</h3>
                        <Search size={16} color="var(--text-tertiary)" />
                    </div>
                    <div className="activity-list">
                        {activities.map(act => (
                            <div key={act.id} className="activity-row">
                                <div className="admin-avatar">{act.admin[0]}</div>
                                <div className="act-details">
                                    <div className="act-main">
                                        <strong>{act.admin}</strong> {act.action}
                                    </div>
                                    <div className="act-meta">
                                        <span>{act.target}</span> • <span>{act.time}</span>
                                    </div>
                                </div>
                                <button className="icon-btn-sm"><MoreVertical size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="inter-comms">
                    <h3>Internal Notes</h3>
                    <div className="notes-box">
                        <textarea placeholder="Tag an admin with @ to escalate an issue..." />
                        <div className="notes-footer">
                            <button className="btn-primary sm">Post Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCollab;
