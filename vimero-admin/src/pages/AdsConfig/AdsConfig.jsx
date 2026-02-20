import React, { useState } from 'react';
import {
    ChevronRight, Home, Info, Check, X,
    Save, Loader2, CheckCircle2, AlertTriangle, Settings, DollarSign
} from 'lucide-react';
import './AdsConfig.css';

const AdsConfig = () => {
    const [settings, setSettings] = useState({
        adSystem: true,
        costPerView: '0.1',
        costPerClick: '0.7',
        minWithdrawal: '50',
        videoMonetization: true,
        monetizationApproval: false
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const ToggleSwitch = ({ enabled, onClick, disabled, danger }) => (
        <div
            className={`toggle-switch ${enabled ? 'on' : 'off'} ${disabled ? 'disabled' : ''} ${danger && !enabled ? 'danger' : ''}`}
            onClick={disabled ? null : onClick}
        >
            <div className="toggle-handle">
                {enabled ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
            </div>
        </div>
    );

    const handleToggle = (key) => {
        const newValue = !settings[key];
        setSettings(prev => ({ ...prev, [key]: newValue }));

        // AJAX Save Simulation
        showToast(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} updated successfully.`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast('Advertisement settings saved successfully.');
        }, 8000);
    };

    return (
        <div className="config-container ads-config-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">Advertisement System Settings</span>
            </nav>

            <h1 className="page-title">Advertisement System Settings</h1>

            {/* Info Alert */}
            <div className="info-alert-banner">
                <Info size={20} className="info-icon" />
                <div className="alert-text">
                    For more information on how advertisement system works, please visit our <a href="#" onClick={(e) => e.preventDefault()}>documentation</a> page.
                </div>
            </div>

            <div className="card settings-card">
                <div className="card-header">
                    <div className="header-title">
                        <Settings size={18} className="header-icon" />
                        <h2>Advertisement Settings</h2>
                    </div>
                </div>

                <div className="card-body">
                    <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                        {/* Advertisement System Toggle */}
                        <div className="setting-row">
                            <div className="setting-info">
                                <label className="setting-label">Advertisement System</label>
                                <span className="setting-subtext">Allow users to create ads.</span>
                            </div>
                            <div className="setting-action">
                                <ToggleSwitch
                                    enabled={settings.adSystem}
                                    onClick={() => handleToggle('adSystem')}
                                />
                            </div>
                        </div>

                        {/* Cost Per View */}
                        <div className={`setting-row ${!settings.adSystem ? 'disabled' : ''}`}>
                            <div className="setting-info">
                                <label className="setting-label">Cost Per View</label>
                                <span className="setting-subtext">Set a price for ad impressions.</span>
                            </div>
                            <div className="setting-action">
                                <div className="input-with-symbol">
                                    <input
                                        type="number"
                                        name="costPerView"
                                        className="config-input"
                                        value={settings.costPerView}
                                        onChange={handleInputChange}
                                        disabled={!settings.adSystem}
                                        step="0.01"
                                    />
                                    <span className="symbol">$</span>
                                </div>
                            </div>
                        </div>

                        {/* Cost Per Click */}
                        <div className={`setting-row ${!settings.adSystem ? 'disabled' : ''}`}>
                            <div className="setting-info">
                                <label className="setting-label">Cost Per Click</label>
                                <span className="setting-subtext">Set a price for ad clicks.</span>
                            </div>
                            <div className="setting-action">
                                <div className="input-with-symbol">
                                    <input
                                        type="number"
                                        name="costPerClick"
                                        className="config-input"
                                        value={settings.costPerClick}
                                        onChange={handleInputChange}
                                        disabled={!settings.adSystem}
                                        step="0.01"
                                    />
                                    <span className="symbol">$</span>
                                </div>
                            </div>
                        </div>

                        {/* Minimum Withdrawal */}
                        <div className="setting-row">
                            <div className="setting-info">
                                <label className="setting-label">Minimum withdrawal request</label>
                                <span className="setting-subtext">Minimum withdrawal the users can request</span>
                            </div>
                            <div className="setting-action">
                                <div className="input-with-symbol">
                                    <input
                                        type="number"
                                        name="minWithdrawal"
                                        className="config-input"
                                        value={settings.minWithdrawal}
                                        onChange={handleInputChange}
                                    />
                                    <span className="symbol">$</span>
                                </div>
                            </div>
                        </div>

                        {/* Video Monetization Toggle */}
                        <div className="setting-row">
                            <div className="setting-info">
                                <label className="setting-label">Video Monetization</label>
                                <span className="setting-subtext">Allow users to monetize their videos.</span>
                            </div>
                            <div className="setting-action">
                                <ToggleSwitch
                                    enabled={settings.videoMonetization}
                                    onClick={() => handleToggle('videoMonetization')}
                                />
                            </div>
                        </div>

                        {/* Video Monetization Approval Toggle */}
                        <div className="setting-row">
                            <div className="setting-info">
                                <label className="setting-label">Video Monetization Approval System</label>
                                <span className="setting-subtext">Approve users video monetizations.</span>
                            </div>
                            <div className="setting-action">
                                <ToggleSwitch
                                    enabled={settings.monetizationApproval}
                                    onClick={() => handleToggle('monetizationApproval')}
                                    danger={!settings.monetizationApproval}
                                />
                            </div>
                        </div>

                        <div className="form-footer">
                            <button
                                className={`btn-save ${loading ? 'loading' : ''}`}
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="spinner-small"></div>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default AdsConfig;
