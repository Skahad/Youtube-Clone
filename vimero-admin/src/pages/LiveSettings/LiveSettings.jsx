import React, { useState } from 'react';
import {
    ChevronRight, Info, Home, Settings, Radio, HardDrive,
    Save, AlertCircle, Eye, EyeOff, CheckCircle2, AlertTriangle,
    Cloud, Key, Globe, ShieldCheck
} from 'lucide-react';
import './LiveSettings.css';

const LiveSettings = () => {
    const [settings, setSettings] = useState({
        liveStreaming: true,
        liveStreamingStorage: false,
        agoraAppId: '',
        agoraAppCertificate: '',
        agoraCustomerId: '',
        agoraCustomerSecret: '',
        s3BucketName: '',
        s3AccessKey: '',
        s3SecretKey: '',
        s3Region: 'us-east-1',
        s3Endpoint: ''
    });

    const [showSecrets, setShowSecrets] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const regions = [
        { value: 'us-east-1', label: 'US East (N. Virginia)' },
        { value: 'us-east-2', label: 'US East (Ohio)' },
        { value: 'us-west-1', label: 'US West (N. California)' },
        { value: 'us-west-2', label: 'US West (Oregon)' },
        { value: 'eu-west-1', label: 'EU (Ireland)' },
        { value: 'eu-central-1', label: 'EU (Frankfurt)' },
        { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
        { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
        { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' }
    ];

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        showToast(`Settings updated successfully.`);
    };

    const handleInputChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const toggleSecret = (key) => {
        setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            showToast('All configurations saved successfully.');
        }, 800);
    };

    return (
        <div className="config-container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">Live Settings</span>
            </nav>

            <h1 className="page-title">Live Settings</h1>

            {/* Top Info Alert */}
            <div className="alert-box alert-blue full-width">
                <Info size={18} />
                <p>For more information on how to setup live streaming service, please visit our <a href="#" className="alert-link">Documentation</a> page.</p>
            </div>

            <div className="config-grid">
                {/* Left Card: Live Streaming Settings */}
                <div className="config-card">
                    <div className="card-header">
                        <h3>Live Streaming Settings</h3>
                    </div>
                    <div className="card-body">
                        {/* Live Streaming Master Toggle */}
                        <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-title">
                                    Live Streaming
                                    <span className="icon-badge orange"><Settings size={12} /></span>
                                </div>
                                <div className="setting-description">Users can go live instantly.</div>
                            </div>
                            <button
                                className={`setting-toggle ${settings.liveStreaming ? 'on' : 'off'}`}
                                onClick={() => handleToggle('liveStreaming')}
                            >
                                <div className="toggle-handle" />
                                <span className="toggle-label">{settings.liveStreaming ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>

                        {/* Live Streaming Storage Toggle */}
                        <div className={`setting-row ${!settings.liveStreaming ? 'disabled' : ''}`}>
                            <div className="setting-info">
                                <div className="setting-title">
                                    Live Streaming Storage
                                    <span className="icon-badge orange"><Settings size={12} /></span>
                                </div>
                                <div className="setting-description">Allow the live stream system to save streams in Amazon.</div>
                            </div>
                            <button
                                className={`setting-toggle ${settings.liveStreamingStorage ? 'on' : 'off'}`}
                                onClick={() => settings.liveStreaming && handleToggle('liveStreamingStorage')}
                                disabled={!settings.liveStreaming}
                                title={!settings.liveStreaming ? "Enable Live Streaming first" : ""}
                            >
                                <div className="toggle-handle" />
                                <span className="toggle-label">{settings.liveStreamingStorage ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Card: Agora & S3 Configuration */}
                <div className="config-card">
                    <div className="card-header">
                        <h3>Agora API Configuration</h3>
                    </div>
                    <div className="card-body">
                        <div className={`config-section ${!settings.liveStreaming ? 'disabled' : ''}`}>
                            <div className="alert-box alert-blue-inline">
                                <ShieldCheck size={18} />
                                <p>To start using this feature, you'll need to create an account in Agora.</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">App ID</label>
                                <input
                                    type="text" className="form-input"
                                    placeholder="Agora App ID"
                                    value={settings.agoraAppId}
                                    onChange={(e) => handleInputChange('agoraAppId', e.target.value)}
                                    disabled={!settings.liveStreaming}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">App Certificate</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.agoraAppCertificate}
                                    onChange={(e) => handleInputChange('agoraAppCertificate', e.target.value)}
                                    disabled={!settings.liveStreaming}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Customer ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.agoraCustomerId}
                                    onChange={(e) => handleInputChange('agoraCustomerId', e.target.value)}
                                    disabled={!settings.liveStreaming}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Customer Secret</label>
                                <div className="security-notice red">
                                    <AlertCircle size={14} />
                                    <span>The secret key is not showing due security reasons, you can still overwrite the current one.</span>
                                </div>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.agoraSecret ? "text" : "password"}
                                        className="form-input"
                                        placeholder="••••••••••••"
                                        value={settings.agoraCustomerSecret}
                                        onChange={(e) => handleInputChange('agoraCustomerSecret', e.target.value)}
                                        disabled={!settings.liveStreaming}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('agoraSecret')} disabled={!settings.liveStreaming}>
                                        {showSecrets.agoraSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Amazon S3 Section */}
                        <div className={`config-section mt-40 ${(!settings.liveStreaming || !settings.liveStreamingStorage) ? 'disabled-opacity' : ''}`}>
                            <div className="divider-label">
                                <Cloud size={16} />
                                <span>Amazon S3 Live Streaming Storage</span>
                            </div>
                            <p className="form-help-alt">Used to store video streams if ‘Live Streaming Storage’ is enabled.</p>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Bucket Name</label>
                                    <input
                                        type="text" className="form-input"
                                        value={settings.s3BucketName}
                                        onChange={(e) => handleInputChange('s3BucketName', e.target.value)}
                                        disabled={!settings.liveStreamingStorage}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Amazon S3 Key</label>
                                    <input
                                        type="text" className="form-input"
                                        value={settings.s3AccessKey}
                                        onChange={(e) => handleInputChange('s3AccessKey', e.target.value)}
                                        disabled={!settings.liveStreamingStorage}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Amazon S3 Secret Key</label>
                                    <div className="password-wrapper">
                                        <input
                                            type={showSecrets.s3Secret ? "text" : "password"}
                                            className="form-input"
                                            placeholder="••••••••••••"
                                            value={settings.s3SecretKey}
                                            onChange={(e) => handleInputChange('s3SecretKey', e.target.value)}
                                            disabled={!settings.liveStreamingStorage}
                                        />
                                        <button className="toggle-password" onClick={() => toggleSecret('s3Secret')} disabled={!settings.liveStreamingStorage}>
                                            {showSecrets.s3Secret ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Amazon S3 Region</label>
                                    <select
                                        className="form-select"
                                        value={settings.s3Region}
                                        onChange={(e) => handleInputChange('s3Region', e.target.value)}
                                        disabled={!settings.liveStreamingStorage}
                                    >
                                        {regions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Amazon S3 Custom Endpoint (Optional)</label>
                                    <input
                                        type="text" className="form-input"
                                        placeholder="e.g. https://s3.wasabisys.com"
                                        value={settings.s3Endpoint}
                                        onChange={(e) => handleInputChange('s3Endpoint', e.target.value)}
                                        disabled={!settings.liveStreamingStorage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Save Bar */}
            <div className="sticky-save-bar">
                <button className={`btn-save ${isSaving ? 'loading' : ''}`} onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <span className="spinner" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default LiveSettings;
