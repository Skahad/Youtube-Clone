import React, { useState, useMemo } from 'react';
import {
    ChevronRight, Home, Pencil, Trash2, Search,
    ChevronDown, ChevronLeft, MoreVertical,
    CheckCircle2, AlertTriangle, X, Filter,
    ArrowUpDown, ArrowUp, ArrowDown
} from 'lucide-react';
import './ManageArticles.css';

const ManageArticles = () => {
    // Generate 200 mock articles
    const generateMockData = () => {
        const categories = ['Education', 'Gaming', 'Film & Animation', 'Travel & Events', 'Howto & Style', 'News & Politics', 'Music'];
        const statuses = ['Active', 'Inactive'];
        const mockData = [];

        for (let i = 1; i <= 200; i++) {
            const randomDate = new Date(2026, 1, Math.floor(Math.random() * 28) + 1);
            const formattedDate = randomDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).replace(/ /g, '-').replace(',', '');

            mockData.push({
                id: i,
                title: `Premium Article ${i}: ${['The Future of Web', 'Exploring New Horizons', 'Advanced Tech Guide', 'Community Insights'][i % 4]}`,
                category: categories[i % categories.length],
                date: formattedDate,
                status: statuses[i % 2 === 0 ? 0 : 1]
            });
        }
        return mockData;
    };

    const [articles, setArticles] = useState(generateMockData());

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [toast, setToast] = useState(null);

    // Reset to first page when search or filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, itemsPerPage]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Sorting Logic
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedArticles = useMemo(() => {
        let sortableItems = [...articles];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [articles, sortConfig]);

    // Filtering Logic
    const filteredArticles = sortedArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || article.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedArticles.map(a => a.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDelete = () => {
        setArticles(prev => prev.filter(a => a.id !== showDeleteModal.id));
        showToast('Article deleted successfully.');
        setShowDeleteModal(null);
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} className="sort-icon-inactive" />;
        return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="sort-icon-active" /> : <ArrowDown size={14} className="sort-icon-active" />;
    };

    return (
        <div className="config-container manage-articles-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <ChevronRight size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Articles</span>
                <ChevronRight size={14} />
                <span className="active">Manage Articles</span>
            </nav>

            <div className="page-header-flex">
                <h1 className="page-title">Manage Articles</h1>
                <div className="header-actions">
                    <div className="filter-dropdown-wrapper">
                        <Filter size={14} className="filter-icon" />
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown size={14} className="dropdown-arrow" />
                    </div>
                </div>
            </div>

            <div className="card manage-card">
                <div className="card-header">
                    <h2>Manage & Edit Articles</h2>
                </div>

                <div className="card-body">
                    {/* Search Bar */}
                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for Tags, Title, Description"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="btn-search">SEARCH</button>
                    </div>

                    {/* Bulk Actions */}
                    {selectedIds.length > 0 && (
                        <div className="bulk-actions-bar">
                            <span>{selectedIds.length} articles selected</span>
                            <div className="bulk-btns">
                                <button className="btn-bulk delete">Delete Selected</button>
                                <button className="btn-bulk activate">Activate</button>
                            </div>
                        </div>
                    )}

                    <div className="table-wrapper">
                        <table className="article-table">
                            <thead>
                                <tr>
                                    <th className="col-check">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedIds.length === paginatedArticles.length && paginatedArticles.length > 0}
                                        />
                                    </th>
                                    <th className="col-id clickable" onClick={() => handleSort('id')}>
                                        ID {renderSortIcon('id')}
                                    </th>
                                    <th className="col-title clickable" onClick={() => handleSort('title')}>
                                        TITLE {renderSortIcon('title')}
                                    </th>
                                    <th className="col-cat clickable" onClick={() => handleSort('category')}>
                                        CATEGORY {renderSortIcon('category')}
                                    </th>
                                    <th className="col-date clickable" onClick={() => handleSort('date')}>
                                        DATE {renderSortIcon('date')}
                                    </th>
                                    <th className="col-status">STATUS</th>
                                    <th className="col-actions">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedArticles.length > 0 ? (
                                    paginatedArticles.map((art) => (
                                        <tr key={art.id} className={selectedIds.includes(art.id) ? 'row-selected' : ''}>
                                            <td className="col-check">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(art.id)}
                                                    onChange={() => handleSelectOne(art.id)}
                                                />
                                            </td>
                                            <td className="col-id">{art.id}</td>
                                            <td className="col-title">
                                                <span className="truncate-title" title={art.title}>{art.title}</span>
                                            </td>
                                            <td className="col-cat">{art.category}</td>
                                            <td className="col-date">{art.date}</td>
                                            <td className="col-status">
                                                <span className={`status-badge ${art.status.toLowerCase()}`}>
                                                    {art.status}
                                                </span>
                                            </td>
                                            <td className="col-actions">
                                                <div className="action-stack">
                                                    <button className="btn-table-action edit" title="Edit Article">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button
                                                        className="btn-table-action delete"
                                                        title="Delete Article"
                                                        onClick={() => setShowDeleteModal(art)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="no-data">No articles found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-footer">
                        <div className="items-selector">
                            <span>Items per page:</span>
                            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <div className="page-nav">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="page-info">
                                Page <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
                            </span>
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Article</h3>
                            <button className="close-btn" onClick={() => setShowDeleteModal(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <strong>{showDeleteModal.title}</strong>? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowDeleteModal(null)}>Cancel</button>
                            <button className="btn-danger" onClick={handleDelete}>Yes, Delete it</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default ManageArticles;
