import React, { useState, useRef } from 'react';
import {
    Play,
    Trash2,
    Flag,
    Star,
    Eye,
    Clock,
    MoreVertical,
    Zap,
    Check
} from 'lucide-react';
import './Shorts.css';

const shortsData = [
    { id: 1, title: 'Epic Sunset Transition', creator: 'VisualArts', views: '12M', status: 'Trending', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Sunset+Transition', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'Coding in 60 Seconds', creator: 'DevShorts', views: '1.2M', status: 'Approved', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Coding+in+60s', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 3, title: 'Fastest Pizza in the World', creator: 'Foodie', views: '800k', status: 'Flagged', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Fastest+Pizza', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, title: 'Dune Part 2 Review', creator: 'MovieBuff', views: '5M', status: 'Approved', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Dune+Review', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 5, title: 'My Daily Workout', creator: 'FitnessPro', views: '2.5M', status: 'Approved', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Daily+Workout', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, title: 'New iPhone Leaks!', creator: 'TechTalk', views: '9M', status: 'Trending', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=iPhone+Leaks', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 7, title: 'Cat Jumps Fail', creator: 'MeowMix', views: '120k', status: 'Flagged', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=Cat+Fail', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 8, title: 'DIY Lamp Hack', creator: 'Crafty', views: '320k', status: 'Flagged', thumbnail: 'https://placehold.co/720x1280/e2e8f0/1e293b?text=DIY+Lamp', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

const ShortCard = ({ short, onAction }) => {
    const isApproved = short.status === 'Approved' || short.status === 'Trending';
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Play failed", e));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="short-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="short-preview">
                <div className="preview-overlay">
                    <div className="quick-actions">
                        <button className="q-btn" title="Quick Feature" onClick={() => onAction(short.id, 'feature')}><Star size={16} /></button>
                        <button
                            className={`q-btn ${isApproved ? 'flag' : 'approve'}`}
                            title={isApproved ? "Flag/Report" : "Approve"}
                            onClick={() => onAction(short.id, 'toggle_flag_approve')}
                        >
                            {isApproved ? <Flag size={16} /> : <Check size={16} />}
                        </button>
                        <button className="q-btn delete" title="Remove" onClick={() => onAction(short.id, 'delete')}><Trash2 size={16} /></button>
                    </div>
                    <div className="play-hint">
                        <Play size={24} fill="white" />
                        <span>Hover to preview</span>
                    </div>
                    <div className="short-badge">
                        <Zap size={12} fill="white" />
                        {short.views}
                    </div>
                </div>
                <video
                    ref={videoRef}
                    src={short.video}
                    poster={short.thumbnail}
                    className="placeholder-video"
                    loop
                    muted
                    playsInline
                />
            </div>
            <div className="short-info">
                <div className="short-main">
                    <h3 className="short-title">{short.title}</h3>
                    <p className="short-creator">@{short.creator}</p>
                </div>
                <button className="icon-btn-sm"><MoreVertical size={18} /></button>
            </div>
            <div className={`short-status ${short.status.toLowerCase()}`}>
                {short.status}
            </div>
        </div>
    );
};

const Shorts = () => {
    const [shorts, setShorts] = useState(shortsData);
    const [activeTab, setActiveTab] = useState('Flagged');
    const [visibleCount, setVisibleCount] = useState(6);

    // Filter logic
    const filteredShorts = shorts.filter(short => {
        if (activeTab === 'All') return true;
        // The 'Flagged' tab shows items that need moderation (Flagged)
        if (activeTab === 'Flagged') return short.status === 'Flagged';
        if (activeTab === 'Approved') return short.status === 'Approved';
        if (activeTab === 'Trending') return short.status === 'Trending';
        if (activeTab === 'Removed') return short.status === 'Removed';
        return short.status === activeTab;
    });

    const visibleShorts = filteredShorts.slice(0, visibleCount);

    // Handlers
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setVisibleCount(6); // Reset pagination on tab change
    };

    const handleAction = (id, action) => {
        setShorts(prevShorts => prevShorts.map(short => {
            if (short.id !== id) return short;

            if (action === 'feature') {
                // Toggle between Approved and Trending
                if (short.status === 'Trending') return { ...short, status: 'Approved' };
                if (short.status === 'Approved') return { ...short, status: 'Trending' };
                // If Pending/Flagged/Removed, maybe move to Trending?
                return { ...short, status: 'Trending' };
            }

            if (action === 'toggle_flag_approve') {
                const isApproved = short.status === 'Approved' || short.status === 'Trending';
                return { ...short, status: isApproved ? 'Flagged' : 'Approved' };
            }

            if (action === 'delete') {
                return { ...short, status: 'Removed' };
            }
            return short;
        }));
    };

    const flaggedCount = shorts.filter(s => s.status === 'Flagged').length;

    const handleModerateQueue = () => {
        // Auto-approve all flagged shorts
        const flaggedIds = shorts.filter(s => s.status === 'Flagged').map(s => s.id);

        if (flaggedIds.length === 0) return;

        if (window.confirm(`Auto-moderate ${flaggedIds.length} flagged shorts?`)) {
            setShorts(prev => prev.map(s => flaggedIds.includes(s.id) ? { ...s, status: 'Approved' } : s));
            alert('Queue moderated!');
        }
    };

    return (
        <div className="shorts-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Shorts Moderation</h1>
                    <p className="page-subtitle">Rapid review and curation for vertical content.</p>
                </div>
                <div className="header-actions">
                    <div className="tabs-mini">
                        {['Flagged', 'Approved', 'Trending', 'Removed'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-mini ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn-primary"
                        onClick={handleModerateQueue}
                        disabled={flaggedCount === 0}
                        style={{ opacity: flaggedCount === 0 ? 0.5 : 1 }}
                    >
                        Moderate Queue ({flaggedCount})
                    </button>
                </div>
            </div>

            <div className="shorts-grid">
                {visibleShorts.map((short) => (
                    <ShortCard
                        key={short.id}
                        short={short}
                        onAction={handleAction}
                    />
                ))}
            </div>

            {visibleShorts.length < filteredShorts.length && (
                <div className="load-more">
                    <button className="btn-outline" onClick={() => setVisibleCount(prev => prev + 6)}>
                        Load More Shorts
                    </button>
                </div>
            )}
        </div>
    );
};

export default Shorts;
