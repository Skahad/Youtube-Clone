"use client";

import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function SwitchAccountPage() {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                onClick={() => router.back()}
            ></div>

            {/* Modal Card */}
            <div className="w-full max-w-[500px] bg-background rounded-xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden border border-foreground/10">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-0">
                    <h1 className="text-xl font-bold text-foreground">Switch Account</h1>
                    <button
                        onClick={() => router.back()}
                        className="p-1 hover:bg-surface-hover rounded-full transition-colors text-gray-400"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pb-10">
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-[#03a9f4] hover:bg-[#039be5] text-white py-3.5 rounded-lg flex items-center justify-center gap-2 font-bold text-lg transition-all active:scale-[0.98] shadow-md shadow-blue-500/10"
                    >
                        <div className="bg-white rounded-full p-0.5">
                            <Plus size={16} className="text-[#03a9f4]" />
                        </div>
                        Add Account
                    </button>
                </div>
            </div>
        </div>
    );
}
