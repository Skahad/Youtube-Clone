import React, { useState, useRef, useEffect } from 'react';
import {
    Video, Eye, Users, UserPlus,
    MessageSquare, ThumbsUp, ThumbsDown, Bookmark,
    MoreHorizontal, X, Calendar, Play
} from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart
} from 'recharts';
import './Dashboard.css';

// Mock Data for Section 1: Users Chart (Target: ~264,063 total)
const usersData = [
    { name: 'Jan', user: 12500 }, { name: 'Feb', user: 15800 }, { name: 'Mar', user: 18200 },
    { name: 'Apr', user: 21000 }, { name: 'May', user: 24500 }, { name: 'Jun', user: 22000 },
    { name: 'Jul', user: 26000 }, { name: 'Aug', user: 28500 }, { name: 'Sep', user: 31000 },
    { name: 'Oct', user: 30000 }, { name: 'Nov', user: 33263 }, { name: 'Dec', user: 12000 },
];

// Mock Data for Section 2: Videos & Posts Chart
const contentData = [
    { name: 'Jan', videos: 1200, posts: 450 },
    { name: 'Feb', videos: 1550, posts: 520 },
    { name: 'Mar', videos: 1800, posts: 380 },
    { name: 'Apr', videos: 1400, posts: 610 },
    { name: 'May', videos: 1900, posts: 490 },
    { name: 'Jun', videos: 1650, posts: 550 },
    { name: 'Jul', videos: 2100, posts: 420 },
    { name: 'Aug', videos: 2300, posts: 680 },
    { name: 'Sep', videos: 1850, posts: 590 },
    { name: 'Oct', videos: 2050, posts: 510 },
    { name: 'Nov', videos: 2250, posts: 470 },
    { name: 'Dec', videos: 1521, posts: 442 },
];

// Mock Data for Section 4: Engagement Chart
const engagementData = [
    { name: 'Jan', likes: 2100, comments: 850, dislikes: 80 },
    { name: 'Feb', likes: 2500, comments: 920, dislikes: 110 },
    { name: 'Mar', likes: 1800, comments: 740, dislikes: 95 },
    { name: 'Apr', likes: 2200, comments: 1050, dislikes: 120 },
    { name: 'May', likes: 2800, comments: 880, dislikes: 70 },
    { name: 'Jun', likes: 2400, comments: 960, dislikes: 105 },
    { name: 'Jul', likes: 3100, comments: 1100, dislikes: 130 },
    { name: 'Aug', likes: 2700, comments: 990, dislikes: 90 },
    { name: 'Sep', likes: 2900, comments: 820, dislikes: 115 },
    { name: 'Oct', likes: 2300, comments: 750, dislikes: 100 },
    { name: 'Nov', likes: 2600, comments: 1200, dislikes: 85 },
    { name: 'Dec', likes: 2100, comments: 945, dislikes: 119 },
];

const statsData = [
    { label: 'Total Videos', value: '16,571', icon: Play, color: 'icon-blue' },
    { label: 'Total Videos Views', value: '1,857,241', icon: Eye, color: 'icon-cyan' },
    { label: 'Total Users', value: '264,063', icon: Users, color: 'icon-yellow' },
    { label: 'Total Subscriptions', value: '271,326', icon: UserPlus, color: 'icon-pink' },
    { label: 'Total Videos Comments', value: '9,455', icon: MessageSquare, color: 'icon-green' },
    { label: 'Total Videos Likes', value: '24,086', icon: ThumbsUp, color: 'icon-blue' },
    { label: 'Total Videos Dislikes', value: '1,019', icon: ThumbsDown, color: 'icon-cyan' },
    { label: 'Total Saved Videos', value: '16', icon: Bookmark, color: 'icon-gold' },
];

const Dashboard = () => {
    const user = { name: 'sunadaram' };
    const [showError, setShowError] = useState(true);
    const [dateRange, setDateRange] = useState('This Year');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
    const [tempStartDate, setTempStartDate] = useState('');
    const [tempEndDate, setTempEndDate] = useState('');
    const dropdownRef = useRef(null);

    const dateOptions = [
        'Today', 'Yesterday', 'This Week', 'This Month', 'Last Month', 'This Year', 'Custom Range'
    ];

    const handleApplyCustomRange = () => {
        if (tempStartDate && tempEndDate) {
            setDateRange(`${tempStartDate} - ${tempEndDate}`);
            setIsCustomPickerOpen(false);
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsCustomPickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [visibleSeries, setVisibleSeries] = useState({
        videos: true,
        posts: true,
        likes: true,
        comments: true,
        dislikes: true
    });

    const toggleSeries = (dataKey) => {
        setVisibleSeries(prev => ({
            ...prev,
            [dataKey]: !prev[dataKey]
        }));
    };

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Welcome back, {user.name}</h1>
                </div>
                <div className="header-actions">
                    <div className="dropdown-container" ref={dropdownRef}>
                        <button
                            className="btn-date-range"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {dateRange}
                        </button>

                        {isDropdownOpen && (
                            <div className="date-dropdown-menu">
                                {dateOptions.map((option) => (
                                    <div
                                        key={option}
                                        className={`dropdown-item ${dateRange === option ? 'active' : ''}`}
                                        onClick={() => {
                                            if (option === 'Custom Range') {
                                                setIsCustomPickerOpen(true);
                                            } else {
                                                setDateRange(option);
                                                setIsDropdownOpen(false);
                                                setIsCustomPickerOpen(false);
                                            }
                                        }}
                                    >
                                        {option}
                                    </div>
                                ))}

                                {isCustomPickerOpen && (
                                    <div className="custom-date-picker">
                                        <div className="picker-header">
                                            <Calendar size={14} />
                                            <span>Select Date Range</span>
                                        </div>
                                        <div className="picker-inputs">
                                            <div className="picker-field">
                                                <label>Start Date</label>
                                                <input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} />
                                            </div>
                                            <div className="picker-field">
                                                <label>End Date</label>
                                                <input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="picker-actions">
                                            <button className="btn-apply" onClick={handleApplyCustomRange} disabled={!tempStartDate || !tempEndDate}>
                                                Apply Range
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Error Alert */}
            {showError && (
                <div className="alert-banner error">
                    <div className="alert-content">
                        <span className="alert-bold">Important!</span> There are some errors found on your system, please review System Status.
                    </div>
                    <button className="close-alert-btn" onClick={() => setShowError(false)}>
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Grid Sections */}
            <div className="dashboard-grid">

                {/* Section 1: Dashboard / Users Chart */}
                <div className="dashboard-card chart-section">
                    <div className="card-header">
                        <h3>Dashboard</h3>
                        <p className="subtitle">Users Chart</p>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={usersData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip formatter={(value) => [`${value}`, 'user']} />
                                <Line type="monotone" dataKey="user" stroke="#3b82f6" strokeWidth={2} dot={false} animationDuration={1000} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section 2: Videos, Posts Chart */}
                <div className="dashboard-card chart-section">
                    <div className="card-header">
                        <h3>Videos , Posts Chart</h3>
                        <div className="chart-toggles">
                            <button
                                className={`toggle-btn videos ${visibleSeries.videos ? 'active' : ''}`}
                                onClick={() => toggleSeries('videos')}
                            >
                                <span className="dot"></span> Videos
                            </button>
                            <button
                                className={`toggle-btn posts ${visibleSeries.posts ? 'active' : ''}`}
                                onClick={() => toggleSeries('posts')}
                            >
                                <span className="dot"></span> Posts
                            </button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={contentData}>
                                <defs>
                                    <linearGradient id="colorVideos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip />
                                {visibleSeries.videos && (
                                    <Area type="smooth" dataKey="videos" stroke="#10b981" fillOpacity={1} fill="url(#colorVideos)" strokeWidth={2} animationDuration={1200} />
                                )}
                                {visibleSeries.posts && (
                                    <Line type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} animationDuration={1000} />
                                )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Section 3: Statistics Cards Grid */}
                <div className="stats-cards-grid">
                    {statsData.map((stat, index) => (
                        <div key={index} className="metric-card">
                            <div className={`metric-icon-wrapper ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="metric-info">
                                <p className="metric-label">{stat.label}</p>
                                <h3 className="metric-value">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 4: Comments, Likes, Dislikes Chart */}
                <div className="dashboard-card chart-section">
                    <div className="card-header">
                        <h3>Comments , Likes , Dislikes Chart</h3>
                        <div className="chart-toggles">
                            <button
                                className={`toggle-btn comments ${visibleSeries.comments ? 'active' : ''}`}
                                onClick={() => toggleSeries('comments')}
                            >
                                <span className="dot"></span> Comments
                            </button>
                            <button
                                className={`toggle-btn likes ${visibleSeries.likes ? 'active' : ''}`}
                                onClick={() => toggleSeries('likes')}
                            >
                                <span className="dot"></span> Likes
                            </button>
                            <button
                                className={`toggle-btn dislikes ${visibleSeries.dislikes ? 'active' : ''}`}
                                onClick={() => toggleSeries('dislikes')}
                            >
                                <span className="dot"></span> Dislikes
                            </button>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={engagementData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip />
                                {visibleSeries.likes && (
                                    <Area type="monotone" dataKey="likes" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} animationDuration={1400} />
                                )}
                                {visibleSeries.comments && (
                                    <Area type="monotone" dataKey="comments" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} animationDuration={1400} />
                                )}
                                {visibleSeries.dislikes && (
                                    <Area type="monotone" dataKey="dislikes" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} strokeWidth={2} animationDuration={1400} />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
