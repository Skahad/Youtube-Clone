import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Home,
    Save,
    Loader2,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import './ManageWebsiteAds.css';

const ManageWebsiteAds = () => {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        header: '',
        footer: '',
        watchSidebar: '',
        watchComments: ''
    });

    // Load saved data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('playtube_website_ads');
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
            localStorage.setItem('playtube_website_ads', JSON.stringify(formData));
            setLoading(false);
            setHasUnsavedChanges(false);
            showToast('Website ads updated successfully');
        }, 1500);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="website-ads-page">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <span className="breadcrumb-item">Admin Panel</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item">Advertisements</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item active">Manage Website Ads</span>
            </div>

            {/* Page Header Section */}
            <div className="page-header">
                <h1 className="page-title">Manage Website Ads</h1>
            </div>

            {/* Main Card Container */}
            <div className="ads-card">
                <div className="card-header">
                    <h2 className="card-title">Manage Website Ads</h2>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Header Ad Section */}
                    <div className="ad-form-section">
                        <div className="ad-label-container">
                            <label className="ad-label">Header</label>
                            <span className="ad-description">(Appears on all pages right under the nav bar)</span>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Paste your ad code here'
                            value={formData.header}
                            onChange={(e) => handleChange('header', e.target.value)}
                        />
                    </div>

                    {/* Footer Ad Section */}
                    <div className="ad-form-section">
                        <div className="ad-label-container">
                            <label className="ad-label">Footer</label>
                            <span className="ad-description">(Appears on all pages right before the footer)</span>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Paste your ad code here'
                            value={formData.footer}
                            onChange={(e) => handleChange('footer', e.target.value)}
                        />
                    </div>

                    {/* Watch Page Sidebar Ad */}
                    <div className="ad-form-section">
                        <div className="ad-label-container">
                            <label className="ad-label">Watch Page Sidebar</label>
                            <span className="ad-description">(Appears on watching page above the related videos section)</span>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Paste your ad code here'
                            value={formData.watchSidebar}
                            onChange={(e) => handleChange('watchSidebar', e.target.value)}
                        />
                    </div>

                    {/* Watch Comments Ad */}
                    <div className="ad-form-section">
                        <div className="ad-label-container">
                            <label className="ad-label">Watch Comments</label>
                            <span className="ad-description">(Appears on watching page above the comments section)</span>
                        </div>
                        <textarea
                            className="ad-textarea"
                            placeholder='Paste your ad code here'
                            value={formData.watchComments}
                            onChange={(e) => handleChange('watchComments', e.target.value)}
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
                                <Loader2 className="spinner" size={18} />
                            ) : (
                                <Save size={18} />
                            )}
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Success/Error toast notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageWebsiteAds;
