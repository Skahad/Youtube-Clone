import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, Menu, X, Check } from 'lucide-react';
import './TopBar.css';

const initialNotifications = [
    { id: 1, title: 'New User Registration', message: 'User "johndoe" has signed up.', time: '2 min ago', read: false },
    { id: 2, title: 'Video Uploaded', message: 'Video "My Vacation" is ready.', time: '1 hour ago', read: false },
    { id: 3, title: 'System Alert', message: 'High server load detected.', time: '3 hours ago', read: true },
    { id: 4, title: 'Comment Reported', message: 'A comment was flagged as spam.', time: '5 hours ago', read: true },
];

const TopBar = ({ onMenuClick, collapsed }) => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const handleViewAll = () => {
        alert('Navigating to full notifications page...');
        setShowNotifications(false);
    };

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="topbar">
            {/* ... left part remains same ... */}
            <div className="topbar-left">
                {collapsed && (
                    <div className="topbar-logo" style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="Vidmero Logo" style={{ height: '28px' }} />
                    </div>
                )}
                <button className="mobile-menu-btn" onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search videos, users, reports..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="topbar-right">
                <div className="notification-wrapper" ref={notificationRef}>
                    <button
                        className={`icon-btn ${showNotifications ? 'active' : ''}`}
                        title="Notifications"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && <span className="notification-badge" />}
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="notification-header">
                                <h3>Notifications</h3>
                                <div className="notification-actions">
                                    <button className="text-btn" onClick={markAllAsRead}>Mark all as read</button>
                                </div>
                            </div>
                            <div className="notification-list">
                                {notifications.length > 0 ? (
                                    notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="notification-icon">
                                                <Bell size={16} />
                                            </div>
                                            <div className="notification-content">
                                                <p className="notification-title">{notification.title}</p>
                                                <p className="notification-message">{notification.message}</p>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                            {!notification.read && <div className="unread-dot" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-notifications">
                                        <p>No notifications</p>
                                    </div>
                                )}
                            </div>
                            <div className="notification-footer">
                                <button className="text-btn" onClick={handleViewAll}>View All</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="profile-trigger">
                    <div className="avatar sm">AD</div>
                    <div className="profile-info">
                        <span className="profile-name">Admin</span>
                        <span className="profile-role">Super Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
