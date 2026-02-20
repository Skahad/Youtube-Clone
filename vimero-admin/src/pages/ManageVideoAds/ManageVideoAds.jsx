import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Layout,
    Save,
    Info,
    Loader2,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Settings
} from 'lucide-react';
import './ManageVideoAds.css';

const ManageVideoAds = () => {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        preRoll: '',
        midRollEnabled: true,
        midRollTime: '25%',
        midRollCode: '',
        postRoll: '',
        sidebarAd: '',
        overlayEnabled: true,
        overlayPos: 'bottom',
        overlayCode: ''
    });

    // Load saved data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('playtube_video_ads');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Warn on unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    };

    const handleSave = () => {
        setLoading(true);
        // Simulate AJAX request
        setTimeout(() => {
            localStorage.setItem('playtube_video_ads', JSON.stringify(formData));
            setLoading(false);
            setHasUnsavedChanges(false);
            showToast('Video Advertisement settings saved successfully!');
        }, 1500);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const Toggle = ({ active, onClick }) => (
        <div
            className={`toggle-switch ${active ? 'on' : ''}`}
            onClick={onClick}
        >
            <div className="toggle-handle" />
        </div>
    );

    return (
        <div className="video-ads-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span className="breadcrumb-item">Admin Panel</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item">Advertisements</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item active">Manage Video Ads</span>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Manage Video Ads</h1>
            </div>

            {/* Main Card */}
            <div className="ads-card">
                <h2 className="card-title">Manage Video Ads</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* 1. Pre-Roll Ad */}
                    <div className="ad-section">
                        <div className="section-header">
                            <label className="section-title">
                                Video Pre-Roll Ad
                                <Info size={14} title="Appears before a video starts playing" />
                            </label>
                            <p className="section-desc">Appears before a video starts playing. Supports HTML, JavaScript, VAST tag, or Google IMA code.</p>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='<script type="text/javascript">...</script>'
                            value={formData.preRoll}
                            onChange={(e) => handleChange('preRoll', e.target.value)}
                        />
                    </div>

                    {/* 2. Mid-Roll Ad */}
                    <div className="ad-section">
                        <div className="section-header">
                            <label className="section-title">
                                Video Mid-Roll Ad
                                <Info size={14} title="Appears during video playback at configured timestamps" />
                            </label>
                            <p className="section-desc">Appears during video playback at configured timestamps.</p>
                        </div>
                        <div className="ad-controls">
                            <div className="control-item">
                                <span className="control-label">Status</span>
                                <Toggle
                                    active={formData.midRollEnabled}
                                    onClick={() => handleChange('midRollEnabled', !formData.midRollEnabled)}
                                />
                            </div>
                            <div className="control-item">
                                <span className="control-label">Timestamp</span>
                                <select
                                    className="ad-select"
                                    value={formData.midRollTime}
                                    onChange={(e) => handleChange('midRollTime', e.target.value)}
                                    disabled={!formData.midRollEnabled}
                                >
                                    <option value="25%">25%</option>
                                    <option value="50%">50%</option>
                                    <option value="75%">75%</option>
                                </select>
                            </div>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Enter ad code here...'
                            value={formData.midRollCode}
                            onChange={(e) => handleChange('midRollCode', e.target.value)}
                            disabled={!formData.midRollEnabled}
                        />
                    </div>

                    {/* 3. Post-Roll Ad */}
                    <div className="ad-section">
                        <div className="section-header">
                            <label className="section-title">
                                Video Post-Roll Ad
                                <Info size={14} title="Appears after video ends" />
                            </label>
                            <p className="section-desc">Appears after video ends.</p>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Enter ad code here...'
                            value={formData.postRoll}
                            onChange={(e) => handleChange('postRoll', e.target.value)}
                        />
                    </div>

                    {/* 4. Video Sidebar Ad */}
                    <div className="ad-section">
                        <div className="section-header">
                            <label className="section-title">
                                Video Sidebar Ad
                                <Info size={14} title="Appears next to the video player on watch page" />
                            </label>
                            <p className="section-desc">Appears next to the video player on watch page.</p>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Enter ad HTML here...'
                            value={formData.sidebarAd}
                            onChange={(e) => handleChange('sidebarAd', e.target.value)}
                        />
                    </div>

                    {/* 5. Video Overlay Ad */}
                    <div className="ad-section">
                        <div className="section-header">
                            <label className="section-title">
                                Video Overlay Ad
                                <Info size={14} title="Small overlay banner displayed on video player" />
                            </label>
                            <p className="section-desc">Small overlay banner displayed on video player.</p>
                        </div>
                        <div className="ad-controls">
                            <div className="control-item">
                                <span className="control-label">Status</span>
                                <Toggle
                                    active={formData.overlayEnabled}
                                    onClick={() => handleChange('overlayEnabled', !formData.overlayEnabled)}
                                />
                            </div>
                            <div className="control-item">
                                <span className="control-label">Position</span>
                                <select
                                    className="ad-select"
                                    value={formData.overlayPos}
                                    onChange={(e) => handleChange('overlayPos', e.target.value)}
                                    disabled={!formData.overlayEnabled}
                                >
                                    <option value="bottom">Bottom</option>
                                    <option value="top">Top</option>
                                </select>
                            </div>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Enter overlay ad code...'
                            value={formData.overlayCode}
                            onChange={(e) => handleChange('overlayCode', e.target.value)}
                            disabled={!formData.overlayEnabled}
                        />
                    </div>

                    {/* Save Button */}
                    <div className="form-footer">
                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="spinner" size={18} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageVideoAds;
