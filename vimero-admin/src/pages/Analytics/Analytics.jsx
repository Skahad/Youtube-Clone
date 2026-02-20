import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    Clock,
    ArrowUpRight,
    Calendar,
    Download,
    Filter,
    Eye,
    MousePointer2
} from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('Daily');
    const [isExporting, setIsExporting] = useState(false);
    const [dateLabel, setDateLabel] = useState('Mar 1, 2024 - Mar 17, 2024');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCustomInputs, setShowCustomInputs] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    const handleExport = () => {
        setIsExporting(true);

        // Prepare data for export
        const exportData = {
            summary: [
                { metric: 'Watch Time', value: '4.2k hrs', change: '+12.4%' },
                { metric: 'Avg View Duration', value: '3:45', change: '+2.1%' },
                { metric: 'Impressions', value: '1.2M', change: '+8.5%' },
                { metric: 'Click-Through Rate', value: '6.4%', change: '-0.8%' }
            ],
            topCountries: [
                { country: 'United States', percentage: '42%' },
                { country: 'India', percentage: '18%' },
                { country: 'United Kingdom', percentage: '12%' },
                { country: 'Germany', percentage: '8%' }
            ]
        };

        // Convert to CSV format
        let csvContent = "data:text/csv;charset=utf-8,";

        // Add Summary Section
        csvContent += "Metric,Value,Change\n";
        exportData.summary.forEach(item => {
            csvContent += `${item.metric},${item.value},${item.change}\n`;
        });

        csvContent += "\nTop Countries,Percentage\n";
        exportData.topCountries.forEach(item => {
            csvContent += `${item.country},${item.percentage}\n`;
        });

        // Simulate processing delay for realistic feel
        setTimeout(() => {
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `vidmero_analytics_${timeRange.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsExporting(false);
        }, 1500);
    };

    const handleDateSelection = (range) => {
        setShowDatePicker(false);
        setShowCustomInputs(false);
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - range);

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        setDateLabel(`${pastDate.toLocaleDateString('en-US', options)} - ${today.toLocaleDateString('en-US', options)}`);
        setTimeRange('Daily'); // Reset to default or appropriate value
    };

    const handleCustomDateApply = () => {
        if (customStartDate && customEndDate) {
            const start = new Date(customStartDate);
            const end = new Date(customEndDate);

            if (start > end) {
                alert("Start date cannot be after end date");
                return;
            }

            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            setDateLabel(`${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`);
            setTimeRange('Custom');
            setShowDatePicker(false);
            setShowCustomInputs(false);
        }
    };

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Platform Analytics</h1>
                    <p className="page-subtitle">Deep dive into viewership, engagement, and growth metrics.</p>
                </div>
                <div className="header-actions" style={{ position: 'relative' }}>
                    <button
                        className="btn-outline"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <Calendar size={16} />
                        {dateLabel}
                    </button>

                    {showDatePicker && (
                        <div className="date-picker-menu">
                            <button onClick={() => handleDateSelection(7)}>Last 7 days</button>
                            <button onClick={() => handleDateSelection(28)}>Last 28 days</button>
                            <button onClick={() => handleDateSelection(90)}>Last 90 days</button>
                            <button onClick={() => handleDateSelection(365)}>Last 365 days</button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCustomInputs(!showCustomInputs);
                                }}
                                className={showCustomInputs ? "active" : ""}
                            >
                                Custom
                            </button>

                            {showCustomInputs && (
                                <div className="custom-date-inputs" onClick={(e) => e.stopPropagation()}>
                                    <div className="date-input-group">
                                        <label>Start</label>
                                        <input
                                            type="date"
                                            value={customStartDate}
                                            onChange={(e) => setCustomStartDate(e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="date-input-group">
                                        <label>End</label>
                                        <input
                                            type="date"
                                            value={customEndDate}
                                            onChange={(e) => setCustomEndDate(e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <button
                                        className="apply-btn"
                                        onClick={handleCustomDateApply}
                                        disabled={!customStartDate || !customEndDate}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        className="btn-primary"
                        onClick={handleExport}
                        disabled={isExporting}
                        style={{ minWidth: '160px' }}
                    >
                        {isExporting ? (
                            <>
                                <span className="spinner-sm" /> Exporting...
                            </>
                        ) : (
                            <>
                                <Download size={16} /> Export Analysis
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="analytics-grid">
                <div className="metrics-summary">
                    {[
                        { label: 'Watch Time', value: '4.2k hrs', change: '+12.4%', icon: Clock },
                        { label: 'Avg View Duration', value: '3:45', change: '+2.1%', icon: TrendingUp },
                        { label: 'Impressions', value: '1.2M', change: '+8.5%', icon: Eye },
                        { label: 'Click-Through Rate', value: '6.4%', change: '-0.8%', icon: MousePointer2 },
                    ].map((m, i) => (
                        <div key={i} className="metric-item">
                            <div className="metric-icon"><m.icon size={20} /></div>
                            <div className="metric-info">
                                <p className="metric-label">{m.label}</p>
                                <p className="metric-value">{m.value}</p>
                                <p className={`metric-change ${m.change.startsWith('+') ? 'up' : 'down'}`}>
                                    {m.change} <span>vs last period</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="analytics-card main-chart-full">
                    <div className="card-header">
                        <h3 className="card-title">Views Performance ({timeRange})</h3>
                        <div className="card-filters">
                            {['Daily', 'Weekly', 'Monthly'].map(range => (
                                <button
                                    key={range}
                                    className={`chart-tab ${timeRange === range ? 'active' : ''}`}
                                    onClick={() => setTimeRange(range)}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="big-chart-placeholder">
                        <div className="chart-lines">
                            {/* Visual representation of a line chart */}
                            <svg viewBox="0 0 800 200" className="sparkline">
                                <path d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40 T600,90 T700,50 T800,70" fill="none" stroke="var(--accent-color)" strokeWidth="3" />
                                <path d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40 T600,90 T700,50 T800,70 V200 H0 Z" fill="var(--accent-light)" opacity="0.5" />
                            </svg>
                        </div>
                        <div className="chart-axes">
                            {['Mar 1', 'Mar 4', 'Mar 8', 'Mar 12', 'Mar 17'].map(d => <span key={d}>{d}</span>)}
                        </div>
                    </div>
                </div>

                <div className="side-container">
                    <div className="analytics-card audience-card">
                        <div className="card-header">
                            <h3 className="card-title">Top Countries</h3>
                        </div>
                        <div className="country-list">
                            {[
                                { name: 'United States', val: '42%', color: '#0493D1' },
                                { name: 'India', val: '18%', color: '#3B82F6' },
                                { name: 'United Kingdom', val: '12%', color: '#60A5FA' },
                                { name: 'Germany', val: '8%', color: '#93C5FD' },
                            ].map(c => (
                                <div key={c.name} className="country-row">
                                    <div className="country-info">
                                        <span>{c.name}</span>
                                        <span>{c.val}</span>
                                    </div>
                                    <div className="country-bar-bg">
                                        <div className="country-bar-fill" style={{ width: c.val, backgroundColor: c.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="analytics-card retention-card">
                        <div className="card-header">
                            <h3 className="card-title">Device Breakdown</h3>
                        </div>
                        <div className="donut-placeholder">
                            <div className="donut">
                                <div className="donut-center">
                                    <span className="total">100%</span>
                                    <span className="sub">Mobile Heavy</span>
                                </div>
                            </div>
                            <div className="donut-legend">
                                <div className="legend-item"><span className="dot mobile" /> Mobile (65%)</div>
                                <div className="legend-item"><span className="dot desktop" /> Desktop (28%)</div>
                                <div className="legend-item"><span className="dot tablet" /> Tablet (7%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
