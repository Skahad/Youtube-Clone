import React, { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Videos from './pages/Videos/Videos';
import Shorts from './pages/Shorts/Shorts';
import Users from './pages/Users/Users';
import Reports from './pages/Reports/Reports';
import Analytics from './pages/Analytics/Analytics';
import AuditLogs from './pages/AuditLogs/AuditLogs';
import Categories from './pages/Categories/Categories';
import Comments from './pages/Comments/Comments';
import SystemHealth from './pages/SystemHealth/SystemHealth';
import ApiSettings from './pages/ApiSettings/ApiSettings';
import ErrorLogs from './pages/ErrorLogs/ErrorLogs';
import CreatorStudio from './pages/CreatorStudio/CreatorStudio';
import CopyrightMatch from './pages/CopyrightMatch/CopyrightMatch';
import PolicyStrikes from './pages/PolicyStrikes/PolicyStrikes';
import Appeals from './pages/Appeals/Appeals';
import LiveStreams from './pages/LiveStreams/LiveStreams';
import Playlists from './pages/Playlists/Playlists';
import CommunityPosts from './pages/CommunityPosts/CommunityPosts';
import MonetizationControl from './pages/MonetizationControl/MonetizationControl';
import RevenueAnalytics from './pages/RevenueAnalytics/RevenueAnalytics';
import SearchControl from './pages/SearchControl/SearchControl';
import Experiments from './pages/Experiments/Experiments';
import AdminCollab from './pages/AdminCollab/AdminCollab';
import AdsManager from './pages/AdsManager/AdsManager';
import PremiumPlans from './pages/PremiumPlans/PremiumPlans';
import SettingsPage from './pages/Settings/Settings';
import GeneralConfig from './pages/GeneralConfig/GeneralConfig';
import WebsiteInfo from './pages/WebsiteInfo/WebsiteInfo';
import ImportUploadConfig from './pages/ImportUploadConfig/ImportUploadConfig';
import VideoSettings from './pages/VideoSettings/VideoSettings';
import EmailSetup from './pages/EmailSetup/EmailSetup';
import SocialLoginSettings from './pages/SocialLoginSettings/SocialLoginSettings';
import LiveSettings from './pages/LiveSettings/LiveSettings';
import CronJobSettings from './pages/CronJobSettings/CronJobSettings';
import PaymentConfig from './pages/PaymentConfig/PaymentConfig';
import AddLanguage from './pages/AddLanguage/AddLanguage';
import ManageLanguages from './pages/ManageLanguages/ManageLanguages';
import AdsConfig from './pages/AdsConfig/AdsConfig';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import ManageArticles from './pages/ManageArticles/ManageArticles';
import ManageBankReceipts from './pages/ManageBankReceipts/ManageBankReceipts';
import ManageVideoAds from './pages/ManageVideoAds/ManageVideoAds';
import ManageWebsiteAds from './pages/ManageWebsiteAds/ManageWebsiteAds';
import ManageUserAds from './pages/ManageUserAds/ManageUserAds';
import PaymentRequests from './pages/PaymentRequests/PaymentRequests';
import ManageCurrencies from './pages/ManageCurrencies/ManageCurrencies';
import Earnings from './pages/Earnings/Earnings';
import AffiliatesSettings from './pages/AffiliatesSettings/AffiliatesSettings';
import CustomProfileFields from './pages/CustomProfileFields/CustomProfileFields';
import ManageVerificationRequests from './pages/ManageVerificationRequests/ManageVerificationRequests';
import ManageMonetizationRequests from './pages/ManageMonetizationRequests/ManageMonetizationRequests';
import MainLayout from './components/layout/MainLayout';
import './styles/variables.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard setActiveTab={setActiveTab} />;
            case 'videos':
                return <Videos />;
            case 'shorts':
                return <Shorts />;
            case 'live-streams':
                return <LiveStreams />;
            case 'playlists':
                return <Playlists />;
            case 'community-posts':
                return <CommunityPosts />;
            case 'articles-create':
                return <CreateArticle />;
            case 'articles-manage':
                return <ManageArticles />;
            case 'users':
            case 'users-manage':
                return <Users />;
            case 'users-affiliates':
                return <AffiliatesSettings />;
            case 'users-profile-fields':
                return <CustomProfileFields />;
            case 'users-verification':
                return <ManageVerificationRequests />;
            case 'users-monetization':
                return <ManageMonetizationRequests />;
            case 'creator-studio':
                return <CreatorStudio />;
            case 'reports':
                return <Reports />;
            case 'comments':
                return <Comments />;
            case 'copyright':
                return <CopyrightMatch />;
            case 'policy':
                return <PolicyStrikes />;
            case 'appeals':
                return <Appeals />;
            case 'analytics':
                return <Analytics setActiveTab={setActiveTab} />;
            case 'audit-logs':
                return <AuditLogs />;
            case 'categories':
                return <Categories />;
            case 'system-health':
                return <SystemHealth />;
            case 'search-control':
                return <SearchControl />;
            case 'experiments':
                return <Experiments />;
            case 'api-settings':
                return <ApiSettings />;
            case 'error-logs':
                return <ErrorLogs />;
            case 'admin-collab':
                return <AdminCollab />;
            case 'ads-manager':
                return <AdsManager />;
            case 'monetization':
                return <MonetizationControl />;
            case 'premium-plans':
                return <PremiumPlans />;
            case 'revenue-payouts':
                return <RevenueAnalytics />;
            case 'settings':
                return <SettingsPage />;
            case 'settings-general':
                return <GeneralConfig />;
            case 'settings-website':
                return <WebsiteInfo />;
            case 'settings-upload':
                return <ImportUploadConfig />;
            case 'settings-video':
                return <VideoSettings />;
            case 'settings-email':
                return <EmailSetup />;
            case 'settings-social':
                return <SocialLoginSettings />;
            case 'settings-live':
                return <LiveSettings />;
            case 'settings-cron':
                return <CronJobSettings />;
            case 'ads-payment-config':
                return <PaymentConfig />;
            case 'ads-settings':
                return <AdsConfig />;
            case 'langs-add':
                return <AddLanguage />;
            case 'langs-manage':
                return <ManageLanguages />;
            case 'ads-bank-receipts':
                return <ManageBankReceipts />;
            case 'ads-video':
                return <ManageVideoAds />;
            case 'ads-website':
                return <ManageWebsiteAds />;
            case 'ads-user':
                return <ManageUserAds />;
            case 'ads-payment-requests':
                return <PaymentRequests />;
            case 'ads-currencies':
                return <ManageCurrencies />;
            case 'ads-earnings':
                return <Earnings />;
            default:
                return <PlaceholderModule title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />;
        }
    };

    const PlaceholderModule = ({ title }) => (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>{title}</h2>
            <p style={{ color: 'var(--text-tertiary)' }}>This YouTube Studio-grade module is currently under infrastructure deployment.</p>
        </div>
    );

    return (
        <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </MainLayout>
    );
};

export default App;
