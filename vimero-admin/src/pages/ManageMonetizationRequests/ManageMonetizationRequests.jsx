import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Home, Coins, CheckCircle, XCircle,
    Eye, Trash2, Check, ArrowUpDown, Filter, Search,
    ChevronLeft, ChevronRight as ChevronRightIcon,
    AlertTriangle, User, Calendar, FileText, BarChart3,
    Ban, ShieldCheck
} from 'lucide-react';
import './ManageMonetizationRequests.css';

const ManageMonetizationRequests = () => {
    // Mock Data
    const initialRequests = [
        { id: 105, username: 'TechTube', requested: '2026-February-20', status: 'Pending', name: 'John Tech', subscribers: '150k', totalPlays: '2.5M', joinDate: '2023-05-12' },
        { id: 104, username: 'CookingMaster', requested: '2026-February-18', status: 'Pending', name: 'Maria Garcia', subscribers: '12k', totalPlays: '450k', joinDate: '2024-01-05' },
        { id: 103, username: 'GamePlayPro', requested: '2026-February-15', status: 'Approved', name: 'Alex Hunter', subscribers: '85k', totalPlays: '1.2M', joinDate: '2022-11-30' },
        { id: 102, username: 'VlogDaily', requested: '2026-February-10', status: 'Rejected', name: 'Emily Rose', subscribers: '5k', totalPlays: '120k', joinDate: '2024-08-20' },
        { id: 101, username: 'NewsWorld', requested: '2026-February-05', status: 'Pending', name: 'David Smith', subscribers: '210k', totalPlays: '5.8M', joinDate: '2021-03-15' },
    ];

    const [requests, setRequests] = useState(initialRequests);
    const [filteredRequests, setFilteredRequests] = useState(initialRequests);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [toast, setToast] = useState(null);
    const [bulkAction, setBulkAction] = useState('');

    // Modal States
    const [viewModal, setViewModal] = useState(null);
    const [confirmModal, setConfirmModal] = useState(null); // { type: 'approve' | 'reject' | 'delete' | 'bulk-action', action?: string, data?: any }

    useEffect(() => {
        let result = [...requests];

        // Filter by Status
        if (filter !== 'All') {
            result = result.filter(req => req.status === filter);
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

    const handleStatusUpdate = (ids, newStatus) => {
        const idList = Array.isArray(ids) ? ids : [ids];
        setRequests(prev => prev.map(req =>
            idList.includes(req.id) ? { ...req, status: newStatus } : req
        ));
        setConfirmModal(null);
        showToast(`Request(s) ${newStatus.toLowerCase()} successfully!`);
    };

    const handleDelete = (ids) => {
        const idList = Array.isArray(ids) ? ids : [ids];
        setRequests(prev => prev.filter(req => !idList.includes(req.id)));
        setSelectedRows(prev => prev.filter(id => !idList.includes(id)));
        setConfirmModal(null);
        showToast('Monetization request(s) deleted successfully!', 'error');
    };

    const handleBulkSubmit = () => {
        if (!bulkAction || selectedRows.length === 0) return;

        if (bulkAction === 'DELETE') {
            setConfirmModal({ type: 'bulk-action', action: 'DELETE' });
        } else if (bulkAction === 'APPROVE') {
            handleStatusUpdate(selectedRows, 'Approved');
            setSelectedRows([]);
            setBulkAction('');
        } else if (bulkAction === 'REJECT') {
            handleStatusUpdate(selectedRows, 'Rejected');
            setSelectedRows([]);
            setBulkAction('');
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    return (
        <div className="manage-monetization-page">
            <nav className="breadcrumb">
                <Home size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Users</span>
                <ChevronRight size={14} />
                <span className="active">Manage Monetization Requests</span>
            </nav>

            <header className="page-header">
                <h1 className="page-title">Manage Monetization Requests</h1>
            </header>

            <div className="content-card">
                <div className="card-header">
                    <h2 className="card-title">Manage Monetization Requests</h2>
                    <div className="header-actions">
                        <div className="filter-wrapper">
                            <Filter size={16} className="filter-icon" />
                            <select
                                className="status-filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
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
                    <div className="results-info">
                        Showing {filteredRequests.length} out of {requests.length}
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="monetization-table">
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
                                            <button className="btn-icon btn-view" onClick={() => setViewModal(req)} title="View Details">
                                                <Eye size={16} />
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
                                        No monetization requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer-actions">
                    <div className="bulk-actions">
                        <span className="action-label">Action</span>
                        <select
                            className="bulk-select"
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                        >
                            <option value="">Select Action</option>
                            <option value="APPROVE">APPROVE</option>
                            <option value="REJECT">REJECT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <button
                            className="btn-submit"
                            disabled={!bulkAction || selectedRows.length === 0}
                            onClick={handleBulkSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="pagination">
                        <div className="pagination-btns">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                <ChevronLeft size={18} />
                                <span>Previous</span>
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
                                <span>Next</span>
                                <ChevronRightIcon size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {viewModal && (
                <div className="modal-overlay">
                    <div className="modal-container view-modal">
                        <div className="modal-header">
                            <h3>Monetization Request Detail</h3>
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
                                    <label><BarChart3 size={14} /> Subscribers</label>
                                    <p>{viewModal.subscribers}</p>
                                </div>
                                <div className="info-item">
                                    <label><BarChart3 size={14} /> Total Plays</label>
                                    <p>{viewModal.totalPlays}</p>
                                </div>
                                <div className="info-item">
                                    <label><Calendar size={14} /> Requested On</label>
                                    <p>{viewModal.requested}</p>
                                </div>
                                <div className="info-item">
                                    <label><Calendar size={14} /> Join Date</label>
                                    <p>{viewModal.joinDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-actions-left">
                                {viewModal.status === 'Pending' && (
                                    <>
                                        <button className="btn-approve" onClick={() => handleStatusUpdate(viewModal.id, 'Approved')}>
                                            <ShieldCheck size={16} /> Approve
                                        </button>
                                        <button className="btn-reject" onClick={() => handleStatusUpdate(viewModal.id, 'Rejected')}>
                                            <Ban size={16} /> Reject
                                        </button>
                                    </>
                                )}
                            </div>
                            <button className="btn-secondary" onClick={() => setViewModal(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmModal && (
                <div className="modal-overlay">
                    <div className="modal-container confirm-modal">
                        <div className="modal-header">
                            <h3 className="text-danger">Confirm Action</h3>
                        </div>
                        <div className="modal-body">
                            <div className="confirm-content">
                                <AlertTriangle size={48} className="icon-danger" />
                                <p>
                                    {confirmModal.type === 'bulk-action'
                                        ? `Are you sure you want to delete ${selectedRows.length} selected requests?`
                                        : `Are you sure you want to delete verification request for ${confirmModal.data.username}?`
                                    }
                                </p>
                                <span className="sub-text">This action cannot be undone.</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setConfirmModal(null)}>Cancel</button>
                            <button
                                className="btn-primary bg-danger"
                                onClick={() => {
                                    if (confirmModal.type === 'delete') handleDelete(confirmModal.data.id);
                                    else if (confirmModal.type === 'bulk-action') {
                                        handleDelete(selectedRows);
                                        setBulkAction('');
                                    }
                                }}
                            >
                                Yes, Delete
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

export default ManageMonetizationRequests;
