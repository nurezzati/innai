"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const MutedIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

const DotsIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

// ─── Utils ────────────────────────────────────────────────────────────────────

const fmt = (t: number) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(43); // placeholder default 0:43
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Sync video events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handle = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-menu]")) setShowMenu(false);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [showMenu]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
  }, [playing]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePiP = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch {}
    setShowMenu(false);
  };

  const applySpeed = (s: number) => {
    const v = videoRef.current;
    if (v) v.playbackRate = s;
    setSpeed(s);
    setShowMenu(false);
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ aspectRatio: "16 / 7" }}
    >
      {/* ── Video element (src to be filled later) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.innaiandco.com/cdn/shop/videos/c/vp/0ffed88e6d3b4305baaa78e0ee15676e/0ffed88e6d3b4305baaa78e0ee15676e.m3u8?v=0"
        muted
        playsInline
        loop
      />

    

      {/* ── Bottom gradient scrim ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* ── Controls layer ── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 select-none">
        {/* Row: left text+play  |  right icons */}
        <div className="flex items-end justify-between mb-2">

          {/* Left column */}
          <div className="flex flex-col gap-0.5">
            {/* Line 1 — small label */}
            <p className="text-white/70 text-[10px] md:text-[11px] tracking-[0.25em] uppercase leading-none">
              RAYA RTW 2026 — DROP 2
            </p>
            {/* Line 2 — large bold name */}
            <p className="text-white text-lg md:text-2xl font-bold tracking-[0.15em] uppercase leading-snug">
              EVERGLOW
            </p>
            {/* Play / pause + timestamp */}
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <span className="text-white text-[11px] tabular-nums tracking-wider">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
            </div>
          </div>

          {/* Right column — icon row */}
          <div className="flex items-center gap-3 pb-7">
            {/* Speaker */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="hover:opacity-80 transition-opacity"
            >
              {muted ? <MutedIcon /> : <SpeakerIcon />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              className="hover:opacity-80 transition-opacity"
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>

            {/* Three-dot menu */}
            <div className="relative" data-menu>
              <button
                onClick={() => setShowMenu((v) => !v)}
                aria-label="More options"
                className="hover:opacity-80 transition-opacity"
              >
                <DotsIcon />
              </button>

              {showMenu && (
                <div
                  data-menu
                  className="absolute bottom-8 right-0 z-50 rounded overflow-hidden min-w-[150px]"
                  style={{ background: "rgba(20,20,20,0.95)" }}
                >
                  {/* Playback speed */}
                  <p className="px-3 pt-2.5 pb-1 text-[10px] tracking-[0.2em] uppercase text-white/40">
                    Playback Speed
                  </p>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => applySpeed(s)}
                      className="flex items-center justify-between w-full px-3 py-1.5 text-[12px] text-white hover:bg-white/10 transition-colors"
                    >
                      <span>{s === 1 ? "Normal" : `${s}×`}</span>
                      {speed === s && (
                        <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                          <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-white/10 my-1" />
                  {/* Picture in Picture */}
                  <button
                    onClick={handlePiP}
                    className="flex items-center gap-2 w-full px-3 py-2 text-[12px] text-white hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4 h-4" strokeLinecap="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <rect x="12" y="11" width="8" height="6" rx="1" fill="white" />
                    </svg>
                    Picture in Picture
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={seekTo}
          role="progressbar"
          aria-valuenow={progress}
          className="w-full h-[2px] bg-white/30 cursor-pointer group relative"
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
          {/* Scrubber dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
