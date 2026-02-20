import React, { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    Target,
    BarChart3,
    Plus,
    MoreVertical,
    Play,
    Pause,
    Settings2,
    Calendar,
    Eye,
    MousePointer2
} from 'lucide-react';
import './AdsManager.css';

const adsData = [
    { id: 1, name: 'Summer Tech Sale', client: 'ElectroHub', status: 'Active', budget: '$5,000', spent: '$2,140', cpm: '$8.20', ctr: '2.4%', type: 'Pre-roll' },
    { id: 2, name: 'Gaming Marathon Promo', client: 'GameStop', status: 'Paused', budget: '$10,000', spent: '$4,500', cpm: '$12.50', ctr: '3.1%', type: 'Overlay' },
    { id: 3, name: 'Brand Awareness Q1', client: 'Nike', status: 'Active', budget: '$25,000', spent: '$18,900', cpm: '$15.00', ctr: '1.8%', type: 'Pre-roll' },
    { id: 4, name: 'New Year Offer', client: 'GymShark', status: 'Completed', budget: '$3,500', spent: '$3,500', cpm: '$6.80', ctr: '2.9%', type: 'Mid-roll' },
];

const AdsManager = () => {
    return (
        <div className="ads-manager-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Ads Manager</h1>
                    <p className="page-subtitle">Manage advertising campaigns, track revenue, and configure ad placements.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline"><Calendar size={16} /> Last 30 Days</button>
                    <button className="btn-primary"><Plus size={16} /> Create Campaign</button>
                </div>
            </div>

            <div className="ads-stats-grid">
                <div className="stats-card">
                    <div className="stats-icon revenue"><DollarSign size={20} /></div>
                    <div className="stats-info">
                        <span className="stats-label">Total Revenue</span>
                        <p className="stats-value">$142,480</p>
                        <span className="stats-trend up">+12.4% vs last mo.</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon cpm"><BarChart3 size={20} /></div>
                    <div className="stats-info">
                        <span className="stats-label">Avg. CPM</span>
                        <p className="stats-value">$10.25</p>
                        <span className="stats-trend up">+2.1% vs last mo.</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon ctr"><MousePointer2 size={20} /></div>
                    <div className="stats-info">
                        <span className="stats-label">Avg. CTR</span>
                        <p className="stats-value">2.45%</p>
                        <span className="stats-trend down">-0.5% vs last mo.</span>
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-icon impressions"><Eye size={20} /></div>
                    <div className="stats-info">
                        <span className="stats-label">Total Impressions</span>
                        <p className="stats-value">12.8M</p>
                        <span className="stats-trend up">+8.5% vs last mo.</span>
                    </div>
                </div>
            </div>

            <div className="ads-content-grid">
                <div className="campaigns-panel">
                    <div className="panel-header">
                        <h3 className="panel-title"><Target size={18} /> Active Campaigns</h3>
                        <div className="panel-actions">
                            <button className="text-btn sm">Export PDF</button>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Client</th>
                                    <th>Budget</th>
                                    <th>Spent</th>
                                    <th>CTR</th>
                                    <th>Status</th>
                                    <th className="col-actions"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {adsData.map((ad) => (
                                    <tr key={ad.id}>
                                        <td>
                                            <div className="campaign-cell">
                                                <span className="campaign-name">{ad.name}</span>
                                                <span className="campaign-type">{ad.type}</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{ad.client}</td>
                                        <td className="text-secondary">{ad.budget}</td>
                                        <td>
                                            <div className="spend-cell">
                                                <span>{ad.spent}</span>
                                                <div className="spend-bar">
                                                    <div className="spend-fill" style={{ width: `${(parseInt(ad.spent.replace(/\$|,/g, '')) / parseInt(ad.budget.replace(/\$|,/g, ''))) * 100}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{ad.ctr}</td>
                                        <td>
                                            <span className={`status-badge ${ad.status.toLowerCase()}`}>
                                                {ad.status}
                                            </span>
                                        </td>
                                        <td className="col-actions">
                                            <div className="action-row">
                                                <button className="icon-btn-sm" title={ad.status === 'Active' ? 'Pause' : 'Start'}>
                                                    {ad.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                                                </button>
                                                <button className="icon-btn-sm"><Settings2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="placements-panel">
                    <div className="panel-header">
                        <h3 className="panel-title"><Settings2 size={18} /> Placements</h3>
                    </div>
                    <div className="placement-list">
                        {[
                            { label: 'Video Pre-roll', enabled: true },
                            { label: 'Video Mid-roll', enabled: true },
                            { label: 'Video Post-roll', enabled: false },
                            { label: 'Sidebar Display', enabled: true },
                            { label: 'Shorts Overlay', enabled: true },
                        ].map((p, i) => (
                            <div key={i} className="placement-row">
                                <span>{p.label}</span>
                                <div className={`toggle ${p.enabled ? 'on' : 'off'}`} />
                            </div>
                        ))}
                    </div>
                    <div className="placement-footer">
                        <button className="btn-primary w-full">Update Placements</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsManager;
