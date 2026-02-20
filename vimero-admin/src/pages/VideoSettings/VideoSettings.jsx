import React, { useState } from 'react';
import {
    ChevronRight, HelpCircle, Info
} from 'lucide-react';
import './VideoSettings.css';

const VideoSettings = () => {
    const [settings, setSettings] = useState({
        // Section 1: Videos Settings
        autoplaySystem: true,
        addTrailer: true,
        embedRestriction: true,
        videoCardSystem: true,
        stockVideos: false,
        downloadVideos: true,
        videoApproval: false,
        moviesSystem: true,
        requireLogin: false,
        geoBlocking: true,
        shortsSystem: true,
        shortsDuration: 1800,
        hashtagSystem: true,

        // Section 2: Player Settings
        defaultPlayer: 'Default (This player support Video Ads, Image Ads)',
        youtubePlayer: false,
        stickyPlayer: false,
        resizePlayer: true,
        embedPlayer: true,
        playerWatermark: 'https://demo.playtubescript.com/themes/default/img/icon.png',

        // Section 3: Paid Videos Settings
        paidVideosSystem: true,
        sellingRestriction: 'All Users',
        autoApproveSelling: true,
        createDemoVideo: true,
        commissionType: 'Fixed Price From Each Video',
        commission: 1,
        rentVideosSystem: false,
        rentingCommission: 0
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleValueChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const Toggle = ({ enabled, onToggle, disabled }) => (
        <button
            className={`setting-toggle ${enabled ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
            onClick={disabled ? null : onToggle}
            disabled={disabled}
        >
            <div className="toggle-handle" />
            <span className="toggle-label">{enabled ? 'ON' : 'OFF'}</span>
        </button>
    );

    const SettingRow = ({ title, description, children, hasTooltip, stacked, disabled }) => (
        <div className={`setting-row ${stacked ? 'stacked' : ''} ${disabled ? 'row-disabled' : ''}`}>
            <div className="setting-info">
                <div className="setting-title">
                    {title}
                    {hasTooltip && <HelpCircle size={14} className="info-icon" />}
                </div>
                {description && <div className="setting-description">{description}</div>}
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
                <span className="active">Video Settings</span>
            </nav>

            <h1 className="page-title">Video Settings</h1>

            <div className="config-grid">
                {/* Left Column: Videos Settings */}
                <div className="grid-column">
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Videos Settings</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Autoplay System" description="Autoplay the next video in list.">
                                <Toggle enabled={settings.autoplaySystem} onToggle={() => handleToggle('autoplaySystem')} />
                            </SettingRow>

                            <SettingRow title="Add Trailer With Movie">
                                <Toggle enabled={settings.addTrailer} onToggle={() => handleToggle('addTrailer')} />
                            </SettingRow>

                            <SettingRow title="Embed Restriction" description="Allow users to restrict specific videos from embedding.">
                                <Toggle enabled={settings.embedRestriction} onToggle={() => handleToggle('embedRestriction')} />
                            </SettingRow>

                            <SettingRow title="Video Card System" description="Allow users to create cards in videos.">
                                <Toggle enabled={settings.videoCardSystem} onToggle={() => handleToggle('videoCardSystem')} />
                            </SettingRow>

                            <SettingRow title="Stock Videos" description="Note: FFMPEG should be enabled first to use this feature.">
                                <Toggle enabled={settings.stockVideos} onToggle={() => handleToggle('stockVideos')} />
                            </SettingRow>

                            <SettingRow title="Download Videos" description="Allow users to download videos from your site.">
                                <Toggle enabled={settings.downloadVideos} onToggle={() => handleToggle('downloadVideos')} />
                            </SettingRow>

                            <SettingRow title="Video Approval System" description="Admins must approve videos before publishing.">
                                <Toggle enabled={settings.videoApproval} onToggle={() => handleToggle('videoApproval')} />
                            </SettingRow>

                            <SettingRow title="Movies System" description="Allow admins to upload movies.">
                                <Toggle enabled={settings.moviesSystem} onToggle={() => handleToggle('moviesSystem')} />
                            </SettingRow>

                            <SettingRow title="Require Login To Watch Videos">
                                <Toggle enabled={settings.requireLogin} onToggle={() => handleToggle('requireLogin')} />
                            </SettingRow>

                            <SettingRow title="Geo-Blocking" description="Allow users to block videos by geography.">
                                <Toggle enabled={settings.geoBlocking} onToggle={() => handleToggle('geoBlocking')} />
                            </SettingRow>

                            <SettingRow title="Shorts System">
                                <Toggle enabled={settings.shortsSystem} onToggle={() => handleToggle('shortsSystem')} />
                            </SettingRow>

                            <SettingRow title="Shorts Duration" description="Set shorts duration in seconds." stacked disabled={!settings.shortsSystem}>
                                <input
                                    type="number" className="setting-input"
                                    value={settings.shortsDuration}
                                    onChange={(e) => handleValueChange('shortsDuration', e.target.value)}
                                    disabled={!settings.shortsSystem}
                                />
                            </SettingRow>

                            <SettingRow title="Hashtag System">
                                <Toggle enabled={settings.hashtagSystem} onToggle={() => handleToggle('hashtagSystem')} />
                            </SettingRow>
                        </div>
                    </div>
                </div>

                {/* Right Column: Player & Paid Videos */}
                <div className="grid-column">
                    {/* Section 2: Player Settings */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Player Settings</h3>
                        </div>
                        <div className="card-body">
                            <div className="alert-box alert-yellow">
                                <Info size={18} />
                                <p>Note: For YouTube videos, the default player will always be used. The options below work for self-hosted videos.</p>
                            </div>

                            <SettingRow title="Default Video Player" stacked>
                                <select
                                    className="setting-select"
                                    value={settings.defaultPlayer}
                                    onChange={(e) => handleValueChange('defaultPlayer', e.target.value)}
                                >
                                    <option>Default (This player support Video Ads, Image Ads)</option>
                                    <option>VideoJS</option>
                                    <option>Plyr</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="YouTube Player" description="Use YouTube player for YouTube videos.">
                                <Toggle enabled={settings.youtubePlayer} onToggle={() => handleToggle('youtubePlayer')} />
                            </SettingRow>

                            <SettingRow title="Sticky Video Player" description="Player sticks on scroll.">
                                <Toggle enabled={settings.stickyPlayer} onToggle={() => handleToggle('stickyPlayer')} />
                            </SettingRow>

                            <SettingRow title="Resize Video Player" description="Allow cinema mode.">
                                <Toggle enabled={settings.resizePlayer} onToggle={() => handleToggle('resizePlayer')} />
                            </SettingRow>

                            <SettingRow title="Embed Video Player" description="Allow users to embed videos.">
                                <Toggle enabled={settings.embedPlayer} onToggle={() => handleToggle('embedPlayer')} />
                            </SettingRow>

                            <SettingRow title="Video Player Watermark" description="jpg, png, jpeg allowed" stacked>
                                <input
                                    type="text" className="setting-input"
                                    value={settings.playerWatermark}
                                    onChange={(e) => handleValueChange('playerWatermark', e.target.value)}
                                    placeholder="https://..."
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 3: Paid Videos Settings */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Paid Videos Settings</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Paid Videos System" description="Users can sell their own videos.">
                                <Toggle enabled={settings.paidVideosSystem} onToggle={() => handleToggle('paidVideosSystem')} />
                            </SettingRow>

                            <div className={!settings.paidVideosSystem ? 'section-disabled' : ''}>
                                <SettingRow title="Video Selling Restriction" stacked disabled={!settings.paidVideosSystem}>
                                    <select
                                        className="setting-select"
                                        value={settings.sellingRestriction}
                                        onChange={(e) => handleValueChange('sellingRestriction', e.target.value)}
                                        disabled={!settings.paidVideosSystem}
                                    >
                                        <option>All Users</option>
                                        <option>Pro Users Only</option>
                                        <option>Verified Users Only</option>
                                    </select>
                                </SettingRow>

                                <SettingRow title="Auto Approve Selling Videos?" disabled={!settings.paidVideosSystem}>
                                    <Toggle
                                        enabled={settings.autoApproveSelling}
                                        onToggle={() => handleToggle('autoApproveSelling')}
                                        disabled={!settings.paidVideosSystem}
                                    />
                                </SettingRow>

                                <SettingRow title="Create Demo Video" description="Requires FFMPEG." disabled={!settings.paidVideosSystem}>
                                    <Toggle
                                        enabled={settings.createDemoVideo}
                                        onToggle={() => handleToggle('createDemoVideo')}
                                        disabled={!settings.paidVideosSystem}
                                    />
                                </SettingRow>

                                <div className="divider" />
                                <h4 className="sub-section-title">Commission Settings</h4>

                                <SettingRow title="Commission Type" stacked disabled={!settings.paidVideosSystem}>
                                    <select
                                        className="setting-select"
                                        value={settings.commissionType}
                                        onChange={(e) => handleValueChange('commissionType', e.target.value)}
                                        disabled={!settings.paidVideosSystem}
                                    >
                                        <option>Fixed Price From Each Video</option>
                                        <option>Percentage From Each Video</option>
                                    </select>
                                </SettingRow>

                                <SettingRow title="Commission" description="Percentage or fixed cut (set 0 for no commission)" stacked disabled={!settings.paidVideosSystem}>
                                    <input
                                        type="number" className="setting-input"
                                        value={settings.commission}
                                        onChange={(e) => handleValueChange('commission', e.target.value)}
                                        disabled={!settings.paidVideosSystem}
                                    />
                                </SettingRow>

                                <div className="divider" />
                                <h4 className="sub-section-title">Rent Videos</h4>

                                <SettingRow title="Rent Videos System" disabled={!settings.paidVideosSystem}>
                                    <Toggle
                                        enabled={settings.rentVideosSystem}
                                        onToggle={() => handleToggle('rentVideosSystem')}
                                        disabled={!settings.paidVideosSystem}
                                    />
                                </SettingRow>

                                <SettingRow title="Renting Commission" stacked disabled={!settings.paidVideosSystem || !settings.rentVideosSystem}>
                                    <input
                                        type="number" className="setting-input"
                                        value={settings.rentingCommission}
                                        onChange={(e) => handleValueChange('rentingCommission', e.target.value)}
                                        disabled={!settings.paidVideosSystem || !settings.rentVideosSystem}
                                    />
                                </SettingRow>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky-save-bar">
                <button className="btn-primary">Save Configuration</button>
            </div>
        </div>
    );
};

export default VideoSettings;
