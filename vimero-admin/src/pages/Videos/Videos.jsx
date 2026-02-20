import React, { useState } from 'react';
import {
    Filter,
    MoreVertical,
    Eye,
    CheckCircle,
    Trash2,
    Star,
    Search,
    ChevronDown
} from 'lucide-react';
import './Videos.css';

const initialVideoData = [
    { id: 1, title: 'Mastering Vidmero: Advanced Content Creation', creator: 'CreatorHub', status: 'Published', category: 'Education', views: '124k', date: '2024-03-10', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Mastering+Vidmero' },
    { id: 2, title: 'Top 10 Hidden Paradoxes in Gaming', creator: 'GameTheorist', status: 'Published', category: 'Gaming', views: '842k', date: '2024-03-12', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Gaming+Paradoxes' },
    { id: 3, title: 'Morning Routine for High Productivity', creator: 'DailyVlog', status: 'Draft', category: 'Lifestyle', views: '0', date: '2024-03-15', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Morning+Routine' },
    { id: 4, title: 'Unauthorized Music Video Re-upload', creator: 'MusicPirate', status: 'Removed', category: 'Music', views: '1.2k', date: '2024-03-08', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Music+Video' },
    { id: 5, title: 'Exploring the Swiss Alps in 8K', creator: 'NatureQuest', status: 'Published', category: 'Travel', views: '45k', date: '2024-03-14', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Swiss+Alps+8K' },
    { id: 6, title: 'React.js Crash Course 2024', creator: 'CodeMaster', status: 'Published', category: 'Education', views: '210k', date: '2024-02-28', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=React+Course' },
    { id: 7, title: 'Funny Cat Compilation #42', creator: 'MeowTube', status: 'Published', category: 'Entertainment', views: '3.5M', date: '2024-03-01', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Cat+Compilation' },
    { id: 8, title: 'How to Bake the Perfect Sourdough', creator: 'ChefAnna', status: 'Draft', category: 'Lifestyle', views: '0', date: '2024-03-16', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Sourdough+Baking' },
    { id: 9, title: 'Review: New Tech Gadgets regarding AI', creator: 'TechReviewer', status: 'Published', category: 'Technology', views: '55k', date: '2024-03-05', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Tech+Gadgets+AI' },
    { id: 10, title: 'Live: Gaming Marathon for Charity', creator: 'ProGamer', status: 'Live', category: 'Gaming', views: '12k', date: '2024-03-17', thumbnail: 'https://placehold.co/640x360/e2e8f0/1e293b?text=Gaming+Marathon' },
];

const Videos = () => {
    const [videos, setVideos] = useState(initialVideoData);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const fileInputRef = React.useRef(null);

    const [activeDropdown, setActiveDropdown] = useState(null); // 'status', 'category', or null

    // Derived state for filtering
    const filteredVideos = videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.creator.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || video.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || video.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
    const paginatedVideos = filteredVideos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Button Handlers
    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "ID,Title,Creator,Status,Category,Views,Date\n"
            + videos.map(v => `${v.id},"${v.title}",${v.creator},${v.status},${v.category},${v.views},${v.date}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `vidmero_videos_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(`Simulating upload for: ${file.name}`);
            // In a real app, you would handle the file upload here
        }
    };

    // Bulk Actions
    const handleBulkAction = (action) => {
        if (action === 'delete') {
            if (window.confirm(`Are you sure you want to delete ${selectedVideos.length} videos?`)) {
                setVideos(videos.filter(v => !selectedVideos.includes(v.id)));
                setSelectedVideos([]);
            }
        } else if (action === 'approve') {
            setVideos(videos.map(v => selectedVideos.includes(v.id) ? { ...v, status: 'Published' } : v));
            setSelectedVideos([]);
        } else if (action === 'feature') {
            alert(`Featured ${selectedVideos.length} videos!`);
            setSelectedVideos([]);
        }
    };

    // Row Actions
    const handleDeleteVideo = (id) => {
        if (window.confirm('Delete this video?')) {
            setVideos(videos.filter(v => v.id !== id));
        }
    };

    const toggleSelectAll = () => {
        if (selectedVideos.length === paginatedVideos.length) {
            setSelectedVideos([]);
        } else {
            setSelectedVideos(paginatedVideos.map(v => v.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedVideos.includes(id)) {
            setSelectedVideos(selectedVideos.filter(vid => vid !== id));
        } else {
            setSelectedVideos([...selectedVideos, id]);
        }
    };

    // Dropdown Handlers
    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleFilterSelect = (type, value) => {
        if (type === 'status') setStatusFilter(value);
        if (type === 'category') setCategoryFilter(value);
        setActiveDropdown(null);
    };

    // Close dropdowns when clicking outside (simple implementation for now)
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.filter-group')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="videos-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Video Management</h1>
                    <p className="page-subtitle">Track, moderate, and curate content across Vidmero.</p>
                </div>
                <div className="header-actions">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                    <button className="btn-outline" onClick={handleExport}>Export CSV</button>
                    <button className="btn-primary" onClick={handleUploadClick}>Upload Official Video</button>
                </div>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Filter by title or creator..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <div className="filter-wrapper">
                        <button
                            className={`filter-chip ${statusFilter !== 'All' ? 'active' : ''}`}
                            onClick={() => toggleDropdown('status')}
                        >
                            <Filter size={16} />
                            Status: {statusFilter}
                            <ChevronDown size={14} />
                        </button>
                        {activeDropdown === 'status' && (
                            <div className="filter-dropdown">
                                {['All', 'Published', 'Draft', 'Removed', 'Live'].map(status => (
                                    <button
                                        key={status}
                                        className={`dropdown-item ${statusFilter === status ? 'selected' : ''}`}
                                        onClick={() => handleFilterSelect('status', status)}
                                    >
                                        {status}
                                        {statusFilter === status && <CheckCircle size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="filter-wrapper">
                        <button
                            className={`filter-chip ${categoryFilter !== 'All' ? 'active' : ''}`}
                            onClick={() => toggleDropdown('category')}
                        >
                            <Filter size={16} />
                            Category: {categoryFilter}
                            <ChevronDown size={14} />
                        </button>
                        {activeDropdown === 'category' && (
                            <div className="filter-dropdown">
                                {['All', 'Education', 'Gaming', 'Lifestyle', 'Music', 'Travel', 'Entertainment', 'Technology'].map(cat => (
                                    <button
                                        key={cat}
                                        className={`dropdown-item ${categoryFilter === cat ? 'selected' : ''}`}
                                        onClick={() => handleFilterSelect('category', cat)}
                                    >
                                        {cat}
                                        {categoryFilter === cat && <CheckCircle size={14} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedVideos.length > 0 && (
                <div className="bulk-actions-bar">
                    <span className="selection-count">{selectedVideos.length} videos selected</span>
                    <div className="actions">
                        <button className="action-btn" onClick={() => handleBulkAction('approve')}><CheckCircle size={16} /> Approve</button>
                        <button className="action-btn" onClick={() => handleBulkAction('feature')}><Star size={16} /> Feature</button>
                        <button className="action-btn delete" onClick={() => handleBulkAction('delete')}><Trash2 size={16} /> Delete</button>
                    </div>
                </div>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th className="col-check">
                                <input
                                    type="checkbox"
                                    checked={paginatedVideos.length > 0 && selectedVideos.length === paginatedVideos.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th>Thumbnail & Title</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Views</th>
                            <th>Date</th>
                            <th className="col-actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedVideos.map((video) => (
                            <tr key={video.id} className={selectedVideos.includes(video.id) ? 'selected' : ''}>
                                <td className="col-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedVideos.includes(video.id)}
                                        onChange={() => toggleSelect(video.id)}
                                    />
                                </td>
                                <td className="col-video">
                                    <div className="video-cell">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="table-thumb-img"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://placehold.co/640x360?text=No+Image';
                                            }}
                                        />
                                        <span className="video-title">{video.title}</span>
                                    </div>
                                </td>
                                <td>{video.creator}</td>
                                <td>
                                    <span className={`status-badge ${video.status.toLowerCase()}`}>
                                        {video.status}
                                    </span>
                                </td>
                                <td>{video.category}</td>
                                <td>{video.views}</td>
                                <td className="text-secondary">{video.date}</td>
                                <td className="col-actions">
                                    <button
                                        className="icon-btn-sm"
                                        onClick={() => handleDeleteVideo(video.id)}
                                        title="Delete Video"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-pagination">
                <span className="pagination-info">
                    Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredVideos.length)} of {filteredVideos.length} videos
                </span>
                <div className="pagination-btns">
                    <button
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`page-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="page-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Videos;
