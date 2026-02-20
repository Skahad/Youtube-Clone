import React, { useState } from 'react';
import {
    ChevronRight, Home, Pencil, Trash2, Ban,
    CheckCircle2, Globe, AlertTriangle, X
} from 'lucide-react';
import './ManageLanguages.css';

const ManageLanguages = () => {
    const [languages, setLanguages] = useState([
        { id: 1, name: 'English', iso: 'en', enabled: true, isDefault: true },
        { id: 2, name: 'Arabic', iso: 'ar', enabled: true, isDefault: false },
        { id: 3, name: 'Dutch', iso: 'nl', enabled: false, isDefault: false },
        { id: 4, name: 'French', iso: 'fr', enabled: true, isDefault: false },
        { id: 5, name: 'German', iso: 'de', enabled: true, isDefault: false },
        { id: 6, name: 'Russian', iso: 'ru', enabled: true, isDefault: false }
    ]);

    const [selectedIds, setSelectedIds] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(languages.map(l => l.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleStatus = (id) => {
        const lang = languages.find(l => l.id === id);
        if (lang.isDefault) {
            showToast('Cannot disable default language!', 'error');
            return;
        }

        setLanguages(prev => prev.map(l =>
            l.id === id ? { ...l, enabled: !l.enabled } : l
        ));
        showToast(`Language ${lang.enabled ? 'disabled' : 'enabled'} successfully.`);
    };

    const confirmDelete = (id) => {
        const lang = languages.find(l => l.id === id);
        if (lang.isDefault) {
            showToast('Cannot delete default language!', 'error');
            return;
        }
        setShowDeleteModal(lang);
    };

    const handleDelete = () => {
        setLanguages(prev => prev.filter(l => l.id !== showDeleteModal.id));
        showToast('Language deleted successfully.');
        setShowDeleteModal(null);
    };

    const handleEdit = (id) => {
        const lang = languages.find(l => l.id === id);
        showToast(`Navigating to Edit ${lang.name} translation keys...`);
    };

    return (
        <div className="config-container manage-langs-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <ChevronRight size={14} />
                <span>Languages</span>
                <ChevronRight size={14} />
                <span className="active">Manage Languages</span>
            </nav>

            <h1 className="page-title">Manage Languages</h1>

            <div className="card main-table-card">
                <div className="card-header">
                    <h2>Manage & Edit Languages</h2>
                </div>
                <div className="card-body no-padding">
                    <div className="table-wrapper">
                        <table className="lang-table">
                            <thead>
                                <tr>
                                    <th className="col-check">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedIds.length === languages.length && languages.length > 0}
                                        />
                                    </th>
                                    <th className="col-name">LANGUAGE NAME</th>
                                    <th className="col-actions">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map((lang) => (
                                    <tr key={lang.id} className={selectedIds.includes(lang.id) ? 'row-selected' : ''}>
                                        <td className="col-check">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(lang.id)}
                                                onChange={() => handleSelectOne(lang.id)}
                                            />
                                        </td>
                                        <td className="col-name">
                                            <div className="lang-entity">
                                                <span className="name-text">{lang.name}</span>
                                                {lang.isDefault && <span className="default-badge">DEFAULT</span>}
                                            </div>
                                        </td>
                                        <td className="col-actions">
                                            <div className="action-stack">
                                                <button
                                                    className="btn-action edit"
                                                    onClick={() => handleEdit(lang.id)}
                                                    title="Edit Translation"
                                                >
                                                    <Pencil size={14} />
                                                    EDIT
                                                </button>
                                                <button
                                                    className="btn-action delete"
                                                    onClick={() => confirmDelete(lang.id)}
                                                    title="Delete Language"
                                                >
                                                    <Trash2 size={14} />
                                                    DELETE
                                                </button>
                                                <button
                                                    className={`btn-action btn-status ${lang.enabled ? 'disable' : 'enable'}`}
                                                    onClick={() => toggleStatus(lang.id)}
                                                    title={lang.enabled ? 'Disable Language' : 'Enable Language'}
                                                >
                                                    {lang.enabled ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                                                    <span>{lang.enabled ? 'DISABLE' : 'ENABLE'}</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Language</h3>
                            <button className="close-btn" onClick={() => setShowDeleteModal(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <strong>{showDeleteModal.name}</strong>? This action cannot be undone and will remove all associated translation keys.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowDeleteModal(null)}>Cancel</button>
                            <button className="btn-danger" onClick={handleDelete}>Yes, Delete it</button>
                        </div>
                    </div>
                </div>
            )}

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

export default ManageLanguages;
