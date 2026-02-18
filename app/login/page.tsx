"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto no-scrollbar">
            {/* Blur Overlay */}
            <div
                className="fixed inset-0 bg-black/40 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
                onClick={() => router.push("/")}
            />

            <div className="w-full max-w-[400px] bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-2xl p-6 sm:p-8 border border-foreground/10 z-10 animate-in zoom-in-95 duration-200 relative transition-colors duration-300">
                {/* Close Button */}
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-4 right-4 p-1.5 hover:bg-surface-hover rounded-full transition-colors text-gray-400 dark:text-gray-500"
                >
                    <X size={20} />
                </button>

                <div className="w-full">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-black text-[#212121] dark:text-white tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Log in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 pr-10 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs font-bold text-gray-500 hover:text-blue-500 transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-[#03a9f4] hover:bg-[#039be5] text-white font-black text-lg rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 shadow-blue-500/10"
                        >
                            Log In
                        </button>

                        <label className="flex items-center justify-center gap-2 cursor-pointer group py-1">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-blue-500 focus:ring-blue-500 bg-white dark:bg-[#1a1a1a]"
                            />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors">Remember this device</span>
                        </label>

                        <div className="mt-2 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="h-px bg-foreground/10 flex-1" />
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">OR</span>
                                <div className="h-px bg-foreground/10 flex-1" />
                            </div>
                            <button
                                type="button"
                                onClick={() => login("GoogleUser")}
                                className="flex items-center justify-center gap-3 w-full py-2.5 border border-foreground/10 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all font-bold text-sm shadow-sm"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                <span className="text-gray-700 dark:text-white">Sign in with Google</span>
                            </button>
                        </div>

                        <div className="mt-4 text-center border-t border-foreground/5 pt-5 flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New here?</span>
                            <Link href="/register" className="text-sm font-black text-blue-500 hover:underline">
                                Create Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
