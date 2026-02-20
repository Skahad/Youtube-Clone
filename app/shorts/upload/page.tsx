"use client";

import { Smartphone, Music, Scissors, Upload, X, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function UploadShortsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    const steps = [
        { id: 1, label: "Upload" },
        { id: 2, label: "Details" },
        { id: 3, label: "Music & Text" },
        { id: 4, label: "Visibility" },
    ];

    const currentStep = 1;

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-[#f1f1f1] dark:bg-[#0f0f0f] py-8 px-4 transition-colors duration-300">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-600 p-2 rounded-lg">
                            <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Upload new Short</h1>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Shorts Creator Toolkit</span>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    {/* Stepper */}
                    <div className="px-10 py-8 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />

                            {steps.map((step) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                                    <span className={clsx(
                                        "text-sm font-bold transition-colors",
                                        step.id === currentStep ? "text-purple-600" : "text-gray-400"
                                    )}>
                                        {step.label}
                                    </span>
                                    <div className={clsx(
                                        "w-5 h-5 rounded-full border-4 transition-all flex items-center justify-center",
                                        step.id === currentStep
                                            ? "border-purple-600 bg-white dark:bg-[#1a1a1a]"
                                            : "border-gray-400 bg-gray-400"
                                    )}>
                                        {step.id === currentStep && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-10 lg:p-20 min-h-[500px]">
                        {/* Left Side: Short Upload Box (Vertical Aspect Ratio) */}
                        <div className="w-full max-w-[280px] aspect-[9/16] bg-[#f9f9f9] dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-3xl flex items-center justify-center p-6 group cursor-pointer hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors shadow-sm relative overflow-hidden">
                            <div className="w-full h-full border-2 border-dashed border-gray-200 dark:border-gray-700/50 rounded-2xl flex flex-col items-center justify-center gap-4">
                                <Upload className="w-20 h-20 text-gray-400 group-hover:text-purple-600 transition-colors" strokeWidth={1.5} />
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex gap-2">
                                        <Music className="w-4 h-4 text-gray-400" />
                                        <Scissors className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vertical (9:16)</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Text & Action */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                                Create your next trending Short
                            </h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 font-medium max-w-md">
                                Upload vertical videos up to 60 seconds. Add music, text, and filters in the next step.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-lg font-bold text-lg uppercase tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 flex items-center gap-2">
                                    <Upload className="w-5 h-5" />
                                    Select File
                                    <input type="file" className="hidden" accept="video/*" />
                                </label>
                                <button className="px-8 py-3.5 border-2 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-bold text-lg uppercase tracking-tight hover:bg-gray-50 dark:hover:bg-[#222] transition-all">
                                    Use Web Cam
                                </button>
                            </div>

                            <p className="mt-8 text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4" />
                                By submitting, you agree to our creator terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
