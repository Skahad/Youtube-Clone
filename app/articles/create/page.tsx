"use client";

import { PenBox, ArrowLeft, Send, Image as ImageIcon, FileText, Bold, Italic, List, ListOrdered, Link2, Eye, Play, MoreHorizontal, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";

export default function CreateArticlePage() {
    const router = useRouter();
    const { user } = useAuth();

    // Protection
    useEffect(() => {
        if (!user) {
            router.push("/login?redirect=/articles/create");
        }
    }, [user, router]);

    if (!user) return null;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const toolbarGroups: any[] = [
        { items: ["File", "Edit", "View", "Insert", "Format", "Tools", "Table"] },
        { icons: [Bold, Italic], hasDropdown: true },
        { icons: [AlignLeft, AlignCenter, AlignRight, AlignJustify] },
        { icons: [List, ListOrdered] },
        { icons: [Link2, ImageIcon, Eye, Play, MoreHorizontal] }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-background border-b border-foreground/10 sticky top-0 z-40 h-16 flex items-center">
                <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-surface-hover rounded-full transition-colors flex items-center justify-center"
                        >
                            <ArrowLeft className="w-6 h-6 text-foreground" />
                        </button>
                        <div className="flex items-center gap-2">
                            <PenBox className="w-5 h-5 text-accent" strokeWidth={3} />
                            <h1 className="text-xl font-black text-foreground italic uppercase tracking-tighter">
                                Create new article
                            </h1>
                        </div>
                    </div>
                    <button
                        className="bg-accent hover:bg-accent-hover text-white px-8 py-2.5 rounded-full font-black text-sm uppercase italic tracking-tighter transition-all active:scale-95 shadow-lg shadow-accent/20"
                    >
                        Publish
                    </button>
                </div>
            </div>

            <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-10">
                <div className="bg-surface p-8 md:p-12 rounded-[2.5rem] border border-foreground/5 shadow-2xl shadow-black/5 space-y-10">
                    {/* Title Input */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.3em] ml-2">Article Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-background border border-foreground/10 px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-xl font-black text-foreground shadow-inner"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="space-y-3 relative group">
                        <label className="absolute -top-3 left-6 px-3 bg-surface text-[10px] font-black text-foreground/40 uppercase tracking-widest z-10 transition-colors group-focus-within:text-accent">
                            Description
                        </label>
                        <textarea
                            placeholder="Briefly describe what this article is about..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-background border border-foreground/10 px-8 py-6 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-lg font-medium text-foreground/80 resize-none shadow-inner leading-relaxed"
                        />
                    </div>

                    {/* Rich Editor Area */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.3em] ml-2">The article</label>
                        <div className="bg-background border border-foreground/10 rounded-[2rem] overflow-hidden shadow-inner flex flex-col min-h-[600px]">
                            {/* Editor Toolbar */}
                            <div className="bg-surface border-b border-foreground/10 p-2 overflow-x-auto no-scrollbar flex flex-col gap-2">
                                {/* Text Menus */}
                                <div className="flex items-center px-4 py-1.5 border-b border-foreground/5 gap-6">
                                    {toolbarGroups[0].items.map((item: string) => (
                                        <button key={item} className="text-[13px] font-bold text-foreground/60 hover:text-foreground transition-colors uppercase tracking-tighter">
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                {/* Icons Toolbar */}
                                <div className="flex items-center gap-1 px-2 h-10">
                                    <div className="flex items-center bg-surface-hover/50 rounded-lg px-2 py-1 mr-2 border border-foreground/5">
                                        <span className="text-[13px] font-bold text-foreground px-2 pr-4 border-r border-foreground/10 italic">Paragraph</span>
                                        <ChevronDown size={14} className="ml-2 text-foreground/40" />
                                    </div>
                                    <div className="h-6 w-[1px] bg-foreground/10 mx-2" />
                                    {toolbarGroups.slice(1).map((group, idx) => (
                                        <div key={idx} className="flex items-center gap-1">
                                            {group.icons?.map((Icon: any, i: number) => (
                                                <button
                                                    key={i}
                                                    className={clsx(
                                                        "p-1.5 hover:bg-foreground/5 rounded-md transition-all text-foreground/70 hover:text-accent",
                                                        idx === 1 && i === 2 ? "bg-accent/10 text-accent" : "" // Active state simulation
                                                    )}
                                                >
                                                    <Icon size={18} strokeWidth={2.5} />
                                                </button>
                                            ))}
                                            {group.hasDropdown && <ChevronDown size={14} className="text-foreground/40 -ml-1 mr-1" />}
                                            <div className="h-6 w-[1px] bg-foreground/10 mx-2" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Editor Content */}
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Start writing your article here..."
                                className="flex-1 w-full bg-transparent p-10 outline-none text-xl font-medium text-foreground/90 leading-relaxed resize-none"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
