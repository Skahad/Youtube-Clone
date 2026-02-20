import React, { useState, useMemo } from 'react';
import {
    ChevronRight, Info, Trash2, Edit2, Check,
    AlertTriangle, X
} from 'lucide-react';
import './ManageCurrencies.css';

const INITIAL_Mock_DATA = [
    { id: 0, code: 'USD', symbol: '$', isDefault: true },
    { id: 1, code: 'EUR', symbol: '€', isDefault: false },
    { id: 2, code: 'JPY', symbol: '¥', isDefault: false },
    { id: 3, code: 'TRY', symbol: '₺', isDefault: false },
    { id: 4, code: 'GBP', symbol: '£', isDefault: false },
    { id: 5, code: 'RUB', symbol: '₽', isDefault: false },
    { id: 6, code: 'PLN', symbol: 'zł', isDefault: false },
    { id: 7, code: 'ILS', symbol: '₪', isDefault: false },
    { id: 8, code: 'BRL', symbol: 'R$', isDefault: false },
    { id: 9, code: 'INR', symbol: '₹', isDefault: false },
];

const ManageCurrencies = () => {
    const [currencies, setCurrencies] = useState(INITIAL_Mock_DATA);
    const [toasts, setToasts] = useState([]);

    // Form State
    const [newCode, setNewCode] = useState('');
    const [newSymbol, setNewSymbol] = useState('');

    // Modal State
    const [editingCurrency, setEditingCurrency] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, isBulk }

    const [selectedIds, setSelectedIds] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const code = newCode.toUpperCase();
        if (currencies.find(c => c.code === code)) {
            showToast('Currency code must be unique', 'error');
            return;
        }

        const newEntry = {
            id: currencies.length > 0 ? Math.max(...currencies.map(c => c.id)) + 1 : 0,
            code: code,
            symbol: newSymbol,
            isDefault: false
        };

        setCurrencies([...currencies, newEntry]);
        setNewCode('');
        setNewSymbol('');
        showToast('Currency added successfully');
    };

    const handleSetDefault = (id) => {
        setCurrencies(prev => prev.map(c => ({
            ...c,
            isDefault: c.id === id
        })));
        showToast('Default currency updated');
    };

    const handleEditSave = () => {
        setCurrencies(prev => prev.map(c => c.id === editingCurrency.id ? editingCurrency : c));
        setEditingCurrency(null);
        showToast('Currency updated successfully');
    };

    const handleDeleteConfirm = () => {
        if (deleteTarget.isBulk) {
            const safeToDelete = selectedIds.filter(id => {
                const c = currencies.find(curr => curr.id === id);
                return c && !c.isDefault;
            });
            setCurrencies(prev => prev.filter(c => !safeToDelete.includes(c.id)));
            setSelectedIds([]);
            showToast(`${safeToDelete.length} currencies deleted`);
        } else {
            setCurrencies(prev => prev.filter(c => c.id !== deleteTarget.id));
            setSelectedIds(prev => prev.filter(id => id !== deleteTarget.id));
            showToast('Currency deleted successfully');
        }
        setDeleteTarget(null);
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(currencies.map(c => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="manage-currencies-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span> <ChevronRight size={14} />
                <span>Settings</span> <ChevronRight size={14} />
                <span className="active">Manage Currencies</span>
            </nav>

            <h1 className="page-title">Manage Currencies</h1>

            <div className="warning-banner">
                <div className="warning-icon"><Info size={20} /></div>
                <p>
                    Please note that not all currencies are supported by PayPal, stripe, 2checkout, alipay.
                    If the currency you adding isn't supported, You can set the default payment currency
                    for each payment method from Payment Settings.
                </p>
            </div>

            <div className="currency-card">
                <div className="card-header"><h2>Add Currency</h2></div>
                <div className="card-content">
                    <form className="currency-form" onSubmit={handleAdd}>
                        <div className="form-group">
                            <label className="form-label">Currency Code (e.g: USD)</label>
                            <input
                                type="text"
                                className="form-input"
                                maxLength={3}
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                                placeholder="Code"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Currency Symbol (e.g: $)</label>
                            <input
                                type="text"
                                className="form-input"
                                value={newSymbol}
                                onChange={(e) => setNewSymbol(e.target.value)}
                                placeholder="Symbol"
                                required
                            />
                        </div>
                        <button className="btn-add" type="submit" disabled={!newCode || !newSymbol}>
                            Add Currency
                        </button>
                    </form>
                </div>
            </div>

            <div className="currency-card">
                <div className="card-header"><h2>Currencies</h2></div>
                <div className="table-container">
                    <table className="currency-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedIds.length === currencies.length && currencies.length > 0}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Currency Code</th>
                                <th>Currency Symbol</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map((currency) => (
                                <tr key={currency.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(currency.id)}
                                            onChange={() => toggleSelect(currency.id)}
                                        />
                                    </td>
                                    <td>{currency.id}</td>
                                    <td>{currency.code}</td>
                                    <td>{currency.symbol}</td>
                                    <td>
                                        {currency.isDefault && (
                                            <span className="status-default">
                                                <Check size={14} /> Default
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {!currency.isDefault && (
                                                <button className="btn-row default" onClick={() => handleSetDefault(currency.id)}>Set Default</button>
                                            )}
                                            <button className="btn-row edit" onClick={() => setEditingCurrency({ ...currency })}><Edit2 size={12} /> Edit</button>
                                            <button
                                                className="btn-row delete"
                                                disabled={currency.isDefault}
                                                onClick={() => setDeleteTarget({ id: currency.id, isBulk: false })}
                                            >
                                                <Trash2 size={12} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bulk-footer">
                    <button
                        className="btn-bulk-delete"
                        disabled={selectedIds.length === 0}
                        onClick={() => setDeleteTarget({ id: null, isBulk: true })}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingCurrency && (
                <div className="modal-overlay">
                    <div className="edit-modal">
                        <div className="edit-modal-header">
                            <h2 className="card-title">Edit Currency</h2>
                            <button className="btn-close" onClick={() => setEditingCurrency(null)}><X size={20} /></button>
                        </div>
                        <div className="edit-modal-content">
                            <div className="currency-form">
                                <div className="form-group">
                                    <label className="form-label">Currency Code</label>
                                    <input type="text" className="form-input" value={editingCurrency.code} disabled />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Currency Symbol</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editingCurrency.symbol}
                                        onChange={(e) => setEditingCurrency({ ...editingCurrency, symbol: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-modal-footer">
                            <button className="btn-modal cancel" onClick={() => setEditingCurrency(null)}>Cancel</button>
                            <button className="btn-modal confirm btn-save" onClick={handleEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <div className="modal-icon"><AlertTriangle size={32} /></div>
                        <h3 className="modal-title">Delete Currency</h3>
                        <p className="modal-desc">
                            Are you sure you want to delete {deleteTarget.isBulk ? `${selectedIds.filter(id => !currencies.find(c => c.id === id)?.isDefault).length} selected` : 'this'} currency? This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-modal cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
                            <button className="btn-modal confirm" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type}`}>
                        {t.type === 'success' ? <Check size={18} /> : (t.type === 'error' ? <X size={18} /> : <AlertTriangle size={18} />)}
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCurrencies;
