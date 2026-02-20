import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Home, ShieldAlert, CheckCircle, XCircle,
    Eye, Trash2, Check, ArrowUpDown, Filter, Search,
    ChevronLeft, ChevronRight as ChevronRightIcon,
    AlertTriangle, User, Calendar, FileText, Image as ImageIcon
} from 'lucide-react';
import './ManageVerificationRequests.css';

const ManageVerificationRequests = () => {
    // Mock Data
    const initialRequests = [
        { id: 506, username: 'CodeLayer', requested: '2026-January-31', status: 'Pending', name: 'John Doe', email: 'john@codelayer.com', documentType: 'ID Card' },
        { id: 505, username: 'masterofhomes', requested: '2026-January-09', status: 'Pending', name: 'Sarah Wilson', email: 'sarah@homes.com', documentType: 'Passport' },
        { id: 504, username: 'nlombomo', requested: '2025-December-30', status: 'Pending', name: 'Nicolas L.', email: 'nl@test.com', documentType: 'Driver License' },
        { id: 503, username: 'laila88', requested: '2025-November-06', status: 'Verified', name: 'Laila Ahmed', email: 'laila@web.com', documentType: 'ID Card' },
        { id: 502, username: 'dev_expert', requested: '2025-October-15', status: 'Rejected', name: 'Mike Ross', email: 'mike@dev.com', documentType: 'Passport' },
        { id: 501, username: 'pixel_perfect', requested: '2025-October-01', status: 'Pending', name: 'Anna Smith', email: 'anna@pixel.com', documentType: 'ID Card' },
    ];

    const [requests, setRequests] = useState(initialRequests);
    const [filteredRequests, setFilteredRequests] = useState(initialRequests);
    const [filter, setFilter] = useState('All');
    const [verifiedInSession, setVerifiedInSession] = useState([]); // Track IDs verified in current view session
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [toast, setToast] = useState(null);

    // Modal States
    const [viewModal, setViewModal] = useState(null);
    const [confirmModal, setConfirmModal] = useState(null); // { type: 'verify' | 'delete' | 'bulk-delete', data: any }

    // Clear session-verified items when changing filter
    useEffect(() => {
        setVerifiedInSession([]);
    }, [filter]);

    useEffect(() => {
        let result = [...requests];

        // Filter by Status
        if (filter !== 'All') {
            result = result.filter(req => req.status === filter || (filter === 'Pending' && verifiedInSession.includes(req.id)));
        }

        // Search
        if (searchTerm) {
            result = result.filter(req =>
                req.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.id.toString().includes(searchTerm)
            );
        }

        // Sort
        result.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredRequests(result);
        setCurrentPage(1);
    }, [requests, filter, searchTerm, sortConfig]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(filteredRequests.map(r => r.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleVerify = (id) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: 'Verified' } : req
        ));
        setVerifiedInSession(prev => [...prev, id]);
        setConfirmModal(null);
        showToast('User verified successfully!');
    };

    const handleDelete = (id) => {
        setRequests(prev => prev.filter(req => req.id !== id));
        setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        setConfirmModal(null);
        showToast('Verification request deleted successfully!', 'error');
    };

    const handleBulkDelete = () => {
        setRequests(prev => prev.filter(req => !selectedRows.includes(req.id)));
        setSelectedRows([]);
        setConfirmModal(null);
        showToast(`${selectedRows.length} requests deleted successfully!`, 'error');
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    return (
        <div className="manage-verification-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Users</span>
                <ChevronRight size={14} />
                <span className="active">Manage Verification Requests</span>
            </nav>

            <header className="page-header">
                <h1 className="page-title">Manage Verification Requests</h1>
            </header>

            <div className="content-card">
                <div className="card-header">
                    <h2 className="card-title">Manage Verification Requests</h2>
                    <div className="header-actions">
                        {selectedRows.length > 0 && (
                            <button
                                className="btn-bulk-delete"
                                onClick={() => setConfirmModal({ type: 'bulk-delete' })}
                            >
                                <Trash2 size={16} />
                                Delete Selected ({selectedRows.length})
                            </button>
                        )}
                        <div className="filter-wrapper">
                            <Filter size={16} className="filter-icon" />
                            <select
                                className="status-filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Verified">Verified</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="table-controls">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by ID or Username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="verification-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedRows.length === filteredRequests.length && filteredRequests.length > 0}
                                    />
                                </th>
                                <th onClick={() => handleSort('id')} className="sortable">
                                    ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Username</th>
                                <th onClick={() => handleSort('requested')} className="sortable">
                                    Requested {sortConfig.key === 'requested' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map(req => (
                                    <tr key={req.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(req.id)}
                                                onChange={() => handleSelectRow(req.id)}
                                            />
                                        </td>
                                        <td>{req.id}</td>
                                        <td className="user-cell">
                                            <div className="avatar-sm">{req.username.charAt(0).toUpperCase()}</div>
                                            <span>{req.username}</span>
                                        </td>
                                        <td>{req.requested}</td>
                                        <td>
                                            <span className={`status-badge ${req.status.toLowerCase()}`}>
                                                {req.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="action-cell">
                                            <button className="btn-icon btn-view" onClick={() => setViewModal(req)} title="View Documents">
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn-icon btn-verify" onClick={() => setConfirmModal({ type: 'verify', data: req })} title="Verify User">
                                                <CheckCircle size={16} />
                                            </button>
                                            <button className="btn-icon btn-delete" onClick={() => setConfirmModal({ type: 'delete', data: req })} title="Delete Request">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="empty-state">
                                        No verification requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <div className="pagination-info">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length} entries
                    </div>
                    <div className="pagination-btns">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={currentPage === i + 1 ? 'active' : ''}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <ChevronRightIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {viewModal && (
                <div className="modal-overlay">
                    <div className="modal-container view-modal">
                        <div className="modal-header">
                            <h3>Verification Request Detail</h3>
                            <button className="close-btn" onClick={() => setViewModal(null)}><XCircle size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-item">
                                    <label><User size={14} /> Full Name</label>
                                    <p>{viewModal.name}</p>
                                </div>
                                <div className="info-item">
                                    <label><Home size={14} /> Username</label>
                                    <p>{viewModal.username}</p>
                                </div>
                                <div className="info-item">
                                    <label><Calendar size={14} /> Requested On</label>
                                    <p>{viewModal.requested}</p>
                                </div>
                                <div className="info-item">
                                    <label><FileText size={14} /> Document Type</label>
                                    <p>{viewModal.documentType}</p>
                                </div>
                            </div>
                            <div className="document-preview">
                                <label><ImageIcon size={14} /> Submitted Document</label>
                                <div className="image-placeholder">
                                    <FileText size={48} />
                                    <span>{viewModal.documentType} Preview</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setViewModal(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modals */}
            {confirmModal && (
                <div className="modal-overlay">
                    <div className="modal-container confirm-modal">
                        <div className="modal-header">
                            <h3 className={confirmModal.type === 'delete' || confirmModal.type === 'bulk-delete' ? 'text-danger' : 'text-success'}>
                                {confirmModal.type === 'verify' ? 'Confirm Verification' : 'Confirm Deletion'}
                            </h3>
                        </div>
                        <div className="modal-body">
                            <div className="confirm-content">
                                {confirmModal.type === 'verify' ? (
                                    <>
                                        <CheckCircle size={48} className="icon-success" />
                                        <p>Are you sure you want to verify <strong>{confirmModal.data.username}</strong>?</p>
                                        <span className="sub-text">The user's account will be updated with a verified badge.</span>
                                    </>
                                ) : confirmModal.type === 'delete' ? (
                                    <>
                                        <AlertTriangle size={48} className="icon-danger" />
                                        <p>Are you sure you want to delete verification request for <strong>{confirmModal.data.username}</strong>?</p>
                                        <span className="sub-text">This action cannot be undone.</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertTriangle size={48} className="icon-danger" />
                                        <p>Are you sure you want to delete <strong>{selectedRows.length}</strong> selected verification requests?</p>
                                        <span className="sub-text">This will permanently remove all selected requests.</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setConfirmModal(null)}>Cancel</button>
                            <button
                                className={`btn-primary ${confirmModal.type === 'delete' || confirmModal.type === 'bulk-delete' ? 'bg-danger' : 'bg-success'}`}
                                onClick={() => {
                                    if (confirmModal.type === 'verify') handleVerify(confirmModal.data.id);
                                    else if (confirmModal.type === 'delete') handleDelete(confirmModal.data.id);
                                    else handleBulkDelete();
                                }}
                            >
                                {confirmModal.type === 'verify' ? 'Yes, Verify' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Standard Global Toast */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageVerificationRequests;
