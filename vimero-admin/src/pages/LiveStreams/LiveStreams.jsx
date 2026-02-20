import React, { useState } from 'react';
import { Radio, Activity, Users, Settings2, ShieldOff, Play, Clock, MoreVertical, X, Shield, MessageSquare } from 'lucide-react';
import './LiveStreams.css';

const initialStreamsData = [
    { id: 1, title: 'Summer Gaming Festival', creator: 'GameZone', viewers: '42.5k', health: 'Healthy', duration: '02:45:12', status: 'Live' },
    { id: 2, title: 'Morning News Roundup', creator: 'GlobalNews', viewers: '12.1k', health: 'Warning', duration: '00:15:45', status: 'Live' },
    { id: 3, title: 'Piano Masterclass', creator: 'MusicArt', viewers: '450', health: 'Healthy', duration: '01:30:00', status: 'Ending' },
];

const ChatSafetyModal = ({ stream, onClose, onSave }) => {
    const [settings, setSettings] = useState({
        slowMode: false,
        subscriberOnly: false,
        emoteOnly: false,
        blockedWords: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        onSave(stream.id, settings);
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container safety-modal">
                <div className="modal-header">
                    <div className="header-title">
                        <Shield size={20} className="text-primary" />
                        <h3>Chat Safety Settings</h3>
                    </div>
                    <button className="icon-btn-sm" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <p className="modal-subtitle">Manage chat restrictions for <strong>{stream.title}</strong>.</p>

                    <div className="setting-group">
                        <label className="setting-row">
                            <div className="setting-info">
                                <span className="setting-name">Slow Mode</span>
                                <span className="setting-desc">Limit how often users can send messages (30s).</span>
                            </div>
                            <input
                                type="checkbox"
                                name="slowMode"
                                checked={settings.slowMode}
                                onChange={handleChange}
                                className="toggle-switch"
                            />
                        </label>
                    </div>

                    <div className="setting-group">
                        <label className="setting-row">
                            <div className="setting-info">
                                <span className="setting-name">Subscriber-Only Chat</span>
                                <span className="setting-desc">Only users who have subscribed for 1 month+ can chat.</span>
                            </div>
                            <input
                                type="checkbox"
                                name="subscriberOnly"
                                checked={settings.subscriberOnly}
                                onChange={handleChange}
                                className="toggle-switch"
                            />
                        </label>
                    </div>

                    <div className="setting-group">
                        <label className="setting-row">
                            <div className="setting-info">
                                <span className="setting-name">Emote-Only Mode</span>
                                <span className="setting-desc">Restrict chat messages to emotes only.</span>
                            </div>
                            <input
                                type="checkbox"
                                name="emoteOnly"
                                checked={settings.emoteOnly}
                                onChange={handleChange}
                                className="toggle-switch"
                            />
                        </label>
                    </div>

                    <div className="setting-group vertical">
                        <label className="setting-label">Blocked Words (comma separated)</label>
                        <textarea
                            name="blockedWords"
                            className="input-textarea"
                            placeholder="badword1, badword2, spam..."
                            value={settings.blockedWords}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-outline danger sm" onClick={() => alert('Chat cleared!')}>Clear Chat History</button>
                    <div className="footer-actions">
                        <button className="btn-outline" onClick={onClose}>Cancel</button>
                        <button className="btn-primary" onClick={handleSave}>Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LiveStreams = () => {
    const [streams, setStreams] = useState(initialStreamsData);
    const [activeStream, setActiveStream] = useState(null);

    const handleOpenSettings = (stream) => {
        setActiveStream(stream);
    };

    const handleCloseSettings = () => {
        setActiveStream(null);
    };

    const handleSaveSettings = (streamId, settings) => {
        console.log(`Settings saved for stream ${streamId}:`, settings);
        alert(`Safety settings applied to stream #${streamId}`);
        setActiveStream(null);
    };

    const handleTerminate = (streamId) => {
        if (window.confirm('Are you sure you want to terminate this live stream? This action cannot be undone.')) {
            setStreams(prev => prev.filter(s => s.id !== streamId));
            alert('Stream terminated successfully.');
        }
    };

    return (
        <div className="live-streams-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Live Stream Administration</h1>
                    <p className="page-subtitle">Monitor real-time streams, manage chat safety, and handle stream health alerts.</p>
                </div>
            </div>

            <div className="streams-grid">
                {streams.map((stream) => (
                    <div key={stream.id} className="stream-monitor-card">
                        <div className="stream-preview">
                            <div className="live-tag">LIVE</div>
                            <div className="viewer-count"><Users size={12} /> {stream.viewers}</div>
                            <div className="stream-overlay-actions">
                                <button
                                    className="icon-btn-md settings-trigger"
                                    onClick={() => handleOpenSettings(stream)}
                                    title="Chat Safety Settings"
                                >
                                    <Settings2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="stream-body">
                            <div className="stream-main">
                                <h3 className="stream-title">{stream.title}</h3>
                                <span className="creator-name">{stream.creator}</span>
                            </div>
                            <div className="stream-metrics">
                                <div className="metric-item">
                                    <Activity size={14} className={stream.health.toLowerCase()} />
                                    <span className={stream.health.toLowerCase()}>{stream.health}</span>
                                </div>
                                <div className="metric-item">
                                    <Clock size={14} />
                                    <span>{stream.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div className="stream-footer">
                            <button
                                className="btn-outline danger sm w-full"
                                onClick={() => handleTerminate(stream.id)}
                            >
                                <ShieldOff size={14} /> Emergency Terminate
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {activeStream && (
                <ChatSafetyModal
                    stream={activeStream}
                    onClose={handleCloseSettings}
                    onSave={handleSaveSettings}
                />
            )}
        </div>
    );
};

export default LiveStreams;
