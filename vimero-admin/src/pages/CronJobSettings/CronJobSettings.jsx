import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Home, Copy, Check, Clock, AlertTriangle
} from 'lucide-react';
import './CronJobSettings.css';

const CronJobSettings = () => {
    const [lastRun, setLastRun] = useState('19-02-2026 08:50:07');
    const [isCopied, setIsCopied] = useState(false);
    const [toast, setToast] = useState(null);

    const cronCommand = '*/5 * * * * curl https://demo.playtubescript.com/cronjob.php &>/dev/null';

    useEffect(() => {
        // Simulating fetching last run time
        const now = new Date();
        const formatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        // setLastRun(formatted);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(cronCommand).then(() => {
            setIsCopied(true);
            showToast('Command copied to clipboard!');
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="config-container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Settings</span>
                <ChevronRight size={14} />
                <span className="active">CronJob Settings</span>
            </nav>

            <h1 className="page-title">CronJob Settings</h1>

            <div className="cron-page-layout">
                <div className="cron-card">
                    {/* Warning Header */}
                    <div className="cron-warning">
                        <div className="warning-icon">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="warning-text">
                            Make sure to add this cronjob to your crontab list, the target file is: <span className="highlight">cronjob.php</span>, should run every 5 minutes as the command below:
                        </div>
                    </div>

                    <div className="card-content">
                        {/* Command Field */}
                        <div className="form-group">
                            <label className="form-label">CronJob Command</label>
                            <div className="copy-input-wrapper">
                                <input
                                    type="text"
                                    className="form-input read-only"
                                    value={cronCommand}
                                    readOnly
                                />
                                <button
                                    className={`btn-copy ${isCopied ? 'success' : ''}`}
                                    onClick={handleCopy}
                                    title="Copy command"
                                >
                                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Last Run Field */}
                        <div className="form-group">
                            <label className="form-label">CronJob Last Run</label>
                            <div className="last-run-wrapper">
                                <div className="last-run-icon">
                                    <Clock size={16} />
                                </div>
                                <input
                                    type="text"
                                    className="form-input read-only"
                                    value={lastRun}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className="toast-notification">
                    <CheckCircle2 size={18} />
                    <span>Cron job URL copied to clipboard!</span>
                </div>
            )}
        </div>
    );
};

export default CronJobSettings;
