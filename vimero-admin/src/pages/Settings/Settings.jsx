import React, { useState } from 'react';
import {
    Palette,
    Globe,
    Upload,
    ShieldCheck,
    Bell,
    Save,
    Check,
    Smartphone,
    Layout,
    Lock,
    Eye,
    Settings as SettingsIcon
} from 'lucide-react';
import './Settings.css';

const SettingsPage = () => {
    const [activeSegment, setActiveSegment] = useState('branding');

    return (
        <div className="settings-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Platform Settings</h1>
                    <p className="page-subtitle">Configure branding, global features, and system rules.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary"><Save size={16} /> Save Changes</button>
                </div>
            </div>

            <div className="settings-container">
                <aside className="settings-sidebar">
                    <button
                        className={`settings-nav-item ${activeSegment === 'branding' ? 'active' : ''}`}
                        onClick={() => setActiveSegment('branding')}
                    >
                        <Palette size={18} /> Branding & Appearance
                    </button>
                    <button
                        className={`settings-nav-item ${activeSegment === 'features' ? 'active' : ''}`}
                        onClick={() => setActiveSegment('features')}
                    >
                        <Layout size={18} /> Feature Toggles
                    </button>
                    <button
                        className={`settings-nav-item ${activeSegment === 'limits' ? 'active' : ''}`}
                        onClick={() => setActiveSegment('limits')}
                    >
                        <Upload size={18} /> Upload Limits
                    </button>
                    <button
                        className={`settings-nav-item ${activeSegment === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveSegment('security')}
                    >
                        <Lock size={18} /> Security & Access
                    </button>
                </aside>

                <div className="settings-content">
                    {activeSegment === 'branding' && (
                        <div className="settings-section">
                            <h2 className="section-title">Branding & Identity</h2>

                            <div className="setting-field">
                                <div className="field-info">
                                    <label>Platform Logo</label>
                                    <p>Recommended size: 200x50px (SVG or PNG)</p>
                                </div>
                                <div className="logo-upload">
                                    <div className="current-logo-preview">Vidmero</div>
                                    <button className="btn-outline sm">Change Logo</button>
                                </div>
                            </div>

                            <div className="setting-field">
                                <div className="field-info">
                                    <label>Accent Color</label>
                                    <p>Primary color for buttons, active states, and highlights.</p>
                                </div>
                                <div className="color-picker-custom">
                                    <div className="color-preview" style={{ backgroundColor: '#0493D1' }}>
                                        <Check size={16} color="white" />
                                    </div>
                                    <span className="color-hex">#0493D1</span>
                                </div>
                            </div>

                            <div className="setting-field">
                                <div className="field-info">
                                    <label>Default Mode</label>
                                    <p>Vidmero is currently optimized for Light Mode only.</p>
                                </div>
                                <div className="toggle-group disabled">
                                    <button className="toggle-btn active">Light</button>
                                    <button className="toggle-btn" disabled>Dark (Coming Soon)</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSegment === 'features' && (
                        <div className="settings-section">
                            <h2 className="section-title">Feature Management</h2>

                            {[
                                { name: 'Shorts Content', desc: 'Allow users to upload and view vertical shorts.', enabled: true },
                                { name: 'Video Downloads', desc: 'Enable offline viewing for registered users.', enabled: false },
                                { name: 'Live Streaming', desc: 'Allow verified creators to go live.', enabled: true },
                                { name: 'Community Posts', desc: 'Enable text and image posts for creators.', enabled: true },
                            ].map((feat, i) => (
                                <div key={i} className="setting-toggle-row">
                                    <div className="field-info">
                                        <label>{feat.name}</label>
                                        <p>{feat.desc}</p>
                                    </div>
                                    <div className={`switch ${feat.enabled ? 'on' : 'off'}`}>
                                        <div className="handle" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSegment === 'limits' && (
                        <div className="settings-section">
                            <h2 className="section-title">Upload & Storage Rules</h2>

                            <div className="setting-field-v">
                                <label>Maximum Video File Size</label>
                                <div className="input-group">
                                    <input type="number" defaultValue="4" />
                                    <span className="unit">GB</span>
                                </div>
                                <p className="field-help">Limits the size of a single source file upload.</p>
                            </div>

                            <div className="setting-field-v">
                                <label>Maximum Daily Uploads (Standard)</label>
                                <div className="input-group">
                                    <input type="number" defaultValue="10" />
                                    <span className="unit">Videos</span>
                                </div>
                            </div>

                            <div className="setting-field-v">
                                <label>Storage Quota Alert</label>
                                <div className="input-group">
                                    <input type="number" defaultValue="85" />
                                    <span className="unit">%</span>
                                </div>
                                <p className="field-help">Notify admins when storage usage reaches this threshold.</p>
                            </div>
                        </div>
                    )}

                    {activeSegment === 'security' && (
                        <div className="settings-section">
                            <h2 className="section-title">Security Settings</h2>
                            <div className="info-alert">
                                <ShieldCheck size={20} />
                                <p>Security configurations are shared across all admin accounts.</p>
                            </div>

                            <div className="setting-field">
                                <div className="field-info">
                                    <label>Two-Factor Authentication</label>
                                    <p>Require 2FA for all Moderator and Admin roles.</p>
                                </div>
                                <div className="switch on"><div className="handle" /></div>
                            </div>

                            <div className="setting-field">
                                <div className="field-info">
                                    <label>Session Timeout</label>
                                    <p>Automatically logout inactive admin sessions.</p>
                                </div>
                                <select className="select-input">
                                    <option>30 Minutes</option>
                                    <option>1 Hour</option>
                                    <option>4 Hours</option>
                                    <option>Never</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
