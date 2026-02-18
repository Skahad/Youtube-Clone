"use client";

import { UploadCloud, CheckCircle, FileVideo, X, Settings, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import router from "next/router";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [step, setStep] = useState(1); // 1: Select, 2: Details
    const navigation = useRouter();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setStep(2);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStep(2);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] p-0 sm:p-4 bg-background transition-colors duration-300">
            <div className="w-full h-full sm:h-auto sm:max-w-4xl bg-white dark:bg-[#0f0f0f] sm:rounded-3xl shadow-2xl overflow-hidden border-x sm:border border-foreground/10 animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-foreground/5 sticky top-0 bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md z-20">
                    <h2 className="text-xl font-black tracking-tight text-[#212121] dark:text-white">
                        {step === 1 ? "Upload videos" : "Video details"}
                    </h2>
                    <div className="flex gap-2">
                        <button title="Settings" className="p-2.5 hover:bg-surface-hover rounded-full transition-colors">
                            <Settings className="w-5 h-5 text-foreground/70" />
                        </button>
                        <button
                            title="Close"
                            onClick={() => navigation.push("/")}
                            className="p-2.5 hover:bg-surface-hover rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-foreground/70" />
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-10 min-h-[400px]">
                    {step === 1 ? (
                        <div
                            className={clsx(
                                "w-full min-h-[400px] border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 cursor-pointer p-8",
                                dragging
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/5 scale-[0.98]"
                                    : "border-foreground/5 hover:border-blue-500/50 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="w-40 h-40 bg-gray-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8 shadow-inner animate-bounce-slow">
                                <UploadCloud className="w-20 h-20 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-black text-[#212121] dark:text-white mb-3 text-center">
                                Drag and drop video files to upload
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 text-center max-w-sm">
                                Your videos will remain private until you decide to publish them on your channel.
                            </p>

                            <label className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 cursor-pointer">
                                Select files
                                <input type="file" className="hidden" accept="video/*" onChange={handleChange} />
                            </label>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col lg:flex-row gap-10 items-start">
                            <div className="flex-1 w-full space-y-8">
                                {/* Title */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-black uppercase tracking-widest text-blue-500 dark:text-blue-400">
                                        Title (required)
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={file?.name.replace(/\.[^/.]+$/, "")}
                                        className="w-full p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none text-[#212121] dark:text-white font-bold transition-all"
                                        placeholder="Add a title that describes your video"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-black uppercase tracking-widest text-gray-500">
                                        Description
                                    </label>
                                    <textarea
                                        rows={6}
                                        className="w-full p-4 bg-[#f8f9fa] dark:bg-[#1a1a1a] border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none text-[#212121] dark:text-white font-semibold transition-all resize-none"
                                        placeholder="Tell viewers about your video"
                                    />
                                </div>

                                {/* Thumbnail */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-black uppercase tracking-widest text-gray-500">
                                        Thumbnail
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                        <div className="aspect-video border-2 border-dashed border-foreground/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/5 hover:border-blue-500 transition-all">
                                            <ImageIcon className="w-6 h-6 text-blue-500 mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-tight text-gray-500">Upload</span>
                                        </div>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="aspect-video bg-gray-100 dark:bg-[#1a1a1a] rounded-xl flex items-center justify-center border-2 border-transparent">
                                                <span className="text-[10px] font-bold text-gray-400">Preview {i}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Visibility */}
                                <div className="space-y-4 pt-4 border-t border-foreground/5">
                                    <label className="block text-sm font-black uppercase tracking-widest text-gray-500">
                                        Visibility
                                    </label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="radio" name="visibility" className="peer w-6 h-6 opacity-0 absolute cursor-pointer" defaultChecked />
                                                <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:border-blue-500 transition-all flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100 transition-all scale-50 peer-checked:scale-100" />
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Public</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="radio" name="visibility" className="peer w-6 h-6 opacity-0 absolute cursor-pointer" />
                                                <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:border-blue-500 transition-all flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100 transition-all scale-50 peer-checked:scale-100" />
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Private</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Side */}
                            <div className="w-full lg:w-96 sticky top-24">
                                <div className="aspect-video bg-[#1a1a1a] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl ring-1 ring-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                                        <FileVideo className="w-16 h-16 text-blue-500/50" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[65%] rounded-full shadow-[0_0_10px_#3b82f6]" />
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Processing</span>
                                            <span className="text-[10px] font-black text-blue-400 tracking-tighter">65%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-[#f8f9fa] dark:bg-[#1a1a1a] p-6 rounded-3xl border border-foreground/5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Video Link</span>
                                        <button className="text-xs font-black text-blue-500 hover:text-blue-600 uppercase tracking-tighter">Copy</button>
                                    </div>
                                    <div className="text-sm text-blue-500 font-bold break-all p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                        https://youtu.be/k3j8-sVimero
                                    </div>

                                    <div className="pt-4 border-t border-foreground/5 space-y-1">
                                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Filename</div>
                                        <div className="text-sm font-bold text-[#212121] dark:text-white truncate">{file?.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step === 2 && (
                    <div className="p-6 border-t border-foreground/5 flex justify-end gap-4 bg-gray-50/50 dark:bg-[#121212]/50 backdrop-blur-sm sticky bottom-0 z-20">
                        <button
                            onClick={() => { setStep(1); setFile(null); }}
                            className="px-8 py-3 text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                        >
                            Back
                        </button>
                        <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95">
                            Publish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
