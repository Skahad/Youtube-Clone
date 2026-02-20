import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRight, Home, Type, AlignLeft, AlignCenter,
    AlignRight, AlignJustify, Bold, Italic, List,
    ListOrdered, Link as LinkIcon, Image as ImageIcon,
    Smile, Eraser, Palette, Table, Save, Send,
    Plus, X, Upload, CheckCircle2, AlertTriangle,
    ChevronDown, Search
} from 'lucide-react';
import './CreateArticle.css';

const CreateArticle = () => {
    const [articleData, setArticleData] = useState({
        title: '',
        description: '',
        category: 'Film & Animation',
        tags: [],
        tagInput: ''
    });

    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const editorRef = useRef(null);

    const categories = [
        'Film & Animation', 'Music', 'Pets & Animals',
        'Sports', 'Travel & Events', 'Gaming',
        'People & Blogs', 'Comedy', 'Entertainment',
        'News & Politics', 'Howto & Style', 'Education'
    ];

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('Image size should be less than 5MB', 'error');
                return;
            }
            setFeaturedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = articleData.tagInput.trim().replace(',', '');
            if (tag && !articleData.tags.includes(tag)) {
                setArticleData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag],
                    tagInput: ''
                }));
            }
        }
    };

    const removeTag = (tagToRemove) => {
        setArticleData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // Editor Commands
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
    };

    const handlePublish = (status = 'published') => {
        const content = editorRef.current.innerHTML;

        if (!articleData.title.trim()) {
            showToast('Please enter an article title', 'error');
            return;
        }
        if (content === '<br>' || !content.trim()) {
            showToast('Article content cannot be empty', 'error');
            return;
        }

        setIsSubmitting(true);
        // Simulate API Call
        setTimeout(() => {
            setIsSubmitting(false);
            showToast(status === 'published' ? 'Article published successfully!' : 'Draft saved successfully.');
        }, 1500);
    };

    return (
        <div className="config-container create-article-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Home size={14} />
                <ChevronRight size={14} />
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span>Articles</span>
                <ChevronRight size={14} />
                <span className="active">Create new article</span>
            </nav>

            <h1 className="page-title">Create new article</h1>

            <div className={`main-article-card ${isSubmitting ? 'submitting' : ''}`}>
                <div className="article-form-grid">
                    {/* Left Column: Editor & Main Info */}
                    <div className="article-main-col">
                        <div className="input-group">
                            <label className="article-label">Type a title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Type a title"
                                className="article-input-title"
                                value={articleData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-group">
                            <label className="article-label">Type a description</label>
                            <textarea
                                name="description"
                                placeholder="Type a description"
                                className="article-textarea"
                                rows="3"
                                value={articleData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Rich Text Editor */}
                        <div className="editor-container">
                            <div className="editor-toolbar">
                                <button onClick={() => execCommand('bold')} title="Bold"><Bold size={16} /></button>
                                <button onClick={() => execCommand('italic')} title="Italic"><Italic size={16} /></button>
                                <div className="toolbar-divider" />
                                <button onClick={() => execCommand('justifyLeft')} title="Align Left"><AlignLeft size={16} /></button>
                                <button onClick={() => execCommand('justifyCenter')} title="Align Center"><AlignCenter size={16} /></button>
                                <button onClick={() => execCommand('justifyRight')} title="Align Right"><AlignRight size={16} /></button>
                                <button onClick={() => execCommand('justifyFull')} title="Justify"><AlignJustify size={16} /></button>
                                <div className="toolbar-divider" />
                                <button onClick={() => execCommand('insertUnorderedList')} title="Bullet List"><List size={16} /></button>
                                <button onClick={() => execCommand('insertOrderedList')} title="Numbered List"><ListOrdered size={16} /></button>
                                <div className="toolbar-divider" />
                                <button onClick={() => {
                                    const url = prompt('Enter URL:');
                                    if (url) execCommand('createLink', url);
                                }} title="Insert Link"><LinkIcon size={16} /></button>
                                <button onClick={() => alert('Insert Image logic')} title="Insert Image"><ImageIcon size={16} /></button>
                                <button onClick={() => execCommand('insertHTML', '&#128512;')} title="Emoji"><Smile size={16} /></button>
                                <div className="toolbar-divider" />
                                <button onClick={() => execCommand('removeFormat')} title="Clear Formatting"><Eraser size={16} /></button>
                                <button onClick={() => alert('Table logic')} title="Insert Table"><Table size={16} /></button>
                            </div>
                            <div
                                className="editor-content"
                                contentEditable
                                ref={editorRef}
                                placeholder="Type your article content here..."
                            />
                        </div>
                    </div>

                    {/* Right Column: Meta & Actions */}
                    <div className="article-side-col">
                        <div className="side-section">
                            <label className="article-label">Featured Image</label>
                            <div className="image-upload-dashed" onClick={() => document.getElementById('image-upload').click()}>
                                {imagePreview ? (
                                    <div className="image-preview-container">
                                        <img src={imagePreview} alt="Preview" />
                                        <div className="image-overlay">
                                            <Upload size={20} />
                                            <span>Change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <div className="plus-box">
                                            <Plus size={24} />
                                        </div>
                                        <span>Select Image</span>
                                    </div>
                                )}
                                <input
                                    id="image-upload"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="side-section">
                            <label className="article-label">Category</label>
                            <div className="custom-select-wrapper">
                                <select
                                    name="category"
                                    className="article-select"
                                    value={articleData.category}
                                    onChange={handleInputChange}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="select-arrow" size={16} />
                            </div>
                        </div>

                        <div className="side-section">
                            <label className="article-label">Tags</label>
                            <div className="tags-container-input">
                                <div className="tags-pills">
                                    {articleData.tags.map(tag => (
                                        <span key={tag} className="tag-pill">
                                            {tag}
                                            <X size={12} onClick={() => removeTag(tag)} />
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    name="tagInput"
                                    placeholder="Type tags and hit enter"
                                    className="article-tag-input"
                                    value={articleData.tagInput}
                                    onChange={handleInputChange}
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                            <p className="field-help">Comma separated tags</p>
                        </div>

                        <div className="article-actions-group">
                            <button
                                className="btn-publish"
                                onClick={() => handlePublish('published')}
                                disabled={isSubmitting}
                            >
                                <Send size={18} />
                                {isSubmitting ? 'Publishing...' : 'Publish'}
                            </button>
                            <button
                                className="btn-draft"
                                onClick={() => handlePublish('draft')}
                                disabled={isSubmitting}
                            >
                                <Save size={18} />
                                Save Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default CreateArticle;
