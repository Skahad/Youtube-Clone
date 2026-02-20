import React, { useState } from 'react';
import {
    ChevronRight, Home, Info, CreditCard, DollarSign,
    Save, CheckCircle2, AlertTriangle, Landmark,
    Wallet, ShieldCheck, Globe, Settings, Check, X
} from 'lucide-react';
import './PaymentConfig.css';

const PaymentConfig = () => {
    const [settings, setSettings] = useState({
        bankTransfer: true,
        paypalWithdrawal: true,
        skrillWithdrawal: false,
        customMethod: false,
        minWithdrawal: 50,
        enableTwoCheckout: true,
        twoCheckoutMode: 'SandBox',
        twoCheckoutCurrency: 'USD',
        sellerId: '',
        publishableKey: '',
        privateKey: '',
        enablePayPal: true
    });

    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
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

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        showToast('Setting updated successfully.');
    };

    const handleInputChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            showToast('All configurations saved successfully.');
        }, 800);
    };

    return (
        <div className="config-container payment-config-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">Payment Configuration</span>
            </nav>

            <h1 className="page-title">Payment Configuration</h1>

            {/* Info Banner */}
            <div className="alert-box alert-info-blue">
                <Info size={18} />
                <p>Info: For more information on how to setup payment gateways, please visit our <a href="#" className="alert-link">documentation</a> page.</p>
            </div>

            <div className="config-grid">
                {/* Left Column: Withdrawal Settings */}
                <div className="config-card">
                    <div className="card-header">
                        <div className="header-title">
                            <Landmark size={18} className="header-icon" />
                            <h3>Withdrawal Settings</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="info-box-light-blue">
                            Users can send withdrawal requests via any of these methods
                        </div>

                        <div className="withdrawal-methods">
                            <div className="method-row">
                                <span className="method-badge">Bank Transfer</span>
                                <ToggleSwitch
                                    enabled={settings.bankTransfer}
                                    onClick={() => handleToggle('bankTransfer')}
                                />
                            </div>

                            <div className="method-row">
                                <span className="method-badge">Paypal</span>
                                <ToggleSwitch
                                    enabled={settings.paypalWithdrawal}
                                    onClick={() => handleToggle('paypalWithdrawal')}
                                />
                            </div>

                            <div className="method-row">
                                <span className="method-badge">Skrill</span>
                                <ToggleSwitch
                                    enabled={settings.skrillWithdrawal}
                                    onClick={() => handleToggle('skrillWithdrawal')}
                                />
                            </div>

                            <div className="method-row">
                                <span className="method-badge">Custom Method</span>
                                <ToggleSwitch
                                    enabled={settings.customMethod}
                                    onClick={() => handleToggle('customMethod')}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-24">
                            <label className="form-label">Minimum withdrawal request</label>
                            <input
                                type="number"
                                className="form-input"
                                value={settings.minWithdrawal}
                                onChange={(e) => handleInputChange('minWithdrawal', e.target.value)}
                                min="0"
                            />
                            <p className="form-help">Minimum withdrawal the users can request</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: 2Checkout Configuration */}
                <div className="config-card">
                    <div className="card-header">
                        <div className="header-title">
                            <CreditCard size={18} className="header-icon" />
                            <h3>Configure 2Checkout Payment Method</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="setting-row-simple">
                            <div className="row-info">
                                <label className="form-label-bold">2Checkout Payment Method</label>
                                <p className="form-help no-margin">Enable 2Checkout to receive payments by credit cards.</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.enableTwoCheckout}
                                onClick={() => handleToggle('enableTwoCheckout')}
                            />
                        </div>

                        <div className={`checkout-fields mt-24 ${!settings.enableTwoCheckout ? 'disabled' : ''}`}>
                            <div className="form-group">
                                <label className="form-label">2Checkout Mode</label>
                                <select
                                    className="form-select"
                                    value={settings.twoCheckoutMode}
                                    onChange={(e) => handleInputChange('twoCheckoutMode', e.target.value)}
                                    disabled={!settings.enableTwoCheckout}
                                >
                                    <option value="SandBox">SandBox</option>
                                    <option value="Live">Live</option>
                                </select>
                                <p className="form-help">Selection between SandBox and Live mode</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">2Checkout Currency</label>
                                <select
                                    className="form-select"
                                    value={settings.twoCheckoutCurrency}
                                    onChange={(e) => handleInputChange('twoCheckoutCurrency', e.target.value)}
                                    disabled={!settings.enableTwoCheckout}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Seller ID</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={settings.sellerId}
                                    onChange={(e) => handleInputChange('sellerId', e.target.value)}
                                    disabled={!settings.enableTwoCheckout}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Publishable Key</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={settings.publishableKey}
                                    onChange={(e) => handleInputChange('publishableKey', e.target.value)}
                                    disabled={!settings.enableTwoCheckout}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Private Key</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="••••••••••••"
                                    value={settings.privateKey}
                                    onChange={(e) => handleInputChange('privateKey', e.target.value)}
                                    disabled={!settings.enableTwoCheckout}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Card: Payment Settings (PayPal) */}
                <div className="config-card full-width-card">
                    <div className="card-header">
                        <div className="header-title">
                            <Settings size={18} className="header-icon" />
                            <h3>Payment Settings</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="setting-row-simple">
                            <div className="row-info">
                                <label className="form-label-bold">PayPal Payment Method</label>
                                <p className="form-help no-margin">Enable PayPal to receive payments from ads and pro packages.</p>
                            </div>
                            <ToggleSwitch
                                enabled={settings.enablePayPal}
                                onClick={() => handleToggle('enablePayPal')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Save Bar */}
            <div className="sticky-save-bar">
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
                            Save Configuration
                        </>
                    )}
                </button>
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

export default PaymentConfig;
