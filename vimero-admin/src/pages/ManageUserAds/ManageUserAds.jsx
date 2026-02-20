import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Home, ChevronDown, ChevronUp, Search,
    MoreHorizontal, Eye, Edit2, Pause, Play, Trash2,
    Check, X, Loader2, AlertCircle, CheckCircle2,
    ChevronLeft, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import './ManageUserAds.css';

const generateMockData = () => {
    const data = [];
    const placements = ['Header', 'Sidebar', 'Footer', 'Watch Page'];
    const statuses = ['Active', 'Paused', 'Completed'];
    const users = ['john_doe', 'sarah_tech', 'fashion_queen', 'pro_gamer', 'chef_mario', 'wanderer', 'prod_mike'];
    const websites = ['demo-site.com', 'tech-blog.org', 'fashion-hub.co', 'gaming-stream.io', 'cook-easy.net', 'travel-world.com', 'music-beats.fm'];

    for (let i = 1; i <= 100; i++) {
        const wallet = Math.floor(Math.random() * 500) + 50;
        const spent = Math.floor(Math.random() * wallet);
        data.push({
            id: i,
            website: websites[i % websites.length],
            title: `Ad Campaign #${i}`,
            user: users[i % users.length],
            wallet: wallet,
            spent: spent,
            published: `2024-02-${(i % 28 + 1).toString().padStart(2, '0')}`,
            placement: placements[i % placements.length],
            results: Math.floor(Math.random() * 5000),
            status: statuses[i % statuses.length]
        });
    }
    return data;
};

const initialMockData = generateMockData();

const ManageUserAds = () => {
    const [ads, setAds] = useState(initialMockData);
    const [filteredAds, setFilteredAds] = useState(initialMockData);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [activeActionMenu, setActiveActionMenu] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, adId: null, isBulk: false });
    const [toast, setToast] = useState(null);

    const itemsPerPage = 10;

    // Apply filters and sorting
    useEffect(() => {
        handleSearch();
    }, [statusFilter, ads, sortConfig]);

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            let result = ads.filter(ad => {
                const matchesSearch =
                    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ad.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ad.user.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesStatus = statusFilter === 'All' || ad.status === statusFilter;

                return matchesSearch && matchesStatus;
            });

            // Sorting
            result.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];

                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });

            setFilteredAds(result);
            setLoading(false);
            // Don't always reset to page 1 to allow for pagination updates
        }, 300);
    };

    // Calculate pagination
    const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
    const paginatedAds = filteredAds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
        setCurrentPage(1); // Reset to page 1 when sorting
    };

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
        setCurrentPage(1); // Reset to page 1 when filtering
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        // Page reset is handled in handleSearch which is called on debounced or explicit triggers
    };

    const toggleRowSelection = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === filteredAds.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredAds.map(ad => ad.id));
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleStatusChange = (id, newStatus) => {
        setAds(prev => prev.map(ad => ad.id === id ? { ...prev, status: newStatus } : ad)); // This line has a bug, fixed below
        setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: newStatus } : ad));
        showToast(`Advertisement ${newStatus.toLowerCase()} successfully.`);
        setActiveActionMenu(null);
    };

    const confirmDelete = (id) => {
        setDeleteModal({ isOpen: true, adId: id, isBulk: false });
        setActiveActionMenu(null);
    };

    const confirmBulkDelete = () => {
        setDeleteModal({ isOpen: true, adId: null, isBulk: true });
    };

    const executeDelete = () => {
        if (deleteModal.isBulk) {
            setAds(prev => prev.filter(ad => !selectedRows.includes(ad.id)));
            setSelectedRows([]);
            showToast('Selected advertisements deleted successfully.');
        } else {
            setAds(prev => prev.filter(ad => ad.id !== deleteModal.adId));
            showToast('Advertisement deleted successfully.');
        }
        setDeleteModal({ isOpen: false, adId: null, isBulk: false });
    };

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveActionMenu(null);
        if (activeActionMenu !== null) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [activeActionMenu]);

    return (
        <div className="manage-user-ads-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <span className="breadcrumb-item">Admin Panel</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item">Advertisements</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-item active">Manage User Advertisements</span>
            </nav>

            <div className="page-header">
                <h1 className="page-title">Manage User Advertisements</h1>
            </div>

            <div className="ads-card">
                <div className="card-header">
                    <h2 className="card-title">Manage User Advertisements</h2>
                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="search-section">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by title, website, or user"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button className="btn-search" onClick={handleSearch}>Search</button>
                </div>

                <div className="table-container">
                    {loading ? (
                        <div className="table-loading">
                            <Loader2 className="spinner" size={24} />
                            <p>Loading advertisements...</p>
                        </div>
                    ) : filteredAds.length === 0 ? (
                        <div className="table-loading">
                            <AlertCircle size={24} />
                            <p>No advertisements found</p>
                        </div>
                    ) : (
                        <table className="ads-table">
                            <thead>
                                <tr>
                                    <th className="checkbox-cell">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === filteredAds.length && filteredAds.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="sortable" onClick={() => handleSort('id')}>
                                        ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="sort-icon" /> : <ChevronDown size={12} className="sort-icon" />)}
                                    </th>
                                    <th>Website</th>
                                    <th className="sortable" onClick={() => handleSort('title')}>
                                        Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="sort-icon" /> : <ChevronDown size={12} className="sort-icon" />)}
                                    </th>
                                    <th>User</th>
                                    <th>Wallet</th>
                                    <th className="sortable" onClick={() => handleSort('spent')}>
                                        Spent {sortConfig.key === 'spent' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="sort-icon" /> : <ChevronDown size={12} className="sort-icon" />)}
                                    </th>
                                    <th className="sortable" onClick={() => handleSort('published')}>
                                        Published {sortConfig.key === 'published' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="sort-icon" /> : <ChevronDown size={12} className="sort-icon" />)}
                                    </th>
                                    <th>Placement</th>
                                    <th className="sortable" onClick={() => handleSort('results')}>
                                        Results {sortConfig.key === 'results' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="sort-icon" /> : <ChevronDown size={12} className="sort-icon" />)}
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAds.map((ad) => (
                                    <tr key={ad.id}>
                                        <td className="checkbox-cell">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(ad.id)}
                                                onChange={() => toggleRowSelection(ad.id)}
                                            />
                                        </td>
                                        <td>{ad.id}</td>
                                        <td>
                                            <a href={`https://${ad.website}`} target="_blank" rel="noopener noreferrer" className="table-link">
                                                {ad.website}
                                            </a>
                                        </td>
                                        <td>{ad.title}</td>
                                        <td>
                                            <a href={`/user/${ad.user}`} onClick={e => e.preventDefault()} className="table-link">
                                                {ad.user}
                                            </a>
                                        </td>
                                        <td>${ad.wallet.toFixed(2)}</td>
                                        <td>${ad.spent.toFixed(2)}</td>
                                        <td>{ad.published}</td>
                                        <td>
                                            <span className="placement-badge">{ad.placement}</span>
                                        </td>
                                        <td>{ad.results}</td>
                                        <td>
                                            <div className="action-dropdown-container">
                                                <button
                                                    className="btn-action"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveActionMenu(activeActionMenu === ad.id ? null : ad.id);
                                                    }}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                                {activeActionMenu === ad.id && (
                                                    <div className="action-menu" onClick={e => e.stopPropagation()}>
                                                        <button className="action-item"><Eye size={14} /> View</button>
                                                        <button className="action-item"><Edit2 size={14} /> Edit</button>
                                                        {ad.status === 'Active' ? (
                                                            <button className="action-item" onClick={() => handleStatusChange(ad.id, 'Paused')}><Pause size={14} /> Pause</button>
                                                        ) : ad.status === 'Paused' ? (
                                                            <button className="action-item" onClick={() => handleStatusChange(ad.id, 'Active')}><Play size={14} /> Activate</button>
                                                        ) : null}
                                                        <button className="action-item danger" onClick={() => confirmDelete(ad.id)}><Trash2 size={14} /> Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="card-footer">
                    <div>
                        <button
                            className="btn-bulk-delete"
                            disabled={selectedRows.length === 0}
                            onClick={confirmBulkDelete}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="pagination">
                        <span className="page-info">
                            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAds.length)} to {Math.min(currentPage * itemsPerPage, filteredAds.length)} of {filteredAds.length}
                        </span>
                        <button
                            className="page-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(1)}
                        >
                            <ChevronsLeft size={16} />
                        </button>
                        <button
                            className="page-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = idx + 1;
                            } else {
                                if (currentPage <= 3) pageNum = idx + 1;
                                else if (currentPage > totalPages - 3) pageNum = totalPages - 4 + idx;
                                else pageNum = currentPage - 2 + idx;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            className="page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            <ChevronRight size={16} />
                        </button>
                        <button
                            className="page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            <ChevronsRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            {deleteModal.isOpen && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <div className="modal-icon-container">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="modal-title">Confirm Deletion</h3>
                        <p className="modal-text">
                            {deleteModal.isBulk
                                ? `Are you sure you want to delete ${selectedRows.length} selected advertisements?`
                                : `Are you sure you want to delete advertisement #${deleteModal.adId}?`}
                            <br />This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}>Cancel</button>
                            <button className="btn-confirm-delete" onClick={executeDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageUserAds;
