import React, { useState } from 'react';
import {
  LayoutDashboard,
  Video,
  Clapperboard,
  Users,
  Flag,
  MessageSquare,
  BarChart3,
  Tags,
  Settings,
  ShieldAlert,
  Menu,
  MonitorPlay,
  Activity,
  Key,
  AlertTriangle,
  DollarSign,
  Crown,
  UserSquare2,
  CircleUser,
  Copyright,
  Coins,
  Gavel,
  MailCheck,
  Radio,
  Library,
  Banknote,
  FlaskConical,
  Users2,
  ListPlus,
  Search,
  ChevronDown,
  Minus,
  Globe,
  Upload,
  PlaySquare,
  Mail,
  Share2,
  Tv,
  Cpu,
  Calendar,
  Plus,
  Languages,
  FileText
} from 'lucide-react';
import './Sidebar.css';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
      { icon: BarChart3, label: 'Analytics', id: 'analytics' },
    ]
  },
  {
    title: 'Content',
    items: [
      { icon: Video, label: 'Videos', id: 'videos' },
      { icon: Clapperboard, label: 'Shorts', id: 'shorts' },
      { icon: Radio, label: 'Live Streams', id: 'live-streams' },
      { icon: Library, label: 'Playlists', id: 'playlists' },
      { icon: MessageSquare, label: 'Community Posts', id: 'community-posts' },
      {
        icon: FileText,
        label: 'Articles',
        id: 'articles',
        subItems: [
          { label: 'Create New Article', id: 'articles-create', icon: Plus },
          { label: 'Manage Articles', id: 'articles-manage', icon: Settings },
        ]
      },
    ]
  },
  {
    title: 'Creator & Community',
    items: [
      { icon: UserSquare2, label: 'Creator Studio', id: 'creator-studio' },
      {
        icon: CircleUser,
        label: 'Users',
        id: 'users',
        subItems: [
          { label: 'Manage Users', id: 'users-manage', icon: Users },
          { label: 'Affiliates Settings', id: 'users-affiliates', icon: Settings },
          { label: 'Manage Custom Profile Fields', id: 'users-profile-fields', icon: Settings },
          { label: 'Manage Verification Requests', id: 'users-verification', icon: ShieldAlert },
          { label: 'Manage Monetization Requests', id: 'users-monetization', icon: Coins },
        ]
      },
      { icon: MessageSquare, label: 'Comments', id: 'comments' },
    ]
  },
  {
    title: 'Trust & Safety',
    items: [
      { icon: Flag, label: 'Reports', id: 'reports' },
      { icon: Copyright, label: 'Copyright Match', id: 'copyright' },
      { icon: Gavel, label: 'Policy & Strikes', id: 'policy' },
      { icon: MailCheck, label: 'Appeals', id: 'appeals' },
      { icon: ShieldAlert, label: 'Audit Logs', id: 'audit-logs' },
    ]
  },
  {
    title: 'Monetization',
    items: [
      {
        icon: DollarSign,
        label: 'Payments & Ads',
        id: 'payments-ads',
        subItems: [
          { label: 'Payment Configuration', id: 'ads-payment-config', icon: Settings },
          { label: 'Advertisement Settings', id: 'ads-settings', icon: Settings },
          { label: 'Manage Bank Receipts', id: 'ads-bank-receipts', icon: ListPlus },
          { label: 'Manage Video Ads', id: 'ads-video', icon: Video },
          { label: 'Manage Website Ads', id: 'ads-website', icon: Globe },
          { label: 'Manage User Ads', id: 'ads-user', icon: Users },
          { label: 'Payment Requests', id: 'ads-payment-requests', icon: Banknote },
          { label: 'Manage Currencies', id: 'ads-currencies', icon: Coins },
          { label: 'Earnings', id: 'ads-earnings', icon: DollarSign },
        ]
      },
      { icon: Crown, label: 'Premium Plans', id: 'premium-plans' },
      { icon: Coins, label: 'Monetization Control', id: 'monetization' },
      { icon: Banknote, label: 'Revenue Analytics', id: 'revenue-payouts' },
    ]
  },
  {
    title: 'Organization',
    items: [
      { icon: Tags, label: 'Categories', id: 'categories' },
    ]
  },
  {
    title: 'Platform Ops',
    items: [
      { icon: Activity, label: 'System Health', id: 'system-health' },
      { icon: Search, label: 'Search Control', id: 'search-control' },
      {
        icon: Languages,
        label: 'Languages',
        id: 'languages',
        subItems: [
          { label: 'Add New Language & Keys', id: 'langs-add', icon: Plus },
          { label: 'Manage Languages', id: 'langs-manage', icon: Settings },
        ]
      },
      { icon: FlaskConical, label: 'Experiments', id: 'experiments' },
      { icon: Key, label: 'API Settings', id: 'api-settings' },
      { icon: AlertTriangle, label: 'Error Logs', id: 'error-logs' },
      { icon: Users2, label: 'Admin Collab', id: 'admin-collab' },
      {
        icon: Settings,
        label: 'Settings',
        id: 'settings',
        subItems: [
          { label: 'General Configuration', id: 'settings-general', icon: Cpu },
          { label: 'Website Information', id: 'settings-website', icon: Globe },
          { label: 'Import & Upload Configuration', id: 'settings-upload', icon: Upload },
          { label: 'Video & Player Settings', id: 'settings-video', icon: PlaySquare },
          { label: 'E-mail Setup', id: 'settings-email', icon: Mail },
          { label: 'Social Login Settings', id: 'settings-social', icon: Share2 },
          { label: 'Setup Live Streaming', id: 'settings-live', icon: Radio },
          { label: 'Manage Currencies', id: 'ads-currencies', icon: Coins },
          { label: 'CronJob Settings', id: 'settings-cron', icon: Activity },
        ]
      },
    ]
  }
];

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose, collapsed, setCollapsed }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const handleItemClick = (item) => {
    if (item.subItems) {
      setExpandedMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {!collapsed && <img src="/logo.png" alt="Vidmero Logo" className="logo-icon" style={{ height: '28px' }} />}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group, idx) => (
          <div key={idx} className="nav-group">
            {!collapsed && <h4 className="nav-group-title">{group.title}</h4>}
            {group.items.map((item) => {
              const hasSubItems = !!item.subItems;
              const isExpanded = hasSubItems && expandedMenus[item.id];

              return (
                <div key={item.id} className={`nav-item-container ${isExpanded ? 'active-submenu' : ''}`}>
                  <button
                    className={`nav-item ${activeTab === item.id || (hasSubItems && isExpanded) ? 'active' : ''}`}
                    onClick={() => handleItemClick(item)}
                    title={collapsed ? item.label : ''}
                  >
                    <item.icon className="nav-icon" size={20} />
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                    {hasSubItems && !collapsed && (
                      <div className="expand-icon">
                        {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    )}
                    {activeTab === item.id && !hasSubItems && <div className="active-indicator" />}
                  </button>

                  {isExpanded && !collapsed && (
                    <div className="sub-menu">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          className={`sub-item ${activeTab === subItem.id ? 'active' : ''}`}
                          onClick={() => setActiveTab(subItem.id)}
                        >
                          <span className="sub-label">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            <div className="avatar">AD</div>
            <div className="details">
              <p className="name">Alex Smith</p>
              <p className="role">Super Admin</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
