"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function VideoPlayer({ url, poster }: { url: string; poster?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false); // Default false, let effect handle autoplay if needed or user interaction
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Format time helper
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Toggle Play/Pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle Time Update
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    // Handle Loaded Metadata
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            // Auto play if preferred, but usually requires interaction.
            // videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
    };

    // Seek
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = vol;
            setVolume(vol);
            setIsMuted(vol === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !isMuted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
            if (newMutedState) {
                setVolume(0);
            } else {
                setVolume(1);
                videoRef.current.volume = 1;
            }
        }
    };

    // Fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Hide controls timer
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPlaying && !isHovering) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        } else {
            setShowControls(true);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, isHovering]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

            switch (e.key.toLowerCase()) {
                case " ":
                case "k":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "f":
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case "m":
                    e.preventDefault();
                    toggleMute();
                    break;
                case "arrowright":
                    if (videoRef.current) videoRef.current.currentTime += 5;
                    break;
                case "arrowleft":
                    if (videoRef.current) videoRef.current.currentTime -= 5;
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying, isMuted, isFullscreen]); // Add dependencies as needed or use refs inside

    return (
        <div
            ref={containerRef}
            className="group relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4 select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={() => {
                setShowControls(true);
                // Reset timer logic via state update if strictly needed, but hover state usually suffices
            }}
        >
            <video
                ref={videoRef}
                src={url}
                poster={poster}
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                playsInline
            >
                Your browser does not support the video tag.
            </video>

            {/* Loading/Buffering Indicator could go here */}

            {/* Big Play Button Overlay (only when paused/initial) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm animate-in zoom-in slide-in-from-bottom-2 fade-in">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>
            )}

            {/* Gradient Overlay for Controls */}
            <div
                className={clsx(
                    "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress Bar */}
                <div className="group/progress relative h-1.5 w-full bg-gray-600/60 cursor-pointer mb-4 items-center flex hover:h-2 transition-all">
                    <div
                        className="absolute h-full bg-red-600 rounded-l-md"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    {/* Handle */}
                    <div
                        className="absolute w-3.5 h-3.5 bg-red-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-md"
                        style={{ left: `calc(${(currentTime / duration) * 100}% - 7px)` }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Seek video"
                    />
                </div>

                <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={togglePlay}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                        </button>

                        <button className="hidden sm:block p-1 hover:bg-white/20 rounded-full transition-colors text-white">
                            <SkipForward className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 group/volume">
                            <button
                                onClick={toggleMute}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : volume < 0.5 ? <Volume1 className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>
                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 flex items-center">
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-16 h-1 accent-white"
                                    aria-label="Volume"
                                />
                            </div>
                        </div>

                        <div className="text-white text-xs md:text-sm font-medium ml-2">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 md:gap-4 relative">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white rotate-0 hover:rotate-45 duration-300"
                            aria-label="Settings"
                            aria-expanded={showSettings}
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        {showSettings && (
                            <div className="absolute bottom-12 right-0 bg-black/90 text-white rounded-xl p-2 w-48 shadow-lg border border-white/10 animate-in fade-in zoom-in-95 origin-bottom-right z-50">
                                <div className="flex flex-col gap-1">
                                    <button className="flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-lg transition-colors w-full text-sm">
                                        <span>Playback speed</span>
                                        <span className="text-gray-400">Normal</span>
                                    </button>
                                    <button className="flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-lg transition-colors w-full text-sm">
                                        <span>Quality</span>
                                        <span className="text-gray-400">Auto (1080p)</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={toggleFullscreen}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
