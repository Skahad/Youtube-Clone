import React from 'react';
import { Coins, ShieldCheck, AlertTriangle, Monitor, DollarSign, BarChart2, Check, X, MoreVertical } from 'lucide-react';
import './MonetizationControl.css';

const videoData = [
    { id: 1, video: 'Gaming Highlights #102', creator: 'PlayFast', status: 'Monetized', suitability: 'Safe', ads: 'All' },
    { id: 2, video: 'Controversial Topic Deep Dive', creator: 'SpeakUp', status: 'Limited', suitability: 'Sensitive', ads: 'Internal Only' },
    { id: 3, video: 'Music Video - Summer Vibes', creator: 'BeatMaker', status: 'Claimed', suitability: 'Safe', ads: 'None' },
];

const MonetizationControl = () => {
    return (
        <div className="monetization-control-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Monetization Control</h1>
                    <p className="page-subtitle">Per-video ad suitability ratings, monetization toggles, and compliance oversight.</p>
                </div>
            </div>

            <div className="monetization-grid">
                <div className="control-stats">
                    <div className="stat-pill-sm">
                        <span className="label">Monetized Videos</span>
                        <span className="value">14.2M</span>
                    </div>
                    <div className="stat-pill-sm">
                        <span className="label">Limited Ads</span>
                        <span className="value">42.5k</span>
                    </div>
                    <div className="stat-pill-sm">
                        <span className="label">Compliance Alerts</span>
                        <span className="value danger">142</span>
                    </div>
                </div>

                <div className="video-monetization-table">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Video</th>
                                <th>Monetization</th>
                                <th>Suitability</th>
                                <th>Ad Inventory</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoData.map((v) => (
                                <tr key={v.id}>
                                    <td>
                                        <div className="video-cell-min">
                                            <div className="video-thumb-sm" />
                                            <div>
                                                <div className="v-title">{v.video}</div>
                                                <div className="v-creator">{v.creator}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`mon-status ${v.status.toLowerCase()}`}>
                                            <DollarSign size={14} /> {v.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`suitability-tag ${v.suitability.toLowerCase()}`}>
                                            {v.suitability === 'Safe' ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
                                            {v.suitability}
                                        </div>
                                    </td>
                                    <td className="text-secondary font-bold">{v.ads}</td>
                                    <td>
                                        <div className="action-row">
                                            <button className="btn-toggle active">ON</button>
                                            <button className="icon-btn-sm"><MoreVertical size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonetizationControl;
