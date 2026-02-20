import React from 'react';
import {
    Shield,
    User,
    Video,
    Settings,
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    Search,
    ArrowRight
} from 'lucide-react';
import './AuditLogs.css';

const logData = [
    { id: 1, admin: 'Alex Smith', action: 'Video Removed', target: 'ID: 7x2b9c', detail: 'Violation: Dangerous Acts', type: 'danger', time: '10:45 AM', date: 'Mar 17, 2024' },
    { id: 2, admin: 'Emma Brown', action: 'User Suspended', target: 'noah_w', detail: 'Repeated spam reports', type: 'warning', time: '09:30 AM', date: 'Mar 17, 2024' },
    { id: 3, admin: 'System', action: 'Automated Flag', target: 'ID: 9k1m2j', detail: 'Copyright Match (Sony)', type: 'info', time: '08:15 AM', date: 'Mar 17, 2024' },
    { id: 4, admin: 'Alex Smith', action: 'Featured Video', target: 'ID: 3a4b5c', detail: 'Added to Trending', type: 'success', time: '05:00 PM', date: 'Mar 16, 2024' },
    { id: 5, admin: 'Emma Brown', action: 'Category Deleted', target: 'Pranks', detail: 'Merged with Comedy', type: 'neutral', time: '02:30 PM', date: 'Mar 16, 2024' },
];

const AuditLogs = () => {
    return (
        <div className="audit-logs-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Audit Logs</h1>
                    <p className="page-subtitle">Full traceability of all administrative actions and system changes.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline">Download Logs</button>
                </div>
            </div>

            <div className="timeline-container">
                <div className="timeline-filters">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Search logs by admin or action..." />
                    </div>
                    <div className="filter-group">
                        <button className="filter-btn"><Filter size={16} /> All Events</button>
                        <button className="filter-btn"><Clock size={16} /> All Time</button>
                    </div>
                </div>

                <div className="audit-timeline">
                    {logData.map((log) => (
                        <div key={log.id} className="timeline-item">
                            <div className="timeline-date-side">
                                <span className="log-time">{log.time}</span>
                                <span className="log-date">{log.date}</span>
                            </div>
                            <div className={`timeline-indicator ${log.type}`}>
                                {log.type === 'danger' ? <AlertCircle size={16} /> :
                                    log.type === 'success' ? <CheckCircle2 size={16} /> :
                                        log.type === 'warning' ? <Shield size={16} /> : <Clock size={16} />}
                            </div>
                            <div className="timeline-content">
                                <div className="log-header">
                                    <span className="log-admin">{log.admin}</span>
                                    <span className="log-separator"><ArrowRight size={14} /></span>
                                    <span className="log-action">{log.action}</span>
                                </div>
                                <div className="log-body">
                                    <div className="log-target-box">
                                        <strong>Target:</strong> {log.target}
                                    </div>
                                    <div className="log-detail">
                                        {log.detail}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
