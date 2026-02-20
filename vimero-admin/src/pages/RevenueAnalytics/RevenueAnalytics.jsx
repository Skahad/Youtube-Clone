import React from 'react';
import { Banknote, TrendingUp, TrendingDown, DollarSign, PieChart, Users, Calendar, ArrowUpRight } from 'lucide-react';
import './RevenueAnalytics.css';

const data = [
    { month: 'Jan', revenue: 420000, creators: 1200 },
    { month: 'Feb', revenue: 450000, creators: 1250 },
    { month: 'Mar', revenue: 480000, creators: 1300 },
];

const RevenueAnalytics = () => {
    return (
        <div className="revenue-payouts-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Revenue & Payout Analytics</h1>
                    <p className="page-subtitle">Track platform EARNINGS, creator distributions, and CPM/RPM trends.</p>
                </div>
            </div>

            <div className="revenue-hero-stats">
                <div className="hero-card">
                    <div className="hero-label">Net Platform Revenue (YTD)</div>
                    <div className="hero-value">$4.2M</div>
                    <div className="hero-trend up"><TrendingUp size={14} /> +18.5%</div>
                </div>
                <div className="hero-card">
                    <div className="hero-label">Total Creator Payouts</div>
                    <div className="hero-value">$12.8M</div>
                    <div className="hero-trend up"><TrendingUp size={14} /> +22.1%</div>
                </div>
                <div className="hero-card">
                    <div className="hero-label">Avg. RPM</div>
                    <div className="hero-value">$8.45</div>
                    <div className="hero-trend down"><TrendingDown size={14} /> -1.2%</div>
                </div>
            </div>

            <div className="revenue-details-grid">
                <div className="payout-panel">
                    <div className="section-header">
                        <h3>Pending Payouts</h3>
                        <button className="text-btn sm">View Schedule</button>
                    </div>
                    <div className="payout-list">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="payout-row">
                                <div className="payout-creator">
                                    <div className="mini-avatar">C{i}</div>
                                    <span>Creator Name {i}</span>
                                </div>
                                <div className="payout-amount">$4,250.00</div>
                                <div className="payout-status">Processing</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="split-panel">
                    <h3>Revenue Splits</h3>
                    <div className="split-chart-placeholder">
                        <div className="pie-overlay">
                            <PieChart size={120} strokeWidth={1} color="var(--accent-color)" />
                        </div>
                        <div className="split-legend">
                            <div className="legend-item"><span className="dot platform" /> Platform (45%)</div>
                            <div className="legend-item"><span className="dot creator" /> Creator (55%)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueAnalytics;
