"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { TournamentInfo, allItemsData } from '@/data/allItemsData';
import ModernCompetitionCard from '@/components/ModernCompetitionCard';
import ModernGameCard from '@/components/ModernGameCard';

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const router = useRouter();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Filter related competitions and games
    const relatedCompetitions = allItemsData
        .filter(item => item.type === 'tournament' && item.id !== tournament.id)
        .slice(0, 3);
    
    const relatedGames = allItemsData
        .filter(item => item.type === 'game')
        .slice(0, 4);

    // Mock countdown to competition start
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 5);
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const maxQuota = 100;
    const currentRegistered = 86; // Mock high for "Limited" effect
    const progressPercent = (currentRegistered / maxQuota) * 100;

    const displayImage = tournament.image;

    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-0 px-0 position-relative bg-[#0b0e12]">
                <Sidebar />
                <article className="main-content mt-0 p-0 flex-grow-1 animate-fade-in" style={{ minWidth: 0 }}>
                    <div className="w-100 m-0 p-0 overflow-x-hidden">
                        
                        {/* HERO BANNER SECTION */}
                        <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-black mt-20">
                            <img
                                src={tournament.image || displayImage}
                                alt={tournament.title}
                                className="w-100 h-100 object-fit-cover opacity-60 transition-transform duration-1000 hover:scale-110"
                                style={{ objectPosition: 'center 30%' }}
                            />
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e12] via-[#0b0e12]/30 to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e12]/80 via-transparent to-transparent z-10"></div>

                            {/* Hero Content Overlay */}
                            <div className="absolute inset-0 z-20 container-fluid px-lg-15 px-md-10 px-6 pb-24 d-flex flex-column justify-content-end">
                                <div className="animate-slide-up">
                                    <Breadcrumbs />
                                    <div className="d-flex align-items-center gap-3 mb-6 mt-6">
                                        <span className="bg-[#f26c0d] text-white text-[10px] font-black px-4 py-1.5 rounded-pill uppercase tracking-[0.2em] shadow-lg shadow-[#f26c0d]/30">
                                            {tournament.status || 'Upcoming'}
                                        </span>
                                        {progressPercent > 80 && (
                                            <span className="bg-[#ef4444] text-white text-[10px] font-black px-4 py-1.5 rounded-pill uppercase tracking-[0.2em] animate-pulse shadow-lg shadow-[#ef4444]/40 d-flex align-items-center gap-2">
                                                <i className="ti ti-flame-filled"></i>
                                                Limited Slots
                                            </span>
                                        )}
                                        <span className="glass-morphism text-white text-[10px] font-bold px-4 py-1.5 rounded-pill uppercase tracking-[0.2em] border border-white/10">
                                            {tournament.type || 'Tournament'}
                                        </span>
                                    </div>
                                    <h1 className="display-three text-white fw-black text-uppercase tracking-tighter m-0 drop-shadow-2xl mb-6 leading-[0.9] max-w-[900px]">
                                        {tournament.title}
                                    </h1>
                                    <div className="d-flex flex-wrap align-items-center gap-8 text-white/80">
                                        <div className="d-flex align-items-center gap-3 transition-all hover:text-[#f26c0d] group cursor-default">
                                            <div className="w-10 h-10 rounded-circle bg-white/5 d-flex align-items-center justify-content-center group-hover:bg-[#f26c0d]/20 transition-all">
                                                <i className="ti ti-calendar-event fs-4 text-[#f26c0d]"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest">Schedule</span>
                                                <span className="fs-5 fw-bold leading-none">{tournament.date || 'TBA'}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 transition-all hover:text-[#22c55e] group cursor-default">
                                            <div className="w-10 h-10 rounded-circle bg-white/5 d-flex align-items-center justify-content-center group-hover:bg-[#22c55e]/20 transition-all">
                                                <i className="ti ti-world fs-4 text-[#22c55e]"></i>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest">Platform</span>
                                                <span className="fs-5 fw-bold leading-none">Online Hub</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CONTENT GRID SECTION */}
                        <section className="container-fluid px-lg-15 px-md-10 px-6 py-16">
                            <div className="row g-8 lg:g-12">
                                
                                {/* LEFT COLUMN: MEDIA & INFO */}
                                <div className="col-lg-8 animate-slide-up">
                                    {/* Video/Media Card */}
                                    <div className="group relative rounded-5 overflow-hidden shadow-2xl bg-black mb-12 border border-white/5 cursor-pointer shadow-[#f26c0d]/10" onClick={() => setIsVideoModalOpen(true)}>
                                        <div className="ratio ratio-16x9">
                                            <img src={displayImage} alt="Media Preview" className="w-100 h-100 object-fit-cover opacity-70 transition-all group-hover:opacity-50 group-hover:scale-105 duration-700" />
                                            <div className="absolute inset-0 d-flex align-items-center justify-content-center">
                                                <div className="play-btn-outer w-24 h-24 rounded-full border-2 border-white/20 d-flex align-items-center justify-content-center backdrop-blur-sm group-hover:border-[#f26c0d] transition-all duration-500">
                                                    <div className="play-btn w-16 h-16 rounded-full bg-[#f26c0d] text-white d-flex align-items-center justify-content-center shadow-2xl shadow-[#f26c0d]/50 transform group-hover:scale-110 transition-transform duration-500">
                                                        <i className="ti ti-player-play-filled fs-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                                <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Watch Trailer</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reward & Motivation Highlight */}
                                    <div className="row g-6 mb-12">
                                        <div className="col-md-6">
                                            <div className="p-10 rounded-5 bg-[#161921] border border-white/5 shadow-xl hover-glow h-100 relative group overflow-hidden">
                                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ffcc00]/5 rounded-full blur-3xl group-hover:bg-[#ffcc00]/10 transition-all"></div>
                                                <span className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase d-block mb-3">Grand Prize Pool</span>
                                                <div className="d-flex align-items-end gap-3 flex-wrap">
                                                    <h2 className="display-four fw-black text-[#ffcc00] m-0 leading-none drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">{tournament.prizeMoney}</h2>
                                                    <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1.5 rounded-pill text-[10px] font-black mb-1 tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-[#22c55e]/20">BOOSTED</span>
                                                </div>
                                                <div className="mt-6 pt-6 border-top border-white/5">
                                                    <div className="text-slate-400 fs-sm m-0 d-flex align-items-center gap-3">
                                                        <div className="w-8 h-8 rounded-circle bg-[#22c55e]/10 d-flex align-items-center justify-content-center text-[#22c55e]">
                                                            <i className="ti ti-certificate fs-5"></i>
                                                        </div>
                                                        <span className="font-bold">E-Certificate & Professional Medal</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-10 rounded-5 bg-[#161921] border border-white/5 shadow-xl h-100 position-relative overflow-hidden group">
                                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f26c0d]/5 rounded-full blur-3xl group-hover:bg-[#f26c0d]/10 transition-all"></div>
                                                <span className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase d-block mb-5">Countdown to registration</span>
                                                <div className="d-flex gap-5">
                                                    {[
                                                        { label: 'Days', val: timeLeft.days },
                                                        { label: 'Hours', val: timeLeft.hours },
                                                        { label: 'Min', val: timeLeft.minutes },
                                                        { label: 'Sec', val: timeLeft.seconds }
                                                    ].map((t, i) => (
                                                        <div key={i} className="text-center flex-grow-1">
                                                            <div className="bg-black/40 backdrop-blur-md rounded-4 p-3 border border-white/5 group-hover:border-[#f26c0d]/30 transition-all shadow-xl">
                                                                <h3 className="text-white m-0 fw-black fs-2">{t.val.toString().padStart(2, '0')}</h3>
                                                            </div>
                                                            <span className="text-[9px] text-[#f26c0d] font-black uppercase mt-2 d-block tracking-widest">{t.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <i className="ti ti-alarm-filled position-absolute bottom-[-20px] right-[-20px] fs-1 opacity-5 text-[#f26c0d] rotate-12 transition-all group-hover:rotate-0 group-hover:opacity-10"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className="bg-[#161921] border border-white/5 p-10 rounded-5 shadow-xl mb-12 relative overflow-hidden group">
                                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffcc00]/5 rounded-full blur-3xl group-hover:bg-[#ffcc00]/10 transition-all"></div>
                                        <h3 className="fs-four fw-black mb-8 d-flex align-items-center gap-4 text-uppercase tracking-tighter">
                                            <div className="w-2 h-10 bg-orange-gradient rounded-full shadow-[0_0_20px_rgba(246,71,28,0.5)]"></div>
                                            Deskripsi Event
                                        </h3>
                                        <div className="text-slate-300 fs-lg leading-[1.8] description-text font-medium italic opacity-90">
                                            {tournament.description.split('\n\n').map((para, i) => (
                                                <p key={i} className="mb-6">{para}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rules Section with Checklist Badge */}
                                    <div className="bg-[#161921] border border-white/5 p-10 rounded-5 shadow-xl mb-16">
                                        <h3 className="fs-four fw-black mb-10 text-[#22c55e] text-uppercase tracking-tighter d-flex align-items-center gap-4">
                                            <i className="ti ti-shield-check fs-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"></i>
                                            Syarat & Ketentuan Khusus
                                        </h3>
                                        <div className="row g-5">
                                            {(tournament.rules && tournament.rules.length > 0 ? tournament.rules : [
                                                "Terbuka untuk pelajar aktif di wilayah Indonesia.",
                                                "Satu tim terdiri dari maksimal 3 peserta.",
                                                "Wajib menggunakan koneksi internet yang stabil."
                                            ]).map((rule, index) => (
                                                <div key={index} className="col-12">
                                                    <div className="d-flex align-items-center gap-5 p-6 rounded-5 border border-white/5 bg-black/30 transition-all hover:bg-white/5 group hover:border-[#22c55e]/30 shadow-sm">
                                                        <div className="bg-[#22c55e] text-white flex items-center justify-center rounded-circle w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                                            <i className="ti ti-check fs-4"></i>
                                                        </div>
                                                        <span className="text-slate-200 fs-5 fw-bold tracking-tight">{rule}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RELATED COMPETITIONS SECTION */}
                                    <div className="mt-24 mb-24 animate-slide-up">
                                        <div className="d-flex align-items-center justify-content-between mb-10">
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="w-12 h-12 rounded-circle bg-[#f26c0d]/10 d-flex align-items-center justify-content-center text-[#f26c0d] shadow-lg shadow-[#f26c0d]/20">
                                                    <i className="ti ti-trophy fs-3"></i>
                                                </div>
                                                <h3 className="fs-three fw-black m-0 text-uppercase tracking-tighter text-white">
                                                    Kompetisi Terkait
                                                </h3>
                                            </div>
                                            <Link href="/competitions" className="bg-white/5 text-white px-6 py-3 rounded-pill fw-black no-underline hover:bg-[#f26c0d] hover:text-white transition-all text-xs tracking-[0.2em] border border-white/10 uppercase">
                                                Explore All <i className="ti ti-arrow-right ms-2"></i>
                                            </Link>
                                        </div>
                                        <div className="row g-8">
                                            {relatedCompetitions.map((comp) => (
                                                <div key={comp.id} className="col-md-4">
                                                    <ModernCompetitionCard 
                                                        id={comp.id}
                                                        title={comp.title}
                                                        type={comp.type}
                                                        image={comp.image}
                                                        status={comp.status}
                                                        description={comp.description}
                                                        slug={comp.slug}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RELATED GAMES SECTION */}
                                    <div className="animate-slide-up pb-20">
                                        <div className="d-flex align-items-center justify-content-between mb-10">
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="w-12 h-12 rounded-circle bg-[#22c55e]/10 d-flex align-items-center justify-content-center text-[#22c55e] shadow-lg shadow-[#22c55e]/20">
                                                    <i className="ti ti-device-gamepad-2 fs-3"></i>
                                                </div>
                                                <h3 className="fs-three fw-black m-0 text-uppercase tracking-tighter text-white">
                                                    Game Populer
                                                </h3>
                                            </div>
                                            <Link href="/games" className="bg-white/5 text-white px-6 py-3 rounded-pill fw-black no-underline hover:bg-[#22c55e] hover:text-white transition-all text-xs tracking-[0.2em] border border-white/10 uppercase">
                                                Play Now <i className="ti ti-arrow-right ms-2"></i>
                                            </Link>
                                        </div>
                                        <div className="row g-6">
                                            {relatedGames.map((game) => (
                                                <div key={game.id} className="col-md-3">
                                                    <ModernGameCard 
                                                        id={game.id}
                                                        title={game.title}
                                                        type={game.genre}
                                                        image={game.image}
                                                        status={game.status}
                                                        rating={game.rating}
                                                        platform={game.platform}
                                                        players={game.players}
                                                        slug={game.slug}
                                                        playUrl={game.playUrl}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: STICKY REGISTRATION CARD */}
                                <div className="col-lg-4 animate-slide-right">
                                    <div className="sticky-top" style={{ top: '140px' }}>
                                        <div className="bg-[#1a1c24] border border-white/10 rounded-5 overflow-hidden shadow-2xl glass-morphism relative">
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#22c55e]/5 rounded-full blur-3xl pointer-events-none"></div>
                                            <div className="bg-[#22c55e] p-5 text-center shadow-[0_5px_20px_rgba(34,197,94,0.4)]">
                                                <span className="text-xs font-black text-white uppercase tracking-[0.25em] d-flex align-items-center justify-content-center gap-3">
                                                    <span className="pulse-dot"></span>
                                                    REGISTRATION OPEN
                                                </span>
                                            </div>
                                            <div className="p-10">
                                                <div className="mb-10 text-center bg-black/40 backdrop-blur-md p-8 rounded-5 border border-white/5 hover:border-[#f26c0d]/30 transition-all group overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#f26c0d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                                    <span className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-black d-block mb-2">Entry Ticket</span>
                                                    <h2 className="text-5xl font-black text-white tracking-tighter m-0 drop-shadow-2xl">
                                                        {tournament.ticketFee && tournament.ticketFee !== 'Gratis' ? tournament.ticketFee : 'FREE'}
                                                    </h2>
                                                    <span className="text-[10px] text-[#22c55e] uppercase font-black mt-2 d-block tracking-[0.3em] bg-[#22c55e]/10 inline-block px-3 py-1 rounded-pill">EARLY BIRD</span>
                                                </div>

                                                <div className="d-flex flex-column gap-4 mb-10">
                                                    <Link
                                                        href={`/competitions/${tournament.slug}/register`}
                                                        className="w-100 py-5 bg-orange-gradient text-white font-black d-flex align-items-center justify-content-center no-underline uppercase text-sm tracking-[0.2em] transition-all shadow-2xl shadow-[#f26c0d]/40 hover-lift rounded-pill border-0"
                                                    >
                                                        <i className="ti ti-user-plus me-4 fs-3"></i>
                                                        <span>DAFTAR SEKARANG</span>
                                                    </Link>
                                                    <p className="text-center text-[10px] text-slate-500 font-bold m-0 italic tracking-widest uppercase opacity-60">Terbatas untuk {tournament.teams || '100'} pendaftar pertama</p>
                                                </div>

                                                <div className="space-y-0">
                                                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-8 border-bottom border-white/10 pb-5 d-flex align-items-center gap-3">
                                                        <i className="ti ti-info-circle-filled fs-4 text-[#f26c0d]"></i>
                                                        COMPETITION SUMMARY
                                                    </h4>
                                                    {[
                                                        { label: "Qualifiers", value: tournament.date, icon: "ti-calendar-check" },
                                                        tournament.finalRound ? { label: "Grand Final", value: tournament.finalRound, icon: "ti-crown" } : null,
                                                        { label: "Target Tier", value: tournament.type || 'All Tiers', icon: "ti-id-badge-2" },
                                                        { label: "Network", value: "GameForSmart", icon: "ti-world-longitude" }
                                                    ].filter(Boolean).map((item: any, idx) => (
                                                        <div key={idx} className="d-flex justify-content-between align-items-center py-5 border-bottom border-white/5 hover:bg-white/5 transition-all px-3 rounded-4 group">
                                                            <div className="d-flex align-items-center gap-4">
                                                                <i className={`ti ${item.icon} text-slate-500 group-hover:text-[#f26c0d] group-hover:scale-120 transition-all`}></i>
                                                                <span className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em]">{item.label}</span>
                                                            </div>
                                                            <span className="font-black text-[11px] uppercase text-white tracking-widest">{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-12 pt-10 border-top border-white/5">
                                                    <div className="d-flex justify-content-between items-end mb-4">
                                                        <div className="d-flex flex-column">
                                                            <span className="text-[10px] text-white font-black tracking-[0.2em] uppercase">REGISTRATION QUOTA</span>
                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{currentRegistered} / {maxQuota} USERS</span>
                                                        </div>
                                                        <span className="text-[#22c55e] font-black text-2xl leading-none drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">{progressPercent}%</span>
                                                    </div>
                                                    <div className="w-100 bg-white/5 h-3 rounded-pill overflow-hidden border border-white/10 shadow-inner">
                                                        <div className="bg-[#22c55e] h-full shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-1500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                                                    </div>
                                                    <div className="mt-6 bg-[#f26c0d]/10 border border-[#f26c0d]/30 p-5 rounded-4 d-flex align-items-center gap-4 group hover:bg-[#f26c0d]/20 transition-all">
                                                        <i className="ti ti-bolt text-[#f26c0d] fs-3 animate-bounce shadow-[0_0_10px_rgba(242,108,13,0.5)]"></i>
                                                        <span className="text-[#f26c0d] font-black text-[10px] uppercase tracking-widest leading-relaxed">
                                                            Kuota terbatas! Segera ambil slot Anda sekarang.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
            <Footer />

            {/* VIDEO MODAL */}
            {isVideoModalOpen && (
                <div
                    className="video-modal-overlay position-fixed inset-0 d-flex align-items-center justify-content-center animate-fade-in"
                    style={{ zIndex: 9999, background: 'rgba(5,7,10,0.98)', backdropFilter: 'blur(30px)' }}
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <button
                        className="modal-close-btn position-absolute top-10 end-10 btn-show-hide"
                        onClick={() => setIsVideoModalOpen(false)}
                        style={{ zIndex: 10001, width: '70px', height: '70px', fontSize: '36px' }}
                    >
                        <i className="ti ti-x"></i>
                    </button>

                    <div
                        className="video-modal-content rounded-5 overflow-hidden border border-white/10 animate-zoom-in shadow-[0_0_80px_rgba(246,71,28,0.25)]"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '92vw', maxWidth: '1600px', maxHeight: '88vh' }}
                    >
                        <div className="ratio ratio-16x9">
                            <iframe
                                src={`${tournament.videoUrl || "https://www.youtube.com/embed/_FCYtKCGMjk"}?autoplay=1&rel=0&modestbranding=1&vq=hd1080`}
                                title="Tournament Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-slide-up { animation: fadeInUp 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                .animate-slide-right { animation: slideRight 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                .animate-zoom-in { animation: zoomIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }

                @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .tracking-tighter { letter-spacing: -0.05em; }
                .bg-orange-gradient { background: linear-gradient(135deg, #F6471C, #f26c0d); }

                .glass-morphism {
                    background: rgba(22, 25, 33, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .hover-glow:hover {
                    box-shadow: 0 0 50px rgba(242, 108, 13, 0.2);
                    border-color: rgba(242, 108, 13, 0.4);
                    transform: translateY(-5px);
                }

                .pulse-dot {
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    animation: pulse-ring 2s infinite;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
                }

                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
                    70% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 0 10px rgba(255,255,255,0); }
                    100% { transform: scale(0.8); opacity: 0.8; }
                }

                .hover-lift:hover {
                    transform: translateY(-8px) scale(1.03);
                    box-shadow: 0 25px 50px rgba(246, 71, 28, 0.5);
                    filter: brightness(1.2);
                }

                .btn-show-hide {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                }
                .btn-show-hide:hover {
                    background: #f26c0d;
                    border-color: #f26c0d;
                    transform: rotate(180deg) scale(1.1);
                    box-shadow: 0 0 30px rgba(242, 108, 13, 0.6);
                }

                .description-text p {
                    margin-bottom: 1.5rem;
                }

                .animate-pulse {
                    animation: pulse-limited 2s infinite;
                }

                @keyframes pulse-limited {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.02); filter: brightness(1.2); }
                }

                .hero-glow::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, transparent, rgba(242, 108, 13, 0.05), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.8s ease;
                }
                .hero-glow:hover::before {
                    transform: translateX(100%);
                }
            `}</style>
        </>
    );
}
