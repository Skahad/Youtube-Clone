import React from 'react';
import {
    Plus,
    MoreVertical,
    GripVertical,
    Layers,
    Eye,
    Edit2,
    Trash2,
    CheckCircle2,
    Video
} from 'lucide-react';
import './Categories.css';

const categoryData = [
    { id: 1, name: 'Education', slug: 'education', videos: 1240, status: 'Active', order: 1 },
    { id: 2, name: 'Gaming', slug: 'gaming', videos: 4520, status: 'Active', order: 2 },
    { id: 3, name: 'Music', slug: 'music', videos: 2800, status: 'Active', order: 3 },
    { id: 4, name: 'Vlogs', slug: 'vlogs', videos: 3100, status: 'Inactive', order: 4 },
    { id: 5, name: 'Tech & Science', slug: 'tech-science', videos: 950, status: 'Active', order: 5 },
];

const Categories = () => {
    return (
        <div className="categories-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Categories & Taxonomy</h1>
                    <p className="page-subtitle">Organize content and manage platform navigation.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary"><Plus size={16} /> Create Category</button>
                </div>
            </div>

            <div className="categories-container">
                <div className="category-list">
                    <div className="list-header">
                        <span className="col-drag"></span>
                        <span className="col-name">Category Name</span>
                        <span className="col-count">Videos</span>
                        <span className="col-status">Status</span>
                        <span className="col-actions">Actions</span>
                    </div>
                    <div className="list-items">
                        {categoryData.map((cat) => (
                            <div key={cat.id} className="category-item-row">
                                <div className="col-drag">
                                    <GripVertical size={16} className="drag-handle" />
                                </div>
                                <div className="col-name">
                                    <div className="category-info-cell">
                                        <div className="category-icon-box">
                                            <Layers size={18} />
                                        </div>
                                        <div>
                                            <p className="cat-name">{cat.name}</p>
                                            <p className="cat-slug">/{cat.slug}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-count">
                                    <div className="video-count-pill">
                                        <Video size={12} />
                                        {cat.videos.toLocaleString()}
                                    </div>
                                </div>
                                <div className="col-status">
                                    <span className={`status-dot ${cat.status.toLowerCase()}`}>
                                        {cat.status}
                                    </span>
                                </div>
                                <div className="col-actions">
                                    <button className="icon-btn-sm" title="Manage Videos"><Eye size={16} /></button>
                                    <button className="icon-btn-sm" title="Edit"><Edit2 size={16} /></button>
                                    <button className="icon-btn-sm danger" title="Delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="curation-sidebar">
                    <div className="curation-card">
                        <h3 className="card-title">Homepage Curation</h3>
                        <p className="card-desc">Pinned categories appearing on the sidebar and home top bar.</p>
                        <div className="pinned-items">
                            {['Trending', 'New Content', 'Shorts'].map(item => (
                                <div key={item} className="pinned-item">
                                    <span>{item}</span>
                                    <CheckCircle2 size={16} className="pin-check" />
                                </div>
                            ))}
                        </div>
                        <button className="btn-outline w-full">Manage Curation</button>
                    </div>

                    <div className="curation-card info">
                        <h3 className="card-title">Taxonomy Tip</h3>
                        <p className="card-desc">Categories with more than 5,000 videos are automatically eligible for "Trending" tabs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
