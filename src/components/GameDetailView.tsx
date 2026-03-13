"use client";

import React, { useState } from 'react';
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

export default function GameDetailView({ game }: GameDetailViewProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [activeScreenshot, setActiveScreenshot] = useState(0);

    const recommendedGames = allItemsData
        .filter(item => item.type === 'game' && item.id !== game.id)
        .slice(0, 6);

    const screenshots = game.screenshots || [game.image];

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-0 px-0 position-relative bg-[#080a0f]">
                <Sidebar />
                <article className="main-content mt-0 p-0 flex-grow-1 animate-fade-in" style={{ minWidth: 0 }}>
                    <div className="w-100 m-0 p-0 overflow-x-hidden">
                        
                        {/* REDESIGNED FULL-WIDTH HERO SECTION */}
                        <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-black mt-20">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-100 h-100 object-fit-cover opacity-60 transition-transform duration-1000 hover:scale-110"
                                style={{ objectPosition: 'center 30%' }}
                            />
                            
                            {/* Gradient overlays */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/80 to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/80 via-[#080a0f]/30 to-transparent z-10"></div>

                            {/* Hero Content Overlay */}
                            <div className="absolute inset-0 z-20 container-fluid px-lg-15 px-md-10 px-6 pb-20 d-flex flex-column justify-content-end">
                                <div className="animate-slide-up max-w-[900px]">
                                    <Breadcrumbs />
                                    
                                    <div className="d-flex align-items-center gap-3 mb-6 mt-6">
                                        <span className="bg-[#22c55e] text-white text-[10px] font-black px-4 py-1.5 rounded-pill uppercase tracking-[0.2em] shadow-lg shadow-[#22c55e]/30">
                                            {game.genre}
                                        </span>
                                    </div>
                                    
                                    <h1 className="display-three text-white fw-black text-uppercase tracking-tighter m-0 drop-shadow-2xl mb-4 leading-[0.9]">
                                        {game.title}
                                    </h1>
                                    <p className="text-slate-300 fs-lg max-w-[600px] font-medium opacity-90 mb-8 drop-shadow-md">
                                        {game.subtitle || "Experience the next generation of competitive gaming excellence."}
                                    </p>

                                    {/* STATS ROW */}
                                    <div className="d-flex flex-wrap align-items-center gap-8 mb-10">
                                        {/* Platform */}
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-12 h-12 rounded-circle bg-white/10 backdrop-blur-md border border-white/20 d-flex align-items-center justify-content-center text-white shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                                                <i className="ti ti-device-desktop fs-4"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="text-slate-400 text-[10px] fw-bold text-uppercase tracking-widest drop-shadow-md">Platform</span>
                                                <span className="text-white fs-6 fw-bold drop-shadow-md">{game.platform}</span>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-12 h-12 rounded-circle bg-[#ffcc00]/20 backdrop-blur-md border border-[#ffcc00]/30 d-flex align-items-center justify-content-center text-[#ffcc00] shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                                                <i className="ti ti-star-filled fs-4"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="text-slate-400 text-[10px] fw-bold text-uppercase tracking-widest drop-shadow-md">Rating</span>
                                                <span className="text-white fs-6 fw-bold drop-shadow-md">{game.ratingScore || game.rating} / 5.0</span>
                                            </div>
                                        </div>

                                        {/* Players */}
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-12 h-12 rounded-circle bg-[#22c55e]/20 backdrop-blur-md border border-[#22c55e]/30 d-flex align-items-center justify-content-center text-[#22c55e] shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                                                <i className="ti ti-users fs-4"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="text-slate-400 text-[10px] fw-bold text-uppercase tracking-widest drop-shadow-md">Played</span>
                                                <span className="text-white fs-6 fw-bold drop-shadow-md">{game.players} Users</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="d-flex flex-wrap align-items-center gap-5">
                                        <Link 
                                            href={game.playUrl || '#'} 
                                            target="_blank"
                                            className="bg-orange-gradient px-10 py-4 rounded-pill text-white fw-black text-uppercase tracking-[0.2em] text-decoration-none shadow-[0_15px_30px_rgba(242,108,13,0.3)] hover:scale-105 active:scale-95 transition-all text-sm d-flex align-items-center gap-3 group border-0"
                                        >
                                            <i className="ti ti-player-play-filled fs-4"></i>
                                            Start Game
                                        </Link>
                                        
                                        <button 
                                            onClick={() => {
                                                const detailSection = document.getElementById('details-section');
                                                detailSection?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-pill text-white fw-black text-uppercase tracking-[0.2em] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all text-sm d-flex align-items-center gap-3"
                                        >
                                            Details
                                            <i className="ti ti-arrow-down fs-4"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div id="details-section" className="container-fluid px-lg-15 px-md-10 px-6 py-10">
                            <div className="row gy-8">
                                
                                {/* LEFT COLUMN: DESCRIPTION & FEATURES */}
                                <div className="col-12 col-lg-7">
                                    {/* SCREENSHOTS GALLERY */}
                                    <div className="mb-12">
                                        <h3 className="fs-three text-white font-black uppercase tracking-tighter mb-8 flex items-center gap-4 px-2">
                                            <div className="w-2 h-10 bg-[#22c55e] rounded-full"></div>
                                            Visual Captures
                                        </h3>
                                        <div className="rounded-[32px] overflow-hidden border border-white/5 mb-6 group relative shadow-2xl">
                                            <img 
                                                src={screenshots[activeScreenshot]} 
                                                className="w-full aspect-video object-cover transition-opacity duration-500" 
                                                alt="Gameplay" 
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                                        </div>
                                        <div className="flex gap-4 overflow-x-auto pb-6 px-2 custom-scrollbar">
                                            {screenshots.map((src, idx) => (
                                                <button 
                                                    key={idx} 
                                                    onClick={() => setActiveScreenshot(idx)}
                                                    className={`relative flex-shrink-0 w-44 aspect-video rounded-2xl overflow-hidden border-2 transition-all ${activeScreenshot === idx ? 'border-[#f26c0d] scale-105 shadow-[0_10px_20px_rgba(242,108,13,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                                >
                                                    <img src={src} className="w-full h-full object-cover" alt={`Screenshot ${idx + 1}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#111319] border border-white/5 p-10 rounded-[32px] shadow-2xl mb-12 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f26c0d]/5 rounded-full blur-[100px] pointer-events-none"></div>
                                        <h3 className="fs-three text-white font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                            <div className="w-2 h-10 bg-orange-gradient rounded-full"></div>
                                            Explore Universe
                                        </h3>
                                        <div className="text-slate-400 fs-lg leading-relaxed space-y-6">
                                            {game.description.split('\n\n').map((para, i) => (
                                                <p key={i}>{para}</p>
                                            ))}
                                        </div>

                                        {/* FEATURES LIST */}
                                        {game.features && (
                                            <div className="mt-12 pt-12 border-t border-white/5">
                                                <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-8 opacity-60">Game Highlights</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {game.features.map((feature, idx) => (
                                                        <div key={idx} className="flex gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-[#f26c0d]/20 transition-all group">
                                                            <div className="w-12 h-12 rounded-2xl bg-orange-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                                <i className={`ti ${feature.icon} fs-3`}></i>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-white font-bold mb-1">{feature.title}</h5>
                                                                <p className="text-slate-500 text-sm leading-snug">{feature.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: STATS & INFO */}
                                <div className="col-12 col-lg-5">
                                    <div className="sticky-top" style={{ top: '120px' }}>
                                        {/* DETAIL INFO CARD */}
                                        <div className="bg-[#111319] border border-white/10 rounded-[32px] p-10 shadow-2xl overflow-hidden relative mb-8">
                                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#22c55e]/5 rounded-full blur-[100px] pointer-events-none"></div>
                                            
                                            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[12px] mb-10 pb-4 border-b border-white/10">Technical Specifications</h4>

                                            <div className="space-y-1 mb-10">
                                                {[
                                                    { label: "Developer", value: game.developer || "Elite Studio", icon: "ti-code" },
                                                    { label: "Publisher", value: game.publisher || "GameForSmart", icon: "ti-building" },
                                                    { label: "Release Date", value: game.releaseDate || "2023", icon: "ti-calendar" },
                                                    { label: "Language", value: game.languages || "English", icon: "ti-language" },
                                                    { label: "Storage", value: "Cloud / Browser", icon: "ti-database" }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 hover:bg-white/5 px-4 rounded-xl transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <i className={`ti ${item.icon} text-slate-500`}></i>
                                                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                                        </div>
                                                        <span className="text-white text-[11px] font-black uppercase tracking-widest">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button 
                                                onClick={() => setIsVideoModalOpen(true)}
                                                className="w-full py-5 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-white/10 active:scale-95"
                                            >
                                                Experience Trailer
                                                <i className="ti ti-video"></i>
                                            </button>
                                        </div>

                                        {/* SHARE CARD */}
                                        <div className="bg-[#111319]/50 border border-white/5 rounded-[32px] p-8 flex items-center justify-between">
                                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Recruit Friends</span>
                                            <div className="flex gap-4">
                                                {['brand-x', 'brand-facebook', 'brand-discord', 'share'].map((icon, i) => (
                                                    <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-orange-gradient hover:text-white hover:border-transparent transition-all">
                                                        <i className={`ti ti-${icon}`}></i>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RECOMMENDED CAROUSEL */}
                        <section className="container-fluid px-lg-15 px-md-10 px-6 py-20 bg-black/30 border-t border-white/5">
                            <div className="d-flex align-items-center justify-content-between mb-12">
                                <div className="flex flex-column">
                                    <span className="text-orange-gradient text-[10px] font-black uppercase tracking-[0.4em] mb-2">Recommended for you</span>
                                    <h3 className="fs-two text-white font-black uppercase tracking-tighter m-0">
                                        Popular <span className="text-orange-gradient">Experiences</span>
                                    </h3>
                                </div>
                                <Link href="/games" className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-[#f26c0d] transition-colors no-underline flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                                    BROWSE REPOSITORY <i className="ti ti-arrow-right"></i>
                                </Link>
                            </div>
                            
                            {/* Horizontal Scroll Area */}
                            <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar px-2">
                                {recommendedGames.map((item) => (
                                    <div key={item.id} className="flex-shrink-0 w-[300px]">
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

                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f26c0d;
                    border-radius: 10px;
                }
            `}</style>
        </>
    );
}
