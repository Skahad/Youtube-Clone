import React, { useState } from 'react';
import {
    Flag,
    Check,
    X,
    AlertTriangle,
    ExternalLink,
    ChevronRight,
    User,
    MessageSquare,
    Video,
    Play,
    ArrowUpRight
} from 'lucide-react';
import './Reports.css';

const reportData = [
    { id: 1, type: 'Video', target: 'Unsafe Driving Stunts', reporter: 'alex_99', reason: 'Dangerous Acts', date: '5m ago', status: 'Pending' },
    { id: 2, type: 'Comment', target: 'This video is a scam!', reporter: 'mod_bot', reason: 'Spam', date: '12m ago', status: 'Escalated' },
    { id: 3, type: 'User', target: 'SpamKing2024', reporter: 'trusted_user', reason: 'Harassment', date: '45m ago', status: 'Pending' },
    { id: 4, type: 'Video', target: 'Music Video Re-upload', reporter: 'SonyMusic', reason: 'Copyright', date: '1h ago', status: 'Pending' },
];

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(reportData[0]);

    const getIcon = (type) => {
        switch (type) {
            case 'Video': return <Video size={16} />;
            case 'Comment': return <MessageSquare size={16} />;
            case 'User': return <User size={16} />;
            default: return <Flag size={16} />;
        }
    };

    return (
        <div className="reports-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Moderation Queue</h1>
                    <p className="page-subtitle">Review reported content and take enforcement actions.</p>
                </div>
                <div className="header-actions">
                    <div className="queue-stats">
                        <span className="stat">Pending: <strong>142</strong></span>
                        <span className="stat">Resolved (Today): <strong>84</strong></span>
                    </div>
                </div>
            </div>

            <div className="moderation-container">
                <div className="reports-list">
                    <div className="list-search">
                        <input type="text" placeholder="Filter reports..." className="search-input" />
                    </div>
                    <div className="report-items">
                        {reportData.map((report) => (
                            <div
                                key={report.id}
                                className={`report-item ${selectedReport?.id === report.id ? 'active' : ''}`}
                                onClick={() => setSelectedReport(report)}
                            >
                                <div className="report-item-header">
                                    <span className="report-type">
                                        {getIcon(report.type)}
                                        {report.type}
                                    </span>
                                    <span className="report-date">{report.date}</span>
                                </div>
                                <p className="report-target">{report.target}</p>
                                <div className="report-item-footer">
                                    <span className="report-reason">{report.reason}</span>
                                    {report.status === 'Escalated' && <span className="status-badge warning">Escalated</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-detail">
                    {selectedReport ? (
                        <div className="detail-content">
                            <div className="detail-header">
                                <div>
                                    <h2 className="detail-title">Report Detail #{selectedReport.id}</h2>
                                    <p className="detail-meta">Reported by <strong>{selectedReport.reporter}</strong> on {selectedReport.date}</p>
                                </div>
                                <div className="detail-actions">
                                    <button className="btn-outline"><ExternalLink size={16} /> View Content</button>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3 className="section-title">Reason For Report</h3>
                                <div className="reason-box">
                                    <AlertTriangle size={20} className="warning-icon" />
                                    <div>
                                        <p className="reason-text">{selectedReport.reason}</p>
                                        <p className="reason-desc">The reporter claims this content violates Vidmero's guidelines regarding {selectedReport.reason.toLowerCase()}.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3 className="section-title">Content Preview</h3>
                                <div className="content-preview-box">
                                    {selectedReport.type === 'Video' ? (
                                        <div className="video-preview-placeholder">
                                            <Play size={40} fill="rgba(255,255,255,0.8)" />
                                        </div>
                                    ) : selectedReport.type === 'Comment' ? (
                                        <div className="comment-preview">
                                            <p className="comment-text">"{selectedReport.target}"</p>
                                            <p className="comment-author">— Posted by spam_account_123</p>
                                        </div>
                                    ) : (
                                        <div className="user-preview">
                                            <div className="user-avatar-lg">{selectedReport.target.charAt(0)}</div>
                                            <p className="user-name-lg">{selectedReport.target}</p>
                                            <p className="user-joined-lg">Joined 3 days ago • 12 uploads</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-footer">
                                <div className="decision-label">Take Action:</div>
                                <div className="decision-buttons">
                                    <button className="btn-decision dismiss">
                                        <Check size={18} /> Dismiss Report
                                    </button>
                                    <button className="btn-decision warn">
                                        <Flag size={18} /> Issue Warning
                                    </button>
                                    <button className="btn-decision escalate">
                                        <ArrowUpRight size={18} /> Escalate
                                    </button>
                                    <button className="btn-decision remove">
                                        <X size={18} /> Remove Content
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <Flag size={48} className="empty-icon" />
                            <p>Select a report from the queue to moderate.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
