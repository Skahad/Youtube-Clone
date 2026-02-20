import React from 'react';
import {
    Crown,
    Check,
    Plus,
    Users,
    TrendingUp,
    MoreVertical,
    Edit3,
    Trash2,
    Lock,
    Zap,
    Star,
    DollarSign
} from 'lucide-react';
import './PremiumPlans.css';

const plansData = [
    {
        id: 1,
        name: 'Basic',
        price: '$0',
        period: 'Forever',
        status: 'Active',
        users: '124k',
        features: ['Standard quality', 'Ad-supported', 'Limited downloads'],
        color: '#64748b'
    },
    {
        id: 2,
        name: 'Pro',
        price: '$9.99',
        period: 'Month',
        status: 'Active',
        users: '45.2k',
        features: ['4K Streaming', 'Ad-free', 'Unlimited downloads', 'Exclusive content'],
        color: '#0493D1'
    },
    {
        id: 3,
        name: 'Enterprise',
        price: '$29.99',
        period: 'Month',
        status: 'Active',
        users: '1.2k',
        features: ['8K Support', 'Bulk licensing', 'Dedicated support', 'Custom API access'],
        color: '#8b5cf6'
    }
];

const PremiumPlans = () => {
    return (
        <div className="premium-plans-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Subscription Management</h1>
                    <p className="page-subtitle">Configure premium tiers, manage features, and track subscriber growth.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary"><Plus size={16} /> Create New Plan</button>
                </div>
            </div>

            <div className="premium-stats-grid">
                <div className="stat-pill-card">
                    <div className="pill-icon subscribers"><Users size={20} /></div>
                    <div className="pill-content">
                        <span className="pill-label">Total Subscribers</span>
                        <span className="pill-value">170.4k</span>
                    </div>
                    <div className="pill-trend up">+8.2%</div>
                </div>
                <div className="stat-pill-card">
                    <div className="pill-icon revenue"><DollarSign size={20} /></div>
                    <div className="pill-content">
                        <span className="pill-label">Monthly ARR</span>
                        <span className="pill-value">$462,800</span>
                    </div>
                    <div className="pill-trend up">+15.4%</div>
                </div>
                <div className="stat-pill-card">
                    <div className="pill-icon active-plans"><Zap size={20} /></div>
                    <div className="pill-content">
                        <span className="pill-label">Avg. Revenue / User</span>
                        <span className="pill-value">$8.42</span>
                    </div>
                    <div className="pill-trend down">-2.1%</div>
                </div>
            </div>

            <div className="plans-grid">
                {plansData.map((plan) => (
                    <div key={plan.id} className="plan-card">
                        <div className="plan-card-header" style={{ borderColor: plan.color }}>
                            <div className="plan-title-group">
                                <div className="plan-icon" style={{ backgroundColor: `${plan.color}15`, color: plan.color }}>
                                    {plan.name === 'Basic' ? <Check size={20} /> : plan.name === 'Pro' ? <Zap size={20} /> : <Crown size={20} />}
                                </div>
                                <h3 className="plan-name">{plan.name}</h3>
                            </div>
                            <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                        </div>

                        <div className="plan-pricing">
                            <span className="price">{plan.price}</span>
                            <span className="period">/{plan.period}</span>
                        </div>

                        <div className="plan-users">
                            <strong>{plan.users}</strong> active subscribers
                        </div>

                        <ul className="plan-features">
                            {plan.features.map((feature, i) => (
                                <li key={i}><Check size={14} className="check-icon" /> {feature}</li>
                            ))}
                        </ul>

                        <div className="plan-card-footer">
                            <button className="btn-outline w-full"><Edit3 size={14} /> Edit Plan</button>
                        </div>
                    </div>
                ))}
                <button className="add-plan-skeleton">
                    <Plus size={32} />
                    <span>Add New Custom Tier</span>
                </button>
            </div>

            <div className="promotions-section">
                <div className="section-header">
                    <h3 className="section-title"><Star size={18} /> Active Promotions</h3>
                </div>
                <div className="promo-list">
                    <div className="promo-item">
                        <div className="promo-info">
                            <span className="promo-code">WELCOME50</span>
                            <span className="promo-desc">50% off first month for new users</span>
                        </div>
                        <div className="promo-meta">
                            <span className="promo-usage">Used 1,240 times</span>
                            <span className="status-pill success">Active</span>
                        </div>
                    </div>
                    <div className="promo-item">
                        <div className="promo-info">
                            <span className="promo-code">VIDMERO_PRO_ANNUAL</span>
                            <span className="promo-desc">Get 2 months free on annual plan</span>
                        </div>
                        <div className="promo-meta">
                            <span className="promo-usage">Used 842 times</span>
                            <span className="status-pill success">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPlans;
