import React, { useState } from 'react';
import {
    ChevronRight, HelpCircle
} from 'lucide-react';
import './ImportUploadConfig.css';

const ImportUploadConfig = () => {
    // Large State for all 11 Sections
    const [settings, setSettings] = useState({
        // Section 1: Upload & Sharing
        uploadSharing: true,
        autoApprove: true,
        userCanUpload: true,
        uploadLimitMB: 500,
        durationLimitMin: 60,
        uploadShorts: true,
        userCanImport: true,
        uploadAudio: true,
        uploadImages: true,
        uploadGifs: true,

        // Section 2: Import Configuration
        importYoutube: true,
        importVimeo: true,
        importDailymotion: true,
        importFacebook: true,
        importTikTok: true,
        importTwitter: true,

        // Section 3: Encoding
        enableEncoding: true,
        encodeAfterUpload: true,
        encodeImported: true,
        encodingPriority: 'Medium',
        maxEncodingJobs: 3,

        // Section 4: FFMPEG
        ffmpegPath: '/usr/bin/ffmpeg',
        ffmpegVersion: '4.4.2-0ubuntu0.22.04.1',
        ffmpegStatus: 'Enabled',

        // Section 5: Storage Type
        storageType: 'Local Storage',

        // Section 6: Amazon S3
        s3Enabled: false,
        s3Bucket: '',
        s3AccessKey: '',
        s3SecretKey: '',
        s3Region: 'us-east-1',
        s3Endpoint: '',

        // Section 7: FTP
        ftpEnabled: false,
        ftpHost: '',
        ftpUsername: '',
        ftpPassword: '',
        ftpPort: 21,
        ftpPath: '/',

        // Section 8: Upload Servers
        uploadServersEnabled: true,
        serverUrl: 'https://server1.vidmero.com',
        serverStatus: true,
        serverPriority: 1,

        // Section 9: Wasabi
        wasabiEnabled: false,
        wasabiBucket: '',
        wasabiAccessKey: '',
        wasabiSecretKey: '',
        wasabiRegion: 'us-east-1',

        // Section 10: Google Cloud
        gcsEnabled: false,
        gcsBucket: '',
        gcsProjectId: '',
        gcsJson: '',

        // Section 11: DigitalOcean Spaces
        doEnabled: false,
        doSpaceName: '',
        doRegion: 'nyc3',
        doAccessKey: '',
        doSecretKey: '',
        doEndpoint: ''
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleValueChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const runTest = (service) => {
        alert(`Success! Connection to ${service} established.`);
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
                <span className="active">Import & Upload Configuration</span>
            </nav>

            <h1 className="page-title">Import & Upload Configuration</h1>

            <div className="config-grid">
                {/* Left Column */}
                <div className="grid-column">

                    {/* Section 1: Upload & Sharing Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Upload & Sharing Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Upload & Sharing" description="Global toggle for all upload features.">
                                <Toggle enabled={settings.uploadSharing} onToggle={() => handleToggle('uploadSharing')} />
                            </SettingRow>

                            <SettingRow title="Auto Approve Videos" description="Approve videos automatically after upload.">
                                <Toggle enabled={settings.autoApprove} onToggle={() => handleToggle('autoApprove')} />
                            </SettingRow>

                            <SettingRow title="User can upload videos" description="Allow regular users to upload content.">
                                <Toggle enabled={settings.userCanUpload} onToggle={() => handleToggle('userCanUpload')} />
                            </SettingRow>

                            <SettingRow title="Video upload size limit (MB)" description="Maximum file size for video uploads." stacked>
                                <input
                                    type="number" className="setting-input"
                                    value={settings.uploadLimitMB}
                                    onChange={(e) => handleValueChange('uploadLimitMB', e.target.value)}
                                    disabled={!settings.uploadSharing}
                                />
                            </SettingRow>

                            <SettingRow title="Video duration limit (minutes)" description="Maximum duration for uploaded videos." stacked>
                                <input
                                    type="number" className="setting-input"
                                    value={settings.durationLimitMin}
                                    onChange={(e) => handleValueChange('durationLimitMin', e.target.value)}
                                    disabled={!settings.uploadSharing}
                                />
                            </SettingRow>

                            <SettingRow title="Allow users to upload short videos">
                                <Toggle enabled={settings.uploadShorts} onToggle={() => handleToggle('uploadShorts')} />
                            </SettingRow>

                            <SettingRow title="Allow users to import videos">
                                <Toggle enabled={settings.userCanImport} onToggle={() => handleToggle('userCanImport')} />
                            </SettingRow>

                            <SettingRow title="Allow users to upload audio">
                                <Toggle enabled={settings.uploadAudio} onToggle={() => handleToggle('uploadAudio')} />
                            </SettingRow>

                            <SettingRow title="Allow users to upload images">
                                <Toggle enabled={settings.uploadImages} onToggle={() => handleToggle('uploadImages')} />
                            </SettingRow>

                            <SettingRow title="Allow users to upload GIFs">
                                <Toggle enabled={settings.uploadGifs} onToggle={() => handleToggle('uploadGifs')} />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 2: Import Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Import Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Import from YouTube" description="Enable video importing from YouTube.com">
                                <Toggle enabled={settings.importYoutube} onToggle={() => handleToggle('importYoutube')} />
                            </SettingRow>
                            <SettingRow title="Import from Vimeo" description="Enable video importing from Vimeo.com">
                                <Toggle enabled={settings.importVimeo} onToggle={() => handleToggle('importVimeo')} />
                            </SettingRow>
                            <SettingRow title="Import from Dailymotion" description="Enable importing from Dailymotion">
                                <Toggle enabled={settings.importDailymotion} onToggle={() => handleToggle('importDailymotion')} />
                            </SettingRow>
                            <SettingRow title="Import from Facebook" description="Enable importing from Facebook Videos">
                                <Toggle enabled={settings.importFacebook} onToggle={() => handleToggle('importFacebook')} />
                            </SettingRow>
                            <SettingRow title="Import from TikTok" description="Enable importing from TikTok.com">
                                <Toggle enabled={settings.importTikTok} onToggle={() => handleToggle('importTikTok')} />
                            </SettingRow>
                            <SettingRow title="Import from Twitter/X" description="Enable importing from X.com">
                                <Toggle enabled={settings.importTwitter} onToggle={() => handleToggle('importTwitter')} />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 3: Encoding Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Encoding Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable Encoding System" description="Convert videos to multiple resolutions.">
                                <Toggle enabled={settings.enableEncoding} onToggle={() => handleToggle('enableEncoding')} />
                            </SettingRow>

                            <SettingRow title="Encode videos after upload" disabled={!settings.enableEncoding}>
                                <Toggle
                                    enabled={settings.encodeAfterUpload}
                                    onToggle={() => handleToggle('encodeAfterUpload')}
                                    disabled={!settings.enableEncoding}
                                />
                            </SettingRow>

                            <SettingRow title="Encode imported videos" disabled={!settings.enableEncoding}>
                                <Toggle
                                    enabled={settings.encodeImported}
                                    onToggle={() => handleToggle('encodeImported')}
                                    disabled={!settings.enableEncoding}
                                />
                            </SettingRow>

                            <SettingRow title="Encoding priority" description="System resource allocation level." stacked disabled={!settings.enableEncoding}>
                                <select
                                    className="setting-select"
                                    value={settings.encodingPriority}
                                    onChange={(e) => handleValueChange('encodingPriority', e.target.value)}
                                    disabled={!settings.enableEncoding}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="Max encoding jobs" description="Concurrent encoding processes." stacked disabled={!settings.enableEncoding}>
                                <input
                                    type="number" className="setting-input"
                                    value={settings.maxEncodingJobs}
                                    onChange={(e) => handleValueChange('maxEncodingJobs', e.target.value)}
                                    disabled={!settings.enableEncoding}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 8: Upload Servers Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Upload Servers Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable Upload Servers">
                                <Toggle enabled={settings.uploadServersEnabled} onToggle={() => handleToggle('uploadServersEnabled')} />
                            </SettingRow>

                            <div className="btn-row" style={{ padding: '16px 0' }}>
                                <button className="btn-secondary">Add New Server</button>
                            </div>

                            <SettingRow title="Server URL" stacked>
                                <input
                                    type="text" className="setting-input"
                                    value={settings.serverUrl}
                                    onChange={(e) => handleValueChange('serverUrl', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow title="Server Status">
                                <Toggle enabled={settings.serverStatus} onToggle={() => handleToggle('serverStatus')} />
                            </SettingRow>

                            <SettingRow title="Server Priority" stacked>
                                <input
                                    type="number" className="setting-input"
                                    value={settings.serverPriority}
                                    onChange={(e) => handleValueChange('serverPriority', e.target.value)}
                                />
                            </SettingRow>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="grid-column">

                    {/* Section 4: FFMPEG Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>FFMPEG Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="FFMPEG Path" description="Absolute path to ffmpeg binary." stacked>
                                <input
                                    type="text" className="setting-input"
                                    value={settings.ffmpegPath}
                                    onChange={(e) => handleValueChange('ffmpegPath', e.target.value)}
                                />
                            </SettingRow>

                            <div className="static-row">
                                <div className="static-label">FFMPEG Version:</div>
                                <div className="static-value">{settings.ffmpegVersion}</div>
                            </div>

                            <div className="static-row">
                                <div className="static-label">FFMPEG Status:</div>
                                <div className="static-value">
                                    <span className="badge badge-success">Enabled</span>
                                </div>
                            </div>

                            <div className="btn-row" style={{ padding: '20px 0 10px 0' }}>
                                <button className="btn-primary" onClick={() => runTest('FFMPEG')}>Test FFMPEG</button>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Storage & CDN Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Storage & CDN Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Storage Type" description="Select where to store uploaded media." stacked>
                                <select
                                    className="setting-select"
                                    value={settings.storageType}
                                    onChange={(e) => handleValueChange('storageType', e.target.value)}
                                >
                                    <option value="Local Storage">Local Storage</option>
                                    <option value="Amazon S3">Amazon S3</option>
                                    <option value="Wasabi">Wasabi</option>
                                    <option value="Backblaze">Backblaze</option>
                                    <option value="Google Cloud Storage">Google Cloud Storage</option>
                                    <option value="DigitalOcean Spaces">DigitalOcean Spaces</option>
                                </select>
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 6: Amazon S3 Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Amazon S3 Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable Amazon S3">
                                <Toggle enabled={settings.s3Enabled} onToggle={() => handleToggle('s3Enabled')} />
                            </SettingRow>

                            <div className={!settings.s3Enabled ? 'section-disabled' : ''}>
                                <SettingRow title="Bucket Name" stacked>
                                    <input
                                        type="text" className="setting-input"
                                        value={settings.s3Bucket}
                                        onChange={(e) => handleValueChange('s3Bucket', e.target.value)}
                                        disabled={!settings.s3Enabled}
                                    />
                                </SettingRow>
                                <SettingRow title="Access Key" stacked>
                                    <input
                                        type="password" placeholder="••••••••••••" className="setting-input"
                                        value={settings.s3AccessKey}
                                        onChange={(e) => handleValueChange('s3AccessKey', e.target.value)}
                                        disabled={!settings.s3Enabled}
                                    />
                                </SettingRow>
                                <SettingRow title="Secret Key" stacked>
                                    <input
                                        type="password" placeholder="••••••••••••" className="setting-input"
                                        value={settings.s3SecretKey}
                                        onChange={(e) => handleValueChange('s3SecretKey', e.target.value)}
                                        disabled={!settings.s3Enabled}
                                    />
                                </SettingRow>
                                <SettingRow title="Region" stacked>
                                    <select
                                        className="setting-select"
                                        value={settings.s3Region}
                                        onChange={(e) => handleValueChange('s3Region', e.target.value)}
                                        disabled={!settings.s3Enabled}
                                    >
                                        <option value="us-east-1">us-east-1</option>
                                        <option value="us-west-1">us-west-1</option>
                                        <option value="eu-central-1">eu-central-1</option>
                                    </select>
                                </SettingRow>
                                <SettingRow title="Endpoint" stacked>
                                    <input
                                        type="text" className="setting-input" placeholder="https://s3.amazonaws.com"
                                        value={settings.s3Endpoint}
                                        onChange={(e) => handleValueChange('s3Endpoint', e.target.value)}
                                        disabled={!settings.s3Enabled}
                                    />
                                </SettingRow>
                                <div className="btn-group" style={{ padding: '16px 0', display: 'flex', gap: '8px' }}>
                                    <button className="btn-secondary" onClick={() => runTest('Amazon S3')} disabled={!settings.s3Enabled}>Test Connection</button>
                                    <button className="btn-primary" disabled={!settings.s3Enabled}>Save Configuration</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 7: FTP Settings */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>FTP Settings</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable FTP">
                                <Toggle enabled={settings.ftpEnabled} onToggle={() => handleToggle('ftpEnabled')} />
                            </SettingRow>
                            <div className={!settings.ftpEnabled ? 'section-disabled' : ''}>
                                <SettingRow title="FTP Host" stacked>
                                    <input
                                        type="text" className="setting-input"
                                        value={settings.ftpHost}
                                        onChange={(e) => handleValueChange('ftpHost', e.target.value)}
                                        disabled={!settings.ftpEnabled}
                                    />
                                </SettingRow>
                                <SettingRow title="FTP Username" stacked>
                                    <input
                                        type="text" className="setting-input"
                                        value={settings.ftpUsername}
                                        onChange={(e) => handleValueChange('ftpUsername', e.target.value)}
                                        disabled={!settings.ftpEnabled}
                                    />
                                </SettingRow>
                                <SettingRow title="FTP Password" stacked>
                                    <input
                                        type="password" placeholder="••••••••" className="setting-input"
                                        value={settings.ftpPassword}
                                        onChange={(e) => handleValueChange('ftpPassword', e.target.value)}
                                        disabled={!settings.ftpEnabled}
                                    />
                                </SettingRow>
                                <SettingRow title="FTP Port" stacked>
                                    <input
                                        type="number"
                                        value={settings.ftpPort}
                                        onChange={(e) => handleValueChange('ftpPort', e.target.value)}
                                        className="setting-input"
                                        disabled={!settings.ftpEnabled}
                                    />
                                </SettingRow>
                                <div className="btn-row" style={{ padding: '16px 0' }}>
                                    <button className="btn-secondary" onClick={() => runTest('FTP')} disabled={!settings.ftpEnabled}>Test FTP Connection</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 9: Wasabi Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Wasabi Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable Wasabi">
                                <Toggle enabled={settings.wasabiEnabled} onToggle={() => handleToggle('wasabiEnabled')} />
                            </SettingRow>
                            <div className={!settings.wasabiEnabled ? 'section-disabled' : ''}>
                                <SettingRow title="Bucket Name" stacked>
                                    <input
                                        type="text" className="setting-input"
                                        value={settings.wasabiBucket}
                                        onChange={(e) => handleValueChange('wasabiBucket', e.target.value)}
                                        disabled={!settings.wasabiEnabled}
                                    />
                                </SettingRow>
                                <div className="btn-row" style={{ padding: '16px 0' }}>
                                    <button className="btn-secondary" onClick={() => runTest('Wasabi')} disabled={!settings.wasabiEnabled}>Test Connection</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 10: Google Cloud Storage */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Google Cloud Storage</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable Google Cloud">
                                <Toggle enabled={settings.gcsEnabled} onToggle={() => handleToggle('gcsEnabled')} />
                            </SettingRow>
                            <div className={!settings.gcsEnabled ? 'section-disabled' : ''}>
                                <SettingRow title="Service Account JSON" stacked>
                                    <textarea
                                        className="setting-input setting-textarea"
                                        rows={4} placeholder="{ ... }"
                                        value={settings.gcsJson}
                                        onChange={(e) => handleValueChange('gcsJson', e.target.value)}
                                        disabled={!settings.gcsEnabled}
                                    ></textarea>
                                </SettingRow>
                                <div className="btn-row" style={{ padding: '16px 0' }}>
                                    <button className="btn-secondary" onClick={() => runTest('Google Cloud')} disabled={!settings.gcsEnabled}>Test Connection</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 11: DigitalOcean Spaces */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>DigitalOcean Spaces</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Enable DigitalOcean Spaces">
                                <Toggle enabled={settings.doEnabled} onToggle={() => handleToggle('doEnabled')} />
                            </SettingRow>
                            <div className={!settings.doEnabled ? 'section-disabled' : ''}>
                                <SettingRow title="Space Name" stacked>
                                    <input
                                        type="text" className="setting-input"
                                        value={settings.doSpaceName}
                                        onChange={(e) => handleValueChange('doSpaceName', e.target.value)}
                                        disabled={!settings.doEnabled}
                                    />
                                </SettingRow>
                                <div className="btn-row" style={{ padding: '16px 0' }}>
                                    <button className="btn-secondary" onClick={() => runTest('DigitalOcean')} disabled={!settings.doEnabled}>Test Connection</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ImportUploadConfig;
