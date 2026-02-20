import React, { useState } from 'react';
import {
    ChevronRight, HelpCircle, AlertCircle
} from 'lucide-react';
import './WebsiteInfo.css';

const WebsiteInfo = () => {
    // Section 1: Website Information State
    const [websiteInfo, setWebsiteInfo] = useState({
        siteTitle: 'Vidmero - The Ultimate Video Sharing Platform',
        siteName: 'Vidmero',
        siteKeywords: 'vidmero,sharevideo,share,upload,videos',
        siteDescription: 'Vidmero is a PHP Video Sharing Script, Vidmero is the best way to start your own video sharing script!'
    });

    // Section 2: Features API Keys State
    const [apiKeys, setApiKeys] = useState({
        googleAnalytics: '',
        googleVignette: '',
        extremeIpKey: ''
    });

    // Section 3: Point System Settings State
    const [pointSettings, setPointSettings] = useState({
        pointSystem: true,
        allowWithdrawal: false,
        dollarToPoint: 100,
        commentingPoints: 10,
        likingPoints: 5,
        dislikingPoints: 2,
        watchingPoints: 2,
        uploadingPoints: 20,
        freeDailyLimit: 1000,
        proDailyLimit: 2000,
        adMobPoints: 10
    });

    const handleToggle = (key) => {
        setPointSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleValueChange = (section, key, value) => {
        if (section === 'info') {
            setWebsiteInfo(prev => ({ ...prev, [key]: value }));
        } else if (section === 'api') {
            setApiKeys(prev => ({ ...prev, [key]: value }));
        } else if (section === 'points') {
            setPointSettings(prev => ({ ...prev, [key]: value }));
        }
    };

    const Toggle = ({ enabled, onToggle }) => (
        <button
            className={`setting-toggle ${enabled ? 'on' : 'off'}`}
            onClick={onToggle}
        >
            <div className="toggle-handle" />
            <span className="toggle-label">{enabled ? 'ON' : 'OFF'}</span>
        </button>
    );

    const SettingRow = ({ title, description, children, hasTooltip, stacked }) => (
        <div className={`setting-row ${stacked ? 'stacked' : ''}`}>
            <div className="setting-info">
                <div className="setting-title">
                    {title}
                    {hasTooltip && <HelpCircle size={14} className="info-icon" />}
                </div>
                <div className="setting-description">{description}</div>
            </div>
            <div className="setting-control">
                {children}
            </div>
        </div>
    );

    return (
        <div className="config-container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">Website Information</span>
            </nav>

            <h1 className="page-title">Website Information</h1>

            <div className="config-grid">
                {/* Left Column: Website Information */}
                <div className="grid-column">
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Website Information</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow
                                title="Site Title"
                                description="Appears on Google and browser tab"
                                stacked
                            >
                                <input
                                    type="text"
                                    className="setting-input"
                                    value={websiteInfo.siteTitle}
                                    onChange={(e) => handleValueChange('info', 'siteTitle', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Site Name"
                                description="Appears in footer and emails"
                                stacked
                            >
                                <input
                                    type="text"
                                    className="setting-input"
                                    value={websiteInfo.siteName}
                                    onChange={(e) => handleValueChange('info', 'siteName', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Site Keywords"
                                description="Used for SEO"
                                stacked
                            >
                                <input
                                    type="text"
                                    className="setting-input"
                                    value={websiteInfo.siteKeywords}
                                    onChange={(e) => handleValueChange('info', 'siteKeywords', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Site Description"
                                description="SEO description, max 100 characters recommended"
                                stacked
                            >
                                <textarea
                                    className="setting-input setting-textarea"
                                    rows={4}
                                    value={websiteInfo.siteDescription}
                                    onChange={(e) => handleValueChange('info', 'siteDescription', e.target.value)}
                                />
                            </SettingRow>
                        </div>
                    </div>
                </div>

                {/* Right Column: API Keys & Point System */}
                <div className="grid-column">
                    {/* Section 2: Features API Keys & Information */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Features API Keys & Information</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow
                                title="Google Analytics Code / Custom HTML Code"
                                description="Paste your HTML code here"
                                stacked
                            >
                                <textarea
                                    className="setting-input setting-textarea"
                                    rows={3}
                                    placeholder="Paste code here..."
                                    value={apiKeys.googleAnalytics}
                                    onChange={(e) => handleValueChange('api', 'googleAnalytics', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Google vignette code"
                                description="Paste your Google vignette code here"
                                stacked
                            >
                                <textarea
                                    className="setting-input setting-textarea"
                                    rows={3}
                                    placeholder="Paste code here..."
                                    value={apiKeys.googleVignette}
                                    onChange={(e) => handleValueChange('api', 'googleVignette', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Extreme IP Lookup Key"
                                description="Used for geo blocking and user continent detection"
                                stacked
                            >
                                <input
                                    type="text"
                                    className="setting-input"
                                    placeholder="Enter API Key"
                                    value={apiKeys.extremeIpKey}
                                    onChange={(e) => handleValueChange('api', 'extremeIpKey', e.target.value)}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 3: Point System Settings */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Point System Settings</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow
                                title="Point System"
                                description="Gives the ability for users to earn points from liking, sharing, commenting and posting."
                            >
                                <Toggle
                                    enabled={pointSettings.pointSystem}
                                    onToggle={() => handleToggle('pointSystem')}
                                />
                            </SettingRow>

                            <SettingRow
                                title="Allow user to withdrawal earned points as currency?"
                                description="Allow users to transfer earned points into money and withdrawal."
                            >
                                <Toggle
                                    enabled={pointSettings.allowWithdrawal}
                                    onToggle={() => handleToggle('allowWithdrawal')}
                                />
                            </SettingRow>

                            <SettingRow
                                title="$1.00 = ? Point"
                                description="How much does 1 dollar equal in points?"
                                stacked
                            >
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.dollarToPoint}
                                    onChange={(e) => handleValueChange('points', 'dollarToPoint', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Commenting on Videos" description="Points for commenting" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.commentingPoints}
                                    onChange={(e) => handleValueChange('points', 'commentingPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Liking Videos" description="Points for liking" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.likingPoints}
                                    onChange={(e) => handleValueChange('points', 'likingPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Disliking Videos" description="Points for disliking" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.dislikingPoints}
                                    onChange={(e) => handleValueChange('points', 'dislikingPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Watching Videos" description="Points for watching" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.watchingPoints}
                                    onChange={(e) => handleValueChange('points', 'watchingPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Uploading Videos" description="Points for uploading" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.uploadingPoints}
                                    onChange={(e) => handleValueChange('points', 'uploadingPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Free Users Daily Limit" description="Points limit for free users" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.freeDailyLimit}
                                    onChange={(e) => handleValueChange('points', 'freeDailyLimit', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Pro Members Daily Limit" description="Points limit for pro users" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.proDailyLimit}
                                    onChange={(e) => handleValueChange('points', 'proDailyLimit', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>

                            <SettingRow title="AdMob" description="Points for AdMob interaction" stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={pointSettings.adMobPoints}
                                    onChange={(e) => handleValueChange('points', 'adMobPoints', e.target.value)}
                                    disabled={!pointSettings.pointSystem}
                                />
                            </SettingRow>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteInfo;
