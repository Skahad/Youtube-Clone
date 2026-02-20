import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Info, Mail, Server, ShieldCheck,
    Eye, EyeOff, Send, Terminal, Loader2
} from 'lucide-react';
import './EmailSetup.css';

const EmailSetup = () => {
    const [settings, setSettings] = useState({
        siteEmail: 'info@playtubescript.com',
        contactEmail: 'contact@playtubescript.com',
        serverType: 'Server Mail (Default)', // Options: Server Mail (Default), SMTP, Sendmail
        smtpHost: 'mail.playtubescript.com',
        smtpUsername: 'info@playtubescript.com',
        smtpPassword: 'password123',
        smtpPort: '465',
        smtpEncryption: 'SSL' // Options: SSL, TLS, None
    });

    const [showPassword, setShowPassword] = useState(false);
    const [debugLogs, setDebugLogs] = useState([]);
    const [isDebugging, setIsDebugging] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    const logEndRef = useRef(null);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [debugLogs]);

    const handleValueChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const runTestEmail = () => {
        setIsTesting(true);
        // Simulate backend test
        setTimeout(() => {
            setIsTesting(false);
            alert('Success! A test e-mail has been sent to ' + settings.siteEmail);
        }, 1500);
    };

    const runDebug = () => {
        setIsDebugging(true);
        setDebugLogs(["[SYSTEM] Starting Email Deliverability Test..."]);

        const lines = [
            `[AUTH] Connected to SMTP Host: ${settings.smtpHost}`,
            `[AUTH] Authenticating as ${settings.smtpUsername}...`,
            "[AUTH] Authentication success.",
            "[MAIL] Preparing message envelope...",
            "[MAIL] Sending test message to local relay...",
            "[MAIL] Message accepted for delivery.",
            "[INFO] SPF check: PASS",
            "[INFO] DKIM check: PASS",
            "[SYSTEM] Debug completed. Deliverability looks good!"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                setDebugLogs(prev => [...prev, lines[i]]);
                i++;
            } else {
                clearInterval(interval);
                setIsDebugging(false);
            }
        }, 600);
    };

    return (
        <div className="config-container email-setup-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">E-mail Setup</span>
            </nav>

            <h1 className="page-title">E-mail Setup</h1>

            <div className="config-grid">
                {/* Left Column: E-mail Configuration */}
                <div className="grid-column">
                    <div className="config-card">
                        <div className="card-header">
                            <h3>E-mail Configuration</h3>
                        </div>
                        <div className="card-body">
                            <div className="alert-box alert-yellow">
                                <Info size={18} />
                                <p>Your SMTP email username should be same as website email, or at least from same server.</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Site E-mail</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email" className="form-input"
                                        value={settings.siteEmail}
                                        onChange={(e) => handleValueChange('siteEmail', e.target.value)}
                                        placeholder="info@playtubescript.com"
                                    />
                                </div>
                                <p className="form-help">Your website E-mail, it will appear on website’s footer and E-mails.</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contact Us Email</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email" className="form-input"
                                        value={settings.contactEmail}
                                        onChange={(e) => handleValueChange('contactEmail', e.target.value)}
                                    />
                                </div>
                                <p className="form-help">Receive emails from contact us form to this email. This email should not be the same as the default website email.</p>
                            </div>

                            <div className="form-group border-top">
                                <label className="form-label">Server Type</label>
                                <select
                                    className="form-select"
                                    value={settings.serverType}
                                    onChange={(e) => handleValueChange('serverType', e.target.value)}
                                >
                                    <option>Server Mail (Default)</option>
                                    <option>SMTP</option>
                                    <option>Sendmail</option>
                                </select>
                            </div>

                            {settings.serverType === 'SMTP' && (
                                <div className="smtp-fields animate-fade-in">
                                    <div className="form-group">
                                        <label className="form-label">SMTP Host</label>
                                        <input
                                            type="text" className="form-input"
                                            value={settings.smtpHost}
                                            onChange={(e) => handleValueChange('smtpHost', e.target.value)}
                                            placeholder="mail.playtubescript.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">SMTP Username</label>
                                        <input
                                            type="text" className="form-input"
                                            value={settings.smtpUsername}
                                            onChange={(e) => handleValueChange('smtpUsername', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">SMTP Password</label>
                                        <div className="password-wrapper">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-input"
                                                value={settings.smtpPassword}
                                                onChange={(e) => handleValueChange('smtpPassword', e.target.value)}
                                            />
                                            <button className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">SMTP Port</label>
                                        <input
                                            type="number" className="form-input"
                                            value={settings.smtpPort}
                                            onChange={(e) => handleValueChange('smtpPort', e.target.value)}
                                            placeholder="465"
                                        />
                                        <p className="form-help">Most used 587 for TLS, and 465 for SSL encryption.</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">SMTP Encryption</label>
                                        <select
                                            className="form-select"
                                            value={settings.smtpEncryption}
                                            onChange={(e) => handleValueChange('smtpEncryption', e.target.value)}
                                        >
                                            <option>SSL</option>
                                            <option>TLS</option>
                                            <option>None</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="actions mt-24">
                                <button className="btn-test" onClick={runTestEmail} disabled={isTesting}>
                                    {isTesting ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                                    {isTesting ? 'Sending...' : 'Test E-mail Server'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Debug Email Deliverability */}
                <div className="grid-column">
                    <div className="config-card full-height">
                        <div className="card-header">
                            <h3>Debug Email Deliverability</h3>
                        </div>
                        <div className="card-body debug-card-body">
                            <div className="alert-box alert-blue">
                                <ShieldCheck size={18} />
                                <p>This feature will test the Email Deliverability and make sure the system is working fine.</p>
                            </div>

                            <div className="debug-log-wrapper">
                                <div className="debug-log-area">
                                    {debugLogs.length === 0 ? (
                                        <p className="debug-placeholder">Click on Debug Email Deliverability to show test results.</p>
                                    ) : (
                                        debugLogs.map((log, idx) => (
                                            <div key={idx} className="log-line">{log}</div>
                                        ))
                                    )}
                                    <div ref={logEndRef} />
                                </div>
                            </div>

                            <div className="actions mt-auto">
                                <button className="btn-debug" onClick={runDebug} disabled={isDebugging}>
                                    {isDebugging ? <Loader2 size={18} className="spin" /> : <Terminal size={18} />}
                                    {isDebugging ? 'Running Diagnostics...' : 'Debug Email Deliverability'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailSetup;
