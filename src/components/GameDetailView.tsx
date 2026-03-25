"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { TournamentInfo, allItemsData } from '@/data/allItemsData';
import ModernGameCard from '@/components/ModernGameCard';

interface GameDetailViewProps {
    game: TournamentInfo;
}

const getThemeConfig = (genre: string) => {
    const g = (genre || '').toLowerCase();

    if (g.includes('action') || g.includes('cyberpunk') || g.includes('shooter')) {
        return {
            primary: '#00f2ff',
            accent: 'linear-gradient(135deg, #00f2ff 0%, #ff00ea 100%)',
            bg: '#0a0a12',
            cardBg: 'rgba(20, 20, 35, 0.7)',
            glow: 'rgba(0, 242, 255, 0.3)',
            textAccent: 'text-[#00f2ff]'
        };
    }

    if (g.includes('adventure') || g.includes('fantasy') || g.includes('rpg')) {
        return {
            primary: '#e2b15a',
            accent: 'linear-gradient(135deg, #2d5a27 0%, #e2b15a 100%)',
            bg: '#0d1109',
            cardBg: 'rgba(30, 35, 25, 0.7)',
            glow: 'rgba(226, 177, 90, 0.3)',
            textAccent: 'text-[#e2b15a]'
        };
    }

    if (g.includes('horror') || g.includes('scary')) {
        return {
            primary: '#990000',
            accent: 'linear-gradient(135deg, #1a1a1a 0%, #990000 100%)',
            bg: '#050505',
            cardBg: 'rgba(20, 10, 10, 0.7)',
            glow: 'rgba(153, 0, 0, 0.3)',
            textAccent: 'text-[#990000]'
        };
    }

    if (g.includes('educational') || g.includes('trivia') || g.includes('learning')) {
        return {
            primary: '#0066cc',
            accent: 'linear-gradient(135deg, #0066cc 0%, #00ccff 100%)',
            bg: '#080c14',
            cardBg: 'rgba(15, 25, 45, 0.7)',
            glow: 'rgba(0, 102, 204, 0.3)',
            textAccent: 'text-[#0066cc]'
        };
    }

    // Default (Arcade/Racing/Other)
    return {
        primary: '#f26c0d',
        accent: 'linear-gradient(135deg, #f26c0d 0%, #F6471C 100%)',
        bg: '#080a0f',
        cardBg: 'rgba(17, 19, 25, 0.7)',
        glow: 'rgba(242, 108, 13, 0.3)',
        textAccent: 'text-[#f26c0d]'
    };
};

export default function GameDetailView({ game }: GameDetailViewProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [activeScreenshot, setActiveScreenshot] = useState(0);
    const theme = getThemeConfig(game.genre);

    const recommendedGames = allItemsData
        .filter(item => item.type === 'game' && item.id !== game.id)
        .slice(0, 6);

    const screenshots = game.screenshots || [game.image];

    // Auto-slide screenshots every 5 seconds
    useEffect(() => {
        if (screenshots.length <= 1) return;

        const interval = setInterval(() => {
            setActiveScreenshot((prev) => (prev + 1) % screenshots.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [screenshots.length]);

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-0 px-0 position-relative" style={{ backgroundColor: theme.bg }}>
                <Sidebar />
                <article className="main-content mt-0 p-0 flex-grow-1 animate-fade-in" style={{ minWidth: 0 }}>
                    <div className="w-100 m-0 p-0 overflow-x-hidden">

                        {/* SECTION 1: HEADER / HERO */}
                        <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-black mt-20">
                            {/* Banner Background */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={game.image}
                                    alt=""
                                    className="w-full h-full object-cover opacity-50 scale-105"
                                />
                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-black/40"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                            </div>

                            {/* Hero Overlay Content */}
                            <div className="relative z-10 w-full h-full flex flex-column justify-center container-fluid px-lg-15 px-md-10 px-6">
                                <div className="animate-slide-up">
                                    <Breadcrumbs />
                                    <h1 className="text-white font-black uppercase tracking-tighter mt-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '0.9', textShadow: `0 0 20px ${theme.glow}` }}>
                                        {game.title}
                                    </h1>
                                    <div className="flex gap-4 mt-6">
                                        <span className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest">
                                            {game.genre}
                                        </span>
                                        <span className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest">
                                            {game.platform}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 2: MAIN GRID LAYOUT */}
                        <div className="container-fluid px-lg-15 px-md-10 px-6 py-20">
                            <div className="row g-12">

                                {/* LEFT COLUMN: MAIN CONTENT (col-lg-8) */}
                                <div className="col-12 col-lg-8">
                                    {/* VIDEO PREVIEW */}
                                    <div className="mb-16">
                                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[11px] mb-8 flex items-center gap-4">
                                            <div className="w-10 h-px bg-white/20"></div>
                                            Video Preview
                                        </h4>
                                        <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-3xl aspect-video bg-black relative group">
                                            <iframe
                                                src={game.videoUrl || "https://www.youtube.com/embed/_FCYtKCGMjk?autoplay=1&mute=1&loop=1&playlist=_FCYtKCGMjk"}
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="mb-16">
                                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[11px] mb-8 flex items-center gap-4">
                                            <div className="w-10 h-px bg-white/20"></div>
                                            Explore Universe
                                        </h4>
                                        <div className="text-slate-300 fs-lg leading-relaxed space-y-8 font-medium">
                                            {game.description.split('\n\n').map((para, i) => (
                                                <p key={i}>{para}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SCREENSHOTS GALLERY */}
                                    <div className="mb-16">
                                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[11px] mb-8 flex items-center gap-4">
                                            <div className="w-10 h-px bg-white/20"></div>
                                            Visual Captures
                                        </h4>
                                        <div className="rounded-[40px] overflow-hidden border border-white/10 mb-8 aspect-video shadow-3xl relative group">
                                            <img src={screenshots[activeScreenshot]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gameplay" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        </div>
                                        <div className="flex gap-4 overflow-x-auto pb-4 scroll-hide">
                                            {screenshots.map((src, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveScreenshot(idx)}
                                                    className={`relative flex-shrink-0 w-44 aspect-video rounded-2xl overflow-hidden border-2 transition-all ${activeScreenshot === idx ? 'scale-105 shadow-2xl z-10' : 'opacity-40 hover:opacity-100'}`}
                                                    style={{ borderColor: activeScreenshot === idx ? theme.primary : 'transparent' }}
                                                >
                                                    <img src={src} className="w-full h-full object-cover" alt="" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: SIDEBAR (col-lg-4) */}
                                <div className="col-12 col-lg-4">
                                    <div className="sticky-top" style={{ top: '120px' }}>
                                        {/* SIDEBAR CARD */}
                                        <div
                                            className="rounded-[44px] border border-white/10 shadow-3xl overflow-hidden mb-8"
                                            style={{ background: theme.cardBg }}
                                        >
                                            {/* Game Cover */}
                                            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[44px]">
                                                <img src={game.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={game.title} />
                                            </div>

                                            {/* Info Content */}
                                            <div className="p-10">
                                                <div className="space-y-6 mb-10">
                                                    {[
                                                        { label: "Developer", value: game.developer || "Elite Studio", icon: "ti-code" },
                                                        { label: "Publisher", value: game.publisher || "GameForSmart", icon: "ti-building" },
                                                        { label: "Release", value: game.releaseDate || "2024", icon: "ti-calendar" },
                                                        { label: "Genre", value: game.genre, icon: "ti-category" },
                                                        { label: "Players", value: game.players, icon: "ti-users" }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 py-2 border-b border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <i className={`ti ${item.icon} text-slate-500`}></i>
                                                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                                            </div>
                                                            <span className="text-white text-[11px] font-black uppercase tracking-widest text-right">{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Rating Section */}
                                                <div className="flex items-center justify-between mb-10 p-6 rounded-[24px] bg-white/5 border border-white/5">
                                                    <div className="flex flex-column">
                                                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Community Rating</span>
                                                        <div className="flex gap-1 text-[#ffcc00] items-center">
                                                            <i className="ti ti-star-filled"></i>
                                                            <span className="text-white font-black text-xl">{game.ratingScore || game.rating}</span>
                                                            <span className="text-slate-500 text-sm font-bold opacity-60">/ 5.0</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full border-2 border-[#ffcc00] flex items-center justify-center text-[#ffcc00] font-black text-xs">
                                                        {game.recommendedPercent || "98%"}
                                                    </div>
                                                </div>

                                                {/* BIG PLAY NOW BUTTON */}
                                                <Link
                                                    href={game.playUrl || '#'}
                                                    target="_blank"
                                                    className="w-full py-6 rounded-[24px] text-white font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.03] active:scale-95 shadow-2xl no-underline text-lg group"
                                                    style={{ background: theme.accent, boxShadow: `0 20px 50px -10px ${theme.glow}` }}
                                                >
                                                    PLAY NOW
                                                    <i className="ti ti-player-play-filled fs-4 group-hover:translate-x-2 transition-transform"></i>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* SHARE AREA */}
                                        <div className="flex gap-4 px-4">
                                            {['brand-discord', 'brand-x', 'brand-facebook', 'share'].map((icon, i) => (
                                                <button key={i} className="flex-grow aspect-square rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center" style={{ borderRadius: '999px' }}>
                                                    <i className={`ti ti-${icon} fs-4`}></i>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: ADDITIONAL INFO & FEATURES */}
                        <section className="container-fluid px-lg-15 px-md-10 px-6 py-24 border-t border-white/10">
                            <div className="flex flex-column mb-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4" style={{ color: theme.primary }}>Core Capabilities</span>
                                <h3 className="fs-two text-white font-black uppercase tracking-tighter m-0">
                                    Technical <span className="italic" style={{ color: theme.primary }}>Specifications</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {game.features?.map((feature, idx) => (
                                    <div key={idx} className="group p-10 rounded-[40px] bg-white/5 border border-white/5 hover:border-white/10 transition-all shadow-xl">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-3xl"
                                            style={{ background: theme.accent }}
                                        >
                                            <i className={`ti ${feature.icon} fs-2`}></i>
                                        </div>
                                        <h5 className="text-white font-black uppercase tracking-widest text-sm mb-4">{feature.title}</h5>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-0">{feature.description}</p>
                                    </div>
                                ))}

                                {/* Fallback/Extra Specs cards if no features */}
                                {!game.features && (
                                    <>
                                        {[
                                            { title: "Cross-Play", desc: "Available on Mobile & Desktop", icon: "ti-devices" },
                                            { title: "Cloud Save", desc: "Sync your progress instantly", icon: "ti-cloud-upload" },
                                            { title: "Tournaments", desc: "Competitive global brackets", icon: "ti-trophy" },
                                            { title: "Low Latency", desc: "Edge network optimized", icon: "ti-wifi" }
                                        ].map((spec, i) => (
                                            <div key={i} className="p-10 rounded-[40px] bg-white/5 border border-white/5 shadow-xl">
                                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 bg-white/5 border border-white/10">
                                                    <i className={`ti ${spec.icon} fs-2`}></i>
                                                </div>
                                                <h5 className="text-white font-black uppercase tracking-widest text-sm mb-4">{spec.title}</h5>
                                                <p className="text-slate-500 text-sm leading-relaxed mb-0">{spec.desc}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </section>

                        {/* RECOMMENDED SECTION (Kept simple) */}
                        <section className="container-fluid px-lg-15 px-md-10 px-6 py-24 bg-black/40">
                            <div className="flex items-center justify-between mb-16">
                                <h3 className="fs-two text-white font-black uppercase tracking-tighter m-0">Related Experiences</h3>
                                <Link href="/games" className="btn btn-outline-light rounded-pill px-8 py-3 text-[10px] font-black uppercase tracking-widest">View All</Link>
                            </div>
                            <div className="flex gap-8 overflow-x-auto pb-10 scroll-hide px-2">
                                {recommendedGames.map((item) => (
                                    <div key={item.id} className="flex-shrink-0 w-[320px]">
                                        <ModernGameCard {...item} type={item.genre} />
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </article>
            </main>
            <Footer />

            {/* VIDEO MODAL */}
            {isVideoModalOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in p-6"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <button className="absolute top-10 right-10 text-white hover:text-[#f26c0d] transition-all">
                        <i className="ti ti-x text-5xl"></i>
                    </button>
                    <div className="w-full max-w-5xl aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl animate-zoom-in" onClick={e => e.stopPropagation()}>
                        <iframe
                            src={game.videoUrl || "https://www.youtube.com/embed/_FCYtKCGMjk"}
                            className="w-full h-full"
                            allowFullScreen
                            allow="autoplay"
                        ></iframe>
                    </div>
                </div>
            )}

            <style jsx>{`
                .bg-orange-gradient { background: linear-gradient(135deg, #f26c0d 0%, #F6471C 100%); }
                .text-orange-gradient {
                    background: linear-gradient(135deg, #f26c0d 0%, #F6471C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 900;
                }
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                .animate-slide-up { animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; opacity: 0; }
                .animate-zoom-in { animation: zoomIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { 
                    from { opacity: 0; transform: translateY(40px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                @keyframes zoomIn { 
                    from { opacity: 0; transform: scale(0.95); } 
                    to { opacity: 1; transform: scale(1); } 
                }

                .mask-gradient-b {
                    mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
                }

                .scroll-hide::-webkit-scrollbar {
                    display: none;
                }
                .scroll-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .shadow-3xl {
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
                }

                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ffffff;
                    border-radius: 10px;
                }
            `}</style>
        </>
    );
}
