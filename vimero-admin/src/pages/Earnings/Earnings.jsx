import React, { useState, useEffect } from 'react';
import {
    ChevronRight, DollarSign, Wallet, MoreVertical,
    ArrowUpRight, Info, Loader2, Coins
} from 'lucide-react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';
import './Earnings.css';

const formatHugeNumber = (value) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(3) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(3) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(3) + 'K';
    return value.toString();
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(value);
};

const MOCK_TIME_DATA = {
    'Today': Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        videos: Math.floor(Math.random() * 5000),
        subscribe: Math.floor(Math.random() * 3000),
        ads: Math.floor(Math.random() * 10000)
    })),
    'This Week': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        time: day,
        videos: Math.floor(Math.random() * 30000),
        subscribe: Math.floor(Math.random() * 15000),
        ads: Math.floor(Math.random() * 50000)
    })),
    'This Month': Array.from({ length: 30 }, (_, i) => ({
        time: `Day ${i + 1}`,
        videos: Math.floor(Math.random() * 20000),
        subscribe: Math.floor(Math.random() * 10000),
        ads: Math.floor(Math.random() * 40000)
    })),
    'This Year': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
        time: month,
        videos: Math.floor(Math.random() * 500000),
        subscribe: Math.floor(Math.random() * 200000),
        ads: Math.floor(Math.random() * 800000)
    }))
};

const Earnings = () => {
    const [timeframe, setTimeframe] = useState('Today');
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setChartData(MOCK_TIME_DATA[timeframe]);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [timeframe]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="tooltip-item" style={{ color: entry.color }}>
                            <div className="tooltip-dot" style={{ backgroundColor: entry.color }} />
                            <span>{entry.name}: {formatCurrency(entry.value)}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="earnings-page">
            <nav className="breadcrumb">
                <span>Admin Panel</span>
                <ChevronRight size={14} />
                <span className="active">Earnings</span>
            </nav>

            <h1 className="page-title">Earnings</h1>

            {/* Top Cards */}
            <div className="earnings-summary-grid">
                <div className="summary-card" title="Total with commission">
                    <div className="summary-icon blue">
                        <Wallet size={28} />
                    </div>
                    <div className="summary-details">
                        <h3>TOTAL Earnings With Commission</h3>
                        <div className="summary-value">$ 1.096.347.166.452.128</div>
                    </div>
                </div>

                <div className="summary-card" title="Total without commission">
                    <div className="summary-icon blue">
                        <DollarSign size={28} />
                    </div>
                    <div className="summary-details">
                        <h3>TOTAL Earnings Without Commission</h3>
                        <div className="summary-value">$ 1.107.417.436.570.111</div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon yellow">
                        <Coins size={28} />
                    </div>
                    <div className="summary-details">
                        <h3>TOTAL Commission</h3>
                        <div className="summary-value" title="Total commission earned by platform">4.401B</div>
                    </div>
                </div>
            </div>

            {/* Secondary Row */}
            <div className="secondary-earnings-row">
                <div className="secondary-card">
                    <div className="secondary-icon">
                        <DollarSign size={20} />
                    </div>
                    <div className="secondary-details">
                        <h4>TOTAL Earnings Today</h4>
                        <div className="secondary-value">$ 294.294</div>
                    </div>
                </div>
                <div className="secondary-card">
                    <div className="secondary-icon">
                        <DollarSign size={20} />
                    </div>
                    <div className="secondary-details">
                        <h4>TOTAL Earnings This Month</h4>
                        <div className="secondary-value">$ 988.129K</div>
                    </div>
                </div>
                <div className="secondary-card">
                    <div className="secondary-icon">
                        <DollarSign size={20} />
                    </div>
                    <div className="secondary-details">
                        <h4>TOTAL Earnings This Year</h4>
                        <div className="secondary-value">$ 988.129K</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="analytics-card">
                <div className="card-header">
                    <h2>USERS STATICS</h2>
                    <select
                        className="filter-select"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                    >
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                        <option value="This Year">This Year</option>
                    </select>
                </div>

                <div className="chart-container">
                    {loading && (
                        <div className="chart-loading">
                            <Loader2 className="spinner" size={32} />
                        </div>
                    )}
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                                tickFormatter={(val) => `$${formatHugeNumber(val)}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 600 }}
                            />
                            <Bar name="Videos Earnings" dataKey="videos" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            <Bar name="Subscribe Earnings" dataKey="subscribe" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            <Bar name="Ads Earnings" dataKey="ads" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Earnings;
