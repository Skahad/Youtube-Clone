import React, { useState } from 'react';
import {
    UserSquare2,
    Search,
    Filter,
    ChevronRight,
    Star,
    AlertCircle,
    DollarSign,
    BarChart3,
    ExternalLink,
    Crown,
    Ban,
    ShieldCheck,
    Zap
} from 'lucide-react';
import './CreatorStudio.css';

const creatorsData = [
    {
        id: 1,
        channel: 'TechVibe',
        handle: '@techvibe',
        avatar: 'TV',
        subscribers: '1.2M',
        revenue: '$42,500',
        strikes: 0,
        status: 'Verified',
        monetization: 'Active',
        joined: '2021-05-12'
    },
    {
        id: 2,
        channel: 'GamingWithGabe',
        handle: '@gamewithgabe',
        avatar: 'GG',
        subscribers: '850K',
        revenue: '$18,200',
        strikes: 1,
        status: 'Standard',
        monetization: 'Limited',
        joined: '2022-01-30'
    },
    {
        id: 3,
        channel: 'ChefMaster',
        handle: '@chefmaster',
        avatar: 'CM',
        subscribers: '4.5M',
        revenue: '$112,000',
        strikes: 0,
        status: 'Partner',
        monetization: 'Active',
        joined: '2019-11-20'
    },
    {
        id: 4,
        channel: 'NewsFirst',
        handle: '@newsfirst',
        avatar: 'NF',
        subscribers: '2.1M',
        revenue: '$38,900',
        strikes: 2,
        status: 'Verified',
        monetization: 'Suspended',
        joined: '2020-03-15'
    }
];

const CreatorStudio = () => {
    const [selectedCreator, setSelectedCreator] = useState(creatorsData[0]);

    return (
        <div className="creator-studio-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Creator Studio Hub</h1>
                    <p className="page-subtitle">Admin-level management of platform creators, channel performance, and monetization health.</p>
                </div>
            </div>

            <div className="studio-grid">
                <aside className="creator-list-panel">
                    <div className="panel-search">
                        <Search size={18} />
                        <input type="text" placeholder="Search channels..." />
                    </div>
                    <div className="creator-list">
                        {creatorsData.map((creator) => (
                            <div
                                key={creator.id}
                                className={`creator-item ${selectedCreator.id === creator.id ? 'selected' : ''}`}
                                onClick={() => setSelectedCreator(creator)}
                            >
                                <div className="item-avatar">{creator.avatar}</div>
                                <div className="item-info">
                                    <span className="channel-name">{creator.channel}</span>
                                    <span className="channel-handle">{creator.handle}</span>
                                </div>
                                <div className="item-meta">
                                    <span className="subs">{creator.subscribers}</span>
                                    {creator.strikes > 0 && <span className="strike-badge">!</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="creator-detail-view">
                    <div className="detail-header">
                        <div className="header-main">
                            <div className="channel-large-avatar">{selectedCreator.avatar}</div>
                            <div className="channel-id-info">
                                <h2>{selectedCreator.channel} <ShieldCheck size={20} className="verified-icon" /></h2>
                                <p>{selectedCreator.handle} • Joined {selectedCreator.joined}</p>
                                <div className="badge-row">
                                    <span className={`badge ${selectedCreator.status.toLowerCase()}`}>{selectedCreator.status}</span>
                                    <span className="badge-outline">Creator Program ID: VH-{selectedCreator.id}992</span>
                                </div>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button className="btn-outline"><Edit3 size={16} /> Edit Channel</button>
                            <button className="btn-secondary"><ExternalLink size={16} /> View Profile</button>
                        </div>
                    </div>

                    <div className="detail-stats-grid">
                        <div className="stat-card-mini">
                            <span className="label">Total Subscribers</span>
                            <span className="value">{selectedCreator.subscribers}</span>
                            <span className="trend up">+12%</span>
                        </div>
                        <div className="stat-card-mini">
                            <span className="label">Revenue (30d)</span>
                            <span className="value">{selectedCreator.revenue}</span>
                            <span className="trend up">+5.4%</span>
                        </div>
                        <div className="stat-card-mini">
                            <span className="label">Active Strikes</span>
                            <span className={`value ${selectedCreator.strikes > 0 ? 'danger' : ''}`}>{selectedCreator.strikes}</span>
                            <span className="sub-label">Out of 3</span>
                        </div>
                        <div className="stat-card-mini">
                            <span className="label">Monetization</span>
                            <span className="value">{selectedCreator.monetization}</span>
                            <span className={`status-dot ${selectedCreator.monetization.toLowerCase()}`} />
                        </div>
                    </div>

                    <div className="detail-content-rows">
                        <div className="content-panel">
                            <div className="panel-header-sub">
                                <h3>Recent Performance</h3>
                                <button className="text-btn sm">View Detailed Analytics</button>
                            </div>
                            <div className="performance-chart-placeholder">
                                <div className="chart-bars">
                                    {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                        <div key={i} className="bar" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <div className="chart-labels">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>
                        </div>

                        <div className="side-panels">
                            <div className="action-panel">
                                <h4>Safety & Compliance</h4>
                                <div className="action-list">
                                    <button className="action-row-btn">
                                        <AlertCircle size={16} /> Issue Policy Warning
                                    </button>
                                    <button className="action-row-btn danger">
                                        <Ban size={16} /> Suspend Monetization
                                    </button>
                                    <button className="action-row-btn danger">
                                        <Zap size={16} /> Apply Community Strike
                                    </button>
                                </div>
                            </div>

                            <div className="eligibility-panel">
                                <h4>Feature Eligibility</h4>
                                <div className="eligibility-list">
                                    <div className="elig-item success">
                                        <Check size={14} /> Live Streaming
                                    </div>
                                    <div className="elig-item success">
                                        <Check size={14} /> Custom Thumbnails
                                    </div>
                                    <div className="elig-item warning">
                                        <AlertCircle size={14} /> Merch Shelf (Pending)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Internal icon for Edit
const Edit3 = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const Check = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default CreatorStudio;
