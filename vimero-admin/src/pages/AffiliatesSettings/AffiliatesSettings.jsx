import React, { useState } from 'react';
import { ChevronRight, Settings, Info, Check, X, Users2, DollarSign, UserPlus, ShoppingCart, UserCheck, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import './AffiliatesSettings.css';

const AffiliatesSettings = () => {
    const [config, setConfig] = useState({
        systemEnabled: true,
        newUserRegistered: {
            enabled: true,
            amount: 0.10
        },
        newUserBoughtPro: {
            enabled: true,
            amount: 10
        },
        newUserSubscribedPaid: {
            enabled: true,
            amount: 10
        }
    });

    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleToggle = (key) => {
        if (key === 'systemEnabled') {
            setConfig(prev => ({ ...prev, systemEnabled: !prev.systemEnabled }));
        } else {
            if (!config.systemEnabled) return;
            setConfig(prev => ({
                ...prev,
                [key]: { ...prev[key], enabled: !prev[key].enabled }
            }));
        }
    };

    const handleAmountChange = (key, value) => {
        if (!config.systemEnabled || !config[key].enabled) return;

        let numericValue = parseFloat(value);
        if (isNaN(numericValue)) numericValue = 0;
        if (numericValue < 0) numericValue = 0;

        // Cap percentages at 100
        if ((key === 'newUserBoughtPro' || key === 'newUserSubscribedPaid') && numericValue > 100) {
            numericValue = 100;
        }

        setConfig(prev => ({
            ...prev,
            [key]: { ...prev[key], amount: numericValue }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            showToast('Settings saved successfully!');
        }, 800);
    };

    const ToggleSwitch = ({ enabled, onClick, disabled }) => (
        <div
            className={`toggle-switch ${enabled ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
            onClick={disabled ? null : onClick}
        >
            <div className="toggle-handle">
                {enabled ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
            </div>
        </div>
    );

    const isInternalDisabled = !config.systemEnabled;

    return (
        <div className="affiliates-settings affiliates-settings-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span> <ChevronRight size={14} />
                <span>Users</span> <ChevronRight size={14} />
                <span>Affiliates System</span> <ChevronRight size={14} />
                <span className="active">Affiliates Settings</span>
            </nav>

            <h1 className="page-title">Affiliates Settings</h1>

            <div className="settings-card">
                <div className="card-header">
                    <div className="header-title">
                        <Settings size={18} className="header-icon" />
                        <h2>Affiliates Settings</h2>
                    </div>
                </div>

                <div className="card-body">
                    {/* Master Switch */}
                    <div className="setting-section master-section">
                        <div className="setting-info">
                            <h3>Affiliates System</h3>
                            <p>User will earn money from invite users to your site</p>
                        </div>
                        <ToggleSwitch
                            enabled={config.systemEnabled}
                            onClick={() => handleToggle('systemEnabled')}
                        />
                    </div>

                    <div className={`child-settings ${isInternalDisabled ? 'dimmed' : ''}`}>
                        {/* Condition 1: New User Registered */}
                        <div className="setting-section">
                            <div className="setting-content">
                                <div className="setting-header">
                                    <div className="setting-title">
                                        <UserPlus size={18} className="section-icon" />
                                        <div className="text-wrapper">
                                            <h4>New User Is Registered</h4>
                                            <p>User will earn money when new user is registered</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        enabled={config.newUserRegistered.enabled}
                                        onClick={() => handleToggle('newUserRegistered')}
                                        disabled={isInternalDisabled}
                                    />
                                </div>
                                <div className={`setting-input-wrapper ${(!config.newUserRegistered.enabled || isInternalDisabled) ? 'input-disabled' : ''}`}>
                                    <label>Amount</label>
                                    <div className="input-with-symbol">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={config.newUserRegistered.amount}
                                            disabled={!config.newUserRegistered.enabled || isInternalDisabled}
                                            onChange={(e) => handleAmountChange('newUserRegistered', e.target.value)}
                                        />
                                        <span className="symbol">$</span>
                                    </div>
                                    <small className="helper-text">The price you'll pay for each new referred user. Default 0.10</small>
                                </div>
                            </div>
                        </div>

                        {/* Condition 2: New User Bought Pro */}
                        <div className="setting-section">
                            <div className="setting-content">
                                <div className="setting-header">
                                    <div className="setting-title">
                                        <ShoppingCart size={18} className="section-icon" />
                                        <div className="text-wrapper">
                                            <h4>New User Is Registered & Bought a Pro Package</h4>
                                            <p>User will earn money when new user is registered & bought a pro package</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        enabled={config.newUserBoughtPro.enabled}
                                        onClick={() => handleToggle('newUserBoughtPro')}
                                        disabled={isInternalDisabled}
                                    />
                                </div>
                                <div className={`setting-input-wrapper ${(!config.newUserBoughtPro.enabled || isInternalDisabled) ? 'input-disabled' : ''}`}>
                                    <label>Amount %</label>
                                    <div className="input-with-symbol">
                                        <input
                                            type="number"
                                            value={config.newUserBoughtPro.amount}
                                            disabled={!config.newUserBoughtPro.enabled || isInternalDisabled}
                                            onChange={(e) => handleAmountChange('newUserBoughtPro', e.target.value)}
                                        />
                                        <span className="symbol">%</span>
                                    </div>
                                    <small className="helper-text">The price you'll pay for each new referred user. After he join any pro package.</small>
                                </div>
                            </div>
                        </div>

                        {/* Condition 3: New User Subscribed Paid */}
                        <div className="setting-section">
                            <div className="setting-content">
                                <div className="setting-header">
                                    <div className="setting-title">
                                        <UserCheck size={18} className="section-icon" />
                                        <div className="text-wrapper">
                                            <h4>New User Is Registered & Subscribed to Paid Channel</h4>
                                            <p>User will earn money when new user is registered & subscribe to paid channel</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        enabled={config.newUserSubscribedPaid.enabled}
                                        onClick={() => handleToggle('newUserSubscribedPaid')}
                                        disabled={isInternalDisabled}
                                    />
                                </div>
                                <div className={`setting-input-wrapper ${(!config.newUserSubscribedPaid.enabled || isInternalDisabled) ? 'input-disabled' : ''}`}>
                                    <label>Amount %</label>
                                    <div className="input-with-symbol">
                                        <input
                                            type="number"
                                            value={config.newUserSubscribedPaid.amount}
                                            disabled={!config.newUserSubscribedPaid.enabled || isInternalDisabled}
                                            onChange={(e) => handleAmountChange('newUserSubscribedPaid', e.target.value)}
                                        />
                                        <span className="symbol">%</span>
                                    </div>
                                    <small className="helper-text">The price you'll pay for each new referred user. After he subscribe to paid channel.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <button
                        className={`btn-save ${isSaving ? 'loading' : ''}`}
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <div className="spinner-small"></div>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Settings
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default AffiliatesSettings;
