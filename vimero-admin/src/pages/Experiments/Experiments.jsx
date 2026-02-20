import React from 'react';
import { Beaker, Shield, Activity, Users, ArrowRight } from 'lucide-react';
import './Experiments.css';

const experimentsData = [
    {
        id: 'EXP-2024-001',
        name: 'New Video Player UI',
        description: 'Redesigned player controls with enhanced accessibility and touch targets for mobile users.',
        rollout: 25,
        status: 'Active',
        impact: '+12% Engagement',
        audience: 'Mobile Users'
    },
    {
        id: 'EXP-2024-002',
        name: 'AI Comment Summary',
        description: 'Auto-generated summaries for comment sections with over 100 comments.',
        rollout: 10,
        status: 'Beta',
        impact: '+5% Retention',
        audience: 'Premium Likely'
    },
    {
        id: 'EXP-2024-003',
        name: 'Shorts Algorithm V2',
        description: 'New recommendation engine prioritizing watch time over click-through rate.',
        rollout: 5,
        status: 'Canary',
        impact: 'Pending Data',
        audience: 'Global 5%'
    },
    {
        id: 'EXP-2024-004',
        name: 'Creator Dashboard Dark Mode',
        description: 'Testing higher contrast dark mode for editor interfaces.',
        rollout: 50,
        status: 'Rolling Out',
        impact: 'Neutral',
        audience: 'Creators'
    }
];

const ExperimentCard = ({ experiment }) => (
    <div className="experiment-card">
        <div className="exp-header">
            <span className="exp-id">{experiment.id}</span>
            <div className={`status-badge ${experiment.status.toLowerCase().replace(' ', '-')}`}>
                {experiment.status}
            </div>
        </div>

        <div>
            <h3 className="exp-name">{experiment.name}</h3>
            <p className="exp-description">{experiment.description}</p>
        </div>

        <div className="rollout-meter">
            <div className="meter-label">
                <span>Rollout</span>
                <span>{experiment.rollout}%</span>
            </div>
            <div className="meter-track">
                <div
                    className="meter-fill"
                    style={{ width: `${experiment.rollout}%` }}
                />
            </div>
        </div>

        <div className="exp-footer">
            <div className="exp-metric">
                <Activity size={14} />
                <span>{experiment.impact}</span>
            </div>
            <div className="exp-audience">
                <Users size={14} />
                <span>{experiment.audience}</span>
            </div>
        </div>
    </div>
);

const Experiments = () => {
    return (
        <div className="experiments-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Experiments</h1>
                    <p className="page-subtitle">Manage feature flags and A/B tests.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">
                        <Beaker size={18} style={{ marginRight: '8px' }} />
                        New Experiment
                    </button>
                </div>
            </div>

            <div className="experiments-grid">
                {experimentsData.map((exp) => (
                    <ExperimentCard key={exp.id} experiment={exp} />
                ))}
            </div>
        </div>
    );
};

export default Experiments;
