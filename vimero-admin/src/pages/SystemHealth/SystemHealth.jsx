import React from 'react';
import {
    Activity,
    Cpu,
    HardDrive,
    Database,
    Server,
    Globe,
    Wifi,
    AlertCircle,
    CheckCircle2,
    Clock,
    RefreshCw
} from 'lucide-react';
import './SystemHealth.css';

const healthMetrics = [
    { label: 'CPU Usage', value: '24%', status: 'Healthy', icon: Cpu, color: 'var(--success)' },
    { label: 'RAM Usage', value: '4.2 GB / 16 GB', status: 'Healthy', icon: Activity, color: 'var(--success)' },
    { label: 'Disk Space', value: '1.2 TB / 2.0 TB', status: 'Healthy', icon: HardDrive, color: 'var(--success)' },
    { label: 'Network In', value: '124 Mbps', status: 'Healthy', icon: Wifi, color: 'var(--success)' },
];

const serviceStatus = [
    { name: 'Core API Service', status: 'Operational', uptime: '99.98%', latency: '42ms' },
    { name: 'Primary Database', status: 'Operational', uptime: '100%', latency: '8ms' },
    { name: 'Redis Cache', status: 'Operational', uptime: '99.99%', latency: '2ms' },
    { name: 'CDN (Edge)', status: 'Operational', uptime: '100%', latency: '12ms' },
    { name: 'Video Processing', status: 'Congested', uptime: '98.5%', latency: '12.4s' },
];

const SystemHealth = () => {
    return (
        <div className="system-health-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Health</h1>
                    <p className="page-subtitle">Real-time monitoring of server resources and service status.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline"><RefreshCw size={16} /> Refresh Metrics</button>
                </div>
            </div>

            <div className="health-grid">
                <div className="metrics-cards">
                    {healthMetrics.map((m, i) => (
                        <div key={i} className="health-card">
                            <div className="card-top">
                                <div className="icon-box" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                                    <m.icon size={20} />
                                </div>
                                <div className="status-badge-mini success">
                                    <CheckCircle2 size={12} /> {m.status}
                                </div>
                            </div>
                            <div className="card-bottom">
                                <p className="metric-label">{m.label}</p>
                                <p className="metric-value">{m.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="health-main-content">
                    <div className="health-panel service-panel">
                        <div className="panel-header">
                            <h3 className="panel-title"><Server size={18} /> Service Status</h3>
                            <span className="uptime-global">Overall Uptime: <strong>99.97%</strong></span>
                        </div>
                        <div className="service-list">
                            {serviceStatus.map((service, i) => (
                                <div key={i} className="service-row">
                                    <div className="service-info">
                                        <span className="service-name">{service.name}</span>
                                        <span className={`service-status ${service.status.toLowerCase()}`}>
                                            {service.status === 'Operational' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                            {service.status}
                                        </span>
                                    </div>
                                    <div className="service-metrics">
                                        <div className="met">
                                            <span>Uptime</span>
                                            <strong>{service.uptime}</strong>
                                        </div>
                                        <div className="met">
                                            <span>Latency</span>
                                            <strong>{service.latency}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="health-panel logs-panel">
                        <div className="panel-header">
                            <h3 className="panel-title"><Clock size={18} /> Resource Timeline</h3>
                        </div>
                        <div className="visual-chart-placeholder">
                            <svg viewBox="0 0 800 150" className="health-chart">
                                <path d="M0,100 Q50,90 100,110 T200,80 T300,100 T400,70 T500,90 T600,60 T700,80 T800,100" fill="none" stroke="var(--accent-color)" strokeWidth="2" />
                                <path d="M0,80 Q50,70 100,90 T200,60 T300,80 T400,50 T500,70 T600,40 T700,60 T800,80" fill="none" stroke="var(--success)" strokeWidth="2" opacity="0.5" />
                            </svg>
                            <div className="chart-legend">
                                <div className="legend-item"><span className="dot cpu" /> CPU Load</div>
                                <div className="legend-item"><span className="dot ram" /> RAM Usage</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemHealth;
