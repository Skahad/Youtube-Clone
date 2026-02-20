import React, { useState } from 'react';
import {
    ChevronRight, Info, Facebook, Twitter, Chrome, Linkedin,
    Instagram, MessageCircle, Github, Music, Globe, HelpCircle,
    Eye, EyeOff, Save, AlertCircle, Home
} from 'lucide-react';
import './SocialLoginSettings.css';

const SocialLoginSettings = () => {
    const [settings, setSettings] = useState({
        facebook: { enabled: true, appId: '', appSecret: '' },
        twitter: { enabled: false, appId: '', appSecret: '' },
        google: { enabled: true, appId: '', appSecret: '' },
        linkedin: { enabled: false, appId: '', appSecret: '' },
        vkontakte: { enabled: false, appId: '', appSecret: '' },
        instagram: { enabled: false, appId: '', appSecret: '' },
        qq: { enabled: false, appId: '', appSecret: '' },
        wechat: { enabled: false, appId: '', appSecret: '' },
        discord: { enabled: false, appId: '', appSecret: '' },
        mailru: { enabled: false, appId: '', appSecret: '' },
        tiktok: { enabled: false, appId: '', appSecret: '' },
        wowonder: { enabled: false, appId: '', appSecret: '', apiKey: '', callbackUrl: '', iconUrl: '' }
    });

    const [showSecrets, setShowSecrets] = useState({});
    const [toast, setToast] = useState(null);

    const providers = [
        { id: 'facebook', name: 'Facebook Login', description: 'Enable the ability for users to login to your site using their Facebook account.', icon: <Facebook size={18} /> },
        { id: 'twitter', name: 'Twitter Login', description: 'Enable the ability for users to login to your site using their Twitter account.', icon: <Twitter size={18} /> },
        { id: 'google', name: 'Google Login', description: 'Enable the ability for users to login to your site using their Google account. (App requires reviewing)', icon: <Chrome size={18} /> },
        { id: 'linkedin', name: 'LinkedIn Login', description: 'Enable the ability for users to login to your site using their LinkedIn account.', icon: <Linkedin size={18} /> },
        { id: 'vkontakte', name: 'Vkontakte Login', description: 'Enable the ability for users to login to your site using their Vkontakte account.', icon: <Globe size={18} /> },
        { id: 'instagram', name: 'Instagram Login', description: 'Enable the ability for users to login to your site using their Instagram account.', icon: <Instagram size={18} /> },
        { id: 'qq', name: 'QQ Login', description: 'Enable the ability for users to login to your site using their QQ account.', icon: <MessageCircle size={18} /> },
        { id: 'wechat', name: 'WeChat Login', description: 'Enable the ability for users to login to your site using their WeChat account.', icon: <MessageCircle size={18} /> },
        { id: 'discord', name: 'Discord Login', description: 'Enable the ability for users to login to your site using their Discord account.', icon: <MessageCircle size={18} /> },
        { id: 'mailru', name: 'Mailru Login', description: 'Enable the ability for users to login to your site using their Mailru account.', icon: <Globe size={18} /> },
        { id: 'tiktok', name: 'TikTok Login', description: 'Enable the ability for users to login to your site using their TikTok account.', icon: <Music size={18} /> },
        { id: 'wowonder', name: 'WoWonder (Your Own Site)?', description: 'Allow users to login from your own WoWonder script site.', icon: <Globe size={18} /> }
    ];

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleToggle = (id) => {
        setSettings(prev => ({
            ...prev,
            [id]: { ...prev[id], enabled: !prev[id].enabled }
        }));
        showToast(`${providers.find(p => p.id === id).name} updated successfully.`);
    };

    const handleInputChange = (id, field, value) => {
        setSettings(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    const toggleSecret = (id) => {
        setShowSecrets(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const ConfigSection = ({ id, label, colorClass, children }) => (
        <div className={`config-sub-section ${!settings[id].enabled ? 'disabled' : ''}`}>
            <div className={`provider-label ${colorClass}`}>{label}</div>
            <div className="provider-fields">
                {children}
            </div>
            {id !== 'qq' && id !== 'wechat' && id !== 'instagram' && (
                <div className="security-warning">
                    <AlertCircle size={14} />
                    <span>The secret key is not showing due security reasons, you can still overwrite the current one.</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="config-container social-login-settings-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">Social Login Settings</span>
            </nav>

            <h1 className="page-title">Social Login Settings</h1>

            {/* Top Info Alert */}
            <div className="alert-box alert-blue full-width">
                <Info size={18} />
                <p>For more information on how to setup social login, please visit our Documentation page.</p>
            </div>

            <div className="config-grid">
                {/* Left Card: Toggles */}
                <div className="config-card">
                    <div className="card-header">
                        <h3>Social Login Settings</h3>
                    </div>
                    <div className="card-body">
                        {providers.map(provider => (
                            <div key={provider.id} className="provider-row">
                                <div className="provider-info">
                                    <div className="provider-name">{provider.name}</div>
                                    <div className="provider-description">{provider.description}</div>
                                </div>
                                <button
                                    className={`setting-toggle ${settings[provider.id].enabled ? 'on' : 'off'}`}
                                    onClick={() => handleToggle(provider.id)}
                                >
                                    <div className="toggle-handle" />
                                    <span className="toggle-label">{settings[provider.id].enabled ? 'ON' : 'OFF'}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Card: API Keys */}
                <div className="config-card">
                    <div className="card-header">
                        <h3>API Keys</h3>
                    </div>
                    <div className="card-body scrollable">
                        <div className="alert-box alert-blue-inline">
                            <Info size={18} />
                            <p>Please note that some websites may require app verification.</p>
                        </div>

                        <ConfigSection id="facebook" label="Facebook Configuration" colorClass="bg-facebook">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.facebook.appId}
                                    placeholder="Enter App ID"
                                    onChange={(e) => handleInputChange('facebook', 'appId', e.target.value)}
                                    disabled={!settings.facebook.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret Key</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.facebook ? "text" : "password"}
                                        className="form-input"
                                        value={settings.facebook.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('facebook', 'appSecret', e.target.value)}
                                        disabled={!settings.facebook.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('facebook')} disabled={!settings.facebook.enabled}>
                                        {showSecrets.facebook ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="twitter" label="Twitter Configuration" colorClass="bg-twitter">
                            <div className="form-group">
                                <label className="form-label">Consumer Key</label>
                                <input
                                    type="text" className="form-input"
                                    disabled={!settings.twitter.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Consumer Secret</label>
                                <input
                                    type="password" className="form-input"
                                    disabled={!settings.twitter.enabled}
                                />
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.twitter ? "text" : "password"}
                                        className="form-input"
                                        value={settings.twitter.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('twitter', 'appSecret', e.target.value)}
                                        disabled={!settings.twitter.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('twitter')} disabled={!settings.twitter.enabled}>
                                        {showSecrets.twitter ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="google" label="Google Configuration" colorClass="bg-google">
                            <div className="form-group">
                                <label className="form-label">Client ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.google.appId}
                                    placeholder="Enter Client ID"
                                    onChange={(e) => handleInputChange('google', 'appId', e.target.value)}
                                    disabled={!settings.google.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Client Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.google ? "text" : "password"}
                                        className="form-input"
                                        value={settings.google.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('google', 'appSecret', e.target.value)}
                                        disabled={!settings.google.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('google')} disabled={!settings.google.enabled}>
                                        {showSecrets.google ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="linkedin" label="LinkedIn Configuration" colorClass="bg-linkedin">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.linkedin.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('linkedin', 'appId', e.target.value)}
                                    disabled={!settings.linkedin.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.linkedin ? "text" : "password"}
                                        className="form-input"
                                        value={settings.linkedin.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('linkedin', 'appSecret', e.target.value)}
                                        disabled={!settings.linkedin.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('linkedin')} disabled={!settings.linkedin.enabled}>
                                        {showSecrets.linkedin ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="vkontakte" label="Vkontakte Configuration" colorClass="bg-wowonder">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.vkontakte.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('vkontakte', 'appId', e.target.value)}
                                    disabled={!settings.vkontakte.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.vkontakte ? "text" : "password"}
                                        className="form-input"
                                        value={settings.vkontakte.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('vkontakte', 'appSecret', e.target.value)}
                                        disabled={!settings.vkontakte.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('vkontakte')} disabled={!settings.vkontakte.enabled}>
                                        {showSecrets.vkontakte ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="instagram" label="Instagram Configuration" colorClass="bg-facebook">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.instagram.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('instagram', 'appId', e.target.value)}
                                    disabled={!settings.instagram.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.instagram ? "text" : "password"}
                                        className="form-input"
                                        value={settings.instagram.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('instagram', 'appSecret', e.target.value)}
                                        disabled={!settings.instagram.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('instagram')} disabled={!settings.instagram.enabled}>
                                        {showSecrets.instagram ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="qq" label="QQ Configuration" colorClass="bg-twitter">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.qq.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('qq', 'appId', e.target.value)}
                                    disabled={!settings.qq.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.qq ? "text" : "password"}
                                        className="form-input"
                                        value={settings.qq.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('qq', 'appSecret', e.target.value)}
                                        disabled={!settings.qq.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('qq')} disabled={!settings.qq.enabled}>
                                        {showSecrets.qq ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="wechat" label="WeChat Configuration" colorClass="bg-facebook">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.wechat.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('wechat', 'appId', e.target.value)}
                                    disabled={!settings.wechat.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.wechat ? "text" : "password"}
                                        className="form-input"
                                        value={settings.wechat.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('wechat', 'appSecret', e.target.value)}
                                        disabled={!settings.wechat.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('wechat')} disabled={!settings.wechat.enabled}>
                                        {showSecrets.wechat ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="discord" label="Discord Configuration" colorClass="bg-discord">
                            <div className="form-group">
                                <label className="form-label">Client ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.discord.appId}
                                    placeholder="Enter Client ID"
                                    onChange={(e) => handleInputChange('discord', 'appId', e.target.value)}
                                    disabled={!settings.discord.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Client Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.discord ? "text" : "password"}
                                        className="form-input"
                                        value={settings.discord.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('discord', 'appSecret', e.target.value)}
                                        disabled={!settings.discord.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('discord')} disabled={!settings.discord.enabled}>
                                        {showSecrets.discord ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="mailru" label="Mailru Configuration" colorClass="bg-facebook">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.mailru.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('mailru', 'appId', e.target.value)}
                                    disabled={!settings.mailru.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.mailru ? "text" : "password"}
                                        className="form-input"
                                        value={settings.mailru.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('mailru', 'appSecret', e.target.value)}
                                        disabled={!settings.mailru.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('mailru')} disabled={!settings.mailru.enabled}>
                                        {showSecrets.mailru ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="tiktok" label="TikTok Configuration" colorClass="bg-tiktok">
                            <div className="form-group">
                                <label className="form-label">Client Key</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.tiktok.appId}
                                    placeholder="Enter Client Key"
                                    onChange={(e) => handleInputChange('tiktok', 'appId', e.target.value)}
                                    disabled={!settings.tiktok.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Client Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.tiktok ? "text" : "password"}
                                        className="form-input"
                                        value={settings.tiktok.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('tiktok', 'appSecret', e.target.value)}
                                        disabled={!settings.tiktok.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('tiktok')} disabled={!settings.tiktok.enabled}>
                                        {showSecrets.tiktok ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </ConfigSection>

                        <ConfigSection id="wowonder" label="WoWonder Configuration" colorClass="bg-wowonder">
                            <div className="form-group">
                                <label className="form-label">Application ID</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.wowonder.appId}
                                    placeholder="Enter Application ID"
                                    onChange={(e) => handleInputChange('wowonder', 'appId', e.target.value)}
                                    disabled={!settings.wowonder.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Secret</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showSecrets.wowonder ? "text" : "password"}
                                        className="form-input"
                                        value={settings.wowonder.appSecret}
                                        placeholder="••••••••••••"
                                        onChange={(e) => handleInputChange('wowonder', 'appSecret', e.target.value)}
                                        disabled={!settings.wowonder.enabled}
                                    />
                                    <button className="toggle-password" onClick={() => toggleSecret('wowonder')} disabled={!settings.wowonder.enabled}>
                                        {showSecrets.wowonder ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">WoWonder API Key</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.wowonder.apiKey} // Assuming apiKey is a field in settings.wowonder
                                    placeholder="Enter WoWonder API Key"
                                    onChange={(e) => handleInputChange('wowonder', 'apiKey', e.target.value)}
                                    disabled={!settings.wowonder.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Callback URL</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.wowonder.callbackUrl}
                                    placeholder="https://..."
                                    onChange={(e) => handleInputChange('wowonder', 'callbackUrl', e.target.value)}
                                    disabled={!settings.wowonder.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Icon URL</label>
                                <input
                                    type="text" className="form-input"
                                    value={settings.wowonder.iconUrl}
                                    placeholder="https://..."
                                    onChange={(e) => handleInputChange('wowonder', 'iconUrl', e.target.value)}
                                    disabled={!settings.wowonder.enabled}
                                />
                            </div>
                        </ConfigSection>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.message}
                </div>
            )}

            <div className="sticky-save-bar">
                <button className="btn-save" onClick={() => showToast('Changes saved successfully.')}>
                    <Save size={18} />
                    Save Configuration
                </button>
            </div>
        </div>
    );
};

export default SocialLoginSettings;
