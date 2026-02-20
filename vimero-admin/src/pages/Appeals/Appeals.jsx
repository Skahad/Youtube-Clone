import React from 'react';
import { MailCheck, ExternalLink, ShieldCheck, XCircle, MoreVertical, Eye } from 'lucide-react';
import './Appeals.css';

const appealsData = [
    { id: 1, channel: 'GameX', category: 'Copyright', reason: 'Fair Use Defense', status: 'Pending', date: '1h ago' },
    { id: 2, channel: 'VlogWorld', category: 'Safety', reason: 'Misidentified violation', status: 'Under Review', date: '4h ago' },
    { id: 3, channel: 'DailyNews', category: 'Monetization', reason: 'Ad-suitability appeal', status: 'Resolved', date: '2d ago' },
];

const AppealsManagement = () => {
    return (
        <div className="appeals-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Appeals Management</h1>
                    <p className="page-subtitle">Review and resolve creator disputes regarding policy and copyright enforcement.</p>
                </div>
            </div>

            <div className="appeals-inbox">
                {appealsData.map((appeal) => (
                    <div key={appeal.id} className="appeal-card">
                        <div className="appeal-header">
                            <div className="creator-summary">
                                <div className="mini-avatar">{appeal.channel[0]}</div>
                                <div>
                                    <span className="channel-name">{appeal.channel}</span>
                                    <span className="appeal-category">{appeal.category} Appeal</span>
                                </div>
                            </div>
                            <span className={`status-pill ${appeal.status.replace(' ', '-').toLowerCase()}`}>
                                {appeal.status}
                            </span>
                        </div>
                        <div className="appeal-body">
                            <p className="appeal-reason">"{appeal.reason}"</p>
                            <span className="appeal-date">{appeal.date}</span>
                        </div>
                        <div className="appeal-actions">
                            <button className="btn-secondary sm"><Eye size={14} /> Full Evidence</button>
                            <div className="decision-btns">
                                <button className="btn-outline success sm"><ShieldCheck size={14} /> Revert</button>
                                <button className="btn-outline danger sm"><XCircle size={14} /> Uphold</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppealsManagement;
