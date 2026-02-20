import React from 'react';
import { Search, TrendingUp, TrendingDown, Target, Zap, Sliders, AlertCircle, MoreVertical } from 'lucide-react';
import './SearchControl.css';

const SearchControl = () => {
    return (
        <div className="search-control-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Search & Recommendation Control</h1>
                    <p className="page-subtitle">Manage ranking overrides, trending logic, and keyword blacklists for platform discovery.</p>
                </div>
            </div>

            <div className="search-intelligence-grid">
                <div className="ranking-panel">
                    <h3>Trending Overrides</h3>
                    <div className="override-list">
                        <div className="override-row">
                            <div className="v-info">
                                <span className="v-title">Educational Hackathons 2024</span>
                                <span className="v-tag">Boost Level: High</span>
                            </div>
                            <div className="v-actions">
                                <button className="btn-sm success">Boost +20%</button>
                            </div>
                        </div>
                        <div className="override-row">
                            <div className="v-info">
                                <span className="v-title">Low Quality Clickbait v3</span>
                                <span className="v-tag">Demote Level: Critical</span>
                            </div>
                            <div className="v-actions">
                                <button className="btn-sm danger">Demote -50%</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="keyword-panel">
                    <h3>Keyword Supervision</h3>
                    <div className="blacklist-container">
                        <div className="keyword-tags">
                            {['spam', 'scam', 'free-gift', 'win-money'].map(k => (
                                <span key={k} className="keyword-tag">
                                    {k} <button className="remove-tag">×</button>
                                </span>
                            ))}
                        </div>
                        <div className="add-keyword">
                            <input type="text" placeholder="Add keyword to blacklist..." />
                            <button className="btn-primary sm">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchControl;
