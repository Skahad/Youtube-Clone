import React, { useState } from 'react';
import {
    ChevronRight, AlertCircle, Info, HelpCircle
} from 'lucide-react';
import './GeneralConfig.css';

const GeneralConfig = () => {
    // Section 1: General Configuration State
    const [generalSettings, setGeneralSettings] = useState({
        switchAccount: true,
        switchAccountCounts: 3,
        developerMode: false,
        developersApi: true,
        maintenanceMode: false,
        seoLinks: false,
        historySystem: true,
        popularChannels: true,
        articleSystem: true,
        showArticlesHome: true,
        plus18Popup: false,
        plus18BlockTime: 1,
        languageModal: false,
        defaultLanguage: 'English',
        reportCopyright: true,
        playlistSubscription: true,
        createPostSystem: true,
        favouriteCategory: [],
        videoPaginationLimit: 20,
        censoredWords: '',
        dateFormat: 'dd mmmm yyyy'
    });

    // Section 2: Login & Registration State
    const [authSettings, setAuthSettings] = useState({
        userRegistration: true,
        accountValidation: false,
        autoUsername: false,
        twoFactor: true,
        googleAuth: true,
        authy: false,
        authyToken: '',
        passwordComplexity: false,
        rememberDevice: true,
        recaptcha: false,
        recaptchaKey: '',
        preventBadLogin: false,
        loginLimit: 4,
        lockoutTime: 10
    });

    // Section 3: User Configuration State
    const [userSettings, setUserSettings] = useState({
        deleteUser: true,
        verificationBadge: true,
        userBlock: true,
        paidSubscribers: true,
        commission: 2,
        donationSystem: true,
        userInvite: false,
        userLinksGen: 10,
        userLinksWithin: '1 Month'
    });

    // Section 4: Other Settings State
    const [otherSettings, setOtherSettings] = useState({
        messagingServer: 'AJAX',
        commentSystem: 'AJAX (PlayTube)',
        defaultShownComments: 40
    });

    const handleToggle = (section, key) => {
        if (section === 'general') {
            setGeneralSettings(prev => ({ ...prev, [key]: !prev[key] }));
        } else if (section === 'auth') {
            setAuthSettings(prev => ({ ...prev, [key]: !prev[key] }));
        } else if (section === 'user') {
            setUserSettings(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const handleValueChange = (section, key, value) => {
        if (section === 'general') {
            setGeneralSettings(prev => ({ ...prev, [key]: value }));
        } else if (section === 'auth') {
            setAuthSettings(prev => ({ ...prev, [key]: value }));
        } else if (section === 'user') {
            setUserSettings(prev => ({ ...prev, [key]: value }));
        } else if (section === 'other') {
            setOtherSettings(prev => ({ ...prev, [key]: value }));
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
                <span className="active">General Configuration</span>
            </nav>

            <h1 className="page-title">General Configuration</h1>

            {/* System Alert */}
            <div className="system-alert-banner">
                <div className="alert-content">
                    <AlertCircle size={18} />
                    <span><strong>Important!</strong> There are some errors found on your system, please review System Status.</span>
                </div>
            </div>

            <div className="config-grid">
                {/* Left Column: General Configuration */}
                <div className="grid-column">
                    <div className="config-card">
                        <div className="card-header">
                            <h3>General Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Switch Account" description="Enable switching between accounts.">
                                <Toggle enabled={generalSettings.switchAccount} onToggle={() => handleToggle('general', 'switchAccount')} />
                            </SettingRow>

                            <SettingRow title="Switch Account Counts" description="How many accounts a user can switch between." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={generalSettings.switchAccountCounts}
                                    onChange={(e) => handleValueChange('general', 'switchAccountCounts', e.target.value)}
                                    disabled={!generalSettings.switchAccount}
                                />
                            </SettingRow>

                            <SettingRow title="Developer Mode" description="Enable developer mode for debugging.">
                                <Toggle enabled={generalSettings.developerMode} onToggle={() => handleToggle('general', 'developerMode')} />
                            </SettingRow>

                            <SettingRow title="Developers (API System)" description="Enable API system for developers.">
                                <Toggle enabled={generalSettings.developersApi} onToggle={() => handleToggle('general', 'developersApi')} />
                            </SettingRow>

                            <SettingRow title="Maintenance Mode" description="Turn your website offline for maintenance.">
                                <div className="maintenance-wrapper">
                                    <Toggle enabled={generalSettings.maintenanceMode} onToggle={() => handleToggle('general', 'maintenanceMode')} />
                                    <p className="helper-text">You can still login as admin via <span>/admin-cp</span></p>
                                </div>
                            </SettingRow>

                            <SettingRow title="SEO Links" description="Enable SEO friendly links.">
                                <Toggle enabled={generalSettings.seoLinks} onToggle={() => handleToggle('general', 'seoLinks')} />
                            </SettingRow>

                            <SettingRow title="History System" description="Keep track of user video history.">
                                <Toggle enabled={generalSettings.historySystem} onToggle={() => handleToggle('general', 'historySystem')} />
                            </SettingRow>

                            <SettingRow title="Popular Channels" description="Show popular channels on home page.">
                                <Toggle enabled={generalSettings.popularChannels} onToggle={() => handleToggle('general', 'popularChannels')} />
                            </SettingRow>

                            <SettingRow title="Article System" description="Enable article system.">
                                <Toggle enabled={generalSettings.articleSystem} onToggle={() => handleToggle('general', 'articleSystem')} />
                            </SettingRow>

                            <SettingRow title="Show Articles In Home Page" description="Show latest articles on homepage.">
                                <Toggle enabled={generalSettings.showArticlesHome} onToggle={() => handleToggle('general', 'showArticlesHome')} />
                            </SettingRow>

                            <SettingRow title="+18 Pop-up" description="Show 18+ warning popup.">
                                <Toggle enabled={generalSettings.plus18Popup} onToggle={() => handleToggle('general', 'plus18Popup')} />
                            </SettingRow>

                            <SettingRow title="+18 Block Time" description="Block time in hours after closing popup." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={generalSettings.plus18BlockTime}
                                    onChange={(e) => handleValueChange('general', 'plus18BlockTime', e.target.value)}
                                    disabled={!generalSettings.plus18Popup}
                                />
                            </SettingRow>

                            <SettingRow title="Language Modal" description="Show language selector on home page.">
                                <Toggle enabled={generalSettings.languageModal} onToggle={() => handleToggle('general', 'languageModal')} />
                            </SettingRow>

                            <SettingRow title="Default Language" description="Select default platform language." stacked>
                                <select
                                    className="setting-select"
                                    value={generalSettings.defaultLanguage}
                                    onChange={(e) => handleValueChange('general', 'defaultLanguage', e.target.value)}
                                >
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="Report Copyright" description="Enable copyright reporting system.">
                                <Toggle enabled={generalSettings.reportCopyright} onToggle={() => handleToggle('general', 'reportCopyright')} />
                            </SettingRow>

                            <SettingRow title="Playlist Subscription" description="Allow users to subscribe to playlists.">
                                <Toggle enabled={generalSettings.playlistSubscription} onToggle={() => handleToggle('general', 'playlistSubscription')} />
                            </SettingRow>

                            <SettingRow title="Create Post System" description="Allow users to create community posts.">
                                <Toggle enabled={generalSettings.createPostSystem} onToggle={() => handleToggle('general', 'createPostSystem')} />
                            </SettingRow>

                            <SettingRow title="Favourite Category" description="Select default categories for users." stacked>
                                <select className="setting-select" multiple>
                                    <option>Gaming</option>
                                    <option>Music</option>
                                    <option>Tech</option>
                                    <option>Education</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="Video Pagination Limit" description="Number of videos per page." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={generalSettings.videoPaginationLimit}
                                    onChange={(e) => handleValueChange('general', 'videoPaginationLimit', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow title="Censored Words" description="Words separated by comma (,)" stacked>
                                <input
                                    type="text"
                                    className="setting-input"
                                    placeholder="word1, word2..."
                                    value={generalSettings.censoredWords}
                                    onChange={(e) => handleValueChange('general', 'censoredWords', e.target.value)}
                                />
                            </SettingRow>

                            <SettingRow title="Date Format" description="Select platform date format." stacked>
                                <select
                                    className="setting-select"
                                    value={generalSettings.dateFormat}
                                    onChange={(e) => handleValueChange('general', 'dateFormat', e.target.value)}
                                >
                                    <option value="dd mmmm yyyy">dd mmmm yyyy</option>
                                    <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                                    <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                                </select>
                            </SettingRow>
                        </div>
                    </div>
                </div>

                {/* Right Column: Other Sections */}
                <div className="grid-column">
                    {/* Section 2: Login & Registration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Login & Registration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="User Registration" description="Allow new users to register.">
                                <Toggle enabled={authSettings.userRegistration} onToggle={() => handleToggle('auth', 'userRegistration')} />
                            </SettingRow>

                            <SettingRow title="Account Validation" description="Send activation email on registration.">
                                <Toggle enabled={authSettings.accountValidation} onToggle={() => handleToggle('auth', 'accountValidation')} />
                            </SettingRow>

                            <SettingRow title="Auto Username On Register" description="Generate random username for new users.">
                                <Toggle enabled={authSettings.autoUsername} onToggle={() => handleToggle('auth', 'autoUsername')} />
                            </SettingRow>

                            <SettingRow title="Two-Factor Settings" description="Enable 2FA system.">
                                <Toggle enabled={authSettings.twoFactor} onToggle={() => handleToggle('auth', 'twoFactor')} />
                            </SettingRow>

                            <SettingRow title="Google Authenticator Settings" description="Enable Google Authenticator 2FA.">
                                <Toggle enabled={authSettings.googleAuth} onToggle={() => handleToggle('auth', 'googleAuth')} />
                            </SettingRow>

                            <SettingRow title="Authy Settings" description="Enable Authy 2FA.">
                                <Toggle enabled={authSettings.authy} onToggle={() => handleToggle('auth', 'authy')} />
                            </SettingRow>

                            <SettingRow title="Authy Token" description="Your Authy application token." stacked>
                                <input
                                    type="text"
                                    className="setting-input"
                                    placeholder="Enter Authy Token"
                                    value={authSettings.authyToken}
                                    onChange={(e) => handleValueChange('auth', 'authyToken', e.target.value)}
                                    disabled={!authSettings.authy}
                                />
                            </SettingRow>

                            <SettingRow title="Password Complexity System" description="Force strong passwords.">
                                <Toggle enabled={authSettings.passwordComplexity} onToggle={() => handleToggle('auth', 'passwordComplexity')} />
                            </SettingRow>

                            <SettingRow title="Remember This Device" description="Enable remember me feature.">
                                <Toggle enabled={authSettings.rememberDevice} onToggle={() => handleToggle('auth', 'rememberDevice')} />
                            </SettingRow>

                            <SettingRow title="Recaptcha" description="Enable Google Recaptcha.">
                                <Toggle enabled={authSettings.recaptcha} onToggle={() => handleToggle('auth', 'recaptcha')} />
                            </SettingRow>

                            <SettingRow title="Recaptcha Key" description="Your Google Recaptcha site key." stacked>
                                <input
                                    type="text"
                                    className="setting-input"
                                    placeholder="Enter Recaptcha Key"
                                    value={authSettings.recaptchaKey}
                                    onChange={(e) => handleValueChange('auth', 'recaptchaKey', e.target.value)}
                                    disabled={!authSettings.recaptcha}
                                />
                            </SettingRow>

                            <SettingRow title="Prevent Bad Login Attempts" description="Block IP after X failed logins.">
                                <Toggle enabled={authSettings.preventBadLogin} onToggle={() => handleToggle('auth', 'preventBadLogin')} />
                            </SettingRow>

                            <SettingRow title="Login Limit" description="Limit for failed login attempts." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={authSettings.loginLimit}
                                    onChange={(e) => handleValueChange('auth', 'loginLimit', e.target.value)}
                                    disabled={!authSettings.preventBadLogin}
                                />
                            </SettingRow>

                            <SettingRow title="Lockout Time (In Minutes)" description="Time to block user after failed logins." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={authSettings.lockoutTime}
                                    onChange={(e) => handleValueChange('auth', 'lockoutTime', e.target.value)}
                                    disabled={!authSettings.preventBadLogin}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 3: User Configuration */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>User Configuration</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Delete User Account" description="Allow users to delete their accounts.">
                                <Toggle enabled={userSettings.deleteUser} onToggle={() => handleToggle('user', 'deleteUser')} />
                            </SettingRow>

                            <SettingRow title="User Verification Badge" description="Enable verification system.">
                                <Toggle enabled={userSettings.verificationBadge} onToggle={() => handleToggle('user', 'verificationBadge')} />
                            </SettingRow>

                            <SettingRow title="User Block System" description="Allow users to block each other.">
                                <Toggle enabled={userSettings.userBlock} onToggle={() => handleToggle('user', 'userBlock')} />
                            </SettingRow>

                            <SettingRow title="Paid Subscribers" description="Allow paid subscription system.">
                                <Toggle enabled={userSettings.paidSubscribers} onToggle={() => handleToggle('user', 'paidSubscribers')} />
                            </SettingRow>

                            <SettingRow title="Commission" description="Platform commission per subscription (%)." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={userSettings.commission}
                                    onChange={(e) => handleValueChange('user', 'commission', e.target.value)}
                                    disabled={!userSettings.paidSubscribers}
                                />
                            </SettingRow>

                            <SettingRow title="Donation System" description="Enable internal donation system.">
                                <Toggle enabled={userSettings.donationSystem} onToggle={() => handleToggle('user', 'donationSystem')} />
                            </SettingRow>

                            <SettingRow title="User Invite System" description="Enable user invitation system.">
                                <Toggle enabled={userSettings.userInvite} onToggle={() => handleToggle('user', 'userInvite')} />
                            </SettingRow>

                            <SettingRow title="How many links can a user generate?" description="Invitation link limit per user." stacked>
                                <input
                                    type="number"
                                    className="setting-input"
                                    value={userSettings.userLinksGen}
                                    onChange={(e) => handleValueChange('user', 'userLinksGen', e.target.value)}
                                    disabled={!userSettings.userInvite}
                                />
                            </SettingRow>

                            <SettingRow title="User can generate X links within?" description="Time limit for invitation generation." stacked>
                                <select
                                    className="setting-select"
                                    value={userSettings.userLinksWithin}
                                    onChange={(e) => handleValueChange('user', 'userLinksWithin', e.target.value)}
                                    disabled={!userSettings.userInvite}
                                >
                                    <option value="1 Week">1 Week</option>
                                    <option value="2 Weeks">2 Weeks</option>
                                    <option value="1 Month">1 Month</option>
                                </select>
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 4: Other Settings */}
                    <div className="config-card">
                        <div className="card-header">
                            <h3>Other Settings</h3>
                        </div>
                        <div className="card-body">
                            <SettingRow title="Messaging & Notifications Server" description="Server used for push notifications and messaging." stacked>
                                <select
                                    className="setting-select"
                                    value={otherSettings.messagingServer}
                                    onChange={(e) => handleValueChange('other', 'messagingServer', e.target.value)}
                                >
                                    <option value="AJAX">AJAX</option>
                                    <option value="Node.js">Node.js</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="Comment System" description="Select which comment system to use." stacked>
                                <select
                                    className="setting-select"
                                    value={otherSettings.commentSystem}
                                    onChange={(e) => handleValueChange('other', 'commentSystem', e.target.value)}
                                >
                                    <option value="AJAX (Vidmero)">AJAX (Vidmero)</option>
                                    <option value="Disqus">Disqus</option>
                                    <option value="Facebook">Facebook</option>
                                </select>
                            </SettingRow>

                            <SettingRow title="Default Shown Comments" description="How many comments to show initially." stacked>
                                <select
                                    className="setting-select"
                                    value={otherSettings.defaultShownComments}
                                    onChange={(e) => handleValueChange('other', 'defaultShownComments', e.target.value)}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={40}>40</option>
                                    <option value={100}>100</option>
                                </select>
                            </SettingRow>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralConfig;
