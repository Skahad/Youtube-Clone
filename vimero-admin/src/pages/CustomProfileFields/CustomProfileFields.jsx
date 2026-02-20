import React, { useState, useMemo } from 'react';
import {
    ChevronRight,
    Settings,
    Plus,
    Search,
    Edit2,
    Trash2,
    AlertCircle,
    X,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    CheckCircle2
} from 'lucide-react';
import './CustomProfileFields.css';

const CustomProfileFields = () => {
    // Initial Mock Data
    const [fields, setFields] = useState([
        { id: 1, name: 'phone', type: 'Text', length: '20', placement: 'Signup', status: 'Active', required: 'No', unique: 'Yes' },
        { id: 2, name: 'bio', type: 'Textarea', length: '255', placement: 'Profile', status: 'Active', required: 'No', unique: 'No' },
        { id: 3, name: 'gender', type: 'Select', length: '—', placement: 'Profile', status: 'Active', required: 'Yes', unique: 'No' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [selectedIds, setSelectedIds] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState(null);

    // Form State for Create/Edit
    const [formData, setFormData] = useState({
        name: '',
        type: 'Text',
        length: '',
        placement: 'Signup',
        required: 'No',
        unique: 'No',
        status: 'Active'
    });

    // Handle Sorting
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} />;
        return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    };

    // Filter and Sort Data
    const sortedFields = useMemo(() => {
        let filterable = [...fields].filter(f =>
            f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.placement.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortConfig.key) {
            filterable.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filterable;
    }, [fields, searchQuery, sortConfig]);

    // Handlers
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(sortedFields.map(f => f.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleCreateField = () => {
        if (!formData.name) {
            showToast('Field Name is required', 'error');
            return;
        }
        if (fields.some(f => f.name === formData.name)) {
            showToast('Field Name must be unique', 'error');
            return;
        }

        const newField = {
            ...formData,
            id: fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1,
            length: formData.type === 'Select' || formData.type === 'Checkbox' ? '—' : (formData.length || '—')
        };

        setFields([...fields, newField]);
        setIsCreateModalOpen(false);
        resetForm();
        showToast('Custom field created successfully');
    };

    const handleEditField = () => {
        setFields(prev => prev.map(f => f.id === editTarget.id ? { ...f, ...formData } : f));
        setEditTarget(null);
        resetForm();
        showToast('Field updated successfully');
    };

    const handleDelete = () => {
        if (deleteTarget.isBulk) {
            setFields(prev => prev.filter(f => !selectedIds.includes(f.id)));
            setSelectedIds([]);
        } else {
            setFields(prev => prev.filter(f => f.id !== deleteTarget.id));
        }
        setDeleteTarget(null);
        showToast('Field(s) deleted successfully');
    };

    const openEdit = (field) => {
        setEditTarget(field);
        setFormData({ ...field });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'Text',
            length: '',
            placement: 'Signup',
            required: 'No',
            unique: 'No',
            status: 'Active'
        });
    };

    return (
        <div className="custom-profile-fields-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span> <ChevronRight size={14} />
                <span>Users</span> <ChevronRight size={14} />
                <span className="active">Manage Custom Profile Fields</span>
            </nav>

            <div className="page-header">
                <h1 className="page-title">Manage Custom Profile Fields</h1>
                <button className="btn-create" onClick={() => { resetForm(); setIsCreateModalOpen(true); }}>
                    <Plus size={18} />
                    Create New Custom Field
                </button>
            </div>

            <div className="card">
                <div className="card-header">
                    <div className="header-title">
                        <Settings size={18} className="header-icon" />
                        <h2>Manage & Edit Custom Profile Fields</h2>
                    </div>
                </div>

                <div className="card-controls">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search fields..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th width="40">
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedIds.length === sortedFields.length && sortedFields.length > 0}
                                    />
                                </th>
                                <th onClick={() => requestSort('id')} className="sortable">
                                    ID {getSortIcon('id')}
                                </th>
                                <th onClick={() => requestSort('name')} className="sortable">
                                    Field Name {getSortIcon('name')}
                                </th>
                                <th onClick={() => requestSort('type')} className="sortable">
                                    Type {getSortIcon('type')}
                                </th>
                                <th onClick={() => requestSort('length')} className="sortable">
                                    Length {getSortIcon('length')}
                                </th>
                                <th onClick={() => requestSort('placement')} className="sortable">
                                    Placement {getSortIcon('placement')}
                                </th>
                                <th width="120">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFields.length > 0 ? (
                                sortedFields.map(field => (
                                    <tr key={field.id} className={selectedIds.includes(field.id) ? 'selected' : ''}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(field.id)}
                                                onChange={() => toggleSelect(field.id)}
                                            />
                                        </td>
                                        <td>{field.id}</td>
                                        <td><span className="field-name">{field.name}</span></td>
                                        <td><span className="type-badge">{field.type}</span></td>
                                        <td>{field.length}</td>
                                        <td>{field.placement}</td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="btn-icon edit" onClick={() => openEdit(field)} title="Edit"><Edit2 size={14} /></button>
                                                <button className="btn-icon delete" onClick={() => setDeleteTarget({ id: field.id, isBulk: false })} title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty-state">
                                        No custom fields found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer">
                    <div className="bulk-actions">
                        <button
                            className="btn-delete-selected"
                            disabled={selectedIds.length === 0}
                            onClick={() => setDeleteTarget({ isBulk: true })}
                        >
                            <Trash2 size={16} />
                            Delete Selected
                        </button>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {(isCreateModalOpen || editTarget) && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editTarget ? 'Edit Custom Field' : 'Create New Custom Field'}</h3>
                            <button className="btn-close" onClick={() => { setIsCreateModalOpen(false); setEditTarget(null); }}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group full">
                                    <label>Field Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        placeholder="lowercase, no spaces (e.g. twitter_handle)"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s/g, '') })}
                                    />
                                    <small>Unique identifier for the field.</small>
                                </div>
                                <div className="form-group">
                                    <label>Field Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                        <option>Text</option>
                                        <option>Textarea</option>
                                        <option>Number</option>
                                        <option>Select</option>
                                        <option>Checkbox</option>
                                        <option>Radio</option>
                                        <option>Date</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Field Length</label>
                                    <input
                                        type="number"
                                        value={formData.length}
                                        disabled={formData.type === 'Select' || formData.type === 'Checkbox' || formData.type === 'Date'}
                                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Placement</label>
                                    <select value={formData.placement} onChange={(e) => setFormData({ ...formData, placement: e.target.value })}>
                                        <option>Signup</option>
                                        <option>Profile</option>
                                        <option>Both</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Required</label>
                                    <select value={formData.required} onChange={(e) => setFormData({ ...formData, required: e.target.value })}>
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => { setIsCreateModalOpen(false); setEditTarget(null); }}>Cancel</button>
                            <button className="btn-save" onClick={editTarget ? handleEditField : handleCreateField}>
                                {editTarget ? 'Save Changes' : 'Create Field'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="modal-overlay">
                    <div className="modal-content small">
                        <div className="modal-header">
                            <h3>Confirm Deletion</h3>
                        </div>
                        <div className="modal-body">
                            <div className="confirm-content">
                                <AlertCircle size={40} className="warning-icon" />
                                <p>Are you sure you want to delete {deleteTarget.isBulk ? `${selectedIds.length} selected fields` : 'this custom field'}? This action is permanent.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
                            <button className="btn-delete" onClick={handleDelete}>Delete Anyway</button>
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

export default CustomProfileFields;
