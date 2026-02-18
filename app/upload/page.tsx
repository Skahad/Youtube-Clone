"use client";

import { UploadCloud, CheckCircle, FileVideo, X, Settings, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function UploadPage() {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [step, setStep] = useState(1); // 1: Select, 2: Details

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
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-6rem)] p-4">
            <div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl overflow-hidden border border-foreground/10">
                <div className="flex items-center justify-between p-4 border-b border-foreground/10">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step === 1 ? "Upload videos" : "Video details"}
                    </h2>
                    <div className="flex gap-2">
                        <button title="Provide feedback" className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full">
                            <Settings className="w-5 h-5 text-foreground/70" />
                        </button>
                        <button title="Close" className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full">
                            <X className="w-5 h-5 text-foreground/70" />
                        </button>
                    </div>
                </div>

                <div className="p-10 min-h-[400px] flex flex-col items-center justify-center">
                    {step === 1 ? (
                        <div
                            className={clsx(
                                "w-full h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer",
                                dragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-foreground/10 hover:bg-gray-50 dark:hover:bg-[#202020]"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="w-32 h-32 bg-gray-100 dark:bg-[#121212] rounded-full flex items-center justify-center mb-6">
                                <UploadCloud className="w-16 h-16 text-foreground/60" />
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium text-lg mb-2">
                                Drag and drop video files to upload
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                Your videos will be private until you publish them.
                            </p>

                            <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-medium cursor-pointer transition-colors">
                                Select files
                                <input type="file" className="hidden" accept="video/*" onChange={handleChange} />
                            </label>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1 w-full space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Title (required)
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={file?.name.replace(/\.[^/.]+$/, "")}
                                        className="w-full p-3 border border-foreground/10 rounded-lg bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                                        placeholder="Add a title that describes your video"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="w-full p-3 border border-foreground/10 rounded-lg bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 dark:text-white resize-none"
                                        placeholder="Tell viewers about your video"
                                    />
                                </div>

                                {/* Thumbnail */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Thumbnail
                                    </label>
                                    <div className="flex gap-4 mt-2">
                                        <div className="w-32 h-20 border-2 border-dashed border-foreground/10 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#202020]">
                                            <ImageIcon className="w-6 h-6 text-foreground/60 mb-1" />
                                            <span className="text-xs text-gray-500">Upload file</span>
                                        </div>
                                        <div className="w-32 h-20 bg-gray-100 dark:bg-[#121212] rounded flex items-center justify-center">
                                            <span className="text-xs text-gray-400">Generating...</span>
                                        </div>
                                        <div className="w-32 h-20 bg-gray-100 dark:bg-[#121212] rounded flex items-center justify-center">
                                            <span className="text-xs text-gray-400">Generating...</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Visibility */}
                                <div className="space-y-2 pt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Visibility
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="visibility" className="w-4 h-4 text-blue-600" defaultChecked />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="visibility" className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Private</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Side */}
                            <div className="w-full md:w-80 flex flex-col gap-4">
                                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <span className="text-white text-xs z-10">Video Preview</span>
                                    {/* Fake progress bar */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-[60%]" />
                                </div>
                                <div className="bg-gray-50 dark:bg-[#121212] p-4 rounded-lg border border-foreground/10">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>Video Link</span>
                                        <span className="text-blue-600 cursor-pointer">Copy</span>
                                    </div>
                                    <div className="text-sm text-blue-600 break-all">
                                        https://youtu.be/k3j8-s...
                                    </div>

                                    <div className="mt-4 text-gray-700 dark:text-gray-300">
                                        <div className="text-xs font-semibold uppercase text-gray-500 mb-1">Filename</div>
                                        <div className="text-sm truncate">{file?.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {step === 2 && (
                    <div className="p-4 border-t border-foreground/10 flex justify-end gap-2 bg-gray-50 dark:bg-[#1a1a1a]">
                        <button
                            onClick={() => { setStep(1); setFile(null); }}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-[#272727] rounded transition-colors"
                        >
                            Back
                        </button>
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm">
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
