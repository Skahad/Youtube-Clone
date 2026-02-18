"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "Male",
        agreed: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.username.trim() && formData.agreed) {
            login(formData.username);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto no-scrollbar">
            {/* Blur Overlay */}
            <div
                className="fixed inset-0 bg-black/40 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
                onClick={() => router.push("/")}
            />

            <div className="w-full max-w-[480px] bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-2xl p-6 sm:p-8 border border-foreground/10 z-10 animate-in zoom-in-95 duration-200 relative transition-colors duration-300">
                {/* Close Button */}
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-4 right-4 p-1.5 hover:bg-surface-hover rounded-full transition-colors text-gray-400 dark:text-gray-500"
                >
                    <X size={20} />
                </button>

                <div className="w-full">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-black text-[#212121] dark:text-white tracking-tight">Create Account</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Join the premium community today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Uniform In-line Fields */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 transition-all"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 pr-10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm Pass"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-bold text-[#212121] dark:text-white placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-blue-500 outline-none text-sm font-black text-[#212121] dark:text-white appearance-none cursor-pointer transition-all"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg width="10" height="6" viewBox="0 0 12 8" fill="none">
                                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-[#03a9f4] hover:bg-[#039be5] text-white font-black text-lg rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2 shadow-blue-500/10"
                        >
                            Sign Up
                        </button>

                        <div className="flex gap-3 items-start bg-[#f8f9fa] dark:bg-[#141414] p-3.5 rounded-xl border border-foreground/5 mt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={formData.agreed}
                                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-blue-500 bg-white dark:bg-[#1a1a1a]"
                            />
                            <label htmlFor="terms" className="text-[11px] font-bold text-gray-500 dark:text-gray-400 leading-tight cursor-pointer">
                                I agree to the <Link href="#" className="text-blue-500 underline">Terms of use</Link> & <Link href="#" className="text-blue-500 underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <div className="mt-4 text-center border-t border-foreground/5 pt-5 flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Already a member?</span>
                            <Link href="/login" className="text-sm font-black text-[#212121] dark:text-white hover:text-blue-500 transition-colors">
                                Log In Now
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
