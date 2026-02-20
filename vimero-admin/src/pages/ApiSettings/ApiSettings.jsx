import React, { useState } from 'react';
import {
    Key,
    Plus,
    Copy,
    Eye,
    EyeOff,
    Webhook,
    Activity,
    Database,
    ShieldCheck,
    Trash2,
    RefreshCw,
    ExternalLink,
    Code
} from 'lucide-react';
import './ApiSettings.css';

const apiKeysData = [
    { id: 1, name: 'Main Production Key', key: 'vid_live_83k...j92n', created: '2023-12-01', lastUsed: '2m ago', status: 'Active' },
    { id: 2, name: 'Staging Environment', key: 'vid_test_12z...p01m', created: '2024-01-15', lastUsed: '5h ago', status: 'Active' },
    { id: 3, name: 'Legacy Mobile App', key: 'vid_live_09x...a84w', created: '2022-11-20', lastUsed: '23 days ago', status: 'Revoked' },
];

const ApiSettings = () => {
    const [showKey, setShowKey] = useState({});

    const toggleKeyVisibility = (id) => {
        setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="api-settings-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Developer & API Settings</h1>
                    <p className="page-subtitle">Manage service credentials, webhooks, and external integrations.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary"><Plus size={16} /> Generate New Key</button>
                </div>
            </div>

            <div className="api-grid">
                <div className="api-main-content">
                    <section className="settings-panel">
                        <div className="panel-header">
                            <h3 className="panel-title"><Key size={18} /> API Keys</h3>
                            <p className="panel-desc">Keep these keys secret! They provide full access to the Vidmero management API.</p>
                        </div>
                        <div className="api-keys-list">
                            {apiKeysData.map((key) => (
                                <div key={key.id} className={`key-row ${key.status === 'Revoked' ? 'revoked' : ''}`}>
                                    <div className="key-info">
                                        <div className="key-name-group">
                                            <span className="key-name">{key.name}</span>
                                            <span className={`status-tag ${key.status.toLowerCase()}`}>{key.status}</span>
                                        </div>
                                        <div className="key-value-display">
                                            <code>{showKey[key.id] ? 'vid_live_83k928f01j92n' : key.key}</code>
                                            <div className="key-actions-mini">
                                                <button onClick={() => toggleKeyVisibility(key.id)} className="icon-btn-ghost">
                                                    {showKey[key.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                                <button className="icon-btn-ghost"><Copy size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="key-meta">
                                        <div className="meta-item">
                                            <span>Created</span>
                                            <strong>{key.created}</strong>
                                        </div>
                                        <div className="meta-item">
                                            <span>Last Used</span>
                                            <strong>{key.lastUsed}</strong>
                                        </div>
                                        <button className="icon-btn-sm danger"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="settings-panel">
                        <div className="panel-header">
                            <h3 className="panel-title"><Webhook size={18} /> Webhooks</h3>
                            <p className="panel-desc">Receive real-time notifications for platform events.</p>
                        </div>
                        <div className="webhook-config">
                            <div className="webhook-row">
                                <div className="webhook-info">
                                    <strong>https://api.thirdparty.com/webhooks/vidmero</strong>
                                    <span className="event-list">Events: video.upload, video.ready, user.report</span>
                                </div>
                                <div className="webhook-actions">
                                    <span className="status-pill success">Healthy</span>
                                    <button className="btn-outline sm">Edit</button>
                                </div>
                            </div>
                            <button className="btn-dashed w-full mt-4"><Plus size={16} /> Add Webhook Endpoint</button>
                        </div>
                    </section>
                </div>

                <aside className="api-sidebar">
                    <div className="usage-card">
                        <h3 className="card-title"><Activity size={18} /> API Usage (24h)</h3>
                        <div className="usage-stats">
                            <div className="stat-item">
                                <span className="label">Total Requests</span>
                                <span className="value">1.4M</span>
                                <span className="trend up">+5.2%</span>
                            </div>
                            <div className="stat-item">
                                <span className="label">Error Rate</span>
                                <span className="value">0.02%</span>
                                <span className="trend down">-0.01%</span>
                            </div>
                        </div>
                        <div className="mini-chart">
                            <svg viewBox="0 0 200 60" className="sparkline">
                                <path d="M0,50 Q10,45 20,55 T40,40 T60,45 T80,30 T100,35 T120,20 T140,25 T160,15 T180,20 T200,10" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>

                    <div className="limits-card">
                        <h3 className="card-title"><ShieldCheck size={18} /> Rate Limits</h3>
                        <div className="limit-row">
                            <label>Standard Keys</label>
                            <span>1,000 req/min</span>
                        </div>
                        <div className="limit-row">
                            <label>Enterprise Keys</label>
                            <span>Unlimited</span>
                        </div>
                        <button className="btn-outline w-full mt-4">Manage Tiers</button>
                    </div>

                    <div className="docs-card">
                        <div className="docs-icon">
                            <Code size={24} />
                        </div>
                        <h4>API Documentation</h4>
                        <p>Explore our comprehensive guides and SDKs.</p>
                        <button className="btn-secondary w-full"><ExternalLink size={16} /> Open Docs</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ApiSettings;
