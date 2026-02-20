import React, { useState, useEffect } from 'react';
import {
    CheckCircle2,
    XCircle,
    FileText,
    Check,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight,
    Search,
    Download,
    Menu,
    Receipt,
    AlertTriangle,
    Loader2,
    Info
} from 'lucide-react';
import './ManageBankReceipts.css';

const generateMockReceipts = (count) => {
    const usernames = ['Aman_88', 'Sarah_K', 'David_Dev', 'Emma_B', 'Liam_J', 'Noah_S', 'Ava_Z', 'Oliver_M', 'Sophia_L', 'Mason_W'];
    const currencies = ['USD', 'EUR', 'GBP'];
    const data = [];

    for (let i = 1; i <= count; i++) {
        const username = usernames[Math.floor(Math.random() * usernames.length)];
        data.push({
            id: i,
            user_id: 100 + i,
            username: `${username}_${i}`,
            avatar: username.charAt(0),
            amount: parseFloat((Math.random() * 2000 + 50).toFixed(2)),
            currency: currencies[Math.floor(Math.random() * currencies.length)],
            date: `2024-03-${Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')} ${Math.floor(Math.random() * 12 + 10)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
            status: 'pending',
            receipt_image: `https://placehold.co/800x1200/f8f9fa/3ea6ff?text=Bank+Receipt+Sample+${i}`
        });
    }
    return data;
};

const initialReceipts = generateMockReceipts(100);

const ManageBankReceipts = () => {
    // Load from localStorage or use initial values
    const [receipts, setReceipts] = useState(() => {
        const saved = localStorage.getItem('playtube_bank_receipts');
        const parsed = saved ? JSON.parse(saved) : [];
        // Re-seed if no data or outdated mock data (optional: check count)
        return parsed.length >= 100 ? parsed : initialReceipts;
    });

    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('playtube_receipt_stats');
        return saved ? JSON.parse(saved) : { approved: 124, disapproved: 12 };
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // 'approve' or 'delete'
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        localStorage.setItem('playtube_bank_receipts', JSON.stringify(receipts));
        localStorage.setItem('playtube_receipt_stats', JSON.stringify(stats));
    }, [receipts, stats]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAction = (receipt, action) => {
        setSelectedReceipt(receipt);
        setConfirmAction(action);
        setIsConfirmModalOpen(true);
    };

    const confirmHandleAction = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            if (confirmAction === 'approve') {
                setReceipts(receipts.filter(r => r.id !== selectedReceipt.id));
                setStats(prev => ({ ...prev, approved: prev.approved + 1 }));
                showToast(`Bank receipt from ${selectedReceipt.username} approved!`);
            } else {
                setReceipts(receipts.filter(r => r.id !== selectedReceipt.id));
                setStats(prev => ({ ...prev, disapproved: prev.disapproved + 1 }));
                showToast(`Bank receipt from ${selectedReceipt.username} removed.`, 'warning');
            }
            setIsConfirmModalOpen(false);
            setLoading(false);
        }, 1500);
    };

    const openReceipt = (receipt) => {
        setSelectedReceipt(receipt);
        setIsReceiptModalOpen(true);
    };

    // Pagination
    const filteredReceipts = receipts.filter(r =>
        r.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.user_id.toString().includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
    const currentData = filteredReceipts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bank-receipts-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Payments & Ads</span>
                <ChevronRight size={14} />
                <span className="active">Manage Bank Receipts</span>
            </nav>

            <h1 className="page-title">Manage Bank Receipts</h1>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper green">
                        <Receipt size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.approved}</h3>
                        <p>Approved receipts</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper red">
                        <Receipt size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.disapproved}</h3>
                        <p>Disapproved receipts</p>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="manage-receipts-card">
                <div className="card-header">
                    <h2>Manage bank receipts</h2>
                </div>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>USER</th>
                                <th>TYPE</th>
                                <th style={{ textAlign: 'right' }}>PRICE</th>
                                <th>CREATED</th>
                                <th>RECEIPT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((receipt) => (
                                    <tr key={receipt.id}>
                                        <td>
                                            <div className="user-info-cell">
                                                <div className="user-avatar">{receipt.avatar}</div>
                                                <div className="user-details">
                                                    <span className="username" title={`User ID: ${receipt.user_id}`}>
                                                        {receipt.username}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="type-tag">Wallet</span>
                                        </td>
                                        <td className="price-cell">
                                            {receipt.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {receipt.currency}
                                        </td>
                                        <td className="text-secondary">
                                            {receipt.date}
                                        </td>
                                        <td>
                                            <button className="btn-receipt" onClick={() => openReceipt(receipt)}>
                                                <FileText size={16} />
                                                Show Receipt
                                            </button>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button
                                                    className="btn-action approve"
                                                    title="Approve"
                                                    onClick={() => handleAction(receipt, 'approve')}
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    className="btn-action delete"
                                                    title="Delete"
                                                    onClick={() => handleAction(receipt, 'delete')}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>
                                        No pending bank receipts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredReceipts.length > 0 && (
                    <div className="table-footer">
                        <div className="pagination-info">
                            Showing {Math.min(filteredReceipts.length, (currentPage - 1) * itemsPerPage + 1)} out of {filteredReceipts.length}
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="page-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                className="page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Receipt Modal */}
            {isReceiptModalOpen && selectedReceipt && (
                <div className="modal-overlay" onClick={() => setIsReceiptModalOpen(false)}>
                    <div className="receipt-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Receipt from {selectedReceipt.username}</h3>
                            <button className="modal-close" onClick={() => setIsReceiptModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="receipt-content">
                            <img src={selectedReceipt.receipt_image} alt="Bank Receipt" className="receipt-image" />
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            {isConfirmModalOpen && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <div className={`confirm-icon ${confirmAction === 'delete' ? 'danger' : ''}`}>
                            {confirmAction === 'approve' ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                        </div>
                        <h3>{confirmAction === 'approve' ? 'Approve bank receipt?' : 'Delete receipt?'}</h3>
                        <p>
                            {confirmAction === 'approve'
                                ? `The user ${selectedReceipt.username} will be credited with their wallet amount.`
                                : 'This action cannot be undone. Are you sure you want to delete this receipt?'}
                        </p>
                        <div className="confirm-actions">
                            <button className="btn-cancel" onClick={() => setIsConfirmModalOpen(false)} disabled={loading}>
                                Cancel
                            </button>
                            <button
                                className={`btn-confirm ${confirmAction === 'delete' ? 'danger' : ''}`}
                                onClick={confirmHandleAction}
                                disabled={loading}
                            >
                                {loading ? <Loader2 size={18} className="spinner" /> : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageBankReceipts;
