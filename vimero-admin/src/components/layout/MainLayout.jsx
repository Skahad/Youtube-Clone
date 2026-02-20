import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './MainLayout.css';

const MainLayout = ({ children, activeTab, setActiveTab }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="admin-layout">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    closeMobileMenu();
                }}
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div className="main-content">
                <TopBar onMenuClick={toggleMobileMenu} collapsed={collapsed} />
                <main className="page-container">
                    {children}
                </main>
            </div>
            {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu} />}
        </div>
    );
};

export default MainLayout;
