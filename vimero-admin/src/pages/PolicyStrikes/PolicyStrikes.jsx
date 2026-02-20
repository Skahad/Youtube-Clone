import React from 'react';
import { Gavel, ShieldAlert, AlertCircle, Clock, CheckCircle2, MoreVertical, Plus } from 'lucide-react';
import './PolicyStrikes.css';

const strikeData = [
    { id: 1, channel: 'NewsFocus', type: 'Spam/Deception', date: '2024-03-10', expiry: '2024-06-10', level: 'Strike 1', status: 'Active' },
    { id: 2, channel: 'TrendGamer', type: 'Harassment', date: '2024-01-15', expiry: '2024-04-15', level: 'Strike 2', status: 'Active' },
    { id: 3, channel: 'ReactBros', type: 'Copyright Infringe', date: '2023-11-20', expiry: 'Expired', level: 'Strike 1', status: 'Inactive' },
];

const PolicyStrikes = () => {
    return (
        <div className="policy-strikes-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Policy & Community Strikes</h1>
                    <p className="page-subtitle">Monitor guideline violations and manage strike enforcement logic.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary"><Plus size={16} /> New Policy Update</button>
                </div>
            </div>

            <div className="strike-alerts">
                <div className="alert-card warning">
                    <AlertCircle size={20} />
                    <div>
                        <strong>Recent Spike in Spam Violations</strong>
                        <p>Spam-related reports have increased by 22% in the last 48 hours.</p>
                    </div>
                </div>
            </div>

            <div className="strike-table-container">
                <div className="panel-header-sub">
                    <h3>Recent Enforcement Actions</h3>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Creator Channel</th>
                            <th>Violation Category</th>
                            <th>Strike Level</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {strikeData.map((strike) => (
                            <tr key={strike.id}>
                                <td className="font-bold">{strike.channel}</td>
                                <td className="text-secondary">{strike.type}</td>
                                <td>
                                    <span className={`strike-pill ${strike.level.replace(' ', '-').toLowerCase()}`}>
                                        {strike.level}
                                    </span>
                                </td>
                                <td>
                                    <div className="expiry-cell">
                                        <Clock size={12} /> {strike.expiry}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-pill ${strike.status.toLowerCase()}`}>{strike.status}</span>
                                </td>
                                <td className="col-actions">
                                    <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PolicyStrikes;
