import React, { useState } from 'react';
import { Library, ListPlus, Video, Users, MoreVertical, Globe, Lock, X, AlignLeft } from 'lucide-react';
import './Playlists.css';

const initialPlaylistsData = [
    { id: 1, title: 'Modern Web Dev 2024', creator: 'CodeAcademy', videos: 42, visibility: 'Public', views: '2.5M' },
    { id: 2, title: 'Relaxing Lo-fi Radio', creator: 'ChillBeats', videos: 156, visibility: 'Public', views: '18M' },
    { id: 3, title: 'Unlisted Corporate Assets', creator: 'EnterpriseVidmero', videos: 12, visibility: 'Unlisted', views: '450' },
];

const PlaylistModal = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        visibility: 'Public'
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                visibility: initialData.visibility || 'Public'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        onSave(formData);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container playlist-modal">
                <div className="modal-header">
                    <div className="header-title">
                        <ListPlus size={20} className="text-primary" />
                        <h3>{initialData ? 'Edit Playlist' : 'Create New Playlist'}</h3>
                    </div>
                    <button className="icon-btn-sm" onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Playlist Title <span className="required">*</span></label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                placeholder="Enter playlist title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                placeholder="What's this playlist about?"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Visibility</label>
                            <div className="visibility-options">
                                <label className={`visibility-option ${formData.visibility === 'Public' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="Public"
                                        checked={formData.visibility === 'Public'}
                                        onChange={handleChange}
                                    />
                                    <Globe size={16} />
                                    <span>Public</span>
                                </label>
                                <label className={`visibility-option ${formData.visibility === 'Private' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="Private"
                                        checked={formData.visibility === 'Private'}
                                        onChange={handleChange}
                                    />
                                    <Lock size={16} />
                                    <span>Private</span>
                                </label>
                                <label className={`visibility-option ${formData.visibility === 'Unlisted' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="Unlisted"
                                        checked={formData.visibility === 'Unlisted'}
                                        onChange={handleChange}
                                    />
                                    <div className="icon-placeholder unlisted-icon"></div>
                                    <span>Unlisted</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={!formData.title.trim()}>
                            {initialData ? 'Save Changes' : 'Create Playlist'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Playlists = () => {
    const [playlists, setPlaylists] = useState(() => {
        const savedPlaylists = localStorage.getItem('vidmero_playlists');
        return savedPlaylists ? JSON.parse(savedPlaylists) : initialPlaylistsData;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    React.useEffect(() => {
        localStorage.setItem('vidmero_playlists', JSON.stringify(playlists));
    }, [playlists]);

    const handleCreateClick = () => {
        setEditingPlaylist(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (playlist) => {
        setEditingPlaylist(playlist);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPlaylist(null);
    };

    const handleSavePlaylist = (data) => {
        if (editingPlaylist) {
            setPlaylists(playlists.map(pl =>
                pl.id === editingPlaylist.id
                    ? { ...pl, ...data }
                    : pl
            ));
        } else {
            const newPlaylist = {
                id: Date.now(),
                title: data.title,
                creator: 'Admin', // In a real app, this would be the current user
                videos: 0,
                visibility: data.visibility,
                views: '0',
                description: data.description
            };
            setPlaylists([newPlaylist, ...playlists]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            setPlaylists(playlists.filter(pl => pl.id !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`Edit playlist ${id} functionality coming soon!`);
    };

    return (
        <div className="playlists-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Playlists Management</h1>
                    <p className="page-subtitle">Curate platform playlists, manage ordering, and oversee public collections.</p>
                </div>
                <button className="btn-primary" onClick={handleCreateClick}>
                    <ListPlus size={18} />
                    <span>Create Playlist</span>
                </button>
            </div>

            <div className="playlist-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Playlist Title</th>
                            <th>Creator</th>
                            <th>Video Count</th>
                            <th>Total Views</th>
                            <th>Visibility</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlists.map((pl) => (
                            <tr key={pl.id}>
                                <td>
                                    <div className="playlist-cell">
                                        <div className="pl-stack-icon"><Library size={18} /></div>
                                        <div className="pl-info">
                                            <span className="pl-title">{pl.title}</span>
                                            {pl.description && <span className="pl-desc-preview">{pl.description}</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="text-secondary">{pl.creator}</td>
                                <td className="font-bold">{pl.videos}</td>
                                <td className="text-secondary">{pl.views}</td>
                                <td>
                                    <div className="visibility-badge">
                                        {pl.visibility === 'Public' ? <Globe size={12} /> : <Lock size={12} />}
                                        {pl.visibility}
                                    </div>
                                </td>
                                <td className="col-actions">
                                    <div className="action-buttons">
                                        <button className="icon-btn-sm" onClick={() => handleEditClick(pl)} title="Edit">
                                            <MoreVertical size={16} />
                                        </button>
                                        <button className="icon-btn-sm text-danger" onClick={() => handleDelete(pl.id)} title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {playlists.length === 0 && (
                    <div className="empty-state">
                        <Library size={48} className="text-tertiary mb-4" />
                        <h3>No playlists found</h3>
                        <p className="text-secondary">Create a new playlist to get started.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <PlaylistModal
                    onClose={handleCloseModal}
                    onSave={handleSavePlaylist}
                    initialData={editingPlaylist}
                />
            )}
        </div>
    );
};

export default Playlists;
