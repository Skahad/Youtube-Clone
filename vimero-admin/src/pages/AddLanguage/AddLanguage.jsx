import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Home, Plus, Globe, Languages,
    Save, CheckCircle2, AlertTriangle, Loader2
} from 'lucide-react';
import './AddLanguage.css';

const AddLanguage = () => {
    // Left Card: Language Form
    const [langForm, setLangForm] = useState({ name: '', iso: '' });
    const [langErrors, setLangErrors] = useState({ name: '', iso: '' });
    const [isLangLoading, setIsLangLoading] = useState(false);

    // Right Card: Key Form
    const [keyForm, setKeyForm] = useState({ name: '' });
    const [keyError, setKeyError] = useState('');
    const [isKeyLoading, setIsKeyLoading] = useState(false);

    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Language Name Validation: Lowercase English letters only, no spaces
    const validateLangName = (val) => {
        const regex = /^[a-z]+$/;
        if (!val) return 'Language Name is required';
        if (!regex.test(val)) return 'Use only english letters, no spaces allowed. E.g: russian';
        return '';
    };

    // ISO Validation: Lowercase letters only, max 5, no spaces
    const validateIso = (val) => {
        const regex = /^[a-z]+$/;
        if (!val) return 'Language ISO is required';
        if (!regex.test(val)) return 'Write the language ISO code. E.g for russian: ru';
        if (val.length > 5) return 'ISO code too long (max 5 chars)';
        return '';
    };

    // Key Name Validation: English letters, underscores, no spaces
    const validateKeyName = (val) => {
        const regex = /^[a-zA-Z_]+$/;
        if (!val) return 'Key Name is required';
        if (!regex.test(val)) return 'Use only english letters, no spaces allowed, example: this_is_a_key';
        return '';
    };

    const handleLangChange = (field, value) => {
        const trimmed = value.trim();
        setLangForm(prev => ({ ...prev, [field]: trimmed }));
        if (field === 'name') setLangErrors(prev => ({ ...prev, name: validateLangName(trimmed) }));
        if (field === 'iso') setLangErrors(prev => ({ ...prev, iso: validateIso(trimmed) }));
    };

    const handleKeyChange = (value) => {
        const trimmed = value.trim();
        setKeyForm({ name: trimmed });
        setKeyError(validateKeyName(trimmed));
    };

    const handleAddLanguage = (e) => {
        e.preventDefault();
        setIsLangLoading(true);
        setTimeout(() => {
            setIsLangLoading(false);
            showToast('Language added successfully!');
            setLangForm({ name: '', iso: '' });
        }, 1500);
    };

    const handleAddKey = (e) => {
        e.preventDefault();
        setIsKeyLoading(true);
        setTimeout(() => {
            setIsKeyLoading(false);
            showToast('Key added successfully!');
            setKeyForm({ name: '' });
        }, 1500);
    };

    const isLangValid = langForm.name && langForm.iso && !langErrors.name && !langErrors.iso;
    const isKeyValid = keyForm.name && !keyError;

    return (
        <div className="config-container add-language-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <ChevronRight size={14} />
                <span>Languages</span>
                <ChevronRight size={14} />
                <span className="active">Add New Language & Key</span>
            </nav>

            <h1 className="page-title">Add New Language & Key</h1>

            <div className="lang-grid">
                {/* Left Card: Add New Language */}
                <div className="card">
                    <div className="card-header">
                        <h2>Add New Language</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddLanguage}>
                            <div className="form-group">
                                <label className="form-label">Language Name</label>
                                <input
                                    type="text"
                                    className={`form-input ${langErrors.name ? 'input-error' : ''}`}
                                    value={langForm.name}
                                    onChange={(e) => handleLangChange('name', e.target.value)}
                                    placeholder="e.g. russian"
                                />
                                {langErrors.name ? (
                                    <p className="error-text">{langErrors.name}</p>
                                ) : (
                                    <p className="form-help">Use only english letters, no spaces allowed. E.g: russian</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Language ISO</label>
                                <input
                                    type="text"
                                    className={`form-input ${langErrors.iso ? 'input-error' : ''}`}
                                    value={langForm.iso}
                                    onChange={(e) => handleLangChange('iso', e.target.value)}
                                    placeholder="e.g. ru"
                                    maxLength={5}
                                />
                                {langErrors.iso ? (
                                    <p className="error-text">{langErrors.iso}</p>
                                ) : (
                                    <p className="form-help">Write the language ISO code. E.g for russian: ru</p>
                                )}
                            </div>

                            <div className="note-text mt-24">
                                Note: This may take up to 5 minutes.
                            </div>

                            <button
                                type="submit"
                                className="btn-primary-blue mt-24"
                                disabled={!isLangValid || isLangLoading}
                            >
                                {isLangLoading ? <Loader2 className="spinner" size={18} /> : 'Add Language'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Card: Add New Key */}
                <div className="card">
                    <div className="card-header">
                        <h2>Add New Key</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddKey}>
                            <div className="form-group">
                                <label className="form-label">Key Name</label>
                                <input
                                    type="text"
                                    className={`form-input ${keyError ? 'input-error' : ''}`}
                                    value={keyForm.name}
                                    onChange={(e) => handleKeyChange(e.target.value)}
                                    placeholder="e.g. this_is_a_key"
                                />
                                {keyError ? (
                                    <p className="error-text">{keyError}</p>
                                ) : (
                                    <p className="form-help">Use only english letters, no spaces allowed, example: this_is_a_key</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn-primary-blue mt-24"
                                disabled={!isKeyValid || isKeyLoading}
                            >
                                {isKeyLoading ? <Loader2 className="spinner" size={18} /> : 'Add Key'}
                            </button>
                        </form>
                    </div>
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

export default AddLanguage;
