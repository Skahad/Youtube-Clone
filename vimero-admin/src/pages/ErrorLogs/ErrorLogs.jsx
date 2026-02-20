import React, { useState } from 'react';
import {
    AlertTriangle,
    Terminal,
    Search,
    Filter,
    Trash2,
    Copy,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Clock,
    Database,
    Cpu,
    Globe
} from 'lucide-react';
import './ErrorLogs.css';

const errorLogsData = [
    {
        id: 'ERR-9021',
        level: 'Critical',
        message: 'Database connection timeout in processing queue',
        service: 'Core API',
        time: '2m ago',
        timestamp: '2024-03-17 16:30:12',
        stack: 'Error: Connection timeout\n  at Database.connect (db.js:42)\n  at processQueue (queue.js:156)\n  at async handleTask (worker.js:89)',
        count: 140
    },
    {
        id: 'ERR-4040',
        level: 'Warning',
        message: 'Failed to fetch CDN asset: thumb_782.webp',
        service: 'Video Edge',
        time: '15m ago',
        timestamp: '2024-03-17 16:15:45',
        stack: 'FetchError: 404 Not Found\n  at AssetService.get (assets.js:12)\n  at async renderThumbnail (ui.js:203)',
        count: 12
    },
    {
        id: 'ERR-5001',
        level: 'Error',
        message: 'Uncaught TypeError: Cannot read property "id" of null',
        service: 'Admin UI',
        time: '1h ago',
        timestamp: '2024-03-17 15:30:00',
        stack: 'TypeError: Cannot read properties of null\n  at Sidebar.render (Sidebar.jsx:45)\n  at finishClassComponent (react-dom.production.min.js:153)',
        count: 8
    },
];

const ErrorLogs = () => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="error-logs-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Error Logs</h1>
                    <p className="page-subtitle">Centralized monitoring for runtime exceptions and stack traces.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline danger"><Trash2 size={16} /> Clear All Logs</button>
                </div>
            </div>

            <div className="logs-toolbar">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Filter by message, ID, or service..." />
                </div>
                <div className="filter-group">
                    <button className="filter-btn active">All Levels</button>
                    <button className="filter-btn">Critical</button>
                    <button className="filter-btn">Errors</button>
                    <button className="filter-btn">Warnings</button>
                </div>
            </div>

            <div className="logs-container">
                {errorLogsData.map((log) => (
                    <div key={log.id} className={`log-entry ${expandedId === log.id ? 'expanded' : ''} ${log.level.toLowerCase()}`}>
                        <div className="log-main" onClick={() => toggleExpand(log.id)}>
                            <div className="log-status">
                                <AlertTriangle size={18} />
                            </div>
                            <div className="log-info">
                                <div className="log-header-row">
                                    <span className="log-id">{log.id}</span>
                                    <span className="log-service">
                                        {log.service === 'Admin UI' ? <Globe size={12} /> :
                                            log.service === 'Core API' ? <Cpu size={12} /> : <Database size={12} />}
                                        {log.service}
                                    </span>
                                    <span className="log-count">{log.count} occurrences</span>
                                </div>
                                <h3 className="log-message">{log.message}</h3>
                                <div className="log-meta">
                                    <span className="log-level-badge">{log.level}</span>
                                    <span className="log-time"><Clock size={12} /> {log.time}</span>
                                </div>
                            </div>
                            <div className="log-chevron">
                                {expandedId === log.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {expandedId === log.id && (
                            <div className="log-details">
                                <div className="details-header">
                                    <span className="timestamp">Detected at: {log.timestamp}</span>
                                    <div className="detail-actions">
                                        <button className="text-btn sm"><Copy size={14} /> Copy Stack</button>
                                        <button className="text-btn sm"><ExternalLink size={14} /> View in Sentry</button>
                                    </div>
                                </div>
                                <div className="stack-trace">
                                    <div className="terminal-header">
                                        <Terminal size={14} /> STACK TRACE
                                    </div>
                                    <pre>{log.stack}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ErrorLogs;
