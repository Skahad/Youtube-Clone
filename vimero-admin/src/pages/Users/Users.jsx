import React, { useState, useEffect, useMemo } from 'react';
import {
    ChevronRight, Search, Users, User, Mail,
    ShieldAlert, Coins, Edit2, Trash2, Shield,
    ChevronLeft, Loader2, CheckCircle2, XCircle,
    Ban, MoreVertical, X
} from 'lucide-react';
import './Users.css';

const INITIAL_USERS = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    email: `email_${i + 1}@example.com`,
    ipAddress: `192.168.1.${i + 1}`,
    status: i % 5 === 0 ? 'Banned' : (i % 3 === 0 ? 'Inactive' : 'Active'),
    type: i < 5 ? 'Admin' : (i < 10 ? 'Moderator' : (i < 20 ? 'Verified' : 'Unverified')),
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    isOnline: i % 7 === 0,
    avatar: null
}));

const UsersPage = () => {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [memberTypeFilter, setMemberTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [onlineFilter, setOnlineFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Selection
    const [selectedIds, setSelectedIds] = useState([]);
    const [bulkAction, setBulkAction] = useState('');

    // Modals
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [editTarget, setEditTarget] = useState(null);
    const [permissionTarget, setPermissionTarget] = useState(null);
    const [toast, setToast] = useState(null);

    // Form States
    const [editFormData, setEditFormData] = useState({ username: '', email: '', status: '', type: '' });
    const [permFormData, setPermFormData] = useState({ type: '' });

    // Sync form data when target changes
    useEffect(() => {
        if (editTarget) {
            setEditFormData({
                username: editTarget.username,
                email: editTarget.email,
                status: editTarget.status,
                type: editTarget.type
            });
        }
    }, [editTarget]);

    useEffect(() => {
        if (permissionTarget) {
            setPermFormData({ type: permissionTarget.type });
        }
    }, [permissionTarget]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, memberTypeFilter, statusFilter, onlineFilter]);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.id.toString().includes(searchQuery) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = memberTypeFilter === 'All' || user.type === memberTypeFilter;
            const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
            const matchesOnline = onlineFilter === 'All' ||
                (onlineFilter === 'Online' && user.isOnline) ||
                (onlineFilter === 'Offline' && !user.isOnline);

            return matchesSearch && matchesType && matchesStatus && matchesOnline;
        });
    }, [users, searchQuery, memberTypeFilter, statusFilter, onlineFilter]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return filteredUsers.slice(startIndex, startIndex + usersPerPage);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const onlineCount = users.filter(u => u.isOnline).length;

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCurrentPage(1);
        }, 500);
    };

    const handleDelete = () => {
        if (deleteTarget.isBulk) {
            setUsers(prev => prev.filter(u => !selectedIds.includes(u.id)));
            setSelectedIds([]);
        } else {
            setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
            setSelectedIds(prev => prev.filter(id => id !== deleteTarget.id));
        }
        showToast(deleteTarget.isBulk ? `${selectedIds.length} users deleted` : 'User deleted successfully');
        setDeleteTarget(null);
    };

    const handleBulkAction = () => {
        if (!bulkAction || selectedIds.length === 0) return;

        if (bulkAction === 'Delete') {
            setDeleteTarget({ isBulk: true });
            return;
        }

        setUsers(prev => prev.map(u => {
            if (selectedIds.includes(u.id)) {
                if (bulkAction === 'Activate') return { ...u, status: 'Active' };
                if (bulkAction === 'Deactivate') return { ...u, status: 'Inactive' };
                if (bulkAction === 'Ban') return { ...u, status: 'Banned' };
            }
            return u;
        }));
        showToast(`Bulk action: ${bulkAction} applied successfully`);
        setSelectedIds([]);
        setBulkAction('');
    };

    const handleSaveEdit = () => {
        setUsers(prev => prev.map(u =>
            u.id === editTarget.id ? { ...u, ...editFormData } : u
        ));
        showToast('User updated successfully');
        setEditTarget(null);
    };

    const handleSavePermissions = () => {
        setUsers(prev => prev.map(u =>
            u.id === permissionTarget.id ? { ...u, type: permFormData.type } : u
        ));
        showToast('Permissions updated successfully');
        setPermissionTarget(null);
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedUsers.map(u => u.id));
        } else {
            setSelectedIds([]);
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="users-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span> <ChevronRight size={14} />
                <span>Users</span> <ChevronRight size={14} />
                <span className="active">Manage Users</span>
            </nav>

            <h1 className="page-title">Manage Users</h1>

            <div className="manage-users-card">
                <div className="card-header">
                    <h2>Manage & Edit Users ({onlineCount} Online Users)</h2>
                    <div className="header-filter">
                        <select value={onlineFilter} onChange={(e) => setOnlineFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                </div>

                <div className="filters-section">
                    <div className="search-field">
                        <input
                            type="text"
                            placeholder="Search for ID, Keyword, E-mail, Username, First Name, Last Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-item">
                        <label>Member Type</label>
                        <select value={memberTypeFilter} onChange={(e) => setMemberTypeFilter(e.target.value)}>
                            <option value="All">All Members</option>
                            <option value="Verified">Verified</option>
                            <option value="Unverified">Unverified</option>
                            <option value="Admin">Admins</option>
                            <option value="Moderator">Moderators</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Status</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                        </select>
                    </div>
                    <button className="btn-search" onClick={handleSearch}>
                        <Search size={18} /> Search
                    </button>
                </div>

                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedIds.length === paginatedUsers.length && paginatedUsers.length > 0}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Username</th>
                                <th>E-mail</th>
                                <th>IP Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="loading-row">
                                        <Loader2 className="spinner" size={32} />
                                    </td>
                                </tr>
                            ) : paginatedUsers.length > 0 ? (
                                paginatedUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(user.id)}
                                                onChange={() => toggleSelect(user.id)}
                                            />
                                        </td>
                                        <td>{user.id}</td>
                                        <td>
                                            <div className="user-info-cell">
                                                {user.avatar ? (
                                                    <img src={user.avatar} className="user-avatar-img" alt="" />
                                                ) : (
                                                    <div className="user-avatar-placeholder">{user.username.charAt(0).toUpperCase()}</div>
                                                )}
                                                <div className="username-container">
                                                    <span>
                                                        {user.isOnline && <span className="online-dot" title="Online" />}
                                                        {user.username}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td style={{ color: '#64748b' }}>{user.ipAddress}</td>
                                        <td>
                                            <span className={`status-badge ${user.status.toLowerCase()}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button
                                                    className="btn-row-action edit"
                                                    title="Edit"
                                                    onClick={() => setEditTarget(user)}
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    className="btn-row-action delete"
                                                    title="Delete"
                                                    onClick={() => setDeleteTarget({ id: user.id, isBulk: false })}
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                                <button
                                                    className="btn-row-action permissions"
                                                    title="Permissions"
                                                    onClick={() => setPermissionTarget(user)}
                                                >
                                                    <Shield size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        No users found matches your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer">
                    <div className="bulk-actions-form">
                        <select
                            className="bulk-select"
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                        >
                            <option value="Bulk Action">Bulk Action</option>
                            <option value="Activate">Activate</option>
                            <option value="Deactivate">Deactivate</option>
                            <option value="Ban">Ban</option>
                            <option value="Delete">Delete</option>
                        </select>
                        <button
                            className="btn-search"
                            style={{ height: '36px' }}
                            onClick={handleBulkAction}
                            disabled={!bulkAction || selectedIds.length === 0}
                        >
                            Apply
                        </button>
                    </div>

                    <div className="pagination">
                        <span style={{ fontSize: '13px', color: '#64748b', marginRight: '16px' }}>
                            Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} out of {filteredUsers.length}
                        </span>
                        <button
                            className="page-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {(() => {
                            const maxVisible = 5;
                            let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                            let endPage = Math.min(totalPages, startPage + maxVisible - 1);

                            if (endPage - startPage + 1 < maxVisible) {
                                startPage = Math.max(1, endPage - maxVisible + 1);
                            }

                            const pageNumbers = [];
                            for (let i = startPage; i <= endPage; i++) {
                                pageNumbers.push(i);
                            }

                            return pageNumbers.map(page => (
                                <button
                                    key={page}
                                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ));
                        })()}
                        <button
                            className="page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Confirm Delete</h3>
                            <button onClick={() => setDeleteTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {deleteTarget.isBulk ? `${selectedIds.length} selected users` : 'this user'}? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="page-btn" onClick={() => setDeleteTarget(null)}>Cancel</button>
                            <button className="btn-row-action delete" style={{ height: '36px', padding: '0 20px' }} onClick={handleDelete}>Delete Anyway</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {editTarget && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit User: {editTarget.username}</h3>
                            <button onClick={() => setEditTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="filter-item" style={{ width: '100%', marginBottom: '16px' }}>
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={editFormData.username}
                                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div className="filter-item" style={{ width: '100%', marginBottom: '16px' }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div className="filter-item" style={{ width: '100%', marginBottom: '16px' }}>
                                <label>Status</label>
                                <select
                                    value={editFormData.status}
                                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </div>
                            <div className="filter-item" style={{ width: '100%' }}>
                                <label>Member Type</label>
                                <select
                                    value={editFormData.type}
                                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="Verified">Verified</option>
                                    <option value="Unverified">Unverified</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="page-btn" onClick={() => setEditTarget(null)}>Cancel</button>
                            <button className="btn-row-action permissions" style={{ height: '36px', padding: '0 20px' }} onClick={handleSaveEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Permissions Modal */}
            {permissionTarget && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Manage Permissions: {permissionTarget.username}</h3>
                            <button onClick={() => setPermissionTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <p style={{ marginBottom: '16px', fontSize: '14px', color: '#64748b' }}>Change the role and platform-wide permissions for this user.</p>
                            <div className="filter-item" style={{ width: '100%' }}>
                                <label>User Role</label>
                                <select
                                    value={permFormData.type}
                                    onChange={(e) => setPermFormData({ type: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Admin">Admin (Full Access)</option>
                                    <option value="Moderator">Moderator (Limited Access)</option>
                                    <option value="Verified">Verified User</option>
                                    <option value="Unverified">Standard User</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="page-btn" onClick={() => setPermissionTarget(null)}>Cancel</button>
                            <button className="btn-row-action permissions" style={{ height: '36px', padding: '0 20px' }} onClick={handleSavePermissions}>Update Permissions</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
