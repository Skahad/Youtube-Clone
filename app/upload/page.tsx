"use client";

import { Upload as UploadIcon, HelpCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function UploadPage() {
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
        { id: 3, label: "Video Elements" },
        { id: 4, label: "Visibility" },
    ];

    const currentStep = 1;

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background py-8 px-4 transition-colors duration-300">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#00aaff] p-2 rounded-lg">
                            <UploadIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-foreground">Upload new video</h1>
                    </div>
                    <span className="text-sm font-medium text-foreground/60">4 Steps Video Upload</span>
                </div>

                <div className="bg-surface rounded-xl shadow-sm border border-foreground/10 overflow-hidden">
                    {/* Stepper */}
                    <div className="px-10 py-8 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />

                            {steps.map((step, idx) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                                    <span className={clsx(
                                        "text-sm font-bold transition-colors",
                                        step.id === currentStep ? "text-[#00aaff]" : "text-gray-400"
                                    )}>
                                        {step.label}
                                    </span>
                                    <div className={clsx(
                                        step.id === currentStep
                                            ? "border-[#00aaff] bg-surface"
                                            : "border-foreground/30 bg-foreground/30"
                                    )}>
                                        {step.id === currentStep && <div className="w-2 h-2 rounded-full bg-[#00aaff]" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-10 lg:p-20 min-h-[500px]">
                        {/* Left Side: Upload Box */}
                        <div className="w-full max-w-[360px] aspect-square bg-background border border-foreground/10 rounded-xl flex items-center justify-center p-8 group cursor-pointer hover:bg-surface-hover transition-colors shadow-sm">
                            <div className="w-full h-full border-2 border-dashed border-foreground/20 rounded-lg flex items-center justify-center">
                                <UploadIcon className="w-32 h-32 text-foreground/30 group-hover:text-[#00aaff] transition-colors" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Right Side: Text & Action */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h2 className="text-4xl font-bold text-foreground mb-3">
                                Drag and drop video files to upload
                            </h2>
                            <p className="text-xl text-foreground/50 mb-8 font-medium">
                                Your videos will be private until you publish them.
                            </p>
                            <label className="bg-[#00aaff] hover:bg-[#0099ee] text-white px-8 py-3.5 rounded-lg font-bold text-lg uppercase tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95">
                                Select Media
                                <input type="file" className="hidden" accept="video/*" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
