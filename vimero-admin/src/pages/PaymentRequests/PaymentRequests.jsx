import React, { useState, useMemo } from 'react';
import {
    ChevronRight, Info, Search,
    Layers, CheckCircle, AlertTriangle,
    Mail, Trash2, Check, X,
    ChevronLeft, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import './PaymentRequests.css';

const MOCK_DATA = Array.from({ length: 39 }, (_, i) => ({
    id: i + 1,
    username: [
        'john_doe', 'RYADH', 'Deen Doughouz', 'skahad_dev', 'alex_smith',
        'user_testing', 'premium_vlog', 'daily_clips', 'creative_mind', 'tech_guru'
    ][i % 10],
    paypalEmail: `user${i + 1}@example.com`,
    amount: (Math.floor(Math.random() * 500) + 10) * 10 + ' USD',
    requested: `2018-05-${String(i % 28 + 1).padStart(2, '0')}`, // Range 2018-2025 in req, but sticking to logic
    status: ['Paid', 'Pending', 'Declined'][i % 3]
}));

const PaymentRequests = () => {
    const [requests, setRequests] = useState(MOCK_DATA);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const itemsPerPage = 10;

    // Derived Stats
    const stats = {
        total: requests.length,
        paid: requests.filter(r => r.status === 'Paid').length,
        declined: requests.filter(r => r.status === 'Declined').length,
        pending: requests.filter(r => r.status === 'Pending').length
    };

    // Filtering & Searching
    const filteredData = useMemo(() => {
        return requests.filter(item => {
            const matchesFilter = filterStatus === 'All' || item.status === filterStatus;
            const matchesSearch = item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.paypalEmail.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [requests, filterStatus, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handlers
    const handleStatusChange = (id, newStatus) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this payment request?')) {
            setRequests(prev => prev.filter(r => r.id !== id));
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleBulkSubmit = () => {
        if (!bulkAction || selectedIds.length === 0) return;

        if (bulkAction === 'Delete') {
            if (window.confirm(`Delete ${selectedIds.length} selected requests?`)) {
                setRequests(prev => prev.filter(r => !selectedIds.includes(r.id)));
                setSelectedIds([]);
            }
        } else {
            setRequests(prev => prev.map(r => selectedIds.includes(r.id) ? { ...r, status: bulkAction } : r));
            setSelectedIds([]);
        }
        setBulkAction('');
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedData.map(r => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="payment-requests-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span> <ChevronRight size={14} />
                <span>Advertisements</span> <ChevronRight size={14} />
                <span className="active">Payment Requests</span>
            </nav>

            <h1 className="page-title">Payment Requests</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total"><Layers size={24} /></div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Total Requests</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon paid"><CheckCircle size={24} /></div>
                    <div className="stat-info">
                        <h3>{stats.paid}</h3>
                        <p>Paid Requests</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon declined"><AlertTriangle size={24} /></div>
                    <div className="stat-info">
                        <h3>{stats.declined}</h3>
                        <p>Declined Requests</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon pending"><Mail size={24} /></div>
                    <div className="stat-info">
                        <h3>{stats.pending}</h3>
                        <p>Pending Requests</p>
                    </div>
                </div>
            </div>

            <div className="manage-card">
                <div className="card-header">
                    <h2>Manage Payment Requests</h2>
                    <select
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Declined">Declined</option>
                    </select>
                </div>

                <div className="search-section">
                    <label>Search for Keyword</label>
                    <div className="search-input-group">
                        <input
                            type="text"
                            placeholder="Search by username or PayPal email"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setCurrentPage(1);
                                }
                            }}
                        />
                        <button className="btn-search" onClick={() => setCurrentPage(1)}>Search</button>
                    </div>
                </div>

                <div className="info-alert">
                    <Info size={18} />
                    <span>Payments are made from your PayPal account, after the payment is made, mark the request as paid.</span>
                </div>

                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Username</th>
                                <th>PayPal Email</th>
                                <th>Amount</th>
                                <th>Requested</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => toggleSelect(item.id)}
                                        />
                                    </td>
                                    <td>{item.id}</td>
                                    <td><a href="#" className="username-link">{item.username}</a></td>
                                    <td><div className="email-cell" title={item.paypalEmail}>{item.paypalEmail}</div></td>
                                    <td>{item.amount}</td>
                                    <td>{item.requested}</td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {item.status === 'Pending' && (
                                                <button className="btn-action paid" onClick={() => handleStatusChange(item.id, 'Paid')}>Paid</button>
                                            )}
                                            <button className="btn-action decline" onClick={() => handleStatusChange(item.id, 'Declined')}>Decline</button>
                                            <button className="btn-action delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        No payment requests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="table-footer">
                    <div className="bulk-actions">
                        <select
                            className="select-bulk"
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                        >
                            <option value="">Bulk Action</option>
                            <option value="Paid">Paid</option>
                            <option value="Declined">Declined</option>
                            <option value="Delete">Delete</option>
                        </select>
                        <button
                            className="btn-submit"
                            disabled={!bulkAction || selectedIds.length === 0}
                            onClick={handleBulkSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="pagination">
                        <span className="pagination-info">Showing {filteredData.length > 0 ? currentPage : 0} out of {totalPages}</span>
                        <div className="pagination-btns">
                            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}><ChevronsLeft size={16} /></button>
                            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft size={16} /></button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                                .map(page => (
                                    <button
                                        key={page}
                                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))
                            }

                            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight size={16} /></button>
                            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}><ChevronsRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequests;
