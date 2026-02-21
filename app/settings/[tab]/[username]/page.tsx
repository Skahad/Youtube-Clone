"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Camera, Save, Globe, Mail, User as UserIcon, Lock, Shield, Wallet, Star, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export default function SettingsTabContent() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const tab = params?.tab as string;
    const usernameParam = params?.username as string;

    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<any>({});
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Load settings from localStorage on mount or tab change
    React.useEffect(() => {
        if (user?.handle && tab) {
            const storageKey = `${tab}_settings_${user.handle}`;
            const savedSettings = localStorage.getItem(storageKey);
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            } else {
                setSettings({});
            }
        }
    }, [user, tab]);

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        // Handle Password Change Specifically
        if (tab === "password") {
            const currentPass = formData.get("current_password") as string;
            const newPass = formData.get("new_password") as string;
            const confirmPass = formData.get("confirm_password") as string;

            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const userIndex = users.findIndex((u: any) => u.username === user?.username);

            if (userIndex === -1) {
                alert("User not found!");
                setIsLoading(false);
                return;
            }

            if (users[userIndex].password !== currentPass) {
                alert("Current password is incorrect!");
                setIsLoading(false);
                return;
            }

            if (newPass !== confirmPass) {
                alert("New passwords do not match!");
                setIsLoading(false);
                return;
            }

            if (newPass.length < 8) {
                alert("New password must be at least 8 characters long!");
                setIsLoading(false);
                return;
            }

            // Update password in users list
            users[userIndex].password = newPass;
            localStorage.setItem("users", JSON.stringify(users));

            setTimeout(() => {
                setIsLoading(false);
                alert("Password changed successfully! Please use your new password from next login.");
                e.currentTarget.reset();
            }, 1000);
            return;
        }

        const newTabSettings = { ...settings };

        formData.forEach((value, key) => {
            newTabSettings[key] = value;
        });

        // Simulating API call for other settings
        setTimeout(() => {
            if (user?.handle && tab) {
                const storageKey = `${tab}_settings_${user.handle}`;
                localStorage.setItem(storageKey, JSON.stringify(newTabSettings));
                setSettings(newTabSettings);
            }
            setIsLoading(false);
            alert(`${tab.charAt(0).toUpperCase() + tab.slice(1)} settings saved successfully!`);
        }, 1000);
    };

    // --- Tab Views ---

    const GeneralSettings = () => (
        <form onSubmit={handleSave} className="space-y-8">
            <h1 className="text-3xl font-black text-accent mb-10 tracking-tight">General Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        defaultValue={settings.username || user?.username || "ahadsk8912"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">E-mail address</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={settings.email || user?.email || ""}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Gender</label>
                    <select
                        name="gender"
                        defaultValue={settings.gender || "Male"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Country</label>
                    <select
                        name="country"
                        defaultValue={settings.country || "Select Country"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>Select Country</option>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Age</label>
                    <select
                        name="age"
                        defaultValue={settings.age || "Not selected"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>Not selected</option>
                        <option>18-24</option>
                        <option>25-34</option>
                        <option>35+</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Donation PayPal Email</label>
                    <input
                        type="text"
                        name="paypalEmail"
                        placeholder="PayPal Email"
                        defaultValue={settings.paypalEmail || ""}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-foreground/5">
                <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter transition-all active:scale-95 shadow-xl shadow-accent/20 flex items-center gap-2"
                >
                    {isLoading ? "Saving..." : "Save"}
                    {!isLoading && <Save size={18} />}
                </button>
            </div>
        </form>
    );

    const ProfileSettings = () => (
        <form onSubmit={handleSave} className="space-y-8">
            <h1 className="text-3xl font-black text-accent mb-10 tracking-tight">Profile Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        defaultValue={settings.firstName || "Shaikh Ahad"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        defaultValue={settings.lastName || ""}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">About</label>
                <textarea
                    rows={4}
                    name="about"
                    defaultValue={settings.about || ""}
                    className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold resize-none"
                    placeholder="Tell us about yourself..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {["Facebook", "Google", "Twitter", "Instagram"].map(social => (
                    <div key={social} className="space-y-2">
                        <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">{social}</label>
                        <input
                            type="text"
                            name={social.toLowerCase()}
                            placeholder="Username"
                            defaultValue={settings[social.toLowerCase()] || ""}
                            className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold"
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Favourite category</label>
                <select
                    name="favCategory"
                    defaultValue={settings.favCategory || "Favourite category"}
                    className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                >
                    <option>Favourite category</option>
                    <option>Music</option>
                    <option>Gaming</option>
                    <option>Travel & Events</option>
                </select>
                <p className="text-[10px] text-foreground/40 font-bold uppercase mt-1 px-2">Choose which categories you would like to see on your home page.</p>
            </div>

            <div className="pt-6 border-t border-foreground/5">
                <button type="submit" className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-accent/20 flex items-center gap-2">
                    {isLoading ? "Saving..." : "Save"} <Save size={18} />
                </button>
            </div>
        </form>
    );

    const PrivacySettings = () => (
        <form onSubmit={handleSave} className="space-y-8">
            <h1 className="text-3xl font-black text-accent mb-10 tracking-tight">Privacy Settings</h1>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Show my subscriptions count</label>
                    <select
                        name="showSubscriptions"
                        defaultValue={settings.showSubscriptions || "Yes"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Who can message me?</label>
                    <select
                        name="messageWho"
                        defaultValue={settings.messageWho || "All"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>All</option>
                        <option>Subscribers</option>
                        <option>Nobody</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Who can watch my videos?</label>
                    <select
                        name="watchWho"
                        defaultValue={settings.watchWho || "All"}
                        className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-foreground font-bold appearance-none"
                    >
                        <option>All</option>
                        <option>Only Me</option>
                    </select>
                </div>

                <div className="bg-foreground/5 p-6 rounded-2xl border border-foreground/5 mt-8">
                    <p className="text-sm italic font-medium text-foreground/60 leading-relaxed">
                        Please note changing the privacy of this option will reset all your videos privacy to the option you choose.
                    </p>
                </div>
            </div>

            <div className="pt-6 border-t border-foreground/5">
                <button type="submit" className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-accent/20 flex items-center gap-2">
                    {isLoading ? "Saving..." : "Save"} <Save size={18} />
                </button>
            </div>
        </form>
    );

    const PasswordSettings = () => (
        <form onSubmit={handleSave} className="space-y-8">
            <h1 className="text-3xl font-black text-accent mb-10 tracking-tight">Password Settings</h1>

            <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Current Password</label>
                    <div className="relative group/field">
                        <input
                            type={showCurrent ? "text" : "password"}
                            name="current_password"
                            className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-foreground font-bold pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/30 hover:text-accent transition-colors"
                        >
                            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">New Password</label>
                    <div className="relative group/field">
                        <input
                            type={showNew ? "text" : "password"}
                            name="new_password"
                            className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-foreground font-bold pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/30 hover:text-accent transition-colors"
                        >
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-black text-foreground/40 uppercase tracking-widest px-2">Confirm new password</label>
                    <div className="relative group/field">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirm_password"
                            className="w-full bg-background border border-foreground/10 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-foreground font-bold pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/30 hover:text-accent transition-colors"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-foreground/5">
                <button type="submit" className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-accent/20 flex items-center gap-2">
                    {isLoading ? "Saving..." : "Save"} <Save size={18} />
                </button>
            </div>
        </form>
    );

    const AvatarSettings = () => (
        <div className="space-y-8">
            <h1 className="text-3xl font-black text-accent mb-10 tracking-tight">Avatar & Cover Settings</h1>

            <div className="relative">
                {/* Cover Image */}
                <div className="w-full h-80 rounded-[2rem] overflow-hidden bg-gradient-to-br from-accent/20 to-accent/40 relative group">
                    <img
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-80"
                        alt="Cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-2xl border border-white/20 transition-all active:scale-95 flex items-center gap-2 font-black uppercase italic tracking-widest text-xs">
                            <Camera size={20} />
                            Change Cover
                        </button>
                    </div>
                </div>

                {/* Profile Picture Overlay */}
                <div className="absolute -bottom-16 left-10 flex items-end gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-8 border-surface overflow-hidden bg-background shadow-2xl relative">
                            <img
                                src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"}
                                className="w-full h-full object-cover"
                                alt="Avatar"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <h2 className="text-3xl font-black text-foreground tracking-tight">{user?.username || "Shaikh Ahad"}</h2>
                        <p className="text-accent font-bold uppercase tracking-widest text-xs italic">{user?.handle || "@66debcd09"}</p>
                    </div>
                </div>
            </div>

            <div className="pt-24 border-t border-foreground/5 flex justify-between items-center">
                <p className="text-sm font-medium text-foreground/40 italic">Images should be at least 800x800px for best quality.</p>
                <button
                    onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 1000);
                    }}
                    className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-accent/20 flex items-center gap-2 active:scale-95 transition-all"
                >
                    {isLoading ? "Saving..." : "Save"} <Save size={18} />
                </button>
            </div>
        </div>
    );

    const PlaceholderView = ({ title }: { title: string }) => (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                <Star size={40} strokeWidth={1} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-foreground uppercase italic tracking-tighter mb-2">{title} Settings</h1>
                <p className="text-foreground/40 font-bold max-w-md mx-auto">This section is currently under development. Stay tuned for updates!</p>
            </div>
            <button
                onClick={() => router.push(`/settings/general/${usernameParam}`)}
                className="text-accent font-black uppercase text-sm italic hover:underline"
            >
                Back to General
            </button>
        </div>
    );

    const renderContent = () => {
        switch (tab) {
            case "general": return <GeneralSettings />;
            case "profile": return <ProfileSettings />;
            case "privacy": return <PrivacySettings />;
            case "password": return <PasswordSettings />;
            case "avatar": return <AvatarSettings />;
            default: return <PlaceholderView title={tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : "Settings"} />;
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {renderContent()}
        </div>
    );
}
